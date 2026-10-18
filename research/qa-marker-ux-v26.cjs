const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),handlers={},nodes=new Map();let document;
function focusable(kind,card,href){return {tagName:kind==='link'?'A':'SUMMARY',dataset:kind==='select'?{db24Select:card.dataset.db24Id}:{},matches:s=>kind==='summary'&&s==='summary',closest:()=>card,getAttribute:k=>k==='href'?href:null,focus(){document.activeElement=this;}};}
function parseCards(html){return [...html.matchAll(/<article class="db24-card[^\"]*" data-db24-id="([^\"]+)">([\s\S]*?)<\/article>/g)].map(([,id,body])=>{const card={dataset:{db24Id:id},detail:{open:/<details\s+open>/.test(body)}};card.summary=focusable('summary',card);card.select=focusable('select',card);card.link=focusable('link',card,'https://example.org/'+id);card.querySelector=s=>s==='details'?card.detail:s==='summary'?card.summary:s==='[data-db24-select]'?card.select:null;card.querySelectorAll=s=>s==='a'?[card.link]:[];return card;});}
const result={rows:[],set innerHTML(html){this.rows=parseCards(html);},querySelectorAll:()=>result.rows,querySelector:s=>result.rows.find(c=>s==='[data-db24-id="'+c.dataset.db24Id+'"]')};
const query={value:'',closest:()=>null,focus(){document.activeElement=this;}};
const mount={querySelector(s){if(s==='#db24-results')return result;if(s==='#db24-q')return query;if(!nodes.has(s))nodes.set(s,{value:'',textContent:'',innerHTML:''});return nodes.get(s);}};
document={activeElement:query,querySelector:s=>s==='.db24'?mount:mount.querySelector(s),addEventListener:(type,fn)=>handlers[type]=fn};
const window={YV_APP:{prefs:()=>({language:'en'}),data:()=>({markers:{sources:[],markers:[]}})}};
const context={window,document,URL,sessionStorage:{getItem(){return null;},setItem(){}}};
for(const file of ['database-resources-v25.js','database-hub-v24.js'])vm.runInNewContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),context);
const api=window.YV_DATABASE_HUB,html=api.page();assert.equal((html.match(/id="db24-gene"/g)||[]).length,1);assert(html.indexOf('class="db24-gene"')>html.indexOf('</form>'));assert(html.indexOf('class="db24-gene"')<html.indexOf('id="db24-results"'));result.innerHTML=html;
const find=id=>result.rows.find(c=>c.dataset.db24Id===id),input=q=>handlers.input({target:{dataset:{db24Field:'q'},value:q}}),reset=()=>handlers.click({target:{closest:s=>s==='[data-db24]'?{dataset:{db24:'reset'}}:null}});
find('sgd').detail.open=true;input('TF');assert(!find('sgd'));assert.equal(document.activeElement,query);reset();assert.equal(find('sgd').detail.open,true,'Filtered-out resources retain open state');
find('sgd').detail.open=false;input('TF');reset();assert.equal(find('sgd').detail.open,false,'Explicitly closed details remain closed');
find('jaspar').detail.open=true;document.activeElement=find('jaspar').summary;input('TF');assert.equal(find('jaspar').detail.open,true);assert.equal(document.activeElement,find('jaspar').summary,'Summary focus restored after rebuilding');
document.activeElement=find('jaspar').select;input('JASPAR');assert.equal(document.activeElement,find('jaspar').select);input('no-such-resource');assert.equal(document.activeElement,query,'Hidden focused card returns focus to search');reset();assert.equal(find('jaspar').detail.open,true);assert.equal(result.rows.length,19);
console.log('PASS SGD quick lookup precedes cards, unique field; details survive hide/show/reset/close, summary and selection focus restored, hidden-card focus falls back to search');
const base=fs.readFileSync(path.join(__dirname,'qa-marker-usability-v25.cjs'),'utf8');
const extra=`
window.YV_DATABASE_HUB={page:()=>'<section class="test-database"></section>'};
window.YV_RESEARCH_ATLAS.coverage=()=>'<section class="test-source-main"></section>';
window.YV_MARKER_PREVIEW={text:key=>key,page:()=>'<section class="test-preview"></section>'};
for(const tab of ['catalogue','databases','coverage','preview']){context.location.hash='#markers?view='+tab;const markup=app.page();assert.equal(markup.includes('class="mw-phase-coverage"'),tab==='coverage');assert.equal(markup.includes('class="mw-source-coverage"'),tab==='coverage');assert.equal(markup.includes('class="mw-measurement-note"'),tab==='preview');assert(markup.includes('data-value="coverage"'));}
context.location.hash='#markers?view=coverage';app.page();handlers.click.at(-1)({target:{closest:()=>({dataset:{mw:'phase-source',value:'G1',source:'spellman1998'}})}});assert.equal(context.location.hash,'#markers?view=catalogue');assert.equal(app.getState().sources[0],'spellman1998');assert.equal(app.getState().phases[0],'G1');
context.location.hash='#markers?view=coverage';app.page();handlers.click.at(-1)({target:{closest:()=>({dataset:{mw:'source-filter',value:'boocock2025'}})}});assert.equal(context.location.hash,'#markers?view=catalogue');assert.equal(app.getState().sources[0],'boocock2025');
console.log('PASS source/phase evidence remains reachable through coverage tab; no measurement note on catalogue/database/coverage; preview retains measurement context');
`;
vm.runInNewContext(base+extra,{require,__dirname,console,setTimeout,clearTimeout,URL,URLSearchParams,process,performance});
