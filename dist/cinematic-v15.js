'use strict';
(() => {
  const KEY='yv.cinematic.v15.mode', LANGS=['zh','en','fr','es','eu'];
  const words={
    title:['页面转场','Page transitions','Transitions des pages','Transiciones de página','Orrialdeen trantsizioak'],
    intro:['选择浏览节奏；3D 模式在切换环节时呈现短暂的酵母转身。','Choose the browsing rhythm. The 3D mode turns a yeast cell as you change stages.','Choisissez le rythme de navigation. Le mode 3D fait tourner une levure au changement d’étape.','Elige el ritmo de navegación. El modo 3D gira una levadura al cambiar de etapa.','Aukeratu nabigazioaren erritmoa. 3D moduak legamia biratzen du etapa aldatzean.'],
    standard:['轻滑','Slide','Glissement','Deslizamiento','Irristatzea'],
    standardNote:['轻量、连贯的页面切换','Light, fluid page changes','Navigation légère et fluide','Cambios de página ligeros y fluidos','Orrialde-aldaketa arin eta leunak'],
    cinematic:['酵母 3D','Yeast 3D','Levure 3D','Levadura 3D','Legamia 3D'],
    cinematicNote:['立体细胞与镜头转身','A dimensional cell and camera turn','Une cellule en volume et une rotation de caméra','Una célula tridimensional y un giro de cámara','Zelula tridimentsionala eta kamera-biraketa'],
    off:['关闭','Off','Désactivées','Desactivadas','Desaktibatuta'],
    offNote:['直接显示下一页','Show the next page directly','Afficher directement la page suivante','Mostrar la siguiente página directamente','Erakutsi hurrengo orrialdea zuzenean'],
    preview:['预览 3D 酵母','Preview 3D yeast','Aperçu de la levure 3D','Vista previa de la levadura 3D','Ikusi 3D legamia'],
    model:['出芽酵母 · 形态视觉模型','Budding yeast · visual model','Levure bourgeonnante · modèle visuel','Levadura en gemación · modelo visual','Legamia gematzen · ikusizko eredua'],
    drag:['拖动旋转 · 方向键微调','Drag to rotate · Arrow keys adjust','Glissez pour tourner · Ajustez avec les flèches','Arrastra para girar · Ajusta con las flechas','Arrastatu biratzeko · Doitu geziekin'],
    reset:['重置视角','Reset view','Réinitialiser la vue','Restablecer vista','Berrezarri ikuspegia'],
    close:['关闭预览','Close preview','Fermer l’aperçu','Cerrar vista previa','Itxi aurrebista'],
    reduced:['已启用减少动态，页面会直接切换。','Reduced motion is enabled; pages change directly.','Les animations sont réduites ; les pages changent directement.','El movimiento reducido está activado; las páginas cambian directamente.','Mugimendu murriztua aktibatuta dago; orrialdeak zuzenean aldatzen dira.'],
    fallback:['此设备无法启用 3D，已保留轻滑切换。','3D is unavailable on this device. Slide transitions remain available.','La 3D est indisponible sur cet appareil. Le glissement reste disponible.','La 3D no está disponible en este dispositivo. El deslizamiento sigue disponible.','3D ez dago erabilgarri gailu honetan. Irristatze-trantsizioak erabilgarri daude.'],
    loading:['正在准备 3D 预览…','Preparing 3D preview…','Préparation de l’aperçu 3D…','Preparando la vista previa 3D…','3D aurrebista prestatzen…']
  };
  const lang=()=>Math.max(0,LANGS.indexOf(window.YV_APP?.prefs()?.language||'zh'));
  const t=k=>words[k]?.[lang()]||k;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const reduced=()=>media.matches||!!window.YV_APP?.prefs()?.reducedMotion||document.documentElement.classList.contains('reduce-motion');
  let mode='standard',failed=false,engine=null,loading=null,overlay=null,dialog=null,frame=0,token=0,previewing=false,active=false,lastPaint=0,frameCount=0;
  try{const saved=localStorage.getItem(KEY);if(['standard','cinematic','off'].includes(saved))mode=saved}catch{}
  const icon={standard:'<path d="M4 8h12m-3-3 3 3-3 3M20 16H8m3-3-3 3 3 3"/>',cinematic:'<ellipse cx="10" cy="14" rx="6.5" ry="7.5" transform="rotate(30 10 14)"/><ellipse cx="17" cy="5.5" rx="3.6" ry="4" transform="rotate(30 17 5.5)"/><path d="M5 13c0-2 1-3 2-4"/>',off:'<path d="M6 6h12v12H6z"/>'};
  function settingsMarkup(){return `<section class="c15-settings" aria-labelledby="c15-settings-title"><header><span class="c15-eyebrow">${esc(t('title'))}</span><h3 id="c15-settings-title">${esc(t('title'))}</h3><p>${esc(t('intro'))}</p></header><div class="c15-mode-list" role="group" aria-label="${esc(t('title'))}">${['standard','cinematic','off'].map(k=>`<button type="button" data-c15-mode="${k}" aria-pressed="${mode===k}"><svg viewBox="0 0 24 24" aria-hidden="true">${icon[k]}</svg><span><strong>${esc(t(k))}</strong><small>${esc(t(k+'Note'))}</small></span><i aria-hidden="true"></i></button>`).join('')}</div><footer><button class="btn c15-preview-button" type="button" data-c15-preview>${esc(t('preview'))}<span aria-hidden="true">↗</span></button><span class="c15-status" role="status">${esc(failed?t('fallback'):reduced()?t('reduced'):'')}</span></footer></section>`}
  function sync(){document.querySelectorAll('[data-c15-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.c15Mode===mode)));document.querySelectorAll('.c15-status').forEach(el=>{el.textContent=failed?t('fallback'):reduced()?t('reduced'):''});document.documentElement.dataset.transitionMode=mode}
  function bind(root=document){root.querySelectorAll('[data-c15-mode],[data-c15-preview]').forEach(el=>{if(el.dataset.c15Bound)return;el.dataset.c15Bound='true';el.addEventListener('click',()=>el.hasAttribute('data-c15-preview')?preview():setMode(el.dataset.c15Mode))});sync()}
  function stop(){token++;cancelAnimationFrame(frame);frame=0;active=false;if(overlay){overlay.hidden=true;overlay.style.opacity='0'}return false}
  function release(){if(!engine)return;const old=engine;engine=null;old.renderer.dispose();old.renderer.domElement.remove();old.scene.traverse(o=>{o.geometry?.dispose();for(const m of(Array.isArray(o.material)?o.material:[o.material]))m?.dispose()});old.resources.forEach(x=>x.dispose?.())}
  function setMode(value){if(!['standard','cinematic','off'].includes(value))return mode;mode=value;failed=false;try{localStorage.setItem(KEY,mode)}catch{}stop();if(mode!=='cinematic'&&!previewing)release();sync();if(mode==='cinematic'&&!reduced()&&!document.hidden)ensure().catch(()=>{});return mode}
  function fail(){failed=true;stop();release();if(dialog?.open){dialog.querySelector('.c15-preview-state').textContent=t('fallback');dialog.querySelector('.c15-preview-state').hidden=false}sync();return false}
  function makeOverlay(){if(overlay)return overlay;overlay=document.createElement('div');overlay.className='c15-transition';overlay.hidden=true;overlay.setAttribute('aria-hidden','true');overlay.innerHTML='<div class="c15-halo"></div><div class="c15-stage"></div><div class="c15-transition-label"></div>';document.body.append(overlay);return overlay}
  function seeded(seed){return()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}}
  function build(T,renderer){
    const scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.1,60),model=new T.Group(),resources=[],rnd=seeded(1011);
    camera.position.set(.2,.28,7.2);camera.lookAt(0,.25,0);scene.add(model);
    scene.add(new T.HemisphereLight(0xa9d9c7,0x102f38,1.25));
    [[0xe0ead2,2.4,-3,4,4],[0x83cbd0,3.1,3,1,-2],[0x9dc9c8,.55,.4,-2,4]].forEach(([c,p,x,y,z])=>{const light=new T.DirectionalLight(c,p);light.position.set(x,y,z);scene.add(light)});
    // A small, local studio environment supplies continuous highlights rather than point-like plastic glare.
    const room=new T.Scene();room.background=new T.Color(0x253344);
    [[[-3,3,2],[2,4,.1],0xb5cbb6,1.7],[[3,1,-1],[.1,5,3],0x78b3b7,2],[[-1,-3,1],[5,.1,4],0x243f45,.6]].forEach(([p,s,c,intensity])=>{const m=new T.Mesh(new T.BoxGeometry(...s),new T.MeshBasicMaterial({color:c}));m.material.color.multiplyScalar(intensity);m.position.set(...p);room.add(m)});
    const pmrem=new T.PMREMGenerator(renderer),environment=pmrem.fromScene(room,.08,.1,20,{size:128});scene.environment=environment.texture;resources.push(environment);pmrem.dispose();room.traverse(o=>{o.geometry?.dispose();o.material?.dispose()});
    const size=512,height=new Float32Array(size*size),normal=new Uint8Array(size*size*4),surface=new Uint8Array(size*size*4);
    for(let y=0;y<size;y++)for(let x=0;x<size;x++){const i=y*size+x;const fine=rnd()-.5;height[i]=fine*.48;const n=Math.round(216+fine*22);surface[i*4]=n-8;surface[i*4+1]=n+5;surface[i*4+2]=n;surface[i*4+3]=255}
    for(let y=0;y<size;y++)for(let x=0;x<size;x++){const i=y*size+x,dx=height[y*size+(x+1)%size]-height[y*size+(x+size-1)%size],dy=height[((y+1)%size)*size+x]-height[((y+size-1)%size)*size+x];normal[i*4]=Math.round(128-dx*88);normal[i*4+1]=Math.round(128-dy*88);normal[i*4+2]=248;normal[i*4+3]=255}
    const normalMap=new T.DataTexture(normal,size,size),map=new T.DataTexture(surface,size,size);for(const tex of[normalMap,map]){tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.repeat.set(3,3);tex.minFilter=T.LinearMipmapLinearFilter;tex.magFilter=T.LinearFilter;tex.generateMipmaps=true;tex.needsUpdate=true;resources.push(tex)}map.colorSpace=T.SRGBColorSpace;
    function radius(y){const a=Math.abs(y)<1.19?1.02*Math.sqrt(1-y*y/(1.19*1.19)):0;const z=(y-1.44)/.65,b=Math.abs(z)<1?.59*Math.sqrt(1-z*z):0;const h=Math.max(.075-Math.abs(a-b),0)/.075;return Math.max(a,b)+h*h*.075*.25}
    const profile=[];for(let i=0;i<=132;i++){const y=-1.19+i*(3.28/132);profile.push(new T.Vector2(i===0||i===132?0:radius(y),y))}
    const body=new T.LatheGeometry(profile,96),positions=body.attributes.position;
    for(let i=0;i<positions.count;i++){const x=positions.getX(i),y=positions.getY(i),z=positions.getZ(i),f=1+.0007*Math.sin(x*8+y*7)*Math.cos(z*9-y*4)+.0005*Math.sin(x*25+z*22+y*19);positions.setXYZ(i,x*f,y,z*f*.93)}body.computeVertexNormals();
    const wall=new T.MeshPhysicalMaterial({color:0x9fc6b3,map,normalMap,normalScale:new T.Vector2(.3,.3),roughness:.37,metalness:0,transparent:true,opacity:.24,depthWrite:false,clearcoat:.06,clearcoatRoughness:.45,envMapIntensity:.25,side:T.FrontSide});
    wall.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','diffuseColor.a *= 0.48 + 2.8 * pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 1.65);\n#include <opaque_fragment>')};
    const shell=new T.Mesh(body,wall);shell.renderOrder=8;model.add(shell);
    const membraneMaterial=new T.MeshPhysicalMaterial({color:0x73b4a8,transparent:true,opacity:.055,roughness:.62,metalness:0,depthWrite:false,side:T.BackSide});const membrane=new T.Mesh(body.clone(),membraneMaterial);membrane.scale.set(.985,.99,.985);membrane.renderOrder=1;model.add(membrane);
    function organelle(x,y,z,scale,color,roughness=.76){const material=new T.MeshPhysicalMaterial({color,roughness,metalness:0,map,normalMap,normalScale:new T.Vector2(.08,.08),transparent:true,opacity:.43,depthWrite:false,emissive:0x3a6758,emissiveIntensity:.08,clearcoat:0,envMapIntensity:.12});const geometry=new T.SphereGeometry(1,48,32),p=geometry.attributes.position;for(let i=0;i<p.count;i++){const xx=p.getX(i),yy=p.getY(i),zz=p.getZ(i),q=1+.034*Math.sin(xx*5+yy*4)*Math.cos(zz*5);p.setXYZ(i,xx*q,yy*q,zz*q)}geometry.computeVertexNormals();const mesh=new T.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.scale.set(...scale);mesh.renderOrder=2;model.add(mesh);return mesh}
    const vacuole=organelle(-.29,-.18,-.13,[.5,.61,.46],0x789f8c);vacuole.rotation.z=-.3;
    const nucleus=organelle(.37,.34,.15,[.27,.31,.27],0x9faf88);nucleus.rotation.z=.42;
    organelle(.06,1.44,-.05,[.24,.28,.24],0x83a28a);
    const mitochondrialMaterial=new T.MeshStandardMaterial({color:0x7fa387,roughness:.8,metalness:0});
    for(let k=0;k<10;k++){const points=[],angle=k*2.39996,rad=.65,yy=-.65+(k%4)*.38;for(let j=0;j<12;j++){const q=j/11,a=angle+(q-.5)*.72;points.push(new T.Vector3(Math.cos(a)*rad,yy+Math.sin(q*Math.PI*1.5+k)*.095,Math.sin(a)*rad*.86))}const curve=new T.CatmullRomCurve3(points),tube=new T.Mesh(new T.TubeGeometry(curve,28,.014,6,false),mitochondrialMaterial);model.add(tube);for(const point of[points[0],points.at(-1)]){const cap=new T.Mesh(new T.SphereGeometry(.014,8,6),mitochondrialMaterial);cap.position.copy(point);model.add(cap)}}
    const grainGeometry=new T.IcosahedronGeometry(1,1),grainMaterial=new T.MeshStandardMaterial({color:0x7fa794,roughness:.9,metalness:0}),grains=new T.InstancedMesh(grainGeometry,grainMaterial,240),dummy=new T.Object3D();
    for(let i=0;i<240;i++){let x,y,z;do{x=(rnd()-.5)*1.7;y=(rnd()-.5)*1.9;z=(rnd()-.5)*1.55}while((x*x+z*z)/(.81*.81)+y*y/(1.04*1.04)>.95);dummy.position.set(x,y,z);const s=.006+rnd()*.011;dummy.scale.set(s,s*.8,s);dummy.rotation.set(rnd()*6,rnd()*6,rnd()*6);dummy.updateMatrix();grains.setMatrixAt(i,dummy.matrix)}model.add(grains);
    // Shallow bud scars follow the outer wall and turn with the model.
    const scarMat=new T.MeshStandardMaterial({color:0x86b6a4,roughness:.85,metalness:0,normalMap,normalScale:new T.Vector2(.2,.2)});
    [[.45,-.66,.677,.14],[-.47,-.32,.81,.105]].forEach(([x,y,z,r])=>{const scar=new T.Mesh(new T.TorusGeometry(r,.008,8,48),scarMat);scar.position.set(x,y,z);scar.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),new T.Vector3(x,y*.7,z).normalize());model.add(scar)});
    // The neck is part of one continuous surface. A subtle annulus marks its ridge.
    const neck=new T.Mesh(new T.TorusGeometry(.46,.012,8,64),scarMat);neck.rotation.x=Math.PI/2;neck.position.y=1.04;neck.scale.y=.93;model.add(neck);
    model.position.y=-.32;model.rotation.set(.08,-.42,-.51);
    return {T,renderer,scene,camera,model,resources,base:{x:.08,y:-.42,z:-.51},distance:7.2,width:0,height:0};
  }
  async function ensure(){
    if(engine)return engine;if(loading)return loading;
    loading=(async()=>{let renderer;try{const T=await import('./vendor/three.module.js');if(mode!=='cinematic'&&!previewing)return null;renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power',stencil:false});renderer.setClearColor(0x000000,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;renderer.domElement.className='c15-canvas';renderer.domElement.setAttribute('aria-hidden','true');renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();fail()});engine=build(T,renderer);if(mode!=='cinematic'&&!previewing){release();return null}failed=false;sync();return engine}catch(error){renderer?.dispose();fail();return null}finally{loading=null}})();return loading;
  }
  function sizeTo(host){if(!engine)return;const rect=host.getBoundingClientRect(),w=Math.max(1,Math.min(920,rect.width)),h=Math.max(1,Math.min(760,rect.height));engine.camera.aspect=w/h;engine.distance=Math.max(7.2,1.45/Math.tan(engine.camera.fov*Math.PI/360)/engine.camera.aspect);engine.camera.position.z=engine.distance;if(w===engine.width&&h===engine.height)return;engine.width=w;engine.height=h;engine.renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<620?1.15:1.35));engine.renderer.setSize(w,h,false);engine.camera.updateProjectionMatrix()}
  function paint(){if(!engine||document.hidden)return;engine.renderer.render(engine.scene,engine.camera);lastPaint=performance.now();frameCount++}
  async function play(options={}){
    if(mode!=='cinematic'||failed||reduced()||document.hidden||previewing)return false;
    stop();const own=token,scene=await ensure();if(!scene||own!==token||mode!=='cinematic'||reduced()||document.hidden||previewing){if(mode!=='cinematic'&&!previewing)release();return false}
    const holder=makeOverlay(),host=holder.querySelector('.c15-stage');host.append(scene.renderer.domElement);holder.querySelector('.c15-transition-label').textContent=options.label||'';holder.hidden=false;sizeTo(host);active=true;
    const start=performance.now(),direction=options.direction<0?-1:1,duration=820;
    const tick=now=>{if(own!==token||!engine||document.hidden||reduced()){stop();return}const p=Math.min(1,(now-start)/duration),ease=1-Math.pow(1-p,3);holder.style.opacity=String(Math.min(1,p/.15,(1-p)/.22));scene.model.rotation.set(.08+Math.sin(p*Math.PI)*.09,scene.base.y+direction*(-.62+ease*1.3),scene.base.z+direction*Math.sin(p*Math.PI)*.035);scene.model.position.set(direction*(ease-.5)*.1,-.32+Math.sin(p*Math.PI)*.035,0);scene.camera.position.z=scene.distance-Math.sin(p*Math.PI)*.24;paint();if(p<1)frame=requestAnimationFrame(tick);else stop()};frame=requestAnimationFrame(tick);return true;
  }
  function closePreview(){if(!previewing)return;previewing=false;stop();if(dialog?.open)dialog.close();if(engine){makeOverlay().querySelector('.c15-stage').append(engine.renderer.domElement);if(mode!=='cinematic')release()}}
  function makeDialog(){
    if(dialog){dialog.remove();dialog=null}dialog=document.createElement('dialog');dialog.className='c15-preview';dialog.setAttribute('aria-labelledby','c15-preview-title');dialog.innerHTML=`<header><div><span class="c15-eyebrow">YEASTVAR1011</span><h2 id="c15-preview-title">${esc(t('model'))}</h2></div><button type="button" data-c15-close aria-label="${esc(t('close'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></header><div class="c15-preview-viewport" tabindex="0" role="img" aria-label="${esc(t('model')+'. '+t('drag'))}"><div class="c15-preview-state" role="status">${esc(t('loading'))}</div></div><footer><span>${esc(t('drag'))}</span><button class="btn" type="button" data-c15-reset>${esc(t('reset'))}</button></footer>`;document.body.append(dialog);
    const host=dialog.querySelector('.c15-preview-viewport');let drag=null;
    host.addEventListener('pointerdown',event=>{if(!engine||event.button!==0)return;drag={id:event.pointerId,x:event.clientX,y:event.clientY,rx:engine.model.rotation.x,ry:engine.model.rotation.y};host.setPointerCapture(event.pointerId)});
    host.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId||!engine)return;engine.model.rotation.y=drag.ry+(event.clientX-drag.x)*.009;engine.model.rotation.x=Math.max(-1.1,Math.min(1.1,drag.rx+(event.clientY-drag.y)*.006));if(!frame)frame=requestAnimationFrame(()=>{frame=0;paint()})});
    const end=()=>{drag=null};host.addEventListener('pointerup',end);host.addEventListener('pointercancel',end);
    host.addEventListener('keydown',event=>{if(!engine||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();if(event.key==='ArrowLeft'||event.key==='ArrowRight')engine.model.rotation.y+=event.key==='ArrowRight'?.12:-.12;else engine.model.rotation.x=Math.max(-1.1,Math.min(1.1,engine.model.rotation.x+(event.key==='ArrowDown'?.12:-.12)));paint()});
    dialog.querySelector('[data-c15-close]').addEventListener('click',closePreview);dialog.addEventListener('cancel',event=>{event.preventDefault();closePreview()});dialog.addEventListener('close',closePreview);dialog.querySelector('[data-c15-reset]').addEventListener('click',()=>{if(!engine)return;engine.model.rotation.set(engine.base.x,engine.base.y,engine.base.z);engine.model.position.set(0,-.32,0);paint()});return host;
  }
  async function preview(){stop();previewing=true;failed=false;const host=makeDialog();dialog.showModal();const own=token,scene=await ensure();if(!scene||!previewing||own!==token)return false;host.append(scene.renderer.domElement);dialog.querySelector('.c15-preview-state').hidden=true;scene.model.rotation.set(scene.base.x,scene.base.y,scene.base.z);scene.model.position.set(0,-.32,0);scene.camera.position.set(.2,.28,7.2);scene.camera.lookAt(0,.25,0);sizeTo(host);paint();return true}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(previewing){sizeTo(dialog.querySelector('.c15-preview-viewport'));paint()}});
  media.addEventListener('change',()=>{if(reduced())stop();sync()});
  const preferences=new MutationObserver(()=>{if(reduced())stop();sync()});preferences.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',()=>{if(previewing&&engine){sizeTo(dialog.querySelector('.c15-preview-viewport'));paint()}else if(active)stop()},{passive:true});
  window.addEventListener('storage',event=>{if(event.key===KEY&&['standard','cinematic','off'].includes(event.newValue)){mode=event.newValue;stop();if(mode!=='cinematic'&&!previewing)release();sync()}});
  window.YV_CINEMATIC={play,preview,setMode,getMode:()=>mode,settingsMarkup,bind,stop,reduced,state:()=>({mode,failed,loaded:!!engine,rendererReady:!!engine,stopped:!frame,loading:!!loading,active,previewing,frames:frameCount,lastPaint,rotation:engine?{x:engine.model.rotation.x,y:engine.model.rotation.y,z:engine.model.rotation.z}:null,drawCalls:engine?.renderer.info.render.calls||0,triangles:engine?.renderer.info.render.triangles||0})};
})();
