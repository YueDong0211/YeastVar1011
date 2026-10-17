/* A lazy, key-free browser language model. Worker creation starts only on load(). */
'use strict';
(() => {
  const scriptURL=document.currentScript?.src || new URL('local-model-v22.js',document.baseURI).href;
  const workerURL=new URL('local-model-worker-v22.js',scriptURL);
  const assetVersion=new URL(scriptURL).searchParams.get('v');
  if(assetVersion)workerURL.searchParams.set('v',assetVersion);
  const WORKER_URL=workerURL.href;
  const CACHE='yeastvar-local-qwen25-05b-q8-v22';
  const EXPECTED_FILES=Object.freeze([
    {name:'config.json',path:'config.json',bytes:678},
    {name:'generation_config.json',path:'generation_config.json',bytes:242},
    {name:'tokenizer_config.json',path:'tokenizer_config.json',bytes:7849},
    {name:'tokenizer.json',path:'tokenizer.json',bytes:7031673},
    {name:'model_quantized.onnx',path:'onnx/model_quantized.onnx',bytes:512096557}
  ].map(file=>Object.freeze(file)));
  const INFO=Object.freeze({modelId:'onnx-community/Qwen2.5-0.5B-Instruct',modelName:'Qwen2.5 0.5B Instruct',revision:'22942cb7d7ba4cc81bb4673549ca4d4614469b5e',dtype:'q8',downloadBytes:519136999,runtime:'Transformers.js 3.8.1',runtimeBytes:22528676,contextTokens:2048,maxOutputTokens:256,license:'Apache-2.0',modelURL:'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct',cacheName:CACHE,expectedFiles:EXPECTED_FILES});
  let worker=null,serial=0,loadPromise=null,cacheClearPromise=null,cacheImportPromise=null;
  const listeners=new Set(), pending=new Map();
  let current={status:'idle',device:null,progress:0,downloaded:0,total:INFO.downloadBytes,error:'',warning:'',cached:false,offline:false};
  function update(detail) {current={...current,...detail};listeners.forEach(fn=>{try{fn({...current});}catch{}});}
  function failAll(error) {for(const p of pending.values())p.reject(error);pending.clear();loadPromise=null;}
  function reset(reason='MODEL_UNLOADED') {
    worker?.terminate();worker=null;
    const error=new Error(reason);if(reason==='MODEL_CANCELLED')error.name='AbortError';
    failAll(error);
    update({status:'idle',device:null,progress:0,downloaded:0,file:'',phase:'',error:'',warning:'',offline:false});
  }
  function ensureWorker() {
    if(worker)return worker;
    if(!window.isSecureContext)throw Error('SECURE_CONTEXT_REQUIRED');
    if(!window.Worker || !window.WebAssembly)throw Error('BROWSER_UNSUPPORTED');
    const owned=new Worker(WORKER_URL,{type:'module',name:'YeastVar local language model'});worker=owned;
    owned.onmessage=({data})=>{
      if(worker!==owned)return;
      if(data.type==='state'){update(data.detail);return;}
      const p=pending.get(data.id);if(!p)return;
      if(data.type==='token'){try{p.onToken?.(data.chunk);}catch{}return;}
      pending.delete(data.id);
      if(data.type==='error')p.reject(new Error(data.error));else p.resolve(data.text);
    };
    function failWorker(message) {
      if(worker!==owned)return;
      const error=new Error(message);owned.terminate();worker=null;failAll(error);update({status:'error',error:error.message});
    }
    owned.onerror=event=>failWorker(event.message||'WORKER_FAILED');
    owned.onmessageerror=()=>failWorker('WORKER_MESSAGE_FAILED');
    return owned;
  }
  function request(type,detail={},onToken) {
    return new Promise((resolve,reject)=>{
      let id;
      try {const w=ensureWorker();id=++serial;pending.set(id,{resolve,reject,onToken});w.postMessage({type,id,...detail});}
      catch(error){if(id)pending.delete(id);update({status:'error',error:error.message});reject(error);}
    });
  }
  function load(options={}) {
    // A new worker must not retain a cache handle while that cache is deleted.
    if(cacheClearPromise)return Promise.reject(Error('MODEL_CACHE_CLEARING'));
    if(cacheImportPromise)return Promise.reject(Error('MODEL_CACHE_IMPORTING'));
    if(current.status==='ready')return Promise.resolve();
    if(loadPromise)return loadPromise;
    if(current.status==='generating')return Promise.reject(Error('MODEL_BUSY'));
    update({status:'loading',error:'',warning:'',file:'',phase:'',progress:0,downloaded:0,cached:false,offline:options.offline===true});
    const ownedPromise=request('load',{device:['auto','wasm','webgpu'].includes(options.device)?options.device:'auto',offline:options.offline===true}).finally(()=>{if(loadPromise===ownedPromise)loadPromise=null;});
    loadPromise=ownedPromise;
    return ownedPromise;
  }
  async function generate(messages,options={}) {
    if(current.status!=='ready')throw Error(current.status==='generating'?'MODEL_BUSY':'MODEL_NOT_LOADED');
    if(!Array.isArray(messages))throw Error('INVALID_MESSAGES');
    const owned=worker;
    // Do not accept endpoint, token, function-calling or arbitrary runtime options.
    update({status:'generating',error:''});
    try {return await request('generate',{messages,options:{maxNewTokens:options.maxNewTokens}},typeof options.onToken==='function'?options.onToken:null);}
    catch(error){if(error.name!=='AbortError'&&worker===owned&&owned)update({status:'ready',error:error.message});throw error;}
  }
  function clearCache() {
    if(cacheClearPromise)return cacheClearPromise;
    if(cacheImportPromise)return Promise.reject(Error('MODEL_CACHE_IMPORTING'));
    if(!window.caches){reset();return Promise.reject(Error('CACHE_UNAVAILABLE'));}
    const operation=Promise.resolve().then(()=>caches.delete(CACHE)).then(()=>update({cached:false})).catch(error=>{
      update({warning:'cache-unavailable',error:error.message||'CACHE_UNAVAILABLE'});throw error;
    }).finally(()=>{if(cacheClearPromise===operation)cacheClearPromise=null;});
    cacheClearPromise=operation;
    reset();
    return operation;
  }
  function importFiles(input) {
    if(cacheClearPromise)return Promise.reject(Error('MODEL_CACHE_CLEARING'));
    if(cacheImportPromise)return Promise.reject(Error('MODEL_CACHE_IMPORTING'));
    let files;
    try {
      if(!input || typeof input==='string' || !Number.isInteger(input.length))throw Error('MODEL_IMPORT_INVALID_FILES');
      files=Array.from(input);
      const names=new Set();
      for(const file of files){
        if(Object.prototype.toString.call(file)!=='[object File]' || typeof file.stream!=='function')throw Error('MODEL_IMPORT_INVALID_FILES');
        const expected=EXPECTED_FILES.find(row=>row.name===file.name);
        if(!expected)throw Error('MODEL_IMPORT_UNEXPECTED_FILE');
        if(names.has(file.name))throw Error('MODEL_IMPORT_DUPLICATE_FILE');
        names.add(file.name);
        if(file.size!==expected.bytes)throw Error('MODEL_IMPORT_SIZE_MISMATCH');
      }
      if(EXPECTED_FILES.some(file=>!names.has(file.name)))throw Error('MODEL_IMPORT_MISSING_FILES');
      if(!window.caches)throw Error('CACHE_UNAVAILABLE');
    } catch(error){return Promise.reject(error);}
    const operation=Promise.resolve().then(async()=>{
      const cache=await caches.open(CACHE);
      let imported=0;
      for(const expected of EXPECTED_FILES){
        const file=files.find(row=>row.name===expected.name);
        // Match Transformers.js 3.8.1's remoteURL cache key for a pinned revision.
        const remote=`https://huggingface.co/${INFO.modelId}/resolve/${INFO.revision}/${expected.path}`;
        const key=new URL('/__yv_local_model_cache__/'+encodeURIComponent(remote),new URL(scriptURL).origin).href;
        const headers={'Content-Length':String(expected.bytes),'Content-Type':expected.name.endsWith('.json')?'application/json':'application/octet-stream'};
        await cache.put(key,new Response(file,{headers}));
        imported+=expected.bytes;update({phase:'importing',file:expected.name,downloaded:imported,total:INFO.downloadBytes});
      }
      update({cached:true,phase:'',file:'',error:'',warning:''});
      return {files:EXPECTED_FILES.length,bytes:imported};
    }).catch(error=>{update({cached:false,phase:'',file:'',warning:'cache-unavailable',error:error.message||'MODEL_IMPORT_FAILED'});throw error;})
      .finally(()=>{if(cacheImportPromise===operation)cacheImportPromise=null;});
    cacheImportPromise=operation;
    reset();update({cached:false,phase:'importing'});
    return operation;
  }
  window.YV_LOCAL_MODEL=Object.freeze({info:INFO,state:()=>({...current}),onState(fn){if(typeof fn!=='function')throw TypeError('Listener must be a function');listeners.add(fn);fn({...current});return()=>listeners.delete(fn);},load,generate,cancel:()=>reset('MODEL_CANCELLED'),unload:()=>reset(),clearCache,importFiles});
})();
