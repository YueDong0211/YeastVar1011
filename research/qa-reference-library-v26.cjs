'use strict';
// Pure VM tests: real production metadata, event delegates and download payloads.
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),parse=p=>JSON.parse(read(p));
const data={literature:parse('dist/data/literature.json'),workflow:parse('dist/data/workflow.json')};
let language='en',plan={citationSelection:{version:1,tools:['starsolo'],sourceUrls:[]}},opened=[],formats=0;
const listeners={},document={addEventListener(type,fn){(listeners[type]??=[]).push(fn);},getElementById(){return null;},querySelector(){return null;}};
const context={window:{},document,URL,URLSearchParams,console,setTimeout,Blob,location:{hash:'#literature'},history:{replaceState(a,b,h){context.location.hash=h;}}};
context.window.YV_APP={data:()=>data,prefs:()=>({language}),tx:x=>x,field:(type,r,key)=>language==='zh'?r[key]:r[key+'En']||r.id,openRecord:(kind,id)=>opened.push({kind,id})};
context.window.YV_BUILDER={exported:()=>JSON.parse(JSON.stringify(plan))};vm.createContext(context);
vm.runInContext(read('dist/citation-data.js'),context);vm.runInContext(read('dist/citations.js'),context);
context.window.YV_CITATIONS.format=records=>{formats++;const valid=records.filter(r=>r.csl.author?.length);return {entries:valid.map(r=>({id:r.id,text:r.csl.title})),bibliographyText:valid.map(r=>r.csl.title).join('\n\n'),error:null};};
vm.runInContext(read('dist/reference-library-v26.js'),context);
const R=context.window.YV_REFERENCE_LIBRARY,C=context.window.YV_CITATIONS,assertions=[];
function test(name,f){f();assertions.push(name);console.log('PASS',name);}
test('All curated papers and citation IDs remain represented; DOI identity deduplicates',()=>{
 const rows=R.catalogue(),ids=new Set(rows.flatMap(r=>r.records.map(x=>x.id))),papers=new Set(rows.flatMap(r=>r.papers.map(x=>x.id)));
 for(const p of data.literature.papers)assert(papers.has(p.id),p.id);
 for(const r of context.window.YV_CITATION_DATA.records)assert(ids.has(r.id),r.id);
 const dois=rows.map(r=>r.doi).filter(Boolean);assert.equal(new Set(dois).size,dois.length);
});
test('Default ten-year window and thirty-row rendering; no eager APA rendering',()=>{
 const html=R.page(),to=Number(data.literature.window.to.slice(0,4));assert(R.results().every(r=>r.year>=to-9&&r.year<=to));assert.equal((html.match(/class="ref26-record"/g)||[]).length,30);assert.equal(formats,0);assert(html.includes('data-ref-page="0" disabled'));assert(!html.includes('id="ref26-unknown-hint"'));
});
test('Cards show three authors while CSL and export retain the complete author list',()=>{
 const row=R.catalogue().find(r=>r.authors.length>10&&r.doi);assert(row);const before=JSON.stringify(row.csl.author);
 R.setFilters({query:row.doi,period:'all',tool:'',stage:'',type:'',plan:false});const html=R.page(),line=html.match(/<p class="ref26-authors">([\s\S]*?)<\/p>/)?.[1];assert(line);assert.equal(line.split('; ').length,4);assert(line.endsWith('et al.'));assert(!line.includes(row.authors[3]));assert.equal(JSON.stringify(row.csl.author),before);assert.equal(JSON.stringify(JSON.parse(R.exportData('csl').text)[0].author),before);
});
test('Explicit STARsolo references resolve without method-name text guessing',()=>{
 context.location.hash='#literature?tool=starsolo&period=all';R.page();const ids=new Set(R.results().flatMap(r=>r.records.map(x=>x.id)));for(const id of C.toolReferenceIDs('starsolo'))assert(ids.has(id),id);assert(R.results().every(r=>r.tools.includes('starsolo')));assert(R.results().some(r=>r.kind==='document'));
});
test('Five method papers absent from the old list retain complete citation metadata',()=>{
 const expected={alevinfry:'10.1038/s41592-022-01408-3',kb:'10.1038/s41587-021-00870-2',rnaseqc:'10.1093/bioinformatics/btab135',cellsnp:'10.1093/bioinformatics/btab358',screadsim:'10.1038/s41467-023-43162-w'};
 for(const [tool,doi] of Object.entries(expected)){const rows=R.setFilters({tool,period:'all',query:'',stage:'',type:'',plan:false});const row=rows.find(r=>r.doi===doi);assert(row,tool);assert(row.authors.length,tool+' authors');assert(row.year,tool+' year');assert(row.csl['container-title'],tool+' journal');assert.equal(rows.filter(r=>r.doi===doi).length,1);}
 for(const tool of ['fastqc','picard','sccb2','doubletdetection','scuttle'])assert(R.setFilters({tool,period:'all'}).some(r=>r.kind==='document'&&r.url),tool+' official source');
});
test('Search includes authors and DOI; stage filtering follows mapped methods',()=>{
 R.setFilters({tool:'',period:'all',stage:'',query:'',type:''});const r=R.results().find(x=>x.doi&&x.authors.length&&x.stages.length);assert(R.setFilters({query:r.doi}).some(x=>x.id===r.id));assert(R.setFilters({query:r.authors[0]}).some(x=>x.id===r.id));assert(R.setFilters({query:'',stage:r.stages[0]}).some(x=>x.id===r.id));
});
test('Unknown-year documents retain webpage CSL; BibTeX is misc, not a fabricated article',()=>{
 const rows=R.setFilters({query:'',period:'unknown',tool:'',stage:'',type:'document'});assert(rows.length);assert(rows.every(r=>r.year===null));const html=R.page();assert(html.includes('id="ref26-unknown-hint"'));assert(!html.includes('Authors not recorded'));const csl=JSON.parse(R.exportData('csl').text);assert(csl.some(c=>c.type==='webpage'));assert(csl.filter(c=>c.type==='webpage').every(c=>!c.issued&&!c.author));const bib=R.exportData('bibtex').text;assert(bib.includes('@misc{documentation-'));assert(!bib.includes('year = {0}'));assert(R.exportData('apa').text.includes('incomplete citation metadata'));
});
test('Only plan references uses selected citation IDs, not all matching stages',()=>{
 const rows=R.setFilters({query:'',period:'all',tool:'',stage:'',type:'',plan:true});const selected=new Set(C.toolReferenceIDs('starsolo'));assert(rows.length);assert(rows.every(r=>r.records.some(x=>selected.has(x.id))));
});
test('Deep link resets stale filters and five language controls do not leak Chinese',()=>{
 R.setFilters({query:'no-such-record',stage:'design',type:'document',plan:true});context.location.hash='#literature?tool=starsolo&period=all';// force navigation through another URL first
 context.location.hash='#literature?tool=scanpy&period=all';R.page();context.location.hash='#literature?tool=starsolo&period=all';
 let html=R.page();assert.equal(R.getState().query,'');assert.equal(R.getState().plan,false);assert.equal(R.getState().stage,'');
 for(const lang of ['en','fr','es','eu']){language=lang;html=R.page();assert(!/[\u3400-\u9fff]/u.test(html),lang);}language='en';
});
test('Tool/paper buttons invoke real records; APA disclosure formats lazily',()=>{
 const r=R.catalogue().find(x=>x.papers.length&&x.authors.length);const dispatch=target=>listeners.click.forEach(fn=>fn({target:{closest:()=>target}}));
 dispatch({dataset:{refTool:'starsolo'},hasAttribute:()=>false});dispatch({dataset:{refPaper:r.papers[0].id},hasAttribute:()=>false});assert.deepEqual(opened,[{kind:'tool',id:'starsolo'},{kind:'paper',id:r.papers[0].id}]);
 const box={dataset:{},textContent:''},before=formats;listeners.toggle.forEach(fn=>fn({target:{dataset:{refApa:r.id},open:true,querySelector:()=>box}}));assert.equal(formats,before+1);assert(box.textContent.includes(r.title));
});
test('Preprint DOI and published DOI remain separate even when related aliases overlap',()=>{
 const original=context.window.YV_CITATION_DATA.records;
 context.window.YV_CITATION_DATA.records=[...original,{id:'qa-preprint',csl:{id:'qa-preprint',type:'article',genre:'Preprint',title:'Same title',DOI:'10.9999/qa-preprint',issued:{'date-parts':[[2025]]}}},{id:'qa-published',csl:{id:'qa-published',type:'article-journal',title:'Same title',DOI:'10.9999/qa-published',issued:{'date-parts':[[2026]]}}}];
 const rows=R.setFilters({period:'all',tool:'',stage:'',query:'Same title',type:'',plan:false});assert.equal(rows.length,2);assert.equal(rows.filter(r=>r.kind==='preprint').length,1);context.window.YV_CITATION_DATA.records=original;
});
test('No-result recovery and filtered exports use the same selected record set',()=>{
 R.setFilters({period:'all',query:'zzzznomatchingliterature',tool:'',stage:'',type:'',plan:false});const html=R.page();assert(html.includes('No matching references'));assert(html.includes('data-ref-reset'));assert.deepEqual(JSON.parse(R.exportData('csl').text),[]);
 R.setFilters({query:'',tool:'starsolo',period:'all'});assert.equal(JSON.parse(R.exportData('csl').text).length,R.results().length);
});
console.log(JSON.stringify({passed:assertions.length,libraryRecords:R.catalogue().length,curatedPapers:data.literature.papers.length,citationRecords:context.window.YV_CITATION_DATA.records.length},null,2));
