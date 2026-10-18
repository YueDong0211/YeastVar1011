'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),json=f=>JSON.parse(read(f));
const catalog={workflow:json('dist/data/workflow.json'),projects:json('dist/data/projects.json'),categories:json('dist/data/research-categories.json')};
const {workflow:w,projects:p,categories:c}=catalog,ctx={window:{}};
vm.runInNewContext(read('dist/plan-inputs.js'),ctx);vm.runInNewContext(read('dist/evolution-core-locales-v29.js'),ctx);
const plain=x=>JSON.parse(JSON.stringify(x)),I=ctx.window.YV_INPUTS,by=id=>w.tools.find(x=>x.id===id),r=p.projects.find(x=>x.id==='evolution_context');
let n=0;const check=(label,fn)=>{fn();n++;console.log('PASS '+label)};
const plan=(tool,branch,availableData)=>({projects:[],tools:[tool],stages:['genetics'],metrics:[],availableData,inputRoute:'count_matrix',toolBranches:{[tool]:branch},parameters:{},methodOptionIds:[],inputEvidence:{}});
const evidence=t=>{const result={};for(const r of by(t.tools[0]).inputContract.branches.find(x=>x.id===t.toolBranches[t.tools[0]]).evidenceRequirements){result[r.inputId]??={};result[r.inputId][r.field]='source-and-design-record.tsv';}return{...t,inputEvidence:result}};
const context=t=>I.methodContext(t,catalog).tools[0];
check('Existing catalogue identities are retained and only two core tools/metrics added',()=>{
 assert.equal(w.tools.length,167);assert.equal(w.metrics.length,312);assert.equal(p.projects.length,55);assert.equal(c.dataRequirements.length,39);
 for(const [file,key,records]of [['workflow.json','tools',w.tools],['workflow.json','metrics',w.metrics],['workflow.json','formulas',w.formulas],['projects.json','projects',p.projects],['research-categories.json','dataRequirements',c.dataRequirements]]){
  const old=JSON.parse(cp.execFileSync('git',['show','HEAD:dist/data/'+file],{cwd:root,encoding:'utf8',maxBuffer:16*1024*1024}));for(const row of old[key])assert.ok(records.some(x=>x.id===row.id),'Lost '+row.id);
 }
 assert.ok(by('limix'));assert.ok(by('glmmtmb'));assert.deepEqual(r.baseToolIds,['brms']);assert.deepEqual(r.toolIds,['brms','phytools2']);
});
check('Phylogenetic brms path needs tree and source declarations, not DNA genotype or count matrix',()=>{
 const t=plan('brms','phylogeny',['qtl_traits','sample_metadata','phylogeny']);assert.equal(context(t).status,'decision-pending');
 const a=context(evidence(t));assert.equal(a.status,'conditions-recorded');assert.deepEqual(plain(a.requiredData),['qtl_traits','sample_metadata','phylogeny']);assert.deepEqual(plain(a.unmet),[]);assert.equal(a.direction,null);
 assert.ok(!a.requiredData.includes('genotypes'));assert.ok(!a.requiredData.includes('count_matrix'));
});
check('Genomic branch requires actual kinship input even when declarations exist',()=>{
 const t=evidence(plan('brms','kinship',['qtl_traits','sample_metadata']));assert.equal(context(t).status,'input-pending');assert.deepEqual(plain(context(t).unmet),['kinship']);
 t.availableData.push('kinship');assert.equal(context(t).status,'conditions-recorded');assert.ok(!context(t).requiredData.includes('phylogeny'));
});
check('Switching K to C invalidates provenance and adds the tree requirement',()=>{
 const t=evidence(plan('brms','kinship',['qtl_traits','sample_metadata','kinship']));t.toolBranches.brms='phylogeny';const a=context(t);assert.equal(a.status,'decision-pending');assert.deepEqual(plain(a.unmet),['phylogeny']);assert.ok(a.issues.some(x=>x.field==='tree_covariance_construction'));
});
check('Boolean evidence and first-stage posterior-only declarations stay incomplete',()=>{
 const t=evidence(plan('brms','phylogeny',['qtl_traits','sample_metadata','phylogeny']));delete t.inputEvidence.qtl_traits.first_stage_likelihood_prior_handling;assert.ok(context(t).issues.some(x=>x.field==='first_stage_likelihood_prior_handling'));
 t.inputEvidence.qtl_traits.first_stage_likelihood_prior_handling=true;assert.equal(context(t).status,'decision-pending');
 assert.match(by('brms').limitations.join(' '),/第一阶段后验标准差/);assert.match(by('brms').limitations.join(' '),/抽样协方差/);
});
check('Phytools is explicitly likelihood-based and λ is distinguished from heritability',()=>{
 const t=evidence(plan('phytools2','lambda_with_sampling_error',['qtl_traits','sample_metadata','phylogeny']));assert.equal(context(t).status,'conditions-recorded');assert.deepEqual(plain(context(t).requiredData),['qtl_traits','sample_metadata','phylogeny']);
 assert.match(by('phytools2').limitations.join(' '),/似然优化/);assert.match(by('phytools2').limitations.join(' '),/λ不是遗传力/);assert.match(by('phytools2').limitations.join(' '),/可能超过1/);assert.match(by('phytools2').entrypoint,/method="lambda"/);
 const se=by('phytools2').parameters.find(x=>x.name==='se / x').selection;
 assert.match(se,/phytools::phylosig的se参数/);assert.match(se,/与x同尺度、同菌株名称/);assert.ok(!se.includes('se()'));
 for(const lang of ['en','fr','es','eu'])assert.ok(ctx.window.YV_TEXT[se]?.[lang]);
});
check('All new display strings have five-language support and contracts use existing IDs',()=>{
 for(const [key,row]of Object.entries(ctx.window.YV_TEXT)){assert.ok(key.trim());for(const lang of ['en','fr','es','eu'])assert.ok(typeof row[lang]==='string'&&row[lang].trim(),key+' '+lang);}
 const ids=new Set(c.dataRequirements.map(x=>x.id));for(const t of [by('brms'),by('phytools2')]){assert.equal(t.executionStatus,'recipe_only');assert.equal(t.versionEvidence.biologicalExecution,false);for(const b of t.inputContract.branches){for(const id of b.requiredData)assert.ok(ids.has(id));for(const e of b.evidenceRequirements){assert.ok(ids.has(e.inputId));for(const lang of ['zh','en','fr','es','eu'])assert.ok(e.label[lang]);}}}
 for(const option of r.methodOptions.filter(x=>x.addedIn==='v29')){for(const id of option.toolIds)assert.ok(by(id));for(const id of option.metricIds)assert.ok(w.metrics.some(x=>x.id===id));assert.equal(option.methodBranchHint.selection,'explicit_tool_branch_required');}
});
check('Formula provenance separates standard Bayes identity from project model composition',()=>{
 const f=w.formulas.find(x=>x.id==='noise_trait_sampling_covariance');assert.equal(f.derivation,'project_combination_of_documented_measurement_error_and_covariance_models');assert.match(f.expression,/A = K OR C/);assert.ok(f.sourceUrls.includes('https://doi.org/10.1080/10635150701313830'));assert.ok(f.assumptions.some(x=>x.includes('重复计入先验')));
 assert.match(f.expression,/y_hat = X beta \+ Z u \+ e \+ epsilon/);assert.match(f.expression,/tau_A\^2 Z A Z\^T/);
 const z=f.variables.find(x=>x.symbol==='Z');assert.match(z.meaning,/每菌株仅一行观测且顺序一致时Z=I/);
 for(const lang of ['en','fr','es','eu'])assert.ok(ctx.window.YV_TEXT[z.meaning]?.[lang]);
 assert.equal(w.formulas.find(x=>x.id==='bayes_noise_posterior').derivation,'standard_bayes_identity');
});
check('Whole-route inputs follow K/C choices and the optional signal method, including metric requirements',()=>{
 const selected=(branch,available)=>{const t=evidence(plan('brms',branch,available));t.projects=['evolution_context'];t.tools=[...r.baseToolIds];t.metrics=[...r.baseMetricIds];return t;};
 const k=selected('kinship',['qtl_traits','sample_metadata','kinship']);const kr=I(k,catalog);assert.deepEqual(plain(kr.inputs.map(x=>x.id)).sort(),['kinship','qtl_traits','sample_metadata']);
 const tree=selected('phylogeny',['qtl_traits','sample_metadata','phylogeny']);const tr=I(tree,catalog);assert.deepEqual(plain(tr.inputs.map(x=>x.id)).sort(),['phylogeny','qtl_traits','sample_metadata']);
 k.methodOptionIds=['evolution_context:bayesian_covariance'];k.metrics=[...new Set([...k.metrics,...r.methodOptions.find(x=>x.id==='bayesian_covariance').metricIds])];assert.ok(!I(k,catalog).inputs.some(x=>['phylogeny','count_matrix','genotypes'].includes(x.id)));
 const option=r.methodOptions.find(x=>x.id==='phylogenetic_signal');k.methodOptionIds.push('evolution_context:phylogenetic_signal');k.tools.push('phytools2');k.metrics.push(...option.metricIds);k.toolBranches.phytools2='lambda_with_sampling_error';
 assert.ok(I(k,catalog).inputs.some(x=>x.id==='phylogeny'&&x.status!=='declared'));assert.ok(!I(k,catalog).inputs.some(x=>x.id==='count_matrix'));
 k.methodOptionIds=k.methodOptionIds.filter(x=>!x.endsWith(':phylogenetic_signal'));k.tools=k.tools.filter(x=>x!=='phytools2');k.metrics=k.metrics.filter(x=>!option.metricIds.includes(x));delete k.toolBranches.phytools2;assert.ok(!I(k,catalog).inputs.some(x=>x.id==='phylogeny'));
});
console.log(JSON.stringify({passed:n,tools:w.tools.length,metrics:w.metrics.length,routes:p.projects.length,inputTypes:c.dataRequirements.length,localeKeys:Object.keys(ctx.window.YV_TEXT).length,biologicalModelsExecuted:false}));
