'use strict';
(() => {
  const KEY = 'yv.navigation.v4';
  const $ = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const DEFAULT_ORDER = ['workbench','overview','galaxy','builder','quality','projects','lab','markers','workflow','tools','formulas','literature','ideas','saved','contribute'];
  const WORDS = {
    zh: {layout:'侧栏布局',edit:'整理菜单',done:'完成排序',reset:'恢复布局',width:'侧栏宽度',resize:'调整侧栏宽度',resizeHelp:'拖动调整；方向键微调；双击恢复默认宽度。',navHelp:'拖动手柄或使用上下按钮调整菜单；分析步骤的顺序保持不变。',move:'移动',up:'向上移动',down:'向下移动',position:'当前位置',saved:'菜单顺序已保存',resetDone:'侧栏宽度和菜单顺序已恢复',close:'关闭布局设置',mobileClose:'关闭菜单',navigation:'导航',widthValue:'像素',rangeHelp:'左右方向键调整宽度；Home / End 到达最小或最大值。'},
    en: {layout:'Sidebar layout',edit:'Arrange menu',done:'Finish arranging',reset:'Reset layout',width:'Sidebar width',resize:'Resize sidebar',resizeHelp:'Drag to resize; use arrow keys for fine adjustment; double-click to reset.',navHelp:'Drag a handle or use the arrow buttons to arrange the menu. Analysis stages keep their original order.',move:'Move',up:'Move up',down:'Move down',position:'Position',saved:'Menu order saved',resetDone:'Sidebar width and menu order reset',close:'Close layout settings',mobileClose:'Close navigation',navigation:'Navigation',widthValue:'pixels',rangeHelp:'Use Left / Right to resize; Home / End select the minimum or maximum.'},
    fr: {layout:'Disposition du volet',edit:'Organiser le menu',done:'Terminer',reset:'Rétablir la disposition',width:'Largeur du volet',resize:'Redimensionner le volet',resizeHelp:'Faites glisser ; ajustez avec les flèches ; double-cliquez pour rétablir la largeur.',navHelp:'Déplacez les poignées ou utilisez les flèches. L’ordre des étapes d’analyse reste inchangé.',move:'Déplacer',up:'Monter',down:'Descendre',position:'Position',saved:'Ordre du menu enregistré',resetDone:'Largeur et ordre du menu rétablis',close:'Fermer les réglages',mobileClose:'Fermer la navigation',navigation:'Navigation',widthValue:'pixels',rangeHelp:'Utilisez Gauche / Droite ; Début / Fin sélectionnent la largeur minimale ou maximale.'},
    es: {layout:'Diseño de la barra',edit:'Ordenar menú',done:'Terminar',reset:'Restablecer diseño',width:'Ancho de la barra',resize:'Ajustar ancho de la barra',resizeHelp:'Arrastra; ajusta con las flechas; haz doble clic para restablecer el ancho.',navHelp:'Arrastra los controles o usa las flechas. Se conserva el orden de las etapas de análisis.',move:'Mover',up:'Subir',down:'Bajar',position:'Posición',saved:'Orden del menú guardado',resetDone:'Ancho y orden del menú restablecidos',close:'Cerrar ajustes',mobileClose:'Cerrar navegación',navigation:'Navegación',widthValue:'píxeles',rangeHelp:'Usa Izquierda / Derecha; Inicio / Fin seleccionan el ancho mínimo o máximo.'},
    eu: {layout:'Alboko panelaren diseinua',edit:'Antolatu menua',done:'Amaitu',reset:'Berrezarri diseinua',width:'Panelaren zabalera',resize:'Aldatu panelaren zabalera',resizeHelp:'Arrastatu; doitu geziekin; egin klik bikoitza zabalera berrezartzeko.',navHelp:'Arrastatu heldulekuak edo erabili geziak. Analisi-urratsen ordena mantentzen da.',move:'Mugitu',up:'Gora mugitu',down:'Behera mugitu',position:'Kokapena',saved:'Menuaren ordena gorde da',resetDone:'Panelaren zabalera eta menuaren ordena berrezarri dira',close:'Itxi ezarpenak',mobileClose:'Itxi nabigazioa',navigation:'Nabigazioa',widthValue:'pixel',rangeHelp:'Erabili Ezker / Eskuin; Hasiera / Amaiera teklek gutxieneko edo gehieneko zabalera hautatzen dute.'}
  };
  const language = () => window.YV_APP?.prefs()?.language || 'zh';
  const t = key => WORDS[language()]?.[key] || WORDS.en[key] || key;
  const SIDEBAR_WORDS={
    zh:{pin:'固定侧栏',unpin:'取消固定，自动收起',expand:'展开侧栏',collapse:'收起侧栏',pinned:'侧栏已固定',automatic:'侧栏自动收起；鼠标移入或键盘聚焦可展开',navHelp:'在同一分组内拖动或用方向按钮调整菜单；研究流程的顺序保持不变。'},
    en:{pin:'Pin sidebar',unpin:'Unpin and auto-hide',expand:'Expand sidebar',collapse:'Collapse sidebar',pinned:'Sidebar pinned',automatic:'Sidebar auto-hides; hover or focus to expand',navHelp:'Drag or use arrow buttons within a group. Research stages keep their order.'},
    fr:{pin:'Épingler le volet',unpin:'Détacher et masquer automatiquement',expand:'Déployer le volet',collapse:'Réduire le volet',pinned:'Volet épinglé',automatic:'Le volet se masque ; survolez-le ou donnez-lui le focus pour le déployer',navHelp:'Déplacez les éléments au sein de leur groupe avec les poignées ou les flèches. L’ordre des étapes reste inchangé.'},
    es:{pin:'Fijar barra lateral',unpin:'Desfijar y ocultar automáticamente',expand:'Expandir barra lateral',collapse:'Contraer barra lateral',pinned:'Barra lateral fijada',automatic:'La barra se oculta; pasa el cursor o enfócala para expandirla',navHelp:'Arrastra o usa las flechas dentro de cada grupo. Se conserva el orden de las etapas.'},
    eu:{pin:'Finkatu alboko panela',unpin:'Askatu eta ezkutatu automatikoki',expand:'Zabaldu alboko panela',collapse:'Bildu alboko panela',pinned:'Alboko panela finkatuta',automatic:'Panela automatikoki biltzen da; pasa sagua edo fokuratu zabaltzeko',navHelp:'Arrastatu edo erabili geziak talde bakoitzaren barruan. Ikerketa-urratsen ordena mantentzen da.'}
  };
  const st=key=>SIDEBAR_WORDS[language()]?.[key]||SIDEBAR_WORDS.en[key];
  const DOCK_WORDS={
    zh:{title:'页面辅助',guide:'资料引导',companion:'挂件设置',note:'检索工具、研究证据和输入要求，返回相应的方案环节。',tap:'点击打开资料检索；拖动可固定位置。'},
    en:{title:'Page assistance',guide:'Evidence guide',companion:'Companion settings',note:'Find tools, evidence and input requirements, then return to the relevant planning step.',tap:'Click for catalogue search; drag to set a fixed position.'},
    fr:{title:'Aide à la page',guide:'Guide documentaire',companion:'Réglages du compagnon',note:'Recherchez les outils, les preuves et les données requises, puis revenez à l’étape correspondante.',tap:'Touchez pour ouvrir le recherche documentaire ; glissez pour fixer la position.'},
    es:{title:'Ayuda de la página',guide:'Guía de evidencia',companion:'Ajustes del compañero',note:'Busca herramientas, evidencia y datos necesarios, y vuelve a la etapa correspondiente.',tap:'Toca para abrir la búsqueda documental; arrastra para fijar la posición.'},
    eu:{title:'Orrialdeko laguntza',guide:'Ebidentzia-gida',companion:'Lagunaren ezarpenak',note:'Bilatu tresnak, ebidentzia eta beharrezko datuak, eta itzuli dagokion plangintza-urratsera.',tap:'Ukitu katalogo-bilaketa irekitzeko; arrastatu kokapena finkatzeko.'}
  };
  const dt=key=>DOCK_WORDS[language()]?.[key]||DOCK_WORDS.en[key];
  const PATHS = {
    workbench:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11m4-7h5m-5 3h3"/>',
    overview:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><path d="M14 17.5h7m-3.5-3.5v7"/>',
    galaxy:'<ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-35 12 12)"/><circle cx="12" cy="12" r="2.5"/><path d="M7 3.5a10 10 0 0 1 13 12M4 8.5a10 10 0 0 0 13 12"/>',
    builder:'<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h6a3 3 0 0 1 3 3v6M6 13v8m-4-4h8"/>',
    quality:'<path d="m12 3 8 3v5c0 5-4 8-8 10-4-2-8-5-8-10V6z"/><path d="m8 11 3 3 5-6"/>',
    projects:'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3z"/><path d="M7 12h10m-10 4h6"/>',
    lab:'<path d="M9 3h6m-5 0v6L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3M8 14h8"/><circle cx="11" cy="17" r=".8"/><path d="m16 5 3-1m-1 4 3 1"/>',
    markers:'<path d="M7 3c0 8 10 10 10 18M17 3c0 8-10 10-10 18M8 6h8m-7 4h6m-6 4h6m-7 4h8"/>',
    workflow:'<rect x="3" y="3" width="6" height="5" rx="1.3"/><rect x="15" y="9.5" width="6" height="5" rx="1.3"/><rect x="3" y="16" width="6" height="5" rx="1.3"/><path d="M9 5.5h3a3 3 0 0 1 3 3V12M9 18.5h3a3 3 0 0 0 3-3V12"/>',
    tools:'<path d="M14 4a5 5 0 0 0-6 6l-5 8a2 2 0 0 0 3 3l8-7a5 5 0 0 0 6-6l-4 3-3-3 3-4z"/>',
    formulas:'<path d="M18 4H6l7 8-7 8h12"/>',
    literature:'<path d="M12 6v15M12 6C9 3 5 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 2Z"/><path d="M5 8h3m-3 4h3m8-4h3m-3 4h3"/>',
    ideas:'<path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 1-1 3-1 3H9s0-2-1-3Z"/><path d="m10 9 2 2 2-2"/>',
    saved:'<path d="M6 3h12v18l-6-4-6 4z"/>',
    contribute:'<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6m2 4v6m-3-3h6"/>',
    settings:'<path d="M4 7h4m6 0h6M4 17h10m6 0h0"/><circle cx="11" cy="7" r="3"/><circle cx="17" cy="17" r="3"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
    external:'<path d="M14 3h7v7m0-7-11 11M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
    moon:'<path d="M20 15a9 9 0 0 1-11-11A9 9 0 1 0 20 15Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
    monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    menu:'<path d="M4 5h16M4 12h16M4 19h16"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    minus:'<path d="M5 12h14"/>',
    download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
    filter:'<path d="M4 5h16M7 12h10m-7 7h4"/><circle cx="8" cy="5" r="2"/><circle cx="15" cy="12" r="2"/>',
    copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4"/>',
    chart:'<path d="M4 3v17h17M8 16v-4m5 4V7m5 9v-6"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
    cycle:'<path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/>',
    tags:'<path d="m3 3 8 .1L22 14l-8 8L3 11z"/><circle cx="7.3" cy="7.3" r="1.2"/>',
    globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/>',
    grip:'<circle cx="9" cy="5" r=".8"/><circle cx="15" cy="5" r=".8"/><circle cx="9" cy="12" r=".8"/><circle cx="15" cy="12" r=".8"/><circle cx="9" cy="19" r=".8"/><circle cx="15" cy="19" r=".8"/>',
    panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M5.5 8h1m-1 4h1m-1 4h1"/>',
    reset:'<path d="M3 9a9 9 0 1 1 .5 8M3 4v5h5"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>',
    up:'<path d="m6 14 6-6 6 6"/>',
    down:'<path d="m6 10 6 6 6-6"/>',
    sort:'<path d="M4 4v16m-3-3 3 3 3-3M10 5h11M10 12h8m-8 7h5"/>',
    layers:'<path d="m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5m-18 5 9 5 9-5"/>',
    dot:'<circle cx="12" cy="12" r="3"/>',
    data:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
    density:'<path d="M4 5h16M4 10h16M4 15h16M4 20h16"/>'
  };
  PATHS.pin='<path d="m9 3 6 0-1 6 4 4v2H6v-2l4-4zM12 15v6"/>';
  PATHS.unpin='<path d="M15 3H9l1 6-4 4v2h12v-2l-4-4 1-6M12 15v6M3 3l18 18"/>';
  PATHS.collapse='<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m7-12-4 4 4 4"/>';
  PATHS.expand='<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m4-12 4 4-4 4"/>';
  function icon(name) { return PATHS[name] ? `<svg class="yv-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" data-icon="${name}">${PATHS[name]}</svg>` : null; }
  let saved = {}; try {saved = JSON.parse(localStorage.getItem(KEY) || '{}')} catch {}
  let width = Number.isFinite(saved.width) ? saved.width : 248;
  let pinned=saved.pinned===true,peek=false,hovering=false,suppressHover=false,pointerInSidebar=false,openTimer=0,closeTimer=0;
  let order = [...new Set((Array.isArray(saved.order) ? saved.order : []).filter(id => DEFAULT_ORDER.includes(id)))];
  order.push(...DEFAULT_ORDER.filter(id => !order.includes(id)));
  let initialized = false, editing = false, layoutOpen = false, resizing = null, drag = null, frame = 0, observer, rootObserver, wasMobileOpen=false, companionsDocked=false;
  const mobile = () => innerWidth <= 760;
  const bounds = () => ({min:220,max:Math.max(248,Math.min(392,innerWidth - 620))});
  const clampWidth = value => Math.round(Math.max(bounds().min,Math.min(bounds().max,value)));
  const persist = () => {try{localStorage.setItem(KEY,JSON.stringify({width,order,pinned}))}catch{}};
  const setClass=(element,name,value)=>{if(element.classList.contains(name)!==value)element.classList.toggle(name,value)};
  const isExpanded=()=>mobile()?$('#sidebar')?.classList.contains('mobile-open'):pinned||peek;
  const clearSidebarTimers=()=>{clearTimeout(openTimer);clearTimeout(closeTimer);openTimer=closeTimer=0};
  function openSidebar(){clearSidebarTimers();if(isExpanded())return;if(mobile()){$('#sidebar')?.classList.add('mobile-open');$('#mobile-shade')?.classList.add('visible')}else peek=true;apply()}
  function closeSidebar({force=false,focus=false}={}){
    const returnFocus=focus||$('#sidebar')?.contains(document.activeElement);
    clearSidebarTimers();if(mobile()){$('#sidebar')?.classList.remove('mobile-open');$('#mobile-shade')?.classList.remove('visible')}else{if(force){pinned=false;persist()}if(pinned)return;peek=false;suppressHover=hovering;layoutOpen=false;editing=false;toolbar()}
    apply();if(returnFocus)$('#menu-button')?.focus({preventScroll:true});
  }
  function setPinned(value){if(mobile())return;pinned=!!value;peek=false;clearSidebarTimers();persist();if(!pinned){suppressHover=hovering;layoutOpen=false;editing=false;$('#menu-button')?.focus({preventScroll:true})}toolbar();apply();say(st(pinned?'pinned':'automatic'))}
  function toggleSidebar(){if(isExpanded())closeSidebar({force:true,focus:true});else openSidebar()}
  function scheduleClose(){clearTimeout(closeTimer);closeTimer=setTimeout(()=>{if(!hovering&&!$('#sidebar')?.contains(document.activeElement)&&document.activeElement!==$('#c4-sidebar-resize')&&!resizing&&!drag&&!layoutOpen&&!editing)closeSidebar()},360)}
  const say = message => {const live = $('#c4-status');if(live){live.textContent='';requestAnimationFrame(()=>live.textContent=message)}};
  const navName = row => $('.nav-link>span',row)?.textContent?.trim() || row.dataset.route;
  function apply() {
    const sidebar = $('#sidebar'); if (!sidebar) return;
    const collapsed = !mobile()&&!pinned&&!peek;
    setClass(document.documentElement,'sidebar-collapsed',collapsed);
    setClass(document.documentElement,'c5-sidebar-pinned',pinned&&!mobile());
    setClass(document.documentElement,'c5-sidebar-peek',peek&&!pinned&&!mobile());
    setClass(document.documentElement,'c5-sidebar-auto',!pinned&&!mobile());
    const mobileOpen=mobile()&&sidebar.classList.contains('mobile-open');
    if(document.body.classList.contains('c4-mobile-menu-open')!==mobileOpen)document.body.classList.toggle('c4-mobile-menu-open',mobileOpen);
    const workspace=$('.workspace');if(workspace&&workspace.inert!==mobileOpen)workspace.inert=mobileOpen;
    const sidebarInert=mobile()&&!mobileOpen;if(sidebar.inert!==sidebarInert)sidebar.inert=sidebarInert;
    if(mobileOpen&&!wasMobileOpen)requestAnimationFrame(()=>$('.nav-link.active',sidebar)?.focus({preventScroll:true}));
    wasMobileOpen=mobileOpen;
    const effective = mobile() ? Math.min(312,innerWidth - 38) : collapsed ? 72 : clampWidth(width);
    document.documentElement.style.setProperty('--sidebar',(!mobile()&&!pinned?72:effective)+'px');
    sidebar.style.setProperty('--sidebar',effective+'px');
    if(document.documentElement.classList.contains('c4-nav-editing')!==editing)document.documentElement.classList.toggle('c4-nav-editing',editing);
    const separator = $('#c4-sidebar-resize');
    if(separator){separator.hidden=mobile()||collapsed;separator.setAttribute('aria-valuenow',String(clampWidth(width)));separator.setAttribute('aria-valuemin',bounds().min);separator.setAttribute('aria-valuemax',bounds().max);separator.setAttribute('aria-valuetext',clampWidth(width)+' '+t('widthValue'));separator.style.left=(effective-5)+'px';}
    const range=$('#c4-width');if(range){range.min=bounds().min;range.max=bounds().max;range.value=clampWidth(width);range.disabled=mobile();}
    const value=$('#c4-width-value');if(value)value.textContent=clampWidth(width)+' px';
    const updateIcon=(button,name)=>{if($('svg',button)?.dataset.icon!==name)button.innerHTML=icon(name)};
    const menu=$('#menu-button');if(menu){menu.setAttribute('aria-controls','sidebar');menu.setAttribute('aria-expanded',String(isExpanded()));menu.setAttribute('aria-label',st(isExpanded()?'collapse':'expand'));menu.title=st(isExpanded()?'collapse':'expand');updateIcon(menu,isExpanded()?'collapse':'expand')}
    all('[data-c4="toggle-sidebar"]').forEach(button=>{button.setAttribute('aria-expanded',String(isExpanded()));button.setAttribute('aria-label',st(isExpanded()?'collapse':'expand'));button.title=st(isExpanded()?'collapse':'expand');updateIcon(button,isExpanded()?'collapse':'expand')});
    all('[data-c4="pin-sidebar"]').forEach(button=>{button.setAttribute('aria-pressed',String(pinned));button.setAttribute('aria-label',st(pinned?'unpin':'pin'));button.title=st(pinned?'unpin':'pin');updateIcon(button,pinned?'unpin':'pin');button.classList.toggle('is-active',pinned)});
    dockCompanions();
  }
  function dockCompanions(){
    const active=['markers','workbench','tools','quality','builder'].includes(window.YV_APP?.route()),mascot=$('.yv-mascot'),guide=$('.yv-guide');
    document.body.classList.toggle('c4-marker-docked',active);
    $('#c4-companion-dock')?.remove();
    if(mascot&&mascot.parentElement!==document.body)document.body.append(mascot);
    if(guide&&guide.parentElement!==document.body)document.body.append(guide);
    companionsDocked=false;
    if(!active){$('.c4-assistance-shortcuts')?.remove();return;}
    const tabs=$('.mw-tabs')||$('#plan-workbench .pw-hero')||$('#main .pt-header')||$('#main .pt5-header')||$('#main .builder-heading')||$('#main .page-heading');if(tabs){let shortcuts=$('.c4-assistance-shortcuts');if(!shortcuts){shortcuts=document.createElement('div');shortcuts.className='c4-assistance-shortcuts';tabs.after(shortcuts);}const signature=language();if(shortcuts.dataset.language!==signature){shortcuts.dataset.language=signature;shortcuts.innerHTML=`<button type="button" data-c4="guide">${icon('search')}<span>${escape(window.YV_WORKSTATION?.text('guide')||dt('guide'))}</span></button><button type="button" data-c4="companion">${icon('down')}<span>${escape(window.YV_MASCOT?.text('settings')||dt('companion'))}</span></button>`;}}
  }
  function toolbar() {
    const sidebar=$('#sidebar'), nav=$('#primary-nav');if(!sidebar||!nav)return;
    let bar=$('#c4-nav-toolbar');
    if(!bar){bar=document.createElement('div');bar.id='c4-nav-toolbar';bar.className='c4-nav-toolbar';nav.before(bar);}
    bar.innerHTML=`<span>${escape(t('navigation'))}</span><button type="button" class="c4-control c5-pin" data-c4="pin-sidebar" aria-pressed="${pinned}" aria-label="${escape(st(pinned?'unpin':'pin'))}" title="${escape(st(pinned?'unpin':'pin'))}">${icon(pinned?'unpin':'pin')}</button><button type="button" class="c4-control c5-layout" data-c4="layout" aria-label="${escape(t('layout'))}" title="${escape(t('layout'))}" aria-expanded="${layoutOpen}" aria-controls="c4-layout-panel">${icon('settings')}</button><button type="button" class="c4-control c5-toggle" data-c4="toggle-sidebar" aria-controls="sidebar" aria-label="${escape(st(isExpanded()?'collapse':'expand'))}">${icon(isExpanded()?'collapse':'expand')}</button><button type="button" class="c4-control c4-mobile-close" data-c4="close-mobile" aria-label="${escape(t('mobileClose'))}" title="${escape(t('mobileClose'))}">${icon('close')}</button>`;
    let panel=$('#c4-layout-panel');if(!panel){panel=document.createElement('section');panel.id='c4-layout-panel';panel.className='c4-layout-panel';bar.after(panel);}
    panel.hidden=!layoutOpen;
    panel.innerHTML=`<div class="c4-layout-heading"><strong>${escape(t('layout'))}</strong><button class="c4-control" type="button" data-c4="layout" aria-label="${escape(t('close'))}">${icon('close')}</button></div><label class="c4-width-label" for="c4-width">${escape(t('width'))}<output id="c4-width-value" for="c4-width"></output></label><input id="c4-width" type="range" step="4" aria-describedby="c4-range-help"><span id="c4-range-help" class="sr-only">${escape(t('rangeHelp'))}</span><button type="button" class="c4-reset c5-arrange ${editing?'is-active':''}" data-c4="arrange" aria-pressed="${editing}" aria-label="${escape(t(editing?'done':'edit'))}">${icon(editing?'check':'sort')}<span>${escape(t(editing?'done':'edit'))}</span></button><button type="button" class="c4-reset" data-c4="reset">${icon('reset')}<span>${escape(t('reset'))}</span></button>`;
    let help=$('#c4-order-help');if(!help){help=document.createElement('p');help.id='c4-order-help';help.className='c4-order-help';nav.before(help);}help.hidden=!editing;help.textContent=st('navHelp');
    const separator=$('#c4-sidebar-resize');if(separator){separator.setAttribute('aria-label',t('resize'));separator.title=t('resizeHelp');}
  }
  function decorateNavigation() {
    const nav=$('#primary-nav');if(!nav)return;
    all('.nav-link',nav).forEach(link=>{
      const id=link.getAttribute('href')?.slice(1).split('?')[0];if(!id)return;
      let row=link.closest('.c4-nav-row');
      if(!row){row=document.createElement('div');row.className='c4-nav-row';row.dataset.route=id;link.before(row);row.append(link);}
      const svg=link.querySelector(':scope>svg');if(svg&&svg.dataset.icon!==id&&icon(id))svg.outerHTML=icon(id);
      const label=navName(row);
      let handle=$('.c4-drag-handle',row);if(!handle){handle=document.createElement('button');handle.type='button';handle.className='c4-drag-handle';handle.dataset.c4='drag';handle.innerHTML=icon('grip');row.prepend(handle);}
      handle.setAttribute('aria-label',t('move')+' '+label);handle.title=t('move')+' '+label;handle.setAttribute('aria-describedby','c4-order-help');
      for(const direction of ['up','down']){let button=$(`[data-c4="${direction}"]`,row);if(!button){button=document.createElement('button');button.type='button';button.dataset.c4=direction;button.className='c4-order-arrow';button.innerHTML=icon(direction);row.append(button);}button.setAttribute('aria-label',t(direction)+' · '+label);button.title=t(direction);}
    });
    const parents=[...new Set(all('.c4-nav-row',nav).map(row=>row.parentElement))];
    for(const parent of parents)order.forEach(id=>{const row=all(':scope>.c4-nav-row',parent).find(row=>row.dataset.route===id);if(row)parent.append(row)});
    updatePositions();
  }
  function updatePositions() {
    const rows=all('#primary-nav .c4-nav-row');rows.forEach(row=>{const siblings=all(':scope>.c4-nav-row',row.parentElement),index=siblings.indexOf(row),handle=$('.c4-drag-handle',row);handle?.setAttribute('aria-label',`${t('move')} ${navName(row)} · ${t('position')} ${index+1}/${siblings.length}`);const up=$('[data-c4="up"]',row),down=$('[data-c4="down"]',row);if(up)up.disabled=index===0;if(down)down.disabled=index===siblings.length-1;});
  }
  function storeOrder(announce=true) {order=all('#primary-nav .c4-nav-row').map(x=>x.dataset.route);persist();updatePositions();if(announce)say(t('saved'));}
  function moveRow(row,direction) {if(!row)return;const siblings=all(':scope>.c4-nav-row',row.parentElement),sibling=siblings[siblings.indexOf(row)+direction];if(!sibling)return;if(direction<0)sibling.before(row);else sibling.after(row);storeOrder();row.scrollIntoView({block:'nearest',behavior:'auto'});}
  function polishSelects() {
    all('.select-chevron').forEach(el=>{if(!el.querySelector('svg'))el.innerHTML=icon('chevron')});
    all('.rich-select-button').forEach(button=>{const select=$('select',button.parentElement);if(select){button.disabled=select.disabled;button.setAttribute('aria-required',String(select.required));}});
    all('.project-add').forEach(button=>{if(button.textContent.trim()==='+')button.innerHTML=icon('plus')});
    all('.node-reorder .icon-btn').forEach(button=>{const text=button.textContent.trim();if(text==='↑')button.innerHTML=icon('up');if(text==='↓')button.innerHTML=icon('down');});
    const master=$('input[data-action="select-page"]'),rows=all('input[data-select-marker]');if(master&&rows.length){const selected=rows.filter(row=>row.checked).length;master.indeterminate=selected>0&&selected<rows.length;master.setAttribute('aria-checked',master.indeterminate?'mixed':String(master.checked));}
    const batch=$('#mw-check-page'),members=all('input[data-mw-checked]');if(batch&&members.length){const selected=members.filter(row=>row.checked).length;batch.indeterminate=selected>0&&selected<members.length;batch.setAttribute('aria-checked',batch.indeterminate?'mixed':String(batch.checked));}
  }
  function optionKind(select,value) {
    if(select?.id==='language-select'||select?.dataset.pref==='language')return 'globe';
    if(select?.dataset.pref==='theme')return ({dark:'moon',light:'sun',system:'monitor'})[value];
    if(select?.dataset.pref==='density')return value==='compact'?'density':'layers';
    if(select?.dataset.v3Filter==='qcStep'||select?.dataset.filter==='step')return 'workflow';
    if(select?.dataset.filter==='grade')return 'quality';
    if(select?.dataset.filter==='expression')return 'chart';
    if(select?.dataset.filter==='category'||select?.dataset.v3Filter==='projectCategory')return 'tags';
    if(select?.dataset.filter==='sort')return 'sort';
    if(select?.dataset.filter==='phase')return 'cycle';
    return null;
  }
  function polishOptions(panel) {
    if(!panel||panel.dataset.c4Polished)return;panel.dataset.c4Polished='true';
    const button=$('.rich-select-button[aria-expanded="true"]'),select=button?$('select',button.parentElement):null;
    const id='c4-options-'+Math.random().toString(36).slice(2,8);panel.id=id;if(button)button.setAttribute('aria-controls',id);
    all('[role="option"]',panel).forEach(option=>{const art=$('.option-art',option),kind=optionKind(select,option.dataset.value);if(art){if(kind){art.innerHTML=icon(kind);art.dataset.kind=kind;}else art.hidden=true;}if(!option.id)option.id=id+'-'+all('[role="option"]',panel).indexOf(option);});
    requestAnimationFrame(()=>{if(!panel.isConnected||!button)return;const rect=button.getBoundingClientRect(),height=Math.min(panel.scrollHeight,400,innerHeight-24),below=innerHeight-rect.bottom-12,above=rect.top-12;panel.style.maxHeight=Math.min(400,Math.max(below,above),innerHeight-24)+'px';panel.style.top=(below>=Math.min(height,210)||below>=above?rect.bottom+7:Math.max(12,rect.top-height-7))+'px';});
  }
  function afterRender() {if(!initialized)init();toolbar();decorateNavigation();polishSelects();apply();}
  function finishResize(cancel=false) {if(!resizing)return;if(cancel)width=resizing.before;resizing=null;document.documentElement.classList.remove('c4-resizing');apply();persist();}
  function endDrag(cancel=false) {
    if(!drag)return;const previous=drag.order,handle=drag.handle;drag.row.classList.remove('c4-dragging');drag=null;cancelAnimationFrame(frame);frame=0;document.documentElement.classList.remove('c4-drag-active');
    if(cancel){order=previous;decorateNavigation();}else storeOrder();handle.focus({preventScroll:true});
  }
  function dragTick() {
    if(!drag)return;const nav=$('#primary-nav'),r=nav.getBoundingClientRect(),y=drag.y;
    if(y<r.top+30)nav.scrollTop-=7;else if(y>r.bottom-30)nav.scrollTop+=7;
    const target=document.elementFromPoint(drag.x,drag.y)?.closest('.c4-nav-row');
    if(target&&target!==drag.row&&target.parentElement===drag.row.parentElement){const box=target.getBoundingClientRect();if(y<box.top+box.height/2)target.before(drag.row);else target.after(drag.row);}
    frame=requestAnimationFrame(dragTick);
  }
  function init() {
    if(initialized||!$('#sidebar'))return;initialized=true;
    const sidebar=$('#sidebar');
    sidebar.addEventListener('pointerenter',event=>{if(event.pointerType==='touch'||mobile())return;hovering=true;clearTimeout(closeTimer);if(!pinned&&!suppressHover){clearTimeout(openTimer);openTimer=setTimeout(openSidebar,90)}});
    sidebar.addEventListener('pointerleave',event=>{if(event.pointerType==='touch'||mobile())return;hovering=false;suppressHover=false;clearTimeout(openTimer);scheduleClose()});
    sidebar.addEventListener('pointerdown',()=>{pointerInSidebar=true;clearTimeout(openTimer)},true);
    document.addEventListener('pointerup',()=>setTimeout(()=>{pointerInSidebar=false;if(hovering&&!pinned&&!mobile()&&!suppressHover)openSidebar()},0),true);
    document.addEventListener('pointercancel',()=>pointerInSidebar=false,true);
    sidebar.addEventListener('focusin',event=>{if(!mobile()&&!pinned&&!resizing&&!drag&&!pointerInSidebar&&!event.target.closest('[data-c4="toggle-sidebar"]'))openSidebar()});
    sidebar.addEventListener('focusout',()=>queueMicrotask(scheduleClose));
    document.addEventListener('click',event=>{if(event.target.closest('#menu-button')){event.preventDefault();event.stopImmediatePropagation();toggleSidebar()}},true);
    document.addEventListener('pointerdown',event=>{if(!mobile()&&!pinned&&peek&&!sidebar.contains(event.target)&&!event.target.closest('#menu-button,#c4-sidebar-resize'))closeSidebar()},true);
    const separator=document.createElement('div');separator.id='c4-sidebar-resize';separator.className='c4-sidebar-resize';separator.setAttribute('role','separator');separator.setAttribute('aria-orientation','vertical');separator.setAttribute('aria-controls','sidebar');separator.tabIndex=0;separator.innerHTML='<span></span>';document.body.append(separator);
    separator.addEventListener('pointerenter',()=>{hovering=true;clearTimeout(closeTimer)});
    separator.addEventListener('pointerleave',()=>{hovering=false;scheduleClose()});
    separator.addEventListener('focusin',()=>clearTimeout(closeTimer));
    separator.addEventListener('focusout',scheduleClose);
    const live=document.createElement('div');live.id='c4-status';live.className='sr-only';live.setAttribute('role','status');live.setAttribute('aria-live','polite');document.body.append(live);
    separator.addEventListener('pointerdown',event=>{if(event.button!==0)return;event.preventDefault();window.YV_V3?.closeOptions();resizing={pointer:event.pointerId,before:width};separator.setPointerCapture(event.pointerId);document.documentElement.classList.add('c4-resizing');});
    separator.addEventListener('dblclick',()=>{width=248;persist();apply();});
    separator.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();width=event.key==='Home'?bounds().min:event.key==='End'?bounds().max:clampWidth(width+(event.key==='ArrowLeft'?-1:1)*(event.shiftKey?24:8));persist();apply();}});
    document.addEventListener('pointermove',event=>{if(resizing){width=clampWidth(event.clientX);apply();}if(drag){drag.x=event.clientX;drag.y=event.clientY;}});
    document.addEventListener('pointerup',()=>{finishResize();endDrag();});
    document.addEventListener('pointercancel',()=>{finishResize(true);endDrag(true);});
    document.addEventListener('pointerdown',event=>{const handle=event.target.closest('[data-c4="drag"]');if(!handle||!editing||event.button!==0)return;event.preventDefault();event.stopPropagation();const row=handle.closest('.c4-nav-row');drag={row,handle,x:event.clientX,y:event.clientY,order:[...order]};handle.setPointerCapture(event.pointerId);row.classList.add('c4-dragging');document.documentElement.classList.add('c4-drag-active');frame=requestAnimationFrame(dragTick);});
    document.addEventListener('click',event=>{const button=event.target.closest('[data-c4]');if(!button)return;event.preventDefault();event.stopPropagation();const action=button.dataset.c4;
      if(action==='toggle-sidebar')toggleSidebar();
      else if(action==='pin-sidebar')setPinned(!pinned);
      else if(action==='layout'){layoutOpen=!layoutOpen;toolbar();apply();if(layoutOpen)(mobile()?$('[data-c4="arrange"]'):$('#c4-width'))?.focus();else $('[data-c4="layout"]')?.focus();}
      else if(action==='arrange'){editing=!editing;toolbar();decorateNavigation();apply();if(editing)$('#primary-nav .c4-drag-handle')?.focus();else $('[data-c4="arrange"]')?.focus();}
      else if(action==='reset'){width=248;order=[...DEFAULT_ORDER];persist();decorateNavigation();apply();say(t('resetDone'));}
      else if(action==='up'||action==='down'){const row=button.closest('.c4-nav-row');moveRow(row,action==='up'?-1:1);button.disabled?$('.c4-drag-handle',row)?.focus():button.focus();}
      else if(action==='close-mobile')closeSidebar({focus:true});
      else if(action==='guide')window.YV_GUIDE?.open();
      else if(action==='companion'){window.YV_MASCOT?.openSettings();}
    });
    document.addEventListener('input',event=>{if(event.target.id==='c4-width'){width=clampWidth(Number(event.target.value));apply();persist();}});
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'){if(resizing){event.preventDefault();finishResize(true);}if(drag){event.preventDefault();endDrag(true);}else if(layoutOpen){layoutOpen=false;editing=false;toolbar();apply();$('[data-c4="layout"]')?.focus();}else if(editing){editing=false;toolbar();apply();$('[data-c4="layout"]')?.focus();}else if((mobile()&&$('#sidebar').classList.contains('mobile-open'))||(!pinned&&peek)){event.preventDefault();closeSidebar({focus:true})}}
      if(event.key==='Tab'&&mobile()&&$('#sidebar').classList.contains('mobile-open')){const focusable=all('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]',$('#sidebar')).filter(el=>el.getClientRects().length>0),first=focusable[0],last=focusable.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}
      const handle=event.target.closest('[data-c4="drag"]');if(handle&&['ArrowUp','ArrowDown','Home','End'].includes(event.key)){event.preventDefault();const row=handle.closest('.c4-nav-row'),siblings=all(':scope>.c4-nav-row',row.parentElement);if(event.key==='Home')siblings[0].before(row);else if(event.key==='End')siblings.at(-1).after(row);else moveRow(row,event.key==='ArrowUp'?-1:1);storeOrder();handle.focus();row.scrollIntoView({block:'nearest'});}
    });
    document.addEventListener('change',()=>requestAnimationFrame(polishSelects));
    observer=new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1&&node.matches('.rich-options'))polishOptions(node);});observer.observe(document.body,{childList:true});
    rootObserver=new MutationObserver(apply);rootObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
    new MutationObserver(apply).observe($('#sidebar'),{attributes:true,attributeFilter:['class']});
    window.addEventListener('resize',()=>{endDrag(true);finishResize();clearSidebarTimers();hovering=false;suppressHover=false;peek=false;apply();},{passive:true});
    window.addEventListener('blur',()=>{endDrag(true);finishResize();});
    afterRender();
  }
  window.YV_CONTROLS={init,afterRender,apply,icon,polishOptions,setPinned,toggleSidebar,closeSidebar,getState:()=>({width,order:[...order],editing,layoutOpen,pinned,peek,expanded:isExpanded()})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
