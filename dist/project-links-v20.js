/* Public project entry points. Links never attach local plans or user settings. */
'use strict';
(() => {
 const ROOT='https://github.com/YueDong0211/YeastVar1011';
 const LINKS=Object.freeze({github:ROOT,issues:ROOT+'/issues/new/choose',contribute:ROOT+'/blob/main/CONTRIBUTING.md',licenses:ROOT+'/blob/main/THIRD_PARTY_NOTICES.md',sources:ROOT+'/blob/main/DATA_SOURCES.md'});
 const TEXT={
  title:['共同完善这个工作站','Build the workstation together','Améliorons cet atelier ensemble','Mejoremos esta estación juntos','Hobetu lan-estazio hau elkarrekin'],
  body:['代码、界面与研究证据均可提出改进。补充 marker 或方法时，请附上原始来源和适用条件。','Contribute code, interface improvements or research evidence. Include the primary source and context for a marker or method.','Proposez du code, des améliorations de l’interface ou des preuves scientifiques. Joignez la source primaire et le contexte du marqueur ou de la méthode.','Aporte código, mejoras de interfaz o evidencias. Incluya la fuente primaria y el contexto del marcador o método.','Ekarri kodea, interfazearen hobekuntzak edo ikerketa-ebidentziak. Gehitu markatzailearen edo metodoaren jatorrizko iturria eta testuingurua.'],
  github:['查看源代码','Source code','Code source','Código fuente','Iturburu-kodea'],
  issues:['反馈与补充','Issues & suggestions','Retours et propositions','Problemas y propuestas','Arazoak eta proposamenak'],
  contribute:['贡献指南','Contributing guide','Guide de contribution','Guía de contribución','Ekarpenen gida'],
  licenses:['开源许可与致谢','Licenses & credits','Licences et crédits','Licencias y créditos','Lizentziak eta kredituak'],
  sources:['数据来源','Data sources','Sources des données','Fuentes de datos','Datuen iturriak'],
  project:['开源项目','Open-source project','Projet open source','Proyecto de código abierto','Kode irekiko proiektua']
 };
 const langs=['zh','en','fr','es','eu'];
 const language=()=>window.YV_APP?.prefs?.().language||'zh';
 const text=k=>TEXT[k][Math.max(0,langs.indexOf(language()))];
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const symbol='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/></svg>';
 const link=(k,cls='')=>`<a class="${cls}" href="${LINKS[k]}" target="_blank" rel="noopener noreferrer" data-project-link="${k}">${esc(text(k))}<span aria-hidden="true">↗</span></a>`;
 function card(compact=false){return `<div class="p20-project-head">${symbol}<div><span>${esc(text('project'))} · MIT</span><h2>${esc(text('title'))}</h2></div></div>${compact?'':`<p>${esc(text('body'))}</p>`}<nav aria-label="${esc(text('project'))}">${link('github')}${link('issues')}${link('contribute')}${compact?'':link('sources')}</nav>`;}
 function companion(){const host=document.querySelector('.companion-community-intro');if(!host)return;let el=host.querySelector('.p20-project');if(el?.dataset.language===language())return;if(!el){el=document.createElement('section');el.className='p20-project p20-project-compact';host.append(el);}el.dataset.language=language();el.innerHTML=card(true);}
 let observer;
 function afterRender(){
  const footer=document.querySelector('.footer');let nav=footer?.querySelector('.p20-footer-links');
  if(footer&&!nav){nav=document.createElement('nav');nav.className='p20-footer-links';footer.append(nav);}
  if(nav){nav.setAttribute('aria-label',text('project'));nav.innerHTML=`<a href="${ROOT}" target="_blank" rel="noopener noreferrer" data-project-link="github">GitHub ↗</a>${link('licenses')}`;}
  if(window.YV_APP?.route?.()==='contribute'){const host=document.querySelector('.contribute-hero');if(host&&!host.querySelector('.p20-project')){const el=document.createElement('section');el.className='p20-project';el.innerHTML=card();host.append(el);}}
  const panel=document.getElementById('yv-companion-panel');if(panel&&!observer){observer=new MutationObserver(companion);observer.observe(panel,{childList:true,subtree:true});}companion();
 }
 window.addEventListener('yv:companionchange',afterRender);
 window.YV_PROJECT={links:LINKS,afterRender};
})();
