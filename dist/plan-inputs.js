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
const review = (plan, catalog) => {
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
  selected.forEach(t => ((route(plan)!=='raw_fastq'&&['dropest','scpipe'].includes(t.id))?['tagged_bam','reference']:(t.applicability?.requiredData || [])).forEach(key => resolve(key, t.id)));
  // A retained research question keeps its input requirements even if a method is deselected.
  for(const project of catalog.projects?.projects||[]){
    if((plan.projects||[]).includes(project.id))
      (project.inputs||[]).forEach(key=>resolve(key,project.id));
  }
  // Metrics also carry input requirements: an exported matrix metric cannot be ready without its source.
  for(const m of catalog.workflow.metrics.filter(m=>(plan.metrics||[]).includes(m.id))){
    const needs=['fastq','tags'].includes(m.stepId)?['raw_fastq']:m.stepId==='bam'?['tagged_bam']:m.stepId==='matrix'?['count_matrix',...(['spliced_count','unspliced_count','ambiguous_fraction','matrix_layer_reconciliation'].includes(m.id)?['splicing_layers']:[])]:['cellqc','sampleqc','integration','annotation','markers','noise','networks'].includes(m.stepId)?['count_matrix']:[];
    [...new Set([...needs,...(m.inputIds||[])])].forEach(key=>resolve(key,m.id));
  }
  for(const result of catalog.projects?.resultSpecifications||[]){
    if((plan.resultSpecificationIds||[]).includes(result.id))
      (result.inputIds||[]).forEach(key=>resolve(key,result.id));
  }
  const categoryIds = new Set(selected.flatMap(t => t.categoryIds || []));
  const rules = catalog.categories.compatibilityRules.filter(rule => (rule.toolIds || []).some(id => plan.tools.includes(id)) || (rule.categoryIds || []).some(id => categoryIds.has(id)));
  return {inputs: [...rows.values()], rules, route:route(plan), skippedStages:excludedStages(plan)};
};
const toolContext=(plan,tool,catalog)=>{if(route(plan)==='raw_fastq'||!['dropest','scpipe'].includes(tool.id))return tool;const requiredData=['tagged_bam','reference'];return {...tool,input:requiredData.map(id=>catalog.categories.dataRequirements.find(r=>r.id===id)?.title||id),entrypoint:tool.id==='dropest'?'dropest -f -c <TAG_CONFIG.xml> -g <REFERENCE.gtf> <TAGGED.bam>':'sc_demultiplex(<TAGGED_BAM_AND_BARCODE_ANNOTATION>); sc_gene_counting(<VALIDATED_INPUTS>)',applicability:{...tool.applicability,requiredData},selectedInputRoute:'tagged_bam'};};
Object.assign(review,{route,excludedStages,stageDependencies,applyRoute,toolContext,applicableStages:(plan,catalog)=>catalog.workflow.steps.filter(s=>plan.stages.includes(s.id)).map(s=>s.id)});
window.YV_INPUTS=review;
})();
