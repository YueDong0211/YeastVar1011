/* Optional companion. Original remote media is referenced without modification.
   No remote image is copied into this application or its offline distribution. */
'use strict';
(() => {
  const SOURCE = 'https://channelr.photo.store.qq.com/psc?/channel/NaDwC23LjvXqrn3RH.9z8Y9zXYn5RpLpVMpq5MtZRmGMP84I3XKDxVyA32RnyBW.C*j3BWOi6O7J8NPcnUNHDcigOBtg6YINZ4Eo3pxqWvI!/o=&bo=0wUACNMFAAgCACQ!';
  const POSTER = 'https://channelgz.photo.store.qq.com/psc?/channel/NaDwC23LjvXqrn3RH.9z8Y9zXYn5RpLpVMpq5MtZRmGMP84I3XKDxVyA32RnyBW.C*j3BWOi6O7J8NPcnUNHDcigOBtg6YINZ4Eo3pxqWvI!/c=&bo=0wUACNMFAAgCACQ!&ek=1&tl=1';
  const TEXT = {
    title:['小助手','Dragon companion','Compagnon dragon','Compañero dragón','Dragoi laguna'],
    settings:['小助手设置','Companion settings','Réglages du compagnon','Ajustes del compañero','Lagunaren ezarpenak'],
    enabled:['显示小助手','Show companion','Afficher le compagnon','Mostrar compañero','Erakutsi laguna'],
    mode:['活动方式','Movement','Déplacement','Movimiento','Mugimendua'],
    roam:['自由漫游','Free roaming','Promenade libre','Paseo libre','Ibilaldi librea'],
    orbit:['小范围转圈','Small orbit','Petit cercle','Círculo pequeño','Zirkulu txikia'],
    still:['原地停留','Stay in place','Rester sur place','Quedarse quieto','Geldi egon'],
    size:['小助手大小','Companion size','Taille du compagnon','Tamaño del compañero','Lagunaren tamaina'],
    local:['选择本地图片','Choose a local image','Choisir une image locale','Elegir imagen local','Aukeratu tokiko irudia'],
    reset:['恢复默认形象','Restore default appearance','Rétablir l’apparence par défaut','Restaurar aspecto original','Berrezarri lehenetsitako itxura'],
    close:['关闭设置','Close settings','Fermer les réglages','Cerrar ajustes','Itxi ezarpenak'],
    hide:['隐藏小助手','Hide companion','Masquer le compagnon','Ocultar compañero','Ezkutatu laguna'],
    pause:['暂停动画','Pause animation','Suspendre l’animation','Pausar animación','Pausatu animazioa'],
    resume:['继续动画','Resume animation','Reprendre l’animation','Reanudar animación','Jarraitu animazioa'],
    move:['移动小助手','Move companion','Déplacer le compagnon','Mover compañero','Mugitu laguna'],
    done:['完成移动','Finish moving','Terminer le déplacement','Terminar de mover','Amaitu mugimendua'],
    restore:['显示龙泡泡','Show dragon companion','Afficher le dragon','Mostrar dragón','Erakutsi dragoia'],
    loading:['小助手图片载入中','Loading companion','Chargement du compagnon','Cargando compañero','Laguna kargatzen'],
    failed:['小助手图片暂时无法加载','Companion image is unavailable','Image du compagnon indisponible','Imagen del compañero no disponible','Lagunaren irudia ez dago erabilgarri'],
    retry:['重试图片','Retry image','Réessayer l’image','Reintentar imagen','Berriz saiatu irudiarekin'],
    note:['点击打开资料检索、设置与贡献。拖动后停留在新位置；可随时重新开启漫游。方向键微调，Home 恢复位置。','Click for search, settings and contributions. Drag to place; restart roaming whenever you like. Arrow keys adjust the position; Home resets it.','Cliquez pour la recherche, les réglages et les contributions. Glissez pour placer le dragon ; vous pouvez relancer la promenade. Les flèches ajustent sa position, Origine la réinitialise.','Haz clic para buscar, ajustar o contribuir. Arrastra para colocar; puedes reactivar el paseo cuando quieras. Las flechas ajustan la posición e Inicio la restablece.','Klik egin bilaketa, ezarpenak eta ekarpenak irekitzeko. Arrastatu kokatzeko; berriz aktiba dezakezu ibilaldia. Geziek kokapena doitzen dute; Home teklak berrezartzen du.'],
    assistant:['资料检索与参与贡献','Catalogue search and contributions','Recherche documentaire et contributions','Búsqueda documental y contribuciones','katalogo-bilaketa eta ekarpenak'],
    resetPosition:['恢复默认位置','Reset position','Réinitialiser la position','Restablecer posición','Berrezarri kokapena'],
    network:['默认动图需要联网。本地图片只保存在当前浏览器，随时可换回。','The default animation needs a network connection. Local images stay in this browser and can be replaced at any time.','L’animation par défaut nécessite une connexion. Les images locales restent dans ce navigateur et peuvent être remplacées.','La animación predeterminada necesita conexión. Las imágenes locales se guardan en este navegador y se pueden cambiar.','Lehenetsitako animazioak konexioa behar du. Tokiko irudiak arakatzaile honetan gordetzen dira eta alda daitezke.'],
    source:['当前形象：黍与令','Current appearance: Shu and Ling','Apparence : Shu et Ling','Aspecto: Shu y Ling','Itxura: Shu eta Ling'],
    custom:['当前形象：本地图片','Current appearance: local image','Apparence : image locale','Aspecto: imagen local','Itxura: tokiko irudia'],
    image:['黍与令龙泡泡动图','Animated Shu and Ling dragon companions','Animation des dragons Shu et Ling','Animación de dragones Shu y Ling','Shu eta Ling dragoien animazioa'],
    fileError:['请选择不大于8 MB的PNG、JPEG、GIF、WebP或AVIF图片。','Choose a PNG, JPEG, GIF, WebP or AVIF image up to 8 MB.','Choisissez une image PNG, JPEG, GIF, WebP ou AVIF de 8 Mo maximum.','Elige una imagen PNG, JPEG, GIF, WebP o AVIF de hasta 8 MB.','Aukeratu gehienez 8 MB-ko PNG, JPEG, GIF, WebP edo AVIF irudia.'],
    storageError:['浏览器无法保存此图片；本次打开期间仍可使用。','This browser could not save the image; it remains available for this visit.','Le navigateur n’a pas pu enregistrer l’image ; elle reste disponible pendant cette visite.','El navegador no pudo guardar la imagen; está disponible durante esta visita.','Arakatzaileak ezin izan du irudia gorde; bisita honetan erabil dezakezu.'],
    motionNote:['减弱动态模式下，默认小助手使用静态预览并停留原地。','Reduced motion uses a still preview and keeps the companion in place.','Le mode mouvement réduit affiche un aperçu fixe et immobilise le compagnon.','El modo de movimiento reducido muestra una vista estática y mantiene al compañero quieto.','Mugimendu murriztuan, aurrebista finkoa erakusten da eta laguna geldirik dago.'],
    spin:['转一圈','Spin once','Faire un tour','Dar una vuelta','Egin bira bat'],
    drag:['拖动小助手位置','Drag the companion','Déplacer le compagnon','Arrastrar el compañero','Arrastatu laguna']
  };
  const langIndex = {zh:0,en:1,fr:2,es:3,eu:4};
  let lang='zh', host, panel, art, status, launcher, orbitAnimation, spinAnimation, prefs, media, observer;
  let interactive=false,focusWithin=false,suppressClick=false,settingsFocus=null;
  let layoutFrame=0;
  let current={x:0,y:0}, dragging=null, ready=false, broken=false, panelOpen=false, paused=false, customURL='', externalReduce=false, mounted=false, generation=0, currentSrc='';
  const esc = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t = key=>(TEXT[key]||[key])[langIndex[String(window.YV_APP?.prefs?.().language||lang).slice(0,2)]??1];
  function getPrefs(){try{return {enabled:true,mode:'roam',size:165,source:'default',motionPaused:false,...JSON.parse(localStorage.getItem('yv.mascot.v1')||'{}')}}catch{return {enabled:true,mode:'roam',size:165,source:'default',motionPaused:false}}}
  function save(){try{localStorage.setItem('yv.mascot.v1',JSON.stringify(prefs))}catch{}}
  function reduced(){return externalReduce||media?.matches||document.documentElement.classList.contains('reduce-motion')}
  function bounds(){
    const viewport=window.visualViewport,w=viewport?.width||innerWidth,h=viewport?.height||innerHeight,left=viewport?.offsetLeft||0,top=viewport?.offsetTop||0;
    const width=host?.offsetWidth||Math.min(Number(prefs.size)||165,w<=700&&!prefs.sizeCustomized?120:280),height=host?.offsetHeight||width*.69;
    const minX=left+8,minY=top+8;
    return {minX,maxX:Math.max(minX,left+w-width-8),minY,maxY:Math.max(minY,top+h-height-8)};
  }
  function clamp(){const b=bounds();current.x=Math.min(b.maxX,Math.max(b.minX,current.x));current.y=Math.min(b.maxY,Math.max(b.minY,current.y));host.style.transform=`translate3d(${current.x}px,${current.y}px,0)`}
  function applySize(){host.style.setProperty('--mascot-size',`${prefs.size}px`);host.classList.toggle('has-custom-size',!!prefs.sizeCustomized)}
  function protectedActions(){return [...document.querySelectorAll('.btn-primary,#ex15-download,.ex15-format,.ex15-tabs,.mw-primary,[data-mw=add-page],.pw-stage-intro,.n14-navigation,.pw-handoff,.c18-section-nav,.c18-main-actions,.s19-settings,.page-heading,#main input:not([type=hidden]):not([type=checkbox]):not([type=radio]),#main textarea,#main select')].map(el=>el.getBoundingClientRect()).filter(r=>r.width&&r.height&&r.right>0&&r.left<innerWidth&&r.bottom>0&&r.top<innerHeight)}
  function overlapsAction(p,actions){const width=host.offsetWidth,height=host.offsetHeight,gap=14;return actions.some(r=>p.x+width+gap>r.left&&p.x-gap<r.right&&p.y+height+gap>r.top&&p.y-gap<r.bottom)}
  function avoidActions(actions){
    if(dragging||(prefs.position&&prefs.mode==='still')||!overlapsAction(current,actions))return;
    const b=bounds(),width=host.offsetWidth,height=host.offsetHeight,gap=16;
    const xs=[current.x,b.minX,b.maxX,...actions.flatMap(r=>[r.left-width-gap,r.right+gap])],ys=[current.y,b.minY,b.maxY,...actions.flatMap(r=>[r.top-height-gap,r.bottom+gap])];
    let best=null,distance=Infinity;
    for(const x of xs)for(const y of ys){const p={x:Math.max(b.minX,Math.min(b.maxX,x)),y:Math.max(b.minY,Math.min(b.maxY,y))},d=Math.hypot(p.x-current.x,p.y-current.y);if(d<distance&&!overlapsAction(p,actions)){best=p;distance=d}}
    if(best){current=best;clamp()}
  }
  function clearPath(a,b,actions){const width=host.offsetWidth,height=host.offsetHeight,gap=14;return !actions.some(r=>Math.max(a.x,b.x)+width+gap>r.left&&Math.min(a.x,b.x)-gap<r.right&&Math.max(a.y,b.y)+height+gap>r.top&&Math.min(a.y,b.y)-gap<r.bottom)}
  function scheduleLayout(){if(!mounted||layoutFrame)return;layoutFrame=requestAnimationFrame(()=>{layoutFrame=0;if(mounted&&!dragging){clamp();animate()}})}
  function rememberPosition(){const b=bounds();prefs.position={x:(current.x-b.minX)/Math.max(1,b.maxX-b.minX),y:(current.y-b.minY)/Math.max(1,b.maxY-b.minY)};save()}
  function restorePosition(){const p=prefs.position,b=bounds();if(p&&Number.isFinite(p.x)&&Number.isFinite(p.y))current={x:b.minX+Math.min(1,Math.max(0,p.x))*(b.maxX-b.minX),y:b.minY+Math.min(1,Math.max(0,p.y))*(b.maxY-b.minY)};clamp()}
  function resetPosition(){stop();prefs.position=null;const b=bounds();current={x:b.maxX,y:b.maxY-20};clamp();save();animate()}
  function stop(){if(orbitAnimation){const r=host.getBoundingClientRect();current={x:r.left,y:r.top};orbitAnimation.cancel();orbitAnimation=null;clamp()}}
  function animate(){
    stop();
    if(window.YV_APP?.route?.()==='journey')return;
    const actions=protectedActions();if(prefs.enabled&&ready&&!broken&&!panelOpen&&!focusWithin&&!paused)avoidActions(actions);
    if(!prefs.enabled||!ready||broken||dragging||panelOpen||paused||focusWithin||interactive||window.YV_COMPANION?.getState().isOpen||prefs.motionPaused||document.hidden||reduced()||prefs.mode==='still') return;
    if(document.activeElement?.matches('input,textarea,select,[contenteditable=true]')||document.querySelector('dialog[open]'))return;
    const b=bounds();let points;
    if(prefs.mode==='orbit'){
      const rx=Math.min(30,(b.maxX-b.minX)/4),ry=14;
      const cx=Math.min(b.maxX-rx,Math.max(b.minX+rx,current.x)),cy=Math.min(b.maxY-ry,Math.max(b.minY+ry,current.y));
      points=[current,{x:cx-rx,y:cy},{x:cx,y:cy-ry},{x:cx+rx,y:cy},{x:cx,y:cy+ry},current];
    }else{
      const sidebar=innerWidth>760?document.querySelector('#sidebar')?.getBoundingClientRect().right||0:0;
      const left=Math.min(b.maxX,Math.max(b.minX,sidebar+14)),right=b.maxX;
      const top=Math.min(b.maxY,Math.max(b.minY,(document.querySelector('.topbar')?.getBoundingClientRect().bottom||64)+16)),bottom=b.maxY;
      const edge=[{x:right,y:bottom},{x:left,y:bottom},{x:left,y:top},{x:right,y:top}];
      const nearest=edge.reduce((best,p,i)=>Math.hypot(p.x-current.x,p.y-current.y)<Math.hypot(edge[best].x-current.x,edge[best].y-current.y)?i:best,0);
      points=[current,...edge.slice(nearest),...edge.slice(0,nearest),edge[nearest],current];
    }
    if(points.some((p,i)=>i&&!clearPath(points[i-1],p,actions))){
      const alternatives=[...points,{x:current.x-60,y:current.y},{x:current.x+60,y:current.y},{x:current.x,y:current.y-35},{x:current.x,y:current.y+35}].filter(p=>p.x>=b.minX&&p.x<=b.maxX&&p.y>=b.minY&&p.y<=b.maxY&&!overlapsAction(p,actions)&&clearPath(current,p,actions));
      alternatives.sort((a,c)=>Math.hypot(c.x-current.x,c.y-current.y)-Math.hypot(a.x-current.x,a.y-current.y));
      if(!alternatives.length)return;
      points=[current,alternatives[0],current];
    }
    const distances=points.map((p,i)=>i?Math.hypot(p.x-points[i-1].x,p.y-points[i-1].y):0),total=distances.reduce((sum,n)=>sum+n,0);
    if(total<1)return;
    let travelled=0;
    const frames=points.map((p,i)=>{travelled+=distances[i];return {transform:`translate3d(${p.x}px,${p.y}px,0)`,offset:travelled/total}});
    orbitAnimation=host.animate(frames,{duration:prefs.mode==='orbit'?13000:Math.max(35000,total*35),iterations:Infinity,easing:prefs.mode==='orbit'?'ease-in-out':'linear'});
  }
  function labelControls(){
    host.setAttribute('aria-label',t('title'));
    const figure=host.querySelector('.mascot-figure');figure.setAttribute('aria-label',t('note'));figure.title=t('assistant');figure.setAttribute('aria-controls','yv-companion-panel');figure.setAttribute('aria-expanded',String(!!window.YV_COMPANION?.getState().isOpen));
    host.querySelector('.mascot-settings').setAttribute('aria-label',t('settings'));
    host.querySelector('.mascot-hide').setAttribute('aria-label',t('hide'));
    art.alt=prefs.source==='custom'?t('custom'):t('image');
    launcher.title=t(prefs.enabled?'assistant':'restore');launcher.setAttribute('aria-label',launcher.title);launcher.setAttribute('aria-controls','yv-companion-panel');launcher.setAttribute('aria-expanded',String(!!window.YV_COMPANION?.getState().isOpen));launcher.classList.toggle('is-hidden',!prefs.enabled);launcher.classList.toggle('is-unavailable',broken);launcher.hidden=!!(prefs.enabled&&ready&&!broken);
    if(broken)status.innerHTML=`<span>${esc(t('failed'))}</span><button type="button" data-mascot="retry">${esc(t('retry'))}</button>`;
    else if(!ready)status.textContent=t('loading');
  }
  function imageSrc(){return prefs.source==='custom'&&customURL?customURL:reduced()||prefs.motionPaused?POSTER:SOURCE}
  function updateImage(force=false){
    if(prefs.source==='custom'&&!customURL){labelControls();return}
    const src=imageSrc();if(src===currentSrc&&!force)return;currentSrc=src;ready=false;broken=false;host.classList.remove('loaded','failed');host.classList.toggle('custom-media',prefs.source==='custom'&&!!customURL);labelControls();art.src=src;
  }
  function show(){host.hidden=!prefs.enabled;applySize();if(prefs.enabled){updateImage();clamp();animate()}else{setInteractive(false);stop()}labelControls();save()}
  function setInteractive(value){interactive=Boolean(value);host.classList.toggle('is-interactive',interactive);host.querySelector('.mascot-figure').tabIndex=0;if(interactive){stop();host.querySelector('.mascot-figure').focus({preventScroll:true})}else animate()}
  function update(opts={}){
    if(!mounted)return;
    if(opts.language)lang=String(opts.language).slice(0,2);else lang=String(window.YV_APP?.prefs?.().language||document.documentElement.lang||'zh').slice(0,2);
    if('reducedMotion' in opts)externalReduce=!!opts.reducedMotion;else externalReduce=!!window.YV_APP?.prefs?.().reducedMotion;
    labelControls();if(prefs.enabled)updateImage();animate();if(panelOpen)renderPanel();
  }
  function spin(){if(reduced())return;spinAnimation?.cancel();spinAnimation=art.animate([{transform:'rotate(0deg)'},{transform:'rotate(-12deg)',offset:.2},{transform:'rotate(360deg)'}],{duration:850,easing:'cubic-bezier(.2,.7,.3,1)'});}
  function renderPanel(){
    const focusKey=panel.contains(document.activeElement)?document.activeElement.dataset.mascot:null;
    panel.setAttribute('aria-label',t('settings'));
    panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');
    panel.innerHTML=`<div class="mascot-panel-title"><strong>${esc(t('settings'))}</strong><button type="button" data-mascot="close" aria-label="${esc(t('close'))}">×</button></div><label class="mascot-check"><input type="checkbox" data-mascot="enabled" ${prefs.enabled?'checked':''}>${esc(t('enabled'))}</label><p class="mascot-current">${esc(t(prefs.source==='custom'?'custom':'source'))}</p><label class="mascot-field"><span>${esc(t('mode'))}</span><select data-mascot="mode">${['roam','orbit','still'].map(x=>`<option value="${x}" ${prefs.mode===x?'selected':''}>${esc(t(x))}</option>`).join('')}</select></label><label class="mascot-field"><span>${esc(t('size'))} <output>${prefs.size}</output></span><input data-mascot="size" type="range" min="130" max="280" step="5" value="${prefs.size}"></label><div class="mascot-panel-actions"><button type="button" data-mascot="move">${esc(t(interactive?'done':'move'))}</button><button type="button" data-mascot="position">${esc(t('resetPosition'))}</button><button type="button" data-mascot="pause" aria-pressed="${prefs.motionPaused?'true':'false'}">${esc(t(prefs.motionPaused?'resume':'pause'))}</button><button type="button" data-mascot="spin" ${reduced()?'disabled':''}>${esc(t('spin'))}</button><button type="button" data-mascot="local">${esc(t('local'))}</button><button type="button" data-mascot="reset">${esc(t('reset'))}</button></div><p class="mascot-help">${esc(t('note'))}</p><p class="mascot-help">${esc(t('network'))}</p><p class="mascot-help">${esc(t('motionNote'))}</p><p class="mascot-panel-message" role="status"></p><input data-mascot-file type="file" accept="image/png,image/jpeg,image/gif,image/webp,image/avif" hidden>`;
    if(focusKey)panel.querySelector('[data-mascot="'+CSS.escape(focusKey)+'"]')?.focus({preventScroll:true});
  }
  function openSettings(){if(!mounted)init();settingsFocus=document.activeElement;window.YV_COMPANION?.close({restoreFocus:false});window.YV_GUIDE?.close?.({restoreFocus:false});panelOpen=true;stop();renderPanel();panel.hidden=false;labelControls();panel.querySelector('button').focus()}
  function closeSettings(options={}){if(!panelOpen)return;panelOpen=false;panel.hidden=true;labelControls();animate();if(options.restoreFocus!==false){const target=settingsFocus?.isConnected&&settingsFocus.getClientRects().length?settingsFocus:launcher;target.focus({preventScroll:true})}}
  function openAssistant(opener){setInteractive(false);if(window.YV_COMPANION)window.YV_COMPANION.open(opener||host.querySelector('.mascot-figure'));else window.YV_GUIDE?.open();labelControls();stop()}
  function toggle(){prefs.enabled=!prefs.enabled;show();return prefs.enabled}
  function localStore(mode,value){return new Promise((resolve,reject)=>{
    if(!window.indexedDB){reject(Error('storage unavailable'));return}
    const request=indexedDB.open('yv-companion',1);request.onupgradeneeded=()=>request.result.createObjectStore('media');request.onerror=()=>reject(request.error);request.onsuccess=()=>{
      const db=request.result,tx=db.transaction('media',mode==='get'?'readonly':'readwrite'),store=tx.objectStore('media');let op=mode==='get'?store.get('custom'):mode==='delete'?store.delete('custom'):store.put(value,'custom');op.onsuccess=()=>resolve(op.result);op.onerror=()=>reject(op.error);tx.oncomplete=()=>db.close();
    };
  })}
  async function useLocal(file){
    if(!file||!/^image\/(png|jpeg|gif|webp|avif)$/.test(file.type)||file.size>8*1024*1024){panel.querySelector('.mascot-panel-message').textContent=t('fileError');return}
    if(customURL)URL.revokeObjectURL(customURL);customURL=URL.createObjectURL(file);prefs.source='custom';prefs.enabled=true;show();renderPanel();
    try{await localStore('set',file)}catch{panel.querySelector('.mascot-panel-message').textContent=t('storageError')}
  }
  function init(opts={}){
    if(mounted){update(opts);return window.YV_MASCOT}
    mounted=true;const instance=++generation;prefs=getPrefs();prefs.size=Math.max(130,Math.min(280,Number(prefs.size)||210));if(!['roam','orbit','still'].includes(prefs.mode))prefs.mode='roam';
    media=matchMedia('(prefers-reduced-motion: reduce)');host=document.createElement('div');host.className='yv-mascot';host.innerHTML='<button class="mascot-figure" type="button"><img decoding="async" draggable="false" referrerpolicy="no-referrer"><span class="mascot-ground" aria-hidden="true"></span></button><div class="mascot-status" role="status"></div><div class="mascot-actions"><button class="mascot-settings" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 17h16M8 4v6m8 4v6"/></svg></button><button class="mascot-hide" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div>';
    panel=document.createElement('section');panel.className='mascot-panel';panel.id='mascot-settings-panel';panel.hidden=true;panel.setAttribute('aria-label','Companion settings');launcher=document.createElement('button');launcher.type='button';launcher.className='mascot-launcher';launcher.setAttribute('aria-controls',panel.id);launcher.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M21.5 8.5c-4-4-11-2.3-12.5 3.5-4 2-4 8.5.2 11 3 3.8 10.5 2.3 11.7-2 5.1-.2 7.1-5 4.6-8.3M12 8l-1-4 5 3m4 2 3-4 1 6M13 17h.1M20 17h.1M15 21q2 1 4-1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';document.body.append(host,panel,launcher);launcher.onclick=()=>{if(!prefs.enabled){prefs.enabled=true;show()}openSettings()};art=host.querySelector('img');status=host.querySelector('.mascot-status');host.querySelector('.mascot-figure').tabIndex=-1;
    current={x:Math.max(8,innerWidth-prefs.size-30),y:Math.max(88,innerHeight-prefs.size*.69-35)};
    art.onload=()=>{ready=true;broken=false;host.classList.add('loaded');host.classList.remove('failed');status.textContent='';clamp();labelControls();animate()};
    art.onerror=()=>{ready=false;broken=true;host.classList.add('failed');host.classList.remove('loaded');stop();clamp();labelControls()};
    host.querySelector('.mascot-settings').onclick=openSettings;host.querySelector('.mascot-hide').onclick=()=>{prefs.enabled=false;show()};
    status.onclick=e=>{if(e.target.closest('[data-mascot="retry"]'))updateImage(true)};
    const figure=host.querySelector('.mascot-figure');figure.tabIndex=0;applySize();restorePosition();launcher.onclick=()=>{if(!prefs.enabled){prefs.enabled=true;show()}openAssistant(launcher)};
    figure.addEventListener('contextmenu',e=>{e.preventDefault();openSettings()});
    figure.addEventListener('pointerdown',e=>{if(e.button!==0||e.isPrimary===false||dragging)return;suppressClick=false;stop();dragging={id:e.pointerId,x:e.clientX,y:e.clientY,startX:current.x,startY:current.y,moved:false};figure.setPointerCapture(e.pointerId)});
    figure.addEventListener('pointermove',e=>{if(!dragging||e.pointerId!==dragging.id)return;const dx=e.clientX-dragging.x,dy=e.clientY-dragging.y;if(Math.abs(dx)+Math.abs(dy)>5)dragging.moved=true;if(!dragging.moved)return;host.classList.add('dragging');current={x:dragging.startX+dx,y:dragging.startY+dy};clamp()});
    const pointerEnd=e=>{if(!dragging||e.pointerId!==dragging.id)return;const moved=dragging.moved,cancelled=e.type!=='pointerup';dragging=null;suppressClick=moved||cancelled;host.classList.remove('dragging');if(moved){prefs.mode='still';rememberPosition()}if(figure.hasPointerCapture(e.pointerId))figure.releasePointerCapture(e.pointerId);animate()};
    figure.addEventListener('pointerup',pointerEnd);figure.addEventListener('pointercancel',pointerEnd);figure.addEventListener('lostpointercapture',pointerEnd);
    figure.addEventListener('click',e=>{if(suppressClick){suppressClick=false;e.preventDefault();return}openAssistant(figure)});
    figure.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')suppressClick=false;else if(e.key==='Home'){e.preventDefault();resetPosition()}else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();stop();prefs.mode='still';const step=e.shiftKey?40:15;current.x+=(e.key==='ArrowLeft'?-step:e.key==='ArrowRight'?step:0);current.y+=(e.key==='ArrowUp'?-step:e.key==='ArrowDown'?step:0);clamp();rememberPosition()}});
    host.addEventListener('mouseenter',()=>{paused=true;stop()});host.addEventListener('mouseleave',()=>{paused=false;animate()});host.addEventListener('focusin',()=>{focusWithin=true;stop()});host.addEventListener('focusout',()=>{requestAnimationFrame(()=>{if(!mounted)return;focusWithin=host.contains(document.activeElement);animate()})});
    panel.addEventListener('click',async e=>{const action=e.target.closest('[data-mascot]')?.dataset.mascot;if(action==='close')closeSettings();if(action==='move'){prefs.enabled=true;show();closeSettings();setInteractive(!interactive)}if(action==='pause'){prefs.motionPaused=!prefs.motionPaused;save();updateImage();animate();renderPanel()}if(action==='position')resetPosition();if(action==='spin')spin();if(action==='local')panel.querySelector('[data-mascot-file]').click();if(action==='reset'){prefs.source='default';if(customURL)URL.revokeObjectURL(customURL);customURL='';show();renderPanel();try{await localStore('delete')}catch{}}});
    panel.addEventListener('input',e=>{if(e.target.dataset.mascot==='size'){prefs.size=Number(e.target.value);prefs.sizeCustomized=true;applySize();panel.querySelector('output').textContent=prefs.size;clamp();rememberPosition();save()}});
    panel.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeSettings()}});
    panel.addEventListener('change',e=>{if(e.target.dataset.mascot==='enabled'){prefs.enabled=e.target.checked;show()}if(e.target.dataset.mascot==='mode'){prefs.mode=e.target.value;save();animate()}if(e.target.matches('[data-mascot-file]'))useLocal(e.target.files[0])});
    document.addEventListener('visibilitychange',onVisibility);window.addEventListener('resize',onResize);window.visualViewport?.addEventListener('resize',onResize);window.addEventListener('hashchange',scheduleLayout);window.addEventListener('scroll',scheduleLayout,{passive:true});document.addEventListener('focusin',scheduleLayout);document.addEventListener('focusout',scheduleLayout);document.addEventListener('keydown',onEscape);media.addEventListener('change',onMotion);
    observer=new MutationObserver(()=>update());observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang','class']});
    if(prefs.source==='custom')localStore('get').then(blob=>{if(!mounted||instance!==generation)return;if(blob){customURL=URL.createObjectURL(blob);updateImage()}else{prefs.source='default';save();updateImage()}}).catch(()=>{if(!mounted||instance!==generation)return;prefs.source='default';save();updateImage()});
    update(opts);show();return window.YV_MASCOT;
  }
  function onVisibility(){if(document.hidden)stop();else animate()}
  function onResize(){stop();restorePosition();animate()}
  function onEscape(e){if(e.key==='Escape'){if(panelOpen)closeSettings();if(interactive){setInteractive(false);(prefs.enabled&&ready?host.querySelector('.mascot-figure'):launcher).focus({preventScroll:true})}}}
  function onMotion(){updateImage();animate()}
  function destroy(){if(!mounted)return;stop();spinAnimation?.cancel();observer?.disconnect();media?.removeEventListener('change',onMotion);document.removeEventListener('visibilitychange',onVisibility);document.removeEventListener('keydown',onEscape);window.removeEventListener('resize',onResize);window.visualViewport?.removeEventListener('resize',onResize);window.removeEventListener('hashchange',scheduleLayout);window.removeEventListener('scroll',scheduleLayout);document.removeEventListener('focusin',scheduleLayout);document.removeEventListener('focusout',scheduleLayout);cancelAnimationFrame(layoutFrame);layoutFrame=0;host.remove();panel.remove();launcher.remove();if(customURL)URL.revokeObjectURL(customURL);mounted=false;ready=false;broken=false;panelOpen=false;paused=false;interactive=false;focusWithin=false;suppressClick=false;settingsFocus=null;dragging=null;customURL='';currentSrc=''}
  window.YV_MASCOT={init,update,openSettings,closeSettings,openAssistant,resetPosition,toggle,spin,destroy,text:t,getState:()=>({mounted,enabled:prefs?.enabled,mode:prefs?.mode,source:prefs?.source,ready,broken,reducedMotion:reduced(),animating:!!orbitAnimation,panelOpen,interactive,motionPaused:!!prefs?.motionPaused,position:prefs?.position,currentPosition:{...current},workDocked:false})};
})();
