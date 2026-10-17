'use strict';
(() => {
 const A=()=>window.YV_APP, B=()=>window.YV_BUILDER, $=s=>document.querySelector(s);
 const languages=['zh','en','fr','es','eu'];
 const words={
  find:['搜索研究问题或方法','Search questions or methods','Rechercher une question ou méthode','Buscar preguntas o métodos','Bilatu galderak edo metodoak'],
  chosen:['只看已选方向','Selected directions only','Axes sélectionnés uniquement','Solo ejes seleccionados','Hautatutako ildoak soilik'],
  results:['个匹配方向','matching directions','axes correspondants','ejes coincidentes','bat datozen ildo'],
  empty:['没有匹配的研究方向','No matching directions','Aucun axe correspondant','No hay ejes coincidentes','Ez dago bat datorren ildorik'],
  reset:['清除筛选','Clear filters','Effacer les filtres','Borrar filtros','Garbitu iragazkiak'],
  selected:['已选方向','Selected directions','Axes sélectionnés','Ejes seleccionados','Hautatutako ildoak'],
  save:['保存并返回','Save & return','Enregistrer et revenir','Guardar y volver','Gorde eta itzuli'],
  cancel:['取消','Cancel','Annuler','Cancelar','Utzi'],
  draft:['可跨搜索多选，保存后纳入当前方案。','Select across searches, then save to the current plan.','Sélectionnez dans plusieurs recherches, puis enregistrez dans le plan.','Selecciona en varias búsquedas y guarda en el plan actual.','Hautatu hainbat bilaketatan eta gorde uneko planean.'],
  current:['继续当前方案','Continue your plan','Reprendre votre plan','Continuar el plan','Jarraitu zure plana'],
  resume:['继续编辑','Continue editing','Continuer la modification','Seguir editando','Jarraitu editatzen'],
  review:['预览与导出','Preview & export','Aperçu et export','Vista previa y exportación','Aurrebista eta esportazioa'],
  template:['当前已载入表达噪音起始方案。请根据已有数据调整方法和指标，再补充研究方向。','An expression-noise starting plan is loaded. Adjust its methods and measures to your data, then choose research directions.','Un plan initial sur le bruit d’expression est chargé. Adaptez ses méthodes et mesures à vos données, puis choisissez les axes.','Se ha cargado un plan inicial de ruido de expresión. Adapta métodos y medidas a tus datos y elige los ejes.','Adierazpen-zarataren hasierako plana kargatu da. Egokitu metodoak eta neurriak zure datuetara, eta hautatu ildoak.'],
  templateTitle:['从起始方案开始','Start from a suggested plan','Partir d’un plan proposé','Partir de un plan sugerido','Hasi proposatutako planetik'],
  collapse:['收起辅助入口','Collapse helper links','Réduire les liens d’aide','Contraer enlaces de ayuda','Tolestu laguntza-estekak'],
  helper:['查找与设置','Search & settings','Recherche et réglages','Búsqueda y ajustes','Bilaketa eta ezarpenak']
 };
 const T=k=>words[k]?.[Math.max(0,languages.indexOf(A()?.prefs().language||'zh'))]||k;
 const E=x=>A().esc(x), fold=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 let renderedHash='', transient=null, routing=false, epoch=0;
 const positions=new Map();
 try{history.scrollRestoration='manual'}catch{}
 function descriptor(el){
  if(!el||!$('#main')?.contains(el))return null;
  if(el.id)return '#'+CSS.escape(el.id);
  if(el.matches('.pw-stepper a[href]'))return '.pw-stepper a[href="'+CSS.escape(el.getAttribute('href'))+'"]';
  const attrs=[...el.attributes].filter(a=>a.name.startsWith('data-')||['name','type'].includes(a.name));
  if(!attrs.length)return null;
  const selector=el.tagName.toLowerCase()+attrs.map(a=>'['+a.name+'="'+CSS.escape(a.value)+'"]').join('');
  return $(selector)===el?selector:null;
 }
 function capture(){const el=document.activeElement;return {y:scrollY,x:scrollX,selector:descriptor(el),start:typeof el?.selectionStart==='number'?el.selectionStart:null,end:typeof el?.selectionEnd==='number'?el.selectionEnd:null};}
 function restore(view,withFocus=true){
  if(!view)return;
  const el=view.selector&&$(view.selector);
  if(withFocus&&el&&!el.disabled&&el.getClientRects().length){el.focus({preventScroll:true});if(view.start!==null&&el.setSelectionRange){try{el.setSelectionRange(view.start,view.end)}catch{}}}
  window.scrollTo({top:view.y,left:view.x,behavior:'instant'});
 }
 function beforeRender(){transient=!routing&&renderedHash===location.hash?capture():null;epoch++;}
 function beforeRoute(previous){if(previous?.hash){positions.set(previous.hash,capture());if(positions.size>40)positions.delete(positions.keys().next().value);}routing=true;transient=null;}
 function afterRoute(previous){
  routing=false;const hash=location.hash,view=positions.get(hash),current=epoch;
  if(A()?.route()==='journey')return;
  // Rapid keyboard navigation can queue two hash events for the same final address.
  // The repeated render must retain the control focused by the first render.
  if(previous?.hash===hash&&view)restore(view,true);
  requestAnimationFrame(()=>{if(current!==epoch||location.hash!==hash)return;
   const navigationFocus=document.activeElement?.matches('.pw-substep.active,.pw-stepper a.active,[data-n14-move],[data-n14-swipe]');
   if(view&&!hash.includes('section='))restore(view,!navigationFocus);
   else if(!navigationFocus){
    const heading=$('#main h1')||$('#main');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
   }
  });
 }
 function home(){
  const end=$('.station-end');if(!end)return;
  const plan=B().getPlan(),state=window.YV_PLAN.getState();
  end.classList.add('ux16-resume');end.innerHTML=`<div><span class="eyebrow">${E(T('current'))}</span><h2>${E(plan.title||window.YV_PLAN.title())}</h2><p>${E(window.YV_PLAN.text(state.phase))}</p></div><div class="ux16-resume-actions"><a class="btn btn-primary" href="${E(window.YV_PLAN.href(state.phase))}">${E(T('resume'))}${A().icon('arrow')}</a><a class="text-link" href="#workbench?stage=review">${E(T('review'))}</a></div>`;
  const enter=$('.station-actions a:first-child');
  if(enter){enter.href=window.YV_PLAN.href(state.phase);if(!B().recoveryState?.().isDefaultTemplate)enter.innerHTML=E(T('resume'))+A().icon('arrow');}
 }
 function afterRender(){
  if(!A()?.data())return;
  if(A().route()==='overview')home();
  const scope=$('#plan-workbench[data-plan-phase=scope] .pw-content');
  if(scope&&B().recoveryState?.().isDefaultTemplate&&!$('.ux16-template')){
   const note=document.createElement('aside');note.className='ux16-template';note.innerHTML=`${A().icon('workflow')}<div><strong>${E(T('templateTitle'))}</strong><p>${E(T('template'))}</p></div>`;scope.prepend(note);
  }
  const helpers=$('.pw-hero-actions .c4-assistance-shortcuts');
  if(helpers&&!helpers.closest('.ux16-helpers')){const disclosure=document.createElement('details');disclosure.className='ux16-helpers';disclosure.innerHTML=`<summary>${A().icon('settings')}<span>${E(T('helper'))}</span></summary>`;helpers.before(disclosure);disclosure.append(helpers);}
  const actions=$('.pw-hero-actions');
  if(actions&&!$('#plan-workbench[data-plan-phase=review]')&&!actions.querySelector('.ux16-secondary-actions')){
   const secondary=document.createElement('div');secondary.className='ux16-secondary-actions';
   const nodes=[actions.querySelector('[data-pv13=open]'),actions.querySelector('[data-build=import]'),actions.querySelector('.ux16-helpers')].filter(Boolean);
   if(nodes.length){actions.append(secondary);secondary.append(...nodes);}
  }
  if(window.YV_JOURNEY){
   const target=A().route()==='workbench'?$('.ux16-secondary-actions')||$('.pw-hero-actions'):A().route()==='overview'?$('.station-actions'):null;
   if(target&&!target.querySelector('.j17-entry'))target.insertAdjacentHTML(A().route()==='overview'?'beforeend':'afterbegin',window.YV_JOURNEY.entryMarkup());
  }
  const toast=$('#toast');if(toast){toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');}
  const view=transient,current=epoch;transient=null;renderedHash=location.hash;
  if(view)queueMicrotask(()=>{if(current===epoch&&!routing)restore(view,document.activeElement===document.body||!document.activeElement?.isConnected)});
 }
 function openDirections(){
  const draft=new Set(B().getPlan().projects),projects=A().data().projects.projects,opener=document.activeElement;
  const d=document.createElement('dialog');d.className='pw-direction-dialog ux16-direction-dialog';d.setAttribute('aria-labelledby','ux16-directions-title');
  d.innerHTML=`<header><div><h2 id="ux16-directions-title">${E(window.YV_PLAN.text('directions'))}</h2><p>${E(T('draft'))}</p></div><button type="button" class="icon-btn" data-ux16="cancel" aria-label="${E(T('cancel'))}">${A().icon('close')}</button></header><div class="ux16-direction-controls"><label class="ux16-search">${A().icon('search')}<input type="search" data-ux16-query placeholder="${E(T('find'))}" aria-label="${E(T('find'))}" aria-controls="ux16-direction-results"></label><div><label><input type="checkbox" data-ux16-chosen>${E(T('chosen'))}</label><span data-ux16-results role="status"></span></div></div><div class="pw-direction-options" id="ux16-direction-results"></div><footer><span data-pw-draft-count role="status"></span><div><button type="button" class="btn" data-ux16="cancel">${E(T('cancel'))}</button><button type="button" class="btn btn-primary" data-ux16="save">${E(T('save'))}${A().icon('arrow')}</button></div></footer>`;
  const input=d.querySelector('[data-ux16-query]'),chosen=d.querySelector('[data-ux16-chosen]'),results=d.querySelector('#ux16-direction-results');
  const index=projects.map(p=>({p,search:fold(JSON.stringify(p))}));
  const count=()=>{d.querySelector('[data-pw-draft-count]').textContent=T('selected')+' · '+draft.size;};
  function render(){
   const tokens=fold(input.value).trim().split(/\s+/).filter(Boolean),rows=index.filter(({p,search})=>(!chosen.checked||draft.has(p.id))&&tokens.every(q=>search.includes(q))).map(x=>x.p);
   d.querySelector('[data-ux16-results]').textContent=rows.length+' '+T('results');
   results.innerHTML=rows.length?rows.map(p=>`<label><input type="checkbox" data-ux16-direction="${E(p.id)}" ${draft.has(p.id)?'checked':''}><span><strong>${E(A().tx(p.title))}</strong><small>${E(A().tx(p.question))}</small></span></label>`).join(''):`<div class="ux16-empty"><p>${E(T('empty'))}</p><button type="button" class="btn" data-ux16="reset">${E(T('reset'))}</button></div>`;
   count();
  }
  input.addEventListener('input',render);chosen.addEventListener('change',render);
  d.addEventListener('change',ev=>{const id=ev.target.dataset.ux16Direction;if(!id)return;ev.target.checked?draft.add(id):draft.delete(id);if(chosen.checked){render();input.focus();}else count();});
  d.addEventListener('click',ev=>{const action=ev.target.closest('[data-ux16]')?.dataset.ux16;if(action==='cancel')d.close();if(action==='reset'){input.value='';chosen.checked=false;render();input.focus();}if(action==='save'){B().setProjects([...draft]);d.close();A().render();A().toast(window.YV_PLAN.text('scopeChange'));requestAnimationFrame(()=>$('[data-pw=directions]')?.focus({preventScroll:true}));}});
  d.addEventListener('close',()=>{d.remove();(opener?.isConnected?opener:$('[data-pw=directions]'))?.focus({preventScroll:true});},{once:true});
  document.body.append(d);render();d.showModal();input.focus();
 }
 document.addEventListener('click',ev=>{if(!ev.target.closest('.skip-link'))return;ev.preventDefault();$('#main')?.focus({preventScroll:true});$('#main')?.scrollIntoView({block:'start',behavior:'instant'});},true);
 window.YV_UX={beforeRender,afterRender,beforeRoute,afterRoute,openDirections};
})();
