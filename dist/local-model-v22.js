/* A lazy, key-free browser language model. Worker creation starts only on load(). */
'use strict';
(() => {
  const scriptURL=document.currentScript?.src || new URL('local-model-v22.js',document.baseURI).href;
  const WORKER_URL=new URL('local-model-worker-v22.js',scriptURL).href;
  const CACHE='yeastvar-local-qwen25-05b-q8-v22';
  const INFO=Object.freeze({modelId:'onnx-community/Qwen2.5-0.5B-Instruct',modelName:'Qwen2.5 0.5B Instruct',revision:'22942cb7d7ba4cc81bb4673549ca4d4614469b5e',dtype:'q8',downloadBytes:519136999,runtime:'Transformers.js 3.8.1',runtimeBytes:22528676,contextTokens:2048,maxOutputTokens:256,license:'Apache-2.0',modelURL:'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct',cacheName:CACHE});
  let worker=null,serial=0,loadPromise=null;
  const listeners=new Set(), pending=new Map();
  let current={status:'idle',device:null,progress:0,downloaded:0,total:INFO.downloadBytes,error:'',warning:'',cached:false};
  function update(detail) {current={...current,...detail};listeners.forEach(fn=>{try{fn({...current});}catch{}});}
  function failAll(error) {for(const p of pending.values())p.reject(error);pending.clear();loadPromise=null;}
  function reset(reason='MODEL_UNLOADED') {
    worker?.terminate();worker=null;
    const error=new Error(reason);if(reason==='MODEL_CANCELLED')error.name='AbortError';
    failAll(error);
    update({status:'idle',device:null,progress:0,downloaded:0,error:'',warning:''});
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
    owned.onerror=event=>{
      if(worker!==owned)return;
      const error=new Error(event.message||'WORKER_FAILED');owned.terminate();worker=null;failAll(error);update({status:'error',error:error.message});
    };
    return owned;
  }
  function request(type,detail={},onToken) {
    return new Promise((resolve,reject)=>{
      try {const w=ensureWorker(),id=++serial;pending.set(id,{resolve,reject,onToken});w.postMessage({type,id,...detail});}
      catch(error){update({status:'error',error:error.message});reject(error);}
    });
  }
  function load(options={}) {
    if(current.status==='ready')return Promise.resolve();
    if(loadPromise)return loadPromise;
    if(current.status==='generating')return Promise.reject(Error('MODEL_BUSY'));
    update({status:'loading',error:'',warning:'',progress:0,downloaded:0,cached:false});
    const ownedPromise=request('load',{device:['auto','wasm','webgpu'].includes(options.device)?options.device:'auto'}).finally(()=>{if(loadPromise===ownedPromise)loadPromise=null;});
    loadPromise=ownedPromise;
    return ownedPromise;
  }
  async function generate(messages,options={}) {
    if(current.status!=='ready')throw Error(current.status==='generating'?'MODEL_BUSY':'MODEL_NOT_LOADED');
    if(!Array.isArray(messages))throw Error('INVALID_MESSAGES');
    // Do not accept endpoint, token, function-calling or arbitrary runtime options.
    update({status:'generating',error:''});
    try {return await request('generate',{messages,options:{maxNewTokens:options.maxNewTokens}},typeof options.onToken==='function'?options.onToken:null);}
    catch(error){if(error.name!=='AbortError'&&worker)update({status:'ready',error:error.message});throw error;}
  }
  async function clearCache() {
    reset();
    if(!window.caches)throw Error('CACHE_UNAVAILABLE');
    await caches.delete(CACHE);update({cached:false});
  }
  window.YV_LOCAL_MODEL=Object.freeze({info:INFO,state:()=>({...current}),onState(fn){if(typeof fn!=='function')throw TypeError('Listener must be a function');listeners.add(fn);fn({...current});return()=>listeners.delete(fn);},load,generate,cancel:()=>reset('MODEL_CANCELLED'),unload:()=>reset(),clearCache});
})();
