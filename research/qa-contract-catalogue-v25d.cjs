'use strict';
// Catalogue and real resolver tests. No biological analysis or file mutation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const json = p => JSON.parse(read(p));
const catalog = {workflow: json('dist/data/workflow.json'), projects: json('dist/data/projects.json'), categories: json('dist/data/research-categories.json'), literature: json('dist/data/literature.json')};
const tools = new Map(catalog.workflow.tools.map(x => [x.id,x]));
const metrics = new Set(catalog.workflow.metrics.map(x => x.id));
const inputs = new Set(catalog.categories.dataRequirements.map(x => x.id));
const papers = new Set(catalog.literature.papers.map(x => x.id));
const routes = catalog.projects.projects;
const languages = ['zh','en','fr','es','eu'];
const context = {window:{},console};vm.createContext(context);
vm.runInContext(read('dist/v25-research-locales.js'),context);
vm.runInContext(read('dist/plan-inputs.js'),context);
const review=context.window.YV_INPUTS;
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])])) : value;
const serialize = value => JSON.stringify(canonical(value));
let checks=0;
const check=(name,fn)=>{fn();checks++;console.log('PASS '+name);};
const plan=(toolId,branchId,extra={})=>({schema:'yeastvar1011-plan-v2',inputRoute:'count_matrix',projects:[],tools:[toolId],metrics:[],stages:tools.get(toolId).steps,availableData:['count_matrix','sample_metadata'],parameters:{},toolBranches:branchId?{[toolId]:branchId}:{},inputEvidence:{},methodOptionIds:[],resultSpecificationIds:[],...extra});
const method=p=>review.methodContext(p,catalog).tools[0];
const provideEvidence=(p,toolId,branchId)=>{for(const r of review.toolContract(tools.get(toolId)).branches.find(b=>b.id===branchId).evidenceRequirements||[]){p.inputEvidence[r.inputId]??={};p.inputEvidence[r.inputId][r.field]=r.min??'recorded-study-source.tsv';}return p;};
const knownRoutes='audit_raw mean_noise noise_components noise_power noise_cycle annotation_transfer state_composition grn_rewiring velocity_feasibility trajectory_structure noise_qtl genotype_state foundation_benchmark marker_panel marker_inference_audit local_covariation_modules count_mean_qtl_comparator temporal_mechanistic_grn rna_measurement_length_audit cross_implementation_robustness'.split(' ');

check('All original full route indices, option definitions and citation indices are preserved',()=>{
 const index=Object.fromEntries(routes.map(r=>[r.id,Object.fromEntries(['toolIds','metricIds','paperIds','sourceUrls','methodOptions'].map(k=>[k,r[k]||[]]))]));
 assert.equal(crypto.createHash('sha256').update(serialize(index)).digest('hex'),'8dd3a33871246da4d0c1a563d5decc1f7247cae4406a79d851ca3a6cb08e102c');
 assert.equal(routes.length,55);assert.equal(tools.size,165);assert.equal(metrics.size,310);assert.equal(inputs.size,39);
});
check('Twenty audited base sets plus selected extensions cover the preserved full indices',()=>{
 const affected=routes.filter(r=>r.methodOptions?.length);assert.deepEqual(affected.map(r=>r.id).sort(),knownRoutes.sort());
 for(const r of affected){
  for(const [all,base,keyset] of [['toolIds','baseToolIds',tools],['metricIds','baseMetricIds',metrics]]){
   assert.ok(r[base].length,`${r.id} empty ${base}`);assert.equal(new Set(r[base]).size,r[base].length);
   assert.ok(r[base].every(id=>keyset.has(id)&&r[all].includes(id)));
   assert.deepEqual([...new Set([...r[base],...r.methodOptions.flatMap(o=>o[all]||[])])].sort(),[...r[all]].sort());
  }
  for(const id of r.basePaperIds)assert.ok(papers.has(id)&&r.paperIds.includes(id));
  for(const url of r.baseSourceUrls)assert.ok(r.sourceUrls.includes(url));
  const optionalPapers=new Set(r.methodOptions.flatMap(o=>o.paperIds||[]));
  assert.ok(r.basePaperIds.every(id=>!optionalPapers.has(id)),r.id+' selected-only citations');
  for(const o of r.methodOptions)for(const inputId of o.requiredData||[])assert.ok(inputs.has(inputId));
 }
 assert.equal(affected.reduce((n,r)=>n+r.methodOptions.length,0),29);
 assert.deepEqual(routes.find(r=>r.id==='trajectory_structure').baseToolIds,['slingshot','monocle3','condiments','tradeseq']);
 assert.ok(routes.find(r=>r.id==='mean_noise').baseToolIds.includes('basics'));
 assert.ok(routes.find(r=>r.id==='noise_qtl').baseMetricIds.includes('v25c_gene_observability'));
});
check('One editable branch source per tool, known inputs and five-language labels',()=>{
 let branchCount=0,evidenceCount=0;
 for(const id of ['basics','chooser','scpower','cellrank']){
  const t=tools.get(id);assert.ok(!(t.inputContract&&t.conditionalInputRequirements));
  const contract=review.toolContract(t);assert.equal(contract.version,1);assert.equal(contract.branchRequired,true);
  for(const branch of contract.branches){branchCount++;assert.ok(branch.id);assert.ok(['extend','replace'].includes(branch.requiredDataMode));assert.equal(branch.executionStatus,'recipe_only');
   for(const dataId of branch.requiredData)assert.ok(inputs.has(dataId));
   for(const lang of languages)assert.ok(branch.title[lang]?.trim(),id+' '+branch.id+' '+lang);
   for(const r of branch.evidenceRequirements){evidenceCount++;assert.ok(inputs.has(r.inputId));assert.ok(r.field);for(const lang of languages)assert.ok(r.label[lang]?.trim(),id+' '+r.field+' '+lang);}
  }
 }
 assert.equal(branchCount,8);assert.equal(evidenceCount,16);
});
check('BASiCS cannot replace true technical replication with biological cultures or a batch label',()=>{
 let p=plan('basics','without_spikes',{availableData:['count_matrix','sample_metadata','culture_replicates'],inputEvidence:{sample_metadata:{technical_batch_column:'BatchInfo'}}});
 assert.ok(method(p).issues.some(x=>x.field==='technical_design_source'));
 assert.ok(method(p).issues.some(x=>x.field==='technical_replicate_count'));
 p=provideEvidence(p,'basics','without_spikes');p.inputEvidence.sample_metadata.technical_replicate_count=1;
 assert.ok(method(p).issues.some(x=>x.field==='technical_replicate_count'));
 p.inputEvidence.sample_metadata.technical_replicate_count=2;
 assert.equal(method(p).status,'conditions-recorded');
 assert.equal(review.methodContext(p,catalog).executionStatus,'planning_only');
 assert.ok(!method(p).requiredData.includes('culture_replicates'));
 assert.match(tools.get('basics').applicability.reason,/不代表模型已验证或执行/);
 assert.equal(tools.get('basics').versionEvidence.biologicalExecution,false);
});
check('BASiCS spike and no-spike branches keep independent evidence requirements and exact parameter spelling',()=>{
 const p=provideEvidence(plan('basics','with_spikes'),'basics','with_spikes');assert.equal(method(p).status,'conditions-recorded');
 assert.ok(!method(p).issues.some(x=>x.field==='technical_replicate_count'));
 p.toolBranches.basics='without_spikes';assert.ok(method(p).issues.some(x=>x.field==='technical_replicate_count'));
 const b=tools.get('basics');assert.match(b.entrypoint,/Offset=apply_global_offset/);assert.ok(!b.entrypoint.includes('OffSet='));
 assert.equal(review.toolContract(b).branches[0].parameters.WithSpikes,'TRUE');assert.equal(review.toolContract(b).branches[1].parameters.WithSpikes,'FALSE');
});
check('Native chooseR omits cultures; the explicitly selected population stability option retains them',()=>{
 const p=plan('chooser','native-cell-subsampling-only');assert.deepEqual([...method(p).requiredData],['count_matrix','sample_metadata']);assert.equal(method(p).status,'conditions-recorded');
 assert.ok(!review(p,catalog).inputs.some(x=>x.key==='culture_replicates'||x.id==='culture_replicates'));
 p.projects=['noise_components'];p.methodOptionIds=['noise_components:v25_cluster_stability'];
 assert.ok(review(p,catalog).inputs.some(x=>x.key==='culture_replicates'||x.id==='culture_replicates'));
 assert.match(tools.get('chooser').output[0],/需单独实现/);
});
check('scPower mean-DE and eQTL declarations require different data and preserve strain-level power semantics',()=>{
 const p=provideEvidence(plan('scpower','mean_de',{availableData:['count_matrix','sample_metadata','culture_replicates']}),'scpower','mean_de');
 assert.equal(method(p).status,'conditions-recorded');assert.ok(!method(p).requiredData.includes('genotypes'));assert.ok(!method(p).requiredData.includes('kinship'));
 p.toolBranches.scpower='eqtl';assert.ok(method(p).requiredData.includes('genotypes'));assert.ok(method(p).requiredData.includes('kinship'));
 assert.ok(method(p).issues.some(x=>x.field==='ploidy_frequency_policy'));
 p.availableData.push('genotypes','kinship');provideEvidence(p,'scpower','eqtl');assert.equal(method(p).status,'conditions-recorded');
 const branches=review.toolContract(tools.get('scpower')).branches;assert.equal(branches[0].parameters.type,'de');assert.equal(branches[1].parameters.type,'eqtl');
 assert.match(tools.get('scpower').limitations[0],/不是噪音QTL功效/);assert.match(tools.get('scpower').limitations[0],/菌株而非细胞/);
});
check('CellRank observed-time branch does not require splicing, while velocity requires its own diagnostics',()=>{
 const p=plan('cellrank','observed_time',{availableData:['count_matrix','sample_metadata','timepoints'],directionProvenance:{mode:'observed_time',sourceRef:'sampling-record.tsv',timeColumn:'minutes',units:'minutes'}});
 assert.equal(method(p).status,'conditions-recorded');assert.ok(!method(p).requiredData.includes('splicing_layers'));
 p.toolBranches.cellrank='velocity';assert.ok(method(p).issues.some(x=>x.field==='directionMode'));assert.ok(method(p).requiredData.includes('splicing_layers'));
 p.directionProvenance={mode:'velocity',sourceRef:'layers.h5ad',quantifier:'STARsolo Velocyto',reference:'reference-hash',splicedLayer:'spliced',unsplicedLayer:'unspliced',ambiguityRules:'recorded-ambiguity-policy',diagnosticsRef:'direction-diagnostics.html'};p.availableData.push('splicing_layers');
 assert.equal(method(p).status,'conditions-recorded');assert.equal(tools.get('cellrank').executionStatus,'recipe_only');
 assert.match(tools.get('cellrank').limitations[1],/不是谱系追踪或群体进化关系/);
});
check('A pseudotime column alone is not a rooted direction; unknown branches remain unresolved',()=>{
 const p=plan('cellrank','rooted_pseudotime',{availableData:['count_matrix','pseudotime','sample_metadata','directional_evidence'],directionProvenance:{mode:'rooted_pseudotime',sourceRef:'trajectory.tsv'}});
 assert.ok(method(p).issues.some(x=>x.field==='rootCellsOrState'));assert.ok(method(p).issues.some(x=>x.field==='rootReason'));
 p.directionProvenance.rootState='validated-G1';p.directionProvenance.rootReason='independent-marker-evidence';assert.equal(method(p).status,'conditions-recorded');
 p.toolBranches.cellrank='unknown-kernel';assert.ok(method(p).issues.some(x=>x.kind==='unknown-branch'));
 delete p.toolBranches.cellrank;assert.ok(method(p).issues.some(x=>x.kind==='branch-pending'));
});
check('Every added visible text has full five-language coverage without stale chooseR task translation',()=>{
 const source=read('dist/v25-research-locales.js');const marker='// v25d: method branch declaration contracts.';assert.equal(source.split(marker).length,2);
 const c={window:{}};vm.runInNewContext(source.slice(source.indexOf(marker)),c);const block=c.window.YV_TEXT;
 assert.equal(Object.keys(block).length,7);
 for(const [zh,translations]of Object.entries(block)){assert.match(zh,/[\u3400-\u9fff]/);for(const lang of languages.slice(1)){assert.ok(translations[lang]?.trim());assert.ok(!/[\u3400-\u9fff]/.test(translations[lang]));}}
 const chooser=tools.get('chooser');for(const lang of languages.slice(1))assert.equal(context.window.YV_CONTENT.tools.chooser[lang].task,block[chooser.task][lang]);
});
console.log(JSON.stringify({status:'passed',checks,routes:routes.length,tools:tools.size,metrics:metrics.size,inputs:inputs.size,auditedBaseRoutes:20,optionAttachments:29,branchTools:4,branches:8,execution:'declaration checks only',biologicalExecution:false}));
