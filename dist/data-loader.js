'use strict';
(() => {
  const names=['markers','workflow','literature','research-categories','projects'];
  const scriptBase=new URL('.',document.currentScript?.src||location.href);
  let source=null, pending=null, bundlePending=null;
  const required={markers:['markers'],workflow:['steps','metrics','tools','formulas'],literature:['papers'],'research-categories':['categories','dataRequirements'],projects:['projects']};
  function validate(value){
    for(const name of names){
      if(!value?.[name]||typeof value[name]!=='object')throw Error(`Missing catalogue: ${name}`);
      for(const key of required[name])if(!Array.isArray(value[name][key]))throw Error(`Invalid catalogue structure: ${name}.${key}`);
    }
    return value;
  }
  function announce(state,detail={}){window.dispatchEvent(new CustomEvent('yv:dataload',{detail:{state,...detail}}))}
  function readBundle(url,timeout){
    if(bundlePending)return bundlePending;
    bundlePending=new Promise((resolve,reject)=>{
      let script=null,timer,settled=false;
      const fail=message=>{if(settled)return;settled=true;clearTimeout(timer);if(script){script.onload=null;script.onerror=null;script.remove()}bundlePending=null;reject(Error(message))};
      const finish=()=>{
        // A sharded bundle exposes its promise before its marker parts finish.
        // Wait before validating even when the catalogue metadata already exists.
        Promise.resolve(window.YV_BUNDLED_DATA_READY).then(()=>{
          if(settled)return;
          const result=validate(window.YV_BUNDLED_DATA);settled=true;clearTimeout(timer);resolve(result);
        }).catch(error=>fail(error?.message||'The local catalogue parts could not be loaded.'));
      };
      timer=setTimeout(()=>fail('The local catalogue bundle took too long to load.'),timeout);
      if(window.YV_BUNDLED_DATA_READY||window.YV_BUNDLED_DATA){finish();return}
      script=document.createElement('script');
      script.src=new URL(url,scriptBase).href;script.async=true;script.dataset.yvCatalogue='true';
      script.onload=finish;
      script.onerror=()=>fail('The local catalogue bundle could not be loaded.');
      document.head.append(script);
    });
    return bundlePending;
  }
  async function readNetwork(timeout){
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeout);
    try{
      const pairs=await Promise.all(names.map(async name=>{
        const url=new URL(`data/${name}.json?v=22.0`,scriptBase);
        const response=await fetch(url,{signal:controller.signal,cache:'no-cache'});
        if(!response.ok)throw Error(`${name}.json: HTTP ${response.status}`);
        let catalogue=await response.json();
        if(name==='markers'&&catalogue?.format==='yv-marker-shards-v1'){
          if(!Array.isArray(catalogue.shards)||!Number.isInteger(catalogue.markerCount)||catalogue.markerCount<0||catalogue.shards.some(part=>typeof part!=='string'||!part))throw Error('markers.json: invalid shard manifest.');
          const parts=await Promise.all(catalogue.shards.map(async part=>{
            const partUrl=new URL(part,url);if(!partUrl.search)partUrl.search=url.search;
            const partResponse=await fetch(partUrl,{signal:controller.signal,cache:'no-cache'});
            if(!partResponse.ok)throw Error(`${part}: HTTP ${partResponse.status}`);
            const rows=await partResponse.json();if(!Array.isArray(rows))throw Error(`${part}: expected a marker array.`);
            return rows;
          }));
          const markers=[];for(const rows of parts)for(const row of rows)markers.push(row);
          if(markers.length!==catalogue.markerCount)throw Error(`Marker shard count mismatch: expected ${catalogue.markerCount}, received ${markers.length}.`);
          catalogue={...catalogue,markers};
        }
        return [name,catalogue];
      }));
      return validate(Object.fromEntries(pairs));
    }finally{clearTimeout(timer);controller.abort()}
  }
  async function perform(options){
    const bundleUrl=options.bundleUrl||'catalogue-bundle.js?v=22.0';
    const useBundle=options.preferBundle??location.protocol==='file:';
    let networkError;
    if(!useBundle){
      announce('network');
      try{const result=await readNetwork(options.networkTimeout||15000);source='network';announce('ready',{source});window.dispatchEvent(new CustomEvent('yv:dataready',{detail:{source}}));return result}catch(e){networkError=e}
    }
    announce('bundle',{reason:useBundle?'local-file':'network-fallback'});
    try{const result=await readBundle(bundleUrl,options.bundleTimeout||30000);source='bundle';announce('ready',{source});window.dispatchEvent(new CustomEvent('yv:dataready',{detail:{source}}));return result}catch(e){
      const error=new Error('The research catalogue could not be loaded from JSON or the local bundle.');
      error.code='YV_CATALOGUE_UNAVAILABLE';error.details={network:networkError?.message||null,bundle:e.message};announce('error',error.details);throw error;
    }
  }
  window.YV_DATA={
    load(options={}){if(!pending)pending=perform(options).catch(error=>{pending=null;throw error});return pending},
    get source(){return source},
    validate
  };
})();
