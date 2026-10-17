'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const code=fs.readFileSync(path.resolve(__dirname,'../dist/local-model-v22.js'),'utf8');
const workers=[],deleted=[];
let completed=false;
process.once('beforeExit',()=>{if(!completed){console.error('FAIL: lifecycle checks stopped with an unresolved promise.');process.exitCode=1;}});
class FakeWorker {constructor(url,options){this.url=url;this.options=options;this.requests=[];workers.push(this);}postMessage(m){if(this.postError)throw this.postError;this.requests.push(m);}terminate(){this.terminated=true;}emit(m){this.onmessage({data:m});}}
const window={isSecureContext:true,Worker:FakeWorker,WebAssembly:{},caches:{delete:async name=>{deleted.push(name);return true;}}};
vm.runInNewContext(code,{window,Worker:FakeWorker,URL,Response,document:{currentScript:{src:'https://example.test/subpath/local-model-v22.js'}},caches:window.caches,Error,TypeError});
const api=window.YV_LOCAL_MODEL;
function finishLoad(w=workers.at(-1)){w.emit({type:'state',detail:{status:'ready'}});w.emit({type:'done',id:w.requests.at(-1).id});}
async function importChecks(){
 const opened=[],written=[],chunk=new Uint8Array(65536);let failPut=false,finishDelete;
 class LocalFile extends Blob {
  constructor(file){super([],{type:file.name.endsWith('.json')?'application/json':'application/octet-stream'});this.name=file.name;this.fileSize=file.bytes;}
  get size(){return this.fileSize;}
  set size(value){this.fileSize=value;}
  get [Symbol.toStringTag](){return'File';}
  arrayBuffer(){throw Error('Import must not allocate a full file ArrayBuffer');}
  stream(){let remaining=this.size;return new ReadableStream({pull(controller){if(!remaining){controller.close();return;}const count=Math.min(remaining,chunk.length);remaining-=count;controller.enqueue(chunk.subarray(0,count));}});}
 }
 const storage={async open(name){opened.push(name);return{async put(key,response){if(failPut)throw Error('STORAGE_QUOTA');let count=0;const reader=response.body.getReader();for(;;){const part=await reader.read();if(part.done)break;count+=part.value.byteLength;}written.push({key,bytes:count,header:response.headers.get('Content-Length')});}};},delete:()=>new Promise(resolve=>{finishDelete=resolve;})};
 const localWindow={isSecureContext:true,Worker:FakeWorker,WebAssembly:{},caches:storage};
 vm.runInNewContext(code,{window:localWindow,Worker:FakeWorker,URL,Response,document:{currentScript:{src:'https://example.test/subpath/local-model-v22.js?v=24'}},caches:storage,Error,TypeError});
 const local=localWindow.YV_LOCAL_MODEL,files=local.info.expectedFiles.map(row=>new LocalFile(row));
 const before=workers.length;
 await assert.rejects(local.importFiles(files.slice(0,4)),/MODEL_IMPORT_MISSING_FILES/);
 await assert.rejects(local.importFiles([...files,files[0]]),/MODEL_IMPORT_DUPLICATE_FILE/);
 const wrongName=files.map(file=>Object.assign(Object.create(Object.getPrototypeOf(file)),file));wrongName[0].name='another.json';await assert.rejects(local.importFiles(wrongName),/MODEL_IMPORT_UNEXPECTED_FILE/);
 const wrongSize=files.map(file=>Object.assign(Object.create(Object.getPrototypeOf(file)),file));wrongSize[4].size--;await assert.rejects(local.importFiles(wrongSize),/MODEL_IMPORT_SIZE_MISMATCH/);
 await assert.rejects(local.importFiles([{name:'config.json',size:678}]),/MODEL_IMPORT_INVALID_FILES/);
 assert.equal(opened.length,0,'all files are validated before touching the cache');assert.equal(workers.length,before,'validating a local import never creates a worker');
 const loaded=local.load();finishLoad();await loaded;const owned=workers.at(-1);const generation=local.generate([{role:'user',content:'release this session for import'}]);
 const operation=local.importFiles(Object.assign({length:files.length},files));await assert.rejects(generation,/MODEL_UNLOADED/);assert.equal(owned.terminated,true);
 await assert.rejects(local.load(),/MODEL_CACHE_IMPORTING/);await assert.rejects(local.clearCache(),/MODEL_CACHE_IMPORTING/);await assert.rejects(local.importFiles(files),/MODEL_CACHE_IMPORTING/);
 const result=await operation;assert.deepEqual(JSON.parse(JSON.stringify(result)),{files:5,bytes:519136999});assert.equal(workers.length,before+1,'importing bytes does not create a replacement worker');
 assert.equal(local.state().status,'idle');assert.equal(local.state().cached,true);assert.equal(written.length,5);assert.equal(written.reduce((sum,row)=>sum+row.bytes,0),local.info.downloadBytes);
 for(const expected of local.info.expectedFiles){const remote=`https://huggingface.co/${local.info.modelId}/resolve/${local.info.revision}/${expected.path}`;const key='https://example.test/__yv_local_model_cache__/'+encodeURIComponent(remote);const row=written.find(entry=>entry.key===key);assert.equal(row?.bytes,expected.bytes);assert.equal(row?.header,String(expected.bytes));}
 owned.emit({type:'state',detail:{status:'ready'}});assert.equal(local.state().status,'idle','a released inference session cannot restore itself during import');
 failPut=true;await assert.rejects(local.importFiles(files),/STORAGE_QUOTA/);assert.equal(local.state().cached,false);assert.equal(local.state().warning,'cache-unavailable');
 const clearing=local.clearCache();await assert.rejects(local.importFiles(files),/MODEL_CACHE_CLEARING/);await Promise.resolve();finishDelete(true);await clearing;
 const retry=local.load();finishLoad();await retry;local.unload();
}
async function workerChecks(){
 const original=fs.readFileSync(path.resolve(__dirname,'../dist/local-model-worker-v22.js'),'utf8');
 // Only replace the module loader in this isolated harness. The cache, context,
 // progress, fallback and request handlers execute the production worker code.
 const workerCode=original.replace("await import('./vendor/transformers-3.8.1/transformers.min.js')",'__runtime').replaceAll('import.meta.url',JSON.stringify('https://example.test/subpath/local-model-worker-v22.js'));
 function harness({gpu=true,pipeline,generationError}={}){
  const messages=[],entries=new Map(),deleted=[],calls=[],network=[];
  const runtime={env:{backends:{onnx:{wasm:{}}}},TextStreamer:class{constructor(tokenizer,options){this.options=options;}}};
  const cache={async match(key){const entry=entries.get(key);return typeof entry==='function'?entry():entry?.clone();},async put(key,response){const chunks=[];const reader=response.body.getReader();for(;;){const part=await reader.read();if(part.done)break;chunks.push(part.value);}entries.set(key,new Response(new Blob(chunks),{headers:response.headers}));},async delete(key){deleted.push(key);return entries.delete(key);}};
  const tokenizer=Object.assign(prompt=>({input_ids:{dims:[1,prompt.length]}}),{apply_chat_template:chat=>chat.map(m=>m.content).join('|'),decode:()=> 'fallback response'});
  const makeGenerator=()=>Object.assign(async()=>[],{tokenizer,model:{async generate(options){if(generationError)throw Error(generationError);options.streamer.options.callback_function('A model answer');return {tolist:()=>[[1,2]]};}},dispose:async()=>{}});
  runtime.pipeline=async(type,model,options)=>{calls.push(options);return pipeline?pipeline({type,model,options,runtime,makeGenerator,self}):makeGenerator();};
  const self={location:{origin:'https://example.test'},postMessage:m=>messages.push(m),fetch:async input=>{network.push(String(input));return new Response('runtime asset');}};
  const context={self,__runtime:runtime,caches:{open:async()=>cache},navigator:{gpu:gpu?{requestAdapter:async()=>({})}:undefined},URL,Headers,Response,ReadableStream,performance};
  vm.runInNewContext(workerCode,context);
  return {messages,entries,deleted,calls,network,runtime,cache,self,async send(message){await self.onmessage({data:message});return messages.at(-1);},key:file=>'https://example.test/__yv_local_model_cache__/'+encodeURIComponent('https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct/resolve/22942cb7d7ba4cc81bb4673549ca4d4614469b5e/'+file)};
 }
 const h=harness({gpu:false});await h.send({type:'load',id:1,device:'auto'});
 assert.equal(h.calls[0].device,'wasm','unavailable WebGPU falls back to CPU');
 assert.equal(h.calls[0].revision,'22942cb7d7ba4cc81bb4673549ca4d4614469b5e');
 assert.equal(h.calls[0].dtype,'q8');assert.equal(h.calls[0].trust_remote_code,false);
 assert.equal(h.runtime.env.backends.onnx.wasm.numThreads,1);
 assert.equal(h.runtime.env.backends.onnx.wasm.wasmPaths,'https://example.test/subpath/vendor/transformers-3.8.1/');
 const key='https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct/resolve/22942cb7d7ba4cc81bb4673549ca4d4614469b5e/config.json';
 h.entries.set(h.key('config.json'),new Response('broken',{headers:{'Content-Length':'6'}}));
 assert.equal(await h.runtime.env.customCache.match(key),undefined,'wrong cached byte length is evicted before use');assert.equal(h.deleted.length,1);
 h.entries.set(h.key('config.json'),new Response('short',{headers:{'Content-Length':'678'}}));
 const corrupt=await h.runtime.env.customCache.match(key);
 await assert.rejects(corrupt.arrayBuffer(),/MODEL_FILE_INCOMPLETE/,'actual stream length is checked even if a header claims the right length');
 assert.equal(h.entries.has(h.key('config.json')),false);
 h.entries.set(h.key('config.json'),new Response(new Uint8Array(679),{headers:{'Content-Length':'678'}}));
 const oversized=await h.runtime.env.customCache.match(key);await assert.rejects(oversized.arrayBuffer(),/MODEL_FILE_INCOMPLETE/,'oversized streams are stopped and evicted');assert.equal(h.entries.has(h.key('config.json')),false);
 const correct=new Uint8Array(678);await h.runtime.env.customCache.put(key,new Response(correct));
 const valid=await h.runtime.env.customCache.match(key);assert.equal((await valid.arrayBuffer()).byteLength,678);
 assert.equal(h.messages.filter(m=>m.type==='state').at(-1).detail.cached,false,'a configuration alone is not an offline model');
 const compressedHeaders=new Response(correct,{headers:{'Content-Length':'123','Content-Encoding':'gzip'}});
 await h.runtime.env.customCache.put(key,compressedHeaders);assert.equal(h.entries.get(h.key('config.json')).headers.get('Content-Length'),'678','decoded bodies use uncompressed fixed lengths');
 await h.send({type:'generate',id:2,messages:[{role:'user',content:'hello'}],options:{maxNewTokens:999}});
 assert.equal(h.messages.at(-1).text,'A model answer');assert.ok(h.messages.some(m=>m.type==='token'&&m.id===2));
 const long=harness({gpu:false});await long.send({type:'load',id:3,device:'wasm'});await long.send({type:'generate',id:4,messages:[{role:'system',content:'system'},{role:'user',content:'x'.repeat(2200)}]});assert.equal(long.messages.at(-1).error,'CONTEXT_TOO_LONG');
 const broken=harness({gpu:false,generationError:'RUNTIME_GENERATION_FAILED'});await broken.send({type:'load',id:5,device:'wasm'});await broken.send({type:'generate',id:6,messages:[{role:'user',content:'hello'}]});assert.equal(broken.messages.at(-1).error,'RUNTIME_GENERATION_FAILED');assert.ok(broken.messages.some(m=>m.type==='state'&&m.detail.status==='ready'&&m.detail.error==='RUNTIME_GENERATION_FAILED'));
 let disposed=false;
 const fallback=harness({pipeline:({options,makeGenerator})=>{const g=makeGenerator();if(options.device==='webgpu'){const bad=Object.assign(async()=>{throw Error('GPU_OPERATOR_UNSUPPORTED');},g);bad.dispose=async()=>{disposed=true;};return bad;}return g;}});
 await fallback.send({type:'load',id:7,device:'auto'});assert.deepEqual(fallback.calls.map(o=>o.device),['webgpu','wasm']);assert.equal(disposed,true);assert.ok(fallback.messages.some(m=>m.type==='state'&&m.detail.warning==='gpu-fallback'));
 const absent=harness({gpu:false});await absent.send({type:'load',id:8,device:'wasm',offline:true});assert.equal(absent.messages.at(-1).error,'MODEL_OFFLINE_FILES_MISSING');assert.equal(absent.calls.length,0,'missing offline files stop before creating a model session');assert.equal(absent.network.length,0,'missing offline files never fall back to a model fetch');
 function populate(h){const chunk=new Uint8Array(65536);for(const file of api.info.expectedFiles)h.entries.set(h.key(file.path),()=>{let remaining=file.bytes;return new Response(new ReadableStream({pull(controller){if(!remaining){controller.close();return;}const count=Math.min(remaining,chunk.length);remaining-=count;controller.enqueue(chunk.subarray(0,count));}}),{headers:{'Content-Length':String(file.bytes)}});});}
 const cachedOnly=harness({gpu:false,pipeline:async({runtime,options,makeGenerator,self})=>{
  assert.equal(runtime.env.allowLocalModels,true);assert.equal(runtime.env.allowRemoteModels,false);assert.equal(options.local_files_only,true);
  for(const file of api.info.expectedFiles){assert.equal(await runtime.env.customCache.match('/models/onnx-community/Qwen2.5-0.5B-Instruct/'+file.path),undefined);const response=await runtime.env.customCache.match('https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct/resolve/22942cb7d7ba4cc81bb4673549ca4d4614469b5e/'+file.path);assert.ok(response,'the pinned resolve cache key must still be found in offline mode');let bytes=0;const reader=response.body.getReader();for(;;){const part=await reader.read();if(part.done)break;bytes+=part.value.byteLength;}assert.equal(bytes,file.bytes);}
  return makeGenerator();
 }});populate(cachedOnly);await cachedOnly.send({type:'load',id:9,device:'wasm',offline:true});assert.equal(cachedOnly.messages.at(-1).type,'done');assert.equal(cachedOnly.network.length,0);assert.ok(cachedOnly.messages.some(m=>m.type==='state'&&m.detail.status==='ready'&&m.detail.cached&&m.detail.offline));
 await cachedOnly.self.fetch('https://example.test/subpath/vendor/transformers-3.8.1/ort-wasm-simd-threaded.jsep.wasm');assert.equal(cachedOnly.network.length,1,'offline mode permits bundled runtime assets');
 for(const url of ['https://huggingface.co/model/config.json','https://other.test/ort.wasm','/models/onnx-community/Qwen2.5-0.5B-Instruct/config.json','https://example.test/subpath/vendor/transformers-3.8.1/../model.onnx'])await assert.rejects(cachedOnly.self.fetch(url),/MODEL_OFFLINE_FILES_MISSING/);
 await assert.rejects(cachedOnly.self.fetch('https://example.test/subpath/vendor/transformers-3.8.1/ort-wasm-simd-threaded.jsep.wasm',{method:'POST'}),/MODEL_OFFLINE_FILES_MISSING/);assert.equal(cachedOnly.network.length,1,'the guard rejects requests before calling the real fetch');
 const evicted=harness({gpu:false,pipeline:async({self})=>{try{await self.fetch('/models/onnx-community/Qwen2.5-0.5B-Instruct/config.json');}catch{}throw Error('local_files_only fallback failed');}});populate(evicted);await evicted.send({type:'load',id:10,device:'wasm',offline:true});assert.equal(evicted.messages.at(-1).error,'MODEL_OFFLINE_FILES_MISSING');assert.equal(evicted.network.length,0,'even a cache race after preflight cannot perform a model fetch');
 await h.self.fetch('https://huggingface.co/normal/config.json');assert.equal(h.network.length,1,'normal workers retain their ordinary fetch behavior');assert.equal(h.runtime.env.allowLocalModels,false);assert.equal(h.runtime.env.allowRemoteModels,true);assert.equal(h.calls[0].local_files_only,false);
}
(async()=>{
 assert.equal(workers.length,0,'opening the page must not create/download the model');
 assert.equal(api.state().status,'idle');
 const states=[];const off=api.onState(s=>states.push(s.status));
 const initial=api.load({device:'wasm',offline:'true'});assert.equal(api.load(),initial,'coalesce simultaneous loads');
 assert.equal(workers.length,1);assert.equal(workers[0].url,'https://example.test/subpath/local-model-worker-v22.js');
 const w=workers[0],id=w.requests[0].id;w.emit({type:'state',detail:{status:'ready',device:'wasm'}});w.emit({type:'done',id});await initial;
 assert.equal(w.requests[0].offline,false,'only an explicit boolean enables offline mode');
 let chunks='';const gen=api.generate([{role:'user',content:'hello'}],{maxNewTokens:16,onToken:c=>chunks+=c,endpoint:'https://not-allowed.test'});
 assert.equal(api.state().status,'generating');const req=w.requests[1];assert.deepEqual(Object.keys(req.options),['maxNewTokens']);
 await assert.rejects(api.generate([{role:'user',content:'duplicate'}]),/MODEL_BUSY/);
 w.emit({type:'token',id:req.id,chunk:'Hello'});w.emit({type:'state',detail:{status:'ready'}});w.emit({type:'done',id:req.id,text:'Hello'});
 assert.equal(await gen,'Hello');assert.equal(chunks,'Hello');
 const pending=api.generate([{role:'user',content:'cancel me'}]);api.cancel();await assert.rejects(pending,e=>e.name==='AbortError');assert.equal(w.terminated,true);assert.equal(api.state().status,'idle');
 w.emit({type:'state',detail:{status:'ready'}});assert.equal(api.state().status,'idle','stale workers cannot restore state');
 const cancelled=api.load();api.cancel();const retry=api.load();await assert.rejects(cancelled,e=>e.name==='AbortError');assert.equal(api.load(),retry,'old cancellation cannot erase a new load promise');
 const latest=workers.at(-1);latest.emit({type:'state',detail:{status:'ready'}});latest.emit({type:'done',id:latest.requests[0].id});await retry;
 const released=api.generate([{role:'user',content:'unload while generating'}]);api.unload();const reloaded=api.load();await assert.rejects(released,/MODEL_UNLOADED/);assert.equal(api.state().status,'loading','an old generation rejection must not overwrite its replacement worker');finishLoad();await reloaded;
 const cloneWorker=workers.at(-1);cloneWorker.postError=Error('DATA_CLONE_FAILED');await assert.rejects(api.generate([{role:'user',content:'unsupported payload'}]),/DATA_CLONE_FAILED/);assert.equal(api.state().status,'ready');cloneWorker.postError=null;
 const afterClone=api.generate([{role:'user',content:'recover'}]);const afterCloneReq=cloneWorker.requests.at(-1);cloneWorker.emit({type:'state',detail:{status:'ready'}});cloneWorker.emit({type:'done',id:afterCloneReq.id,text:'recovered'});assert.equal(await afterClone,'recovered');
 const messageFailure=api.generate([{role:'user',content:'worker decode failure'}]);cloneWorker.onmessageerror({});await assert.rejects(messageFailure,/WORKER_MESSAGE_FAILED/);assert.equal(api.state().status,'error');assert.equal(cloneWorker.terminated,true);
 const retryAfterFailure=api.load();finishLoad();await retryAfterFailure;
 let finishDelete;window.caches.delete=name=>{deleted.push(name);return new Promise(resolve=>{finishDelete=resolve;});};
 let attemptedReload=false,reentrantError='';const reentrantOff=api.onState(s=>{if(s.status==='idle'&&!attemptedReload){attemptedReload=true;api.load().catch(error=>{reentrantError=error.message;});}});
 const clear=api.clearCache();assert.equal(api.clearCache(),clear,'concurrent cache deletion is coalesced');await assert.rejects(api.load(),/MODEL_CACHE_CLEARING/);await Promise.resolve();finishDelete(true);await clear;reentrantOff();assert.equal(reentrantError,'MODEL_CACHE_CLEARING','state listeners also cannot load a worker during deletion');
 assert.deepEqual(deleted,['yeastvar-local-qwen25-05b-q8-v22']);assert.equal(api.state().cached,false);assert.equal(workers.at(-1).terminated,true);
 window.caches.delete=async()=>{throw Error('STORAGE_DENIED');};await assert.rejects(api.clearCache(),/STORAGE_DENIED/);assert.equal(api.state().warning,'cache-unavailable');const afterDeleteFailure=api.load();finishLoad();await afterDeleteFailure;api.unload();
 await assert.rejects(api.generate([]),/MODEL_NOT_LOADED/);off();assert.ok(states.includes('generating'));
 const versionedWindow={...window};vm.runInNewContext(code,{window:versionedWindow,Worker:FakeWorker,URL,Response,document:{currentScript:{src:'https://example.test/subpath/local-model-v22.js?v=22.0.2'}},caches:versionedWindow.caches,Error,TypeError});
 const versionedLoad=versionedWindow.YV_LOCAL_MODEL.load({offline:true,endpoint:'https://not-allowed.test'});assert.equal(workers.at(-1).url,'https://example.test/subpath/local-model-worker-v22.js?v=22.0.2');assert.equal(workers.at(-1).requests[0].offline,true);assert.equal(Object.hasOwn(workers.at(-1).requests[0],'endpoint'),false);finishLoad();await versionedLoad;versionedWindow.YV_LOCAL_MODEL.unload();
 await workerChecks();
 await importChecks();
 completed=true;
 console.log('PASS: lazy initialization, subpath URLs, streaming, option allowlist, cancellation/reload ownership, worker failures, cache-deletion/import races, fixed local-file import, cache-only preflight and fetch guard, prompt limits and GPU-to-CPU fallback.');
})().catch(e=>{completed=true;console.error(e);process.exitCode=1;});
