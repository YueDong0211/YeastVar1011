'use strict';
// Public shipped-data regression: evidence roles, source-aware filtering and citations.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,'dist',f),'utf8');
const header=JSON.parse(read('data/markers.json')),markers=header.shards.flatMap(f=>JSON.parse(read('data/'+f)));
const rows=markers.flatMap(m=>m.evidence.map(e=>({m,e}))),rna=rows.filter(({e})=>e.addedIn==='v25d'),fun=rows.filter(({e})=>e.addedIn==='v25d-function');
assert.equal(markers.length,5286);assert.equal(rows.length,30240);assert.equal(new Set(rows.map(r=>r.e.evidenceId)).size,30235);assert.equal(header.sources.length,52);
assert.equal(rna.length,64);assert.equal(fun.length,120);assert.equal(markers.filter(m=>m.addedIn==='v25d').length,11);
const nocedal=rna.filter(r=>r.e.sourceId==='nocedal2017_fig6s2'),solari=rna.filter(r=>r.e.sourceId==='solari2024_fig1b');
assert.equal(nocedal.length,60);assert.deepEqual(solari.map(r=>r.m.symbol).sort(),['ENO2','NCE102','PAB1','PDC1']);
for(const {m,e} of rna){assert.equal(e.grade,'B');assert.equal(e.evidenceLayer,'bulk_RNA');assert.equal(e.authorSingleCellPanel,false);assert.equal(e.directStateMarker,false);assert.equal(e.relation,'member_of_RNA_reference_module');assert.equal(e.annotationUse,'reference_panel_member');assert.equal(e.phase,undefined);assert.equal(e.sourceDirection,e.direction);assert(e.sourceLocator&&e.sourceSha256);}
for(const {e} of nocedal){assert.equal(e.sourceStrain,null);assert(e.sourceCondition.includes('Chu'));assert(Number(e.referenceStatistics.source_SPO_vs_YPD)>=2.5);assert.equal(e.sourceDirection,'higher');assert(e.referenceStatisticColumns.source_SPO_vs_YPD.startsWith('T:'));}
for(const {m,e} of solari){assert.equal(e.sourceDirection,m.symbol==='NCE102'?'lower':'higher');assert.equal(Object.keys(e.referenceStatistics).length,0);assert.equal(e.datasetAccession,null);assert(e.assay.includes('Northern'));assert.equal(e.sourceRow,null);}
const roots=new Set(['GO:0003674','GO:0005575','GO:0008150']);
for(const {e} of fun){assert.equal(e.grade,'C');assert.equal(e.directStateMarker,false);assert.equal(e.relation,'GO_slim_function');assert(!roots.has(e.goId));}
for(const m of markers.filter(m=>m.addedIn==='v25d')){assert.deepEqual(m.phases,[]);assert.deepEqual(m.go,[]);for(const k of ['mean','detection','specificity','rank'])assert.equal(m.expression[k],null);}
const held=header.sourceReviewQueue.filter(e=>e.addedIn==='v25d');assert.equal(held.length,5);for(const e of held)assert(!rows.some(r=>r.e.evidenceId===e.evidenceId));
console.log('PASS exact release counts, B RNA/C functional evidence, original assay and direction, held source identities and no invented measurements');
const catalogue={...header,markers};let language='zh';const maps={marker:new Map(markers.map(m=>[m.id,m])),source:new Map(header.sources.map(s=>[s.id,s]))};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ctx={console,URL,URLSearchParams,setTimeout,clearTimeout,sessionStorage:{getItem:()=>null,setItem(){}},location:{hash:'#markers'},document:{addEventListener(){},querySelector(){return null;}},window:{addEventListener(){}}};
ctx.window.YV_APP={prefs:()=>({language}),esc,tx:x=>ctx.window.YV_TEXT?.[x]?.[language]??String(x??''),t:k=>k,data:()=>({markers:catalogue}),maps:()=>maps};
ctx.window.YV_BUILDER={getPlan:()=>({markers:[]})};ctx.window.YV_RESEARCH_ATLAS={text:k=>k};
const load=(f,transform=s=>s)=>vm.runInNewContext(transform(read(f)),ctx,{filename:f});
for(const f of ['marker-selection-v25c.js','marker-workspace-locales.js','v25-marker-locales.js','v25d-evidence-locales.js'])load(f);
load('marker-workspace.js',s=>s.replace('window.YV_MARKERS={','window.__qa={resetFilters,evidencePurpose,familyMatches,filterPanel};window.YV_MARKERS={'));load('marker-preview-v13.js');
const ws=ctx.window.YV_MARKERS,qa=ctx.window.__qa,preview=ctx.window.YV_MARKER_PREVIEW;
const ids=rs=>[...new Set(rs.map(r=>r.m.id))].sort();
const filter=(p={})=>{qa.resetFilters();ws.setFilters({browseScope:'annotation',sources:['nocedal2017_fig6s2'],...p});return Array.from(ws.filterResults()).sort();};
assert.deepEqual(filter({evidencePurpose:'rnaReference'}),ids(nocedal));assert.deepEqual(filter({evidencePurpose:'authorPanel'}),[]);
assert.deepEqual(filter({evidenceKind:'rna',evidenceBranch:'singlecellRNA'}),[]);assert.deepEqual(filter({evidenceKind:'rna',evidenceBranch:'referenceRNA'}),ids(nocedal));
assert.deepEqual(filter({direction:'lower'}),[]);assert.deepEqual(filter({phases:['G1']}),[]);
assert.deepEqual(filter({sources:['solari2024_fig1b'],direction:'lower'}),ids(solari.filter(r=>r.m.symbol==='NCE102')));
assert.deepEqual(filter({sources:['solari2024_fig1b'],direction:'higher'}),ids(solari.filter(r=>r.m.symbol!=='NCE102')));
for(const r of rna)assert.equal(qa.evidencePurpose(r.e),'rnaReference');
ws.setFilters({tagFamily:'familyReproduction',tagQ:'孢子形成上调RNA',q:'SPO1'});assert(qa.familyMatches(nocedal[0].e.tag));assert(!qa.familyMatches(solari[0].e.tag));
for(const lang of ['zh','en','fr','es','eu']){
 language=lang;assert.notEqual(ws.text('familyReproduction'),'familyReproduction');assert(qa.filterPanel().includes(ws.text('familyReproduction')));
 for(const {e} of rna){for(const key of [e.tag,e.context,e.assay,e.limitation,...e.uses])assert(ctx.window.YV_TEXT[key]?.[lang],key+' '+lang);const html=preview.sourceMetadata(e);assert(!html.includes('[object Object]'));assert(!html.includes('undefined'));assert(html.includes(esc(e.sourceLocator)));}
}
console.log('PASS same-assertion source/assay/direction/phase filtering, reproductive tag family and five-language nested source metadata');
load('citation-data.js');load('vendor/citations/citeproc.js');const c=ctx.window.YV_CITATION_DATA,l=JSON.parse(read('data/literature.json'));
const records=new Map(c.records.map(r=>[r.id,r]));
for(const row of c.audit.v25dMarkers.records){const r=records.get(row.referenceId),p=l.papers.find(p=>p.id===row.literatureId);assert(r&&p);assert.equal(c.records.filter(r=>r.csl.DOI?.toLowerCase()===row.doi).length,1);assert.equal(l.papers.filter(p=>p.doi===row.doi).length,1);assert.equal(p.cslAuthors.length,r.csl.author.length);const engine=new ctx.CSL.Engine({retrieveLocale:()=>c.locale,retrieveItem:id=>records.get(id).csl},c.style,'en-US');engine.setOutputFormat('text');engine.updateItems([r.id]);assert.equal(p.apa7,engine.makeBibliography()[1].join('').trim());}
const nc=header.sources.find(s=>s.id==='nocedal2017_fig6s2'),so=header.sources.find(s=>s.id==='solari2024_fig1b');
assert(c.urlMethodReferences[nc.tableUrl].includes(nc.citationId));assert(c.urlMethodReferences[nc.tableUrl].some(id=>records.get(id).csl.DOI==='10.1126/science.282.5389.699'));
assert.equal(so.year,2024);assert.equal(so.dates.online,'2023-12-14');assert.equal(l.papers.find(p=>p.doi==='10.1126/science.282.5389.699').inWindow,false);
assert.equal(c.audit.cataloguePapers,l.papers.length);assert.equal(c.audit.formattedRecords,c.records.length);
console.log('PASS full APA7 authors/year, original reused RNA citation linkage, DOI uniqueness and synchronized catalogue counts');
