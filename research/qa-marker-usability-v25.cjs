'use strict';
// Exercise the shipped workspace with its real catalogue and registered events.
// No browser, network or user storage is used by this regression suite.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),handlers={},plan={markers:[]};
let language='en',evidenceReads=0,refreshes=0;
const ev=(tag,source='study',extra={})=>({tag,sourceId:source,grade:'A',relation:'used_as_scRNA_marker_for',...extra});
const gene=(id,symbol,tags,evidence=[],extra={})=>({id,symbol,systematic:'ORF_'+id,aliases:[],tags,uses:[],go:[],phases:[],evidence,...extra});
const tracked=gene('a','GAL1',['cycle','stress'],[],{aliases:['GALACTOKINASE']});
const trackedEvidence=[ev('G1','study',{sourceCondition:'NaCl',sourceDirection:'higher'}),ev('stress','other',{sourceCondition:'heat',sourceDirection:'lower'})];
Object.defineProperty(tracked,'evidence',{get(){evidenceReads++;return trackedEvidence;}});
let catalogue={updated:'fixture1',markers:[tracked,
 gene('b','GAL10',['cycle'],[ev('G1')],{seed:true}),
 gene('c','AAA',['stress'],[ev('S')],{aliases:['GAL1'],seed:true}),
 gene('d','TEXT_ONLY',['stress','damage'],[{tag:'stress',sourceId:'go',grade:'C',relation:'GO_annotations'}],{summaryEn:'GAL1 pathway; réponse au stress',seed:true}),
 gene('e','OTHER',['damage'],[ev('G2')]),
],sources:[{id:'study',title:'Fixture study',url:'https://example.org/study'},{id:'other',title:'Other study',url:'https://example.org/other'},{id:'go',title:'GO source',url:'https://example.org/go'}]};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let mappedCatalogue=null,maps=null;
function lookup(){if(mappedCatalogue!==catalogue){mappedCatalogue=catalogue;maps={marker:new Map(catalogue.markers.map(m=>[m.id,m])),source:new Map(catalogue.sources.map(s=>[s.id,s]))};}return maps;}
const document={addEventListener(type,fn){(handlers[type]||=[]).push(fn);},querySelector(){return null;}};
const window={addEventListener(){},YV_RESEARCH_ATLAS:{text:key=>key,markerUpdate:()=>''},YV_BUILDER:{getPlan:()=>plan},YV_APP:{
 esc,tx:value=>String(value??''),t:key=>key,prefs:()=>({language}),data:()=>({markers:catalogue}),maps:lookup,
}};
const context={window,document,sessionStorage:{getItem(){return null;}},location:{hash:'#markers'},URLSearchParams,setTimeout,clearTimeout};
context.URL=URL;vm.runInNewContext(fs.readFileSync(path.join(root,'dist/marker-selection-v25c.js'),'utf8'),context);
vm.runInNewContext(fs.readFileSync(path.join(root,'dist/marker-workspace-locales.js'),'utf8'),context);
const production=fs.readFileSync(path.join(root,'dist/marker-workspace.js'),'utf8');
vm.runInNewContext(production.replace('window.YV_MARKERS={','window.__v25={resetFilters,filterSnapshot,activeFilters,filterTotal,catalogue,card,searchMatchLabel,libraryCounts,refreshWith(fn){refresh=fn;}};window.YV_MARKERS={'),context);
const app=window.YV_MARKERS,test=window.__v25;
test.refreshWith(()=>{refreshes++;});
const ids=()=>Array.from(app.filterResults()),reset=()=>test.resetFilters(),filter=patch=>app.setFilters(patch);
const change=(key,value)=>handlers.change.at(-1)({target:{dataset:{mwValue:key},value,hasAttribute(){return false;}}});
const click=(action,key,value)=>handlers.click.at(-1)({target:{closest:()=>({dataset:{mw:action,key,value}})}});
const sorted=values=>[...values].sort();

assert.equal(app.getState().browseScope,'annotation');assert.deepEqual(sorted(ids()),['a','b','c','e'],'Default annotation excludes GO-only records');
click('browse-scope',null,'all');assert.equal(app.getState().browseScope,'all');
filter({q:'GAL1'});assert.deepEqual(ids(),['a','c','b','d'],'A canonical name precedes an exact alias, a partial gene name and prose, despite seed ranking');
assert(test.searchMatchLabel(tracked).includes('Exact gene identifier'));
assert(test.searchMatchLabel(catalogue.markers[2]).includes('Exact alias'));
assert(test.searchMatchLabel(catalogue.markers[2]).includes('GAL1'));
assert(test.searchMatchLabel(catalogue.markers[3]).includes('Annotation or source text match'));
change('searchMode','identity');assert.deepEqual(ids(),['a','c','b'],'Identity search excludes incidental mentions in descriptions');
change('searchMode','exact');assert.deepEqual(ids(),['a','c'],'Ambiguous aliases are not silently discarded');
filter({q:'gal1; ORF_e，GALACTOKINASE'});assert.deepEqual(sorted(ids()),['a','c','e']);
filter({q:'ＧＡＬ１'});assert.deepEqual(ids(),['a','c'],'Full-width pasted identifiers normalize without modifying stored gene IDs');
change('searchMode','all');filter({q:'reponse'});assert.deepEqual(ids(),['d'],'Accent-insensitive search matches source prose');
filter({q:'GAL1',sort:'alphabet'});assert.deepEqual(ids(),['c','a','b','d'],'An explicit alphabetical order stays alphabetical');
filter({sort:'curated'});
console.log('PASS canonical identity, aliases, partial names, prose, pasted lists, accents and explicit sort choices');

reset();filter({q:'GAL1',searchMode:'exact',phases:['S']});assert.deepEqual(ids(),['c']);
assert.equal(test.filterTotal(),3);assert(test.activeFilters().includes('data-key="searchMode"'));
assert.equal(app.exportData().candidateQuery.filters.searchMode,'exact');
click('clear-filter','searchMode');assert.equal(app.getState().searchMode,'all');assert.equal(app.getState().q,'GAL1');
filter({searchMode:'exact'});click('search-all');assert.equal(app.getState().searchMode,'exact');assert.equal(app.getState().q,'GAL1');assert.equal(app.getState().phases.length,0);
click('broaden-search');assert.equal(app.getState().searchMode,'all');assert.equal(app.getState().q,'GAL1');
plan.markers=[{id:'a'}];click('reset');assert.equal(app.getState().q,'');assert.equal(app.getState().searchMode,'all');assert.deepEqual(plan.markers,[{id:'a'}]);
change('searchMode','invalid');assert.equal(app.getState().searchMode,'all');assert(refreshes>=7);
console.log('PASS registered controls, removable scope, reset, query-preserving recovery, export and retained selection');

function expectedAfterTag(tag){
 const state=app.getState(),tags=[...new Set([...state.tags,tag])],excluded=state.excludedTags.filter(t=>t!==tag);
 return catalogue.markers.filter(m=>!excluded.some(t=>m.tags.includes(t))&&(state.tagMode==='all'?tags.every(t=>m.tags.includes(t)):tags.some(t=>m.tags.includes(t)))).length;
}
for(const tagMode of ['all','any'])for(const excludedTags of [[],['damage'],['stress','damage']]){
 reset();filter({tagMode,tags:['cycle'],excludedTags});
 for(const tag of ['cycle','stress','damage'])assert.equal(app.filteredCount('tags',tag),expectedAfterTag(tag),JSON.stringify({tagMode,excludedTags,tag}));
}
reset();filter({phases:['G1'],sources:['study'],condition:'heat'});assert.equal(app.filteredCount('grades','A'),0,'Facet counts do not join phase and condition from different evidence rows');
reset();filter({annotationRelation:'used_as_scRNA_marker_for'});assert(!ids().includes('d'),'Functional annotation remains distinct from explicit annotation evidence');
reset();app.filteredCount('phases','G1');const readsAfterGroup=evidenceReads;app.filteredCount('phases','S');app.filteredCount('phases','G2');assert.equal(evidenceReads,readsAfterGroup,'Additional options in one facet reuse its traversal');
filter({selectedOnly:true});assert.equal(app.filteredCount('phases','G1'),1);plan.markers=[{id:'c'}];assert.equal(app.filteredCount('phases','G1'),0);assert.equal(app.filteredCount('phases','S'),1,'Plan selection changes invalidate conditional counts');
plan.markers=[];reset();app.filteredCount('phases','G1');trackedEvidence.push(ev('M'));app.rebuildIndex();assert.equal(app.filteredCount('phases','M'),1,'Explicit index rebuild invalidates counts and identities');
console.log('PASS prospective AND/OR counts, include/exclude transitions, evidence coherence and cached facet invalidation');

const scopeLabels={zh:'检索范围',en:'Search scope',fr:'Portée de la recherche',es:'Ámbito de búsqueda',eu:'Bilaketa-eremua'};
for(const lang of Object.keys(scopeLabels)){
 language=lang;reset();filter({q:'GAL1',searchMode:'exact'});const html=test.catalogue();
 assert(html.includes(scopeLabels[lang]));assert(html.includes('data-mw-value="searchMode"'));assert(html.includes('aria-describedby="mw-search-help"'));assert(html.includes('data-match="identityExact"'));assert(!html.includes('undefined'));
 if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(window.YV_MARKER_TEXT('tagCountHelp',lang)));
 filter({q:'not-a-gene-v25'});const empty=test.catalogue();assert(empty.includes('mw-empty-help'));assert(empty.includes('data-mw="broaden-search"'));
}
console.log('PASS five-language search, semantic match labels, filter explanations and actionable empty results');

const header=JSON.parse(fs.readFileSync(path.join(root,'dist/data/markers.json'),'utf8')),full=[];
for(const filename of fs.readdirSync(path.join(root,'dist/data/markers')).filter(name=>name.endsWith('.json'))){const shard=JSON.parse(fs.readFileSync(path.join(root,'dist/data/markers',filename),'utf8'));full.push(...(Array.isArray(shard)?shard:shard.markers||[]));}
catalogue={...header,markers:full};language='en';reset();filter({q:'CLN2'});
const cln2=full.find(m=>m.symbol==='CLN2');assert(cln2);assert.equal(ids()[0],cln2.id,'The real CLN2 record comes first');
filter({q:cln2.systematic,searchMode:'exact'});assert(ids().includes(cln2.id));filter({q:cln2.id});assert(ids().includes(cln2.id));
for(const alias of cln2.aliases||[]){filter({q:alias});assert(ids().includes(cln2.id));}
reset();const selectedTags=cln2.tags.filter(t=>t!=='核心整理种子').slice(0,2);assert.equal(selectedTags.length,2);
filter({tags:selectedTags,tagMode:'all'});const intersection=ids();filter({tagMode:'any'});const union=ids();assert(intersection.every(id=>union.includes(id)));
for(const tagMode of ['all','any']){
 filter({tags:[selectedTags[0]],tagMode});const expected=full.filter(m=>tagMode==='all'?selectedTags.every(t=>m.tags.includes(t)):selectedTags.some(t=>m.tags.includes(t))).length;
 assert.equal(app.filteredCount('tags',selectedTags[1]),expected,'Real catalogue counts predict the actual boolean combination');
}
reset();filter({condition:'NaCl',direction:'higher'});const expectedNaCl=full.filter(m=>m.evidence.some(e=>String(e.sourceCondition||'').toLowerCase().includes('nacl')&&e.sourceDirection==='higher')).map(m=>m.id);assert.deepEqual(sorted(ids()),sorted(expectedNaCl));
reset();const began=performance.now(),html=test.catalogue(),renderMs=performance.now()-began;assert(html.includes('CLN2')||html.includes('mw-marker-card'));
console.log('PASS real catalogue regression',JSON.stringify({genes:full.length,NaClHigher:expectedNaCl.length,CLN2:cln2.id,CLN2Systematic:cln2.systematic,catalogueRenderMs:Math.round(renderMs)}));


// Real entry changes must preserve search and assignments, clear incompatible
// evidence filters, and classify source assay rather than upgrading functional GO.
reset();filter({browseScope:'annotation'});
const goOnly=full.find(m=>m.evidence.length&&m.evidence.every(e=>['GO_annotations','GO_slim_function','curated_function','function_or_state_association','regulates_process'].includes(e.relation)));
assert(goOnly);assert(!ids().includes(goOnly.id));
plan.markers=[{id:goOnly.id}];filter({q:goOnly.symbol,searchMode:'exact',phases:['G1'],sources:['spellman1998'],tags:['old incompatible tag']});
click('browse-scope',null,'function');assert.equal(app.getState().q,goOnly.symbol);assert.equal(app.getState().searchMode,'exact');assert.equal(app.getState().phases.length,0);assert.equal(app.getState().sources.length,0);assert.equal(app.getState().tags.length,0);assert.equal(app.getState().scopeNotice,true);assert.deepEqual(plan.markers,[{id:goOnly.id}]);assert(ids().includes(goOnly.id));
click('reset');assert.equal(app.getState().browseScope,'function');assert.deepEqual(plan.markers,[{id:goOnly.id}]);
click('browse-scope',null,'annotation');
const spellman=full.find(m=>m.evidence.some(e=>e.sourceId==='spellman1998'&&e.relation==='RNA_peak_in'));
assert(spellman);filter({q:spellman.systematic,searchMode:'exact',sources:['spellman1998']});assert(ids().includes(spellman.id),'Classic bulk cycle evidence remains available in the default entry');
change('evidencePurpose','rnaReference');filter({sources:['spellman1998']});assert(ids().includes(spellman.id));
change('evidencePurpose','authorPanel');filter({sources:['spellman1998']});assert.equal(ids().length,0,'Bulk cycle peaks never become an author annotation panel');
reset();filter({browseScope:'annotation',evidencePurpose:'authorPanel',sources:['gasch2017_s8']});
// The imported author panel has its own source id; find it from the real relation.
const authorSource=full.flatMap(m=>m.evidence).find(e=>e.annotationUse==='author_annotation_panel_member')?.sourceId;
assert(authorSource);filter({sources:[authorSource]});const authorGenes=ids();assert(authorGenes.length);assert(authorGenes.every(id=>full.find(m=>m.id===id).evidence.some(e=>e.sourceId===authorSource&&e.relation==='used_as_scRNA_marker_for')));
reset();filter({browseScope:'annotation',evidencePurpose:'rnaModules',sources:['jariani2020_s3']});assert(ids().length,'Jariani scRNA BEAM modules are not classified as bulk reference');
reset();filter({browseScope:'annotation',evidencePurpose:'heterogeneity'});assert(ids().length);assert(test.catalogue().includes('not state-marker evidence'));
filter({q:'CLN2'});const before=app.exportData().candidateQuery.filters;assert.equal(before.browseScope,'annotation');assert.equal(before.evidencePurpose,'heterogeneity');
for(const lang of ['zh','en','fr','es','eu']){language=lang;const html=test.catalogue();assert(html.includes('data-mw="browse-scope"'));assert(!html.includes('undefined'));assert(!window.YV_MARKER_TEXT('browse_annotation',lang).startsWith('browse_'));}
plan.markers=[];language='en';console.log('PASS real annotation/function/all entry controls, bulk reference boundaries, author panels, BEAM modules, heterogeneity and five-language exports');

reset();filter({browseScope:'annotation',sources:['greenlaw2024_s2']});assert.equal(ids().length,0,'Bulk stabilization/degradation classes are not annotation panels');
filter({browseScope:'all'});assert(ids().length>0,'Mechanistic RNA reference remains accessible in all evidence');
reset();filter({browseScope:'annotation',sources:['teste2009']});assert.equal(ids().length,0,'qPCR reference-gene stability is not state annotation evidence');
filter({browseScope:'all'});assert(ids().length>0,'Reference-gene stability remains available in all evidence');
reset();filter({browseScope:'annotation'});console.log('PASS annotation whitelist excludes mechanistic bulk RNA and qPCR normalization references',JSON.stringify(test.libraryCounts()));

const sourcePhaseRows=full.flatMap(m=>m.evidence.filter(e=>Array.isArray(e.sourcePhases)&&e.sourcePhases.length).map(e=>({m,e})));
const gaschPhases=sourcePhaseRows.filter(({e})=>e.sourceId.includes('gasch'));
assert.equal(gaschPhases.length,33,'The imported Gasch source assigns 33 explicit phase relationships');
for(const phase of ['G1','S','M/G1']){
 const expected=gaschPhases.filter(({e})=>e.sourcePhases.includes(phase)),sourceId=expected[0].e.sourceId;
 reset();filter({browseScope:'annotation',sources:[sourceId],phases:[phase]});
 assert.deepEqual(sorted(ids()),sorted([...new Set(expected.map(({m})=>m.id))]),'Source phases are available in the same-evidence phase/source filters');
}
reset();filter({browseScope:'annotation',sources:[gaschPhases[0].e.sourceId],phases:['G2/M']});assert.equal(ids().length,0,'Functional DNA-replication labels do not invent a phase');
console.log('PASS 33 explicit Gasch source-phase relationships and no invented phase for functional groups');

const sc3Record=full.find(m=>m.phases.length&&m.evidence.some(e=>e.sourceId.includes('urbonaite')&&e.annotationUse==='contextual_cluster_marker_candidate'));
assert(sc3Record);const sc3Source=sc3Record.evidence.find(e=>e.sourceId.includes('urbonaite')&&e.annotationUse==='contextual_cluster_marker_candidate').sourceId;
reset();filter({browseScope:'annotation',sources:[sc3Source],q:sc3Record.systematic,searchMode:'exact'});assert(ids().includes(sc3Record.id));
const phaseRow=test.card(sc3Record).match(/<div class="mw-phase-row">(.*?)<\/div>/)?.[1];assert(phaseRow);assert(phaseRow.includes('Current evidence phase'));assert(phaseRow.includes('Not specified'));assert(!phaseRow.includes(sc3Record.phases.join(' · ')),'SC3 evidence cannot inherit a phase from another source');
console.log('PASS scoped card phases come only from matching evidence, with explicit unspecified state');
