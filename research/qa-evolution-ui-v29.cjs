'use strict';
// Pure Node VM: shipped method records, delegated controls and downloadable JSON.
// This file intentionally imports no browser automation runtime.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,'dist',file),'utf8'),plain=value=>JSON.parse(JSON.stringify(value));
const languages=['zh','en','fr','es','eu'],families=['posterior','heritability','tree','trait','simulation'];
const data={projects:JSON.parse(read('data/projects.json')),workflow:JSON.parse(read('data/workflow.json'))};
const originalData=JSON.stringify(data),handlers={},opened=[],downloads=[],blobs=[],revoked=[];
let language='en',focused='',notice='';
const query={value:'',focus(){focused='ev29-query';}},document={
  addEventListener(type,listener){(handlers[type]??=[]).push(listener);},
  getElementById(id){return id==='ev29-query'?query:id==='ev29-message'?{set textContent(value){notice=value;}}:null;},
  createElement(){return {click(){downloads.push({name:this.download,url:this.href});},remove(){}};},
  body:{appendChild(){}}
};
class DownloadURL extends URL{}
DownloadURL.createObjectURL=blob=>(blobs.push(blob),'blob:evolution-'+blobs.length);
DownloadURL.revokeObjectURL=url=>revoked.push(url);
const window={YV_APP:{data:()=>data,prefs:()=>({language}),tx:value=>value,openRecord:(kind,id)=>opened.push({kind,id})}};
Object.defineProperty(window,'YV_BUILDER',{get(){throw Error('Supplementary catalogue must not access the main-plan builder');}});
const context=vm.createContext({window,document,URL:DownloadURL,Blob,setTimeout:fn=>fn()});
vm.runInContext(read('evolution-catalogue-v29.js'),context,{filename:'evolution-catalogue-v29.js'});
const UI=window.YV_EVOLUTION_CATALOGUE;
const emit=(type,target)=>{for(const handler of handlers[type]||[])handler({target});};
const click=dataset=>emit('click',{closest:()=>({dataset,hasAttribute:name=>Object.hasOwn(dataset,name.replace(/^data-/,'').replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase()))})});
const choose=(id,checked=true)=>emit('change',{dataset:{ev29Select:id},checked});
const search=value=>emit('input',{dataset:{ev29Query:''},value});
const reset=()=>click({ev29Reset:''});

(async()=>{
  for(const method of ['panel','records','results','getState','exportSelection'])assert.equal(typeof UI[method],'function');
  const rows=plain(UI.records());
  assert.equal(rows.length,14);assert.equal(new Set(rows.map(row=>row.id)).size,14);
  assert.deepEqual([...new Set(rows.map(row=>row.family))].sort(),families.slice().sort());
  for(const row of rows){
    assert(families.includes(row.family));assert(['rna','relatedness','tree_required','kinship_required','dna','context','model'].includes(row.feasibility));
    assert(row.inputs.length&&row.metrics.length&&row.tools.length&&row.papers.length&&row.routeIds.length,row.id+' contains actionable fields');
    for(const value of [row.title,row.question,row.interpretation,...row.inputs,...row.metrics])for(const lang of languages){assert.equal(typeof value[lang],'string');assert(value[lang].trim(),row.id+'/'+lang);if(lang!=='zh')assert(!/[\u3400-\u9fff]/u.test(value[lang]),row.id+' untranslated '+lang);}
    for(const id of row.routeIds)assert(data.projects.projects.some(project=>project.id===id),row.id+' unknown route '+id);
    for(const tool of row.tools){assert(tool.name);assert.equal(new URL(tool.url).protocol,'https:');if(tool.id)assert(data.workflow.tools.some(record=>record.id===tool.id),row.id+' unknown tool '+tool.id);}
    for(const paper of row.papers){assert(paper.title);assert(Number.isInteger(paper.year));assert(/^10\.\d{4,9}\/\S+$/i.test(paper.doi),paper.doi);assert.equal(paper.url,'https://doi.org/'+paper.doi);assert(row.sourceUrls.includes(paper.url));}
    for(const url of row.sourceUrls)assert.equal(new URL(url).protocol,'https:');
  }
  const copy=UI.records();copy[0].title.en='Modified outside';assert.notEqual(UI.records()[0].title.en,'Modified outside','Published records are detached copies');
  console.log('PASS 14 method schemas, five categories, five-language fields, real tool/route IDs and DOI/URL integrity');

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
  for(const id of ['mean_noise_traits','plasticity_convergence','posterior_checks'])choose(id);
  const conditionalExport=plain(UI.exportSelection());
  for(const row of conditionalExport.methods)assert.deepEqual(row.inputs,rows.find(record=>record.id===row.id).inputs,'Export retains the reviewed branch-specific inputs');
  click({ev29Clear:''});
  console.log('PASS K-or-C alternatives, conditional lineage-tree requirement and RNA-specific posterior checks in all locales and export');

  const titles={zh:'噪音、遗传与进化',en:'Noise, genetics and evolution',fr:'Bruit, génétique et évolution',es:'Ruido, genética y evolución',eu:'Zarata, genetika eta eboluzioa'};
  for(const lang of languages){language=lang;const html=UI.panel();assert(html.includes(titles[lang]));assert.equal((html.match(/data-ev29-card=/g)||[]).length,14);assert.equal((html.match(/data-ev29-details=/g)||[]).length,14);assert(!/<details[^>]*\sopen(?:\s|>)/.test(html),'Details start collapsed');assert(html.includes('class="ev29-model-map"'));assert(html.includes('aria-controls="ev29-results"'));assert(html.includes('aria-live="polite"'));assert(html.includes('id="ev29-query"'));if(lang!=='zh')assert(!/[\u3400-\u9fff]/u.test(html),'Chinese leak into '+lang);}
  language='en';const initial=UI.panel();assert(initial.includes('data-ev29-export disabled'));assert(initial.includes('data-ev29-clear disabled'));
  console.log('PASS localized closed cards, model-map disclosure, accessible labels/status and initial disabled controls');

  const expectedFamilies={posterior:3,heritability:2,tree:3,trait:5,simulation:1};
  for(const [family,count] of Object.entries(expectedFamilies)){click({ev29Family:family});assert.equal(UI.results().length,count);assert(UI.panel().includes('data-ev29-family="'+family+'" aria-pressed="true"'));}
  click({ev29Family:'not-a-category'});assert.equal(UI.getState().family,'simulation');reset();
  search('10.1093/molbev/msag117');assert.deepEqual(plain(UI.results()),['ml_tree']);
  search('BASiCS');assert.deepEqual(plain(UI.results()),['bayes_noise']);
  search('MCMCglmm');assert(plain(UI.results()).includes('measurement_error'));
  search('nonexistent-query-v29');assert.equal(UI.results().length,0);assert(UI.panel().includes('class="ev29-empty"'));reset();assert.equal(UI.results().length,14);assert.equal(focused,'ev29-query');
  console.log('PASS delegated category/query filters, DOI/tool search, invalid-category rejection and empty-result recovery');

  choose('bayes_noise');choose('ml_tree');choose('missing-method');assert.deepEqual(plain(UI.getState().selected),['bayes_noise','ml_tree']);
  click({ev29Family:'trait'});assert.equal(UI.results().length,5);assert.equal(UI.exportSelection().methods.length,2,'Hidden selections must survive filters');
  search('nothing-matches');assert.equal(UI.results().length,0);assert.equal(UI.exportSelection().methods.length,2);reset();
  assert(UI.panel().includes('data-ev29-select="bayes_noise" checked'));assert(UI.panel().includes('data-ev29-select="ml_tree" checked'));
  emit('toggle',{dataset:{ev29Details:'ml_tree'},open:true,isConnected:true});assert(/data-ev29-details="ml_tree" open/.test(UI.panel()));
  click({ev29Family:'posterior'});reset();assert(/data-ev29-details="ml_tree" open/.test(UI.panel()),'Open detail survives filter round trip');
  emit('toggle',{dataset:{ev29Details:'ml_tree'},open:false,isConnected:false});assert(/data-ev29-details="ml_tree" open/.test(UI.panel()),'Detached close events do not lose disclosure state');
  emit('toggle',{dataset:{ev29Details:'ml_tree'},open:false,isConnected:true});assert(!/data-ev29-details="ml_tree" open/.test(UI.panel()));
  console.log('PASS cross-filter selection preservation, missing-ID rejection and stable disclosure state');

  click({ev29Route:'evolution_context'});click({ev29Tool:'brms'});click({ev29Tool:'phytools2'});
  assert.deepEqual(opened,[{kind:'project',id:'evolution_context'},{kind:'tool',id:'brms'},{kind:'tool',id:'phytools2'}]);
  click({ev29Route:'not-a-route'});click({ev29Tool:'not-a-tool'});assert.equal(opened.length,3);
  const fakeProject=data.projects.projects.find(project=>project.id==='evolution_context'),savedTitle=fakeProject.title,savedTitleEn=fakeProject.titleEn;
  fakeProject.title='<img src=x onerror=bad()>';fakeProject.titleEn='<img src=x onerror=bad()>';const escaped=UI.panel();assert(!escaped.includes('<img'));assert(escaped.includes('&lt;img'));fakeProject.title=savedTitle;fakeProject.titleEn=savedTitleEn;
  console.log('PASS real record actions, invalid-record rejection and escaping of catalogue titles');

  language='fr';click({ev29Family:'trait'});click({ev29Export:''});assert.equal(downloads.length,1);assert.equal(downloads[0].name,'YeastVar1011-evolution-checklist.json');assert.equal(blobs[0].type,'application/json;charset=utf-8');
  const exported=JSON.parse(await blobs[0].text());assert.equal(exported.schema,'yeastvar1011.supplementary-method-checklist');assert.equal(exported.version,1);assert.equal(exported.language,'fr');assert.equal(exported.purpose,'research_planning');assert.equal(exported.executionStatus,'not_executed');assert.equal(exported.mainPlanModified,false);assert.equal(exported.selectionScope,'all_selected_including_hidden_by_filters');assert.deepEqual(exported.methods.map(row=>row.id),['bayes_noise','ml_tree']);assert(!Number.isNaN(Date.parse(exported.createdAt)));
  for(const row of exported.methods){assert.equal(row.display.title,row.title.fr);assert.equal(row.display.question,row.question.fr);assert.deepEqual(row.display.inputs,row.inputs.map(value=>value.fr));assert.deepEqual(row.display.metrics,row.metrics.map(value=>value.fr));assert.equal(row.display.interpretation,row.interpretation.fr);assert(row.papers.every(paper=>row.sourceUrls.includes(paper.url)));}
  assert(notice);assert.deepEqual(revoked,['blob:evolution-1']);click({ev29Clear:''});assert.equal(UI.exportSelection().methods.length,0);assert.equal(focused,'ev29-query');click({ev29Export:''});assert.equal(downloads.length,1,'No download with an empty checklist');
  assert.equal(JSON.stringify(data),originalData,'Browsing and export preserve the production catalogue');
  console.log('PASS actual Blob JSON download, selected-but-hidden records, localized display, sources, URL cleanup and independent checklist clearing');
  console.log(JSON.stringify({passed:true,checks:7,methods:14,languages:5,browser:false,mainPlanAccess:false}));
})().catch(error=>{console.error(error);process.exitCode=1;});
