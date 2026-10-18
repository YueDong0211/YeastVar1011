'use strict';
// Independent read-only adversarial regressions against shipped controllers and resolver.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,'dist',f),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
const data={workflow:JSON.parse(read('data/workflow.json')),projects:JSON.parse(read('data/projects.json')),categories:JSON.parse(read('data/research-categories.json')),literature:JSON.parse(read('data/literature.json')),markers:{markers:[],sources:[]}};
const maps={tool:new Map(data.workflow.tools.map(x=>[x.id,x])),step:new Map(data.workflow.steps.map(x=>[x.id,x])),metric:new Map(data.workflow.metrics.map(x=>[x.id,x])),formula:new Map(data.workflow.formulas.map(x=>[x.id,x])),project:new Map(data.projects.projects.map(x=>[x.id,x])),marker:new Map(),source:new Map()};
const empty={schema:'yeastvar1011-plan-v2',title:'Independent boundary audit',objective:'',projects:[],stages:[],tools:[],metrics:[],markers:[],edges:[],availableData:['count_matrix','sample_metadata'],inputRoute:'count_matrix',parameters:{},methodContractsVersion:1,methodOptionIds:[],manualToolIds:[],manualMetricIds:[],toolBranches:{},inputEvidence:{},directionProvenance:null};
const fresh=()=>plain(empty),findings=[];
const store=new Map([['yv.plan.v2',JSON.stringify(empty)]]);
function harness(savedStore=store){
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const app={data:()=>data,maps:()=>maps,prefs:()=>({language:'en'}),esc,tx:x=>String(x??''),t:x=>x,field:(kind,o,k)=>o[k]||'',icon:()=>'',syncMarkers(){},render(){},toast(){},route:()=> 'workbench',download(){},list:xs=>'<ul>'+xs.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>',link:(url,text)=>'<a href="'+url+'">'+esc(text)+'</a>',openRecord(){}};
 const ctx={URL,URLSearchParams,setTimeout,clearTimeout,CustomEvent:class{},location:{hash:'#workbench?stage=scope'},history:{replaceState(){}},localStorage:{getItem:k=>savedStore.get(k),setItem:(k,v)=>savedStore.set(k,v),removeItem:k=>savedStore.delete(k)},document:{addEventListener(){},querySelector:()=>null,getElementById:()=>null,querySelectorAll:()=>[]},window:{addEventListener(){},dispatchEvent(){},YV_APP:app,YV_BUILD_TEXT:k=>k}};
 for(const f of ['marker-selection-v25c.js','plan-inputs.js','builder.js','plan-contracts-locales-v25d.js'])vm.runInNewContext(read(f),ctx,{filename:f});
 ctx.window.YV_BUILDER.init(app);return{B:ctx.window.YV_BUILDER,I:ctx.window.YV_INPUTS,UI:ctx.window.YV_PLAN_CONTRACTS,ctx};
}
const H=harness(),{B,I,UI}=H;
function add(id,description,observed){findings.push({id,description,observed});}
function evidenceFor(tool,branch,value){const result={};for(const r of I.toolContract(maps.tool.get(tool)).branches.find(x=>x.id===branch).evidenceRequirements||[]){result[r.inputId]??={};result[r.inputId][r.field]=r.min??value;}return result;}

// P01: import type confusion can turn boolean flags into documentary provenance.
B.importPlan({...fresh(),tools:['basics'],toolBranches:{basics:'without_spikes'},inputEvidence:evidenceFor('basics','without_spikes',true)});
add('BOOLEAN_BASICS_EVIDENCE','Boolean true values in source/batch/population fields are not actual provenance records.',{normalized:B.getPlan().inputEvidence,status:B.inputReview().methodDecisions.tools[0].status,issues:B.inputReview().contractIssues});
B.importPlan({...fresh(),tools:['cellrank'],availableData:['count_matrix','sample_metadata','pseudotime'],toolBranches:{cellrank:'rooted_pseudotime'},directionProvenance:{mode:'rooted_pseudotime',sourceRef:true,rootReason:true,rootState:true}});
add('BOOLEAN_ROOT_PROVENANCE','A root must have an actual source and defined root, rather than imported booleans.',{normalized:B.getPlan().directionProvenance,status:B.inputReview().methodDecisions.tools[0].status,issues:B.inputReview().contractIssues});
const reloaded=harness();add('BOOLEAN_ROOT_RELOAD','Reload must preserve pending invalid provenance rather than legitimizing it.',{status:reloaded.B.inputReview().methodDecisions.tools[0].status,issues:reloaded.B.inputReview().contractIssues});
B.importPlan({...fresh(),tools:['basics'],availableData:['count_matrix','sample_metadata','culture_replicates'],toolBranches:{basics:'without_spikes'},parameters:{basics:{BatchInfo:'1'}}});
add('BIOLOGICAL_REPLICATES_NOT_TECHNICAL','Independent biological cultures and a BatchInfo label alone do not establish genuine technical replication.',{status:B.inputReview().methodDecisions.tools[0].status,issues:B.inputReview().contractIssues});
const fractional=evidenceFor('basics','without_spikes','source.tsv');fractional.sample_metadata.technical_replicate_count=2.5;
B.importPlan({...fresh(),tools:['basics'],toolBranches:{basics:'without_spikes'},inputEvidence:fractional});
add('FRACTIONAL_REPLICATE_COUNT','A replicate count must be an integer, rather than merely exceed the minimum.',{status:B.inputReview().methodDecisions.tools[0].status,issues:B.inputReview().contractIssues});

// P02: branch choice has all source fields but actual required inputs are absent.
B.importPlan({...fresh(),tools:['scpower'],stages:['design'],toolBranches:{scpower:'eqtl'},inputEvidence:evidenceFor('scpower','eqtl','sources.tsv'),availableData:['count_matrix','sample_metadata','culture_replicates']});
add('MISSING_EQTL_INPUT_REVIEW','No genotypes or kinship are declared although source text is complete.',{method:B.inputReview().methodDecisions.tools[0],panel:UI.reviewPanel(),rows:UI.exportRows(B.exported())});

// P03: actual routes, no fabricated fixture; optional-source leakage after cancellation.
for(const route of data.projects.projects.filter(r=>r.methodOptions?.length)){
 B.importPlan(fresh());B.setProjects([route.id]);
 const options=route.methodOptions;
 // Sources may legitimately be shared by a base tool/metric and an optional audit.
 // Derive ownership from catalogue records, never from the export being tested.
 const sourceList=x=>[...(x?.sourceUrls||[]),...(x?.collection?.sourceUrls||[]),x?.url,x?.paperUrl,x?.doi?('https://doi.org/'+x.doi):null].filter(Boolean);
 const {methodOptions:unusedOptions,...baseProject}=route;
 const baseStageRecords=B.getPlan().stages.map(id=>maps.step.get(id)).filter(Boolean);
 const baseFormulaRecords=[...new Set(baseStageRecords.flatMap(s=>s.formulaIds||[]))].map(id=>maps.formula.get(id)).filter(Boolean);
 // Shared references may also originate in a base metric's diagnostics, a stage,
 // a formula, or a project input contract. Audit these actual owned records too.
 const baseOwnedRecords=[{...baseProject,sourceUrls:route.baseSourceUrls||route.sourceUrls},...(route.baseToolIds||[]).map(id=>maps.tool.get(id)).filter(Boolean),...(route.baseMetricIds||[]).map(id=>maps.metric.get(id)).filter(Boolean),...baseStageRecords,...baseFormulaRecords,...(route.basePaperIds||[]).map(id=>data.literature.papers.find(p=>p.id===id)).filter(Boolean)];
 const baseOwnedSources=new Set(H.ctx.window.YV_MARKER_SELECTION.referenceLinks(baseOwnedRecords));
 const optionOnlySources=new Set(options.flatMap(o=>[...(o.sourceUrls||[]),...(o.toolIds||[]).flatMap(id=>sourceList(maps.tool.get(id)))]).filter(url=>!baseOwnedSources.has(url)));
 const base=B.exported();const initialLeaks=base.sourceUrls.filter(url=>optionOnlySources.has(url));
 for(const o of options)B.setMethodOption(route.id,o.id,true);
 for(const o of options)B.setMethodOption(route.id,o.id,false);
 const after=B.exported();const leakedTools=after.tools.filter(id=>!route.baseToolIds.includes(id));
 const leakedMetrics=after.metrics.filter(id=>!route.baseMetricIds.includes(id));
 const citationLeaks=after.sourceUrls.filter(url=>optionOnlySources.has(url));
 if(initialLeaks.length||leakedTools.length||leakedMetrics.length||citationLeaks.length)add('OPTION_LEAK_'+route.id,'Real-route optional source or tool leakage after deselection.',{initialLeaks,leakedTools,leakedMetrics,citationLeaks});
}

// P04: old plans must keep manually selected tools but need explicit method decisions.
B.importPlan(fresh());B.toggleTool('slingshot',true);const manualExport=B.exported();
add('MANUAL_TOOL_STAGE_METRICS','Manually adding one tool should not silently select optional methods via every stage metric.',{tools:manualExport.tools,options:manualExport.methodOptionIds,optionalMetrics:manualExport.metrics.filter(id=>id.startsWith('v25_')),requiredInputs:B.inputReview().inputs.map(r=>r.id),optionalMethodURLs:manualExport.sourceUrls.filter(u=>['42841-y','08453-2','01663-5','02341-y'].some(s=>u.includes(s)))});
const legacy={...fresh(),tools:['basics','scpower','cellrank'],parameters:{basics:{BatchInfo:'1'}},availableData:['count_matrix','sample_metadata','culture_replicates','directional_evidence']};delete legacy.methodContractsVersion;delete legacy.manualToolIds;delete legacy.manualMetricIds;delete legacy.toolBranches;
B.importPlan(legacy);const r=B.inputReview();add('LEGACY_IMPORT_PENDING','Legacy tools are retained with branch decisions unresolved.',{tools:B.getPlan().tools,manual:B.getPlan().manualToolIds,issues:r.contractIssues,status:r.methodDecisions.tools.map(x=>[x.toolId,x.status])});

// P05: changing branches should immediately change hard inputs and direction review.
B.importPlan({...fresh(),tools:['cellrank'],availableData:['count_matrix','sample_metadata','timepoints'],toolBranches:{cellrank:'observed_time'},directionProvenance:{mode:'observed_time',sourceRef:'observed-samples.tsv',timeColumn:'hours',units:'h'}});
B.setToolBranch('cellrank','velocity');add('DIRECTION_BRANCH_CHANGE','Changing from real time to velocity requires splicing layers and new provenance.',{method:B.inputReview().methodDecisions.tools[0]});

// P06: a cancelled route leaves latent method choices and can reinstate them on reselect.
B.importPlan(fresh());B.setProjects(['trajectory_structure']);B.setMethodOption('trajectory_structure','v25_temporal_ot',true);B.setProjects([]);const off=B.exported();B.setProjects(['trajectory_structure']);add('RESELECT_ROUTE_OPTIONS','Route deselection must have an explicit retention policy for previous option choices.',{afterRemoval:{activeOptions:off.methodOptionRecords,storedOptions:off.methodOptionIds,tools:off.tools},afterReselect:{storedOptions:B.getPlan().methodOptionIds,tools:B.getPlan().tools}});

const observed=id=>findings.find(f=>f.id===id).observed;
let checks=0;const check=(name,fn)=>{fn();checks++;console.log('PASS '+name);};
check('Imported booleans cannot satisfy BASiCS source or biological-population evidence',()=>{
 const o=observed('BOOLEAN_BASICS_EVIDENCE');assert.equal(o.status,'decision-pending');
 for(const field of ['technical_batch_column','technical_population_definition','technical_design_source'])assert.ok(o.issues.some(i=>i.field===field));
});
check('Boolean root provenance remains pending on import and local-storage reload',()=>{
 for(const id of ['BOOLEAN_ROOT_PROVENANCE','BOOLEAN_ROOT_RELOAD']){const o=observed(id);assert.equal(o.status,'decision-pending');for(const field of ['sourceRef','rootReason','rootCellsOrState'])assert.ok(o.issues.some(i=>i.field===field));}
});
check('Biological cultures and fractional counts cannot establish technical replication',()=>{
 const o=observed('BIOLOGICAL_REPLICATES_NOT_TECHNICAL');assert.equal(o.status,'decision-pending');assert.ok(o.issues.some(i=>i.field==='technical_design_source'));
 assert.ok(observed('FRACTIONAL_REPLICATE_COUNT').issues.some(i=>i.field==='technical_replicate_count'));
});
check('Missing eQTL data cannot produce a complete-plan summary',()=>{
 const o=observed('MISSING_EQTL_INPUT_REVIEW');assert.equal(o.method.status,'input-pending');assert.deepEqual(plain(o.method.unmet),['genotypes','kinship']);
 assert.ok(!o.panel.includes('<p>Plan conditions recorded</p>'));assert.ok(o.panel.includes('Inputs pending'));
 assert.match(maps.tool.get('scpower').limitations[0],/估计均值 DE\/eQTL 功效；噪音 QTL 另设功效模型/);
 assert.match(maps.tool.get('scpower').limitations[0],/二倍体 HWE/);
 assert.match(maps.tool.get('scpower').limitations[0],/酵母倍性、群体结构/);
 assert.match(maps.tool.get('scpower').limitations[0],/遗传样本量按菌株计/);
});
check('Historical and extended real routes cancel optional tools, metrics and sources together',()=>{
 assert.equal(data.projects.projects.filter(r=>(r.methodOptions||[]).some(o=>o.addedIn!=='v25f_design_review')).length,20);assert.equal(data.projects.projects.filter(r=>r.methodOptions?.length).length,24);assert.equal(data.projects.projects.flatMap(r=>r.methodOptions||[]).filter(o=>o.addedIn==='v25f_design_review').length,54);assert.deepEqual(findings.filter(f=>f.id.startsWith('OPTION_LEAK_')),[]);
});
check('Manual Slingshot selection does not silently select other dynamic methods or their data',()=>{
 const o=observed('MANUAL_TOOL_STAGE_METRICS');assert.deepEqual(plain(o.tools),['slingshot']);assert.deepEqual(plain(o.options),[]);assert.deepEqual(plain(o.optionalMetrics),[]);assert.deepEqual(plain(o.optionalMethodURLs),[]);
 for(const id of ['splicing_layers','timepoints','kinetic_rate_prior'])assert.ok(!o.requiredInputs.includes(id),id+' unexpectedly required');
});
check('Legacy tools survive import but branch choices remain explicitly pending',()=>{
 const o=observed('LEGACY_IMPORT_PENDING');for(const id of ['basics','scpower','cellrank']){assert.ok(o.tools.includes(id));assert.ok(o.manual.includes(id));assert.ok(o.issues.some(i=>i.kind==='branch-pending'&&i.toolId===id));}
});
check('Changing time direction to velocity requires new layers and matching direction diagnostics',()=>{
 const o=observed('DIRECTION_BRANCH_CHANGE').method;assert.equal(o.status,'decision-pending');assert.ok(o.unmet.includes('splicing_layers'));
 for(const field of ['directionMode','quantifier','diagnosticsRef'])assert.ok(o.issues.some(i=>i.field===field));
});
check('Inactive saved route options do not leak into exports; reselecting resumes their explicit choices',()=>{
 const o=observed('RESELECT_ROUTE_OPTIONS');assert.deepEqual(plain(o.afterRemoval.activeOptions),[]);assert.deepEqual(plain(o.afterRemoval.tools),[]);
 assert.ok(o.afterReselect.storedOptions.includes('trajectory_structure:v25_temporal_ot'));assert.ok(o.afterReselect.tools.includes('moscot'));
});
console.log(JSON.stringify({status:'passed',audit:'H02/H04 independent adversarial regressions',checks,historicalRoutesAudited:20,realRoutesAudited:24,newDesignReviewAttachments:54,productionMutations:false,biologicalExecution:false,browser:false}));
