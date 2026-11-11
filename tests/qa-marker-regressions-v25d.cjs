'use strict';
// Production-only, pure VM regression of v25d review, evidence badges and GO-slim navigation.
// No browser, network, unpublished source sheets, or user storage.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,'dist',f),'utf8');
const header=JSON.parse(read('data/markers.json')),markers=header.shards.flatMap(f=>{const rows=JSON.parse(read('data/'+f));return Array.isArray(rows)?rows:rows.markers;});
const originalHash=crypto.createHash('sha256').update(JSON.stringify(markers)).digest('hex');
const plain=v=>JSON.parse(JSON.stringify(v)),sorted=v=>Array.from(v).sort(),roots=new Set(['GO:0008150','GO:0003674','GO:0005575']);
let language='en',dialogHTML='',catalogue={...header,markers};const handlers={},plan={markers:[]};
const maps={marker:new Map(markers.map(m=>[m.id,m])),source:new Map(header.sources.map(s=>[s.id,s]))};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const app={prefs:()=>({language}),esc,tx:v=>context.window.YV_TEXT?.[v]?.[language]??String(v??''),t:k=>k,data:()=>({markers:catalogue}),maps:()=>maps};
const context={URL,URLSearchParams,setTimeout,clearTimeout,sessionStorage:{getItem:()=>null,setItem(){}},location:{hash:'#markers'},document:{addEventListener(type,fn){(handlers[type]||=[]).push(fn);},querySelector:()=>null},window:{addEventListener(){},YV_APP:app,YV_BUILDER:{getPlan:()=>plan},YV_RESEARCH_ATLAS:{text:k=>k}}};
const load=(f,transform=s=>s)=>vm.runInNewContext(transform(read(f)),context,{filename:f});
load('marker-selection-v25c.js');load('marker-workspace-locales.js');load('v25-marker-locales.js');
load('marker-workspace.js',s=>s.replace('window.YV_MARKERS={','window.__audit={resetFilters,card,goRows,goFilters,goPreview,evidenceMatches,hierarchyPanel,setDialog(fn){showDialog=fn;},setRefresh(fn){refresh=fn;}};window.YV_MARKERS={'));
const workspaceClick=handlers.click.at(-1),workspaceChange=handlers.change.at(-1);
load('marker-preview-v13.js');
const work=context.window.YV_MARKERS,test=context.window.__audit,selection=context.window.YV_MARKER_SELECTION;
test.setDialog(html=>{dialogHTML=html;});test.setRefresh(()=>{});
const filter=patch=>{test.resetFilters();work.setFilters({browseScope:'all',...patch});return sorted(work.filterResults());};
const click=dataset=>workspaceClick({target:{closest:()=>({dataset})}});
const change=(key,value)=>workspaceChange({target:{dataset:{mwValue:key},value,hasAttribute:()=>false}});
const ash=maps.marker.get('S000001668'),thi=maps.marker.get('S000002238');assert.equal(ash.symbol,'ASH1');assert.equal(thi.symbol,'THI3');
const spellman=ash.evidence.find(e=>e.sourceId==='spellman1998'&&e.tag==='M/G1'),boocock=ash.evidence.find(e=>e.sourceId==='boocock2025'&&e.tag==='M/G1');assert(spellman&&boocock);
const assignment={id:ash.id,role:'include',groups:['M/G1'],purposes:['annotation'],rationale:'Source-specific RNA support',evidenceSources:[]};
plan.markers=[{...assignment,evidenceIds:[spellman.evidenceId]}];
assert.equal(selection.resolve(ash,plan.markers[0]).records.length,1);assert(selection.referenceURLs(ash,plan.markers[0],maps.source).length>0);
assert.deepEqual(plain(work.review().notReviewed),[]);assert.deepEqual(plain(work.review().noSelectedEvidence),[]);assert.deepEqual(plain(work.review().unsupportedGroup),[]);
plan.markers=[{...assignment,groups:['state'],evidenceSources:['spellman1998'],evidenceIds:[]}];
assert.deepEqual(plain(work.review().notReviewed),[]);assert.deepEqual(plain(work.review().noSelectedEvidence),[ash.id]);assert.deepEqual(plain(selection.referenceURLs(ash,plan.markers[0],maps.source)),[]);
plan.markers=[{...assignment,evidenceSources:['spellman1998'],evidenceIds:['unknown-preserved-id']}];
assert.deepEqual(plain(work.review().noSelectedEvidence),[ash.id]);assert.deepEqual(plain(work.review().unresolvedEvidence),[ash.id]);assert.equal(plan.markers[0].evidenceIds[0],'unknown-preserved-id');
plan.markers=[{...assignment,evidenceSources:['spellman1998']}];assert.deepEqual(plain(work.review().notReviewed),[]);assert.deepEqual(plain(work.review().noSelectedEvidence),[]);
plan.markers=[assignment];assert.deepEqual(plain(work.review().notReviewed),[ash.id]);assert.deepEqual(plain(work.review().noSelectedEvidence),[]);
console.log('PASS actual ASH1 review honors selected records, explicit empty selection, unresolved IDs and legacy source mode');

plan.markers=[];
const badge=html=>html.match(/data-tag="M\/G1"[^>]*><span>.*?<\/span><b>(.*?)<\/b>/)?.[1];
assert.deepEqual(filter({q:ash.id,searchMode:'exact',sources:['spellman1998'],grades:['B'],phases:['M/G1']}),[ash.id]);assert.equal(badge(test.card(ash)),'B');
assert.deepEqual(filter({q:ash.id,searchMode:'exact',sources:['boocock2025'],grades:['A'],phases:['M/G1']}),[ash.id]);assert.equal(badge(test.card(ash)),'A');
filter({q:ash.id,searchMode:'exact'});assert.equal(badge(work.evidenceTags(ash)),'A/B');assert.equal(ash.evidence.find(e=>e.evidenceId===spellman.evidenceId).grade,'B');
console.log('PASS ASH1 filtered card badges use only matched evidence; complete tags preserve both source grades');

const slimFilter=(branch,extra={})=>filter({browseScope:'function',q:thi.id,searchMode:'exact',evidenceKind:'function',evidenceBranch:branch,...extra});
assert.equal(thi.go.length,0);for(const branch of ['goBP','goMF','goCC'])assert.deepEqual(slimFilter(branch),[]);
for(const [branch,aspect] of [['goSlimBP','P'],['goSlimMF','F'],['goSlimCC','C']]){
 const expected=thi.goSlim.filter(g=>g.aspect===aspect&&!g.ontologyRoot&&!roots.has(g.id)&&thi.evidence.some(e=>e.relation==='GO_slim_function'&&e.goId===g.id));assert(expected.length>0);
 assert.deepEqual(slimFilter(branch,{sources:['sgd_slim'],grades:['C']}),[thi.id]);
 for(const g of expected){assert.deepEqual(slimFilter(branch,{sources:['sgd_slim'],grades:['C'],goTerms:[g.id]}),[thi.id]);const es=Array.from(test.evidenceMatches(thi));assert(es.length);assert(es.every(e=>e.relation==='GO_slim_function'&&e.goId===g.id));}
 slimFilter(branch);const controls=test.goFilters();assert(!controls.includes('mw-go-codes'));assert(expected.every(g=>controls.includes('value="'+g.id+'"')));
 assert(test.goPreview(thi).includes('data-mw="go-slim-evidence"'));assert(!test.goPreview(thi).includes('data-mw="go-evidence"'));
}
assert.deepEqual(slimFilter('goSlimBP',{sources:['nadal2019']}),[]);assert.deepEqual(slimFilter('goSlimBP',{grades:['A']}),[]);assert.deepEqual(slimFilter('goSlimBP',{condition:'YPD'}),[]);
assert.deepEqual(slimFilter('goSlimBP',{goTerms:['GO:0008134']}),[],'MF must not satisfy a BP branch');
slimFilter('goSlimBP',{goTerms:['GO:0006520','GO:0009056']});assert.deepEqual(sorted(new Set(test.evidenceMatches(thi).map(e=>e.goId))),['GO:0006520','GO:0009056']);
for(const id of roots)assert.deepEqual(slimFilter('goSlimBP',{goTerms:[id]}),[]);
const rootOnly=markers.filter(m=>m.goSlim?.some(g=>g.ontologyRoot)&&!m.evidence.some(e=>e.relation==='GO_slim_function'&&!roots.has(e.goId)));
assert(rootOnly.length>0);for(const branch of ['goSlimBP','goSlimMF','goSlimCC']){const result=new Set(filter({browseScope:'function',evidenceKind:'function',evidenceBranch:branch}));for(const m of rootOnly)assert(!result.has(m.id));}
console.log('PASS actual THI3 GO-slim BP/MF/CC, distinct GAF layer, term union, same-record source/grade/condition and ontology-root exclusion');

// An independent fixture checks that facets and previews cannot borrow a different term's metadata.
const fixture={id:'fixture-v25d',symbol:'AUDIT',tags:['function'],phases:[],uses:[],go:[],goSlim:[{id:'GO:9000001',term:'Term one',aspect:'P',sourceId:'left'},{id:'GO:9000002',term:'Term two',aspect:'P',sourceId:'right'},{id:'GO:0008150',term:'biological_process',aspect:'P',ontologyRoot:true}],evidence:[{evidenceId:'audit-left',tag:'function',grade:'C',sourceId:'left',sourceCondition:'heat',relation:'GO_slim_function',goId:'GO:9000001',goAspect:'P'},{evidenceId:'audit-right',tag:'function',grade:'C',sourceId:'right',sourceCondition:'cold',relation:'GO_slim_function',goId:'GO:9000002',goAspect:'P'}]};
const originalCatalogue=catalogue;catalogue={...header,markers:[fixture]};maps.marker.set(fixture.id,fixture);
assert.deepEqual(filter({browseScope:'function',evidenceKind:'function',evidenceBranch:'goSlimBP',condition:'heat'}),[fixture.id]);
assert(test.goFilters().includes('GO:9000001'));assert(!test.goFilters().includes('GO:9000002'));assert(!test.goPreview(fixture).includes('GO:9000002'));
assert.deepEqual(filter({browseScope:'function',evidenceKind:'function',evidenceBranch:'goSlimBP',condition:'heat',goTerms:['GO:9000002']}),[]);
catalogue=originalCatalogue;maps.marker.delete(fixture.id);
console.log('PASS GO-slim facet counts and previews obey the matching term evidence, not another source row');

const gaf=markers.find(m=>m.go?.some(g=>g.aspect==='P'&&g.evidenceCode)&&m.evidence.some(e=>e.relation==='GO_annotations'));
assert(gaf);const g=gaf.go.find(g=>g.aspect==='P'&&g.evidenceCode),code=g.evidenceCode;
assert.deepEqual(filter({browseScope:'function',q:gaf.id,searchMode:'exact',evidenceKind:'function',evidenceBranch:'goBP',goTerms:[g.id],goCodes:[code]}),[gaf.id]);
assert(test.goFilters().includes('mw-go-codes'));assert(test.goPreview(gaf).includes('data-mw="go-evidence"'));
assert.deepEqual(filter({browseScope:'function',q:gaf.id,searchMode:'exact',evidenceKind:'function',evidenceBranch:'goBP',goTerms:[g.id],goCodes:['INVALID-CODE']}),[]);
slimFilter('goBP',{goCodes:['IEA']});change('evidenceBranch','goSlimBP');assert.deepEqual(plain(work.getState().goCodes),[]);assert.deepEqual(plain(work.getState().goTerms),[]);assert.deepEqual(sorted(work.filterResults()),[thi.id]);
console.log('PASS complete GAF term/code filtering and branch switch reset remain intact');

for(language of ['zh','en','fr','es','eu']){
 for(const key of ['goSlimBP','goSlimMF','goSlimCC','matchingGOSlim','goSlimFilterHelp','noSelectedEvidence'])assert.notEqual(work.text(key),key,language+' '+key);
 slimFilter('goSlimBP',{goTerms:['GO:0006520']});assert(test.hierarchyPanel().includes(work.text('goSlimBP')));assert(test.goPreview(thi).includes(work.text('matchingGOSlim')));
 dialogHTML='';click({mw:'go-slim-evidence',id:thi.id,go:'GO:0006520'});assert(dialogHTML.includes('amino acid metabolic process'));assert(dialogHTML.includes('GO_slim_function'));assert(dialogHTML.includes('go_slim_mapping.tab'));assert(dialogHTML.includes('amigo.geneontology.org/amigo/term/GO%3A0006520'));assert(!dialogHTML.includes('>IEA<'));
 const html=dialogHTML;click({mw:'go-slim-evidence',id:thi.id,go:'GO:0008150'});assert.equal(dialogHTML,html,'An ontology root must not open a functional assertion');
 plan.markers=[{...assignment,evidenceIds:[]}];assert(work.reviewPanel().includes(work.text('noSelectedEvidence')));
}
assert.equal(crypto.createHash('sha256').update(JSON.stringify(markers)).digest('hex'),originalHash,'Filtering and previews must not modify source records');
console.log('PASS five-language GO-slim/review controls, real source links, root popup exclusion and catalogue immutability');
