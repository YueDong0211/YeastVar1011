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
vm.runInContext(read('dist/v25f-design-review-locales.js'),context);
vm.runInContext(read('dist/plan-inputs.js'),context);
const review=context.window.YV_INPUTS;
const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])])) : value;
const serialize = value => JSON.stringify(canonical(value));
let checks=0;
const check=(name,fn)=>{fn();checks++;console.log('PASS '+name);};
const plan=(toolId,branchId,extra={})=>({schema:'yeastvar1011-plan-v2',inputRoute:'count_matrix',projects:[],tools:[toolId],metrics:[],stages:tools.get(toolId).steps,availableData:['count_matrix','sample_metadata'],parameters:{},toolBranches:branchId?{[toolId]:branchId}:{},inputEvidence:{},methodOptionIds:[],resultSpecificationIds:[],...extra});
const method=p=>review.methodContext(p,catalog).tools[0];
const provideEvidence=(p,toolId,branchId)=>{for(const r of review.toolContract(tools.get(toolId)).branches.find(b=>b.id===branchId).evidenceRequirements||[]){p.inputEvidence[r.inputId]??={};p.inputEvidence[r.inputId][r.field]=r.min??'recorded-study-source.tsv';}return p;};
// Explicit v30 append-only allowlist; earlier identities and frozen hashes stay protected.
const v30Ids={tools:['stan','sbc','mcmcglmm','mvmorph','iqtree3','raxmlng','beast2','revbayes','ggtree','ete4','slim5','msprime','gcta'],metrics:['h2_architecture_sensitivity','dominance_variance_components','structural_dosage_effects','cis_trans_noise_contrasts','noise_neutral_divergence','evolution_tree_support','evolution_trait_model_comparison','evolution_ancestral_uncertainty','evolution_prediction_validation'],formulas:['noise_genetic_correlation']};
const knownRoutes='audit_raw mean_noise noise_components noise_power noise_cycle annotation_transfer state_composition grn_rewiring velocity_feasibility trajectory_structure noise_qtl genotype_state foundation_benchmark marker_panel marker_inference_audit local_covariation_modules count_mean_qtl_comparator temporal_mechanistic_grn rna_measurement_length_audit cross_implementation_robustness'.split(' ');

// Frozen pre-extension catalogue, protected by the original SHA-256 below.
// Compression keeps this immutable baseline within this standalone test file.
const historicalIndex=JSON.parse(require('node:zlib').gunzipSync(Buffer.from('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','base64')).toString('utf8'));
check('All original full route indices, option definitions and citation indices are preserved',()=>{
 assert.equal(crypto.createHash('sha256').update(serialize(historicalIndex)).digest('hex'),'8dd3a33871246da4d0c1a563d5decc1f7247cae4406a79d851ca3a6cb08e102c');
 const index=Object.fromEntries(routes.map(r=>{const baseline=historicalIndex[r.id];assert.ok(baseline,r.id+' unexpected route');return [r.id,Object.fromEntries(['toolIds','metricIds','paperIds','sourceUrls','methodOptions'].map(k=>[k,(r[k]||[]).filter(x=>k==='methodOptions'?baseline[k].some(o=>o.id===x.id):baseline[k].includes(x))]))];}));
 for(const r of routes){const baseline=historicalIndex[r.id],added=(r.methodOptions||[]).filter(o=>!baseline.methodOptions.some(b=>b.id===o.id));for(const o of added){
  const evolutionV29=r.id==='evolution_context'&&['bayesian_covariance','phylogenetic_signal'].includes(o.id);
  assert.equal(o.addedIn,evolutionV29?'v29':'v25f_design_review',r.id+':'+o.id);
 }for(const k of ['toolIds','metricIds','paperIds','sourceUrls'])for(const id of (r[k]||[]).filter(x=>!baseline[k].includes(x)))assert.ok(added.some(o=>(o[k]||[]).includes(id)),r.id+' unowned added '+k+':'+id);}

 // v29 changes exactly one former appendix recipe. Audit its old index first,
 // then reverse only the approved tool replacement for the original hash test.
 // Its original tools remain available elsewhere in the complete catalogue.
 const evolved=routes.find(r=>r.id==='evolution_context');
 assert.equal(evolved.updatedIn,'v29');
 assert.deepEqual(historicalIndex.evolution_context.toolIds,['limix','glmmtmb']);
 for(const id of historicalIndex.evolution_context.toolIds)assert.ok(tools.has(id),id+' retained globally');
 assert.deepEqual(evolved.toolIds,['brms','phytools2']);
 assert.deepEqual(evolved.baseToolIds,['brms']);
 assert.deepEqual(evolved.baseMetricIds,['qtl_effect_uncertainty','posterior_sampling_diagnostics']);
 assert.deepEqual(evolved.inputs,['qtl_traits','sample_metadata']);
 assert.deepEqual(evolved.methodOptions.map(o=>o.id).sort(),['bayesian_covariance','phylogenetic_signal']);
 assert.deepEqual(index.evolution_context.toolIds,[],'Only the two approved historical recipe tools were replaced');
 index.evolution_context.toolIds=[...historicalIndex.evolution_context.toolIds];

 // Version only the explicitly reviewed display strings; preserve the original full-index hash.
 const copyEdits=[{"routeId":"audit_raw","optionId":"v25_design_estimability","field":"interpretationBoundary","before":"满秩不代表无混杂；不可估计系数依赖编码顺序，不能替代具体contrast审查。菌株关联与菌株内培养重复是不同层级。","after":"结合设计矩阵秩、编码方式与目标 contrast 审查混杂和可估计性；分别建模菌株关联与菌株内培养变异。"},{"routeId":"mean_noise","optionId":"v25_design_estimability","field":"interpretationBoundary","before":"满秩不代表无混杂；不可估计系数依赖编码顺序，不能替代具体contrast审查。菌株关联与菌株内培养重复是不同层级。","after":"结合设计矩阵秩、编码方式与目标 contrast 审查混杂和可估计性；分别建模菌株关联与菌株内培养变异。"},{"routeId":"noise_qtl","optionId":"v25_design_estimability","field":"interpretationBoundary","before":"满秩不代表无混杂；不可估计系数依赖编码顺序，不能替代具体contrast审查。菌株关联与菌株内培养重复是不同层级。","after":"结合设计矩阵秩、编码方式与目标 contrast 审查混杂和可估计性；分别建模菌株关联与菌株内培养变异。"},{"routeId":"genotype_state","optionId":"v25_design_estimability","field":"interpretationBoundary","before":"满秩不代表无混杂；不可估计系数依赖编码顺序，不能替代具体contrast审查。菌株关联与菌株内培养重复是不同层级。","after":"结合设计矩阵秩、编码方式与目标 contrast 审查混杂和可估计性；分别建模菌株关联与菌株内培养变异。"},{"routeId":"noise_power","optionId":"v25_power_mean_eqtl","field":"interpretationBoundary","before":"这是均值DE/eQTL功效，不是噪音QTL功效。替换人类默认参数；原生eQTL模拟的二倍体HWE假设须适配酵母倍性与群体结构。遗传样本量按菌株而非细胞计。","after":"估计均值 DE/eQTL 功效；噪音 QTL 另设功效模型。以酵母试点替换人类默认参数，适配原生二倍体 HWE 模拟与酵母倍性、群体结构的差异，遗传样本量按菌株计。"},{"routeId":"velocity_feasibility","optionId":"v25_temporal_ot","field":"interpretationBoundary","before":"菌株编号、拟时序和系统发育次序不能替代实验时间。传输边不是谱系追踪或进化祖先；不用人类增殖或凋亡默认基因给酵母加权。","after":"使用真实采样时间建立传输模型，并以酵母证据设定增殖与死亡权重；传输边表示状态间的模型联系，谱系与祖先关系另需追踪或遗传证据。"},{"routeId":"trajectory_structure","optionId":"v25_temporal_ot","field":"interpretationBoundary","before":"菌株编号、拟时序和系统发育次序不能替代实验时间。传输边不是谱系追踪或进化祖先；不用人类增殖或凋亡默认基因给酵母加权。","after":"使用真实采样时间建立传输模型，并以酵母证据设定增殖与死亡权重；传输边表示状态间的模型联系，谱系与祖先关系另需追踪或遗传证据。"},{"routeId":"count_mean_qtl_comparator","optionId":"v25_power_mean_eqtl","field":"interpretationBoundary","before":"这是均值DE/eQTL功效，不是噪音QTL功效。替换人类默认参数；原生eQTL模拟的二倍体HWE假设须适配酵母倍性与群体结构。遗传样本量按菌株而非细胞计。","after":"估计均值 DE/eQTL 功效；噪音 QTL 另设功效模型。以酵母试点替换人类默认参数，适配原生二倍体 HWE 模拟与酵母倍性、群体结构的差异，遗传样本量按菌株计。"},{"routeId":"temporal_mechanistic_grn","optionId":"v25_temporal_ot","field":"interpretationBoundary","before":"菌株编号、拟时序和系统发育次序不能替代实验时间。传输边不是谱系追踪或进化祖先；不用人类增殖或凋亡默认基因给酵母加权。","after":"使用真实采样时间建立传输模型，并以酵母证据设定增殖与死亡权重；传输边表示状态间的模型联系，谱系与祖先关系另需追踪或遗传证据。"}];
 const historicalCopy=JSON.parse(JSON.stringify(index));
 for(const edit of copyEdits){assert.ok(['title','interpretationBoundary'].includes(edit.field));const option=historicalCopy[edit.routeId].methodOptions.find(o=>o.id===edit.optionId);assert.equal(option[edit.field],edit.after);option[edit.field]=edit.before;}
 assert.equal(crypto.createHash('sha256').update(serialize(historicalCopy)).digest('hex'),'8dd3a33871246da4d0c1a563d5decc1f7247cae4406a79d851ca3a6cb08e102c');
 assert.equal(routes.length,55);assert.equal(inputs.size,39);
 for(const [kind,originalTotal]of [['tools',167],['metrics',312],['formulas',28]]){const records=catalog.workflow[kind];assert.deepEqual(records.filter(x=>x.addedIn==='v30').map(x=>x.id).sort(),[...v30Ids[kind]].sort());assert.equal(records.filter(x=>x.addedIn!=='v30').length,originalTotal);assert.equal(records.length,originalTotal+v30Ids[kind].length);}
 assert.deepEqual(catalog.workflow.tools.filter(x=>x.addedIn==='v29').map(x=>x.id).sort(),['brms','phytools2']);
 assert.deepEqual(catalog.workflow.metrics.filter(x=>x.addedIn==='v29').map(x=>x.id).sort(),['noise_phylogenetic_signal','posterior_sampling_diagnostics']);
});
check('Twenty audited base sets plus selected extensions cover the preserved full indices',()=>{
 const affected=routes.filter(r=>r.methodOptions?.length);const legacyAffected=routes.filter(r=>historicalIndex[r.id].methodOptions.length);assert.deepEqual(legacyAffected.map(r=>r.id).sort(),knownRoutes.sort());
 for(const r of affected){
  for(const [all,base,keyset] of [['toolIds','baseToolIds',tools],['metricIds','baseMetricIds',metrics]]){
   assert.ok(r[base].length,`${r.id} empty ${base}`);assert.equal(new Set(r[base]).size,r[base].length);
   assert.ok(r[base].every(id=>keyset.has(id)&&r[all].includes(id)));
   const selected=[...new Set([...r[base],...r.methodOptions.flatMap(o=>o[all]||[])])];
   // These four historical appendix metrics remain browseable but are no longer
   // implicit defaults: they have distinct genomic/culture/count dependencies.
   const retainedContext=r.id==='evolution_context'&&all==='metricIds'?['noise_heritability','sample_confounded_design','noise_reaction_norm','noise_genetic_partition']:[];
   for(const id of retainedContext){assert.ok(historicalIndex.evolution_context.metricIds.includes(id));assert.ok(!selected.includes(id));}
   assert.deepEqual([...new Set([...selected,...retainedContext])].sort(),[...r[all]].sort());
  }
  for(const id of r.basePaperIds)assert.ok(papers.has(id)&&r.paperIds.includes(id));
  for(const url of r.baseSourceUrls)assert.ok(r.sourceUrls.includes(url));
  const optionalPapers=new Set(r.methodOptions.flatMap(o=>o.paperIds||[]));
  assert.ok(r.basePaperIds.every(id=>!optionalPapers.has(id)),r.id+' selected-only citations');
  for(const o of r.methodOptions)for(const inputId of o.requiredData||[])assert.ok(inputs.has(inputId));
 }
 assert.equal(Object.values(historicalIndex).reduce((n,r)=>n+r.methodOptions.length,0),29);
 assert.equal(affected.reduce((n,r)=>n+r.methodOptions.length,0),85);
 assert.equal(affected.length,25);
 assert.deepEqual(routes.filter(r=>(r.methodOptions||[]).some(o=>o.addedIn==='v29')).map(r=>r.id),['evolution_context']);
 assert.equal(affected.flatMap(r=>r.methodOptions).filter(o=>o.addedIn==='v29').length,2);
 assert.deepEqual(routes.find(r=>r.id==='trajectory_structure').baseToolIds,['slingshot','monocle3','condiments','tradeseq']);
 assert.ok(routes.find(r=>r.id==='mean_noise').baseToolIds.includes('basics'));
 assert.ok(routes.find(r=>r.id==='noise_qtl').baseMetricIds.includes('v25c_gene_observability'));
});

check('New public-method audit cards preserve five-language purpose, fields and optional ownership',()=>{
 const rows=routes.flatMap(r=>(r.methodOptions||[]).filter(o=>o.addedIn==='v25f_design_review').map(o=>({route:r,option:o})));
 assert.equal(rows.length,54);assert.equal(new Set(rows.map(x=>x.option.id)).size,20);assert.equal(new Set(rows.map(x=>x.route.id)).size,16);
 for(const {route:r,option:o} of rows){assert.ok(o.designReview);assert.ok(o.sourceUrls.length);for(const id of o.requiredData)assert.ok(inputs.has(id));for(const id of o.optionalData)assert.ok(inputs.has(id));for(const id of o.toolIds)assert.ok(tools.has(id));for(const id of o.metricIds)assert.ok(metrics.has(id));for(const key of ['title','purpose','interpretationBoundary'])for(const lang of languages)assert.ok(o.designReview[key]?.[lang]?.trim(),o.id+' '+key+' '+lang);for(const field of o.designReview.fields)for(const lang of languages)assert.ok((field.meaning||field.description)?.[lang]?.trim(),o.id+' field '+lang);for(const url of o.sourceUrls)assert.ok(url.startsWith('https://'));for(const lang of languages.slice(1))assert.ok(context.window.YV_TEXT[o.title]?.[lang]);assert.equal(o.executionStatus,'proposed_export_contract_not_executed');}
 const serial=JSON.stringify(rows);for(const token of ['private-thesis','WEBER','Mathieu','2026-MW','SACE_'])assert.ok(!serial.includes(token));
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
 assert.match(tools.get('scpower').limitations[0],/均值 DE\/eQTL 功效/);assert.match(tools.get('scpower').limitations[0],/噪音 QTL 另设功效模型/);assert.match(tools.get('scpower').limitations[0],/遗传样本量按菌株计/);
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
 const c={window:{}};const boundary=source.indexOf('// Scientific method copy:',source.indexOf(marker));assert.ok(boundary>source.indexOf(marker));vm.runInNewContext(source.slice(source.indexOf(marker),boundary),c);const block=c.window.YV_TEXT;
 assert.equal(Object.keys(block).length,7);
 for(const [zh,translations]of Object.entries(block)){assert.match(zh,/[\u3400-\u9fff]/);for(const lang of languages.slice(1)){assert.ok(translations[lang]?.trim());assert.ok(!/[\u3400-\u9fff]/.test(translations[lang]));}}
 const chooser=tools.get('chooser');for(const lang of languages.slice(1))assert.equal(context.window.YV_CONTENT.tools.chooser[lang].task,block[chooser.task][lang]);
});
console.log(JSON.stringify({status:'passed',checks,routes:routes.length,tools:tools.size,metrics:metrics.size,inputs:inputs.size,auditedHistoricalBaseRoutes:20,currentOptionRoutes:25,historicalOptionAttachments:29,optionAttachments:85,newDesignReviewAttachments:54,evolutionV29Attachments:2,historicalBranchTools:4,historicalBranches:8,execution:'declaration checks only',biologicalExecution:false}));
