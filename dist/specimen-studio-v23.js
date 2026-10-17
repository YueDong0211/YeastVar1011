/* Optional visual customization for the procedural specimen. No research-plan data is changed. */
'use strict';
(() => {
 const KEY='yv.specimen.v23',LANGS=['zh','en','fr','es','eu'];
 const COPY={
  title:['酵母工坊','Yeast studio','Atelier de levure','Taller de levadura','Legamia-tailerra'],
  intro:['定制你的观测角色，实时查看外观与动作。','Customize your specimen and preview its look and movement.','Personnalisez votre spécimen et observez son aspect et ses mouvements.','Personaliza tu espécimen y observa su aspecto y movimiento.','Pertsonalizatu zure espezimena eta ikusi itxura eta mugimendua.'],
  note:['形态与配色为视觉设计；不代表表达量或推断的细胞状态。','Shape and color are visual design choices, not expression measurements or inferred cell states.','Forme et couleur sont des choix visuels, pas des mesures d’expression ni des états cellulaires inférés.','Forma y color son decisiones visuales, no medidas de expresión ni estados celulares inferidos.','Forma eta kolorea ikus-diseinua dira, ez adierazpen-neurketak edo inferitutako zelula-egoerak.'],
  palette:['配色','Palette','Palette','Paleta','Paleta'],
  lagoon:['流光青','Lagoon','Lagon','Laguna','Aintzira'],
  nebula:['星云紫','Nebula','Nébuleuse','Nebulosa','Nebulosa'],
  amber:['琥珀金','Amber','Ambre','Ámbar','Anbarra'],
  accent:['自由配色','Custom color','Couleur personnalisée','Color personalizado','Kolore pertsonalizatua'],
  finish:['材质','Finish','Matière','Material','Materiala'],
  hologram:['全息流光','Holographic','Holographique','Holográfico','Holografikoa'],
  pearl:['珠光细胞','Pearlescent','Nacrée','Nacarado','Nakar-itxura'],
  layers:['结构图层','Structure layers','Couches structurelles','Capas estructurales','Egitura-geruzak'],
  wall:['细胞壁','Cell wall','Paroi cellulaire','Pared celular','Zelula-pareta'],
  nucleus:['细胞核','Nucleus','Noyau','Núcleo','Nukleoa'],
  vacuole:['液泡','Vacuole','Vacuole','Vacuola','Bakuoloa'],
  network:['膜与线粒体网络','Membrane and mitochondrial networks','Réseaux membranaire et mitochondrial','Redes de membranas y mitocondrias','Mintzen eta mitokondrioen sareak'],
  actions:['动作','Actions','Actions','Acciones','Ekintzak'],
  greet:['轻盈招呼','Greeting','Salutation','Saludo','Agurra'],
  pulse:['流光脉冲','Light pulse','Impulsion lumineuse','Pulso de luz','Argi-pultsua'],
  orbit:['环绕展示','Orbit reveal','Vue orbitale','Vista orbital','Orbita-ikuspegia'],
  rotate:['自动展示旋转','Automatic turntable','Rotation automatique','Rotación automática','Biraketa automatikoa'],
  reduced:['已暂停动态，可调整静态外观。','Motion is paused. Static appearance controls remain available.','L’animation est en pause. Les réglages visuels restent disponibles.','La animación está pausada. Puedes ajustar la apariencia estática.','Animazioa pausatuta dago. Itxura estatikoa doi dezakezu.'],
  reset:['恢复默认外观','Reset appearance','Réinitialiser l’aspect','Restablecer apariencia','Berrezarri itxura'],
  done:['完成定制','Done','Terminer','Listo','Eginda'],
  close:['关闭工坊','Close studio','Fermer l’atelier','Cerrar taller','Itxi tailerra'],
  saved:['外观已保存','Appearance saved','Aspect enregistré','Apariencia guardada','Itxura gordeta'],
  failed:['当前浏览器未能保存；本次预览仍可使用。','This browser could not save the settings; the current preview still works.','Le navigateur n’a pas enregistré les réglages ; l’aperçu reste disponible.','El navegador no pudo guardar los ajustes; la vista previa sigue disponible.','Arakatzaileak ezin izan ditu ezarpenak gorde; aurrebistak erabilgarri jarraitzen du.'],
  resetDone:['已恢复默认外观','Default appearance restored','Aspect par défaut rétabli','Apariencia predeterminada restaurada','Itxura lehenetsia berrezarrita'],
  ready:['实时预览','Live preview','Aperçu en direct','Vista previa en directo','Zuzeneko aurrebista'],
  loading:['模型准备完成后可预览动作','Actions are available once the model is ready','Les actions seront disponibles après le chargement du modèle','Las acciones estarán disponibles cuando el modelo esté listo','Ekintzak eredua prest dagoenean erabil daitezke']
 };
 const COLORS={lagoon:'#65dfd2',nebula:'#b9a0ff',amber:'#edbc72'};
 const defaults=()=>({palette:'lagoon',finish:'hologram',layers:{wall:true,nucleus:true,vacuole:true,network:true},autoRotate:false});
 let settings=defaults(),dialog=null,opener=null;
 const A=()=>window.YV_APP,scene=()=>window.YV_JOURNEY_SCENE;
 const T=k=>COPY[k]?.[Math.max(0,LANGS.indexOf(A()?.prefs?.().language||'zh'))]||k;
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const icon=k=>({close:'<path d="m6 6 12 12M6 18 18 6"/>',studio:'<path d="M12 3v4m-2-2h4M5 11c0-3 3-5 6-4s7 4 7 7-3 7-7 6-7-6-6-9Z"/><path d="m18 3 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/>',greet:'<path d="M5 13c0-5 4-8 8-7s7 5 5 10-9 7-12 2M4 5l2 2m-4 4h3m14-8v3m2-1h-4"/>',pulse:'<path d="M2 12h5l3-7 4 14 3-7h5"/>',orbit:'<ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-30 12 12)"/><circle cx="12" cy="12" r="4"/>'}[k]||'');
 const I=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon(k)}</svg>`;
 function read(){settings=defaults();try{const s=JSON.parse(localStorage.getItem(KEY)||'{}');if(Object.hasOwn(COLORS,s.palette))settings.palette=s.palette;if(['hologram','pearl'].includes(s.finish))settings.finish=s.finish;if(/^#[a-f\d]{6}$/i.test(s.accent||''))settings.accent=s.accent;for(const k of Object.keys(settings.layers))if(typeof s.layers?.[k]==='boolean')settings.layers[k]=s.layers[k];settings.autoRotate=s.autoRotate===true;}catch{}}
 function status(key){const el=dialog?.querySelector('.s23-status');if(el)el.textContent=T(key);}
 function apply(){scene()?.setAppearance?.(settings);document.querySelector('#journey')?.classList.add('s23-enabled');}
 function persist(){let ok=true;try{localStorage.setItem(KEY,JSON.stringify(settings));}catch{ok=false;}apply();status(ok?'saved':'failed');updateMotion();}
 function updateMotion(){if(!dialog)return;const paused=window.YV_MODE_TRANSITIONS?.reduced?.()||scene()?.state?.().motion===false;const note=dialog.querySelector('.s23-motion-note');if(note){note.hidden=!paused;note.textContent=T('reduced');}const checkbox=dialog.querySelector('[data-s23-setting=autoRotate]');if(checkbox)checkbox.disabled=!!paused;}
 function render(){dialog.innerHTML=`<header class="s23-header"><div class="s23-emblem">${I('studio')}</div><div><span>YEASTVAR / SPECIMEN STUDIO</span><h2 id="s23-title" tabindex="-1">${E(T('title'))}</h2></div><button type="button" data-s23="close" aria-label="${E(T('close'))}">${I('close')}</button></header><div class="s23-body"><div class="s23-intro"><span class="s23-live"><i></i>${E(T('ready'))}</span><p>${E(T('intro'))}</p></div><fieldset><legend>${E(T('palette'))}</legend><div class="s23-palettes">${Object.keys(COLORS).map(k=>`<label class="s23-palette" style="--swatch:${COLORS[k]}"><input type="radio" name="s23-palette" value="${k}" ${settings.palette===k&&!settings.accent?'checked':''}><span class="s23-orb"></span><span>${E(T(k))}</span></label>`).join('')}</div><label class="s23-custom">${E(T('accent'))}<input type="color" value="${E(settings.accent||COLORS[settings.palette])}" data-s23-setting="accent"><output class="s23-hex">${E((settings.accent||COLORS[settings.palette]).toUpperCase())}</output></label></fieldset><fieldset><legend>${E(T('finish'))}</legend><div class="s23-finishes">${['hologram','pearl'].map(k=>`<label class="s23-finish ${k}"><input type="radio" name="s23-finish" value="${k}" ${settings.finish===k?'checked':''}><span class="s23-finish-art" aria-hidden="true"></span><span>${E(T(k))}</span></label>`).join('')}</div></fieldset><fieldset><legend>${E(T('layers'))}</legend><div class="s23-layers">${Object.keys(settings.layers).map(k=>`<label><input type="checkbox" data-s23-layer="${k}" ${settings.layers[k]?'checked':''}><span>${E(T(k))}</span></label>`).join('')}</div></fieldset><fieldset><legend>${E(T('actions'))}</legend><div class="s23-actions">${['greet','pulse','orbit'].map(k=>`<button type="button" data-s23-action="${k}">${I(k)}<span>${E(T(k))}</span></button>`).join('')}</div><label class="s23-rotate"><input type="checkbox" data-s23-setting="autoRotate" ${settings.autoRotate?'checked':''}>${E(T('rotate'))}</label><p class="s23-motion-note" hidden></p></fieldset><p class="s23-note">${E(T('note'))}</p></div><footer class="s23-footer"><p class="s23-status" role="status" aria-live="polite"></p><div><button type="button" data-s23="reset">${E(T('reset'))}</button><button type="button" data-s23="close" class="s23-done">${E(T('done'))} ↗</button></div></footer>`;updateMotion();}
 function close({restoreFocus=true}={}){if(!dialog)return;dialog.close();dialog.remove();dialog=null;document.documentElement.classList.remove('s23-studio-open');if(restoreFocus&&opener?.isConnected)opener.focus({preventScroll:true});}
 function open(el){if(dialog?.open)return;opener=el||document.activeElement;read();apply();dialog=document.createElement('dialog');dialog.className='s23-dialog';dialog.id='s23-dialog';dialog.setAttribute('aria-labelledby','s23-title');dialog.setAttribute('aria-modal','false');render();document.body.append(dialog);dialog.addEventListener('click',event=>{const action=event.target.closest('[data-s23]')?.dataset.s23;if(action==='close')close();else if(action==='reset'){settings=defaults();persist();render();status('resetDone');dialog.querySelector('[data-s23=reset]')?.focus();}const anim=event.target.closest('[data-s23-action]');if(anim){const ok=scene()?.animateSpecimen?.(anim.dataset.s23Action);status(ok===false?'loading':anim.dataset.s23Action);}});dialog.addEventListener('input',event=>{const el=event.target;if(el.dataset.s23Setting==='accent'){settings.accent=el.value;dialog.querySelectorAll('[name=s23-palette]').forEach(x=>x.checked=false);dialog.querySelector('.s23-hex').textContent=el.value.toUpperCase();persist();}});dialog.addEventListener('change',event=>{const el=event.target;if(el.name==='s23-palette'){settings.palette=el.value;delete settings.accent;dialog.querySelector('[type=color]').value=COLORS[el.value];dialog.querySelector('.s23-hex').textContent=COLORS[el.value].toUpperCase();}else if(el.name==='s23-finish')settings.finish=el.value;else if(el.dataset.s23Layer)settings.layers[el.dataset.s23Layer]=el.checked;else if(el.dataset.s23Setting==='autoRotate')settings.autoRotate=el.checked;else return;persist();});dialog.addEventListener('cancel',event=>{event.preventDefault();close();});dialog.show();document.documentElement.classList.add('s23-studio-open');dialog.querySelector('#s23-title').focus({preventScroll:true});}
 function sync(){read();apply();if(dialog){render();}}
 document.addEventListener('keydown',event=>{if(event.key!=='Escape'||!dialog?.open)return;const above=document.querySelector('dialog[open]:not(#s23-dialog),#search-modal:not([hidden]),#drawer:not([hidden])');if(above)return;event.preventDefault();event.stopImmediatePropagation();close();},true);
 window.addEventListener('hashchange',()=>close({restoreFocus:false}));
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',updateMotion);
 window.YV_SPECIMEN_STUDIO={open,close,sync,updateMotion};
})();
