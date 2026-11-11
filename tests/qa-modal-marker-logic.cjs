'use strict';
// Pure logic regressions. These do not start a browser or access user storage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

{
  const handlers = {}, context = {window:{addEventListener(){}},sessionStorage:{getItem(){return null;}},document:{addEventListener(type,fn){(handlers[type] ||= []).push(fn);}},setTimeout,clearTimeout};
  const source = fs.readFileSync(path.join(root,'dist/marker-workspace.js'),'utf8').replace('window.YV_MARKERS={', `window.__testMarker={seed(){ui.importText='CLN2';ui.resolved={rows:[{id:'CLN2'}]};refresh=id=>{window.__refreshed=id;window.__refreshCount=(window.__refreshCount||0)+1;};},read:()=>({text:ui.importText,resolved:ui.resolved})};window.YV_MARKERS={`);
  context.URL=URL;vm.runInNewContext(fs.readFileSync(path.join(root,'dist/marker-selection-v25c.js'),'utf8'),context);vm.runInNewContext(source,context);
  context.window.__testMarker.seed();
  const input = handlers.input.at(-1);
  input({target:{id:'mw-import-text',value:'CLN1'}});
  assert.equal(context.window.__testMarker.read().resolved,null);
  assert.equal(context.window.__testMarker.read().text,'CLN1');
  assert.equal(context.window.__refreshed,'mw-import-text');
  input({target:{id:'mw-import-text',value:'CLN1\nCLN3'}});
  assert.equal(context.window.__refreshCount,1,'Unreviewed typing does not rerender on every character');
  console.log('PASS marker edits invalidate the resolved import and retain text focus');
}

{
  const documentHandlers={},windowHandlers={},scheduled=new Set();let now=100,nativeModal=false,queryCount=0,nextFrame=0,observerCallback=null,observerDisconnected=0;
  const media={matches:false,addEventListener(){}};
  const document={body:{},hidden:false,documentElement:{classList:{contains(){return false;}}},querySelector(){queryCount++;return nativeModal?{}:null;},addEventListener(type,fn){documentHandlers[type]=fn;}};
  const window={addEventListener(type,fn){windowHandlers[type]=fn;},YV_APP:{prefs(){return {reducedMotion:false};}}};
  const context={document,window,matchMedia(){return media;},performance:{now(){return now;}},requestAnimationFrame(){const id=++nextFrame;scheduled.add(id);return id;},cancelAnimationFrame(id){scheduled.delete(id);},clearTimeout(){},MutationObserver:class{constructor(callback){observerCallback=callback;}observe(){}disconnect(){observerDisconnected++;}}};
  const source=fs.readFileSync(path.join(root,'dist/journey-scene-v17.js'),'utf8').replace('const inspectState=()=>', `window.__testScene={configure(){engine={environment:{lastTick:100}};mounted=true;host={isConnected:true};inViewport=true;},observeModals,request,syncModalVisibility,setTransition(start){transition={start};},read:()=>({visible:!!visible(),blocked:modalBlocked,frame,motion,moving:canMove(),transitionStart:transition?.start,observing:!!modalObserver}),setMotionFlag(value){motion=value;},clearEngine(){engine=null;}};const inspectState=()=>`);
  context.URL=URL;vm.runInNewContext(fs.readFileSync(path.join(root,'dist/marker-selection-v25c.js'),'utf8'),context);vm.runInNewContext(source,context);
  const test=window.__testScene;test.configure();test.observeModals();test.setTransition(80);test.request();
  assert.equal(scheduled.size,1);
  windowHandlers['yv:companionchange']({detail:{isOpen:true}});
  assert.equal(test.read().blocked,true);assert.equal(test.read().visible,false);assert.equal(scheduled.size,0);assert.equal(test.read().motion,true);
  const queriesBeforeFrames=queryCount;for(let i=0;i<100;i++)test.request();assert.equal(queryCount,queriesBeforeFrames,'Paused frame requests do not scan dialogs');
  observerCallback([{type:'childList',addedNodes:[{nodeType:3}],removedNodes:[]}]);assert.equal(queryCount,queriesBeforeFrames,'Streaming text does not rescan dialogs');
  now=500;windowHandlers['yv:companionchange']({detail:{isOpen:false}});
  assert.equal(test.read().blocked,false);assert.equal(test.read().transitionStart,480,'Camera transition resumes at its original progress');assert.equal(scheduled.size,1);
  nativeModal=true;observerCallback([{type:'attributes',target:{localName:'dialog'}}]);assert.equal(test.read().blocked,true);assert.equal(scheduled.size,0);
  windowHandlers['yv:companionchange']({detail:{isOpen:true}});nativeModal=false;observerCallback([{type:'attributes',target:{localName:'dialog'}}]);assert.equal(test.read().blocked,true,'One closing modal does not resume beneath another');
  test.setMotionFlag(false);windowHandlers['yv:companionchange']({detail:{isOpen:false}});assert.equal(test.read().motion,false);assert.equal(test.read().moving,false,'Unblocking preserves paused motion');
  test.setMotionFlag(true);media.matches=true;windowHandlers['yv:companionchange']({detail:{isOpen:true}});windowHandlers['yv:companionchange']({detail:{isOpen:false}});assert.equal(test.read().moving,false,'Reduced motion remains respected');
  document.hidden=true;documentHandlers.visibilitychange();assert.equal(scheduled.size,0);assert.equal(test.read().visible,false);
  document.hidden=false;documentHandlers.visibilitychange();assert.equal(scheduled.size,1);
  test.clearEngine();window.YV_JOURNEY_SCENE.dispose();assert.equal(test.read().observing,false);assert(observerDisconnected>0);assert.equal(scheduled.size,0);
  console.log('PASS modal occlusion pauses frames, freezes camera time, and restores original motion policy');
}

{
  let language='zh';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const context={localStorage:{getItem(){return null;}},document:{addEventListener(){}},window:{addEventListener(){},YV_APP:{prefs(){return {language};},esc,data(){return {categories:{dataRequirements:[{id:'raw_fastq',title:'FASTQ'},{id:'mapping_rad',title:'RAD'},{id:'reference',title:'Reference'}]}};},tx:value=>value,maps(){return {tool:new Map([['starsolo',{name:'STARsolo'}],['alevinfry',{name:'alevin-fry'}]])};}},YV_BUILDER:{b:value=>value}}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'dist/plan-workbench.js'),'utf8'),context);
  const row={producerAlternatives:[{producerTools:['starsolo'],inputs:['raw_fastq','reference'],blockedBy:[],status:'planned-output'},{producerTools:['alevinfry'],inputs:['mapping_rad','reference'],blockedBy:['mapping_rad'],status:'planned-output'}]};
  const expected={zh:'可替代的生成路径',en:'Alternative production paths',fr:'Voies de production alternatives',es:'Rutas alternativas de producción',eu:'Ekoizpen-bide alternatiboak'};
  for(const lang of Object.keys(expected)){
    language=lang;const html=context.window.YV_PLAN.inputRoutesHTML(row),paths=html.split('<li class="pw-production-path ').slice(1);
    assert(html.includes(expected[lang]));assert.equal(paths.length,2);assert(paths[0].includes('STARsolo')&&!paths[0].includes('RAD'),'First path keeps only its own required inputs');assert(paths[1].includes('alevin-fry')&&paths[1].includes('RAD'),'Second path retains its own missing leaf input');assert(!html.includes('undefined'));
  }
  const single=context.window.YV_PLAN.inputRoutesHTML({producerAlternatives:[row.producerAlternatives[0]],blockedBy:['raw_fastq']});assert(single.includes('FASTQ')&&!single.includes('<details'));
  assert.equal(context.window.YV_PLAN.inputRoutesHTML({status:'declared'}),'');
  console.log('PASS alternative-path rendering separates OR inputs and missing leaves in five languages');
}

{
  let language='zh';const gene={id:'gene1',symbol:'CLN2',evidence:[{tag:'G1/S',relation:'RNA_peak_in',sourceId:'paper1',sourceUrl:'https://example.org/published-cycle-study',grade:'B'},{tag:'G1',relation:'used_as_scRNA_marker_for',sourceId:'paper2',sourceUrl:'https://example.org/published-single-cell-study',grade:'A'}]},sources=new Map([['paper1',{url:'https://example.org/published-cycle-study'}],['paper2',{url:'https://example.org/published-single-cell-study'}]]);
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const context={sessionStorage:{getItem(){return null;}},document:{addEventListener(){}},window:{addEventListener(){},YV_BUILDER:{getPlan:()=>({markers:[]})},YV_MARKER_TEXT:key=>key,YV_RESEARCH_ATLAS:{text:key=>key},YV_APP:{esc,prefs(){return {language};},tx:value=>value,maps(){return {marker:new Map([['gene1',gene]]),source:sources};}}}};
  const source=fs.readFileSync(path.join(root,'dist/marker-workspace.js'),'utf8').replace('window.YV_MARKERS={','showDialog=html=>{window.__dialog=html;};window.YV_MARKERS={');
  context.URL=URL;vm.runInNewContext(fs.readFileSync(path.join(root,'dist/marker-selection-v25c.js'),'utf8'),context);vm.runInNewContext(source,context);
  const expected={zh:'整理标签',en:'Curation label',fr:'Étiquette de curation',es:'Etiqueta de curación',eu:'Kurazio-etiketa'};
  for(const lang of Object.keys(expected)){
    language=lang;context.window.YV_MARKERS.showEvidence('gene1','周期候选');let html=context.window.__dialog;assert(html.includes(expected[lang]));assert.equal((html.match(/data-mw="evidence"/g)||[]).length,2);assert(html.includes('https://example.org/published-cycle-study'));assert(html.includes('https://example.org/published-single-cell-study'));assert(!html.includes('noTagEvidence'));
    context.window.YV_MARKERS.showEvidence('gene1','核心整理种子');html=context.window.__dialog;assert(html.includes(expected[lang]));assert(!html.includes('href='),'A manual seed label does not acquire an invented citation');assert(!html.includes('noTagEvidence'));
  }
  context.window.YV_MARKERS.showEvidence('gene1','G1/S');assert(context.window.__dialog.includes('mw-evidence-relation'),'Ordinary scientific evidence keeps its original detail renderer');
  gene.evidence=[];context.window.YV_MARKERS.showEvidence('gene1','周期候选');assert(context.window.__dialog.includes('mw-curation-empty'));assert(!context.window.__dialog.includes('href='));
  console.log('PASS curation tags explain their role, link existing cycle evidence, and never invent citations');
}

{
  const records=Array.from({length:502},(_,i)=>({id:'M'+i,symbol:'TESTGENE'+i,systematic:'TESTORF'+i,aliases:[],evidence:[{sourceId:'source1'}]}));
  const seed={schema:'yeastvar1011-plan-v2',title:'Synthetic panel regression',objective:'',stages:[],tools:[],metrics:[],markers:[{id:'M0',groups:['G1'],purposes:['grnUse'],role:'control',userTags:['retain custom tag'],rationale:'retain prior rationale',evidenceSources:['source1']},{id:'M500',groups:['S'],purposes:['conditioning'],role:'include'}],edges:[],availableData:['raw_fastq'],inputRoute:'auto',parameters:{}};
  const storage=new Map([['yv.plan.v2',JSON.stringify(seed)]]),counts={plan:0,history:0,change:0,sync:0,render:0};
  const maps={marker:new Map(records.map(m=>[m.id,m])),step:new Map(),tool:new Map(),metric:new Map(),source:new Map(),formula:new Map()};
  const data={markers:{markers:records},categories:{dataRequirements:[{id:'raw_fastq'}]},projects:{projects:[],resultSpecifications:[]},workflow:{steps:[],tools:[],metrics:[]}};
  const api={data:()=>data,maps:()=>maps,prefs:()=>({language:'en'}),syncMarkers(){counts.sync++;},render(){counts.render++;},esc:value=>String(value),tx:value=>value};
  const context={localStorage:{getItem:key=>storage.get(key)||null,setItem(key,value){storage.set(key,value);if(key==='yv.plan.v2')counts.plan++;if(key==='yv.plan.history.v16')counts.history++;},removeItem:key=>storage.delete(key)},sessionStorage:{getItem(){return null;}},document:{addEventListener(){}},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}},window:{YV_APP:api,addEventListener(){},dispatchEvent(event){if(event.type==='yv:planchange')counts.change++;}}};
  context.URL=URL;vm.runInNewContext(fs.readFileSync(path.join(root,'dist/marker-selection-v25c.js'),'utf8'),context);vm.runInNewContext(fs.readFileSync(path.join(root,'dist/builder.js'),'utf8'),context);const builder=context.window.YV_BUILDER;builder.init(api);
  vm.runInNewContext(fs.readFileSync(path.join(root,'dist/marker-workspace.js'),'utf8'),context);const markers=context.window.YV_MARKERS;
  const reset=()=>Object.keys(counts).forEach(key=>counts[key]=0),plain=value=>JSON.parse(JSON.stringify(value)),before=plain(builder.getPlan().markers);
  const rows=records.slice(0,500).map((m,i)=>i===0?{id:m.id,role:'exclude'}:{id:m.id,groups:['G1','invalid-group'],purposes:['grnUse','invalid-purpose'],role:'control',evidenceSources:['source1','invalid-source'],userTags:['batch','batch']});
  reset();const resolved=markers.importData(JSON.stringify({schema:'yeastvar-marker-panel-v1',markers:rows}),{apply:true});assert.equal(resolved.rows.length,500);assert.equal(counts.plan,1);assert.equal(counts.history,1);assert.equal(counts.change,1);assert.equal(counts.sync,1);assert.equal(counts.render,0);assert.equal(builder.recoveryState().undoCount,1);
  const imported=plain(builder.getPlan().markers);assert.equal(imported.length,501);const existing=imported.find(m=>m.id==='M0');assert.equal(existing.role,'exclude');assert.deepEqual(existing.groups,['G1']);assert.deepEqual(existing.userTags,['retain custom tag']);assert.equal(existing.rationale,'retain prior rationale');assert.deepEqual(existing.purposes,['grnUse']);assert.deepEqual(imported.find(m=>m.id==='M1').evidenceSources,['source1']);assert.deepEqual(imported.find(m=>m.id==='M1').groups,['G1']);assert.deepEqual(imported.find(m=>m.id==='M1').userTags,['batch']);assert(imported.some(m=>m.id==='M500'));
  builder.undo();assert.deepEqual(plain(builder.getPlan().markers),before,'One undo restores the whole panel import');builder.redo();assert.deepEqual(plain(builder.getPlan().markers),imported);
  reset();markers.importData(JSON.stringify({schema:'yeastvar-marker-panel-v1',markers:rows}),{apply:true});assert.equal(counts.plan,0,'A repeated identical import does not add a save or undo');
  reset();builder.importMarkerAssignments([{id:'M0',purpose:'qcUse'}]);assert.equal(counts.plan,1);assert.deepEqual(plain(builder.getPlan().markers.find(m=>m.id==='M0').purposes),['qcUse'],'Legacy singular purpose is normalized');
  reset();markers.importData('TESTGENE0\nTESTGENE501',{apply:true});assert.equal(counts.plan,1);assert.deepEqual(plain(builder.getPlan().markers.find(m=>m.id==='M0').userTags),['retain custom tag'],'A plain identifier does not reset existing assignments');assert(builder.getPlan().markers.some(m=>m.id==='M501'));
  reset();markers.importData('TESTGENE0',{apply:true,merge:false});assert.equal(counts.plan,1);assert.equal(builder.getPlan().markers.length,1);assert.deepEqual(plain(builder.getPlan().markers[0].userTags),['retain custom tag']);assert.deepEqual(plain(builder.getPlan().markers[0].purposes),['qcUse']);
  reset();assert.equal(builder.importMarkerAssignments(null,{merge:false}),false);assert.equal(counts.plan,0);assert.equal(builder.getPlan().markers.length,1);
  builder.importPlan({...seed,markers:[{id:'M1',groups:['S'],role:'include'}]});assert.equal(builder.getPlan().markers.length,1);assert.equal(builder.getPlan().markers[0].id,'M1','Full-plan import retains its replace behavior');
  const batch=builder.importMarkerAssignments;delete builder.importMarkerAssignments;markers.importData([{id:'M2',role:'control'}],{apply:true});assert.equal(builder.getPlan().markers.find(m=>m.id==='M2').role,'control','Older builders retain the compatible import fallback');builder.importMarkerAssignments=batch;
  console.log('PASS 500-assignment imports use one save and undo, preserve omitted choices, and respect merge/replace');
}

{
  let language='fr';const titles={zh:'状态组成与稀有亚群',en:'State composition and rare subpopulations',fr:'Composition en états et sous-populations rares',es:'Composición de estados y subpoblaciones raras',eu:'Egoeren osaera eta azpipopulazio arraroak'};
  const project={id:'state_composition',title:titles.zh,question:'synthetic question'},api={prefs:()=>({language}),data:()=>({projects:{projects:[project]}}),tx:value=>value===titles.zh?titles[language]:value,esc:value=>String(value),icon:()=>''};
  const context={history:{},document:{activeElement:null,addEventListener(){},createElement(){return {setAttribute(){},querySelector(){return {};}};}},window:{YV_APP:api,YV_BUILDER:{getPlan:()=>({projects:[]})},YV_PLAN:{text:key=>key}}};
  const source=fs.readFileSync(path.join(root,'dist/user-experience-v16.js'),'utf8').replace('const count=()=>{d.querySelector','window.__directionIndex=index;return;const count=()=>{d.querySelector');context.URL=URL;vm.runInNewContext(fs.readFileSync(path.join(root,'dist/marker-selection-v25c.js'),'utf8'),context);vm.runInNewContext(source,context);
  const fold=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  for(const lang of Object.keys(titles)){language=lang;context.window.YV_UX.openDirections();assert(context.window.__directionIndex[0].search.includes(fold(titles[lang])),'Visible '+lang+' direction title is indexed');assert(context.window.__directionIndex[0].search.includes('state_composition'));}
  console.log('PASS direction search indexes the displayed title in five languages and retains original identifiers');
}

{
  const scheduled=new Map(),windowHandlers={},documentHandlers={},observers=[],mediaHandlers=[];let frameId=0,time=100,nativeModal=false,queryCount=0;
  const media={matches:false,addEventListener(type,fn){mediaHandlers.push(fn);}},on=(handlers,type,fn)=>(handlers[type] ||= []).push(fn),emit=(handlers,type,event={})=>(handlers[type]||[]).forEach(fn=>fn(event));
  const ctx={clearRect(){},setTransform(){},createRadialGradient(){return {addColorStop(){}};},createLinearGradient(){return {addColorStop(){}};},fillRect(){},beginPath(){},moveTo(){},bezierCurveTo(){},stroke(){},arc(){},fill(){}};
  const canvas={style:{},getContext:()=>ctx},source={src:'',dataset:{src:'local-test-video.mp4'}},video={paused:true,loads:0,plays:0,querySelector:()=>source,load(){this.loads++;},play(){this.paused=false;this.plays++;return Promise.resolve();},pause(){this.paused=true;}};
  const prefs={backgroundMotion:true,reducedMotion:false,wallpaper:true,atelierScene:'normal'},document={body:{},hidden:false,documentElement:{dataset:{theme:'dark'},style:{setProperty(){}}},getElementById:()=>canvas,querySelector(selector){if(selector==='.station-video')return video;queryCount++;return nativeModal?{}:null;},addEventListener(type,fn){on(documentHandlers,type,fn);}};
  const window={YV_APP:{prefs:()=>prefs},addEventListener(type,fn){on(windowHandlers,type,fn);},dispatchEvent(event){emit(windowHandlers,event.type,event);}};
  const context={window,document,navigator:{hardwareConcurrency:8,deviceMemory:8},innerWidth:1100,innerHeight:800,devicePixelRatio:1,getComputedStyle:()=>({getPropertyValue:()=>''}),matchMedia:()=>media,performance:{now:()=>time},requestAnimationFrame(fn){const id=++frameId;scheduled.set(id,fn);return id;},cancelAnimationFrame(id){scheduled.delete(id);},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}},MutationObserver:class{constructor(callback){this.callback=callback;observers.push(this);}observe(target,options){this.options=options;}},IntersectionObserver:class{observe(){}disconnect(){}}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'dist/ambience.js'),'utf8'),context);vm.runInNewContext(fs.readFileSync(path.join(root,'dist/workstation.js'),'utf8'),context);window.YV_WORKSTATION.afterRender();
  const ambient=window.YV_AMBIENT,modalObserver=observers.find(o=>o.options.attributeFilter?.includes('open')),tick=()=>{time+=40;const callbacks=[...scheduled.values()];scheduled.clear();callbacks.forEach(fn=>fn(time));},companion=open=>emit(windowHandlers,'yv:companionchange',{detail:{isOpen:open}});
  assert.equal(ambient.getState().running,true);assert.equal(video.paused,false);const originalPrefs=JSON.stringify(prefs);
  nativeModal=true;companion(true);assert.equal(ambient.getState().running,false);assert.equal(ambient.getState().occluded,true);assert.equal(video.paused,true);const frames=ambient.getState().frames,queries=queryCount;for(let i=0;i<50;i++)tick();assert.equal(ambient.getState().frames,frames);assert.equal(queryCount,queries,'Background frames do not query modal visibility');
  modalObserver.callback([{type:'childList',addedNodes:[{nodeType:3}],removedNodes:[]}]);assert.equal(queryCount,queries,'Qwen token text mutations do not rescan dialogs');
  nativeModal=false;companion(false);assert.equal(ambient.getState().running,true);assert.equal(video.paused,false);assert.equal(JSON.stringify(prefs),originalPrefs,'Modal lifecycle does not change user preferences');
  const beforeTicks=queryCount;for(let i=0;i<3;i++)tick();assert.equal(queryCount,beforeTicks,'Running background frames use cached occlusion');
  nativeModal=true;modalObserver.callback([{type:'attributes',target:{localName:'dialog'}}]);assert.equal(ambient.getState().running,false);assert.equal(video.paused,true);nativeModal=false;modalObserver.callback([{type:'attributes',target:{localName:'dialog'}}]);assert.equal(ambient.getState().running,true);assert.equal(video.paused,false,'A nonmodal studio does not block the background');
  companion(true);ambient.configure({enabled:false});prefs.backgroundMotion=false;companion(false);assert.equal(ambient.getState().enabled,false);assert.equal(ambient.getState().running,false);assert.equal(video.paused,true,'Closing the assistant retains user-disabled background motion');
  ambient.configure({enabled:true});prefs.backgroundMotion=true;window.YV_WORKSTATION.afterRender();document.hidden=true;emit(documentHandlers,'visibilitychange');companion(true);companion(false);assert.equal(ambient.getState().running,false);assert.equal(video.paused,true,'Closing a modal while hidden never resumes playback');document.hidden=false;emit(documentHandlers,'visibilitychange');assert.equal(ambient.getState().running,true);assert.equal(video.paused,false);
  media.matches=true;mediaHandlers.forEach(fn=>fn());assert.equal(ambient.getState().running,false);assert.equal(video.paused,true,'System reduced motion pauses both background layers');media.matches=false;mediaHandlers.forEach(fn=>fn());assert.equal(ambient.getState().running,true);assert.equal(video.paused,false);
  companion(true);ambient.configure({reducedMotion:true});prefs.reducedMotion=true;companion(false);assert.equal(ambient.getState().running,false);assert.equal(video.paused,true);window.YV_WORKSTATION.beforeRender();assert.equal(video.paused,true);
  console.log('PASS classic canvas and cover video pause behind modals and respect hidden, disabled, and reduced-motion states');
}
