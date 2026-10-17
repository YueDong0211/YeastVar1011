'use strict';
(() => {
  const WORDS={
    zh:{title:'出芽酵母',alt:'AI生成的酿酒酵母母细胞与芽体概念图',caption:'AI概念示意 · 光效交互，不代表显微观测或细胞分裂模拟',interact:'点击或轻触显示光纹；按 Enter 或空格也可操作',pause:'暂停动态效果',play:'播放动态效果',hint:'轻触探索'},
    en:{title:'Budding yeast',alt:'AI-generated concept image of a Saccharomyces cerevisiae mother cell and bud',caption:'AI concept illustration · Interactive light effects, not microscopy or simulated cell division',interact:'Click or tap for a light ripple; Enter or Space also works',pause:'Pause visual motion',play:'Play visual motion',hint:'Tap to explore'},
    fr:{title:'Levure bourgeonnante',alt:'Illustration conceptuelle générée par IA d’une cellule mère de Saccharomyces cerevisiae et de son bourgeon',caption:'Concept IA · Effets lumineux interactifs, sans observation microscopique ni simulation de division',interact:'Cliquez ou touchez pour une onde lumineuse ; Entrée et Espace fonctionnent aussi',pause:'Suspendre les effets animés',play:'Animer les effets visuels',hint:'Touchez pour explorer'},
    es:{title:'Levadura en gemación',alt:'Imagen conceptual generada por IA de una célula madre de Saccharomyces cerevisiae y su yema',caption:'Concepto con IA · Efectos de luz interactivos; no es microscopía ni una simulación de división',interact:'Haz clic o toca para una onda de luz; también puedes usar Intro o Espacio',pause:'Pausar efectos animados',play:'Reproducir efectos animados',hint:'Toca para explorar'},
    eu:{title:'Legamia gematzen',alt:'IAk sortutako Saccharomyces cerevisiae ama-zelularen eta kimuaren irudi kontzeptuala',caption:'IAren kontzeptu-irudia · Argi-efektu interaktiboak; ez da mikroskopia edo zelula-zatiketaren simulazioa',interact:'Egin klik edo ukitu argi-uhina ikusteko; Sartu edo Zuriunea ere erabil daiteke',pause:'Pausatu mugimendua',play:'Abiarazi mugimendua',hint:'Ukitu esploratzeko'}
  };
  const controllers=new Map(),KEY='yv.cell-visual.v5.paused';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const language=()=>window.YV_APP?.prefs()?.language||'zh';
  const text=(key,lang=language())=>WORDS[lang]?.[key]||WORDS.en[key];
  const icon=paused=>paused?'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 10 7-10 7z"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  function markup(options={}){
    if(typeof options==='string')options={language:options};
    const lang=options.language||language();
    return `<figure class="yv-cell-visual" data-cell-language="${esc(lang)}"><div class="cv5-viewport" role="button" tabindex="0" aria-label="${esc(text('interact',lang))}"><img class="cv5-image" src="assets/yeast-cell-v5.png" alt="${esc(text('alt',lang))}" width="1672" height="941" decoding="async" loading="lazy" draggable="false"><span class="cv5-light" aria-hidden="true"></span><span class="cv5-atmosphere" aria-hidden="true"></span><span class="cv5-ripples" aria-hidden="true"></span><span class="cv5-view-label" aria-hidden="true"><i></i>${esc(text('title',lang))}</span><span class="cv5-hint" aria-hidden="true">${esc(text('hint',lang))}</span></div><button class="cv5-motion" type="button" aria-label="${esc(text('pause',lang))}" aria-pressed="false">${icon(false)}</button><figcaption>${esc(text('caption',lang))}</figcaption></figure>`;
  }
  function mount(root=document){
    if(typeof root==='string')root=document.querySelector(root);if(!root)return;
    const figures=[...(root.matches?.('.yv-cell-visual')?[root]:[]),...root.querySelectorAll('.yv-cell-visual')];
    for(const [figure,controller] of controllers)if(!figure.isConnected){controller.destroy();controllers.delete(figure)}
    figures.forEach(figure=>{
      if(controllers.has(figure))return;
      const view=figure.querySelector('.cv5-viewport'),button=figure.querySelector('.cv5-motion'),rings=figure.querySelector('.cv5-ripples'),lang=figure.dataset.cellLanguage||language(),abort=new AbortController(),signal=abort.signal,media=matchMedia('(prefers-reduced-motion: reduce)');
      let paused=false,visible=true,pointerFrame=0,pointer=null,observer=null;
      try{paused=localStorage.getItem(KEY)==='true'}catch{}
      const reduced=()=>media.matches||document.documentElement.classList.contains('reduce-motion');
      const sync=()=>{const limited=reduced(),buttonState=String(paused||limited);figure.classList.toggle('cv5-running',!paused&&visible&&!document.hidden&&!limited);figure.classList.toggle('cv5-reduced',limited);if(button.dataset.paused!==buttonState){button.dataset.paused=buttonState;button.innerHTML=icon(paused||limited)}button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',text(paused?'play':'pause',lang));button.title=text(paused?'play':'pause',lang);button.hidden=limited;if(limited||paused)rings.replaceChildren()};
      const reset=()=>{view.style.setProperty('--cv5-x','50%');view.style.setProperty('--cv5-y','45%');view.style.setProperty('--cv5-tilt-x','0px');view.style.setProperty('--cv5-tilt-y','0px')};
      const ripple=(x,y)=>{
        if(reduced()||paused)return;
        const r=view.getBoundingClientRect(),ring=document.createElement('i');ring.className='cv5-ripple';ring.style.left=(x-r.left)+'px';ring.style.top=(y-r.top)+'px';
        while(rings.childElementCount>=3)rings.firstElementChild.remove();rings.append(ring);
        const animation=ring.animate([{transform:'translate(-50%,-50%) scale(.12)',opacity:.85},{transform:'translate(-50%,-50%) scale(1)',opacity:0}],{duration:1250,easing:'cubic-bezier(.15,.6,.3,1)'});animation.onfinish=()=>ring.remove();
      };
      view.addEventListener('pointermove',event=>{if(reduced()||paused||event.pointerType==='touch')return;pointer={x:event.clientX,y:event.clientY};if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{pointerFrame=0;if(!pointer)return;const r=view.getBoundingClientRect(),x=Math.max(0,Math.min(1,(pointer.x-r.left)/r.width)),y=Math.max(0,Math.min(1,(pointer.y-r.top)/r.height));view.style.setProperty('--cv5-x',(x*100)+'%');view.style.setProperty('--cv5-y',(y*100)+'%');view.style.setProperty('--cv5-tilt-x',((x-.5)*5)+'px');view.style.setProperty('--cv5-tilt-y',((y-.5)*4)+'px')})},{signal,passive:true});
      view.addEventListener('pointerleave',reset,{signal});
      view.addEventListener('click',event=>{const r=view.getBoundingClientRect();ripple(event.detail?event.clientX:r.left+r.width/2,event.detail?event.clientY:r.top+r.height/2)},{signal});
      view.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();const r=view.getBoundingClientRect();ripple(r.left+r.width/2,r.top+r.height/2)}},{signal});
      button.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem(KEY,String(paused))}catch{}sync()},{signal});
      document.addEventListener('visibilitychange',sync,{signal});media.addEventListener('change',sync,{signal});
      const preferenceObserver=new MutationObserver(sync);preferenceObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
      if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;sync()},{threshold:.05});observer.observe(figure)}
      sync();controllers.set(figure,{destroy(){abort.abort();observer?.disconnect();preferenceObserver.disconnect();cancelAnimationFrame(pointerFrame);rings.getAnimations({subtree:true}).forEach(animation=>animation.cancel());rings.replaceChildren();figure.classList.remove('cv5-running');reset()}});
    });
  }
  function unmount(root){if(typeof root==='string')root=document.querySelector(root);for(const [figure,controller] of controllers)if(!root||figure===root||root.contains(figure)){controller.destroy();controllers.delete(figure)}}
  window.YV_CELL_VISUAL={markup,mount,unmount,text,getState:()=>({mounted:controllers.size})};
})();
