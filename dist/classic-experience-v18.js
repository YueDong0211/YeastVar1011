/* Focused controls for the classic workspace; all plan actions remain native. */
'use strict';
(() => {
  const A=()=>window.YV_APP,B=()=>window.YV_BUILDER,P=()=>window.YV_PLAN;
  const langs=['zh','en','fr','es','eu'];
  const copy={
    more:['更多操作','More actions','Autres actions','Más acciones','Ekintza gehiago'],
    sections:['本步内容','In this step','Dans cette étape','En este paso','Urrats honetan'],
    question:['问题与方向','Question & directions','Question et axes','Pregunta y ejes','Galdera eta ildoak'],
    startingData:['数据起点','Starting data','Données de départ','Datos iniciales','Hasierako datuak'],
    available:['已有数据','Available data','Données disponibles','Datos disponibles','Eskuragarri dauden datuak'],
    overview:['环节说明','Stage overview','Aperçu de l’étape','Resumen de etapa','Urratsaren ikuspegi orokorra'],
    markers:['标记面板','Marker panel','Panel de marqueurs','Panel de marcadores','Markatzaileen panela'],
    metrics:['选择指标','Choose metrics','Choisir les mesures','Elegir métricas','Hautatu neurriak'],
    tools:['选择方法','Choose methods','Choisir les méthodes','Elegir métodos','Hautatu metodoak'],
    clear:['清除搜索','Clear search','Effacer la recherche','Borrar búsqueda','Garbitu bilaketa'],
    reset:['清除筛选','Clear filters','Effacer les filtres','Borrar filtros','Garbitu iragazkiak'],
    filterHelp:['清除搜索与“只看已选”，保留方案中的选择。','Clear the search and selected-only filter; keep your plan selections.','Effacez la recherche et le filtre de sélection, sans modifier le plan.','Borra la búsqueda y el filtro de seleccionados, conservando el plan.','Garbitu bilaketa eta hautatuen iragazkia; mantendu planeko hautaketak.'],
    continue:['继续','Continue','Continuer','Continuar','Jarraitu'],
    navigation:['继续方案设计','Continue planning','Poursuivre la conception','Continuar el diseño','Jarraitu plana diseinatzen'],
    noiseTemplate:['表达噪音起始方案','Expression-noise starting plan','Plan initial du bruit d’expression','Plan inicial de ruido de expresión','Adierazpen-zarataren hasierako plana'],
    moreClose:['收起更多操作','Close more actions','Fermer les autres actions','Cerrar más acciones','Itxi ekintza gehiago']
  };
  const T=k=>copy[k]?.[Math.max(0,langs.indexOf(A()?.prefs().language||'zh'))]||k;
  const E=x=>A().esc(x);
  const reduced=()=>!!A()?.prefs().reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches;
  let root=null,observer=null,sectionObserver=null,frame=0,sections=[];
  function beforeRender(){observer?.disconnect();sectionObserver?.disconnect();observer=sectionObserver=null;cancelAnimationFrame(frame);root=null;sections=[];}
  function moreActions(){
    const actions=root.querySelector('.pw-hero-actions');if(!actions||actions.querySelector('.c18-main-actions'))return;
    const preview=actions.querySelector('[data-pv13=open]'),entry=actions.querySelector('.j17-entry'),importButton=actions.querySelector('[data-build=import]'),helpers=actions.querySelector('.c4-assistance-shortcuts');
    const row=document.createElement('div');row.className='c18-main-actions';
    if(preview)row.append(preview);
    const details=document.createElement('details');details.className='c18-more';
    details.innerHTML=`<summary aria-label="${E(T('more'))}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg><span>${E(T('more'))}</span></summary><div class="c18-more-menu" role="group" aria-label="${E(T('more'))}"></div>`;
    const menu=details.querySelector('.c18-more-menu');if(importButton)menu.append(importButton);if(helpers)menu.append(helpers);
    if(menu.children.length)row.append(details);
    if(entry){entry.classList.add('c18-immersive-link');entry.querySelector('small')?.remove();row.append(entry);}
    actions.append(row);
    actions.querySelector('.ux16-secondary-actions')?.remove();actions.querySelector('.ux16-helpers')?.remove();
    details.addEventListener('toggle',()=>{const s=details.querySelector('summary');s.setAttribute('aria-expanded',String(details.open));s.setAttribute('aria-label',T(details.open?'moreClose':'more'));if(details.open)alignMenu();});
    const intro=root.querySelector('.ux16-template strong');if(intro)intro.textContent=T('noiseTemplate');
  }
  function alignMenu(){
    const menu=root?.querySelector('.c18-more[open] .c18-more-menu');if(!menu)return;
    menu.style.setProperty('--c18-menu-shift','0px');const bounds=menu.getBoundingClientRect();
    const shift=bounds.left<8?8-bounds.left:bounds.right>innerWidth-8?innerWidth-8-bounds.right:0;
    menu.style.setProperty('--c18-menu-shift',shift+'px');
  }
  function sectionNav(){
    if(P().navigationState().phase==='review')return;
    const content=root.querySelector('.pw-content');if(!content)return;
    if(P().navigationState().phase==='scope'){
      const nodes=[...content.querySelectorAll(':scope > .pw-section')];
      sections=[{key:'question',node:nodes.find(s=>s.querySelector('.pw-fields')),focus:'[data-plan-field=objective]'},{key:'startingData',node:content.querySelector('.pw-entry')},{key:'available',node:nodes.find(s=>s.querySelector('[data-inventory]'))}];
    }else{
      const metrics=content.querySelector('.pw-metric-section'),tools=content.querySelector('.pw-method')?.closest('.pw-section');
      sections=[{key:'markers',node:content.querySelector('.pw-annotation-overview .pw-section')},{key:'overview',node:[...content.querySelectorAll(':scope > .pw-section')].find(s=>!s.classList.contains('pw-metric-section')&&s!==tools)},{key:'metrics',node:metrics},{key:'tools',node:tools}];
    }
    sections=sections.filter(s=>s.node);if(sections.length<2)return;
    const nav=document.createElement('nav');nav.className='c18-section-nav';nav.setAttribute('aria-label',T('sections'));
    nav.innerHTML=`<span>${E(T('sections'))}</span>${sections.map(s=>`<button type="button" data-c18-jump="${s.key}">${E(T(s.key))}</button>`).join('')}`;
    for(const s of sections){s.node.classList.add('c18-section-target');s.node.dataset.c18Section=s.key;}
    root.querySelector('.pw-stage-intro')?.after(nav);
    sectionObserver=new IntersectionObserver(()=>{
      const visible=sections.filter(s=>{const r=s.node.getBoundingClientRect();return r.top<innerHeight*.65&&r.bottom>100;});
      const next=visible[0];nav.querySelectorAll('[data-c18-jump]').forEach(b=>b.setAttribute('aria-current',b.dataset.c18Jump===next?.key?'location':'false'));
    },{rootMargin:'-105px 0px -32% 0px',threshold:[0,.05,.5]});sections.forEach(s=>sectionObserver.observe(s.node));
  }
  function filterControls(){
    const controls=root.querySelector('.pw-metric-controls'),search=controls?.querySelector('.pw-metric-search');if(!controls||!search)return;
    const clear=document.createElement('button');clear.type='button';clear.className='c18-search-clear';clear.dataset.c18='clear-search';clear.setAttribute('aria-label',T('clear'));clear.title=T('clear');clear.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>';search.append(clear);
    const reset=document.createElement('button');reset.type='button';reset.className='c18-filter-reset';reset.dataset.c18='reset-filters';reset.textContent=T('reset');reset.title=T('filterHelp');controls.querySelector('.pw-metric-toolbar')?.append(reset);
    updateFilters();
  }
  function updateFilters(){
    if(!root?.isConnected)return;const input=root.querySelector('[data-pw-metric-search]'),only=root.querySelector('[data-pw-metric-selected]');
    const clear=root.querySelector('[data-c18=clear-search]'),reset=root.querySelector('[data-c18=reset-filters]');if(clear)clear.hidden=!input?.value;if(reset)reset.hidden=!input?.value&&!only?.checked;
  }
  function alignHandoff(){
    if(!root?.isConnected)return;const bar=root.querySelector('.pw-handoff.c18-handoff');if(!bar)return;
    const bounds=root.getBoundingClientRect(),width=Math.min(bounds.width,1440),left=bounds.left+(bounds.width-width)/2;
    bar.style.setProperty('--c18-bar-left',Math.round(left)+'px');bar.style.setProperty('--c18-bar-width',Math.round(width)+'px');
    const editable=document.activeElement?.matches('input:not([type=checkbox]):not([type=radio]),textarea,[contenteditable=true]');
    const keyboard=!!editable&&!!window.visualViewport&&window.visualViewport.height<innerHeight*.76;
    bar.classList.toggle('c18-keyboard',keyboard);root.style.setProperty('--c18-bottom-space',Math.ceil(bar.getBoundingClientRect().height+26)+'px');
  }
  function handoff(){
    if(P().navigationState().phase==='review'){root.style.setProperty('--c18-bottom-space','0px');return;}
    const bar=root.querySelector('.pw-handoff');if(!bar||!bar.querySelector('[data-pw=next],[data-pw=back]'))return;
    bar.classList.add('c18-handoff');bar.setAttribute('role','navigation');bar.setAttribute('aria-label',T('navigation'));
    const action=bar.querySelector('.pw-next strong');if(action)action.innerHTML=E(T('continue'))+A().icon('arrow');
    alignHandoff();observer=new ResizeObserver(()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(alignHandoff);});observer.observe(root);
  }
  function afterRender(){
    if(!A()?.data())return;beforeRender();root=A().route()==='workbench'?document.querySelector('#plan-workbench'):null;
    document.documentElement.classList.toggle('c18-classic',!!root);if(!root)return;
    root.classList.add('c18-workspace');root.dataset.c18Phase=P().navigationState().phase;
    moreActions();sectionNav();filterControls();handoff();
  }
  function resetFilters(all){
    const search=root?.querySelector('[data-pw-metric-search]'),only=root?.querySelector('[data-pw-metric-selected]');if(!search)return;
    search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));if(all&&only?.checked){only.checked=false;only.dispatchEvent(new Event('change',{bubbles:true}));}updateFilters();search.focus({preventScroll:true});
  }
  document.addEventListener('click',ev=>{
    const jump=ev.target.closest('[data-c18-jump]');if(jump&&root?.contains(jump)){const s=sections.find(s=>s.key===jump.dataset.c18Jump);if(!s)return;s.node.scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});const target=s.node.querySelector(s.focus||'h2');if(target){if(!target.matches('input,textarea,select,button,a'))target.tabIndex=-1;target.focus({preventScroll:true});}return;}
    const action=ev.target.closest('[data-c18]')?.dataset.c18;if(action==='clear-search')resetFilters(false);if(action==='reset-filters')resetFilters(true);
    const open=root?.querySelector('.c18-more[open]');if(open&&!open.contains(ev.target))open.open=false;
  });
  document.addEventListener('keydown',ev=>{if(ev.key!=='Escape')return;const open=root?.querySelector('.c18-more[open]');if(open){ev.preventDefault();open.open=false;open.querySelector('summary').focus();}});
  document.addEventListener('input',ev=>{if(ev.target.hasAttribute('data-pw-metric-search'))updateFilters();});
  document.addEventListener('change',ev=>{if(ev.target.hasAttribute('data-pw-metric-selected'))updateFilters();});
  document.addEventListener('focusin',()=>{if(root)requestAnimationFrame(alignHandoff);});
  document.addEventListener('focusout',()=>{if(root)requestAnimationFrame(alignHandoff);});
  window.visualViewport?.addEventListener('resize',alignHandoff);window.addEventListener('resize',()=>{alignHandoff();alignMenu();});
  window.YV_CLASSIC_EXPERIENCE={beforeRender,afterRender,text:T,state:()=>({active:!!root?.isConnected,phase:root?.dataset.c18Phase||null,sections:sections.map(s=>s.key),bottomNavigation:!!root?.querySelector('.c18-handoff')})};
})();
