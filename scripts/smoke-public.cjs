/* Cross-platform smoke check for the actual static application. */
'use strict';
const {chromium}=require('@playwright/test'),{spawn}=require('node:child_process'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const server=spawn(process.execPath,[path.join(__dirname,'dev-server.cjs')],{cwd:root,env:{...process.env,PORT:'0',BASE_PATH:'/YeastVar1011/'},stdio:['ignore','pipe','pipe']});
let browser;
(async()=>{
 const base=await new Promise((resolve,reject)=>{let output='';const timeout=setTimeout(()=>reject(Error('Local server startup timed out')),15000);server.once('exit',code=>{clearTimeout(timeout);reject(Error('Server exited: '+code));});server.stdout.on('data',data=>{output+=data;const m=output.match(/http:\/\/127\.0\.0\.1:\d+\/YeastVar1011\//);if(m){clearTimeout(timeout);resolve(m[0]);}});server.stderr.on('data',data=>process.stderr.write(data));});
 browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 const context=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce'});
 await context.addInitScript(()=>{localStorage.setItem('yv.preferences',JSON.stringify({language:'en',reducedMotion:true}));sessionStorage.setItem('yv.intro.seen','1');});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 const failedLocal=[];page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failedLocal.push(r.status()+' '+new URL(r.url()).pathname);});
 await page.goto(base,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.YV_APP?.data?.()?.tools?.length||window.YV_APP?.data?.()?.workflow?.tools?.length||document.querySelector('.workstation-home'));
 await page.waitForFunction(()=>document.documentElement.dataset.boot!=='loading');
 const routes=['cluster','overview','workbench?stage=scope','quality','markers','tools','literature','settings','contribute','journey'];
 for(const route of routes){await page.evaluate(hash=>{location.hash=hash},route);await page.waitForFunction(hash=>window.YV_APP?.route?.()===hash.split('?')[0],route);assert((await page.locator('#main').innerText()).trim().length>30,'Empty '+route);}
 await page.evaluate(()=>{location.hash='contribute'});await page.locator('.contribute-hero .p20-project').waitFor();
 assert.equal(await page.locator('.contribute-hero [data-project-link=github]').getAttribute('href'),'https://github.com/YueDong0211/YeastVar1011');
 await page.evaluate(()=>YV_COMPANION.open({tab:'community'}));await page.locator('#yv-companion-panel .p20-project').waitFor();assert.equal(await page.locator('#yv-companion-panel [data-project-link=issues]').count(),1);await page.evaluate(()=>YV_COMPANION.close());
 for(const lang of ['zh','en','fr','es','eu']){await page.evaluate(lang=>{YV_APP.setPreference('language',lang);location.hash='overview'},lang);await page.waitForFunction(()=>YV_APP.route()==='overview');assert((await page.locator('.p20-footer-links').innerText()).includes('GitHub'));}
 // Exercise the real tool-card -> floating detail path, not just resolver fixtures.
 const planBeforeQTL=await page.evaluate(()=>JSON.stringify(YV_BUILDER.getPlan()));
 await page.evaluate(()=>{YV_APP.setPreference('language','en');location.hash='projects?view=qtl'});
 await page.locator('#qtl25-query').waitFor();
 assert.equal(await page.locator('[data-qtl-card]').count(),19);
 await page.locator('#qtl25-query').fill('pQTL');
 assert.equal(await page.locator('[data-qtl-card]').count(),1);
 await page.locator('[data-qtl-details="protein_qtl"] summary').click();
 await page.locator('[data-qtl-card="protein_qtl"] [data-qtl-paper]').click();
 await page.locator('#drawer').waitFor({state:'visible'});
 assert((await page.locator('#drawer').innerText()).includes('Species-wide quantitative transcriptomes'));
 await page.locator('#close-drawer').click();
 await page.locator('#qtl25-query').fill('unmatchable-xqz');
 await page.locator('#qtl25-results [data-qtl-reset]').click();
 await page.locator('[data-qtl-family="variance"]').click();
 assert.equal(await page.locator('[data-qtl-card]').count(),5);
 for(const lang of ['zh','en','fr','es','eu']){
  await page.locator('#language-select').selectOption(lang);
  assert.equal(await page.locator('[data-qtl-card]').count(),5);
  assert.equal(await page.locator('.qtl25-navigation [aria-current="page"]').count(),1);
 }
 await page.locator('.qtl25-navigation a[href="#projects?view=coverage"]').click();
 await page.locator('.rc12-panel').waitFor();
 await page.locator('.qtl25-navigation a[href="#projects"]').click();
 await page.locator('#ra-query').waitFor();
 assert.equal(await page.evaluate(()=>JSON.stringify(YV_BUILDER.getPlan())),planBeforeQTL,'QTL browsing must not mutate the plan');
 await page.mouse.move(1100,80);
 await page.keyboard.press('Escape');
 await page.locator('#menu-button').click();
 assert(await page.evaluate(()=>YV_CONTROLS.getState().expanded),'Sidebar opens before route-change regression');
 await page.evaluate(()=>{
  YV_APP.setPreference('language','en');
  YV_BUILDER.importPlan({schema:'yeastvar1011-plan-v2',title:'Browser contract regression',objective:'',projects:[],stages:['validation'],tools:['scpower'],metrics:[],markers:[],edges:[],availableData:['count_matrix','sample_metadata'],inputRoute:'count_matrix',parameters:{},methodContractsVersion:1,methodOptionIds:[],manualToolIds:['scpower'],manualMetricIds:[],toolBranches:{},inputEvidence:{},directionProvenance:null});
  location.hash='tools?q=scPower';
 });
 await page.waitForFunction(()=>!YV_CONTROLS.getState().expanded);
 await page.getByRole('button',{name:'scPower',exact:true}).click();
 await page.locator('#drawer select[data-pc-branch="scpower"]').waitFor({state:'attached'});
 await page.locator('#drawer select[data-pc-branch="scpower"]').selectOption('mean_de');
 await page.waitForFunction(()=>YV_BUILDER.getPlan().toolBranches.scpower==='mean_de');
 assert.equal(await page.evaluate(()=>YV_BUILDER.inputReview().inputs.some(x=>x.id==='genotypes')),false);
 await page.locator('#drawer select[data-pc-branch="scpower"]').selectOption('eqtl');
 await page.waitForFunction(()=>YV_BUILDER.getPlan().toolBranches.scpower==='eqtl');
 assert(await page.evaluate(()=>['genotypes','kinship'].every(id=>YV_BUILDER.inputReview().inputs.some(x=>x.id===id))));
 await page.locator('#pc-evidence-scpower-strain_alignment_source').pressSequentially('Browser fixture: matched strain IDs');
 await page.locator('#pc-evidence-scpower-independent_sample_definition').click();
 await page.reload({waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.YV_BUILDER?.getPlan?.().toolBranches?.scpower==='eqtl');
 await page.getByRole('button',{name:'scPower',exact:true}).click();
 assert.equal(await page.locator('#drawer select[data-pc-branch="scpower"]').inputValue(),'eqtl');
 assert.equal(await page.locator('#pc-evidence-scpower-strain_alignment_source').inputValue(),'Browser fixture: matched strain IDs');
 await page.locator('[data-method-jump="parameters"]').click();
 await page.waitForFunction(()=>{const drawer=document.querySelector('#drawer'),content=document.querySelector('#drawer-content');return (drawer.classList.contains('a9-floating')?content:drawer).scrollTop>0;});
 await page.setViewportSize({width:390,height:844});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow: method branch dialog');
 await page.locator('#close-drawer').click();
 await page.setViewportSize({width:390,height:844});
 for(const route of ['overview','cluster','workbench?stage=scope','markers?view=catalogue','markers?view=panel','markers?view=databases','projects?view=qtl','projects?view=coverage','contribute','settings']){await page.evaluate(hash=>location.hash=hash,route);await page.waitForFunction(hash=>YV_APP.route()===hash.split('?')[0],route);await page.waitForTimeout(100);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow: '+route);}
 assert.deepEqual(errors,[]);assert.deepEqual(failedLocal,[]);
 console.log(JSON.stringify({passed:true,routes:routes.length,languages:5,mobile:true,qtlCatalogue:true,methodBranchDialog:true,branchPersistence:true,projectLinks:true,runtimeErrors:errors,failedLocal},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{await browser?.close();server.kill();});
