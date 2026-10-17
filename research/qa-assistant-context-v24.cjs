'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const contextCode=fs.readFileSync(path.resolve(__dirname,'../dist/assistant-context-v24.js'),'utf8');
const assistantCode=fs.readFileSync(path.resolve(__dirname,'../dist/research-assistant-v22.js'),'utf8');
const cases=[];
function test(name,run){cases.push({name,run});}
const translated=value=>typeof value==='string'?value:value?.zh||value?.en||'';
function fixture({route='overview',modelStatus='idle'}={}){
 const counters={getPlan:0,inputReview:0,mutations:0,close:0},events=new Map(),generations=[];
 const plan={title:'Research plan',objective:'A private research objective',projects:['noise_project'],stages:['noise'],tools:['starsolo'],metrics:['total_umi'],markers:[{id:'marker_cln2'}],availableData:['raw_fastq'],inputRoute:'auto',updated:'2026-10-17T00:00:00Z'};
 const requirements=[['raw_fastq','原始 FASTQ'],['library_structure','文库结构'],['reference','参考基因组'],['count_matrix','计数矩阵']].map(([id,title])=>({id,title:{zh:title,en:title}}));
 const markers=['CLN2','CLN1','CLB2','CDC28'].map((symbol,i)=>({id:'marker_'+symbol.toLowerCase(),symbol,systematic:['YPL256C','YMR199W','YPR119W','YBR160W'][i],aliases:[],phases:['G1/S'],evidence:[{relation:'cycle_association',tag:'G1/S',context:'Source-study cycle evidence',sourceUrl:'https://example.test/paper',sourceId:'source_cycle'}]}));
 const starsolo={id:'starsolo',name:'STARsolo',task:{zh:'定量单细胞转录组'},input:['raw_fastq','library_structure','reference'],limitations:[],parameters:[]};
 const catalogue={categories:{dataRequirements:requirements},markers:{markers},workflow:{steps:[{id:'design',title:{zh:'研究设计'}},{id:'noise',title:{zh:'表达噪音'}}],tools:[starsolo],metrics:[{id:'total_umi',name:{zh:'总 UMI'},definition:{zh:'每个细胞的 UMI 总数'}}]},projects:{projects:[{id:'noise_project',title:{zh:'表达噪音'},question:{zh:'表达变异是否改变'},inputs:['count_matrix']}]}};
 const review={route:'raw_fastq',inputs:[{id:'raw_fastq',status:'declared'},{id:'count_matrix',status:'planned-output',blockedBy:['library_structure','reference'],unresolved:['library_structure','reference']},{id:'library_structure',status:'prepare-resource'},{id:'reference',status:'prepare-resource'}]};
 const listeners=new Map(),nodes=new Map();
 const node=()=>({hidden:false,disabled:false,value:'',textContent:'',innerHTML:'',scrollTop:0,scrollHeight:100,clientHeight:100,attrs:{},focus(){this.focused=true;},setAttribute(k,v){this.attrs[k]=v;},toggleAttribute(k,v){this.attrs[k]=v;},matches(selector){return selector==='[data-lm22-form]';}});
 const root={...node(),isConnected:true,addEventListener(type,fn){const list=listeners.get(type)||[];list.push(fn);listeners.set(type,list);},querySelector(selector){if(!nodes.has(selector))nodes.set(selector,node());return nodes.get(selector);},querySelectorAll(){return[];}};
 const heading={textContent:'Current workspace',parentElement:{querySelector:()=>({textContent:'Catalogue help'})}};
 const document={querySelector:()=>heading};
 const location={hash:'#overview'};
 const model={state:()=>({status:modelStatus,progress:0,cached:false}),onState(fn){fn(this.state());return()=>{};},async generate(messages,options){generations.push(messages);options.onToken?.('A local explanation');return'A local explanation';},cancel(){},unload(){},load:async()=>{},clearCache:async()=>{}};
 const window={YV_APP:{data:()=>catalogue,prefs:()=>({language:'zh'}),tx:translated,field:(kind,record,key)=>translated(record?.[key]),route:()=>route,toast(){},openRecord(){}},YV_BUILDER:{getPlan(){counters.getPlan++;return JSON.parse(JSON.stringify(plan));},inputReview(){counters.inputReview++;return JSON.parse(JSON.stringify(review));},toggleTool(){counters.mutations++;},toggleMetric(){counters.mutations++;},setMarkers(){counters.mutations++;},addProject(){counters.mutations++;}},YV_INPUTS:{route:p=>p?.inputRoute==='auto'?'raw_fastq':p?.inputRoute,excludedStages:()=>[],stageDependencies:()=>['design']},YV_GUIDE:{search:()=>({hits:[{kind:'tool',id:'starsolo',title:'STARsolo',record:starsolo,sources:['https://example.test/starsolo']}]} )},YV_LOCAL_MODEL:model,YV_COMPANION:{close(){counters.close++;}},addEventListener(type,fn){events.set(type,fn);}};
 vm.runInNewContext(contextCode,{window,document,location,console});
 vm.runInNewContext(assistantCode,{window,document,location,console});
 const assistant=window.YV_RESEARCH_ASSISTANT,context=window.YV_ASSISTANT_CONTEXT;
 async function emit(type,target){for(const fn of listeners.get(type)||[])await fn({target,key:'',preventDefault(){},stopPropagation(){}});await new Promise(resolve=>setImmediate(resolve));}
 function mount(){root.innerHTML=assistant.view();assistant.mount({querySelector:()=>root});}
 async function optOut(){await emit('change',{id:'lm22-plan',checked:false});counters.getPlan=0;counters.inputReview=0;}
 async function ask(question){await emit('input',{id:'lm22-question',value:question});await emit('submit',{matches:()=>true});}
 async function click(action,props={}){const el={dataset:{lm22:action,...props}};await emit('click',{closest:()=>el});}
 return{window,assistant,context,counters,plan,catalogue,review,root,nodes,events,location,generations,mount,optOut,ask,click,emit};
}

test('plan opt-out returns a review link without reading the plan',()=>{
 const f=fixture();const answer=f.context.resolve('检查我的表达噪音研究方案',{includePlan:false});
 assert.equal(answer.kind,'audit');assert.equal(f.counters.getPlan,0);assert.equal(f.counters.inputReview,0);assert.equal(answer.actions[0].route,'#workbench?stage=review&tab=review');
});
test('workbench help respects plan opt-out',()=>{
 const f=fixture({route:'workbench'});f.context.resolve('当前页面怎么用？',{includePlan:false});
 assert.equal(f.counters.getPlan,0,'page guidance must not read the current plan after opt-out');assert.equal(f.counters.inputReview,0);
});
test('source rendering respects plan opt-out',async()=>{
 const f=fixture();f.mount();await f.optOut();await f.ask('CLN2可以注释什么状态？');
 assert.equal(f.counters.getPlan,0,'source add-button rendering must not read the plan after opt-out');assert.equal(f.counters.inputReview,0);assert.match(f.nodes.get('#lm22-conversation').innerHTML,/CLN2/);
});
test('model context excludes plan data after opt-out',async()=>{
 const f=fixture({modelStatus:'ready'});f.window.YV_GUIDE.search=()=>({hits:[]});f.mount();await f.optOut();await f.ask('STARsolo用于什么？');await f.click('explain',{turn:'0'});
 assert.equal(f.generations.length,1);assert.equal(f.counters.getPlan,0);assert.equal(f.counters.inputReview,0);assert.doesNotMatch(JSON.stringify(f.generations),/private research objective|CURRENT PLAN|noise_project/);
});
test('opting out blocks model explanation of an earlier plan review',async()=>{
 const f=fixture({modelStatus:'ready'});f.window.YV_GUIDE.search=()=>({hits:[]});f.mount();await f.ask('检查我的表达噪音研究方案');await f.optOut();await f.click('explain',{turn:'0'});
 assert.equal(f.generations.length,0,'an earlier audit answer must not bypass the current plan opt-out');assert.equal(f.counters.getPlan,0);assert.equal(f.counters.inputReview,0);
});
test('history repaint after opting out does not inspect stored review signatures',async()=>{
 const f=fixture();f.mount();await f.ask('检查我的表达噪音研究方案');await f.optOut();await f.ask('CLN2可以注释什么状态？');
 assert.equal(f.counters.getPlan,0,'stored audit signatures and source buttons must respect the current opt-out');assert.equal(f.counters.inputReview,0);
});
test('plan summary uses data labels rather than raw inventory IDs',()=>{
 const f=fixture(),summary=f.context.planSummary();assert.match(summary,/原始 FASTQ/);assert.match(summary,/文库结构/);assert.match(summary,/参考基因组/);assert.doesNotMatch(summary,/raw_fastq|library_structure|count_matrix/);
});
test('an exact tool name survives a failed free-text search',()=>{
 const f=fixture();f.window.YV_GUIDE.search=()=>({hits:[]});const hits=f.context.retrieve('STARsolo用于什么？');assert.equal(hits[0]?.id,'starsolo');
});
test('matched sources are shown before optional model explanation',async()=>{
 const f=fixture({modelStatus:'ready'});f.mount();await f.ask('STARsolo');assert.equal(f.generations.length,0);assert.match(f.nodes.get('#lm22-conversation').innerHTML,/定量单细胞转录组/);await f.click('explain',{turn:'0'});assert.equal(f.generations.length,1);
});
test('uncited model prose is replaced with the actual source summary',async()=>{
 const f=fixture({modelStatus:'ready'});f.mount();await f.ask('STARsolo');await f.click('explain',{turn:'0'});assert.match(f.nodes.get('#lm22-conversation').innerHTML,/Qwen 未返回有效的来源编号/);assert.doesNotMatch(f.nodes.get('#lm22-conversation').innerHTML,/A local explanation/);
});
test('unmatched questions do not trigger unsupported model prose',async()=>{
 const f=fixture({modelStatus:'ready'});f.window.YV_GUIDE.search=()=>({hits:[]});f.mount();await f.ask('some_unknown_topic');assert.equal(f.generations.length,0);assert.match(f.nodes.get('#lm22-conversation').innerHTML,/没有找到明确/);
});
test('mixed CLN2 and STARsolo retrieval retains both records',()=>{
 const f=fixture(),hits=f.context.retrieve('CLN2和STARsolo分别做什么？');assert.ok(hits.some(h=>h.kind==='marker'&&h.record.symbol==='CLN2'));assert.ok(hits.some(h=>h.kind==='tool'&&h.id==='starsolo'));
});
test('several named genes do not eclipse an explicitly named method',()=>{
 const f=fixture(),hits=f.context.retrieve('CLN1 CLN2 CLB2 CDC28 STARsolo');assert.ok(hits.some(h=>h.kind==='tool'&&h.id==='starsolo'),'named methods must survive the bounded retrieval list');
});
test('mixed model context retains a named method beyond the first three genes',async()=>{
 const f=fixture({modelStatus:'ready'});f.mount();await f.optOut();await f.ask('CLN1 CLN2 CLB2 STARsolo分别做什么');await f.click('explain',{turn:'0'});assert.equal(f.generations.length,1);const prompt=f.generations[0].find(message=>message.role==='user').content,evidence=prompt.split('\nWORKSPACE\n')[0];assert.match(evidence,/STARsolo/,'the named method must reach the evidence block rather than only appear in the user question');assert.match(evidence,/CLN2/);
});
test('deterministic plan audit is read-only and distinguishes declarations from outputs',()=>{
 const f=fixture(),before=JSON.stringify(f.plan),audit=f.context.planAudit();assert.equal(JSON.stringify(f.plan),before);assert.equal(f.counters.mutations,0);assert.deepEqual(JSON.parse(JSON.stringify(audit.counts)),{declared:1,planned:1,missing:2});assert.match(audit.answer,/已声明拥有/);assert.match(audit.answer,/计划由流程生成/);assert.match(audit.answer,/上游尚待满足/);
});
test('plan signatures ignore save timestamps and change with content',()=>{
 const f=fixture(),first=f.context.signature();f.plan.updated='2026-10-18T00:00:00Z';assert.equal(f.context.signature(),first);f.plan.availableData.push('reference');assert.notEqual(f.context.signature(),first);
});
test('navigation accepts only the fixed internal routes',async()=>{
 const f=fixture();f.mount();for(const route of ['javascript:alert(1)','https://example.test','#quality?redirect=evil','#journey?stage=scope&extra=1','#workbench?stage=export']){await f.click('navigate',{route});assert.equal(f.location.hash,'#overview');assert.equal(f.counters.close,0);}
 await f.click('navigate',{route:'#quality'});assert.equal(f.location.hash,'#quality');assert.equal(f.counters.close,1);
});
test('existing plan reviews visibly become stale after a plan edit',async()=>{
 const f=fixture();f.mount();await f.ask('检查我的表达噪音研究方案');assert.doesNotMatch(f.nodes.get('#lm22-conversation').innerHTML,/class="lm24-stale"/);f.plan.tools=[];f.events.get('yv:planchange')();assert.match(f.nodes.get('#lm22-conversation').innerHTML,/class="lm24-stale"/);
});
test('a fallback explanation retains the plan opt-out boundary',async()=>{
 const f=fixture({modelStatus:'ready'});f.window.YV_GUIDE.search=()=>({hits:[]});f.mount();await f.ask('检查我的表达噪音研究方案');await f.click('explain',{turn:'0'});assert.equal(f.generations.length,1);assert.match(f.nodes.get('#lm22-conversation').innerHTML,/Qwen 未返回有效的来源编号/);await f.optOut();await f.click('explain',{turn:'1'});assert.equal(f.generations.length,1,'changing the display kind to guide must not remove plan provenance or bypass opt-out');assert.equal(f.counters.getPlan,0);assert.equal(f.counters.inputReview,0);
});
test('a fallback explanation retains the reviewed plan signature',async()=>{
 const f=fixture({modelStatus:'ready'});f.window.YV_GUIDE.search=()=>({hits:[]});f.mount();await f.ask('检查我的表达噪音研究方案');await f.click('explain',{turn:'0'});f.plan.tools=[];f.events.get('yv:planchange')();const html=f.nodes.get('#lm22-conversation').innerHTML,last=html.slice(html.lastIndexOf('<article class="lm22-turn"'));assert.match(last,/class="lm24-stale"/,'the fallback must become stale with its source plan, independently of its presentation kind');
});
test('workbench page guidance that used a plan cannot be re-explained after opting out',async()=>{
 const f=fixture({route:'workbench',modelStatus:'ready'});f.window.YV_GUIDE.search=()=>({hits:[]});f.mount();await f.ask('当前页面怎么用？');await f.optOut();await f.click('explain',{turn:'0'});assert.equal(f.generations.length,0,'plan-bearing workspace guidance must carry the same opt-out boundary as audits');assert.equal(f.counters.getPlan,0);assert.equal(f.counters.inputReview,0);
});
test('stale plan-aware explanations require a fresh review',async()=>{
 const f=fixture({modelStatus:'ready'});f.window.YV_GUIDE.search=()=>({hits:[]});f.mount();await f.ask('检查我的表达噪音研究方案');f.plan.tools=[];await f.click('explain',{turn:'0'});assert.equal(f.generations.length,0,'old review evidence must not be combined with a new plan summary');
});
test('opting out cancels a pending plan-aware explanation',async()=>{
 const f=fixture({modelStatus:'ready'});let finish,cancelled=0;f.window.YV_GUIDE.search=()=>({hits:[]});f.window.YV_LOCAL_MODEL.generate=(messages,options)=>{f.generations.push(messages);options.onToken?.('PRIVATE_UNCONFIRMED_PLAN');return new Promise(resolve=>{finish=resolve;});};f.window.YV_LOCAL_MODEL.cancel=()=>{cancelled++;};f.mount();await f.ask('检查我的表达噪音研究方案');await f.click('explain',{turn:'0'});assert.equal(f.assistant.state().busy,true);await f.optOut();const stopped=!f.assistant.state().busy;finish('PRIVATE_UNCONFIRMED_PLAN [1]');await new Promise(resolve=>setImmediate(resolve));assert.equal(stopped,true,'opting out must stop an already pending plan-aware explanation');assert.equal(cancelled,1);assert.doesNotMatch(f.nodes.get('#lm22-conversation').innerHTML,/PRIVATE_UNCONFIRMED_PLAN/);
});
test('out-of-range references fall back without publishing buffered tokens',async()=>{
 const f=fixture({modelStatus:'ready'});let finish;f.window.YV_LOCAL_MODEL.generate=(messages,options)=>{f.generations.push(messages);options.onToken?.('UNCONFIRMED_STREAM_TOKEN');return new Promise(resolve=>{finish=resolve;});};f.mount();await f.ask('STARsolo');await f.click('explain',{turn:'0'});assert.doesNotMatch(f.nodes.get('#lm22-conversation').innerHTML,/UNCONFIRMED_STREAM_TOKEN/);finish('OUT_OF_RANGE_PROSE [2]');await new Promise(resolve=>setImmediate(resolve));const html=f.nodes.get('#lm22-conversation').innerHTML;assert.doesNotMatch(html,/OUT_OF_RANGE_PROSE|UNCONFIRMED_STREAM_TOKEN/);assert.match(html,/Qwen 未返回有效的来源编号/);assert.match(html,/定量单细胞转录组/);
});
test('a correctly numbered local explanation is displayed as generated prose',async()=>{
 const f=fixture({modelStatus:'ready'});f.window.YV_LOCAL_MODEL.generate=async()=> 'STARsolo 的用途见所列资料 [1]';f.mount();await f.ask('STARsolo');await f.click('explain',{turn:'0'});const html=f.nodes.get('#lm22-conversation').innerHTML,last=html.slice(html.lastIndexOf('<article class="lm22-turn"'));assert.match(last,/data-answer-kind="model"/);assert.match(last,/STARsolo 的用途见所列资料 \[1\]/);
});

(async()=>{let failed=0;for(const item of cases){try{await item.run();console.log('PASS:',item.name);}catch(error){failed++;console.error('FAIL:',item.name,'\n ',error.message);}}if(failed)process.exitCode=1;console.log(`${cases.length-failed}/${cases.length} assistant context checks passed.`);})().catch(error=>{console.error(error);process.exitCode=1;});
