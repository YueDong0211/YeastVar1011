'use strict';
// UI integration tests use a controlled engine. Real model computation is tested separately.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('@playwright/test');
const out=path.join(__dirname,'cache/v22-assistant-ui');fs.mkdirSync(out,{recursive:true});
const checks=[],errors=[],external=[];
const base=process.env.YV_TEST_URL||'http://127.0.0.1:4173/';
async function check(name,fn){try{const detail=await fn();checks.push({name,pass:true,detail});console.log('PASS',name);}catch(e){checks.push({name,pass:false,error:e.stack});console.error('FAIL',name,e.message);}}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':undefined)});
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/huggingface|hf\.co/.test(r.url()))external.push(r.url());});
 await page.addInitScript(()=>{sessionStorage.setItem('yv.intro.v3','seen');});
 try{
  for(let retry=0;retry<20;retry++){try{if((await fetch(base)).ok)break;}catch{}if(retry===19)throw Error('Preview server unavailable');await new Promise(r=>setTimeout(r,250));}
  await page.goto(base);await page.waitForFunction(()=>window.__YV_READY__&&YV_RESEARCH_ASSISTANT&&YV_COMPANION&&document.querySelector('#intro')?.hidden);
  await check('No model network or worker before explicit load; initial controls are usable',async()=>{
   assert.equal(await page.evaluate(()=>YV_LOCAL_MODEL.state().status),'idle');assert.equal(external.length,0);
   await page.evaluate(()=>YV_COMPANION.open({tab:'guide'}));
   assert(await page.locator('[data-lm22=load]').isEnabled());assert(await page.locator('#lm22-send').isDisabled());
   assert(await page.locator('#yv-local-assistant').isVisible());
  });
  await check('Chinese gene names retrieve exact SGD records and source links',async()=>{
   const hits=await page.evaluate(()=>YV_RESEARCH_ASSISTANT.retrieve('CLN2可以注释什么状态？').map(h=>({kind:h.kind,symbol:h.record.symbol,sources:h.sources})));
   assert.equal(hits[0].symbol,'CLN2');assert(hits[0].sources.some(s=>s.startsWith('https://')));return{records:hits.length};
  });
  await check('Five languages fit desktop and narrow phones without horizontal overflow',async()=>{
   for(const width of [320,390,1440])for(const language of ['zh','en','fr','es','eu']){
    await page.setViewportSize({width,height:width<500?844:1000});await page.evaluate(language=>YV_APP.setPreference('language',language),language);
    await page.evaluate(()=>YV_COMPANION.update());
    const bounds=await page.locator('#yv-companion-panel').evaluate(el=>({w:el.clientWidth,scroll:el.scrollWidth,right:el.getBoundingClientRect().right}));
    assert(bounds.scroll<=bounds.w+1,`${language}/${width}: ${JSON.stringify(bounds)}`);assert(bounds.right<=width+1);
    if(language!=='zh')assert(!/[\u3400-\u9fff]/.test(await page.locator('#yv-local-assistant').innerText()),language);
   }
   await page.evaluate(()=>YV_APP.setPreference('language','zh'));await page.evaluate(()=>YV_COMPANION.update());
   await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:path.join(out,'assistant-desktop.png')});
   await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'assistant-phone.png')});
  });
  // Replace only the model engine to exercise UI outcomes deterministically.
  await page.evaluate(()=>{
   YV_COMPANION.close();window.__originalEngine=YV_LOCAL_MODEL;let state={status:'idle',progress:0,device:null},listener=()=>{},rejectPending;
   window.__ui={loads:0,caches:0,cancel:0,messages:null,mode:'normal'};
   const set=s=>{state={...state,...s};listener(state);};
   window.YV_LOCAL_MODEL={info:__originalEngine.info,state:()=>state,onState:f=>(listener=f,f(state),()=>{}),load:async()=>{__ui.loads++;set({status:'loading',progress:.5,downloaded:260000000,total:519136999});await new Promise(r=>setTimeout(r,80));set({status:'ready',device:'wasm'});},generate:async(messages,options)=>{__ui.messages=messages;set({status:'generating'});if(__ui.mode==='pending')return new Promise((resolve,reject)=>{rejectPending=reject;});options.onToken('CLN2与G1/S相关 [1]。\n');await new Promise(r=>setTimeout(r,30));const result='CLN2与G1/S相关 [1]。\n<img src=x onerror=window.__unsafe=1>';options.onToken('<img src=x onerror=window.__unsafe=1>');set({status:'ready'});return result;},cancel:()=>{__ui.cancel++;rejectPending?.(Object.assign(Error('stopped'),{name:'AbortError'}));rejectPending=null;set({status:'idle'});},unload:()=>set({status:'idle'}),clearCache:async()=>{__ui.caches++;set({status:'idle'});}};
  });
  // Reload the UI sidecar to subscribe to the controlled engine, retaining the real app and catalogue.
  await page.addScriptTag({url:new URL('research-assistant-v22.js',base).href});
  await page.evaluate(()=>YV_COMPANION.open({tab:'guide'}));
  const before=await page.evaluate(()=>JSON.stringify(YV_BUILDER.getPlan()));
  await check('Load, streamed answer, evidence cards, escaped text and plan preservation',async()=>{
   await page.locator('[data-lm22=load]').click();await page.waitForFunction(()=>YV_LOCAL_MODEL.state().status==='ready');
   await page.locator('#lm22-question').fill('IRescue');await page.locator('#lm22-send').click();await page.locator('.lm22-turn:last-child [data-lm22=explain]').click();
   await page.waitForFunction(()=>!YV_RESEARCH_ASSISTANT.state().busy);
   assert((await page.locator('.lm22-answer-text').innerText()).includes('<img'));assert.equal(await page.locator('.lm22-answer img').count(),0);
   assert.equal(await page.evaluate(()=>window.__unsafe),undefined);assert(await page.locator('.lm22-sources [data-lm22=record]').count()>0);
   assert((await page.evaluate(()=>__ui.messages[1].content)).includes('IRescue'));
   assert.equal(await page.evaluate(()=>JSON.stringify(YV_BUILDER.getPlan())),before);
   await page.screenshot({path:path.join(out,'answer-phone.png')});
  });
  await check('Current-plan opt-out excludes the plan from prompt; history clears without unloading',async()=>{
   await page.locator('#lm22-plan').uncheck();await page.locator('#lm22-question').fill('IRescue');await page.locator('#lm22-send').click();await page.waitForFunction(()=>!YV_RESEARCH_ASSISTANT.state().busy);
   assert(!(await page.evaluate(()=>__ui.messages[1].content)).includes('CURRENT PLAN'));
   await page.locator('.lm22-controls > summary').click();await page.locator('[data-lm22=clear]').click();assert.equal(await page.locator('.lm22-turn').count(),0);assert.equal(await page.evaluate(()=>YV_LOCAL_MODEL.state().status),'ready');
  });
  await check('Stop cancels inference; cache removal requires confirmation and preserves plan',async()=>{
   await page.evaluate(()=>__ui.mode='pending');await page.locator('#lm22-question').fill('IRescue');await page.locator('#lm22-send').click();
   await page.waitForFunction(()=>YV_RESEARCH_ASSISTANT.state().busy);await page.locator('[data-lm22=stop]').click();assert.equal(await page.evaluate(()=>YV_RESEARCH_ASSISTANT.state().busy),false);
   await page.locator('[data-lm22=cache]').click();assert.equal(await page.evaluate(()=>__ui.caches),0);
   await page.locator('[data-lm22=confirm-cache]').click();assert.equal(await page.evaluate(()=>__ui.caches),1);
   assert.equal(await page.evaluate(()=>JSON.stringify(YV_BUILDER.getPlan())),before);
  });
  await check('Gene answers use exact source summaries without loading a model, and open the real marker drawer',async()=>{
   await page.locator('#lm22-question').fill('CLN2可以注释什么状态？');await page.locator('#lm22-send').click();
   assert.equal(await page.locator('.lm22-turn:last-child').getAttribute('data-answer-kind'),'source');
   assert((await page.locator('.lm22-turn:last-child .lm22-answer-text').innerText()).includes('CLN2'));
   assert.equal(await page.evaluate(()=>YV_LOCAL_MODEL.state().status),'idle');
   await page.locator('.lm22-turn:last-child .lm22-sources [data-lm22=record]').first().click();assert.equal(await page.locator('#yv-companion-panel').isVisible(),false);
   await page.locator('#drawer:not([hidden])').waitFor();
   assert((await page.locator('body').innerText()).includes('CLN2'));
  });
  await check('Marker metadata controls show 235 NaCl/higher genes and tab history preserves the filters',async()=>{
   await page.evaluate(()=>{YV_APP.closeDrawer();YV_COMPANION.close();location.hash='#markers?view=catalogue';});
   await page.setViewportSize({width:1440,height:1000});await page.locator('.mw-catalogue').waitFor();
   const reset=page.locator('.mw-active-filters [data-mw=reset]');if(await reset.count())await reset.click();
   await page.locator('.mw-facet[data-mw-facet=metadata] > summary').click();
   await page.locator('#mw-condition-query').fill('NaCl');
   await page.waitForFunction(()=>YV_MARKERS.getState().condition==='NaCl');
   await page.locator('select[data-mw-value=direction]').selectOption('higher');
   await page.waitForFunction(()=>/^235\b/.test(document.querySelector('.mw-result-summary > strong')?.textContent.trim()||''));
   assert.equal(await page.evaluate(()=>YV_MARKERS.filterResults().length),235);
   const filtered=await page.evaluate(()=>JSON.stringify(YV_MARKERS.exportData().candidateQuery.filters));
   await page.locator('.mw-tabs [data-mw=tab][data-value=databases]').click();await page.waitForURL('**/#markers?view=databases');await page.locator('.db24').waitFor();
   await page.locator('.mw-tabs [data-mw=tab][data-value=coverage]').click();await page.waitForURL('**/#markers?view=coverage');
   await page.goBack();await page.waitForURL('**/#markers?view=databases');await page.locator('.db24').waitFor();
   await page.goBack();await page.waitForURL('**/#markers?view=catalogue');await page.locator('#mw-condition-query').waitFor({state:'attached'});
   assert.equal(await page.locator('#mw-condition-query').inputValue(),'NaCl');assert.equal(await page.locator('select[data-mw-value=direction]').inputValue(),'higher');
   assert.match(await page.locator('.mw-result-summary > strong').innerText(),/^235\b/);assert.equal(await page.evaluate(()=>JSON.stringify(YV_MARKERS.exportData().candidateQuery.filters)),filtered);
   assert.equal(await page.evaluate(()=>JSON.stringify(YV_BUILDER.getPlan())),before);
  });
  await check('Twelve database cards and expanded import fields fit five languages at 320, 390 and 1440 pixels',async()=>{
   await page.evaluate(()=>{YV_COMPANION.close();location.hash='#markers?view=databases';});await page.locator('.db24').waitFor();
   for(const width of [320,390,1440])for(const language of ['zh','en','fr','es','eu']){
    await page.setViewportSize({width,height:width<500?844:1000});await page.evaluate(language=>YV_APP.setPreference('language',language),language);
    assert.equal(await page.locator('.db24-card').count(),12,`${language}/${width}: resource count`);
    await page.locator('.db24-card details').evaluateAll(nodes=>nodes.forEach(el=>el.open=true));
    const bounds=await page.locator('.db24').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth,left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right,document:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
    assert(bounds.scroll<=bounds.width+1,`${language}/${width}: database content ${JSON.stringify(bounds)}`);assert(bounds.left>=-1&&bounds.right<=width+1,`${language}/${width}: database bounds ${JSON.stringify(bounds)}`);assert(bounds.document<=bounds.viewport+1,`${language}/${width}: document overflow ${JSON.stringify(bounds)}`);
   }
   await page.evaluate(()=>YV_APP.setPreference('language','zh'));await page.setViewportSize({width:1440,height:1000});
   await page.locator('[data-db24-field=q]').fill('TF');assert.equal(await page.locator('.db24-card').count(),3);await page.locator('[data-db24=reset]').click();assert.equal(await page.locator('.db24-card').count(),12);
   await page.screenshot({path:path.join(out,'database-desktop.png')});return{resources:12,viewports:[320,390,1440],languages:5};
  });
  await check('Assistant review navigation retains its deep tab and opens the visible checks panel directly',async()=>{
   await page.evaluate(()=>YV_COMPANION.open({tab:'guide'}));await page.locator('[data-lm22=audit]').first().click();
   await page.locator('.lm22-turn:last-child [data-lm22=navigate][data-route="#workbench?stage=review&tab=review"]').click();
   await page.waitForURL('**/#workbench?stage=review&tab=review');await page.locator('#plan-workbench[data-plan-phase=review]').waitFor();
   assert.equal(new URL(page.url()).hash,'#workbench?stage=review&tab=review');assert.equal(await page.locator('[data-ex15-tab=review]').getAttribute('aria-selected'),'true');
   assert(await page.locator('[data-ex15-panel=review]').isVisible());assert.equal(await page.locator('[data-ex15-panel=export]').isVisible(),false);assert.equal(await page.locator('#yv-companion-panel').isVisible(),false);
   assert.equal(await page.evaluate(()=>JSON.stringify(YV_BUILDER.getPlan())),before);
  });
  await check('No browser runtime errors',()=>assert.deepEqual(errors,[]));
 }finally{await browser.close();fs.writeFileSync(path.join(out,'report.json'),JSON.stringify({testType:'UI integration with controlled engine; not inference validation',checks,errors},null,2));if(checks.some(c=>!c.pass))process.exitCode=1;}
})().catch(e=>{console.error(e);process.exitCode=1;});
