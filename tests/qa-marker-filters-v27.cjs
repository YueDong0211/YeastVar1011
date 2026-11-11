'use strict';
// Production catalogue and production event handlers; no browser or user storage.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,'dist',file),'utf8');
const header=JSON.parse(read('data/markers.json'));
const markers=header.shards.flatMap(file=>{const data=JSON.parse(read('data/'+file));return Array.isArray(data)?data:data.markers;});
const catalogue={...header,markers},plan={markers:[]},handlers={},focus=[],refreshes=[];
const hash=()=>crypto.createHash('sha256').update(JSON.stringify(catalogue)).digest('hex'),originalHash=hash();
let language='en',domFacets=[],domOptions=[];
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const maps={marker:new Map(markers.map(m=>[m.id,m])),source:new Map(header.sources.map(s=>[s.id,s]))};
const context={URL,URLSearchParams,setTimeout,clearTimeout,sessionStorage:{getItem:()=>null,setItem(){}},location:{hash:'#markers'},document:{
  addEventListener(type,fn){(handlers[type]||=[]).push(fn);},querySelector:()=>null,
  querySelectorAll(selector){return selector==='#mw-filter-panel [data-mw-facet]'?domFacets:domOptions;}
},window:{addEventListener(){},YV_RESEARCH_ATLAS:{text:k=>k},YV_BUILDER:{getPlan:()=>plan}}};
context.window.YV_APP={prefs:()=>({language}),esc,t:k=>k,tx:value=>context.window.YV_TEXT?.[value]?.[language]??String(value??''),data:()=>({markers:catalogue}),maps:()=>maps};
const load=(file,transform=s=>s)=>vm.runInNewContext(transform(read(file)),context,{filename:file});
load('marker-selection-v25c.js');load('marker-workspace-locales.js');load('v25-marker-locales.js');
load('marker-workspace.js',s=>s.replace('window.YV_MARKERS={','window.__filterAudit={filterPanel,activeFilters,resetFilters,setRefresh(fn){refresh=fn;}};window.YV_MARKERS={'));
const W=context.window.YV_MARKERS,Q=context.window.__filterAudit,plain=v=>JSON.parse(JSON.stringify(v));
Q.setRefresh(id=>refreshes.push(id));
const click=(action,extra={})=>handlers.click.forEach(fn=>fn({target:{closest:()=>({dataset:{mw:action,...extra}})}}));
const toggle=target=>handlers.toggle.forEach(fn=>fn({target}));
const count=(html,key)=>(html.match(new RegExp('data-mw-filter="'+key+'"','g'))||[]).length;
const panel=()=>Q.filterPanel();
const reset=()=>{Q.resetFilters();W.setFilters({browseScope:'annotation',activeFacet:'phase'});domFacets=[];domOptions=[];focus.length=0;refreshes.length=0;};
let tests=0;
function test(name,fn){fn();tests++;console.log('PASS',name);}

test('Default cycle filter is immediately usable; six category buttons and exactly one content section',()=>{
  assert.equal(W.getState().activeFacet,'phase');reset();const html=panel();
  assert.equal(count(html,'phases'),7);assert.equal(count(html,'sources'),0);assert.equal(count(html,'tags'),0);
  assert.equal((html.match(/id="mw-facet-content"/g)||[]).length,1);assert.equal((html.match(/class="mw-filter-tab"/g)||[]).length,6);
  assert(html.includes('id="mw-facet-tab-phase" data-value="phase" aria-pressed="true"'));
  assert(!html.includes('name="mw-filter-facets"'));assert(!html.includes('role="tablist"'));
});

test('Real category and page handlers keep fixed eight-item pages with same-group keyboard focus',()=>{
  reset();click('facet-tab',{value:'sources'});let html=panel();assert.equal(count(html,'sources'),8);assert.equal(refreshes.at(-1),'mw-facet-tab-sources');
  const first=[...html.matchAll(/data-mw-filter="sources" value="([^"]+)"/g)].map(m=>m[1]);
  click('facet-page',{key:'sourcePage',value:'2'});html=panel();const second=[...html.matchAll(/data-mw-filter="sources" value="([^"]+)"/g)].map(m=>m[1]);assert.equal(second.length,8);assert(first.every(id=>!second.includes(id)));assert.equal(refreshes.at(-1),'mw-source-query');
  click('facet-tab',{value:'tags'});assert.equal(count(panel(),'tags'),8);click('facet-page',{key:'tagPage',value:'2'});assert.equal(count(panel(),'tags'),8);assert.equal(refreshes.at(-1),'mw-tag-query');
  click('facet-tab',{value:'sources'});assert.equal(W.getState().sourcePage,2);
});

test('Seventeen selected sources remain selected across capped pages and removable global chips',()=>{
  reset();const sources=header.sources.slice(-17).map(s=>s.id);W.setFilters({sources,activeFacet:'sources'});const before=plain(W.filterResults()),visibleSelected=new Set();
  for(let page=1;page<=3;page++){click('facet-page',{key:'sourcePage',value:String(page)});const html=panel();assert.equal(count(html,'sources'),8);for(const match of html.matchAll(/data-mw-filter="sources" value="([^"]+)" checked/g))visibleSelected.add(match[1]);assert.deepEqual(plain(W.filterResults()),before);}
  assert.deepEqual([...visibleSelected].sort(),[...sources].sort());assert.deepEqual(plain(W.getState().sources),sources);
  const chips=Q.activeFilters();for(const id of sources)assert(chips.includes('data-key="sources" data-value="'+esc(id)+'"'),id);
});

test('Source search narrows choices without changing selected evidence conditions or matching genes',()=>{
  reset();const chosen=header.sources.slice(0,3).map(s=>s.id);W.setFilters({sources:chosen,activeFacet:'sources'});const before=plain(W.filterResults());
  W.setFilters({sourceQ:'no-matching-source-record-xyz'});assert.equal(count(panel(),'sources'),0);assert.deepEqual(plain(W.filterResults()),before);assert.deepEqual(plain(W.getState().sources),chosen);
  W.setFilters({sourceQ:header.sources[0].id});assert(panel().includes('value="'+esc(header.sources[0].id)+'"'));assert.deepEqual(plain(W.filterResults()),before);
});

test('Category changes preserve every condition and render only the active section',()=>{
  reset();W.setFilters({sources:[header.sources[0].id],phases:['G1'],grades:['A']});const before=plain(W.filterResults()),conditions=plain(W.getState());
  for(const key of ['tags','sources','grade','hierarchy','advanced','phase']){click('facet-tab',{value:key});const html=panel();assert.equal(W.getState().activeFacet,key);assert(html.includes('data-mw-facet="'+key+'"'));assert.equal((html.match(/id="mw-facet-content"/g)||[]).length,1);assert.deepEqual(plain(W.filterResults()),before);for(const field of ['sources','phases','grades'])assert.deepEqual(plain(W.getState()[field]),conditions[field]);}
  W.setFilters({browseScope:'function',activeFacet:'phase'});const html=panel();assert.equal(W.getState().activeFacet,'hierarchy');assert(!html.includes('id="mw-facet-tab-phase"'));
});

test('All sources are reachable without accumulating rows; final next-page button is disabled',()=>{
  reset();W.setFilters({activeFacet:'sources'});const seen=new Set(),pages=Math.ceil(header.sources.length/8);
  for(let page=1;page<=pages;page++){click('facet-page',{key:'sourcePage',value:String(page)});const html=panel();assert(count(html,'sources')<=8);for(const match of html.matchAll(/data-mw-filter="sources" value="([^"]+)"/g))seen.add(match[1]);if(page===pages)assert(html.includes('data-key="sourcePage" data-value="'+(page+1)+'" disabled'));}
  assert.equal(seen.size,header.sources.length);assert.equal(refreshes.at(-1),'mw-source-query');
});

test('Five-language category labels are complete; reset clears page searches without mutating catalogue or plan',()=>{
  for(const value of ['zh','en','fr','es','eu']){language=value;for(const key of ['filterCategories','facetPhase','facetTags','facetSources','facetGrade','facetType','facetMore','detailedConditions','activeConditions','sourceSearch']){const text=W.text(key);assert(text&&text!==key,key+' '+value);if(value!=='zh')assert(!/[\u3400-\u9fff]/u.test(text),key+' '+value);}}
  W.setFilters({sourceQ:'query',tagQ:'query',sourcePage:4,tagPage:4});Q.resetFilters();assert.equal(W.getState().sourceQ,'');assert.equal(W.getState().tagQ,'');assert.equal(W.getState().sourcePage,1);assert.equal(W.getState().tagPage,1);assert.equal(hash(),originalHash);assert.deepEqual(plan,{markers:[]});
});
console.log(JSON.stringify({passed:tests,genes:markers.length,registeredSources:header.sources.length,browserUsed:false}));
