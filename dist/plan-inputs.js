/* Plan-level provenance checks. A selected producer never implies data exist. */
'use strict';
(() => {
const ROUTES=['raw_fastq','tagged_bam','count_matrix'];
const route=plan=>ROUTES.includes(plan.inputRoute)?plan.inputRoute:['raw_fastq','tagged_bam','count_matrix'].find(id=>(plan.availableData||[]).includes(id))||'raw_fastq';
const excludedStages=plan=>route(plan)==='count_matrix'?['fastq','tags','bam','matrix',...((plan.availableData||[]).includes('raw_droplet_matrix')?[]:['cellcalling','ambient'])]:route(plan)==='tagged_bam'?['fastq','tags']:[];
const stageDependencies=(plan,catalog,id)=>{
  const have=new Set(plan.availableData||[]),matrix=have.has('count_matrix'),bam=have.has('tagged_bam'),rawDroplets=have.has('raw_droplet_matrix');
  const deps={fastq:['design'],tags:route(plan)==='raw_fastq'?['fastq']:[],bam:bam?[]:['tags'],matrix:matrix?[]:route(plan)==='tagged_bam'?['bam']:['tags'],cellcalling:rawDroplets?[]:['matrix'],ambient:[...(matrix?[]:['cellcalling']),...(rawDroplets?[]:['matrix'])],doublets:matrix?[]:['cellcalling'],cellqc:matrix?[]:['cellcalling'],sampleqc:have.has('cell_qc_metrics')?[]:['cellqc'],integration:['sampleqc'],annotation:matrix?['cellqc']:['cellqc'],markers:have.has('cell_states')?[]:['annotation'],noise:['cellqc','sampleqc',...(have.has('cell_states')?[]:['annotation'])],networks:have.has('cell_states')?[]:['annotation'],dynamics:[...(matrix||have.has('splicing_layers')?[]:['matrix']),...(have.has('cell_states')?[]:['annotation'])],transcripts:bam?[]:['bam'],validation:matrix?[]:['cellqc'],genetics:have.has('qtl_traits')?[]:['noise'],causal:['sampleqc']};
  return [...new Set(deps[id]||[])];
};
const applyRoute=(plan,next,catalog)=>{
  plan.inputRoute=['auto',...ROUTES].includes(next)?next:'auto';
  if(next!=='auto')plan.availableData=[...new Set([...(plan.availableData||[]),next])];
  const skip=new Set(excludedStages(plan));
  plan.stages=plan.stages.filter(id=>!skip.has(id));
  plan.metrics=plan.metrics.filter(id=>!skip.has(catalog.workflow.metrics.find(m=>m.id===id)?.stepId));
  const retainedTools=catalog.workflow.tools.filter(t=>plan.tools.includes(t.id)&&t.steps.some(id=>plan.stages.includes(id))&&!(route(plan)!=='raw_fastq'&&(t.applicability?.requiredData||[]).includes('raw_fastq')&&!['dropest','scpipe'].includes(t.id)));
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
    const prior = producers.get(output);
    if (prior && !prior.conditional && conditional) return;
    producers.set(output, {tools: active.map(t => t.id), inputs, conditional});
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
  if (available.has('timepoints') && !producers.has('directional_evidence')) producers.set('directional_evidence', {tools: [], inputs: ['timepoints'], conditional: true});
  register('gene_statistics', ['markers', 'noise'], ['presto', 'edger', 'memento', 'glmmtmb', 'basics', 'distinct', 'splinedv', 'scvar', 'ktest', 'dreamlet', 'muscat', 'lemur'], ['count_matrix', 'sample_metadata'], true);
  register('qtl_traits', ['noise', 'markers'], ['memento', 'glmmtmb', 'basics', 'scvar', 'edger'], ['count_matrix', 'sample_metadata'], true);
  register('association_results', ['genetics'], ['gemma', 'limix'], ['qtl_traits', 'sample_metadata', 'genotypes', 'kinship'], true);
  register('association_results', ['genetics'], ['qtltools'], ['qtl_traits', 'sample_metadata', 'genotypes'], true);
  register('association_results', ['genetics'], ['cellregmap'], ['count_matrix', 'sample_metadata', 'genotypes', 'kinship'], true);
  register('truth_or_simulation', ['validation'], ['scdesign3'], ['count_matrix', 'sample_metadata'], true);
  const rows = new Map();
  const resolve = (key, consumer, trail = []) => {
    let row = rows.get(key);
    if (row) { if (consumer && !row.consumers.includes(consumer)) row.consumers.push(consumer); return row; }
    const req = requirements.get(key);
    row = {id: key, title: req?.title || key, consumers: consumer ? [consumer] : [], status: 'missing-production', producerTools: [], dependencies: [], unresolved: []};
    rows.set(key, row);
    if (available.has(key)) { row.status = 'declared'; return row; }
    const producer = producers.get(key);
    if (producer && !trail.includes(key)) {
      row.status = producer.conditional ? 'conditional-output' : 'planned-output';
      row.producerTools = producer.tools;
      row.dependencies = producer.inputs;
      for (const dep of producer.inputs) {
        if (dep === key || trail.includes(dep)) { row.unresolved.push(dep); continue; }
        const result = resolve(dep, key, [...trail, key]);
        if (result.status !== 'declared') row.unresolved.push(dep);
      }
    } else if (['unknown', 'external', 'external-or-metadata'].includes(req?.availability)) row.status = 'external-input';
    else if (['prepare', 'conditional', 'external-derived'].includes(req?.availability)) row.status = 'prepare-resource';
    return row;
  };
  selected.forEach(t => ((route(plan)!=='raw_fastq'&&['dropest','scpipe'].includes(t.id))?['tagged_bam','reference']:(t.applicability?.requiredData || [])).forEach(key => resolve(key, t.id)));
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
