'use strict';
(() => {
  const A=()=>window.YV_APP, $=(s,r=document)=>r.querySelector(s);
  const words={
    design:['制定方案','Plan the study','Concevoir l’étude','Diseñar el estudio','Azterketa diseinatu'],
    evidence:['数据与证据','Data & evidence','Données et preuves','Datos y evidencias','Datuak eta ebidentziak'],
    explore:['分析与拓展','Analysis & exploration','Analyses et exploration','Análisis y exploración','Analisia eta esplorazioa'],
    personal:['个人工作区','Personal workspace','Espace personnel','Espacio personal','Lan-eremu pertsonala'],
    steps:['方案步骤','Plan stages','Étapes du plan','Etapas del plan','Planaren urratsak'],
    route:['方案构建路径','Build your research plan','Construire votre plan','Construye tu plan','Eraiki zure ikerketa-plana'],
    scope:['研究范围','Study scope','Périmètre','Alcance','Eremua'],
    prep:['数据与质控','Data & QC','Données et QC','Datos y QC','Datuak eta QC'],
    annotation:['状态与注释','States & annotation','États et annotation','Estados y anotación','Egoerak eta anotazioa'],
    noise:['表达噪音','Expression noise','Bruit d’expression','Ruido de expresión','Adierazpen-zarata'],
    extensions:['研究拓展','Extensions','Extensions','Extensiones','Hedapenak'],
    review:['审阅与导出','Review & export','Révision et export','Revisión y exportación','Berrikusi eta esportatu'],
    display:['显示与操作','Display & controls','Affichage et commandes','Pantalla y controles','Pantaila eta kontrolak'],
    rules:['证据与规则','Evidence & principles','Preuves et principes','Evidencias y principios','Ebidentziak eta printzipioak'],
    sources:['来源清单','Source catalogue','Catalogue des sources','Catálogo de fuentes','Iturrien katalogoa'],
    emptyTitle:['还没有收藏记录','No saved records yet','Aucun élément enregistré','Aún no hay elementos guardados','Ez dago gordetako erregistrorik'],
    emptyBody:['在基因、指标、方法或文献详情中点击收藏，即可在这里集中查阅并添加笔记。','Save a gene, metric, method or paper from its details to review it here with your notes.','Enregistrez un gène, indicateur, outil ou article depuis sa fiche pour le retrouver ici avec vos notes.','Guarda un gen, una métrica, un método o un artículo desde su ficha para revisarlo aquí con tus notas.','Gorde gene, metrika, metodo edo artikulu bat haren xehetasunetatik, hemen oharrekin berrikusteko.'],
    all:['全部收藏','All saved','Tous les favoris','Todos los guardados','Gordetako guztiak'],
    markerReport:['补充标记证据','Suggest marker evidence','Proposer un marqueur','Proponer evidencia de marcadores','Proposatu markatzaile-ebidentzia'],
    markerFields:['基因 / ORF · 标签 · 测量层级 · 适用条件 · 论文与表格位置','Gene / ORF · tag · assay level · context · paper and table','Gène / ORF · étiquette · mesure · contexte · article et tableau','Gen / ORF · etiqueta · medición · contexto · artículo y tabla','Genea / ORFa · etiketa · neurketa · testuingurua · artikulua eta taula'],
    methodReport:['补充方法或指标','Suggest a method or metric','Proposer une méthode','Proponer un método o métrica','Proposatu metodo edo metrika'],
    methodFields:['工具与版本 · 输入数据 · 原生输出 · 单位与分母 · 官方资料','Tool and version · inputs · native outputs · units and denominator · documentation','Outil et version · entrées · sorties · unités et dénominateur · documentation','Herramienta y versión · entradas · salidas · unidades y denominador · documentación','Tresna eta bertsioa · sarrerak · irteerak · unitateak eta izendatzailea · dokumentazioa'],
    issueReport:['反馈页面问题','Report a page issue','Signaler un problème','Informar de un problema','Jakinarazi orri-arazo bat'],
    issueFields:['页面 · 操作步骤 · 预期行为 · 实际结果 · 浏览器或设备','Page · steps · expected behaviour · actual result · browser or device','Page · étapes · comportement attendu · résultat · navigateur ou appareil','Página · pasos · comportamiento esperado · resultado · navegador o dispositivo','Orria · urratsak · espero zen portaera · emaitza · arakatzailea edo gailua'],
    contact:['准备邮件','Prepare email','Préparer un courriel','Preparar correo','Prestatu mezua'],
    back:['返回顶部','Back to top','Retour en haut','Volver arriba','Itzuli goialdera'],
    searchHint:['按基因、指标、方法或论文检索','Search genes, metrics, methods or papers','Rechercher gènes, indicateurs, méthodes ou articles','Buscar genes, métricas, métodos o artículos','Bilatu geneak, metrikak, metodoak edo artikuluak']
  };
  const T=k=>words[k]?.[['zh','en','fr','es','eu'].indexOf(A()?.prefs().language||'zh')]||k;
  const E=v=>A().esc(v), I=k=>A().icon(k);
  const groups=[['design','workflow',['workbench','workflow','quality','cluster']],['evidence','literature',['markers','tools','literature','formulas']],['explore','galaxy',['projects','galaxy','lab','ideas']],['personal','saved',['saved','settings','contribute']]];
  let openGroups={};try{openGroups=JSON.parse(localStorage.getItem('yv.navigation.v11')||'{}')}catch{}
  let settingsTab='display',savedKind='all';
  function navLink(k,href='#'+k){return `<a class="nav-link ${A().route()===k?'active':''}" href="${href}" ${A().route()===k?'aria-current="page"':''} title="${E(A().t(k))}">${I(k)}<span>${E(A().t(k))}</span></a>`}
  function nav(){return `<div class="pw-nav-group" data-nav-group="home">${navLink('overview')}</div>`+groups.map(([id,icon,routes])=>`<details class="pw-nav-folder p11-nav-folder" data-nav-folder="${id}" ${routes.includes(A().route())||openGroups[id]?'open':''}><summary title="${E(T(id))}">${I(icon)}<span>${E(T(id))}</span><span class="p11-nav-count">${routes.length}</span>${I('arrow')}</summary><div data-nav-group="${id}">${routes.map(k=>navLink(k,k==='workbench'?'#workbench?stage='+window.YV_PLAN.getState().phase:'#'+k)).join('')}</div></details>`).join('')}
  function shell(){
    const stage=$('#stage-label');if(stage)stage.textContent=T('steps');
    const search=$('#global-search-button');if(search){search.title=T('searchHint');search.setAttribute('aria-label',T('searchHint'));const key=$('kbd',search);if(key)key.textContent=/Mac|iPhone|iPad/.test(navigator.platform)?'⌘ K':'Ctrl K'}
    const side=$('#sidebar');side?.setAttribute('aria-label',A().t('workspace'));
    document.querySelectorAll('.p11-nav-folder').forEach(folder=>folder.addEventListener('toggle',()=>{if(!folder.isConnected)return;openGroups[folder.dataset.navFolder]=folder.open;try{localStorage.setItem('yv.navigation.v11',JSON.stringify(openGroups))}catch{}}));
    placeGuide();
  }
  function placeGuide(){const launcher=$('.guide-launcher');if(!launcher)return;const parent=$('.footer');if(parent&&launcher.parentElement!==parent)parent.append(launcher)}
  function home(){
    const intro=$('.station-introduction');if(!intro||$('.p11-home-path'))return;
    const nav=document.createElement('nav');nav.className='p11-home-path';nav.setAttribute('aria-label',T('route'));
    nav.innerHTML=['scope','prep','annotation','noise','extensions','review'].map((id,i)=>`<a href="#workbench?stage=${id}"><span>0${i+1}</span><strong>${E(T(id))}</strong>${I('arrow')}</a>`).join('');intro.after(nav);
    $('.station-actions a[href="#builder"]')?.setAttribute('href','#workbench?stage=scope');
  }
  function settings(){
    const root=$('#main .page-content');if(!root||$('.p11-settings-tabs'))return;
    const display=$('.v3-display-settings'),scene=$('.station-settings'),grid=$('.settings-grid');if(!display||!scene||!grid)return;
    const preferences=grid.children[0],evidence=grid.children[1],principles=grid.nextElementSibling,principlesBody=principles?.nextElementSibling,sourceHead=principlesBody?.nextElementSibling,sourceBody=sourceHead?.nextElementSibling;
    const tabs=document.createElement('div');tabs.className='p11-settings-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label',A().t('settings'));
    tabs.innerHTML=['display','rules','sources'].map(k=>`<button role="tab" id="p11-tab-${k}" aria-controls="p11-panel-${k}" data-p11-tab="${k}">${I(k==='display'?'settings':k==='rules'?'quality':'literature')}<span>${E(T(k))}</span></button>`).join('');display.before(tabs);
    const panels={};for(const k of ['display','rules','sources']){const p=document.createElement('div');p.id='p11-panel-'+k;p.className='p11-settings-panel p11-settings-'+k;p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby','p11-tab-'+k);root.append(p);panels[k]=p}
    panels.display.append(preferences,display,scene);panels.rules.append(evidence);[principles,principlesBody].filter(Boolean).forEach(n=>panels.rules.append(n));[sourceHead,sourceBody].filter(Boolean).forEach(n=>panels.sources.append(n));grid.remove();
    setSettingsTab(settingsTab);
  }
  function setSettingsTab(id){settingsTab=id;for(const k of ['display','rules','sources']){const b=$('#p11-tab-'+k),p=$('#p11-panel-'+k);if(b){b.setAttribute('aria-selected',String(k===id));b.tabIndex=k===id?0:-1}if(p)p.hidden=k!==id}}
  function saved(){
    const root=$('#main .page-content'),empty=$('.paper-list .empty-state');if(!root)return;
    if(empty){empty.classList.add('p11-saved-empty');empty.innerHTML=`<span class="p11-empty-orbit">${I('saved')}</span><h2>${E(T('emptyTitle'))}</h2><p>${E(T('emptyBody'))}</p><div>${['markers','tools','literature'].map(k=>`<a class="btn" href="#${k}">${I(k)}${E(A().t(k))}${I('arrow')}</a>`).join('')}</div>`;return}
    const list=$('.paper-list');if(!list||$('.p11-saved-filter'))return;
    const rows=[...list.querySelectorAll('.paper-card')],kinds=[...new Set(rows.map(r=>r.querySelector('[data-action=open]')?.dataset.kind).filter(Boolean))];
    const labels={marker:'markers',metric:'metrics',tool:'tools',paper:'literature',formula:'formulas',step:'steps',project:'projects'};
    const nav=document.createElement('div');nav.className='p11-saved-filter';nav.setAttribute('role','group');nav.setAttribute('aria-label',A().t('saved'));
    nav.innerHTML=['all',...kinds].map(k=>`<button data-p11-saved="${k}">${E(k==='all'?T('all'):A().t(labels[k]||k))}<span>${k==='all'?rows.length:rows.filter(r=>r.querySelector('[data-action=open]')?.dataset.kind===k).length}</span></button>`).join('');list.before(nav);
    filterSaved(kinds.includes(savedKind)?savedKind:'all');
  }
  function filterSaved(kind){savedKind=kind;document.querySelectorAll('[data-p11-saved]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.p11Saved===kind)));document.querySelectorAll('.paper-list .paper-card').forEach(r=>r.hidden=kind!=='all'&&r.querySelector('[data-action=open]')?.dataset.kind!==kind)}
  function contribute(){
    const hero=$('.contribute-hero');if(!hero||$('.p11-contribute-grid'))return;
    const grid=document.createElement('div');grid.className='p11-contribute-grid';
    grid.innerHTML=[['marker','markers'],['method','tools'],['issue','settings']].map(([k,ic])=>`<article><span class="p11-contribute-icon">${I(ic)}</span><h2>${E(T(k+'Report'))}</h2><p>${E(T(k+'Fields'))}</p><a class="text-link" href="mailto:yuedong02@outlook.com?subject=${encodeURIComponent('YeastVar1011 · '+T(k+'Report'))}">${E(T('contact'))}${I('arrow')}</a></article>`).join('');hero.after(grid);
  }
  function afterRender(){shell();const r=A().route();if(r==='overview')home();if(r==='settings')settings();if(r==='saved')saved();if(r==='contribute')contribute()}
  document.addEventListener('click',event=>{const tab=event.target.closest('[data-p11-tab]');if(tab)setSettingsTab(tab.dataset.p11Tab);const filter=event.target.closest('[data-p11-saved]');if(filter)filterSaved(filter.dataset.p11Saved)});
  document.addEventListener('keydown',event=>{const el=event.target.closest('[data-p11-tab]');if(!el||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const keys=['display','rules','sources'],i=keys.indexOf(el.dataset.p11Tab),next=event.key==='Home'?0:event.key==='End'?2:(i+(event.key==='ArrowRight'?1:2))%3;setSettingsTab(keys[next]);$('#p11-tab-'+keys[next]).focus()});
  window.YV_PAGE_LAYOUT={nav,afterRender,placeGuide,text:T,groups};
})();
