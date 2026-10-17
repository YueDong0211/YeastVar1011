'use strict';
(() => {
  const A=()=>window.YV_APP, P=()=>window.YV_PLAN;
  const words={
    previous:['上一环节','Previous stage','Étape précédente','Etapa anterior','Aurreko etapa'],
    next:['下一环节','Next stage','Étape suivante','Etapa siguiente','Hurrengo etapa'],
    swipe:['在标题区域左右滑动，切换环节','Swipe this heading to move between stages','Balayez cet en-tête pour changer d’étape','Desliza este encabezado para cambiar de etapa','Irristatu goiburu hau etapa aldatzeko'],
    keyboard:['方向键切换环节','Arrow keys change stages','Les flèches changent d’étape','Las flechas cambian de etapa','Geziek etapa aldatzen dute']
  };
  const T=k=>words[k]?.[Math.max(0,['zh','en','fr','es','eu'].indexOf(A()?.prefs().language||'zh'))]||k;
  const reduced=()=>!!A()?.prefs().reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches;
  const routeOrder=['overview','cluster','workbench','workflow','quality','markers','tools','literature','formulas','projects','galaxy','lab','ideas','saved','settings','contribute','builder'];
  let snapshot=null,animation=null,pendingFocus=null,gesture=null;
  function position(){const route=A()?.route(),state=route==='workbench'?P().navigationState():null;return {route,hash:location.hash,phase:state?.phase,step:state?.step,scrollY};}
  function current(){return snapshot?{...snapshot,scrollY}:null;}
  function order(x){if(x?.route!=='workbench')return routeOrder.indexOf(x?.route)*100;const phases=P().navigationState().phases;let value=0;for(const f of phases){if(f.id===x.phase)return value+Math.max(0,f.steps.indexOf(x.step));value+=Math.max(1,f.steps.length);}return value;}
  function reveal(el){const rail=el?.closest('.pw-stepper,.pw-step-tabs');if(!rail)return;const r=rail.getBoundingClientRect(),b=el.getBoundingClientRect();if(b.left<r.left+8)rail.scrollLeft-=r.left-b.left+8;else if(b.right>r.right-8)rail.scrollLeft+=b.right-r.right+8;}
  function navigateFrom(el){if(el.matches('a'))location.hash=el.hash;else if(el.dataset.id)P().navigate(P().navigationState().phase,el.dataset.id);}
  function afterRender(){
    if(!A()?.data())return;
    const root=document.getElementById('plan-workbench');
    if(root){
      const state=P().navigationState(),intro=root.querySelector('.pw-stage-intro');
      if(intro&&!intro.dataset.n14Ready){
        intro.dataset.n14Ready='true';intro.dataset.n14Swipe='';intro.tabIndex=0;intro.setAttribute('role','region');intro.setAttribute('aria-label',T('swipe')+'. '+T('keyboard'));
        const label=state.step?A().field('steps',A().maps().step.get(state.step),'title'):'';
        const controls=document.createElement('div');controls.className='n14-navigation';
        controls.innerHTML=`${label?`<span class="n14-current-step">${A().esc(label)}</span>`:''}<div class="n14-navigation-controls"><button type="button" class="n14-previous" data-n14-move="-1" aria-label="${A().esc(T('previous'))}" ${state.previous?'':'disabled'}>${A().icon('arrow')}</button><button type="button" data-n14-move="1" aria-label="${A().esc(T('next'))}" ${state.next?'':'disabled'}>${A().icon('arrow')}</button></div><small class="n14-swipe-hint">${A().esc(T('swipe'))}</small>`;
        intro.append(controls);
      }
      root.querySelectorAll('.pw-stepper a,.pw-substep').forEach(el=>{el.tabIndex=el.matches('.active')?0:-1;});
      root.querySelector('.pw-step-tabs')?.setAttribute('role','navigation');
      root.querySelectorAll('.pw-stepper .active,.pw-step-tabs .active').forEach(reveal);
      if(pendingFocus){const target=root.querySelector(pendingFocus);(target&&!target.disabled?target:intro)?.focus({preventScroll:true});pendingFocus=null;}
    }
    snapshot=position();
  }
  function transition(previous){
    animation?.cancel();animation=null;
    const next=position();if(!previous||previous.hash===next.hash)return;
    if(previous.route==='journey'||next.route==='journey'){window.YV_CINEMATIC?.stop();return;}
    const mode=window.YV_CINEMATIC?.getMode()||'standard';
    if(reduced()||mode==='off'){window.YV_CINEMATIC?.stop();return;}
    const within=previous.route==='workbench'&&next.route==='workbench',direction=order(next)>=order(previous)?1:-1;
    const content=document.querySelector(within?'.pw-content':'#main .page-content');
    if(within){
      const header=document.querySelector('.pw-stage-intro');
      if(previous.scrollY>120&&header)window.scrollTo({top:Math.max(0,header.getBoundingClientRect().top+window.scrollY-150),behavior:'instant'});
    }
    if(mode==='cinematic'){
      const step=next.step&&A().maps().step.get(next.step);
      window.YV_CINEMATIC.play({direction,label:step?A().field('steps',step,'title'):A().t(next.route)}).catch(()=>{});
    }
    if(content)animation=content.animate([{opacity:.68,transform:`translate3d(${direction*20}px,0,0)`},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:240,easing:'cubic-bezier(.2,.7,.2,1)'});
  }
  document.addEventListener('click',event=>{const b=event.target.closest('[data-n14-move]');if(b&&!b.disabled){pendingFocus='[data-n14-move="'+b.dataset.n14Move+'"]';P().move(Number(b.dataset.n14Move));}});
  document.addEventListener('keydown',event=>{
    if(event.altKey||event.ctrlKey||event.metaKey||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    const el=event.target.closest('.pw-stepper a,.pw-substep'),header=event.target.matches('[data-n14-swipe]');
    if(!el&&!header)return;
    if(header&&!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();
    if(header){pendingFocus='[data-n14-swipe]';if(event.key==='ArrowLeft'||event.key==='ArrowRight')P().move(event.key==='ArrowRight'?1:-1);return;}
    const rail=el.closest('.pw-stepper,.pw-step-tabs'),items=[...rail.querySelectorAll(el.matches('a')?'a':'.pw-substep')],at=items.indexOf(el);
    const index=event.key==='Home'?0:event.key==='End'?items.length-1:Math.max(0,Math.min(items.length-1,at+(event.key==='ArrowRight'?1:-1))),next=items[index];
    if(next===el)return;
    pendingFocus=el.matches('a')?'.pw-stepper a.active':'.pw-step-tabs .active';navigateFrom(next);
  });
  document.addEventListener('pointerdown',event=>{
    const target=event.target.closest('[data-n14-swipe]');
    if(!target||event.pointerType!=='touch'||event.target.closest('button,a,input,select,textarea,[contenteditable]'))return;
    gesture={id:event.pointerId,x:event.clientX,y:event.clientY,target};
  },{passive:true});
  document.addEventListener('pointerup',event=>{
    if(!gesture||gesture.id!==event.pointerId)return;
    const g=gesture;gesture=null;
    const dx=event.clientX-g.x,dy=event.clientY-g.y;
    if(g.target.isConnected&&Math.abs(dx)>56&&Math.abs(dx)>Math.abs(dy)*1.6)P().move(dx<0?1:-1);
  },{passive:true});
  document.addEventListener('pointercancel',()=>{gesture=null;},{passive:true});
  window.YV_NAVIGATION={afterRender,transition,current,reduced};
})();
