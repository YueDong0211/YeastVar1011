'use strict';
// Pure Node VM regression for plan/panel continuity. No browser, network, or user storage.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,'dist',file),'utf8');
const header=JSON.parse(read('data/markers.json'));
const genes=fs.readdirSync(path.join(root,'dist/data/markers')).filter(f=>f.endsWith('.json')).flatMap(file=>{
  const shard=JSON.parse(read('data/markers/'+file));return Array.isArray(shard)?shard:shard.markers||[];
});
const cln2=genes.find(g=>g.symbol==='CLN2'),clb2=genes.find(g=>g.symbol==='CLB2');
assert(cln2&&clb2,'Use real catalogue identities rather than guessed SGD identifiers');
let language='en',download;
const seed={schema:'yeastvar1011-plan-v2',title:'Continuity regression',objective:'',projects:[],resultSpecificationIds:[],
  stages:[],tools:[],metrics:[],markers:[],edges:[],availableData:['raw_fastq'],inputRoute:'auto',parameters:{}};
const disabled={id:'disabled-formula',name:'Saved but not selected',latex:'x+y',enabled:false};
const storage=new Map([['yv.plan.v2',JSON.stringify(seed)],['yv1011-lab-v1',JSON.stringify({schema:'yeastvar-lab/v1',formulas:[disabled],dataset:null})]]);
const maps={marker:new Map(genes.map(g=>[g.id,g])),source:new Map(header.sources.map(s=>[s.id,s])),
  tool:new Map(),step:new Map(),metric:new Map(),formula:new Map()};
const data={markers:{...header,markers:genes},categories:{dataRequirements:[{id:'raw_fastq'}]},
  projects:{projects:[],resultSpecifications:[]},workflow:{updated:'test',steps:[],tools:[],metrics:[]},literature:{papers:[]}};
const app={data:()=>data,maps:()=>maps,prefs:()=>({language}),syncMarkers(){},render(){},toast(){},
  download(name,text){download={name,text};},esc:v=>String(v??''),tx:v=>v,t:k=>k,field:(kind,r,key)=>r?.[key]||'',icon:()=>'',route:()=> 'markers'};
const inputs=()=>({inputs:[],rules:[],route:'raw_fastq'});
inputs.route=()=> 'raw_fastq';inputs.stageDependencies=()=>[];inputs.toolContext=(plan,tool)=>tool;
const context={URL,URLSearchParams,setTimeout,clearTimeout,queueMicrotask,
  location:{href:'https://example.org/',hash:'#markers'},
  localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)},
  sessionStorage:{getItem:()=>null,setItem(){}},
  CustomEvent:class{constructor(type){this.type=type;}},
  document:{currentScript:null,createElement:()=>({getContext:()=>({measureText:s=>({width:String(s).length*8})})}),addEventListener(){},querySelector:()=>null},
  window:{YV_BUILD_TEXT:key=>key,YV_APP:app,YV_INPUTS:inputs,addEventListener(){},dispatchEvent(){}}
};
const load=(file,transform=value=>value)=>vm.runInNewContext(transform(read(file)),context,{filename:file});
const plain=value=>JSON.parse(JSON.stringify(value));
load('lab.js');load('builder.js');
const builder=context.window.YV_BUILDER,lab=context.window.YV_LAB;builder.init(app);

builder.setMarkers([cln2.id,clb2.id],true,false);
const rationale='A'.repeat(4980)+'TAIL-MUST-BE-KEPT';
builder.updateMarker(cln2.id,{rationale,role:'exclude',groups:['G1'],purposes:['annotation']},false);
assert.equal(builder.getPlan().markers.find(m=>m.id===cln2.id).rationale,rationale);
builder.importPlan(builder.exported());
assert.equal(builder.getPlan().markers.find(m=>m.id===cln2.id).rationale,rationale,'Plan export/import preserves text accepted by the editor');
builder.updateMarker(cln2.id,{rationale:'B'.repeat(5000)},false);
assert.equal(builder.getPlan().markers.find(m=>m.id===cln2.id).rationale.length,5000,'The editor maximum remains supported');
console.log('PASS all 5000 supported rationale characters survive saving and plan round-trip');

assert.equal(lab.exportData().formulas.length,1);
assert.equal(builder.exported().extensions.lab,null,'An unused formula does not enter the publication plan');
builder.backup();
let backup=JSON.parse(download.text);
assert.equal(backup.extensions.lab.formulas.length,1);
assert.equal(backup.extensions.lab.formulas[0].enabled,false);
lab.importData({schema:'yeastvar-lab/v1',formulas:[],dataset:null},{merge:false});
assert.equal(lab.exportData().formulas.length,0);
builder.importPlan(backup);
assert.equal(lab.exportData().formulas[0].id,disabled.id,'The cleanup backup restores saved disabled content');
lab.importData({schema:'yeastvar-lab/v1',formulas:[disabled,{id:'enabled-formula',name:'Selected formula',enabled:true}],dataset:null},{merge:false});
assert.deepEqual(plain(builder.exported().extensions.lab.formulas.map(f=>f.id)),['enabled-formula']);
builder.backup();backup=JSON.parse(download.text);
assert.deepEqual(plain(backup.extensions.lab.formulas.map(f=>f.id)),['disabled-formula','enabled-formula']);
console.log('PASS backup preserves all lab formulas while research-plan exports retain only selected formulas');

builder.importPlan({...seed,markers:[{id:cln2.id,groups:['G1'],role:'exclude'},{id:clb2.id,groups:['S'],role:'include'}]});
load('plan-workbench.js',source=>source.replace('window.YV_PLAN={',
  'window.__continuity={markerPanel,setGroup(value){ui.markerGroup=value;}};window.YV_PLAN={'));
const panel=context.window.__continuity;
panel.setGroup('G1');
assert(panel.markerPanel().includes(cln2.symbol));assert(!panel.markerPanel().includes(clb2.symbol),'A valid filter still filters');
builder.setMarker(cln2.id,false);
const html=panel.markerPanel();
assert.equal(context.window.YV_PLAN.getState().markerGroup,'all');
assert(html.includes(clb2.symbol),'Deleting the last record in one group reveals remaining records');
assert(!html.includes('value="G1"'),'Removed group is not presented as a selectable filter');
assert(html.includes('value="S"'));
console.log('PASS removal of a final group member resets only the stale group filter');

load('guide.js');load('assistant-context-v24.js');load('research-assistant-v22.js');
const identity=genes.find(g=>(g.aliases||[]).some(alias=>/^[A-Za-z][A-Za-z0-9_-]{1,24}$/.test(alias)
  &&genes.filter(r=>[r.id,r.symbol,r.systematic,...(r.aliases||[])].some(v=>String(v).toUpperCase()===alias.toUpperCase())).length===1));
assert(identity,'Find a real unambiguous alias');
const alias=identity.aliases.find(alias=>/^[A-Za-z][A-Za-z0-9_-]{1,24}$/.test(alias)
  &&genes.filter(r=>[r.id,r.symbol,r.systematic,...(r.aliases||[])].some(v=>String(v).toUpperCase()===alias.toUpperCase())).length===1);
for(const lang of ['zh','en','fr','es','eu']){
  language=lang;
  for(const [query,id] of [[cln2.id,cln2.id],[cln2.id.toLowerCase(),cln2.id],[cln2.symbol,cln2.id],[cln2.systematic,cln2.id],[alias,identity.id]]){
    assert(context.window.YV_GUIDE.search(query).hits.some(h=>h.kind==='marker'&&h.id===id),lang+' guide identity: '+query);
    assert(context.window.YV_ASSISTANT_CONTEXT.retrieve(query).some(h=>h.kind==='marker'&&h.id===id),lang+' assistant identity: '+query);
    const adapter=context.window.YV_ASSISTANT_CONTEXT;delete context.window.YV_ASSISTANT_CONTEXT;
    try{assert(context.window.YV_RESEARCH_ASSISTANT.retrieve(query).some(h=>h.kind==='marker'&&h.id===id),lang+' fallback identity: '+query);}
    finally{context.window.YV_ASSISTANT_CONTEXT=adapter;}
  }
}
assert(!context.window.YV_ASSISTANT_CONTEXT.retrieve('S999999999').some(h=>h.kind==='marker'),'Unknown SGD identifiers are not substituted');
console.log('PASS symbol, ORF, SGD ID, case variants and a real alias resolve across all three search entry points in five languages');
console.log('PASS workflow continuity regression; catalogue records: '+genes.length);

