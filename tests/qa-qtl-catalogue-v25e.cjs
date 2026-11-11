'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=name=>JSON.parse(fs.readFileSync(path.join(root,'dist/data',name+'.json'),'utf8'));
const p=read('projects'),w=read('workflow'),l=read('literature'),categories=read('research-categories'),ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'dist/citation-data.js'),'utf8'),ctx);
const c=ctx.window.YV_CITATION_DATA,byId=new Map(l.papers.map(x=>[x.id,x])),cards=p.qtlCatalogue;
const languages=['zh','en','fr','es','eu'],canon=d=>String(d||'').toLowerCase().replace('10.7554/elife.95566.3','10.7554/elife.95566');
assert.equal(cards.filter(x=>x.addedIn==='v25e').length,19);
assert.equal(new Set(cards.map(x=>x.id)).size,cards.length);
for(const row of cards){
 for(const key of ['title','trait','unit','scope','biologyCaveat'])for(const lang of languages)assert(row[key]?.[lang]?.trim(),row.id+' '+key+' '+lang);
 for(const item of [...row.additionalInputs,...row.inputModes.flatMap(x=>[x.title,x.description])])for(const lang of languages)assert(item[lang]?.trim());
 for(const id of row.routeIds)assert(p.projects.some(x=>x.id===id),'Unknown route '+id);
 for(const id of row.toolIds)assert(w.tools.some(x=>x.id===id),'Unknown tool '+id);
 for(const id of row.metricIds)assert(w.metrics.some(x=>x.id===id),'Unknown metric '+id);
 for(const id of [...row.inputs,...row.inputModes.flatMap(x=>x.requiredData||[])])assert(categories.dataRequirements.some(x=>x.id===id),'Unknown input '+id);
 for(const id of row.paperIds){const paper=byId.get(id);assert(paper&&paper.apa7,'Missing formatted source '+id);assert(c.records.some(r=>r.literatureId===id),'Missing citation '+id);}
 for(const d of row.referenceDois)assert(row.paperIds.some(id=>canon(byId.get(id).doi)===canon(d)),'Source not mapped '+d);
 assert.equal(row.automaticExecution,false);assert.equal(row.executionStatus,'not_executed');
}
console.log('PASS 19 QTL cards, complete five-language descriptions, input alternatives and valid route/tool/metric/reference identities');
const row=id=>cards.find(c=>c.id===id);
assert.equal(row('between_individual_vqtl').family,'variance');
assert.equal(row('noise_qtl').family,'variance');
assert.notEqual(row('noise_qtl').unit.en,row('between_individual_vqtl').unit.en);
assert.match(row('detection_qtl').biologyCaveat.en,/burst/i);
assert.match(row('dynamic_qtl').biologyCaveat.en,/velocity/i);
for(const id of ['protein_qtl','accessibility_qtl','histone_qtl','dna_methylation_qtl','metabolite_qtl']){
 assert.equal(row(id).family,'additional_omics');assert(row(id).inputModes.length>=2);
}
assert(row('program_activity_qtl').referenceDois.includes('10.64898/2026.05.29.728873'));
assert(row('distqtl').referenceDois.includes('10.1093/nargab/lqaf155'));
console.log('PASS distinct noise/variance estimands, detection and dynamic-QTL boundaries, and separate additional-omics input paths');
for(const r of c.audit.v25eQTL.records){
 const ref=c.records.find(x=>x.id===r.referenceId),paper=byId.get(r.literatureId);
 assert(ref.csl.author.length&&ref.csl.title&&ref.csl.issued['date-parts'][0][0]);
 assert.equal(canon(ref.csl.DOI),canon(paper.doi));assert(paper.apa7.toLowerCase().includes(canon(paper.doi)));
 assert(!/undefined|NaN|CSL STYLE ERROR/.test(paper.apa7));
}
const dist=byId.get(row('distqtl').paperIds.find(id=>canon(byId.get(id).doi)==='10.1093/nargab/lqaf155'));
assert.equal(dist.publicationType,'peer-reviewed');
const pre=l.papers.find(x=>x.doi==='10.64898/2026.05.29.728873');assert.equal(pre.publicationType,'preprint');
const preRef=c.records.find(x=>x.literatureId===pre.id);assert.equal(preRef.csl.genre,'Preprint');assert(!preRef.csl['container-title']);
assert.equal(l.papers.filter(x=>canon(x.doi)==='10.7554/elife.95566').length,1);
assert.equal(l.counts.records,l.papers.length);assert.equal(c.audit.formattedRecords,c.records.length);
console.log('PASS source metadata, real APA formatting, published versus preprint status and Version-of-Record reuse');
