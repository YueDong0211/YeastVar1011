'use strict';
// Node VM only: shipped parser/event handlers, real catalogue, in-memory plan storage.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,'dist',file),'utf8');
const header=JSON.parse(read('data/markers.json'));
const genes=fs.readdirSync(path.join(root,'dist/data/markers')).filter(file=>file.endsWith('.json')).flatMap(file=>{
 const shard=JSON.parse(read('data/markers/'+file));return Array.isArray(shard)?shard:shard.markers||[];
});
const cln2=genes.find(g=>g.symbol==='CLN2'),clb2=genes.find(g=>g.symbol==='CLB2');
assert(cln2&&clb2);
let language='en',download,pasted='',toasts=[],refreshes=0;
const seed={schema:'yeastvar1011-plan-v2',title:'Import regression',objective:'',projects:[],resultSpecificationIds:[],stages:[],tools:[],metrics:[],markers:[],edges:[],availableData:['raw_fastq'],inputRoute:'auto',parameters:{}};
const storage=new Map([['yv.plan.v2',JSON.stringify(seed)]]),handlers={};
const data={markers:{...header,markers:genes},categories:{dataRequirements:[{id:'raw_fastq'}]},projects:{projects:[],resultSpecifications:[]},workflow:{steps:[],tools:[],metrics:[]}};
const maps={marker:new Map(genes.map(g=>[g.id,g])),source:new Map(header.sources.map(s=>[s.id,s])),step:new Map(),tool:new Map(),metric:new Map(),formula:new Map()};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const app={data:()=>data,maps:()=>maps,prefs:()=>({language}),esc,tx:v=>v,t:k=>k,render(){},syncMarkers(){},toast:v=>toasts.push(v),download:(name,text)=>download={name,text},route:()=> 'markers'};
const context={URLSearchParams,setTimeout,clearTimeout,location:{hash:'#markers?view=importTab'},
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
 sessionStorage:{getItem:()=>null,setItem(){}},CustomEvent:class{constructor(type){this.type=type;}},
 document:{addEventListener(type,fn){(handlers[type]||=[]).push(fn);},querySelector:()=>null,getElementById:()=>({value:pasted})},
 window:{YV_APP:app,YV_BUILD_TEXT:k=>k,YV_RESEARCH_ATLAS:{text:k=>k},addEventListener(){},dispatchEvent(){}}
};
vm.runInNewContext(read('builder.js'),context);
const builder=context.window.YV_BUILDER;builder.init(app);
vm.runInNewContext(read('marker-workspace-locales.js'),context);
vm.runInNewContext(read('marker-workspace.js').replace('window.YV_MARKERS={',
 'window.__importTest={exportTSV,importPage,setRefresh(fn){refresh=fn;}};window.YV_MARKERS={'),context);
const markers=context.window.YV_MARKERS,test=context.window.__importTest;test.setRefresh(()=>refreshes++);
const plain=x=>JSON.parse(JSON.stringify(x)),ids=x=>Array.from(x.rows,row=>row.id);
const click=action=>handlers.click.at(-1)({target:{closest:()=>({dataset:{mw:action}})}});
const edit=text=>handlers.input.at(-1)({target:{id:'mw-import-text',value:text}});
const fileChange=file=>handlers.change.at(-1)({target:{id:'mw-import-file',dataset:{},files:[file],hasAttribute:()=>false}});
const file=text=>({size:Buffer.byteLength(text),text:async()=>text});
async function main(){
 const list=markers.importData('CLN2\n'+clb2.systematic+'\n'+cln2.id+'\nUNKNOWN_GENE');
 assert.deepEqual(ids(list),[cln2.id,clb2.id]);assert.equal(list.duplicate,1);assert.deepEqual(plain(list.unresolved),['UNKNOWN_GENE']);
 assert.deepEqual(ids(markers.importData('CLN2, CLB2;'+cln2.id)),[cln2.id,clb2.id]);
 assert.deepEqual(ids(markers.importData('CLN2 CLB2,'+cln2.id)),[cln2.id,clb2.id]);
 assert.deepEqual(ids(markers.importData('CLN2\tCLB2\n'+cln2.id+'\t'+clb2.id)),[cln2.id,clb2.id],'Headerless identifier-only lists remain supported');
 assert.deepEqual(ids(markers.importData('ＣＬＮ２，CLB2')),[cln2.id,clb2.id]);
 console.log('PASS plain lists, repeated identifiers, unknown names, tab/comma separators and full-width text');

 builder.setMarkers([cln2.id],true,false);
 builder.updateMarker(cln2.id,{role:'exclude',groups:['G1'],purposes:['conditioning'],rationale:'Compared with CLB2',userTags:['preserve decision']},false);
 test.exportTSV();const tsv=download.text,before=plain(builder.getPlan().markers);
 const table=markers.importData(tsv);
 assert.deepEqual(ids(table),[cln2.id],'A gene mentioned only in rationale never becomes an imported candidate');
 assert.equal(table.duplicate,0,'Several matching identity columns represent one row');
 assert.deepEqual(plain(table.table.identifierColumns),['symbol','systematic','sgd_id']);
 assert.equal(table.rows[0].role,undefined,'Tables deliberately import identity only');
 assert.deepEqual(plain(builder.getPlan().markers),before,'Preview is read-only');
 markers.importData(tsv,{apply:true});
 assert.deepEqual(plain(builder.getPlan().markers),before,'Identifier-only table import preserves existing role, group, rationale and tags');
 const panel=markers.exportData();builder.setMarkers([cln2.id],false,false);
 markers.importData(JSON.stringify(panel),{apply:true});
 assert.deepEqual(plain(builder.getPlan().markers),before,'Panel JSON still restores complete assignments');
 console.log('PASS own exported TSV reads only identity columns; JSON retains complete panel round-trip');

 const csv='\uFEFF"Gene Symbol","SGD ID","rationale"\r\n"CLN2","'+cln2.id+'","Compared with ""CLB2"", then\nCLB2 again"\r\n"CLB2","'+clb2.id+'","CLN2"\r\n';
 assert.deepEqual(ids(markers.importData(csv)),[cln2.id,clb2.id]);
 assert.deepEqual(ids(markers.importData('Gene Name;Systematic ORF;notes\nCLN2;'+cln2.systematic+';CLB2')),[cln2.id]);
 assert.deepEqual(ids(markers.importData('symbol\nCLN2\nCLB2')),[cln2.id,clb2.id]);
 for(const name of ['gene_id','SGD ID','Systematic name','基因名称','nom du gène','nombre de gen','gene-identifikatzailea']){
  const value=/systematic/i.test(name)?cln2.systematic:/id/i.test(name)?cln2.id:cln2.symbol;
  assert.deepEqual(ids(markers.importData(name+'\tdescription\n'+value+'\tCLB2')),[cln2.id],name);
 }
 const conflict=markers.importData('symbol,sgd_id,rationale\nCLN2,'+clb2.id+',CLN2\nCLB2,'+clb2.id+',CLN2');
 assert.deepEqual(ids(conflict),[clb2.id]);assert.equal(conflict.conflicts.length,1);assert.equal(conflict.unresolved.length,1);
 assert.throws(()=>markers.importData('condition,rationale\ncontrol,CLN2'),/importNoIdentifier/);
 assert.throws(()=>markers.importData('mean,detection\nCLN2,0.3'),/importNoIdentifier/);
 assert.throws(()=>markers.importData('rationale\nCLN2'),/importNoIdentifier/);
 assert.throws(()=>markers.importData('CLN2\tCompared with CLB2'),/importNoIdentifier/,'A headerless table with prose must not be mined for extra genes');
 assert.throws(()=>markers.importData('CLN2\tcontrol\nCLB2\tCompared with CLN2'),/importNoIdentifier/);
 assert.throws(()=>markers.importData('symbol,rationale\n"CLN2,unfinished'),/importMalformedTable/);
 assert.throws(()=>markers.importData('symbol,rationale\nCLN2,foo,CLB2'),/importMalformedTable/);
 assert.throws(()=>markers.importData('symbol,rationale\n"CLN2"x,CLB2'),/importMalformedTable/);
 console.log('PASS quoted multiline CSV, semicolon CSV, localized headers, identity conflicts and malformed/no-ID tables');

 for(const lang of ['zh','en','fr','es','eu']){
  language=lang;
  edit('');
  const empty=test.importPage(),help=markers.text('importHelp'),pending=markers.text('importPending');
  assert.equal(empty.split(help).length-1,1,'Supported formats appear once, not again in the empty preview');
  assert.equal(empty.split(pending).length-1,1);assert.notEqual(pending,help);
  assert(empty.includes('for="mw-import-text"'));assert(empty.includes('<span>'+markers.text('paste')+'</span>'));
  assert(empty.includes('aria-describedby="mw-import-rules"'));assert(empty.includes('id="mw-import-rules"'));
  assert(!empty.match(/<textarea id="mw-import-text"[^>]*placeholder=/),'The visible label is not repeated in a placeholder');
  assert.equal(empty.split(markers.text('importBoundary')).length-1,1);
  pasted='symbol,rationale\nCLN2,CLB2';click('resolve');
  let html=test.importPage();assert(html.includes('symbol'));assert(html.includes(markers.text('importTableOnly')));assert(html.includes('data-mw="apply-import"'));
  const retained=plain(builder.getPlan().markers);
  await fileChange(file('condition,rationale\ncontrol,CLB2'));
  assert.equal(markers.getState().resolved,null);assert.equal(markers.getState().importError,'importNoIdentifier');
  html=test.importPage();assert(html.includes('role="alert"'));assert(html.includes(markers.text('importNoIdentifier')));assert(!html.includes('data-mw="apply-import"'));
  click('apply-import');assert.deepEqual(plain(builder.getPlan().markers),retained,'A failed new file cannot apply an older reviewed list');
  for(const key of ['importHelp','importPending','paste','importBoundary','importTableOnly','importIdentifierColumns','importNoIdentifier','importMalformedTable','importConflicts']){
   const translated=markers.text(key);assert(translated&&translated!==key,lang+' '+key);
   if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(translated));
  }
  edit('CLN2');assert.equal(markers.getState().importError,'');
 }
 console.log('PASS five-language concise import copy, associated label/rules and preview/error feedback; failed uploads invalidate previous reviewed candidates');

 language='en';pasted='CLN2';click('resolve');
 let release;const pending=fileChange({size:10,text:()=>new Promise(resolve=>release=resolve)});
 assert.equal(markers.getState().resolved,null,'Starting a file read immediately disables the previous reviewed result');
 edit('CLB2');release('symbol\nCLN2');await pending;
 assert.equal(markers.getState().importText,'CLB2','A late file read cannot overwrite a newer typed draft');
 assert.equal(markers.getState().resolved,null);
 let releaseFirst;const first=fileChange({size:10,text:()=>new Promise(resolve=>releaseFirst=resolve)});
 await fileChange(file('symbol\nCLB2'));releaseFirst('symbol\nCLN2');await first;
 assert.deepEqual(ids(markers.getState().resolved),[clb2.id],'The most recently chosen file wins');
 assert(refreshes>0);
 console.log('PASS pending-read invalidation and overlapping file-read ordering');
 console.log('PASS marker import regression; real catalogue records: '+genes.length);
}
main().catch(error=>{console.error(error);process.exitCode=1;});

