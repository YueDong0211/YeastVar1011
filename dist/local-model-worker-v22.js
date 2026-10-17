/* Qwen runs inside this dedicated worker. No prompts are sent to a server. */
const MODEL = 'onnx-community/Qwen2.5-0.5B-Instruct';
const REVISION = '22942cb7d7ba4cc81bb4673549ca4d4614469b5e';
const CACHE = 'yeastvar-local-qwen25-05b-q8-v22';
const FILE_BYTES = { 'config.json':678, 'generation_config.json':242, 'tokenizer_config.json':7849, 'tokenizer.json':7031673, 'model_quantized.onnx':512096557 };
const TOTAL = Object.values(FILE_BYTES).reduce((a,b)=>a+b,0);
let generator, runtime, busy=false, cached=false, downloadFiles=new Map(), lastProgress=0;
const cachedFiles=new Set();
const nativeFetch=self.fetch?.bind(self);
let offlineFetchBlocked=false;
const emit = (type, detail={}) => self.postMessage({type,...detail});
const state = detail => emit('state', {detail});
function cacheURL(key) {
  return new URL('/__yv_local_model_cache__/'+encodeURIComponent(String(key)), self.location.origin).href;
}
function modelURL(file) {
  return `https://huggingface.co/${MODEL}/resolve/${REVISION}/${file==='model_quantized.onnx'?'onnx/':''}${file}`;
}
function configureFetch(offline) {
  offlineFetchBlocked=false;
  if(!offline){if(nativeFetch)self.fetch=nativeFetch;return;}
  if(!nativeFetch)throw Error('BROWSER_UNSUPPORTED');
  const vendor=new URL('./vendor/transformers-3.8.1/',import.meta.url);
  self.fetch=(input,init)=>{
    const url=new URL(typeof input==='string'||input instanceof URL?input:input.url,self.location.href||self.location.origin);
    const method=String(init?.method||input?.method||'GET').toUpperCase();
    if(url.origin===vendor.origin&&url.pathname.startsWith(vendor.pathname)&&/\.(?:wasm|m?js)$/.test(url.pathname)&&['GET','HEAD'].includes(method))return nativeFetch(input,init);
    offlineFetchBlocked=true;
    return Promise.reject(Error('MODEL_OFFLINE_FILES_MISSING'));
  };
}
async function requireOfflineCache(cache) {
  if(!cache)throw Error('MODEL_OFFLINE_FILES_MISSING');
  for(const [file,expected] of Object.entries(FILE_BYTES)){
    let response;
    try {response=await cache.match(cacheURL(modelURL(file)));}catch{}
    const length=response?.headers.get('content-length'),encoding=response?.headers.get('content-encoding');
    const valid=response?.status===200&&response.body&&(encoding||length===null||Number(length)===expected);
    response?.body?.cancel().catch(()=>{});
    if(!valid)throw Error('MODEL_OFFLINE_FILES_MISSING');
  }
}
function cacheFile(key) {
  const file=String(key).split('?')[0].split('/').pop();
  return Object.hasOwn(FILE_BYTES,file)?file:null;
}
function markCached(file) {
  cachedFiles.add(file);
  const complete=Object.keys(FILE_BYTES).every(name=>cachedFiles.has(name));
  if(cached!==complete){cached=complete;state({cached});}
}
function checkResponse(response,file,onValid,onInvalid) {
  // Count the existing stream rather than allocating another 512 MB buffer.
  const expected=FILE_BYTES[file],length=response.headers.get('content-length');
  const encoding=response.headers.get('content-encoding');
  if(response.status!==200 || (!encoding && length!==null && Number(length)!==expected))return null;
  const reader=response.body?.getReader();
  if(!reader)return null;
  let loaded=0;
  const headers=new Headers(response.headers);
  // Fetch already decodes HTTP content encodings before exposing response.body.
  headers.delete('content-encoding');headers.set('content-length',String(expected));
  return new Response(new ReadableStream({
    async pull(controller) {
      try {
        const {done,value}=await reader.read();
        if(done){if(loaded!==expected)throw Error('MODEL_FILE_INCOMPLETE');onValid();controller.close();return;}
        loaded+=value.byteLength;
        if(loaded>expected)throw Error('MODEL_FILE_INCOMPLETE');
        controller.enqueue(value);
      } catch(error) {
        reader.cancel(error).catch(()=>{});
        await onInvalid();controller.error(error);
      }
    },
    cancel(reason){return reader.cancel(reason);}
  }),{status:200,headers});
}
async function configure(offline) {
  runtime ||= await import('./vendor/transformers-3.8.1/transformers.min.js');
  const {env} = runtime;
  // 3.8.1 requires local models enabled to pass its pre-cache configuration guard.
  // The dedicated-worker fetch guard above blocks even its local-path fallback.
  env.allowLocalModels=offline;
  env.allowRemoteModels=!offline;
  env.useBrowserCache=false;
  env.useFSCache=false;
  env.useCustomCache=true;
  env.backends.onnx.wasm.wasmPaths=new URL('./vendor/transformers-3.8.1/',import.meta.url).href;
  env.backends.onnx.wasm.numThreads=1; // Works without cross-origin isolation, including hosted/static sites.
  env.backends.onnx.wasm.proxy=false;
  let cache;
  try { cache=await caches.open(CACHE); } catch { state({warning:'cache-unavailable'}); }
  env.customCache={
    async match(key) {
      if(!cache)return undefined;
      try {
        const response=await cache.match(cacheURL(key));
        if(!response)return undefined;
        const file=cacheFile(key);
        if(!file)return response;
        const invalid=async()=>{cachedFiles.delete(file);cached=false;try{await cache.delete(cacheURL(key));}catch{}state({cached:false,warning:'cache-invalid'});};
        const checked=checkResponse(response,file,()=>markCached(file),invalid);
        if(!checked){response.body?.cancel().catch(()=>{});await invalid();return undefined;}
        return checked;
      } catch { return undefined; }
    },
    async put(key,response) {
      if(!cache)return;
      try {
        const file=cacheFile(key);
        const invalid=async()=>{cachedFiles.delete(file);cached=false;try{await cache.delete(cacheURL(key));}catch{}state({cached:false,warning:'cache-invalid'});};
        const checked=file?checkResponse(response,file,()=>{},invalid):response;
        if(!checked){response.body?.cancel().catch(()=>{});await invalid();return;}
        await cache.put(cacheURL(key),checked);
        if(file)markCached(file);
      } catch(error) {state({warning:error?.message==='MODEL_FILE_INCOMPLETE'?'cache-invalid':'cache-unavailable'});}
    }
  };
  return cache;
}
function progress(p) {
  const file=String(p.file||'').split('/').pop();
  if(p.status==='progress' && FILE_BYTES[file])downloadFiles.set(file,Math.min(FILE_BYTES[file],Number(p.loaded)||0));
  if(p.status==='done' && FILE_BYTES[file])downloadFiles.set(file,FILE_BYTES[file]);
  const downloaded=[...downloadFiles.values()].reduce((a,b)=>a+b,0);
  if(p.status==='progress' && performance.now()-lastProgress<80)return;
  lastProgress=performance.now();
  state({status:'loading',file,phase:p.status,downloaded,total:TOTAL,progress:Math.min(1,downloaded/TOTAL),cached});
}
async function load(device,offline=false) {
  if(generator)return;
  configureFetch(offline);
  const cache=await configure(offline);
  if(offline)await requireOfflineCache(cache);
  cached=false;cachedFiles.clear();downloadFiles.clear();lastProgress=0;
  let selected=device==='wasm'?'wasm':'webgpu';
  if(selected==='webgpu') {
    try {if(!navigator.gpu || !await navigator.gpu.requestAdapter())selected='wasm';}
    catch {selected='wasm';}
  }
  const options={revision:REVISION,dtype:'q8',device:selected,trust_remote_code:false,local_files_only:offline,progress_callback:progress};
  state({status:'loading',device:selected,offline});
  try {
    generator=await runtime.pipeline('text-generation',MODEL,options);
    // A GPU may create a session yet reject an operator on its first execution.
    if(selected==='webgpu')await generator('Hi',{max_new_tokens:1,do_sample:false});
  }
  catch(error) {
    if(offline&&offlineFetchBlocked)throw Error('MODEL_OFFLINE_FILES_MISSING');
    if(selected!=='webgpu')throw error;
    state({warning:'gpu-fallback',device:'wasm'});
    try {await generator?.dispose();} catch {}
    generator=null;
    selected='wasm';
    try {generator=await runtime.pipeline('text-generation',MODEL,{...options,device:'wasm'});}
    catch(error){if(offline&&offlineFetchBlocked)throw Error('MODEL_OFFLINE_FILES_MISSING');throw error;}
  }
  state({status:'ready',device:selected,progress:1,downloaded:TOTAL,total:TOTAL,cached,offline});
}
async function generate(messages, options, id) {
  if(!generator)throw Error('MODEL_NOT_LOADED');
  const chat=messages.filter(m=>m && ['system','user','assistant'].includes(m.role) && typeof m.content==='string').map(m=>({role:m.role,content:m.content}));
  if(!chat.length || !chat.some(m=>m.role==='user'))throw Error('EMPTY_PROMPT');
  const maxNewTokens=Math.max(1,Math.min(256,Math.floor(Number(options.maxNewTokens)||128)));
  const tokenizer=generator.tokenizer;
  let prompt, inputs;
  while(true) {
    prompt=tokenizer.apply_chat_template(chat,{tokenize:false,add_generation_prompt:true});
    inputs=tokenizer(prompt,{add_special_tokens:false});
    if(inputs.input_ids.dims.at(-1)<=2048)break;
    const removable=chat.findIndex((m,i)=>i<chat.length-1 && m.role!=='system');
    if(removable>=0){chat.splice(removable,1);continue;}
    throw Error('CONTEXT_TOO_LONG');
  }
  state({status:'generating'});
  let text='';
  const streamer=new runtime.TextStreamer(tokenizer,{skip_prompt:true,skip_special_tokens:true,callback_function:chunk=>{text+=chunk;emit('token',{id,chunk});}});
  const output=await generator.model.generate({...inputs,max_new_tokens:maxNewTokens,do_sample:false,repetition_penalty:1.1,streamer});
  if(!text) {
    const ids=output.tolist()[0].slice(inputs.input_ids.dims.at(-1));
    text=tokenizer.decode(ids,{skip_special_tokens:true});
  }
  if(!text.trim())throw Error('EMPTY_RESPONSE');
  state({status:'ready'});
  return text.trim();
}
self.onmessage=async event=>{
  const {type,id,device,messages,offline,options={}}=event.data||{};
  if(busy){emit('error',{id,error:'MODEL_BUSY'});return;}
  busy=true;
  try {
    if(type==='load'){await load(device||'auto',offline===true);emit('done',{id});}
    else if(type==='generate'){const text=await generate(messages||[],options,id);emit('done',{id,text});}
    else throw Error('UNKNOWN_REQUEST');
  } catch(error) {state({status:generator?'ready':'error',error:String(error?.message||error)});emit('error',{id,error:String(error?.message||error)});}
  finally {busy=false;}
};
