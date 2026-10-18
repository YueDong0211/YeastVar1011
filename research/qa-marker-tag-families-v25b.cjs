'use strict';
// Pure Node VM: shipped UI functions/events, real catalogue and proposal provenance.
// No browser, network, user storage or production data writes.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
const proposal=JSON.parse(read('research/v25b-marker-proposals.json'));
const header=JSON.parse(read('dist/data/markers.json'));
assert.deepEqual(header.tagFamilies,proposal.tagFamilies,'The production header must ship the exact mappings, not a test-only replacement');
assert.deepEqual(header.tagFamilyEvidence,proposal.tagFamilyEvidence,'Production retains the mapping provenance');
const genes=fs.readdirSync(path.join(root,'dist/data/markers')).filter(f=>f.endsWith('.json')).flatMap(f=>{
 const x=JSON.parse(read('dist/data/markers/'+f));return Array.isArray(x)?x:x.markers||[];
});
const digest=()=>crypto.createHash('sha256').update(JSON.stringify(genes)).digest('hex'),before=digest();
let catalogue={...header,markers:genes},language='en',refreshes=0;
const plan={markers:[]},handlers={},plain=x=>JSON.parse(JSON.stringify(x));
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const maps={marker:new Map(genes.map(m=>[m.id,m])),source:new Map(header.sources.map(s=>[s.id,s]))};
const window={addEventListener(){},YV_RESEARCH_ATLAS:{text:k=>k,markerUpdate:()=>''},YV_BUILDER:{getPlan:()=>plan}};
window.YV_APP={esc:escape,tx:value=>window.YV_TEXT?.[value]?.[language]||String(value??''),t:k=>k,prefs:()=>({language}),data:()=>({markers:catalogue}),maps:()=>maps};
const context={window,document:{addEventListener(t,fn){(handlers[t]||=[]).push(fn);},querySelector:()=>null},sessionStorage:{getItem:()=>null,setItem(){}},location:{hash:'#markers'},URLSearchParams,setTimeout,clearTimeout};
vm.runInNewContext(read('dist/marker-workspace-locales.js'),context);
vm.runInNewContext(read('dist/v25-marker-locales.js'),context);
vm.runInNewContext(read('dist/marker-workspace.js').replace('window.YV_MARKERS={',
 'window.__tagTest={familyMatches,tagChoice,filterPanel,resetFilters,setRefresh(fn){refresh=fn;}};window.YV_MARKERS={'),context);
const app=window.YV_MARKERS,test=window.__tagTest;test.setRefresh(()=>refreshes++);
const filter=patch=>app.setFilters(patch),ids=()=>Array.from(app.filterResults()).sort();
const family=(tag,key)=>{filter({tagFamily:key});return test.familyMatches(tag);};
const change=(dataset,value,checked=false)=>handlers.change.at(-1)({target:{dataset,value,checked,hasAttribute:()=>false}});
const reset=()=>{test.resetFilters();filter({browseScope:'all'});};
const knownTag=(source,condition)=>{
 const row=header.tagFamilyEvidence.find(e=>e.sourceId===source&&e.sourceCondition===condition);
 assert(row,'Missing real source mapping: '+source+' / '+condition);
 assert(genes.some(m=>m.evidence.some(e=>e.tag===row.tagId&&e.sourceId===source)),'Mapped tag must exist in real evidence');return row.tagId;
};

const nacl=knownTag('nadal2025_perturb_s3','NaCl');
const aas=knownTag('su2023_s4','AAS'),gs=knownTag('su2023_s5','GS');
const mpaOnly=knownTag('urbonaite2021_s6','MPA');
const mpa=header.tagFamilyEvidence.find(e=>e.sourceId==='urbonaite2021_s4'&&e.tagId.startsWith('MPA + guanine'))?.tagId;
assert(mpa,'MPA rescue-condition mapping exists');
const dmso=header.tagFamilyEvidence.find(e=>e.sourceId==='urbonaite2021_s4'&&e.tagId.startsWith('DMSO'))?.tagId;
assert(dmso,'DMSO mapping exists');
const histone=proposal.labelRecommendations[0].tagId;
assert(family(nacl,'familyStress'));assert(!family(nacl,'familyMetabolism'));
for(const tag of [aas,gs,mpaOnly,mpa]){assert(family(tag,'familyStress'));assert(family(tag,'familyMetabolism'));assert(!family(tag,'familyFunction'));}
for(const tag of [dmso,histone,'CLN2 · DNA复制 RNA注释组合（Gasch 2017）']){
 assert.deepEqual(header.tagFamilies[tag],[]);
 for(const key of proposal.tagFamilyVocabulary)assert(!family(tag,key),'Explicit empty map must block '+key+' for '+tag);
 assert(family(tag,'familyAll'),'Unclassified tags remain available in All');
}
console.log('PASS exact NaCl, AAS, GS and MPA families; explicit-empty DMSO, histone and DNA-panel overrides');

// Only absent own keys use the legacy compatibility path, including an older header.
const fallbackTag='兼容旧版热应激功能';assert(!Object.hasOwn(header.tagFamilies,fallbackTag));
assert(family(fallbackTag,'familyStress'));assert(family(fallbackTag,'familyFunction'));
catalogue={...catalogue,tagFamilies:{...header.tagFamilies,[fallbackTag]:[]}};
assert(!family(fallbackTag,'familyStress'));assert(!family(fallbackTag,'familyFunction'));assert(family(fallbackTag,'familyAll'));
const inherited=Object.create({[fallbackTag]:[]});catalogue={...catalogue,tagFamilies:inherited};
assert(family(fallbackTag,'familyStress'),'Inherited keys do not become explicit mappings');
catalogue={...header,markers:genes};delete catalogue.tagFamilies;
assert(family(fallbackTag,'familyStress'),'Older catalogues without a map remain supported');
catalogue={...header,markers:genes};
console.log('PASS absent-key legacy fallback, own-key semantics and explicit-empty suppression');

const newTags=[...new Set([...proposal.rnaCandidates,...proposal.auxiliaryQcCandidates].map(c=>c.evidence.tag))];
for(const tag of newTags){
 assert(genes.some(m=>m.evidence.some(e=>e.tag===tag)),'New tag must ship in actual catalogue: '+tag);
 for(const lang of ['zh','en','fr','es','eu']){
  const label=window.YV_TEXT[tag]?.[lang];assert.equal(typeof label,'string');assert(label.trim());
  if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(label),'Non-Chinese label must not fall back to the canonical Chinese tag');
 }
}
const cwp2=genes.find(m=>m.symbol==='CWP2');assert(cwp2);
const histoneEvidence=cwp2.evidence.find(e=>e.sourceId==='gasch2017_s3'&&e.tag===histone);assert(histoneEvidence);
assert(histoneEvidence.sourcePhases.includes('S'));assert.equal(histoneEvidence.directStateMarker,false);
assert.equal(window.YV_TEXT[histone].zh,proposal.labelRecommendations[0].displayZh);
assert.match(window.YV_TEXT[histone].en,/Histone coexpression cluster/);
assert.match(window.YV_TEXT[histone].fr,/coexpression/);assert.match(window.YV_TEXT[histone].es,/coexpresión/);assert.match(window.YV_TEXT[histone].eu,/koadierazpen/);
console.log('PASS all four new RNA/QC labels and five-language histone coexpression wording');

reset();change({mwFilter:'tags'},histone,true);
const expected=ids();assert(expected.includes(cwp2.id));assert(expected.length>0);
plan.markers=[{id:cwp2.id,groups:['S'],purposes:['annotation'],role:'include',evidenceSources:[],rationale:''}];
const originalPlan=plain(plan);
for(const lang of ['zh','en','fr','es','eu']){
 language=lang;
 const label=window.YV_TEXT[histone][lang],html=test.tagChoice(histone);
 assert(html.includes(escape(label)));assert(html.includes('value="'+escape(histone)+'"'));
 for(const tag of newTags){const tagHTML=test.tagChoice(tag);assert(tagHTML.includes(escape(window.YV_TEXT[tag][lang])));assert(tagHTML.includes('value="'+escape(tag)+'"'));}
 assert.deepEqual(ids(),expected,'Translation must not affect selected gene identities');
 change({mwValue:'tagFamily'},'familyFunction');assert(!test.familyMatches(histone));
 assert.deepEqual(plain(app.getState().tags),[histone],'Navigating another family retains the selected canonical tag');
 assert.deepEqual(ids(),expected,'Family navigation changes available tag choices, not the applied selection');
 change({mwValue:'tagFamily'},'familyAll');
 const exported=app.exportData();assert.deepEqual(plain(exported.candidateQuery.filters.tags),[histone]);
 assert.equal(exported.records[0].reference.id,cwp2.id);assert(exported.records[0].reference.evidence.some(e=>e.tag===histone));
 assert.deepEqual(plain(plan),originalPlan);
}
language='en';filter({tagQ:window.YV_TEXT[histone].en,tagFamily:'familyAll'});
assert(test.filterPanel().includes('value="'+escape(histone)+'"'),'Translated label search yields the unchanged canonical tag control');
assert(refreshes>0);assert.equal(digest(),before,'Navigation and translation never mutate real gene/evidence data');
console.log('PASS five-language checkbox/search/export identity, retained selection and immutable source evidence');
console.log(JSON.stringify({genes:genes.length,mappings:Object.keys(header.tagFamilies).length,newTags:newTags.length,histoneGenes:expected.length}));
