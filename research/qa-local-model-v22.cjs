'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const {chromium}=require('@playwright/test');
const base=process.env.YV_TEST_URL||'http://127.0.0.1:4173/';
const dir=path.resolve(__dirname,'cache/v22-local-model');fs.mkdirSync(dir,{recursive:true});
(async()=>{
 let fixtureServer=null,fixtureVerified=false;
 const fixture=path.join(dir,'model_quantized.onnx');
 if(fs.existsSync(fixture)) {
  const hash=crypto.createHash('sha256');for await(const chunk of fs.createReadStream(fixture))hash.update(chunk);
  if(hash.digest('hex')!=='41834041ab1b29eff9fc592f1a29a1844133aea35832ea9fa91682be13016100')throw Error('Official model fixture SHA mismatch');
  fixtureVerified=true;fixtureServer=http.createServer((req,res)=>{res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Length':fs.statSync(fixture).size,'Access-Control-Allow-Origin':'*'});fs.createReadStream(fixture).pipe(res);});
  await new Promise(resolve=>fixtureServer.listen(0,'127.0.0.1',resolve));
 }
 const browser=await chromium.launchPersistentContext(path.join(dir,'browser-profile'),{headless:true,executablePath:process.env.CHROME_PATH||'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--disable-gpu','--disable-dev-shm-usage']});
 const page=await browser.newPage(), requests=[],httpErrors=[];
 page.on('response',r=>{if(r.status()>=400)httpErrors.push({status:r.status(),url:r.url()});});
 if(fixtureVerified)await browser.route('https://huggingface.co/onnx-community/Qwen2.5-0.5B-Instruct/resolve/22942cb7d7ba4cc81bb4673549ca4d4614469b5e/onnx/model_quantized.onnx',route=>route.fulfill({status:307,headers:{'Access-Control-Allow-Origin':'*',location:`http://127.0.0.1:${fixtureServer.address().port}/model.onnx`},body:''}));
 page.on('request',r=>{if(/huggingface|hf.co|xethub/.test(r.url()))requests.push({method:r.method(),url:r.url().split('?')[0],post:r.postData()});});
 page.on('console',m=>{if(m.type()==='error')console.log('BROWSER_ERROR',m.text().slice(0,500));});
 page.on('pageerror',e=>console.log('PAGE_ERROR',e.message));
 await page.goto(base,{waitUntil:'domcontentloaded'});
 if(!await page.evaluate(()=>Boolean(window.YV_LOCAL_MODEL)))await page.addScriptTag({url:new URL('local-model-v22.js',base).href});
 await page.exposeFunction('reportModelState',s=>{fs.writeFileSync(path.join(dir,'live-state.json'),JSON.stringify(s,null,2));if(s.status!=='loading'||s.phase==='done')console.log('STATE',JSON.stringify(s));});
 await page.evaluate(()=>window.YV_LOCAL_MODEL.onState(window.reportModelState));
 const start=Date.now();
 try{
  await page.evaluate(()=>window.YV_LOCAL_MODEL.load({device:'wasm'}));
  console.log('LOADED_MS',Date.now()-start);
  const generated=await page.evaluate(()=>window.YV_LOCAL_MODEL.generate([{role:'system',content:'请用中文简洁回答。'},{role:'user',content:'你好，请用一句话介绍你能帮助我整理酵母单细胞研究方案。'}],{maxNewTokens:48}));
  console.log('GENERATED',generated);
  if(!/[\u4e00-\u9fff]/.test(generated)||generated.length<8)throw Error('No substantive Chinese model response');
  const before=requests.length;
  // Simulate loss of external network while the locally installed site is served.
  await browser.route('https://**/*',route=>route.abort('internetdisconnected'));
  await page.evaluate(()=>window.YV_LOCAL_MODEL.unload());
  await page.evaluate(()=>window.YV_LOCAL_MODEL.load({device:'wasm'}));
  const offline=await page.evaluate(()=>window.YV_LOCAL_MODEL.generate([{role:'user',content:'用中文说：这是离线测试。'}],{maxNewTokens:16}));
  const state=await page.evaluate(()=>window.YV_LOCAL_MODEL.state());
  await page.evaluate(()=>window.YV_LOCAL_MODEL.unload());
  await page.evaluate(()=>window.YV_COMPANION.open({tab:'guide'}));
  await page.locator('#lm22-question').fill('CLN2可以注释什么状态？');
  await page.locator('#lm22-send').click();
  await page.waitForFunction(()=>!window.YV_RESEARCH_ASSISTANT.state().busy && document.querySelector('.lm22-turn:last-child .lm22-answer-text')?.textContent.trim(),{},{timeout:180000});
  const rag=await page.locator('.lm22-turn').last().innerText();
  const ragAnswer=await page.locator('.lm22-turn:last-child .lm22-answer-text').innerText();
  const answerKind=await page.locator('.lm22-turn').last().getAttribute('data-answer-kind');
  const sourceSummaryModelState=await page.evaluate(()=>window.YV_LOCAL_MODEL.state().status);
  const sources=await page.locator('.lm22-turn').last().locator('a[href^="http"]').evaluateAll(a=>a.map(e=>({text:e.textContent,url:e.href})));
  console.log('RAG_CLN2',rag);
  if(answerKind!=='source'||sourceSummaryModelState!=='idle'||!ragAnswer.includes('CLN2')||!/(G1|Start|START|起始|周期)/.test(ragAnswer)||sources.length===0)throw Error('CLN2 source summary must work without loading a model and retain marker evidence');
  await page.screenshot({path:path.join(dir,'real-cln2-companion.png'),fullPage:false});
  const result={date:new Date().toISOString(),runtime:'Transformers.js 3.8.1',device:'wasm',model:'onnx-community/Qwen2.5-0.5B-Instruct',revision:'22942cb7d7ba4cc81bb4673549ca4d4614469b5e',dtype:'q8',fixtureVerified,elapsedMs:Date.now()-start,generated,offline,sourceSummary:{answerKind,sourceSummaryModelState,rag,ragAnswer,sources},state,httpErrors,networkRequests:requests,offlineAdditionalModelRequests:requests.length-before,scope:'Real WASM generation and offline cached reload validated. Exact marker summaries come directly from catalogue evidence, not LLM inference. General scientific prose quality is not established by this test.'};
  if(requests.some(r=>r.method!=='GET'||r.post))throw Error('Unexpected inference network submission');
  fs.writeFileSync(path.join(dir,'real-inference-result.json'),JSON.stringify(result,null,2));
  console.log('PASS real WASM Chinese generation; offline cached reload; CLN2 direct source summary without loaded model; model network GET only.');
 }finally{await browser.close();if(fixtureServer)fixtureServer.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
