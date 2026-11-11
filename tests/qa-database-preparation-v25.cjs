'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),handlers={},storage=new Map(),nodes=new Map(),downloads=[];
let language='en',network=0;
const document={addEventListener:(key,fn)=>handlers[key]=fn,querySelector(selector){if(!nodes.has(selector))nodes.set(selector,{innerHTML:'',textContent:'',value:'',querySelector:s=>document.querySelector(s)});return nodes.get(selector);}};
const window={YV_APP:{prefs:()=>({language}),data:()=>({markers:{updated:'fixture',markers:[],sources:[]}}),download:(name,value)=>downloads.push({name,value:JSON.parse(value)})}};
const context=vm.createContext({window,document,URL,Date,sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},fetch:()=>{network++;throw Error('Unexpected fetch');}});
for(const file of ['database-resources-v25.js','database-hub-v24.js'])vm.runInContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),context);
const api=window.YV_DATABASE_HUB,resources=api.resources();
assert.equal(resources.length,19);assert.equal(new Set(resources.map(r=>r.id)).size,19);
assert.deepEqual(Array.from(api.filtered({scope:'comparison'}),r=>r.id),['pombase','cellxgene','scperturb']);
assert(api.filtered({scope:'yeast'}).some(r=>r.id==='haplo1011'));assert(!api.filtered({scope:'yeast'}).some(r=>r.id==='cellxgene'));
assert.equal(api.filtered({q:'BiPCA'}).length,0);assert.equal(api.filtered({q:'is_primary_data'})[0].id,'cellxgene');
assert.deepEqual(Array.from(api.filtered({q:'TF'}),r=>r.id),['yeastract','jaspar','yetfasco']);
for(const r of resources){assert(['yeast','multi','comparison'].includes(r.scope));assert(r.fields.length);for(const copy of [r.use,r.limit]){assert.equal(copy.length,5);assert(copy.every(v=>typeof v==='string'&&v.trim().length>0));}for(const url of [r.url,r.docs,...(r.links||[]).map(x=>x[1])])assert.equal(new URL(url).protocol,'https:');}
console.log('PASS 19 sourced resources, species scope, exact acronym search and five-language interpretation fields');
const change=(id,checked)=>handlers.change({target:{dataset:{db24Select:id},checked,closest:()=>({classList:{toggle(){}}})}});
const action=value=>handlers.click({target:{closest:selector=>selector==='[data-db24]'?{dataset:{db24:value}}:null}});
change('sgd',true);change('cellxgene',true);change('not-a-resource',true);
assert.equal(api.preparationData().resources.length,2);assert.equal(JSON.parse(storage.get('yv.resources.selection.v25')).length,2);
handlers.change({target:{dataset:{db24Field:'scope'},value:'yeast'}});assert.equal(api.preparationData().resources.length,2,'Scope filtering must preserve selected comparison resources');
action('export');assert.equal(downloads.length,1);const exportValue=downloads[0].value;
assert.equal(exportValue.schema,'yeastvar-resource-preparation-v1');assert.equal(exportValue.resources.length,2);
for(const r of exportValue.resources){assert.equal(r.preparation.readyForAnalysis,false);assert.equal(r.preparation.downloadedFile,null);assert.equal(r.preparation.sourceRelease,null);assert(r.sourceLinks.length>=2);assert(r.fieldsToRetain.length);}
exportValue.resources[0].fieldsToRetain.push('changed');assert(!api.preparationData().resources[0].fieldsToRetain.includes('changed'),'Exports must not mutate live metadata');
action('reset');assert.equal(api.preparationData().resources.length,2);assert.equal(nodes.get('#db24-count').textContent,'19 / 19');
change('sgd',false);assert.equal(api.preparationData().resources.length,1);
handlers.click({target:{closest:selector=>selector==='[data-db24-remove]'?{dataset:{db24Remove:'cellxgene'}}:null}});assert.equal(api.preparationData().resources.length,0);
action('export');assert.equal(downloads.length,1,'Empty lists should not download misleading empty files');
change('pombase',true);action('clear');assert.equal(api.preparationData().resources.length,0);assert.equal(storage.get('yv.resources.selection.v25'),'[]');
console.log('PASS real delegated selection/filter/reset/remove/export behavior, session retention, immutable exports and no false data readiness');
for(const lang of ['zh','en','fr','es','eu']){language=lang;const html=api.page();assert(!html.includes('undefined'));for(const id of ['q','purpose','status','scope']){assert(html.includes('id="db24-'+id+'"'));assert(html.includes('for="db24-'+id+'"'));}assert(html.includes(api.text('selected')));assert(html.includes('data-db24-select="cellxgene"'));}
assert.equal(network,0);console.log('PASS accessible labels in five languages and no network calls or gene uploads');
