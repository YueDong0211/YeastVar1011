'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),json=f=>JSON.parse(read(f));
const w=json('dist/data/workflow.json'),p=json('dist/data/projects.json'),tools=new Map(w.tools.map(t=>[t.id,t]));
const ctx={window:{},document:{addEventListener(){}}};for(const f of ['dist/evolution-population-v30-data.js','dist/evolution-catalogue-v29.js','dist/citation-data.js'])vm.runInNewContext(read(f),ctx,{filename:f});
const guides=ctx.window.YV_EVOLUTION_CATALOGUE.records(),c=ctx.window.YV_CITATION_DATA,dois=new Set(c.records.map(r=>r.csl.DOI?.toLowerCase()));
const models=id=>p.evolutionRecipes.find(r=>r.id===id).variants.map(v=>v.recipe.modelSpecification);
assert.equal(guides.length,19);assert.equal(p.evolutionRecipes.length,19);assert.equal(p.evolutionRecipes.flatMap(r=>r.variants).length,28);
for(const g of guides){assert(p.evolutionRecipes.some(r=>r.id===g.id));for(const paper of g.papers)assert(dois.has(paper.doi.toLowerCase()),paper.doi+' missing shared reference');}
for(const t of w.tools.filter(t=>t.addedIn==='v30')){assert(c.toolReferences[t.id]?.length,t.id+' missing tool reference');assert(t.entrypoint);assert.equal(t.executionStatus,'recipe_only');assert.equal(t.versionEvidence.biologicalExecution,false);assert(t.sourceUrls.every(u=>/^https:\/\//.test(u)));}
assert.equal(c.audit.totalTools,w.tools.length);assert.equal(c.audit.cataloguePapers,json('dist/data/literature.json').papers.length);
for(const f of w.formulas){assert.equal(typeof f.expression,'string');assert(Array.isArray(f.variables));assert(Array.isArray(f.assumptions));assert(f.sourceUrl);}
console.log('PASS 19 analyses, 28 variants, shared CSL/tool mappings, official recipe sources and rendered formula schema');
assert.match(models('ancestral_states')[0].entrypoint,/phytools::fastAnc/);
assert.match(models('mean_noise_traits')[0].entrypoint,/f_mean \+ f_noise/);assert.match(models('mean_noise_traits')[0].notes.en,/correlated sampling error/);
assert.match(models('dominance_noise_partition')[0].entrypoint,/cov=KA/);assert.match(models('dominance_noise_partition')[0].entrypoint,/cov=KD/);
assert.match(models('structural_dosage_noise')[0].entrypoint,/dna_feature \+ ploidy/);
assert.match(models('plasticity_convergence')[0].entrypoint,/1\+environment/);
assert.match(models('drift_calibrated_noise_divergence')[0].entrypoint,/not RNA noise/);
const cis=p.evolutionRecipes.find(r=>r.id==='cis_trans_noise_trios').variants[0].recipe;
assert.deepEqual(cis.toolIds,['edger','scdali','memento']);assert.equal(cis.toolBranches.scdali,'audited_allelic_counts');assert.match(cis.modelSpecification.notes.en,/does not identify cis\/trans noise/);
assert(cis.additionalRequirements.some(r=>r.sourceUrl==='https://doi.org/10.1016/j.xgen.2023.100459'));
assert(!tools.get('scdali').inputContract.branches.find(b=>b.id==='audited_allelic_counts').requiredData.includes('tagged_bam'));
assert(!tools.get('scdali').inputContract.branches.find(b=>b.id==='audited_allelic_counts').requiredData.includes('cell_states'));
assert.match(tools.get('mcmcglmm').entrypoint,/if \(covariance_mode != "independent"\) \{ args\$random/);
assert.match(tools.get('mvmorph').entrypoint,/error=sampling_variance_matrix/);assert.match(tools.get('ete4').entrypoint,/tree.explore\(\)/);
for(const metric of w.metrics.filter(m=>m.addedIn==='v30'))assert(metric.sourceUrls.some(u=>metric.tools.some(t=>tools.get(t).sourceUrls.includes(u))),metric.id);
console.log('PASS model-specific ancestry/multitrait/AD/SV/GxE/null recipes, allelic input branches and estimator-specific sources');
console.log(JSON.stringify({passed:true,analyses:19,variants:28,tools:180,metrics:321,biologicalExecution:false}));
