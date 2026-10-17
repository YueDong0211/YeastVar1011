'use strict';
(() => {
  const A=()=>window.YV_APP, $=s=>document.querySelector(s);
  const lang=()=>['zh','en','fr','es','eu'].indexOf(A()?.prefs().language||'zh');
  const words={
    appearance:['场景与阅读','Scene & reading','Scène et lecture','Escena y lectura','Eszena eta irakurketa'],
    immersive:['观测场景','Observatory','Observatoire','Observatorio','Behatokia'],
    focus:['专注阅读','Focused reading','Lecture concentrée','Lectura enfocada','Irakurketa arretatsua'],
    sceneHelp:['调整环境层次，保留全部研究内容。','Adjust the atmosphere while keeping every research control.','Réglez l’ambiance en conservant toutes les commandes.','Ajusta el ambiente conservando todos los controles.','Doitu giroa ikerketa-kontrol guztiak mantenduz.'],
    motion:['动态效果','Motion','Animations','Animación','Mugimendua'],
    comfort:['舒适间距','Comfortable','Confortable','Cómodo','Erosoa'],
    compact:['紧凑间距','Compact','Compact','Compacto','Trinkoa'],
    floating:['切换为浮窗','Float this panel','Détacher ce panneau','Panel flotante','Panel flotatzailea'],
    dock:['停靠到右侧','Dock to the right','Ancrer à droite','Anclar a la derecha','Ainguratu eskuinean'],
    move:['拖动窗口；方向键移动，Home复位','Drag; arrow keys move, Home resets','Glisser ; flèches pour déplacer, Origine pour réinitialiser','Arrastra; flechas para mover, Inicio para restablecer','Arrastatu; geziak mugitzeko, Hasiera berrezartzeko'],
    expand:['展开窗口','Expand panel','Agrandir le panneau','Ampliar panel','Handitu panela'],
    restore:['恢复窗口','Restore panel','Restaurer le panneau','Restaurar panel','Leheneratu panela'],
    plan:['当前方案','Current plan','Plan actuel','Plan actual','Uneko plana'],
    review:['审阅方案','Review plan','Réviser le plan','Revisar plan','Berrikusi plana'],
    close:['关闭','Close','Fermer','Cerrar','Itxi'],
    observation:['探索分析路径','Explore analysis paths','Explorer les parcours','Explorar rutas de análisis','Arakatu analisi-bideak'],
    scope:['从分子证据到表达变异','From molecules to variation','Des molécules à la variabilité','De moléculas a variación','Molekuletatik aldakortasunera']
  };
  const T=k=>words[k]?.[Math.max(0,lang())]||k, E=v=>A().esc(v);
  const icons={
    scene:'<circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-35 12 12)"/><path d="M3 3h2m-1-1v2m15 15h3m-1.5-1.5v3"/>',
    float:'<rect x="3" y="3" width="18" height="18" rx="3"/><rect x="10" y="10" width="11" height="11" rx="2"/><path d="m6 6 4 4m-4 0V6h4"/>',
    dock:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M14 3v18M6 12h5m-2-2 2 2-2 2"/>',
    expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
    move:'<path d="M12 3v18M3 12h18m-12-6 3-3 3 3m-6 12 3 3 3-3M6 9l-3 3 3 3m12-6 3 3-3 3"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>'
  };
  const I=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[k]||icons.scene}</svg>`;
  let popup=null, panel=null, shade=null, controls=null, geometry=null, drag=null, expanded=false, floatPreferred=true;
  let sceneObserver=null, parallaxFrame=0, initialized=false;
  try{floatPreferred=JSON.parse(localStorage.getItem('yv.atelier.window')||'{}').floating!==false}catch{}
  const reduced=()=>A()?.prefs().reducedMotion||A()?.prefs().backgroundMotion===false||A()?.prefs().atelierScene==='focus'||matchMedia('(prefers-reduced-motion: reduce)').matches;
  function mode(){
    const p=A().prefs(),root=document.documentElement;
    root.classList.toggle('atelier-focus',p.atelierScene==='focus');
    root.classList.toggle('atelier-still',Boolean(reduced()));
    root.classList.toggle('atelier-hidden',document.hidden);
  }
  function appearanceContent(){const p=A().prefs();return `<div class="a9-popover-title"><strong>${E(T('appearance'))}</strong><button class="icon-btn" data-a9="close" aria-label="${E(T('close'))}">${I('close')}</button></div><p>${E(T('sceneHelp'))}</p><div class="a9-scene-options">${['immersive','focus'].map(k=>`<button data-a9="scene" data-value="${k}" aria-pressed="${(p.atelierScene||'immersive')===k}"><span class="a9-scene-swatch a9-swatch-${k}"></span>${E(T(k))}</button>`).join('')}</div><div class="a9-density">${['comfortable','compact'].map((k,i)=>`<button data-a9="density" data-value="${k}" aria-pressed="${p.density===k}">${E(T(i?'compact':'comfort'))}</button>`).join('')}</div><label class="a9-motion"><span>${E(T('motion'))}</span><input type="checkbox" data-a9="motion" ${p.backgroundMotion!==false&&!p.reducedMotion?'checked':''}></label>`}
  function closeAppearance(){if(!popup)return;popup.remove();popup=null;$('#a9-appearance')?.setAttribute('aria-expanded','false')}
  function showAppearance(){
    if(popup){closeAppearance();return}
    popup=document.createElement('section');popup.className='a9-appearance-popover';popup.setAttribute('role','dialog');popup.setAttribute('aria-label',T('appearance'));popup.innerHTML=appearanceContent();const shortcut=document.createElement('a');shortcut.className='i15-transition-shortcut';shortcut.href='#settings?section=transitions';shortcut.textContent=({zh:'页面转场 · 轻滑 / 酵母 3D',en:'Transitions · Slide / Yeast 3D',fr:'Transitions · Glissement / Levure 3D',es:'Transiciones · Deslizamiento / Levadura 3D',eu:'Trantsizioak · Irristatzea / Legamia 3D'}[A().prefs().language]);shortcut.addEventListener('click',closeAppearance);popup.append(shortcut);document.body.append(popup);
    const button=$('#a9-appearance'),r=button.getBoundingClientRect();popup.style.right=Math.max(16,innerWidth-r.right)+'px';popup.style.top=Math.max(12,Math.min(innerHeight-popup.offsetHeight-12,r.bottom+12))+'px';button.setAttribute('aria-expanded','true');popup.querySelector('button').focus();
  }
  function header(){
    let button=$('#a9-appearance');
    if(!button){button=document.createElement('button');button.id='a9-appearance';button.className='a9-appearance-trigger icon-btn';button.type='button';button.dataset.a9='appearance';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-expanded','false');$('#theme-toggle').before(button)}
    button.innerHTML=I('scene');button.title=T('appearance');button.setAttribute('aria-label',T('appearance'));
  }
  function home(){
    const cover=$('.station-cover');if(!cover||cover.querySelector('.a9-observation'))return;
    const d=A().data();
    const nodes=[['quality',A().t('metrics'),d.workflow.metrics.length,'quality'],['markers',A().t('genes'),d.markers.markers.length,'markers'],['projects',A().t('projects'),d.projects.projects.length,'chart']];
    const scene=document.createElement('div');scene.className='a9-observation';scene.setAttribute('aria-label',T('observation'));
    scene.innerHTML=`<div class="a9-instrument" aria-hidden="true"><i class="a9-orbit a9-orbit-one"></i><i class="a9-orbit a9-orbit-two"></i><i class="a9-orbit a9-orbit-three"></i><div class="a9-specimen"><img src="assets/yeastvar-emblem.png" alt="" decoding="async" width="300" height="300"></div><i class="a9-scan-ring"></i><span class="a9-reticle a9-reticle-one"></span><span class="a9-reticle a9-reticle-two"></span></div><div class="a9-observation-label"><i></i><em>Saccharomyces cerevisiae</em></div>${nodes.map(([r,label,n,icon],i)=>`<a href="#${r}" class="a9-orbit-node a9-node-${i}"><span>${A().icon(icon)}</span><span><strong>${E(label)}</strong></span>${A().icon('arrow')}</a>`).join('')}<span class="a9-scene-caption">${E(T('scope'))}</span>`;
    cover.querySelector('.station-cover-foot').before(scene);
    cover.addEventListener('pointermove',event=>{
      if(reduced()||event.pointerType==='touch'||parallaxFrame)return;
      parallaxFrame=requestAnimationFrame(()=>{parallaxFrame=0;const r=cover.getBoundingClientRect();scene.style.setProperty('--a9-px',((event.clientX-r.left)/r.width-.5)*16+'px');scene.style.setProperty('--a9-py',((event.clientY-r.top)/r.height-.5)*12+'px')});
    },{passive:true});
    cover.addEventListener('pointerleave',()=>{scene.style.setProperty('--a9-px','0px');scene.style.setProperty('--a9-py','0px')},{passive:true});
    sceneObserver=new IntersectionObserver(entries=>cover.classList.toggle('a9-scene-paused',!entries[0].isIntersecting),{threshold:.05});sceneObserver.observe(cover);
  }
  function planDock(){
    const allowed=['projects','tools','quality','literature','workflow'].includes(A().route());
    let el=$('#a9-plan-dock');
    if(!allowed){el?.remove();document.documentElement.classList.remove('a9-has-plan-dock');return}
    if(!el){el=document.createElement('aside');el.id='a9-plan-dock';el.className='a9-plan-dock'}
    const destination=innerWidth<=760?$('#main .page-content'):document.body;
    if(el.parentElement!==destination)destination.append(el);
    const p=window.YV_BUILDER.getPlan();
    el.setAttribute('aria-label',T('plan'));
    el.innerHTML=`<span class="a9-dock-symbol">${A().icon('workflow')}</span><div><small>${E(T('plan'))}</small><span><b>${p.tools.length}</b> ${E(A().t('tools'))}<i>·</i><b>${p.metrics.length}</b> ${E(A().t('metrics'))}</span></div><a href="#workbench?stage=review">${E(T('review'))}${A().icon('arrow')}</a>`;
    document.documentElement.classList.add('a9-has-plan-dock');
  }
  function windowControls(){
    if(!controls){controls=document.createElement('div');controls.className='a9-window-controls';controls.innerHTML=`<button class="icon-btn a9-drag-handle" data-a9="move">${I('move')}</button><button class="icon-btn" data-a9="floating"></button><button class="icon-btn" data-a9="expand">${I('expand')}</button>`;panel.querySelector('.drawer-top').insertBefore(controls,$('#close-drawer'));setupDrag(controls.querySelector('[data-a9=move]'))}
    const floating=panel.classList.contains('a9-floating');
    for(const [key,title]of [['move','move'],['floating',floating?'dock':'floating'],['expand',expanded?'restore':'expand']]){const b=controls.querySelector(`[data-a9=${key}]`);b.hidden=key!=='floating'&&!floating;b.title=T(title);b.setAttribute('aria-label',T(title));if(key==='floating')b.innerHTML=I(floating?'dock':'float')}
  }
  function place(){
    if(!panel?.classList.contains('a9-floating'))return;
    const margin=16,top=88,maxW=innerWidth-margin*2,maxH=innerHeight-top-margin;
    const g=expanded?{x:margin,y:top,w:maxW,h:maxH}:geometry||{x:innerWidth-Math.min(760,innerWidth*.66)-24,y:100,w:Math.min(760,innerWidth*.66),h:Math.min(790,innerHeight-132)};
    const w=Math.max(400,Math.min(g.w,maxW)),h=Math.max(260,Math.min(g.h,maxH)),x=Math.max(margin,Math.min(g.x,innerWidth-w-margin)),y=Math.max(76,Math.min(g.y,innerHeight-h-margin));
    Object.assign(panel.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});
  }
  function syncWindow(){
    if(!panel)return;
    if(panel.hidden){document.body.classList.remove('a9-floating-open');return}
    const floating=floatPreferred&&innerWidth>=980;
    panel.classList.toggle('a9-floating',floating);panel.classList.toggle('a9-maximized',floating&&expanded);panel.setAttribute('aria-modal',String(!floating));shade.hidden=floating;document.body.classList.toggle('a9-floating-open',floating);
    if(floating)place();else{for(const k of ['left','top','width','height'])panel.style.removeProperty(k)}
    windowControls();
  }
  function setupDrag(handle){
    handle.addEventListener('pointerdown',event=>{if(event.button!==0||!panel.classList.contains('a9-floating')||expanded)return;const r=panel.getBoundingClientRect();drag={id:event.pointerId,x:event.clientX,y:event.clientY,left:r.left,top:r.top,w:r.width,h:r.height};handle.setPointerCapture(event.pointerId);panel.classList.add('a9-dragging');event.preventDefault()});
    handle.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;geometry={x:drag.left+event.clientX-drag.x,y:drag.top+event.clientY-drag.y,w:drag.w,h:drag.h};place()});
    const end=event=>{if(!drag||event.pointerId!==drag.id)return;drag=null;panel.classList.remove('a9-dragging');if(handle.hasPointerCapture(event.pointerId))handle.releasePointerCapture(event.pointerId)};
    ['pointerup','pointercancel','lostpointercapture'].forEach(type=>handle.addEventListener(type,end));
    handle.addEventListener('keydown',event=>{if(!panel.classList.contains('a9-floating'))return;if(event.key==='Home'){event.preventDefault();geometry=null;expanded=false;syncWindow();return}if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();const r=panel.getBoundingClientRect(),step=event.shiftKey?40:16;geometry={x:r.x+(event.key==='ArrowRight'?step:event.key==='ArrowLeft'?-step:0),y:r.y+(event.key==='ArrowDown'?step:event.key==='ArrowUp'?-step:0),w:r.width,h:r.height};expanded=false;syncWindow()});
  }
  function init(){
    if(initialized)return;initialized=true;panel=$('#drawer');shade=$('#drawer-shade');windowControls();
    new MutationObserver(()=>{if(!panel.hidden)$('#drawer-content').scrollTop=0;syncWindow()}).observe(panel,{attributes:true,attributeFilter:['hidden','data-record-kind']});
    let resizeQueued=false;
    new ResizeObserver(()=>{if(resizeQueued||drag||panel.hidden||!panel.classList.contains('a9-floating')||expanded)return;resizeQueued=true;requestAnimationFrame(()=>{resizeQueued=false;const r=panel.getBoundingClientRect();geometry={x:r.x,y:r.y,w:r.width,h:r.height};if(r.right>innerWidth-8||r.bottom>innerHeight-8)place()})}).observe(panel);
    window.addEventListener('resize',()=>{closeAppearance();syncWindow();if(A()?.data())planDock()},{passive:true});
    window.addEventListener('yv:planchange',()=>{if(A()?.data())planDock()});
    document.addEventListener('visibilitychange',()=>{document.documentElement.classList.toggle('atelier-hidden',document.hidden)});
  }
  function afterRender(){
    if(!A()?.data())return;init();closeAppearance();sceneObserver?.disconnect();sceneObserver=null;mode();header();home();planDock();windowControls();
    if(A().route()==='settings'){
      const target=$('.station-settings');if(target&&!target.querySelector('.a9-settings-block')){const section=document.createElement('div');section.className='a9-settings-block';section.innerHTML=appearanceContent();section.querySelector('[data-a9=close]')?.remove();target.append(section)}
    }
    syncWindow();
  }
  function transition(){window.YV_NAVIGATION?.transition();}
  document.addEventListener('click',event=>{
    const b=event.target.closest('[data-a9]');
    if(!b){if(popup&&!popup.contains(event.target))closeAppearance();return}
    const k=b.dataset.a9;
    if(k==='appearance')showAppearance();else if(k==='close')closeAppearance();else if(k==='scene'||k==='density')A().setPreference(k==='scene'?'atelierScene':'density',b.dataset.value);
    else if(k==='floating'){floatPreferred=!panel.classList.contains('a9-floating');expanded=false;try{localStorage.setItem('yv.atelier.window',JSON.stringify({floating:floatPreferred}))}catch{}syncWindow()}
    else if(k==='expand'){expanded=!expanded;syncWindow()}
  });
  document.addEventListener('change',event=>{if(event.target.dataset.a9==='motion')A().setPreference('backgroundMotion',event.target.checked)});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&popup){event.preventDefault();event.stopImmediatePropagation();closeAppearance();$('#a9-appearance')?.focus()}},true);
  window.YV_ATELIER={afterRender,transition,syncWindow,getState:()=>({floating:panel?.classList.contains('a9-floating')||false,expanded,scene:A()?.prefs().atelierScene||'immersive',reduced:reduced(),popup:!!popup})};
})();
