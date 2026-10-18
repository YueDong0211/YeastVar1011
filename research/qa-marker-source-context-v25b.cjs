'use strict';
// Real source records rendered by the shared metadata component; no browser or user storage.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
const header=JSON.parse(read('dist/data/markers.json'));
const markers=header.shards.flatMap(file=>JSON.parse(read('dist/data/'+file)));
let language='zh';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context={window:{addEventListener(){},YV_APP:{prefs:()=>({language}),esc,tx:v=>v}},document:{addEventListener(){}}};
vm.runInNewContext(read('dist/marker-preview-v13.js'),context);
const preview=context.window.YV_MARKER_PREVIEW;
const gre1=markers.find(m=>m.symbol==='GRE1');
const quiet=gre1.evidence.find(e=>e.sourceId==='baquero2025_sc_q');
assert.equal(quiet.sourceDetectionBound.value,99);
for(const lang of ['zh','en','fr','es','eu']){
 language=lang;
 const values=preview.sourceMetadataValues(quiet,lang),html=preview.sourceMetadata(quiet,lang);
 assert.match(values.sourceDetectionBound,/^> 99 /);
 assert.equal(values.detectionPopulation,quiet.sourceDetectionBound.denominator);
 assert.match(values.sourceLocator,/Figure 3C/);
 assert(html.includes('&gt; 99 percent of source 6d-HD cells'));
 assert(!html.includes('undefined'));
 for(const key of ['sourceLocator','sourceDetectionBound','detectionPopulation'])assert.notEqual(preview.text(key,lang),key);
}
const added=markers.flatMap(m=>m.evidence).filter(e=>e.addedIn==='v25b');
for(const e of added.filter(e=>e.directionContext)){
 const v=preview.sourceMetadataValues(e,'en');
 assert.match(v.directionContext,/control replicate 1/);
 assert.match(v.contrast,/control replicate 1/);
 assert.equal(e.sourceDirection,'higher');
}
assert.equal(gre1.expression.mean,null);
assert.equal(gre1.expression.detection,null);
assert.equal(gre1.expression.rank,null);
const missing=preview.sourceMetadataValues({sourceDetectionBound:{operator:'>',value:null}},'en');
assert.equal(missing.sourceDetectionBound,undefined);
console.log('PASS source figure/paragraph, lower-bound denominator and exact comparison remain visible in all five languages; project measurements remain untouched.');
