'use strict';
// Pure Node VM: shipped scientific records, real main-plan ownership and delegated UI.
// No browser automation runtime is imported or executed.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,'dist',f),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
const languages=['zh','en','fr','es','eu'],families=['posterior','heritability','tree','trait','simulation'];
const data={projects:JSON.parse(read('data/projects.json')),workflow:JSON.parse(read('data/workflow.json')),categories:JSON.parse(read('data/research-categories.json')),literature:JSON.parse(read('data/literature.json')),markers:{markers:[],sources:[]}};
const originalData=JSON.stringify(data),handlers={},windowHandlers={},opened=[],downloads=[],blobs=[],revoked=[],store=new Map();
let language='en',focused='',notice='',liveRoot=null;
const maps={tool:new Map(data.workflow.tools.map(x=>[x.id,x])),metric:new Map(data.workflow.metrics.map(x=>[x.id,x])),step:new Map(data.workflow.steps.map(x=>[x.id,x])),formula:new Map(data.workflow.formulas.map(x=>[x.id,x])),project:new Map(data.projects.projects.map(x=>[x.id,x])),marker:new Map(),source:new Map()};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const query={value:'',focus(){focused='ev29-query';}},document={
 addEventListener(type,fn){(handlers[type]??=[]).push(fn);},querySelector:()=>null,querySelectorAll:()=>[],
 getElementById(id){return id==='evolution-catalogue-v29'?liveRoot:id==='ev29-query'?query:id==='ev29-message'?{set textContent(v){notice=v;}}:null;},
 createElement(){return {click(){downloads.push({name:this.download,url:this.href});},remove(){}};},body:{appendChild(){}}
};
class DownloadURL extends URL{};DownloadURL.createObjectURL=b=>(blobs.push(b),'blob:evolution-'+blobs.length);DownloadURL.revokeObjectURL=u=>revoked.push(u);
const app={data:()=>data,maps:()=>maps,prefs:()=>({language}),tx:x=>x,esc,t:k=>k,field:(k,o,f)=>o[f]||'',syncMarkers(){},render(){},toast(){},icon:()=>'',route:()=> 'projects',openRecord:(kind,id)=>opened.push({kind,id})};
const window={YV_APP:app,YV_BUILD_TEXT:k=>k,addEventListener(k,fn){(windowHandlers[k]??=[]).push(fn);},dispatchEvent(event){for(const fn of windowHandlers[event.type]||[])fn(event);}};
const context=vm.createContext({window,document,URL:DownloadURL,URLSearchParams,Blob,setTimeout:fn=>fn(),clearTimeout(){},CustomEvent:class{constructor(type,init={}){this.type=type;this.detail=init.detail;}},localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},location:{hash:'#projects?view=evolution'},history:{replaceState(){}}});
const load=f=>vm.runInContext(read(f),context,{filename:f});
load('marker-selection-v25c.js');load('plan-inputs.js');load('builder.js');
const B=window.YV_BUILDER;
const empty={schema:'yeastvar1011-plan-v2',methodContractsVersion:1,analysisLinkVersion:1,title:'Evolution regression',objective:'',projects:[],tools:[],metrics:[],stages:[],markers:[],edges:[],availableData:['count_matrix','sample_metadata'],inputRoute:'count_matrix',parameters:{},analysisSelections:[],manualToolIds:[],manualMetricIds:[],manualProjectIds:[],manualMethodOptionIds:[],manualStageIds:[],manualBranchIds:[],toolBranches:{},inputEvidence:{},directionProvenance:null};
store.set('yv.plan.v2',JSON.stringify(empty));B.init(app);
load('evolution-population-v30-data.js');load('evolution-catalogue-v29.js');
const UI=window.YV_EVOLUTION_CATALOGUE;
// Invoke the real catalogue delegates only; builder's unrelated global controls are out of scope.
const emit=(type,target)=>(handlers[type]||[]).at(-1)?.({target});
const click=dataset=>emit('click',{closest:()=>({dataset,hasAttribute:name=>Object.hasOwn(dataset,name.replace(/^data-/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase()))})});
const choose=(id,checked=true)=>emit('change',{dataset:{ev29Select:id},checked,id:'ev29-select-'+id});
const change=(dataset,value,checked)=>emit('change',{dataset,value,checked});
const search=value=>emit('input',{dataset:{ev29Query:''},value});
const reset=()=>click({ev29Reset:''});
const def=id=>data.projects.evolutionRecipes.find(r=>r.id===id),defaultRecipe=id=>def(id).variants.find(v=>v.id===def(id).defaultVariant).recipe;
const saved=id=>B.getPlan().analysisSelections.find(r=>r.id==='evolution:'+id);
const ids=xs=>[...xs].sort();
(async()=>{
 const rows=plain(UI.records());assert.equal(rows.length,19);assert.equal(new Set(rows.map(r=>r.id)).size,rows.length);
 assert.deepEqual(ids(new Set(rows.map(r=>r.family))),ids(families));
 for(const row of rows){
  assert(families.includes(row.family));assert(['rna','relatedness','tree_required','kinship_required','dna','context','model'].includes(row.feasibility));
  assert(row.inputs.length&&row.metrics.length&&row.tools.length&&row.papers.length&&row.routeIds.length,row.id+' complete guide');
  for(const text of [row.title,row.question,row.interpretation,...row.inputs,...row.metrics])for(const lang of languages){assert.equal(typeof text[lang],'string');assert(text[lang].trim());if(lang!=='zh')assert(!/[\u3400-\u9fff]/u.test(text[lang]),row.id+' untranslated '+lang);}
  row.routeIds.forEach(id=>assert(maps.project.has(id),row.id+' unknown route '+id));
  for(const t of row.tools){assert(t.name);assert.equal(new URL(t.url).protocol,'https:');if(t.id)assert(maps.tool.has(t.id),row.id+' unknown tool '+t.id);}
  for(const p of row.papers){assert(p.title);assert(Number.isInteger(p.year));assert(/^10\.\d{4,9}\/\S+$/i.test(p.doi));assert.equal(p.url,'https://doi.org/'+p.doi);assert(row.sourceUrls.includes(p.url));}
  row.sourceUrls.forEach(url=>assert.equal(new URL(url).protocol,'https:'));
  const definition=def(row.id);assert(definition&&definition.variants.length,row.id+' has real plan recipes');assert(definition.variants.some(v=>v.id===definition.defaultVariant));
  for(const v of definition.variants){assert.equal(v.recipe.id,'evolution:'+row.id);assert(!(v.recipe.projectIds||[]).length,'Precise analyses do not select entire parent routes');for(const id of v.recipe.contextProjectIds||[])assert(maps.project.has(id));for(const id of v.recipe.toolIds)assert(maps.tool.has(id),row.id+' tool '+id);for(const id of v.recipe.metricIds)assert(maps.metric.has(id),row.id+' metric '+id);for(const id of v.recipe.requiredData)assert(data.categories.dataRequirements.some(x=>x.id===id));for(const lang of languages)assert(v.title[lang]&&v.recipe.title[lang]);}
 }
 const copy=UI.records();copy[0].title.en='Changed';assert.notEqual(UI.records()[0].title.en,'Changed');
 console.log('PASS 19 source-backed guides, five languages, real recipe variants/tools/metrics/inputs and detached records');
  const meanNoise=rows.find(row=>row.id==='mean_noise_traits'),plasticity=rows.find(row=>row.id==='plasticity_convergence'),posterior=rows.find(row=>row.id==='posterior_checks');
  assert.equal(rows.find(row=>row.id==='genomic_variance').feasibility,'kinship_required');
  for(const id of ['tree_variance','tree_atlas','phylogenetic_signal','ancestral_states','bm_ou'])assert.equal(rows.find(row=>row.id===id).feasibility,'tree_required',id+' requires a tree, not interchangeable kinship');
  assert.equal(meanNoise.feasibility,'relatedness');
  const treeBadges={zh:'另需菌株树',en:'Requires a strain tree',fr:'Arbre des souches requis',es:'Requiere un árbol de cepas',eu:'Andui-zuhaitza behar da'},kinshipBadges={zh:'另需遗传亲缘矩阵 K',en:'Requires genomic kinship K',fr:'Matrice de parenté génomique K requise',es:'Requiere parentesco genómico K',eu:'K ahaidetasun genomikoa behar da'};
  for(const lang of languages){language=lang;const html=UI.panel(),card=id=>html.split('data-ev29-card="'+id+'"')[1].split('</article>')[0];assert(card('genomic_variance').includes('<span class="ev29-requirement">'+kinshipBadges[lang]+'</span>'));for(const id of ['tree_variance','tree_atlas','phylogenetic_signal','ancestral_states','bm_ou'])assert(card(id).includes('<span class="ev29-requirement">'+treeBadges[lang]+'</span>'),id+'/'+lang+' badge');}
  language='en';
  const genericTree=rows.find(row=>row.id==='ancestral_states').inputs.find(value=>value.en.startsWith('Strain tree with'));
  const genericK=rows.find(row=>row.id==='genomic_variance').inputs.find(value=>value.en.startsWith('Genomic relationship matrix K'));
  assert(!meanNoise.inputs.some(value=>JSON.stringify(value)===JSON.stringify(genericTree)||JSON.stringify(value)===JSON.stringify(genericK)),'Mean–noise model must not require both standalone tree and genomic K inputs');
  const either=meanNoise.inputs.find(value=>/genomic kinship K, or a strain tree \/ covariance C/.test(value.en));assert(either,'Mean–noise model states the K-or-C branch');
  for(const lang of languages)assert(either[lang].includes('K')&&either[lang].includes('C'));
  assert(!plasticity.inputs.some(value=>JSON.stringify(value)===JSON.stringify(genericTree)),'Basic reaction norms must not inherit an unconditional tree input');
  assert(plasticity.inputs.some(value=>/lineage or convergence comparisons only/.test(value.en)&&/reaction norms do not require a tree/.test(value.en)));
  assert(!posterior.inputs.some(value=>/demography|recombination|life cycle/i.test(value.en)),'RNA posterior checks do not require a population-genetic simulation');
  assert(posterior.inputs.some(value=>/generative model/.test(value.en)&&/prior simulations/.test(value.en)&&/check statistics/.test(value.en)));
  assert(/posterior computation/.test(posterior.question.en));
  for(const lang of languages)assert(!/可辨识|identifiab|identificab|identifikagar/i.test(posterior.question[lang]),'Diagnostics question must not promise identifiability: '+lang);
  console.log('PASS K-or-C alternatives, conditional lineage trees, RNA-specific posterior checks and five-language badges');

 for(const lang of languages){language=lang;const html=UI.panel();assert.equal((html.match(/data-ev29-card=/g)||[]).length,rows.length);assert.equal((html.match(/data-ev29-details=/g)||[]).length,rows.length);assert.equal((html.match(/data-ev29-customize=/g)||[]).length,rows.length);assert(!/<details[^>]*\sopen(?:\s|>)/.test(html));assert(html.includes('href="#workbench?stage=scope"'));assert(html.includes('aria-live="polite"'));if(lang!=='zh')assert(!/[\u3400-\u9fff]/u.test(html),'Chinese leaked into '+lang);}
 assert(read('evolution-catalogue-v29.css').includes('.ev29-card:has([data-ev29-select]:checked)'),'Card selection styling follows the analysis checkbox, not disabled preview dependencies');language='en';assert(UI.panel().includes('data-ev29-export disabled'));assert(UI.panel().includes('data-ev29-clear disabled'));console.log('PASS localized compact cards, closed manual/scientific disclosures and accessible main-plan navigation');
 for(const row of rows){B.importPlan(empty);choose(row.id);const recipe=defaultRecipe(row.id),plan=B.getPlan();assert(saved(row.id));assert.deepEqual(ids(plain(plan.tools)),ids(recipe.toolIds),'Only exact recipe tools: '+row.id);assert.deepEqual(ids(plain(plan.metrics)),ids(recipe.metricIds),'Only exact recipe metrics: '+row.id);assert.deepEqual(plain(plan.projects),[]);assert.deepEqual(plain(plan.availableData),empty.availableData);assert.deepEqual(plain(plan.inputEvidence),{});assert.equal(plan.directionProvenance,null);assert(B.analysisReview().selections.length===1);assert(UI.panel().includes('data-ev29-select="'+row.id+'" checked'));choose(row.id,false);assert.equal(B.getPlan().analysisSelections.length,0);assert.equal(B.getPlan().tools.length,0);assert.equal(B.getPlan().metrics.length,0);}
 B.importPlan(empty);choose('bayes_noise');assert(!B.getPlan().toolBranches.basics,'BASiCS cannot infer spike-in design');assert(B.analysisReview().selections[0].issues.some(x=>x.kind==='analysis-branch-pending'));assert(UI.panel().includes('data-status="decision-pending"'));choose('missing');assert.equal(B.getPlan().analysisSelections.length,1);choose('bayes_noise',false);
 console.log('PASS real selection adds exact dependencies without whole routes, fabricated inputs or an assumed BASiCS branch');

 B.importPlan(empty);choose('ml_tree');const variants=def('ml_tree').variants;assert(variants.length>1);const alt=variants.find(v=>v.id!==def('ml_tree').defaultVariant),before=B.recoveryState().undoCount;change({ev29Variant:'ml_tree'},alt.id);assert.equal(saved('ml_tree').variantId,alt.id);assert.deepEqual(ids(plain(B.getPlan().tools)),ids(alt.recipe.toolIds));assert(B.recoveryState().canUndo);B.undo();assert.equal(saved('ml_tree').variantId,def('ml_tree').defaultVariant);B.redo();assert.equal(saved('ml_tree').variantId,alt.id);
 const altTool=alt.recipe.toolIds[0];change({ev29ToolChoice:'ml_tree',value:altTool},null,false);assert(!B.getPlan().tools.includes(altTool));assert(B.analysisReview().selections[0].overrides.excludedToolIds.includes(altTool));assert(UI.panel().includes('data-status="dependency-pending"'));click({ev29Restore:'ml_tree'});assert(B.getPlan().tools.includes(altTool));
 const metric=alt.recipe.metricIds[0];change({ev29MetricChoice:'ml_tree',value:metric},null,false);assert(!B.getPlan().metrics.includes(metric));click({ev29Restore:'ml_tree'});assert(B.getPlan().metrics.includes(metric));const savedBefore=plain(B.getPlan());change({ev29Variant:'ml_tree'},'unknown');change({ev29ToolChoice:'ml_tree',value:'scanpy'},null,false);assert.deepEqual(plain(B.getPlan()),savedBefore);
 B.toggleTool(altTool,true);choose('ml_tree',false);assert(B.getPlan().tools.includes(altTool),'Explicitly retained tool survives analysis removal');
 B.importPlan(empty);choose('genomic_variance');choose('tree_variance');assert(B.getPlan().tools.includes('brms'));choose('genomic_variance',false);assert(B.getPlan().tools.includes('brms'),'Shared dependency remains');choose('tree_variance',false);assert(!B.getPlan().tools.includes('brms'));
 console.log('PASS variant replacement is atomic and undoable, manual overrides restore, and shared/manual dependencies survive removal');

 B.importPlan(empty);const externalRow=rows.find(r=>defaultRecipe(r.id).additionalRequirements?.length),requirement=defaultRecipe(externalRow.id).additionalRequirements[0];assert(externalRow);choose(externalRow.id);assert(B.analysisReview().selections[0].issues.some(i=>i.kind==='analysis-external-input-pending'&&i.inputId===requirement.id));
 const declaration='analysis-notes.tsv#row-4';change({ev29Evidence:externalRow.id,value:requirement.id},declaration);assert.equal(B.getPlan().analysisInputEvidence['evolution:'+externalRow.id][requirement.id],declaration);assert(!B.analysisReview().selections[0].issues.some(i=>i.kind==='analysis-external-input-pending'&&i.inputId===requirement.id));assert(UI.panel().includes('value="'+declaration+'"'));assert(UI.panel().includes('Source recorded'));assert.equal(UI.exportSelection().methods[0].inputEvidence[requirement.id],declaration);
 const withEvidence=B.exported();B.importPlan(withEvidence);assert.equal(B.getPlan().analysisInputEvidence['evolution:'+externalRow.id][requirement.id],declaration);const beforeUnknown=plain(B.getPlan());change({ev29Evidence:externalRow.id,value:'unknown-requirement'},'should not save');assert.deepEqual(plain(B.getPlan()),beforeUnknown);change({ev29Evidence:externalRow.id,value:requirement.id},'   ');assert(!B.getPlan().analysisInputEvidence['evolution:'+externalRow.id]?.[requirement.id]);assert(B.analysisReview().selections[0].issues.some(i=>i.kind==='analysis-external-input-pending'&&i.inputId===requirement.id));
 B.importPlan({...empty,analysisSelections:[{...defaultRecipe('ml_tree'),variantId:'future-variant',toolIds:['future-tool'],metricIds:['future-metric']}]});const imported=UI.panel();assert(imported.includes('value="">Imported setting'));assert(/data-ev29-tool-choice="ml_tree" data-value="future-tool"[^>]*disabled/.test(imported));assert(/data-ev29-metric-choice="ml_tree" data-value="future-metric"[^>]*disabled/.test(imported));assert.equal(saved('ml_tree').variantId,'future-variant');choose('ml_tree',false);assert(!saved('ml_tree'));
 console.log('PASS supplementary input source fields save/reload/clear honestly, and unknown imported variants remain unresolved and removable');

 B.importPlan(empty);choose('bayes_noise');choose('ml_tree');const keep=plain(B.getPlan());const serialized=B.exported();B.importPlan(serialized);assert.deepEqual(plain(B.getPlan().analysisSelections),keep.analysisSelections);assert.deepEqual(plain(UI.getState().selected),['bayes_noise','ml_tree']);
 for(const family of families){click({ev29Family:family});assert.equal(UI.results().length,rows.filter(r=>r.family===family).length);}click({ev29Family:'unknown'});assert.equal(UI.getState().family,'simulation');reset();search('10.1093/molbev/msag117');assert(plain(UI.results()).includes('ml_tree'));search('BASiCS');assert(plain(UI.results()).includes('bayes_noise'));search('no-matches-unique-v30');assert.equal(UI.results().length,0);assert(UI.panel().includes('class="ev29-empty"'));assert.equal(UI.exportSelection().methods.length,2);reset();assert.equal(focused,'ev29-query');assert.equal(UI.results().length,rows.length);
 emit('toggle',{dataset:{ev29Details:'ml_tree'},open:true,isConnected:true});emit('toggle',{dataset:{ev29Customize:'ml_tree'},open:true,isConnected:true});search('nope');emit('toggle',{dataset:{ev29Details:'ml_tree'},open:false,isConnected:false});reset();assert(UI.panel().includes('data-ev29-details="ml_tree" open'));assert(UI.panel().includes('data-ev29-customize="ml_tree" open'));
 console.log('PASS main-plan import/export persistence, cross-filter selection, empty recovery and disclosure state');

 click({ev29Route:'evolution_context'});click({ev29Tool:'brms'});click({ev29Tool:'phytools2'});assert.deepEqual(opened,[{kind:'project',id:'evolution_context'},{kind:'tool',id:'brms'},{kind:'tool',id:'phytools2'}]);click({ev29Route:'bad'});click({ev29Tool:'bad'});assert.equal(opened.length,3);
 const project=maps.project.get('evolution_context'),priorTitle=project.title,priorEnglish=project.titleEn;project.title='<img src=x onerror=bad()>';project.titleEn=project.title;assert(!UI.panel().includes('<img'));assert(UI.panel().includes('&lt;img'));project.title=priorTitle;project.titleEn=priorEnglish;
 language='fr';click({ev29Family:'trait'});click({ev29Export:''});assert.equal(downloads.length,1);assert.equal(downloads[0].name,'YeastVar1011-evolution-analysis-selection.json');const exported=JSON.parse(await blobs[0].text());assert.equal(exported.schema,'yeastvar1011.evolution-analysis-selection');assert.equal(exported.version,2);assert.equal(exported.mainPlanLinked,true);assert.equal(exported.executionStatus,'not_executed');assert.equal(exported.selectionScope,'all_selected_including_hidden_by_filters');assert.deepEqual(exported.methods.map(r=>r.id),['bayes_noise','ml_tree']);for(const r of exported.methods){assert.equal(r.display.title,r.title.fr);assert.equal(r.recipe.id,'evolution:'+r.id);assert(r.planReview);assert.deepEqual(r.display.inputs,r.inputs.map(v=>v.fr));assert(r.sourceUrls.length);}
 assert(notice);assert.deepEqual(revoked,['blob:evolution-1']);
 const unrelated={id:'unrelated-analysis',version:1,title:'Other analysis',toolIds:['scanpy'],metricIds:[],requiredData:['count_matrix']};B.setAnalysis(unrelated,true);const beforeClear=plain(B.getPlan());click({ev29Clear:''});assert.equal(UI.getState().selected.length,0);assert(B.getPlan().analysisSelections.some(r=>r.id==='unrelated-analysis'),'Clear only removes this guide collection');assert(B.getPlan().tools.includes('scanpy'));B.undo();assert.deepEqual(plain(B.getPlan().analysisSelections),beforeClear.analysisSelections,'One undo restores the entire removal');click({ev29Clear:''});click({ev29Export:''});assert.equal(downloads.length,1);assert.equal(JSON.stringify(data),originalData);
 console.log('PASS real actions, escaping, linked JSON download and catalogue-only removal preserving unrelated analyses');
 const configured=data.projects.evolutionRecipes.flatMap(row=>row.variants.filter(v=>v.recipe.modelSpecification).map(v=>({row,variant:v})));assert(configured.length>=3,'Distinct scientific models must accompany the analysis recipes');
 for(const {row,variant}of configured){reset();B.importPlan(empty);change({ev29Variant:row.id},variant.id);choose(row.id);const model=variant.recipe.modelSpecification;assert.deepEqual(plain(saved(row.id).modelSpecification),model);for(const lang of languages){language=lang;const html=UI.panel();assert(html.includes(esc(model.expression)));assert(html.includes(esc(model.entrypoint)));if(model.notes?.[lang])assert(html.includes(esc(model.notes[lang])));}const selectedExport=UI.exportSelection();assert.deepEqual(plain(selectedExport.methods[0].recipe.modelSpecification),model);const exportedPlan=B.exported();B.importPlan(exportedPlan);assert.deepEqual(plain(saved(row.id).modelSpecification),model);}
 const unchanged=plain(B.getPlan());search('phylogenetic');click({ev29Family:'tree'});reset();UI.panel();UI.records();assert.deepEqual(plain(B.getPlan()),unchanged,'Browsing must not mutate selected recipes or source evidence');
 console.log('PASS variant-specific model formulas/calls/notes display in five languages and survive both exports and plan re-import');

 B.importPlan(empty);reset();choose('ml_tree');
 let rendered='',disclosures=[{dataset:{ev29Customize:'ml_tree'},open:true,isConnected:true},{dataset:{ev29Details:'ml_tree'},open:true,isConnected:true}];
 liveRoot={querySelectorAll(selector){return selector.startsWith('[data-ev29-details]')?disclosures:[];},querySelector(selector){return selector==='#ev29-results'?{set innerHTML(html){rendered=html;}}:null;}};
 // Native toggle events are queued: selection can happen before the event is delivered.
 // Preserve the live DOM state even when the state cache has not seen that event.
 change({ev29Variant:'ml_tree'},'raxml');
 assert(rendered.includes('data-ev29-customize="ml_tree" open'),'Open customization survives the first rapid variant change');
 assert(rendered.includes('data-ev29-details="ml_tree" open'),'Open evidence survives rerender');
 emit('toggle',{dataset:{ev29Customize:'ml_tree'},open:false,isConnected:false});
 change({ev29Variant:'ml_tree'},'iqtree');
 assert(rendered.includes('data-ev29-customize="ml_tree" open'),'Detached toggle cannot collapse replacement controls');
 assert.equal(saved('ml_tree').variantId,'iqtree');
 disclosures[0].open=false;search('IQ-TREE');
 assert(!rendered.includes('data-ev29-customize="ml_tree" open'),'A live closed disclosure remains closed');
 liveRoot=null;
 console.log('PASS rapid variant changes snapshot native disclosure state before queued toggle delivery and ignore detached toggle events');
 console.log(JSON.stringify({passed:true,checks:10,methods:rows.length,languages:5,browser:false,mainPlanLinked:true}));
})().catch(error=>{console.error(error);process.exitCode=1;});
