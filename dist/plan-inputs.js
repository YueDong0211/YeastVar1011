/* Plan-level provenance checks. A selected producer never implies data exist. */
'use strict';
(() => {
const ROUTES=['raw_fastq','tagged_bam','count_matrix'];
const route=plan=>ROUTES.includes(plan.inputRoute)?plan.inputRoute:['raw_fastq','tagged_bam','count_matrix'].find(id=>(plan.availableData||[]).includes(id))||'raw_fastq';
// Matrix-only background methods (for example DecontX) remain usable without
// empty droplets. Their optional background is not a stage-wide prerequisite.
const excludedStages=plan=>route(plan)==='count_matrix'?['fastq','tags','bam','matrix',...((plan.availableData||[]).includes('raw_droplet_matrix')?[]:['cellcalling'])]:route(plan)==='tagged_bam'?['fastq','tags']:[];
const stageDependencies=(plan,catalog,id)=>{
  const have=new Set(plan.availableData||[]),matrix=have.has('count_matrix'),bam=have.has('tagged_bam'),rawDroplets=have.has('raw_droplet_matrix');
  const deps={fastq:['design'],tags:route(plan)==='raw_fastq'?['fastq']:[],bam:bam?[]:['tags'],matrix:matrix?[]:route(plan)==='tagged_bam'?['bam']:['tags'],cellcalling:rawDroplets?[]:['matrix'],ambient:matrix?[]:['cellcalling',...(rawDroplets?[]:['matrix'])],doublets:matrix?[]:['cellcalling'],cellqc:matrix?[]:['cellcalling'],sampleqc:have.has('cell_qc_metrics')?[]:['cellqc'],integration:['sampleqc'],annotation:matrix?['cellqc']:['cellqc'],markers:have.has('cell_states')?[]:['annotation'],noise:['cellqc','sampleqc',...(have.has('cell_states')?[]:['annotation'])],networks:have.has('cell_states')?[]:['annotation'],dynamics:[...(matrix||have.has('splicing_layers')?[]:['matrix']),...(have.has('cell_states')?[]:['annotation'])],transcripts:bam?[]:['bam'],validation:matrix?[]:['cellqc'],genetics:have.has('qtl_traits')?[]:['noise'],causal:['sampleqc']};
  return [...new Set(deps[id]||[])];
};
const applyRoute=(plan,next,catalog)=>{
  plan.inputRoute=['auto',...ROUTES].includes(next)?next:'auto';
  if(next!=='auto')plan.availableData=[...new Set([...(plan.availableData||[]),next])];
  const skip=new Set(excludedStages(plan));
  plan.stages=plan.stages.filter(id=>!skip.has(id));
  plan.metrics=plan.metrics.filter(id=>!skip.has(catalog.workflow.metrics.find(m=>m.id===id)?.stepId));
  const retainedTools=catalog.workflow.tools.filter(t=>plan.tools.includes(t.id)&&t.steps.some(id=>plan.stages.includes(id))&&!(route(plan)!=='raw_fastq'&&(t.applicability?.requiredData||[]).includes('raw_fastq')&&!['dropest','scpipe'].includes(t.id))&&!(route(plan)==='count_matrix'&&!(plan.availableData||[]).includes('raw_droplet_matrix')&&t.steps.includes('ambient')&&(t.applicability?.requiredData||[]).includes('raw_droplet_matrix')));
  plan.tools=retainedTools.map(t=>t.id);
  plan.edges=(plan.edges||[]).filter(e=>plan.stages.includes(e.from)&&plan.stages.includes(e.to));
  return plan;
};
// One contract resolver for the workbench, tool cards and exports. Recorded fields
// describe a plan; they do not validate source files or execute an analysis.
const list=x=>Array.isArray(x)?x:[],own=(o,k)=>Object.hasOwn(o||{},k);
const optionKey=(routeId,id)=>routeId+':'+id;
const toolContract=tool=>tool?.inputContract||{version:1,branchRequired:!!tool?.conditionalInputRequirements?.length,branches:list(tool?.conditionalInputRequirements).map(b=>({...b,id:b.id||b.branch,requiredDataMode:b.requiredDataMode||'extend'}))};
const optionRows=(plan,catalog)=>[...new Set([...list(plan.methodOptionIds),...list(plan.analysisSelections).flatMap(r=>list(r.methodOptionIds))])].map(key=>{for(const route of catalog.projects?.projects||[]){const option=list(route.methodOptions).find(o=>optionKey(route.id,o.id)===key);if(option)return {key,routeId:route.id,active:list(plan.projects).includes(route.id)||list(plan.analysisSelections).some(r=>list(r.methodOptionIds).includes(key)),option};}return {key,active:false,unresolved:true};});
const evidenceValue=(plan,requirement)=>plan.inputEvidence?.[requirement.inputId]?.[requirement.field];
const supplied=v=>typeof v==='string'&&!!v.trim();
const suppliedCells=v=>supplied(v)||Array.isArray(v)&&v.length>0&&v.every(supplied);
const requirementMet=(plan,r)=>{const v=evidenceValue(plan,r);const numeric=(typeof v==='number'||supplied(v))&&Number.isFinite(Number(v));const present=r.min===undefined?supplied(v):numeric&&Number(v)>=r.min&&(!r.field.endsWith('_count')||Number.isInteger(Number(v)));return present&&(!r.values||r.values.includes(v));};
const directionFields={rooted_pseudotime:['sourceRef','rootReason'],observed_time:['sourceRef','timeColumn','units'],velocity:['sourceRef','quantifier','reference','splicedLayer','unsplicedLayer','ambiguityRules','diagnosticsRef']};
function directionReview(plan,mode){const d=plan.directionProvenance||{},issues=[];if(!mode||!directionFields[mode])return {mode:mode||null,issues:['directionMode'],status:'direction-pending'};if(d.mode!==mode)issues.push('directionMode');for(const key of directionFields[mode])if(!supplied(d[key]))issues.push(key);if(mode==='rooted_pseudotime'&&!suppliedCells(d.rootCells)&&!supplied(d.rootState))issues.push('rootCellsOrState');return {mode,issues,status:issues.length?'evidence-pending':'conditions-recorded',provenance:d};}
const metricInputs=m=>[...new Set([...(['fastq','tags'].includes(m.stepId)?['raw_fastq']:m.stepId==='bam'?['tagged_bam']:m.stepId==='matrix'?['count_matrix',...(['spliced_count','unspliced_count','ambiguous_fraction','matrix_layer_reconciliation'].includes(m.id)?['splicing_layers']:[])]:['cellqc','sampleqc','integration','annotation','markers','noise','networks'].includes(m.stepId)?['count_matrix']:[]),...list(m.inputIds)])];
function analysisContext(plan,catalog){
 const selections=[],available=new Set(list(plan.availableData)),knownInputs=new Set(catalog.categories.dataRequirements.map(x=>x.id));
 const allOptions=optionRows(plan,catalog),requests=new Map();
 for(const r of list(plan.analysisSelections))for(const [id,b]of Object.entries(r.toolBranches||{})){if(!requests.has(id))requests.set(id,new Set());requests.get(id).add(b);}
 for(const recipe of list(plan.analysisSelections)){
  const issues=[],requiredData=new Set(list(recipe.requiredData)),toolIds=new Set(list(recipe.toolIds)),metricIds=new Set(list(recipe.metricIds));
  const issue=(kind,extra={})=>issues.push({kind,analysisId:recipe.id,...extra});
  for(const id of list(recipe.contextProjectIds))if(!catalog.projects.projects.some(r=>r.id===id))issue('analysis-route-unknown',{routeId:id});
  for(const id of list(recipe.projectIds)){const r=catalog.projects.projects.find(x=>x.id===id);if(!r){issue('analysis-route-unknown',{routeId:id});continue;}(r.baseToolIds||r.toolIds||[]).forEach(x=>toolIds.add(x));(r.baseMetricIds||r.metricIds||[]).forEach(x=>metricIds.add(x));list(r.inputs).forEach(x=>requiredData.add(x));}
  for(const key of list(recipe.methodOptionIds)){const row=allOptions.find(x=>x.key===key);if(!row||row.unresolved){issue('analysis-option-unknown',{optionId:key});continue;}list(row.option.toolIds).forEach(x=>toolIds.add(x));list(row.option.metricIds).forEach(x=>metricIds.add(x));list(row.option.requiredData).forEach(x=>requiredData.add(x));}
  const missingToolIds=[...toolIds].filter(id=>!list(plan.tools).includes(id)),missingMetricIds=[...metricIds].filter(id=>!list(plan.metrics).includes(id));
  missingToolIds.forEach(toolId=>issue('analysis-tool-missing',{toolId}));missingMetricIds.forEach(metricId=>issue('analysis-metric-missing',{metricId}));
  for(const id of toolIds){const tool=catalog.workflow.tools.find(x=>x.id===id);if(!tool){if(!missingToolIds.includes(id))issue('analysis-tool-missing',{toolId:id});continue;}const contract=toolContract(tool),branch=list(contract.branches).find(b=>b.id===plan.toolBranches?.[id]);
   const needed=branch?.requiredDataMode==='replace'?list(branch.requiredData):[...list(tool.applicability?.requiredData),...list(branch?.requiredData)];needed.forEach(x=>requiredData.add(x));
   const requested=recipe.toolBranches?.[id];if(requested&&(requests.get(id)?.size>1||requested!==plan.toolBranches?.[id]))issue('analysis-branch-conflict',{toolId:id,requested,selected:plan.toolBranches?.[id]||null});
   if(contract.branchRequired&&!branch)issue('analysis-branch-pending',{toolId:id});
   for(const r of list(branch?.evidenceRequirements))if(!requirementMet(plan,r))issue('analysis-evidence-pending',{toolId:id,inputId:r.inputId,field:r.field,label:r.label});
   for(const [key,value]of Object.entries(branch?.parameters||{}))if(own(plan.parameters?.[id],key)&&String(plan.parameters[id][key])!==String(value))issue('analysis-parameter-conflict',{toolId:id,field:key});
   if(needed.includes('directional_evidence')||branch?.directionMode){const d=directionReview(plan,branch?.directionMode||plan.directionProvenance?.mode);for(const field of d.issues)issue('analysis-direction-pending',{toolId:id,field});for(const input of ({rooted_pseudotime:['pseudotime','sample_metadata'],observed_time:['timepoints','sample_metadata'],velocity:['splicing_layers']}[d.mode]||[]))requiredData.add(input);}
  }
  for(const id of metricIds){const m=catalog.workflow.metrics.find(x=>x.id===id);if(m)metricInputs(m).forEach(x=>requiredData.add(x));}
  for(const id of requiredData)if(!knownInputs.has(id))issue('analysis-input-unknown',{inputId:id});
  const additionalRequirements=list(recipe.additionalRequirements).map(r=>{const value=plan.analysisInputEvidence?.[recipe.id]?.[r.id],sourceRef=supplied(value)?value.trim():'';return {...r,sourceRef,status:sourceRef?'conditions-recorded':'evidence-pending'};});for(const r of additionalRequirements)if(r.status==='evidence-pending')issue('analysis-external-input-pending',{inputId:r.id,label:r.label,sourceUrl:r.sourceUrl});
  const missingData=[...requiredData].filter(id=>!available.has(id)),overrides={excludedToolIds:[...toolIds].filter(id=>list(plan.excludedToolIds).includes(id)),excludedMetricIds:[...metricIds].filter(id=>list(plan.excludedMetricIds).includes(id)),branches:Object.entries(recipe.toolBranches||{}).filter(([id,b])=>plan.toolBranches?.[id]!==b).map(([toolId,requested])=>({toolId,requested,selected:plan.toolBranches?.[toolId]||null}))};
  const decision=issues.some(x=>['analysis-branch-conflict','analysis-branch-pending','analysis-evidence-pending','analysis-direction-pending','analysis-parameter-conflict'].includes(x.kind));
  selections.push({id:recipe.id,recipe,toolIds:[...toolIds],metricIds:[...metricIds],requiredData:[...requiredData],missingData,missingToolIds,missingMetricIds,issues,overrides,additionalRequirements,status:decision?'decision-pending':missingToolIds.length||missingMetricIds.length?'dependency-pending':issues.length||missingData.length?'input-pending':'conditions-recorded'});
 }
 return {version:1,selections,requiredData:[...new Set(selections.flatMap(x=>x.requiredData))],issues:selections.flatMap(x=>x.issues),executionStatus:'planning_only'};
}
function methodContext(plan,catalog){
 const available=new Set(list(plan.availableData)),options=optionRows(plan,catalog),issues=[],tools=[];
 for(const row of options){if(row.unresolved)issues.push({kind:'unknown-option',optionId:row.key});else if(row.active)for(const id of row.option.toolIds||[])if(!list(plan.tools).includes(id))issues.push({kind:'option-tool-missing',optionId:row.key,toolId:id});}
 for(const toolId of plan.tools||[]){const tool=catalog.workflow.tools.find(t=>t.id===toolId);if(!tool)continue;const contract=toolContract(tool),branchId=plan.toolBranches?.[toolId],branch=list(contract.branches).find(b=>b.id===branchId),local=[];
  if(branchId&&!branch)local.push({kind:'unknown-branch',toolId,branchId});else if(contract.branchRequired&&!branch)local.push({kind:'branch-pending',toolId});
  let requiredData=route(plan)!=='raw_fastq'&&['dropest','scpipe'].includes(toolId)?['tagged_bam','reference']:list(tool.applicability?.requiredData);
  if(branch)requiredData=branch.requiredDataMode==='replace'?list(branch.requiredData):[...new Set([...requiredData,...list(branch.requiredData)])];
  for(const r of list(branch?.evidenceRequirements))if(!requirementMet(plan,r))local.push({kind:'evidence-pending',toolId,branchId,inputId:r.inputId,field:r.field,label:r.label,min:r.min});
  for(const [key,value]of Object.entries(branch?.parameters||{}))if(own(plan.parameters?.[toolId],key)&&String(plan.parameters[toolId][key])!==String(value))local.push({kind:'parameter-conflict',toolId,branchId,field:key});
  let direction=null;if(requiredData.includes('directional_evidence')||branch?.directionMode){direction=directionReview(plan,branch?.directionMode||plan.directionProvenance?.mode);for(const field of direction.issues)local.push({kind:'direction-pending',toolId,branchId,field});const deps={rooted_pseudotime:['pseudotime','sample_metadata'],observed_time:['timepoints','sample_metadata'],velocity:['splicing_layers']}[direction.mode]||[];requiredData=[...new Set([...requiredData,...deps])];}
  const unmet=requiredData.filter(id=>!available.has(id));tools.push({toolId,branchId:branchId||null,branch:branch||null,requiredData,unmet,issues:local,direction,status:local.length?'decision-pending':unmet.length?'input-pending':'conditions-recorded'});issues.push(...local);
 }
 for(const [toolId,branchId]of Object.entries(plan.toolBranches||{}))if(!catalog.workflow.tools.some(t=>t.id===toolId))issues.push({kind:'unknown-tool-branch',toolId,branchId});
 const analyses=analysisContext(plan,catalog);issues.push(...analyses.issues);
 for(const t of tools){const extra=analyses.issues.filter(x=>x.toolId===t.toolId);if(extra.length){t.issues.push(...extra);t.status='decision-pending';}}
 return {version:1,options,tools,issues,analyses,executionStatus:'planning_only'};
}
const review = (plan, catalog) => {
  const methods=methodContext(plan,catalog);
  const requirements = new Map(catalog.categories.dataRequirements.map(x => [x.id, x]));
  const selected = catalog.workflow.tools.filter(x => plan.tools.includes(x.id));
  const available = new Set(plan.availableData);
  const producers = new Map();
  const register = (output, stages, toolIds, inputs, conditional = false) => {
    const active = selected.filter(t => toolIds.includes(t.id) && stages.some(s => plan.stages.includes(s) && t.steps.includes(s)));
    if (!active.length) return;
    const alternatives = producers.get(output) || [];
    alternatives.push({tools: active.map(t => t.id).sort(), inputs: [...inputs], conditional});
    producers.set(output, alternatives);
  };
  register('tagged_bam', ['bam'], ['starsolo', 'cellranger', ...(route(plan)==='raw_fastq'?['scpipe']:[])], ['raw_fastq', 'library_structure', 'reference']);
  register('count_matrix', ['matrix'], ['starsolo', 'cellranger', 'kb', ...(route(plan)!=='raw_fastq'?[]:['dropest','scpipe'])], ['raw_fastq', 'library_structure', 'reference']);
  if(route(plan)!=='raw_fastq') register('count_matrix', ['matrix'], ['dropest','scpipe'], ['tagged_bam','reference'], true);
  register('count_matrix', ['matrix'], ['alevinfry'], ['mapping_rad', 'reference']);
  register('raw_droplet_matrix', ['matrix'], ['starsolo', 'cellranger', 'kb', ...(route(plan)!=='raw_fastq'?[]:['dropest'])], ['raw_fastq', 'library_structure', 'reference'], true);
  if(route(plan)!=='raw_fastq') register('raw_droplet_matrix', ['matrix'], ['dropest'], ['tagged_bam','reference'], true);
  register('raw_droplet_matrix', ['matrix'], ['alevinfry'], ['mapping_rad', 'reference'], true);
  register('splicing_layers', ['matrix'], ['starsolo', 'kb'], ['raw_fastq', 'library_structure', 'reference'], true);
  register('splicing_layers', ['matrix'], ['alevinfry'], ['mapping_rad', 'reference'], true);
  register('splicing_layers', ['matrix', 'dynamics'], ['velocyto'], ['tagged_bam', 'reference'], true);
  register('qc_reports', ['bam'], ['samtools', 'rseqc', 'rnaseqc', 'picard'], ['tagged_bam', 'reference']);
  register('qc_reports', ['fastq'], ['fastqc', 'fastp', 'seqkit', 'fastqscreen'], ['raw_fastq']);
  register('cell_qc_metrics', ['cellqc'], ['scanpy', 'seurat', 'scuttle', 'scater'], ['count_matrix', 'sample_metadata']);
  register('variant_counts', ['doublets', 'tags', 'genetics'], ['cellsnp', 'souporcell'], ['tagged_bam', 'reference', 'sample_metadata'], true);
  register('cell_states', ['annotation'], ['scanpy', 'seurat', 'singler', 'celltypist', 'ucell', 'aucell', 'tricycle'], ['count_matrix', 'sample_metadata'], true);
  register('pseudotime', ['dynamics'], ['slingshot', 'monocle3'], ['count_matrix', 'sample_metadata'], true);
  register('directional_evidence', ['dynamics'], ['slingshot', 'monocle3'], ['pseudotime'], true);
  register('directional_evidence', ['dynamics'], ['scvelo', 'velovi', 'velocycle'], ['splicing_layers'], true);
  if (available.has('timepoints')) {
    const alternatives = producers.get('directional_evidence') || [];
    alternatives.push({tools: [], inputs: ['timepoints'], conditional: true});
    producers.set('directional_evidence', alternatives);
  }
  register('gene_statistics', ['markers', 'noise'], ['presto', 'edger', 'memento', 'glmmtmb', 'basics', 'distinct', 'splinedv', 'scvar', 'ktest', 'dreamlet', 'muscat', 'lemur'], ['count_matrix', 'sample_metadata'], true);
  register('qtl_traits', ['noise', 'markers'], ['memento', 'glmmtmb', 'basics', 'scvar', 'edger'], ['count_matrix', 'sample_metadata'], true);
  register('association_results', ['genetics'], ['gemma', 'limix'], ['qtl_traits', 'sample_metadata', 'genotypes', 'kinship'], true);
  register('association_results', ['genetics'], ['qtltools'], ['qtl_traits', 'sample_metadata', 'genotypes'], true);
  register('association_results', ['genetics'], ['cellregmap'], ['count_matrix', 'sample_metadata', 'genotypes', 'kinship'], true);
  register('truth_or_simulation', ['validation'], ['scdesign3'], ['count_matrix', 'sample_metadata'], true);
  const absentStatus = key => {
    const availability = requirements.get(key)?.availability;
    return ['unknown', 'external', 'external-or-metadata'].includes(availability) ? 'external-input'
      : ['prepare', 'conditional', 'external-derived'].includes(availability) ? 'prepare-resource' : 'missing-production';
  };
  // Compare OR branches without adding their dependencies to the required-input
  // table. Only the chosen branch becomes a requirement of the downstream step.
  const assess = (key, trail = []) => {
    if (available.has(key)) return {status: 'declared', blockedBy: [], depth: 0, alternatives: []};
    if (trail.includes(key)) return {status: 'missing-production', blockedBy: [key], depth: 0, alternatives: []};
    const alternatives = (producers.get(key) || []).map(producer => {
      const results = producer.inputs.map(dep => assess(dep, [...trail, key]));
      const blockedBy = [...new Set(results.flatMap(result => result.blockedBy))];
      const unresolved = producer.inputs.filter((dep, i) => results[i].status !== 'declared');
      return {producerTools: producer.tools, inputs: producer.inputs, dependencies: producer.inputs,
        conditional: producer.conditional, status: producer.conditional ? 'conditional-output' : 'planned-output',
        readiness: blockedBy.length ? 'awaiting-inputs' : producer.conditional ? 'conditional' : 'planned',
        unresolved, blockedBy, depth: 1 + Math.max(0, ...results.map(result => result.depth))};
    });
    alternatives.sort((a, b) => a.blockedBy.length - b.blockedBy.length
      || a.unresolved.length - b.unresolved.length || a.depth - b.depth
      || Number(a.conditional) - Number(b.conditional)
      || a.producerTools.join(',').localeCompare(b.producerTools.join(','))
      || a.inputs.join(',').localeCompare(b.inputs.join(',')));
    const best = alternatives[0];
    return best ? {...best, alternatives} : {status: absentStatus(key), blockedBy: [key], depth: 0, alternatives: []};
  };
  const rows = new Map();
  const resolve = (key, consumer, trail = []) => {
    let row = rows.get(key);
    if (row) { if (consumer && !row.consumers.includes(consumer)) row.consumers.push(consumer); return row; }
    const req = requirements.get(key);
    row = {id: key, title: req?.title || key, consumers: consumer ? [consumer] : [], status: 'missing-production', producerTools: [], dependencies: [], unresolved: [], producerAlternatives: []};
    rows.set(key, row);
    if (available.has(key)) { row.status = 'declared'; return row; }
    const production = assess(key, trail);
    if (production.alternatives.length && !trail.includes(key)) {
      row.status = production.status;
      row.producerTools = production.producerTools;
      row.dependencies = production.dependencies;
      row.blockedBy = production.blockedBy;
      row.readiness = production.readiness;
      row.producerAlternatives = production.alternatives;
      for (const dep of production.dependencies) {
        if (dep === key || trail.includes(dep)) { row.unresolved.push(dep); continue; }
        const result = resolve(dep, key, [...trail, key]);
        if (result.status !== 'declared') row.unresolved.push(dep);
      }
    } else row.status = absentStatus(key);
    return row;
  };
  methods.tools.forEach(t=>t.requiredData.forEach(key=>resolve(key,t.toolId+(t.branchId?':'+t.branchId:''))));
  methods.options.filter(r=>r.active&&!r.unresolved).forEach(r=>list(r.option.requiredData).forEach(key=>resolve(key,r.key)));
  methods.analyses.selections.forEach(r=>r.requiredData.forEach(key=>resolve(key,'analysis:'+r.id)));
  for(const issue of methods.issues)if(issue.inputId)resolve(issue.inputId,issue.toolId+':'+(issue.branchId||''));
  // A retained research question keeps its input requirements even if a method is deselected.
  for(const project of catalog.projects?.projects||[]){
    if((plan.projects||[]).includes(project.id))
      (project.inputs||[]).forEach(key=>resolve(key,project.id));
  }
  // Metrics also carry input requirements: an exported matrix metric cannot be ready without its source.
  for(const m of catalog.workflow.metrics.filter(m=>(plan.metrics||[]).includes(m.id))){
    metricInputs(m).forEach(key=>resolve(key,m.id));
  }
  for(const result of catalog.projects?.resultSpecifications||[]){
    if((plan.resultSpecificationIds||[]).includes(result.id))
      (result.inputIds||[]).forEach(key=>resolve(key,result.id));
  }
  const categoryIds = new Set(selected.flatMap(t => t.categoryIds || []));
  const rules = catalog.categories.compatibilityRules.filter(rule => (rule.toolIds || []).some(id => plan.tools.includes(id)) || (rule.categoryIds || []).some(id => categoryIds.has(id))).map(rule=>{
    // Tool-specific catalogue gates describe all branches. A chosen replacement
    // branch and explicit option inputs define this plan's actual requirement set.
    const contexts=methods.tools.filter(t=>list(rule.toolIds).includes(t.toolId));
    if(rule.categoryIds?.length||!contexts.length||!contexts.every(t=>t.branch?.requiredDataMode==='replace'))return rule;
    const effective=new Set([...contexts.flatMap(t=>t.requiredData),...methods.options.filter(r=>r.active&&!r.unresolved&&list(r.option.toolIds).some(id=>list(rule.toolIds).includes(id))).flatMap(r=>list(r.option.requiredData))]);
    return {...rule,catalogueRequiredData:rule.requiredData,requiredData:list(rule.requiredData).filter(id=>effective.has(id)),selectedBranches:contexts.map(t=>({toolId:t.toolId,branchId:t.branchId}))};
  });
  return {inputs: [...rows.values()], rules, route:route(plan), skippedStages:excludedStages(plan),methodDecisions:methods,contractIssues:methods.issues,analysisSelections:methods.analyses};
};
const toolContext=(plan,tool,catalog)=>{const ctx=methodContext(plan,catalog).tools.find(t=>t.toolId===tool.id);let result=tool;if(route(plan)!=='raw_fastq'&&['dropest','scpipe'].includes(tool.id)){const requiredData=['tagged_bam','reference'];result={...tool,input:requiredData.map(id=>catalog.categories.dataRequirements.find(r=>r.id===id)?.title||id),entrypoint:tool.id==='dropest'?'dropest -f -c <TAG_CONFIG.xml> -g <REFERENCE.gtf> <TAGGED.bam>':'sc_demultiplex(<TAGGED_BAM_AND_BARCODE_ANNOTATION>); sc_gene_counting(<VALIDATED_INPUTS>)',selectedInputRoute:'tagged_bam'};}const branchURLs=new Set(list(toolContract(tool).branches).flatMap(b=>list(b.sourceUrls))),selectedURLs=[...new Set([...list(result.sourceUrls).filter(url=>!branchURLs.has(url)),...list(ctx?.branch?.sourceUrls)])];return ctx?{...result,sourceUrls:selectedURLs,...(ctx.branch?{input:ctx.requiredData}:{}),applicability:{...result.applicability,requiredData:ctx.requiredData,optionalData:list(result.applicability?.optionalData).filter(id=>!ctx.requiredData.includes(id)&&(!ctx.branch||!list(toolContract(tool).branches).some(b=>list(b.requiredData).includes(id))))},selectedBranch:ctx.branchId,contractReview:ctx,resolvedParameters:{...plan.parameters?.[tool.id],...ctx.branch?.parameters}}:result;};
Object.assign(review,{methodContext,analysisContext,metricInputs,toolContract,optionRows,optionKey,directionReview,directionFields,route,excludedStages,stageDependencies,applyRoute,toolContext,applicableStages:(plan,catalog)=>catalog.workflow.steps.filter(s=>plan.stages.includes(s.id)).map(s=>s.id)});
window.YV_INPUTS=review;
})();
