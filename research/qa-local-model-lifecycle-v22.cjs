'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const code=fs.readFileSync(path.resolve(__dirname,'../dist/local-model-v22.js'),'utf8');
const workers=[],deleted=[];
class FakeWorker {constructor(url,options){this.url=url;this.options=options;this.requests=[];workers.push(this);}postMessage(m){this.requests.push(m);}terminate(){this.terminated=true;}emit(m){this.onmessage({data:m});}}
const window={isSecureContext:true,Worker:FakeWorker,WebAssembly:{},caches:{delete:async name=>{deleted.push(name);return true;}}};
vm.runInNewContext(code,{window,Worker:FakeWorker,URL,document:{currentScript:{src:'https://example.test/subpath/local-model-v22.js'}},caches:window.caches,Error,TypeError});
const api=window.YV_LOCAL_MODEL;
(async()=>{
 assert.equal(workers.length,0,'opening the page must not create/download the model');
 assert.equal(api.state().status,'idle');
 const states=[];const off=api.onState(s=>states.push(s.status));
 const initial=api.load({device:'wasm'});assert.equal(api.load(),initial,'coalesce simultaneous loads');
 assert.equal(workers.length,1);assert.equal(workers[0].url,'https://example.test/subpath/local-model-worker-v22.js');
 const w=workers[0],id=w.requests[0].id;w.emit({type:'state',detail:{status:'ready',device:'wasm'}});w.emit({type:'done',id});await initial;
 let chunks='';const gen=api.generate([{role:'user',content:'hello'}],{maxNewTokens:16,onToken:c=>chunks+=c,endpoint:'https://not-allowed.test'});
 assert.equal(api.state().status,'generating');const req=w.requests[1];assert.deepEqual(Object.keys(req.options),['maxNewTokens']);
 await assert.rejects(api.generate([{role:'user',content:'duplicate'}]),/MODEL_BUSY/);
 w.emit({type:'token',id:req.id,chunk:'Hello'});w.emit({type:'state',detail:{status:'ready'}});w.emit({type:'done',id:req.id,text:'Hello'});
 assert.equal(await gen,'Hello');assert.equal(chunks,'Hello');
 const pending=api.generate([{role:'user',content:'cancel me'}]);api.cancel();await assert.rejects(pending,e=>e.name==='AbortError');assert.equal(w.terminated,true);assert.equal(api.state().status,'idle');
 w.emit({type:'state',detail:{status:'ready'}});assert.equal(api.state().status,'idle','stale workers cannot restore state');
 const cancelled=api.load();api.cancel();const retry=api.load();await assert.rejects(cancelled,e=>e.name==='AbortError');assert.equal(api.load(),retry,'old cancellation cannot erase a new load promise');
 const latest=workers.at(-1);latest.emit({type:'state',detail:{status:'ready'}});latest.emit({type:'done',id:latest.requests[0].id});await retry;
 await api.clearCache();assert.deepEqual(deleted,['yeastvar-local-qwen25-05b-q8-v22']);assert.equal(api.state().cached,false);assert.equal(latest.terminated,true);
 await assert.rejects(api.generate([]),/MODEL_NOT_LOADED/);off();assert.ok(states.includes('generating'));
 console.log('PASS: lazy initialization, subpath URL, coalesced loading, streaming, option allowlist, concurrency guard, cancellation, stale-worker guard, cancellation/retry race, isolated cache deletion.');
})().catch(e=>{console.error(e);process.exitCode=1;});
