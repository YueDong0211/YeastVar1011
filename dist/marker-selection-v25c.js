'use strict';
(() => {
  const PHASES=['G1','G1/S','S','G2','G2/M','M','M/G1'], cache=new WeakMap();
  const own=(o,k)=>Object.hasOwn(o||{},k), uniq=xs=>[...new Set(xs)];
  const strings=xs=>uniq((Array.isArray(xs)?xs:[]).filter(x=>typeof x==='string'&&x.trim()).map(x=>x.trim()));
  const canonical=v=>Array.isArray(v)?v.map(canonical):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
  function normalizeField(a={}){
    if(!own(a,'evidenceIds')||a.evidenceIds===null)return {};
    if(!Array.isArray(a.evidenceIds)||a.evidenceIds.some(x=>typeof x!=='string'))throw Error('invalidEvidenceIds');
    return {evidenceIds:strings(a.evidenceIds)};
  }
  function index(marker={}){
    const rows=Array.isArray(marker.evidence)?marker.evidence:[],old=cache.get(marker);
    if(old?.rows===rows&&old.size===rows.length)return old;
    const entries=new Map();let missingIdCount=0;
    for(const e of rows){
      if(typeof e.evidenceId!=='string'||!e.evidenceId.trim()){missingIdCount++;continue;}
      const id=e.evidenceId,signature=JSON.stringify(canonical(e)),found=entries.get(id);
      if(found){found.occurrences++;if(found.signature!==signature)found.conflict=true;}
      else entries.set(id,{id,record:e,occurrences:1,signature,conflict:false});
    }
    const result={rows,size:rows.length,entries,missingIdCount};cache.set(marker,result);return result;
  }
  const phases=e=>uniq([...(Array.isArray(e.phases)?e.phases:[]),...(Array.isArray(e.sourcePhases)?e.sourcePhases:[]),e.phase,e.tag].filter(p=>PHASES.includes(p)));
  function resolve(marker={},assignment={}){
    const normalized=normalizeField(assignment),mode=own(normalized,'evidenceIds')?'record':'source',ids=normalized.evidenceIds||[],lookup=index(marker);
    const selected=ids.map(id=>lookup.entries.get(id)).filter(x=>x&&!x.conflict),records=selected.map(x=>x.record);
    return {mode,ids,records,unresolvedIds:ids.filter(id=>!lookup.entries.has(id)||lookup.entries.get(id).conflict),
      available:[...lookup.entries.values()].map(({signature,...row})=>row),missingIdCount:lookup.missingIdCount,
      phases:uniq(records.flatMap(phases)),occurrenceCount:selected.reduce((n,x)=>n+x.occurrences,0),
      contexts:records.map(e=>({evidenceId:e.evidenceId,sourceId:e.sourceId,sourcePhases:phases(e),sourceCondition:e.sourceCondition??null,sourceConditionRole:e.sourceConditionRole??null,sourceStrain:e.sourceStrain??null,datasetAccession:e.datasetAccession??null,contrast:e.referenceContrast??e.sourceContrast??null}))};
  }
  function safeURL(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}}
  const getSource=(map,id)=>map?.get?map.get(id):map?.[id];
  function recordURLs(e,sourceMap){
    const primary=getSource(sourceMap,e.sourceId),extraction=getSource(sourceMap,e.extractionSourceId);
    return uniq([e.sourceUrl,primary?.paperUrl,primary?.url,extraction?.paperUrl,extraction?.url].map(safeURL).filter(Boolean));
  }
  function referenceURLs(marker,assignment,sourceMap){
    const r=resolve(marker,assignment);
    if(r.mode==='record')return uniq(r.records.flatMap(e=>recordURLs(e,sourceMap)));
    return uniq(strings(assignment?.evidenceSources).flatMap(id=>{
      const source=getSource(sourceMap,id),related=(marker?.evidence||[]).filter(e=>e.sourceId===id||e.extractionSourceId===id);
      return [source?.paperUrl,source?.url,...related.filter(e=>e.sourceId===id).map(e=>e.sourceUrl)].map(safeURL).filter(Boolean);
    }));
  }
  function citationSelection({tools=[],baseURLs=[],markerRecords=[],sourceMap}={}){
    return {version:1,tools:strings(tools),sourceUrls:uniq([...baseURLs.map(safeURL).filter(Boolean),...markerRecords.flatMap(({reference,assignment})=>referenceURLs(reference,assignment,sourceMap))])};
  }
  // Explicitly selected non-marker branches only; never pass a complete plan here.
  function referenceLinks(value,out=[]){
    if(Array.isArray(value))for(const item of value)referenceLinks(item,out);
    else if(value&&typeof value==='object')for(const [key,item]of Object.entries(value)){
      if(['bibliography','citations','provenance','verification','byURL','csl'].includes(key))continue;
      if(item&&typeof item==='object')referenceLinks(item,out);
      else if(['url','URL','paperUrl','sourceUrl','sourceURL','sourceUrls','sourceURLs','references','sourceLinks','sources'].includes(key)){const url=safeURL(item);if(url)out.push(url);}
    }else{const url=safeURL(value);if(url)out.push(url);}
    return uniq(out);
  }
  window.YV_MARKER_SELECTION={normalizeField,resolve,phases,recordURLs,referenceURLs,citationSelection,referenceLinks};
})();
