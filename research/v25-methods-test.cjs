'use strict';
// Offline semantic tests. These verify catalogue and citation integrity, not biological performance.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const load=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const w=load('dist/data/workflow.json'),p=load('dist/data/projects.json'),c=load('dist/data/research-categories.json'),l=load('dist/data/literature.json');
const proposals=load('research/v25-methods-proposals.json'),baseline=load('research/v25-methods-inventory.json');
const ctx={window:{},console}; vm.createContext(ctx);
for(const file of ['dist/vendor/citations/citeproc.js','dist/citation-data.js','dist/v25-research-locales.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),ctx,{filename:file});
const citations=ctx.window.YV_CITATION_DATA;
let checks=0;
const check=(ok,note)=>{assert(ok,note);checks++;};
const tools=new Map(w.tools.map(x=>[x.id,x])),metrics=new Map(w.metrics.map(x=>[x.id,x])),papers=new Map(l.papers.map(x=>[x.id,x])),refs=new Map(citations.records.map(x=>[x.id,x]));
const steps=new Set(w.steps.map(x=>x.id)),inputs=new Set(c.dataRequirements.map(x=>x.id)),tags=new Set(c.methodTags.map(x=>x.id));
for(const [rows,label] of [[w.tools,'tools'],[w.metrics,'metrics'],[p.projects,'projects'],[l.papers,'papers']])check(new Set(rows.map(x=>x.id)).size===rows.length,'Duplicate '+label);
check(w.tools.length===baseline.counts.tools+10,'Ten new methods');
check(w.metrics.filter(x=>x.addedIn==='v25').length===22,'Twenty-two v25 metrics');
check(p.projects.length===baseline.counts.projects,'No redundant route added');
check(l.papers.length===baseline.counts.papers+11,'Eleven new papers');
for(const kind of ['tools','projects'])for(const old of baseline[kind])check(({tools,projects:new Map(p.projects.map(x=>[x.id,x]))}[kind]).has(old.id),'Baseline ID retained '+old.id);
function translated(s,label){if(!/[\u3400-\u9fff]/u.test(s||''))return;check(!!ctx.window.YV_TEXT[s],label+' translation exists');for(const lang of ['en','fr','es','eu'])check(!!ctx.window.YV_TEXT[s][lang]&&!/[\u3400-\u9fff]/u.test(ctx.window.YV_TEXT[s][lang]),label+' '+lang);}
for(const candidate of proposals.candidates){
 const tool=tools.get(candidate.proposedToolIds[0]);check(!!tool,'Tool present');
 check(tool.executionStatus==='recipe_only'&&!tool.versionEvidence.biologicalExecution,'No fake execution');
 check(tool.documentationStatus==='official-entrypoint-verified','Verified API status');
 check(tool.entrypoint===candidate.invocations[0].code,'Verified invocation retained');
 check(tool.versionEvidence.checkedOn==='2026-10-18','Version evidence dated');
 for(const field of [tool.task,...tool.input,...tool.output,...tool.limitations,tool.applicability.reason,tool.yeastStatus,tool.role,...tool.parameters.flatMap(x=>[x.meaning,x.selection]),...tool.sourceLinks.map(x=>x.label)])translated(field,tool.id);
 for(const id of [...tool.applicability.requiredData,...tool.applicability.optionalData])check(inputs.has(id),'Input exists '+id);
 for(const id of tool.methodTags)check(tags.has(id),'Tag exists '+id);
 for(const id of tool.paperIds)check(papers.has(id),'Paper exists '+id);
 check(citations.toolReferences[tool.id]?.length>0,'Tool citation mapping '+tool.id);
 for(const id of citations.toolReferences[tool.id])check(refs.has(id),'Mapped citation exists '+id);
 const gate=c.compatibilityRules.find(x=>x.id===candidate.id+'_gate');check(gate&&JSON.stringify(gate.requiredData)===JSON.stringify(tool.applicability.requiredData),'Input gate agrees');
 for(const id of candidate.existingProjectIds){const route=p.projects.find(x=>x.id===id);check(route.toolIds.includes(tool.id),'Tool linked into existing route');check(route.methodOptions?.some(x=>x.id===candidate.id),'Optional branch registered');for(const metric of candidate.metrics)check(route.metricIds.includes(metric.id),'Metric linked into route');}
 for(const metric of candidate.metrics){const m=metrics.get(metric.id);check(!!m,'Metric present');check(steps.has(m.stepId),'Metric step exists');check(m.tools.includes(tool.id),'Metric tool linked');check(m.collection.requiresImplementation&&m.collection.executionStatus==='not_executed','Derived export honest');check(m.inputIds.includes('sample_metadata'),'Grouping metadata required');for(const id of m.inputIds)check(inputs.has(id),'Metric input exists');for(const field of [m.name,m.definition,m.unit,m.denominator,m.level,m.purpose,...m.cautions,...m.collection.fields.map(x=>x.meaning),m.collection.outputFileRole])translated(field,m.id);}
}
for(const id of ['chooser','lamian','scpower'])check(tools.get(id).applicability.requiredData.includes('culture_replicates'),'Independent cultures required '+id);
check(tools.get('limma').applicability.requiredData.includes('sample_metadata'),'Design manifest required');
check(tools.get('conformalsc').applicability.requiredData.includes('yeast_annotation_reference'),'Yeast reference required');
check(tools.get('scprisma').applicability.requiredData.includes('yeast_cycle_reference'),'Cycle anchors required');
check(tools.get('moscot').applicability.requiredData.includes('timepoints'),'Real time required');
check(tools.get('scpower').conditionalInputRequirements[0].requiredData.includes('genotypes'),'eQTL genotype gate');
check(tools.get('scpower').conditionalInputRequirements[0].requiredData.includes('kinship'),'eQTL population structure gate');
check(tools.get('scpower').entrypoint.includes('power.general.withDoublets')&&!tools.get('scpower').entrypoint.includes('scPower::power.de'),'Exported scPower API');
check(tools.get('lamian').entrypoint.includes('fix.all.zero = FALSE'),'No hidden noise injection');
check(metrics.get('v25_bigsur_correlation').inputIds.includes('culture_replicates'),'Independent edge replication input');
check(metrics.get('v25_lamian_branch_support').collection.entrypoint.includes('evaluate_uncertainty'),'Separate branch-support API');
for(const ref of proposals.references){
 const paper=l.papers.find(x=>x.doi===ref.doi),record=citations.records.find(x=>x.csl.DOI===ref.doi);
 check(!!paper&&!!record,'Both catalogue and CSL '+ref.doi);check(paper.metadataVerified,'Metadata verified');
 check(record.csl.author.length===ref.authors.length,'Complete authors '+ref.doi);
 check(l.papers.filter(x=>x.doi===ref.doi).length===1,'No duplicate paper '+ref.doi);
 check(citations.records.filter(x=>x.csl.DOI===ref.doi).length===1,'No duplicate CSL '+ref.doi);
 const engine=new ctx.CSL.Engine({retrieveLocale:()=>citations.locale,retrieveItem:id=>refs.get(id).csl},citations.style,'en-US');engine.setOutputFormat('text');engine.updateItems([record.id]);const formatted=engine.makeBibliography()[1].join('').trim();
 check(formatted.includes(ref.doi),'APA contains DOI '+ref.doi);check(!/undefined|NaN|\[CSL STYLE ERROR\]/.test(formatted),'APA valid '+ref.doi);
 if(paper.addedIn==='v25'){check(paper.apa7===formatted,'Stored APA matches engine');for(const s of [paper.summary,paper.contribution,paper.markerUse,...paper.limitations,...paper.species])translated(s,'paper '+paper.id);}
}
const big=l.papers.find(x=>x.doi==='10.1186/s12859-025-06240-y');check(big.id==='lit-780ec4215f2f','Reuse BigSur paper');
const bi=l.papers.find(x=>x.doi==='10.1101/2025.02.03.636129');check(bi.publicationType==='preprint'&&citations.records.find(x=>x.csl.DOI===bi.doi).csl.type==='article','BiPCA remains preprint');
check(l.papers.find(x=>x.doi==='10.1038/s41586-024-08453-2').year===2025,'moscot publication year');
check(l.papers.find(x=>x.doi==='10.1186/s12859-024-05926-z').year===2024,'BigSur correlation publication year');
check(citations.audit.publicationTypeAudit.journalCorrections.length===4,'Prior publication-type corrections retained');
console.log(JSON.stringify({status:'passed',checks,tools:w.tools.length,metrics:w.metrics.length,routes:p.projects.length,papers:l.papers.length,citations:citations.records.length,localizedStrings:Object.keys(ctx.window.YV_TEXT).length,biologicalExecution:false},null,2));
