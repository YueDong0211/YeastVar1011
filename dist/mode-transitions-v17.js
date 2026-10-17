/* Real DOM view transitions for the optional immersive workspace.
 * References: https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
 * https://developer.chrome.com/docs/web-platform/view-transitions/same-document
 */
'use strict';
(() => {
  const html=document.documentElement,media=matchMedia('(prefers-reduced-motion: reduce)');
  let sequence=0,current=null,last=null;
  const reduced=()=>media.matches||!!window.YV_APP?.prefs()?.reducedMotion||html.classList.contains('reduce-motion');
  const state=()=>({active:!!current,direction:current?.direction||null,kind:current?.kind||null,phase:current?.phase||'idle',native:!!current?.transition,reduced:reduced(),last});
  function clear(op){
    clearTimeout(op.guard);
    if(current!==op)return;
    current=null;delete html.dataset.modeTransition;delete html.dataset.modeTransitionPhase;
    html.classList.remove('mode-transition-fallback');
    delete html.dataset.stageTransition;
    op.animations.forEach(animation=>animation.cancel());
  }
  function skip(cancelUpdate=false){
    const op=current;if(!op)return;
    if(cancelUpdate)op.cancelled=true;
    try{op.transition?.skipTransition();}catch{}
    for(const animation of op.animations)animation.cancel();
    clear(op);
  }
  function duration(){
    const raw=getComputedStyle(html).getPropertyValue('--j17-mode-duration').trim(),n=parseFloat(raw);
    return Number.isFinite(n)?Math.max(120,Math.min(1100,raw.endsWith('ms')?n:n*1000)):720;
  }
  async function stageSequence(op,perform){
    const sign=op.direction==='backward'?-1:1, mobile=innerWidth<=930;
    html.dataset.stageTransition=op.direction;
    op.phase='retracting';html.dataset.modeTransitionPhase='retracting';
    const outgoing=[document.querySelector('.j17-panel'),document.querySelector('.j17-scene-caption')].filter(Boolean);
    const retract=outgoing.map((node,index)=>{
      const panel=node.matches('.j17-panel');
      const end=panel?(mobile?'translate3d(0,28px,0) scale(.97)':`perspective(1200px) translate3d(${sign*100}px,0,-90px) rotateY(${-sign*10}deg) scale(.94)`):`translate3d(${-sign*30}px,-12px,0)`;
      const animation=node.animate([{opacity:1,transform:'none'},{opacity:0,transform:end}],{duration:panel?220:170,easing:'cubic-bezier(.55,0,.75,.35)',fill:'forwards'});
      op.animations.push(animation);return animation;
    });
    await Promise.allSettled(retract.map(a=>a.finished));
    if(op.cancelled||current!==op)return false;
    await perform();
    retract.forEach(a=>a.cancel());
    if(op.cancelled||current!==op||reduced())return op.committed;
    // Animate only DOM controls; the persistent WebGL canvas keeps drawing the camera move.
    op.phase='revealing';html.dataset.modeTransitionPhase='revealing';
    const panel=document.querySelector('.j17-panel'),caption=document.querySelector('.j17-scene-caption');
    const items=[panel,caption].filter(Boolean);
    items.forEach(node=>{
      const isPanel=node===panel;
      const from=isPanel?(mobile?'translate3d(0,42px,0) scale(.97)':`perspective(1200px) translate3d(${-sign*94}px,0,-70px) rotateY(${sign*8}deg) scale(.95)`):`translate3d(${sign*36}px,16px,0)`;
      const animation=node.animate([{opacity:0,transform:from},{opacity:1,transform:'none'}],{duration:isPanel?620:480,delay:isPanel?110:70,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
      op.animations.push(animation);
    });
    document.querySelectorAll('#j17-content > *').forEach((node,index)=>{
      if(index>5)return;
      const animation=node.animate([{opacity:0,transform:'translate3d(0,18px,0)'},{opacity:1,transform:'none'}],{duration:390,delay:150+index*35,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
      op.animations.push(animation);
    });
    const active=document.querySelector('.j17-rail [aria-current=step] > span:first-child');
    if(active)op.animations.push(active.animate([{boxShadow:'0 0 0 0 #9edfdc66',transform:'scale(.88)'},{boxShadow:'0 0 0 13px #9edfdc00',transform:'scale(1)'}],{duration:680,easing:'ease-out'}));
    await Promise.allSettled(op.animations.map(a=>a.finished));
    return op.committed;
  }
  async function fallback(op,perform){
    if(op.cancelled)return false;
    html.classList.add('mode-transition-fallback');
    // Retract the actual outgoing workspace before revealing its successor.
    // This also keeps the directional cue in browsers without View Transitions.
    const outgoing=[document.querySelector('.j17-panel'),document.querySelector('.j17-rail'),document.querySelector('.j17-bottom'),document.querySelector('.j17-scene-wrap'),document.querySelector('.j17-mode-grid')].filter(Boolean);
    if(!outgoing.length){const page=document.querySelector('#main .page-content');if(page)outgoing.push(page);}
    op.phase='retracting';html.dataset.modeTransitionPhase='retracting';
    const departures=outgoing.map(node=>{
      const transform=node.matches('.j17-panel')?'perspective(1100px) translate3d(140px,0,-80px) rotateY(-13deg) scale(.9)':node.matches('.j17-rail')?'translate3d(-90px,0,0)':node.matches('.j17-bottom')?'translate3d(0,72px,0)':node.matches('.j17-scene-wrap')?'scale(.79) translate3d(-3%,0,0)':'translate3d(0,-38px,0) scale(.94)';
      const animation=node.animate([{opacity:1,transform:'none'},{opacity:0,transform}],{duration:Math.min(300,duration()*.45),easing:'cubic-bezier(.4,0,.3,1)',fill:'forwards'});
      op.animations.push(animation);return animation;
    });
    await Promise.allSettled(departures.map(a=>a.finished));
    if(op.cancelled||current!==op)return false;
    await perform();
    departures.forEach(a=>a.cancel());
    if(op.cancelled||current!==op||reduced())return op.committed;
    op.phase='animating';html.dataset.modeTransitionPhase='animating';
    const entering=op.direction==='enter',nodes=entering
      ?[document.querySelector('.j17-scene-wrap'),document.querySelector('.j17-panel'),document.querySelector('.j17-rail'),document.querySelector('.j17-bottom')]
      :[document.querySelector('#main .page-content')];
    const actual=nodes.filter(Boolean);if(!actual.length){const main=document.querySelector('#main .page-content');if(main)actual.push(main);}
    actual.forEach((node,index)=>{
      const panel=node.matches('.j17-panel'),rail=node.matches('.j17-rail'),actions=node.matches('.j17-bottom');
      const from=entering?(panel?'perspective(1100px) translate3d(120px,0,-80px) rotateY(-11deg) scale(.93)':rail?'translate3d(-78px,0,0)':actions?'translate3d(0,64px,0)':'scale(.8)'):'translate3d(0,48px,0) scale(.94)';
      const animation=node.animate([{opacity:.08,transform:from},{opacity:1,transform:'none'}],{duration:duration(),delay:entering&&index?index*35:0,easing:'cubic-bezier(.18,.7,.18,1)',fill:'none'});
      op.animations.push(animation);
    });
    await Promise.allSettled(op.animations.map(a=>a.finished));
    return op.committed;
  }
  async function run(updateDOM,options={}){
    if(typeof updateDOM!=='function')return false;
    skip(true);
    const kind=options.kind==='stage'?'stage':'mode';
    const op={id:++sequence,kind,direction:kind==='stage'?(options.direction==='backward'?'backward':'forward'):(options.direction==='exit'?'exit':'enter'),phase:'capturing',expectedHash:options.expectedHash||location.hash,transition:null,animations:[],committed:false,started:false,cancelled:false,guard:null};
    current=op;
    const perform=async()=>{
      if(op.cancelled||op.started)return op.committed;
      op.started=true;op.phase='updating';
      if(current===op)html.dataset.modeTransitionPhase='updating';
      await updateDOM();op.committed=true;
      if(!op.cancelled){op.phase='animating';if(current===op)html.dataset.modeTransitionPhase='animating';}
      return true;
    };
    window.YV_CINEMATIC?.stop();
    try{
      if(reduced()||document.hidden){await perform();return op.committed;}
      html.dataset.modeTransition=op.direction;html.dataset.modeTransitionPhase='capturing';
      // This bounds visual cleanup; it never delays or simulates the real update.
      op.guard=setTimeout(()=>{if(current===op)skip(false);},2500);
      if(kind==='stage')return await stageSequence(op,perform);
      if(typeof document.startViewTransition==='function'){
        try{op.transition=document.startViewTransition(perform);}
        catch{await fallback(op,perform);return op.committed;}
        op.transition.ready.catch(()=>{});
        await op.transition.updateCallbackDone;
        await op.transition.finished.catch(()=>{});
      }else await fallback(op,perform);
      return op.committed;
    }catch(error){
      last={id:op.id,direction:op.direction,committed:op.committed,cancelled:op.cancelled,error:error?.name||'Error'};
      return false;
    }finally{
      if(!last||last.id<op.id)last={id:op.id,direction:op.direction,committed:op.committed,cancelled:op.cancelled,native:!!op.transition};
      clear(op);
    }
  }
  function commitHash(hash){
    if(location.hash===hash)return Promise.resolve();
    return new Promise(resolve=>{
      const changed=()=>{window.removeEventListener('hashchange',changed);queueMicrotask(resolve);};
      window.addEventListener('hashchange',changed);
      location.hash=hash;
    });
  }
  function navigate(hash,options={}){
    const url=new URL(hash,location.href);
    if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search)return Promise.resolve(false);
    return run(()=>commitHash(url.hash),{...options,expectedHash:url.hash});
  }
  document.addEventListener('click',event=>{const link=event.target.closest('a.j17-entry');if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey)return;event.preventDefault();navigate(link.hash,{direction:'enter'});});
  // Stage navigation, Back and Forward supersede an unfinished mode animation.
  window.addEventListener('hashchange',()=>{if(current&&location.hash!==current.expectedHash)skip(true);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)skip(false);});
  media.addEventListener('change',()=>{if(reduced())skip(false);});
  window.YV_MODE_TRANSITIONS={run,navigate,stage:(hash,options={})=>navigate(hash,{...options,kind:'stage'}),skip:()=>skip(false),state,reduced};
})();
