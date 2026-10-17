'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{chromium}=require('@playwright/test');
const base=process.env.YV_TEST_URL||'http://127.0.0.1:4173/',output=path.join(__dirname,'cache','v21-cluster-qa');
fs.mkdirSync(output,{recursive:true});const checks=[],errors=[],requests=[],screens=[];
async function test(name,fn){try{const details=await fn();checks.push({name,pass:true,details});console.log('PASS',name)}catch(e){checks.push({name,pass:false,error:e.stack});console.error('FAIL',name,e.message)}}
async function downloadBytes(download){const stream=await download.createReadStream(),parts=[];for await(const part of stream)parts.push(part);return Buffer.concat(parts)}
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',permissions:['clipboard-read','clipboard-write']});
  await context.addInitScript(()=>{try{sessionStorage.setItem('yv.intro.v3','seen')}catch{}});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()!=='GET')requests.push({method:r.method(),url:r.url()})});
  await page.goto(base+'#cluster');await page.waitForFunction(()=>window.__YV_READY__&&document.querySelector('#intro').hidden&&window.YV_CLUSTER);
  const original=await page.evaluate(()=>{const{updated,...p}=YV_BUILDER.getPlan();return p;});
  async function snapshot(name){await page.screenshot({path:path.join(output,name+'.png')});screens.push(name)}
  async function content(){return page.evaluate(()=>{const{updated,...p}=YV_BUILDER.getPlan();return p;})}
  async function tab(name){await page.locator('#c21-tab-'+name).click();assert.equal(await page.locator('#c21-tab-'+name).getAttribute('aria-selected'),'true');assert(await page.locator('#c21-panel-'+name).isVisible());assert.equal(await page.locator('.c21-tab-panel:visible').count(),1)}
  await test('Five languages and all three panels fit desktop and narrow mobile screens',async()=>{
   const titles=[];
   for(const language of ['zh','en','fr','es','eu']){
    await page.evaluate(l=>YV_APP.setPreference('language',l),language);titles.push(await page.locator('.c21-hero h1').innerText());
    for(const width of [1440,390,320]){
     await page.setViewportSize({width,height:width===1440?1000:844});
     for(const name of ['local','pipeline','data']){
      await tab(name);await page.evaluate(()=>scrollTo(0,0));
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No overflow: '+language+'/'+width+'/'+name);
      const controls=await page.locator('.c21-tabs button').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().toJSON()));
      for(const r of controls)assert(r.x>=0&&r.right<=width+1,'Tab fits viewport');
      if(width<=390){
       const header=await page.evaluate(()=>{const crumb=document.getElementById('breadcrumb-page'),language=document.getElementById('language-select').closest('.rich-select'),actions=document.querySelector('.header-actions'),style=getComputedStyle(crumb);return{crumb:crumb.getBoundingClientRect().toJSON(),language:language.getBoundingClientRect().toJSON(),actions:actions.getBoundingClientRect().toJSON(),whiteSpace:style.whiteSpace,overflow:style.textOverflow,text:crumb.textContent,aria:crumb.getAttribute('aria-label')}});
       assert.equal(header.whiteSpace,'nowrap');assert.equal(header.overflow,'ellipsis');assert(header.crumb.height<=40,'Breadcrumb is one line');assert(header.crumb.right<=header.actions.left+1,'Breadcrumb does not squeeze actions');assert(header.language.width>=65,'Language button keeps its full width');assert(header.language.right<=width,'Language button remains on screen');assert(header.aria.includes(header.text),'Full localized page name remains accessible');
      }
      if(width===390||language==='zh')await snapshot(width+'-'+language+'-'+name);
     }
    }
   }
   assert.equal(new Set(titles).size,5);return{languages:titles.length,layouts:45};
  });
  await test('Tabs support arrow keys and deep-link reload without allocating an immersive model',async()=>{
   await page.evaluate(()=>YV_APP.setPreference('language','en'));await page.setViewportSize({width:1440,height:1000});await tab('local');
   await page.locator('#c21-tab-local').focus();await page.keyboard.press('ArrowRight');assert(await page.locator('#c21-tab-pipeline').evaluate(e=>e===document.activeElement));assert.equal(await page.locator('#c21-tab-pipeline').getAttribute('aria-selected'),'true');
   await page.keyboard.press('End');assert(await page.locator('#c21-tab-data').evaluate(e=>e===document.activeElement));await page.reload();await page.waitForFunction(()=>window.__YV_READY__&&window.YV_CLUSTER);assert.equal(await page.locator('#c21-tab-data').getAttribute('aria-selected'),'true');assert.equal(await page.locator('#j17-scenehost canvas').count(),0);
  });
  await test('System choices expose real setup commands and copying returns exact shell text',async()=>{
   await tab('local');const expected={linux:['sh scripts/setup.sh','sh scripts/setup.sh --start'],mac:['sh scripts/setup.sh','sh scripts/setup.sh --start'],windows:['node scripts/doctor.cjs','npm start']};
   for(const [system,commands] of Object.entries(expected)){
    await page.locator('[data-c21=system][data-system='+system+']').click();assert.equal(await page.locator('[data-c21=system][data-system='+system+']').getAttribute('aria-pressed'),'true');
    for(const [i,slot] of ['check','start'].entries())assert.equal((await page.locator('[data-c21-platform-command='+slot+'] code').innerText()).trim(),commands[i]);
   }
   const copy=page.locator('[data-command=startWindows]');await copy.click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'npm start');assert.equal(await copy.getAttribute('data-copied'),'true');assert((await page.locator('.c21-status').innerText()).includes('copied'));
   await page.locator('[data-c21=system][data-system=linux]').click();await page.locator('[data-command=checkUnix]').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'sh scripts/setup.sh');
  });
  await test('Pipeline commands match the executable launcher and links identify actual resources',async()=>{
   await tab('pipeline');const commands=await page.evaluate(()=>YV_CLUSTER.commands());
   assert.equal(commands.check,'bash run.sh check --inspect-reference\nbash run.sh dry-run --cores 8');assert.equal(commands.slurm,'bash run.sh slurm --jobs 20');
   const manual=fs.readFileSync(path.join(__dirname,'..','analysis','README.md'),'utf8');
   for(const key of ['environment','check','local','slurm','envs'])for(const line of commands[key].split('\n'))assert(manual.includes(line),'Documented command: '+line);
   assert((await page.locator('#c21-panel-pipeline').innerText()).includes('quality_encoding=phred33'));
   assert.equal(await page.locator('.c21-validation a').getAttribute('href'),'https://github.com/YueDong0211/YeastVar1011/actions/runs/38997955784');assert((await page.locator('.c21-validation').innerText()).includes('synthetic'));
   for(const selector of ['.c21-template-links a','.c21-download-card a'])for(const href of await page.locator(selector).evaluateAll(es=>es.map(e=>e.getAttribute('href'))))assert(href&&!href.endsWith('#')&&(href.startsWith('https://github.com/YueDong0211/YeastVar1011/')||href==='assets/downloads/YeastVar1011-analysis-v21.zip'));
   const bundle=page.locator('a[download][href$="YeastVar1011-analysis-v21.zip"]');const [download]=await Promise.all([page.waitForEvent('download'),bundle.click()]);const bytes=await downloadBytes(download);assert.equal(bytes.subarray(0,2).toString(),'PK');assert.equal(download.suggestedFilename(),'YeastVar1011-analysis-v21.zip');return {archiveBytes:bytes.length};
  });
  await test('Real plan import, undo and JSON backup round-trip through the existing builder',async()=>{
   await tab('data');const fixture=await page.evaluate(()=>YV_BUILDER.exported());fixture.title='Cluster integration QA plan';
   const [chooser]=await Promise.all([page.waitForEvent('filechooser'),page.locator('[data-c21=import]').click()]);
   await chooser.setFiles({name:'plan.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(fixture))});
   await page.waitForFunction(()=>YV_BUILDER.getPlan().title==='Cluster integration QA plan');assert(await page.locator('.c21-status [data-c21=undo]').isVisible());
   const [download]=await Promise.all([page.waitForEvent('download'),page.locator('[data-c21=backup]').click()]);const json=JSON.parse((await downloadBytes(download)).toString());assert.equal(json.title,fixture.title);assert.equal(json.kind,'research-plan-not-execution');assert.deepEqual(json.metrics,fixture.metrics);assert.deepEqual(json.tools,fixture.tools);assert(json.references.length>0);
   await page.locator('[data-c21=undo]').click();assert.deepEqual(await content(),original);assert(!(await page.locator('[data-c21=undo]').isVisible()));
   const unchanged=await page.evaluate(()=>YV_BUILDER.exported());await page.locator('#c21-plan-import').setInputFiles({name:'same-plan.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(unchanged))});await page.waitForFunction(()=>YV_CLUSTER.state().status==='imported');assert(!(await page.locator('[data-c21=undo]').isVisible()),'No misleading undo action for an unchanged import');assert.deepEqual(await content(),original);
  });
  await test('Invalid files do not alter the plan or send input data to a server',async()=>{
   await page.locator('#c21-plan-import').setInputFiles({name:'not-a-plan.json',mimeType:'application/json',buffer:Buffer.from('{bad-json')});await page.waitForFunction(()=>YV_CLUSTER.state().status==='importError');assert.deepEqual(await content(),original);
   const accepted=await page.locator('#cluster-workspace input[type=file]').evaluateAll(es=>es.map(e=>e.accept));assert.deepEqual(accepted,['.json,application/json']);assert.deepEqual(requests,[]);assert.equal(await page.locator('#cluster-workspace form[action]').count(),0);
  });
  await test('Figure and plan review actions open the actual workspaces',async()=>{
   await page.locator('[data-c21=figures]').click();await page.waitForFunction(()=>YV_APP.route()==='lab'&&YV_LAB.getState().tab==='figures');assert(await page.locator('#lab-data-file').count());
   await page.evaluate(()=>location.hash='#cluster?tab=data');await page.waitForSelector('#cluster-workspace');await page.locator('#c21-panel-data a[href="#workbench?stage=review"]').click();await page.waitForFunction(()=>YV_APP.route()==='workbench'&&document.querySelector('#plan-workbench')?.dataset.planPhase==='review');assert(await page.locator('#ex15-download').isVisible());
   await page.evaluate(()=>location.hash='#cluster?tab=pipeline');await page.waitForSelector('#cluster-workspace');await page.setViewportSize({width:390,height:844});await page.locator('.c21-inputs').scrollIntoViewIfNeeded();await snapshot('390-inputs');
   const table=page.locator('.c21-table-wrap');assert(await table.evaluate(e=>e.scrollWidth>e.clientWidth),'Wide configuration table has its own scroll container');await table.focus();await page.keyboard.press('ArrowRight');await page.waitForTimeout(100);assert(await table.evaluate(e=>e.scrollLeft>0),'Focused table supports keyboard horizontal scrolling');assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  });
  await test('Light theme and motion preferences retain focus and icon alignment',async()=>{
   await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>YV_APP.setPreference('theme','light'));await tab('local');assert(!(await page.locator('.c21-status').isVisible()),'Import error belongs to data panel, not installation');await page.evaluate(()=>scrollTo(0,0));await snapshot('1440-local-light');
   await page.locator('#c21-tab-local').focus();await page.keyboard.press('ArrowRight');const focus=await page.locator('#c21-tab-pipeline').evaluate(e=>({outline:getComputedStyle(e).outlineStyle,transition:getComputedStyle(e).transitionDuration}));assert.notEqual(focus.outline,'none');assert.equal(focus.transition,'0s');
   const measurements=await page.locator('.c21-tab-icon,.c21-card-icon').evaluateAll(es=>es.filter(e=>e.checkVisibility()).map(e=>{const a=e.getBoundingClientRect(),b=e.querySelector('svg').getBoundingClientRect();return{dx:b.x+b.width/2-a.x-a.width/2,dy:b.y+b.height/2-a.y-a.height/2}}));for(const m of measurements)assert(Math.abs(m.dx)<1&&Math.abs(m.dy)<1);assert.deepEqual(errors,[]);return focus;
  });
 }finally{await browser.close();fs.writeFileSync(path.join(output,'report.json'),JSON.stringify({checks,errors,requests,screens},null,2));if(checks.some(c=>!c.pass))process.exitCode=1}
})().catch(e=>{console.error(e);process.exitCode=1});
