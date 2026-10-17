'use strict';
/* Local, procedural morphology illustration. Selection changes emphasis, never biological measurements. */
(() => {
  const STAGES = {
    scope: { theta: -.42, phi: 1.34, radius: 6.4, fov: 39, focus: [-.05,.16,0], offset: [-.10,.02], wall: .16, nucleus: .04, network: .035 },
    prep: { theta: .30, phi: 1.52, radius: 5.3, fov: 33.5, focus: [.02,.16,.06], offset: [.13,.05], wall: .28, nucleus: .04, network: .04 },
    annotation: { theta: .97, phi: 1.28, radius: 6.0, fov: 37, focus: [.15,.17,.02], offset: [-.14,.04], wall: .13, nucleus: .17, network: .05 },
    noise: { theta: 1.36, phi: 1.39, radius: 5.0, fov: 34.5, focus: [.30,.20,.12], offset: [.06,.08], wall: .12, nucleus: .24, network: .06 },
    extensions: { theta: 2.08, phi: .99, radius: 6.85, fov: 40, focus: [0,.15,0], offset: [-.10,.02], wall: .15, nucleus: .08, network: .20 },
    review: { theta: .13, phi: 1.30, radius: 5.85, fov: 36.5, focus: [0,.14,0], offset: [0,.03], wall: .20, nucleus: .13, network: .12 }
  };
  // These accents acknowledge research-plan choices. They never encode expression measurements or inferred biology.
  const SEMANTICS = {
    wall:{origin:[-.08,.02,.18],radius:1.48,color:'#66d7cb'},
    nucleus:{origin:[.40,.24,.13],radius:.84,color:'#f4c17b'},
    vacuole:{origin:[-.27,-.23,-.05],radius:.95,color:'#75c7e2'},
    network:{origin:[.07,.10,-.08],radius:1.42,color:'#a2a5eb'},
    bud:{origin:[1.00,1.03,.015],radius:.75,color:'#a9daa0'},
    whole:{origin:[.16,.12,0],radius:2.0,color:'#8eced2'}
  };
  const STAGE_SEMANTIC={scope:'whole',prep:'wall',annotation:'bud',noise:'nucleus',extensions:'network',review:'whole'};
  const PALETTES = {
    lagoon: { wall:'#64cfc5', accent:'#71e7f4', nucleus:'#f7bf7a', vacuole:'#6bc6e5', network:'#b3a3f2', inner:'#3b7193' },
    nebula: { wall:'#8c9feb', accent:'#bda8ff', nucleus:'#f8b0d7', vacuole:'#72d7e0', network:'#a19af5', inner:'#53618f' },
    amber: { wall:'#d2a767', accent:'#ffce7b', nucleus:'#f3ce92', vacuole:'#8acdc0', network:'#bad792', inner:'#7b6c56' }
  };
  let specimenAppearance = { palette:'lagoon', finish:'hologram', accent:null, layers:{wall:true,nucleus:true,vacuole:true,network:true}, autoRotate:false };
  const cloneShot = shot => ({...shot, focus:[...shot.focus], offset:[...(shot.offset||[0,0])]});

  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let engine = null, pending = null, host = null, resizeObserver = null, observer = null;
  let stage = 'scope', quality = 'balanced', wallOpacity = .42, motion = true, onStatus = null, onHotspot = null;
  let frame = 0, timer = 0, frames = 0, lastPaint = 0, lastPulse = 0, pulseUntil = 0, generation = 0;
  let error = null, drag = null, transition = null, selection = {}, mounted = false, inViewport = true;
  let reaction = null, reactionSequence = 0, specimenAction = null;
  const smooth = n => n * n * n * (n * (n * 6 - 15) + 10);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const canvasLabel = () => ({ zh: '出芽酵母形态模型。拖动或使用方向键旋转；Home 键重置视角。', en: 'Budding yeast morphology. Drag or use arrow keys to rotate. Home resets the view.', fr: 'Morphologie d’une levure bourgeonnante. Glissez ou utilisez les flèches pour tourner. Origine réinitialise la vue.', es: 'Morfología de una levadura en gemación. Arrastra o usa las flechas para girar. Inicio restablece la vista.', eu: 'Legamia gematzen, morfologia. Arrastatu edo erabili geziak biratzeko. Home teklak ikuspegia berrezartzen du.' }[window.YV_APP?.prefs?.()?.language || 'en']);
  const reduced = () => media.matches || !!window.YV_APP?.prefs?.()?.reducedMotion || document.documentElement.classList.contains('reduce-motion');
  const canMove = () => motion && !reduced();
  const visible = () => mounted && host?.isConnected && !document.hidden && inViewport;
  function report(status, detail) { try { onStatus?.({ status, ready: !!engine, stage, error, ...(detail || {}) }); } catch {} }
  function seeded(seed) { return () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; }; }

  function textureSet(T) {
    const n = 512, height = new Float32Array(n * n), normal = new Uint8Array(n * n * 4), albedo = new Uint8Array(n * n * 4), rough = new Uint8Array(n * n * 4), rnd = seeded(1011);
    // Multiscale local texture gives a finely pitted wall, rather than patterned paint or shiny glass.
    const coarse = Array.from({ length: 32 * 32 }, () => rnd());
    function noise(x, y) {
      const ix = Math.floor(x), iy = Math.floor(y), tx = x - ix, ty = y - iy;
      const s = tx * tx * (3 - 2 * tx), t = ty * ty * (3 - 2 * ty), at = (a, b) => coarse[((b % 32 + 32) % 32) * 32 + ((a % 32 + 32) % 32)];
      return (at(ix, iy) * (1 - s) + at(ix + 1, iy) * s) * (1 - t) + (at(ix, iy + 1) * (1 - s) + at(ix + 1, iy + 1) * s) * t;
    }
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, a = noise(x / 16, y / 16), b = noise(x / 4, y / 4), fine = rnd();
      const fold = Math.sin(x*.19 + a*9 + Math.sin(y*.055)*2.7) * Math.sin(y*.16 + b*5.2 + Math.sin(x*.073)*2.4);
      height[i] = a * .31 + b * .22 + fine * .12 + fold * .16;
      const shade = 220 + (a - .5) * 21 + (b - .5) * 16 + fold * 11 + (fine - .5) * 4;
      albedo.set([shade, shade + 3, shade - 3, 255], i * 4);
      const r = 116 + a * 65 + b * 32; rough.set([r, r, r, 255], i * 4);
    }
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const i = y * n + x, dx = height[y * n + (x + 1) % n] - height[y * n + (x + n - 1) % n], dy = height[((y + 1) % n) * n + x] - height[((y + n - 1) % n) * n + x];
      normal.set([128 - dx * 150, 128 - dy * 150, 249, 255], i * 4);
    }
    const make = (array, srgb = false) => { const tex = new T.DataTexture(array, n, n); tex.wrapS = tex.wrapT = T.RepeatWrapping; tex.repeat.set(2.6, 2.6); tex.magFilter = T.LinearFilter; tex.minFilter = T.LinearMipmapLinearFilter; tex.generateMipmaps = true; tex.colorSpace = srgb ? T.SRGBColorSpace : T.NoColorSpace; tex.needsUpdate = true; return tex; };
    return { map: make(albedo, true), normalMap: make(normal), roughnessMap: make(rough) };
  }

  function createLiquid(T, scene, resources) {
    const time={value:0},aspect={value:1},view={value:new T.Vector3()},resolution={value:600},focus={value:7};
    const target=new T.WebGLRenderTarget(384,256,{depthBuffer:false,stencilBuffer:false,minFilter:T.LinearFilter,magFilter:T.LinearFilter});resources.add(target);
    const backgroundScene=new T.Scene(),backgroundCamera=new T.OrthographicCamera(-1,1,1,-1,0,1),quadGeometry=new T.PlaneGeometry(2,2);
    const vertex=`varying vec2 liquidUv;void main(){liquidUv=uv;gl_Position=vec4(position.xy,0.999,1.0);}`;
    const backgroundMaterial=new T.ShaderMaterial({depthTest:false,depthWrite:false,toneMapped:false,uniforms:{liquidTime:time,liquidAspect:aspect,liquidView:view},vertexShader:vertex,fragmentShader:`
      varying vec2 liquidUv;uniform float liquidTime;uniform float liquidAspect;uniform vec3 liquidView;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float field(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      float caustic(vec2 p,float t){vec2 q=p+vec2(sin(p.y*1.7+t*.13),cos(p.x*1.4-t*.11))*.28;float a=sin(q.x*3.1+sin(q.y*2.3+t*.17));float b=cos(q.y*2.7+sin(q.x*2.5-t*.14));return pow(max(0.0,1.0-abs(a+b)*.69),7.0);}
      void main(){
        vec2 uv=liquidUv,p=(uv-.5)*vec2(liquidAspect,1.0);float t=liquidTime;
        vec2 flow=p*3.8+vec2(liquidView.x*.065,liquidView.y*.035)+vec2(t*.018,-t*.012);
        float volume=field(flow*.7+vec2(sin(t*.06)*.15,0.0));
        float light=caustic(flow,t)*.65+caustic(flow*1.71+3.5,-t*.7)*.28;
        float shaft=exp(-pow((p.x+p.y*.55+.30+sin(p.y*2.0+t*.08)*.04)/.12,2.0))*.12;
        shaft+=exp(-pow((p.x+p.y*.46-.40+sin(p.y*2.6-t*.06)*.035)/.21,2.0))*.055;
        float depths=exp(-length(p-vec2(.14,.02))*1.9);
        vec3 color=vec3(.013,.041,.069)+vec3(.007,.053,.062)*volume*depths;
        color+=vec3(.035,.19,.23)*light*depths+vec3(.034,.10,.13)*shaft;
        color+=vec3(.035,.019,.065)*exp(-length(p-vec2(.55,-.30))*3.0);
        float edge=smoothstep(0.0,.12,uv.x)*smoothstep(0.0,.12,1.0-uv.x)*smoothstep(0.0,.14,uv.y)*smoothstep(0.0,.14,1.0-uv.y);
        gl_FragColor=vec4(color*edge,edge);
      }`});
    const generator=new T.Mesh(quadGeometry,backgroundMaterial);generator.frustumCulled=false;backgroundScene.add(generator);resources.add(quadGeometry);resources.add(backgroundMaterial);
    const compositeMaterial=new T.ShaderMaterial({depthTest:false,depthWrite:false,toneMapped:false,uniforms:{liquidBackdrop:{value:target.texture}},vertexShader:vertex,fragmentShader:'varying vec2 liquidUv;uniform sampler2D liquidBackdrop;void main(){gl_FragColor=texture2D(liquidBackdrop,liquidUv);}'});
    const composite=new T.Mesh(new T.PlaneGeometry(2,2),compositeMaterial);composite.frustumCulled=false;composite.renderOrder=-100;scene.add(composite);
    const count=220,positions=[],radii=[],phases=[],tints=[],random=seeded(1801);
    for(let i=0;i<count;i++){let x,y,z;do{x=(random()-.5)*15;y=(random()-.5)*10;z=(random()-.5)*13;}while(x*x+y*y+z*z<6.5);if(i<8){x=(i%2?1:-1)*(2.2+random()*.9);y=(random()-.5)*4.6;z=1.3+random()*2.5;}positions.push(x,y,z);radii.push(i<8?.14+random()*.10:i%13===0?.06+random()*.06:.006+random()*.013);phases.push(random()*Math.PI*2);const c=i%17===0?[.67,.54,.32]:[.21+random()*.12,.58+random()*.18,.68+random()*.18];tints.push(...c);}
    const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('liquidRadius',new T.Float32BufferAttribute(radii,1));geometry.setAttribute('liquidPhase',new T.Float32BufferAttribute(phases,1));geometry.setAttribute('liquidTint',new T.Float32BufferAttribute(tints,3));
    const particlesMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,depthTest:true,toneMapped:false,uniforms:{liquidTime:time,liquidResolution:resolution,liquidFocus:focus},vertexShader:`
      attribute float liquidRadius;attribute float liquidPhase;attribute vec3 liquidTint;
      uniform float liquidTime;uniform float liquidResolution;uniform float liquidFocus;varying vec3 tint;varying float softness;varying float fade;varying float droplet;
      void main(){vec3 p=position;p.x+=sin(liquidTime*.17+liquidPhase+p.z*.3)*.13;p.y+=sin(liquidTime*.11+liquidPhase)*.18;p.z+=cos(liquidTime*.13+liquidPhase)*.09;
      vec4 v=modelViewMatrix*vec4(p,1.0);float depth=max(.3,-v.z);softness=clamp(abs(depth-liquidFocus)/6.0,.08,1.0);droplet=smoothstep(.045,.12,liquidRadius);tint=liquidTint;
      gl_PointSize=clamp(liquidRadius*liquidResolution/depth+softness*mix(3.0,18.0,droplet),1.5,58.0);fade=smoothstep(.4,2.0,depth)*(1.0-smoothstep(12.0,20.0,depth));gl_Position=projectionMatrix*v;}`,
      fragmentShader:`varying vec3 tint;varying float softness;varying float fade;varying float droplet;void main(){float r=length(gl_PointCoord-.5)*2.0;if(r>1.0)discard;float core=exp(-r*r*mix(12.0,3.8,softness));float ring=exp(-pow((r-.65)/(.09+softness*.13),2.0))*.20*droplet;float a=(core*mix(.105,.16,droplet)+ring)*fade*(1.0-softness*.45);gl_FragColor=vec4(tint,a);}`});
    const particles=new T.Points(geometry,particlesMaterial);particles.renderOrder=35;particles.frustumCulled=false;scene.add(particles);
    return{type:'liquid',time:0,uniformTime:time,aspect,view,resolution,focus,target,backgroundScene,backgroundCamera,lastBackground:-1,lastView:new T.Vector3(999,999,999),particles:count,caustics:true,lastTick:0};
  }

  function createObservationStage(T, scene) {
    // A light, open stage frames the specimen without covering its silhouette.
    const rig=new T.Group();rig.position.set(.04,-1.48,-.12);scene.add(rig);
    const ringMaterial=new T.MeshBasicMaterial({color:'#71e7f4',transparent:true,opacity:.16,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending,toneMapped:false});
    const ring=new T.Mesh(new T.RingGeometry(1.54,1.551,112),ringMaterial);ring.rotation.x=-Math.PI/2;rig.add(ring);
    const arcMaterial=ringMaterial.clone();arcMaterial.opacity=.27;
    const arc=new T.Mesh(new T.RingGeometry(1.80,1.824,112,1,Math.PI*.10,Math.PI*.63),arcMaterial);arc.rotation.x=-Math.PI/2;arc.position.y=.012;rig.add(arc);
    const arc2=new T.Mesh(new T.RingGeometry(1.80,1.811,112,1,Math.PI*1.15,Math.PI*.45),arcMaterial);arc2.rotation.x=-Math.PI/2;arc2.position.y=.012;rig.add(arc2);
    const marks=[];for(let i=0;i<56;i++){const a=i/56*Math.PI*2,r=i%7===0?1.65:1.69;marks.push(Math.cos(a)*r,.006,Math.sin(a)*r,Math.cos(a)*1.735,.006,Math.sin(a)*1.735);}
    const tickGeometry=new T.BufferGeometry();tickGeometry.setAttribute('position',new T.Float32BufferAttribute(marks,3));
    const tickMaterial=new T.LineBasicMaterial({color:'#71e7f4',transparent:true,opacity:.19,depthWrite:false,blending:T.AdditiveBlending,toneMapped:false});rig.add(new T.LineSegments(tickGeometry,tickMaterial));
    const glowUniforms={color:{value:new T.Color('#71e7f4')},energy:{value:.13}};
    const glowMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending,toneMapped:false,uniforms:glowUniforms,vertexShader:'varying vec2 stageUv;void main(){stageUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec2 stageUv;uniform vec3 color;uniform float energy;void main(){float r=length(stageUv-.5)*2.0;float ring=exp(-pow((r-.72)/.16,2.0));float core=exp(-r*r*7.0);gl_FragColor=vec4(color,(ring*.34+core*.11)*energy*(1.0-smoothstep(.91,1.0,r)));}'});
    const glow=new T.Mesh(new T.CircleGeometry(1.98,96),glowMaterial);glow.rotation.x=-Math.PI/2;glow.position.y=-.012;rig.add(glow);
    return {rig,arc,arc2,ringMaterial,arcMaterial,tickMaterial,glowUniforms,projection:new T.Vector3()};
  }

  async function build(T, renderer) {
    const buildStart=performance.now();
    const resources = new Set(), scene = new T.Scene(), camera = new T.PerspectiveCamera(35, 1, .1, 45);
    const environment=createLiquid(T,scene,resources),observationStage=createObservationStage(T,scene);
    const cell = new T.Group(), tissue = new T.Group(); cell.add(tissue); tissue.position.set(-.14,-.22,0); scene.add(cell);
    const textures = textureSet(T); Object.values(textures).forEach(t => resources.add(t));
    textures.map.repeat.set(4,4); textures.normalMap.repeat.set(4,4); textures.roughnessMap.repeat.set(4,4);
    scene.add(new T.HemisphereLight(0xb9d8d0, 0x081b24, .28));
    [[0xe0f3ff,4.2,-3.2,4.4,4.5],[0xb4e8e4,4.8,4,2,-3],[0xf0d4a4,.48,1,-2,5],[0x809eac,.65,-4,-1,-3]].forEach(([color,intensity,x,y,z])=>{const light=new T.DirectionalLight(color,intensity);light.position.set(x,y,z);scene.add(light)});
    const room=new T.Scene();room.background=new T.Color(0x253235);
    [[[-4,3,2],[1,5,3],0xe9f8ee,4.8],[[3,1,-3],[1,5,3],0xbfece5,3.2],[[0,5,0],[5,.2,4],0xf1e9d5,.7],[[0,-3,3],[4,.2,3],0x30474e,.25]].forEach(([p,s,color,intensity])=>{const mesh=new T.Mesh(new T.BoxGeometry(...s),new T.MeshBasicMaterial({color}));mesh.material.color.multiplyScalar(intensity);mesh.position.set(...p);room.add(mesh)});
    const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromScene(room,.12,.1,20,{size:128});scene.environment=env.texture;resources.add(env);pmrem.dispose();room.traverse(o=>{o.geometry?.dispose();o.material?.dispose()});

    // Shape reference: SGD Yeast Images and Howell & Lew, Genetics 191, 347–387 (2012).
    // This specimen is an authored visual model, not a reconstruction of project observations.
    // One implicit surface joins a compact ellipsoid to an oblique, smaller round bud.
    const scars=[[-.60,.11,.79,.135,.014],[.28,-.65,.70,.10,.011],[-.16,.64,.75,.084,.009]];
    const ellipsoid=(x,y,z,a,b,c)=>{const q=Math.hypot(x/a,y/b,z/c),q2=Math.hypot(x/(a*a),y/(b*b),z/(c*c));return q2>1e-8?q*(q-1)/q2:-Math.min(a,b,c)};
    function hash3(x,y,z){let n=(Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(z,1274126177))|0;n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;}
    function noise3(x,y,z){const a=Math.floor(x),b=Math.floor(y),c=Math.floor(z),u=x-a,v=y-b,w=z-c,X=u*u*(3-2*u),Y=v*v*(3-2*v),Z=w*w*(3-2*w),lerp=(a,b,t)=>a+(b-a)*t;return lerp(lerp(lerp(hash3(a,b,c),hash3(a+1,b,c),X),lerp(hash3(a,b+1,c),hash3(a+1,b+1,c),X),Y),lerp(lerp(hash3(a,b,c+1),hash3(a+1,b,c+1),X),lerp(hash3(a,b+1,c+1),hash3(a+1,b+1,c+1),X),Y),Z)-.5;}
    function field(x,y,z,detail=true){
      const m=ellipsoid(x,y,z,1.03,1.14,.92),b=ellipsoid(x-1.00,y-1.03,z-.015,.48,.51,.47),k=.16,h=clamp(.5+.5*(b-m)/k,0,1);
      let d=b+(m-b)*h-k*h*(1-h);
      if(detail&&m<.15&&m<b+.10){
        const len=Math.hypot(x/1.03,y/1.14,z/.92)||1,ux=x/1.03/len,uy=y/1.14/len,uz=z/.92/len;
        for(const [sx,sy,sz,r,amp] of scars){const dist=Math.hypot(ux-sx,uy-sy,uz-sz);if(dist<r+.13){const rim=Math.exp(-Math.pow((dist-r)/.026,2)),plug=Math.exp(-Math.pow(dist/(r*.78),4));d-=amp*rim-.0028*plug;}}
      }
      if(detail){d-=.008*Math.sin(x*3.2+y*2.1)*Math.cos(z*3.7-y*1.4);if(Math.abs(d)<.17)d-=.0035*noise3(x*23,y*23,z*23)+.005*noise3(x*10,y*10,z*10);}
      return d;
    }
    const nx=112,ny=120,nz=88,min=[-1.15,-1.27,-1.05],max=[1.58,1.65,1.04],sx=(max[0]-min[0])/nx,sy=(max[1]-min[1])/ny,sz=(max[2]-min[2])/nz,stride=nx+1,layer=stride*(ny+1),values=new Float32Array(layer*(nz+1));
    for(let z=0;z<=nz;z++){for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++)values[z*layer+y*stride+x]=field(min[0]+x*sx,min[1]+y*sy,min[2]+z*sz);if(z%8===0)await new Promise(resolve=>setTimeout(resolve,0));}
    const vertices=[],normals=[],uvs=[],colours=[],corners=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]],tets=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]],e=.003;
    function normal(p){const [x,y,z]=p,a=field(x+e,y,z)-field(x-e,y,z),b=field(x,y+e,z)-field(x,y-e,z),c=field(x,y,z+e)-field(x,y,z-e),len=Math.hypot(a,b,c)||1;return[a/len,b/len,c/len]}
    function triangle(a,b,c){const n=normal(a),u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[c[0]-a[0],c[1]-a[1],c[2]-a[2]],cross=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];if(cross[0]*n[0]+cross[1]*n[1]+cross[2]*n[2]<0)[b,c]=[c,b];for(const p of[a,b,c]){vertices.push(...p);normals.push(...normal(p));uvs.push(Math.atan2(p[2],p[0])/(Math.PI*2)+.5,p[1]/2.8+.5);const f=.96+.025*Math.sin(p[0]*3+p[1]*2)*Math.cos(p[2]*5);colours.push(f,f*.995,f*.965)}}
    for(let z=0;z<nz;z++){for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){
      const base=z*layer+y*stride+x,ids=[base,base+1,base+stride+1,base+stride,base+layer,base+layer+1,base+layer+stride+1,base+layer+stride],f=ids.map(i=>values[i]);if(f.every(v=>v>=0)||f.every(v=>v<0))continue;
      const p=corners.map(([a,b,c])=>[min[0]+(x+a)*sx,min[1]+(y+b)*sy,min[2]+(z+c)*sz]),lerp=(a,b)=>{const t=f[a]/(f[a]-f[b]);return p[a].map((v,i)=>v+(p[b][i]-v)*t)};
      for(const tet of tets){const inside=tet.filter(i=>f[i]<0),outside=tet.filter(i=>f[i]>=0);if(!inside.length||!outside.length)continue;if(inside.length===1){const a=inside[0];triangle(lerp(a,outside[0]),lerp(a,outside[1]),lerp(a,outside[2]))}else if(inside.length===3){const a=outside[0];triangle(lerp(a,inside[0]),lerp(a,inside[1]),lerp(a,inside[2]))}else{const[a,b]=inside,[c,d]=outside,p1=lerp(a,c),p2=lerp(a,d),p3=lerp(b,c),p4=lerp(b,d);triangle(p1,p2,p3);triangle(p2,p4,p3)}}
    }
    if(z%8===0)await new Promise(resolve=>setTimeout(resolve,0));}
    const shellGeometry=new T.BufferGeometry();shellGeometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));shellGeometry.setAttribute('normal',new T.Float32BufferAttribute(normals,3));shellGeometry.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));shellGeometry.setAttribute('color',new T.Float32BufferAttribute(colours,3));shellGeometry.computeBoundingSphere();
    const attention={origin:{value:new T.Vector3()},color:{value:new T.Color('#8eced2')},radius:{value:2},strength:{value:0},scan:{value:-1}},reveal={value:0},wallMaterial=new T.MeshPhysicalMaterial({color:0x62b5a5,vertexColors:true,roughness:.115,metalness:0,clearcoat:1,clearcoatRoughness:.052,iridescence:.32,iridescenceIOR:1.27,iridescenceThicknessRange:[240,410],transmission:.35,thickness:.065,ior:1.38,transparent:true,opacity:wallOpacity,depthWrite:false,side:T.FrontSide,envMapIntensity:1.8,emissive:0x356967,emissiveIntensity:.015});
    wallMaterial.onBeforeCompile=shader=>{shader.uniforms.cellReveal=reveal;shader.uniforms.choiceOrigin=attention.origin;shader.uniforms.choiceColor=attention.color;shader.uniforms.choiceRadius=attention.radius;shader.uniforms.choiceStrength=attention.strength;shader.uniforms.choiceScan=attention.scan;shader.uniforms.specimenGrain={value:textures.map};shader.vertexShader='varying vec3 specimenPosition;varying vec3 specimenOpticNormal;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nspecimenPosition = position;float om=length(position/vec3(1.03,1.14,.92))-1.0;float ob=(length((position-vec3(1.0,1.03,.015))/vec3(.48,.51,.47))-1.0)*.49;float oh=clamp(.5+.5*(ob-om)/.16,0.0,1.0);vec3 on=normalize(mix(normalize((position-vec3(1.0,1.03,.015))/vec3(.2304,.2601,.2209)),normalize(position/vec3(1.0609,1.2996,.8464)),oh));specimenOpticNormal=normalize(normalMatrix*on);');shader.fragmentShader='varying vec3 specimenPosition;varying vec3 specimenOpticNormal;\nuniform float cellReveal;\nuniform sampler2D specimenGrain;\nuniform vec3 choiceOrigin;uniform vec3 choiceColor;uniform float choiceRadius;uniform float choiceStrength;uniform float choiceScan;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
float specimenNoise=(texture2D(specimenGrain,specimenPosition.xy*2.7).r+texture2D(specimenGrain,specimenPosition.yz*3.1).r+texture2D(specimenGrain,specimenPosition.zx*3.3).r)/3.0;
diffuseColor.rgb*=0.97+specimenNoise*0.04;`);shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
roughnessFactor=clamp(0.15+(specimenNoise-0.58)*0.65,0.09,0.22);`);shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
vec3 specimenSmoothNormal=normal;
vec3 specimenDX=dFdx(-vViewPosition),specimenDY=dFdy(-vViewPosition);
vec3 specimenR1=cross(specimenDY,normal),specimenR2=cross(normal,specimenDX);
float specimenDet=dot(specimenDX,specimenR1)*faceDirection;
float specimenH=specimenNoise*0.0022;
normal=normalize(abs(specimenDet)*normal-sign(specimenDet)*(dFdx(specimenH)*specimenR1+dFdy(specimenH)*specimenR2));`);shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`vec3 q = specimenPosition;
      float windowDistance = length(vec2((q.y-0.04)/0.64,(-q.x*0.707+q.z*0.707)/0.57));
      float aperture = (1.0-smoothstep(0.74,1.02,windowDistance))*smoothstep(0.30,0.66,(q.x+q.z)*0.707);
      float membraneRim=pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),1.5);
      float neckSoftness=exp(-pow((q.x-.63)/.36,2.0)-pow((q.y-.69)/.38,2.0));
      diffuseColor.a *= (0.22+1.12*membraneRim)*(1.0-0.70*neckSoftness);
      float edgeScatter=pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),3.0);
      vec3 reflection=reflect(-normalize(vViewPosition),normalize(specimenOpticNormal));
      vec3 key=normalize(vec3(-.58,.42,.70)),horizontal=normalize(cross(key,vec3(.0,1.0,.0))),vertical=cross(horizontal,key);
      vec2 lightUV=vec2(dot(reflection,horizontal)/.19,dot(reflection,vertical)/.48);
      float wetReflection=exp(-pow(abs(lightUV.x),4.0)-pow(abs(lightUV.y),4.0))*smoothstep(.60,.90,dot(reflection,key));
      vec3 rimKey=normalize(vec3(.79,-.12,.60));float secondary=pow(max(0.0,dot(reflection,rimKey)),85.0)*.48;
      wetReflection=max(wetReflection,secondary);
      outgoingLight+=vec3(5.5,7.5,6.0)*wetReflection+mix(vec3(.045,.24,.28),vec3(.14,.09,.20),.5+.5*sin(specimenPosition.y*2.2))*edgeScatter*(1.0-.8*neckSoftness);
      float choiceDistance=length(specimenPosition-choiceOrigin)/max(.1,choiceRadius);
      float choiceRegion=exp(-choiceDistance*choiceDistance*1.8);
      float choiceWave=choiceScan>=0.0?exp(-pow((choiceDistance-choiceScan*1.6)/.16,2.0)):0.0;
      outgoingLight+=choiceColor*(choiceRegion*choiceStrength*.75+choiceWave*choiceStrength*1.9);
      #include <opaque_fragment>
      gl_FragColor.a=max(gl_FragColor.a,wetReflection*.90);
      gl_FragColor.a=max(gl_FragColor.a,choiceRegion*choiceStrength*.28+choiceWave*choiceStrength*.24);
`)};
    const optics={accent:{value:new T.Color('#71e7f4')},hologram:{value:1},time:{value:0},energy:{value:0}};
    const biologicalWallShader=wallMaterial.onBeforeCompile;
    wallMaterial.onBeforeCompile=shader=>{
      biologicalWallShader(shader);
      shader.uniforms.specimenAccent=optics.accent;shader.uniforms.specimenHologram=optics.hologram;shader.uniforms.specimenTime=optics.time;shader.uniforms.specimenEnergy=optics.energy;
      shader.fragmentShader='uniform vec3 specimenAccent;uniform float specimenHologram;uniform float specimenTime;uniform float specimenEnergy;\n'+shader.fragmentShader;
      shader.fragmentShader=shader.fragmentShader.replace('roughnessFactor=clamp(0.15+(specimenNoise-0.58)*0.65,0.09,0.22);','roughnessFactor=clamp(mix(0.25,0.16,specimenHologram)+(specimenNoise-0.58)*0.34,0.09,0.32);');
      shader.fragmentShader=shader.fragmentShader.replace('vec3(5.5,7.5,6.0)*wetReflection','mix(vec3(5.5,7.5,6.0),specimenAccent*vec3(5.9,7.0,6.3),specimenHologram*0.58)*wetReflection');
      shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`float specimenRim=pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),2.35);
        float specimenBand=pow(0.5+0.5*sin(specimenPosition.y*21.0-specimenTime*1.6),8.0);
        outgoingLight=mix(outgoingLight,outgoingLight*mix(vec3(1.0),specimenAccent*1.30,0.32),specimenHologram);
        outgoingLight+=specimenAccent*(specimenRim*(0.20+0.88*specimenHologram)+specimenBand*0.030*specimenHologram+0.026*specimenHologram+specimenRim*specimenEnergy*0.72);
        outgoingLight+=vec3(0.17,0.19,0.20)*specimenRim*(1.0-specimenHologram);
        #include <opaque_fragment>
        gl_FragColor.a=max(gl_FragColor.a,specimenRim*(0.12+0.20*specimenHologram));`);
    };
    const wall=new T.Mesh(shellGeometry,wallMaterial);wall.name='cell-wall';wall.renderOrder=30;tissue.add(wall);
    // Fine irregular fibrils lie on the actual implicit wall. They are merged into one draw call.
    const fibreVertices=[],fibreNormals=[],fibreIndices=[],frnd=seeded(1847),samples=vertices.length/3;
    for(let f=0;f<180;f++){
      const start=Math.floor(frnd()*samples)*3,p=new T.Vector3(vertices[start],vertices[start+1],vertices[start+2]),n=new T.Vector3(...normal([p.x,p.y,p.z])),random=new T.Vector3(frnd()-.5,frnd()-.5,frnd()-.5),tangent=random.addScaledVector(n,-random.dot(n)).normalize(),cross=new T.Vector3().crossVectors(n,tangent).normalize(),points=[];
      const length=.035+frnd()*.065;
      for(let j=0;j<12;j++){const u=j/11,q=p.clone().addScaledVector(tangent,(u-.5)*length).addScaledVector(cross,Math.sin(u*13.8+f)*.004);for(let k=0;k<2;k++){const d=field(q.x,q.y,q.z),nn=new T.Vector3(...normal([q.x,q.y,q.z]));q.addScaledVector(nn,-d+.001)}points.push(q)}
      const g=new T.TubeGeometry(new T.CatmullRomCurve3(points),22,.0014+frnd()*.0011,4,false),a=g.attributes.position,b=g.attributes.normal,offset=fibreVertices.length/3;fibreVertices.push(...a.array);fibreNormals.push(...b.array);for(const i of g.index.array)fibreIndices.push(i+offset);g.dispose();if(f%24===0)await new Promise(resolve=>setTimeout(resolve,0));
    }
    const fibresGeometry=new T.BufferGeometry();fibresGeometry.setAttribute('position',new T.Float32BufferAttribute(fibreVertices,3));fibresGeometry.setAttribute('normal',new T.Float32BufferAttribute(fibreNormals,3));fibresGeometry.setIndex(fibreIndices);
    const fibres=new T.Mesh(fibresGeometry,new T.MeshPhysicalMaterial({color:0x87bab3,roughness:.22,metalness:0,clearcoat:.5,clearcoatRoughness:.12,transparent:true,opacity:.11,depthWrite:false,envMapIntensity:.5}));fibres.renderOrder=31;tissue.add(fibres);
    // A second, warm inner surface is locally visible through the observation aperture.
    const innerMaterial=new T.MeshPhysicalMaterial({color:0x456582,roughness:.27,clearcoat:.34,side:T.BackSide,transparent:true,opacity:.035,depthWrite:false,envMapIntensity:.10});
    const innerWall=new T.Mesh(shellGeometry,innerMaterial);innerWall.scale.set(.994,.994,.994);innerWall.renderOrder=1;tissue.add(innerWall);
    const membraneMaterial=new T.MeshPhysicalMaterial({color:0x6eabd2,roughness:.16,clearcoat:.75,clearcoatRoughness:.13,transparent:true,opacity:.021,depthWrite:false,side:T.FrontSide,envMapIntensity:.50});membraneMaterial.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','diffuseColor.a *= 0.12+3.8*pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),2.1);\n#include <opaque_fragment>')};const membrane=new T.Mesh(shellGeometry,membraneMaterial);membrane.scale.set(.992,.992,.992);membrane.renderOrder=25;tissue.add(membrane);
    const densityCamera={value:new T.Vector3()},densitySamples={value:quality==='high'?22:16},densityLayers={value:new T.Vector2(1,1)},densityTint={value:new T.Color('#64cfc5')},nucleusTint={value:new T.Color('#f7bf7a')},vacuoleTint={value:new T.Color('#6bc6e5')};
    const densityMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,depthTest:false,side:T.BackSide,uniforms:{localCamera:densityCamera,volumeSamples:densitySamples,densityLayers,densityTint,nucleusTint,vacuoleTint},vertexShader:'varying vec3 volumePosition;void main(){volumePosition=position+vec3(.22,.19,0.0);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:`
      varying vec3 volumePosition;uniform vec3 localCamera;uniform int volumeSamples;uniform vec2 densityLayers;uniform vec3 densityTint;uniform vec3 nucleusTint;uniform vec3 vacuoleTint;
      float n3(vec3 p){return sin(p.x*1.31+sin(p.z*.83))*cos(p.y*1.13+sin(p.x*.71))*sin(p.z*1.17+cos(p.y*.61));}
      void main(){vec3 dir=normalize(volumePosition-localCamera);float optical=0.0;vec3 energy=vec3(0.0);
        float sampleWidth=2.97/float(volumeSamples),sampleWeight=22.0/float(volumeSamples);
        for(int i=0;i<22;i++){if(i>=volumeSamples)break;vec3 p=volumePosition-dir*(float(i)+.5)*sampleWidth;float m=length(p/vec3(1.025,1.135,.915)),b=length((p-vec3(1.0,1.03,.015))/vec3(.475,.505,.465));float inside=1.0-smoothstep(.89,1.0,min(m,b));
          float clearV=mix(1.0,smoothstep(.87,1.06,length((p-vec3(-.27,-.23,-.05))/vec3(.56,.65,.50))),densityLayers.y);float clearN=mix(1.0,smoothstep(.87,1.06,length((p-vec3(.40,.24,.13))/vec3(.29,.33,.29))),densityLayers.x);
          float folds=.48+.24*n3(p*7.1)+.12*n3(p*16.4);float d=inside*clearV*clearN*max(.0,folds-.18);float cytoplasm=d*.049;
          float nucleus=inside*(1.0-clearN)*(.024+.016*n3(p*12.0));float water=inside*(1.0-clearV)*(.010+.008*n3(p*7.0));
          float soft=(cytoplasm+nucleus+water)*sampleWeight;optical+=soft;energy+=(cytoplasm*mix(vec3(.035,.17,.15),densityTint*.48,.5+.5*n3(p*3.5))+nucleus*nucleusTint*.74+water*vacuoleTint*.62)*sampleWeight;
        }
        float alpha=clamp(optical,0.0,.38);vec3 color=energy/max(.001,optical);gl_FragColor=vec4(color,alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});
    const density=new T.Mesh(new T.BoxGeometry(2.8,3.0,2.14),densityMaterial);density.position.set(.22,.19,0);density.renderOrder=2;density.name='cytoplasmic-medium';tissue.add(density);
    function organelle(name,p,scale,color,roughness=.45){const g=new T.SphereGeometry(1,64,48),a=g.attributes.position;for(let i=0;i<a.count;i++){const x=a.getX(i),y=a.getY(i),z=a.getZ(i),w=1+.044*Math.sin(x*4.3+y*2.7+1)*Math.cos(z*4.8-y*1.8)+.009*Math.sin(x*9+y*6)*Math.cos(z*8-y*4);a.setXYZ(i,x*w,y*w,z*w)}g.computeVertexNormals();const m=new T.MeshPhysicalMaterial({color,...textures,normalScale:new T.Vector2(.27,.27),roughness,metalness:0,clearcoat:.6,clearcoatRoughness:.11,emissive:color,emissiveIntensity:.025,envMapIntensity:.85}),mesh=new T.Mesh(g,m);mesh.name=name;mesh.position.set(...p);mesh.scale.set(...scale);mesh.renderOrder=5;tissue.add(mesh);return mesh}
    const vacuole=organelle('vacuole',[-.27,-.23,-.05],[.48,.58,.44],0x747e61,.33);vacuole.material.transparent=true;vacuole.material.opacity=.25;vacuole.material.depthWrite=false;vacuole.material.color.setHex(0x79b9ac);vacuole.material.envMapIntensity=1.25;vacuole.material.roughness=.09;vacuole.material.clearcoat=.85;vacuole.material.clearcoatRoughness=.12;vacuole.scale.set(.54,.62,.48);vacuole.material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','diffuseColor.a *= 0.55+1.3*pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),1.3);\n#include <opaque_fragment>')};
    const nucleus=organelle('nucleus',[.40,.24,.13],[.25,.29,.25],0xb4a47d,.47),nucleolus=organelle('nucleolus',[.51,.23,.18],[.075,.09,.072],0x8b7753,.60),daughterVacuole=organelle('bud-vacuole',[1.00,1.02,.01],[.19,.22,.18],0x7c886a,.38);
    nucleolus.material.color.setHex(0xc4a05e);nucleolus.material.emissive.setHex(0x865423);nucleus.material.transparent=true;nucleus.material.opacity=.22;nucleus.material.depthWrite=false;nucleus.material.color.setHex(0xeeb071);nucleus.material.emissive.setHex(0x9b481b);nucleus.material.clearcoat=.6;nucleus.material.roughness=.23;
    const envelope=new T.Mesh(nucleus.geometry,nucleus.material.clone());envelope.name='nuclear-envelope';envelope.position.copy(nucleus.position);envelope.scale.copy(nucleus.scale).multiplyScalar(1.06);envelope.material.color.setHex(0xe5b17e);envelope.material.opacity=.075;envelope.material.roughness=.22;envelope.renderOrder=9;tissue.add(envelope);
    daughterVacuole.material.transparent=true;daughterVacuole.material.opacity=.28;daughterVacuole.material.depthWrite=false;daughterVacuole.material.color.setHex(0x6f9db7);daughterVacuole.material.clearcoat=.7;
    const mitochondrial=new T.MeshPhysicalMaterial({color:0x527e77,roughness:.42,metalness:0,clearcoat:.6,transparent:true,opacity:.47,depthWrite:false,normalMap:textures.normalMap,normalScale:new T.Vector2(.12,.12),emissive:0x6b7d50,emissiveIntensity:.025,envMapIntensity:.2}),reticular=new T.MeshPhysicalMaterial({color:0x91aba1,roughness:.32,transparent:true,opacity:.23,depthWrite:false,side:T.DoubleSide,metalness:0,normalMap:textures.normalMap,normalScale:new T.Vector2(.11,.11),emissive:0x748761,emissiveIntensity:.025,envMapIntensity:.2}),targets=[wall,nucleus,vacuole,daughterVacuole];
    function tube(points,r,branch=false){
      const path=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),g=new T.TubeGeometry(path,72,r,12,false),a=g.attributes.position;
      for(let i=0;i<=72;i++){const t=i/72,c=path.getPointAt(t),cap=t<.06&&!branch?Math.sqrt(Math.max(0,1-Math.pow(1-t/.06,2))):t>.94?Math.sqrt(Math.max(0,1-Math.pow((t-.94)/.06,2))):1,w=cap*(.92+.07*Math.sin(t*18+.6)+.035*Math.sin(t*45));for(let j=0;j<=12;j++){const k=i*13+j;a.setXYZ(k,c.x+(a.getX(k)-c.x)*w,c.y+(a.getY(k)-c.y)*w,c.z+(a.getZ(k)-c.z)*w)}}
      g.computeVertexNormals();const mesh=new T.Mesh(g,mitochondrial);mesh.name='mitochondrial-network';mesh.renderOrder=6;tissue.add(mesh);targets.push(mesh);
    }
    // Curved cortical networks have short anastomosing branches, rather than isolated straight rods.
    tube([[.59,-.66,.01],[.70,-.53,.12],[.72,-.36,.23],[.67,-.18,.32],[.56,-.08,.38]],.027);
    tube([[.70,-.43,.18],[.58,-.40,.33],[.49,-.29,.44],[.53,-.15,.44]],.020,true);
    tube([[-.70,-.63,.14],[-.77,-.43,.26],[-.72,-.22,.40],[-.61,-.10,.47],[-.48,-.09,.47]],.029);
    tube([[-.73,-.30,.36],[-.61,-.39,.44],[-.49,-.32,.52],[-.40,-.23,.54]],.019,true);
    tube([[-.61,.36,-.40],[-.48,.56,-.44],[-.29,.65,-.42],[-.10,.65,-.29],[.03,.57,-.23]],.027);
    tube([[-.35,.63,-.42],[-.30,.49,-.54],[-.16,.39,-.59]],.019,true);
    tube([[.56,-.26,-.48],[.65,-.08,-.47],[.59,.13,-.48],[.45,.34,-.44]],.024);
    tube([[.60,.03,-.47],[.74,.05,-.32],[.79,.19,-.18]],.018,true);
    tube([[.94,.78,.30],[1.08,.86,.35],[1.17,1.03,.30],[1.14,1.20,.17]],.022);
    tube([[1.10,.91,.34],[.97,1.01,.40],[.91,1.11,.35]],.014,true);
    // ER topology is informed by West et al., JCB (2011), doi:10.1083/jcb.201011039.
    // https://rupress.org/jcb/article/193/2/333/36398/A-3D-analysis-of-yeast-ER-structure-reveals-how-ER
    // An authored continuous nuclear-envelope/central-cisterna/cortical-ER interpretation, not a measured reconstruction.
    reticular.onBeforeCompile=shader=>{
      shader.vertexShader='varying vec2 membraneUv;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nmembraneUv=uv;');
      shader.fragmentShader='varying vec2 membraneUv;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>',`float a=length((membraneUv-vec2(.30,.34))/vec2(.030,.075));float b=length((membraneUv-vec2(.66,.68))/vec2(.035,.080));float c=length((membraneUv-vec2(.79,.26))/vec2(.025,.065));float outline=1.0-smoothstep(.82,1.0,length((membraneUv-.5)/vec2(.515,.54)));diffuseColor.a *= outline*smoothstep(.86,1.08,min(a,min(b,c)));\n#include <opaque_fragment>`);
    };
    function sheet(shape,nu=56,nv=20){const v=[],uv=[],idx=[];for(let i=0;i<=nu;i++)for(let j=0;j<=nv;j++){const u=i/nu,w=j/nv;v.push(...shape(u,w));uv.push(u,w);if(i<nu&&j<nv){const a=i*(nv+1)+j;idx.push(a,a+1,a+nv+1,a+1,a+nv+2,a+nv+1)}}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(v,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();const mesh=new T.Mesh(g,reticular);mesh.name='endomembrane';mesh.renderOrder=6;tissue.add(mesh);targets.push(mesh);return mesh;}
    for(let k=0;k<2;k++)sheet((u,w)=>{const a=.15+u*2.2,r=.275+k*.025+.010*Math.sin(u*13+w*7+k),width=(.055+.09*Math.sin(u*Math.PI))*(1+.12*Math.sin(u*19));return[.39+Math.cos(a)*r,.24+Math.sin(a)*r*.96,-.08-k*.035+(w-.5)*width+.017*Math.sin(u*11+w*5+k)*Math.sin(u*Math.PI)]});
    sheet((u,w)=>{const center=[.47+u*.44,.47+u*.47,.005+Math.sin(u*3.7)*.07],width=.06+.11*Math.pow(Math.sin(u*Math.PI),.8),q=(w-.5)*width;return[center[0]+q,center[1]-q*.6,center[2]+.028*Math.sin(w*9+u*13)*Math.sin(u*Math.PI)]});
    sheet((u,w)=>{const a=-.90+u*.94,b=(w-.5)*.37;return[-.74*Math.cos(a)-b*.11,-.02+.72*Math.sin(a),-.43+b+.025*Math.sin(u*13+w*7)]});
    sheet((u,w)=>{const a=-.48+u*.94,b=(w-.5)*.30;return[-.12+Math.sin(a)*.59,.75+Math.cos(a)*.035+b*.21,-.35+b+.018*Math.sin(u*12+w*7)]});
    // Pore complexes are geometric features on the nuclear envelope, readable in the macro shot.
    const poreGeometry=new T.TorusGeometry(.005,.0015,5,10),poreMaterial=new T.MeshPhysicalMaterial({color:0xbba88a,roughness:.42,clearcoat:.65,metalness:0,transparent:true,opacity:.32,depthWrite:false,emissive:0x7c4e24,emissiveIntensity:.055}),pores=new T.InstancedMesh(poreGeometry,poreMaterial,64),poreDummy=new T.Object3D();
    for(let i=0;i<64;i++){const y=1-2*(i+.5)/64,a=i*2.39996323,r=Math.sqrt(1-y*y),x=Math.cos(a)*r,z=Math.sin(a)*r,w=1+.044*Math.sin(x*4.3+y*2.7+1)*Math.cos(z*4.8-y*1.8)+.009*Math.sin(x*9+y*6)*Math.cos(z*8-y*4);poreDummy.position.set(.40+x*.267*w,.24+y*.309*w,.13+z*.267*w);poreDummy.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),new T.Vector3(x/.25,y/.29,z/.25).normalize());poreDummy.updateMatrix();pores.setMatrixAt(i,poreDummy.matrix)}pores.renderOrder=10;pores.name='nuclear-pore-complexes';tissue.add(pores);
    // Fine, instanced cytoplasmic material gives depth without inflating draw calls.
    const dustMaterial=new T.MeshStandardMaterial({color:0x86a69d,roughness:.62,transparent:true,opacity:.32,depthWrite:false}),dust=new T.InstancedMesh(new T.IcosahedronGeometry(1,1),dustMaterial,1450),dummy=new T.Object3D(),rnd=seeded(1011),grainColor=new T.Color();
    for(let i=0;i<1450;i++){let x,y,z;do{x=-1+rnd()*2.45;y=-1.1+rnd()*2.63;z=(rnd()-.5)*1.76}while(field(x,y,z,false)>-.07||Math.pow((x+.27)/.58,2)+Math.pow((y+.23)/.67,2)+Math.pow((z+.05)/.52,2)<1||Math.pow((x-.40)/.31,2)+Math.pow((y-.24)/.35,2)+Math.pow((z-.13)/.31,2)<1);dummy.position.set(x,y,z);const r=.003+rnd()*.0055;dummy.scale.set(r,r*.72,r);dummy.rotation.set(rnd()*6,rnd()*6,rnd()*6);dummy.updateMatrix();dust.setMatrixAt(i,dummy.matrix);grainColor.setHSL(.16+rnd()*.25,.14+rnd()*.20,.34+rnd()*.20);dust.setColorAt(i,grainColor)}dust.renderOrder=4;tissue.add(dust);
    const vesicleMaterial=new T.MeshPhysicalMaterial({color:0x9dbbab,roughness:.12,metalness:0,clearcoat:.9,clearcoatRoughness:.08,transparent:true,opacity:.18,depthWrite:false,envMapIntensity:.72});
    vesicleMaterial.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','diffuseColor.a *= 0.22+2.0*pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),1.2);\n#include <opaque_fragment>')};
    const vesicleGeometry=new T.SphereGeometry(1,24,16);
    [[-.60,.12,.52,.067],[-.62,-.56,.38,.053],[.31,-.76,.22,.073],[.72,-.29,.27,.045],[-.38,.61,.23,.050],[.14,.75,-.15,.042],[.90,.87,.30,.042],[1.18,1.14,.15,.057],[-.73,-.14,-.35,.045],[.42,-.51,-.53,.037]].forEach(([x,y,z,r])=>{const m=new T.Mesh(vesicleGeometry,vesicleMaterial);m.position.set(x,y,z);m.scale.set(r,r*.93,r);m.renderOrder=8;m.name='vesicle';tissue.add(m);targets.push(m)});
    const nuclearGrains=new T.InstancedMesh(new T.IcosahedronGeometry(1,1),new T.MeshStandardMaterial({color:0xc2a584,roughness:.7,transparent:true,opacity:.44,depthWrite:false}),140);
    for(let i=0;i<140;i++){let x,y,z;do{x=(rnd()-.5)*2;y=(rnd()-.5)*2;z=(rnd()-.5)*2}while(x*x+y*y+z*z>.9);dummy.position.set(.40+x*.22,.24+y*.26,.13+z*.22);const r=.003+rnd()*.005;dummy.scale.set(r,r*.7,r);dummy.updateMatrix();nuclearGrains.setMatrixAt(i,dummy.matrix)}nuclearGrains.renderOrder=5;tissue.add(nuclearGrains);
    cell.rotation.set(.09,.11,-.12);
    const surfaceSamples=[];for(let i=0;i<shellGeometry.attributes.position.count;i+=Math.max(1,Math.floor(shellGeometry.attributes.position.count/420)))surfaceSamples.push(new T.Vector3().fromBufferAttribute(shellGeometry.attributes.position,i));
    const layerObjects={wall:[wall,fibres,innerWall,membrane],nucleus:[nucleus,nucleolus,envelope,pores,nuclearGrains],vacuole:[vacuole,daughterVacuole,...tissue.children.filter(o=>o.name==='vesicle')],network:tissue.children.filter(o=>o.material===mitochondrial||o.material===reticular)};
    return{buildMs:performance.now()-buildStart,environment,observationStage,optics,densityCamera,densitySamples,densityLayers,densityTint,nucleusTint,vacuoleTint,layerObjects,attention,dustMaterial,surfaceSamples,T,renderer,scene,camera,cell,tissue,resources,wallMaterial,innerMaterial,membraneMaterial,fibresMaterial:fibres.material,envelope,poreMaterial,nuclearGrains,reveal,nucleus,nucleolus,vacuole,daughterVacuole,mitochondrial,reticular,raycaster:new T.Raycaster(),targets,orbit:cloneShot(STAGES.scope),baseRotation:{x:.09,y:.11,z:-.12},zoom:1,width:0,height:0,fit:1,idleClock:0,actionEnergy:0};
  }

  function describeAppearance() { return {...specimenAppearance,layers:{...specimenAppearance.layers}}; }
  function applyAppearance() {
    if(!engine)return;
    const e=engine,T=e.T,preset=PALETTES[specimenAppearance.palette],hologram=specimenAppearance.finish==='hologram',custom=!!specimenAppearance.accent;
    const colors={wall:new T.Color(preset.wall),accent:new T.Color(specimenAppearance.accent||preset.accent),nucleus:new T.Color(preset.nucleus),vacuole:new T.Color(preset.vacuole),network:new T.Color(preset.network)};
    if(custom){colors.wall.lerp(colors.accent,.72);for(const key of ['nucleus','vacuole','network'])colors[key].lerp(colors.accent,.19);}
    e.colors=colors;e.optics.accent.value.copy(colors.accent);e.optics.hologram.value=hologram?1:0;
    e.wallMaterial.color.copy(colors.wall).lerp(new T.Color('#e2eee9'),hologram?.025:.34);e.wallMaterial.emissive.copy(colors.accent).multiplyScalar(hologram?.70:.48);
    e.wallMaterial.iridescence=hologram?.54:.13;e.wallMaterial.transmission=hologram?.22:.20;e.wallMaterial.thickness=hologram?.065:.10;e.wallMaterial.clearcoatRoughness=hologram?.08:.16;e.wallMaterial.envMapIntensity=hologram?1.45:1.25;
    e.innerMaterial.color.set(preset.inner).lerp(colors.accent,.12);e.membraneMaterial.color.copy(colors.accent);e.membraneMaterial.opacity=hologram?.040:.026;e.fibresMaterial.color.copy(colors.wall).lerp(new T.Color('#d3e6e2'),.18);
    e.nucleus.material.color.copy(colors.nucleus);e.nucleus.material.emissive.copy(colors.nucleus).multiplyScalar(.62);e.nucleus.material.roughness=hologram?.24:.32;e.nucleus.material.opacity=hologram?.34:.28;
    e.nucleolus.material.color.copy(colors.nucleus).multiplyScalar(.76);e.nucleolus.material.emissive.copy(colors.nucleus).multiplyScalar(.38);
    e.envelope.material.color.copy(colors.nucleus);e.envelope.material.opacity=hologram?.11:.085;e.poreMaterial.color.copy(colors.nucleus);e.poreMaterial.emissive.copy(colors.nucleus).multiplyScalar(.44);e.nuclearGrains.material.color.copy(colors.nucleus).multiplyScalar(.82);
    e.vacuole.material.color.copy(colors.vacuole);e.vacuole.material.emissive.copy(colors.vacuole).multiplyScalar(.55);e.daughterVacuole.material.color.copy(colors.vacuole).lerp(colors.wall,.25);e.daughterVacuole.material.emissive.copy(colors.vacuole).multiplyScalar(.55);e.daughterVacuole.material.opacity=hologram?.33:.28;
    e.mitochondrial.color.copy(colors.network).lerp(colors.wall,.25);e.mitochondrial.emissive.copy(colors.network).multiplyScalar(.63);e.reticular.color.copy(colors.network).lerp(colors.wall,.43);e.reticular.emissive.copy(colors.network).multiplyScalar(.55);
    for(const [key,objects] of Object.entries(e.layerObjects))for(const object of objects)object.visible=specimenAppearance.layers[key];
    e.densityLayers.value.set(specimenAppearance.layers.nucleus?1:0,specimenAppearance.layers.vacuole?1:0);e.densityTint.value.copy(colors.wall);e.nucleusTint.value.copy(colors.nucleus);e.vacuoleTint.value.copy(colors.vacuole);
    const rig=e.observationStage;for(const material of [rig.ringMaterial,rig.arcMaterial,rig.tickMaterial])material.color.copy(colors.accent);rig.glowUniforms.color.value.copy(colors.accent);
  }
  function setAppearance(value={}) {
    if(!value||typeof value!=='object')return describeAppearance();
    const next=describeAppearance();
    if(PALETTES[value.palette]){next.palette=value.palette;if(!Object.prototype.hasOwnProperty.call(value,'accent'))next.accent=null;}
    if(value.finish==='hologram'||value.finish==='pearl')next.finish=value.finish;
    if(Object.prototype.hasOwnProperty.call(value,'accent')){if(value.accent===null||value.accent==='')next.accent=null;else if(/^#[\da-f]{6}$/i.test(value.accent))next.accent=value.accent.toLowerCase();}
    if(value.layers&&typeof value.layers==='object')for(const key of Object.keys(next.layers))if(typeof value.layers[key]==='boolean')next.layers[key]=value.layers[key];
    if(typeof value.autoRotate==='boolean')next.autoRotate=value.autoRotate;
    specimenAppearance=next;applyAppearance();request();return describeAppearance();
  }
  function updateSpecimenPose(dt=0) {
    if(!engine)return;const e=engine,moving=canMove(),a=specimenAction;
    if(a){if(!moving){a.static=true;a.progress=1;}else if(!a.static){a.elapsed+=dt*1000;a.progress=clamp(a.elapsed/a.duration,0,1);}}
    if(moving&&!drag){e.idleClock+=dt;if(specimenAppearance.autoRotate)e.baseRotation.y+=dt*.15;}
    let x=e.baseRotation.x,y=e.baseRotation.y,z=e.baseRotation.z,lift=0,scale=1,energy=0;
    if(moving&&!drag){x+=Math.sin(e.idleClock*.36)*.018;y+=Math.sin(e.idleClock*.22)*.020;lift=Math.sin(e.idleClock*.60)*.023;}
    if(a&&!drag){const p=a.progress,envelope=a.static?.65:Math.sin(p*Math.PI),turn=a.static?.48:smooth(p)*Math.PI*2;energy=envelope;
      if(a.action==='greet'){x+=(a.static?-.07:-Math.sin(p*Math.PI*2)*.11);z+=envelope*.10;lift+=envelope*.09;}
      if(a.action==='pulse'){scale+=envelope*.052;energy*=1.15;}
      if(a.action==='orbit')y+=turn;
    }
    e.cell.rotation.set(x,y,z);e.cell.position.y=lift;e.cell.scale.setScalar(scale);e.actionEnergy=energy;
    const rig=e.observationStage;rig.rig.rotation.y=moving?Math.sin(e.idleClock*.17)*.045:0;rig.arc.rotation.z=moving?e.idleClock*.045:0;rig.arc2.rotation.z=-rig.arc.rotation.z*.72;
    rig.ringMaterial.opacity=.19+energy*.08;rig.arcMaterial.opacity=.32+energy*.14;rig.glowUniforms.energy.value=.15+energy*.14;
  }
  function animateSpecimen(action) {
    if(!['greet','pulse','orbit'].includes(action))return false;
    specimenAction={action,elapsed:0,progress:canMove()?0:1,duration:action==='orbit'?2200:action==='greet'?1450:1100,static:!canMove()};
    if(engine){updateSpecimenPose();request();}return {action,animated:canMove(),duration:specimenAction.duration};
  }

  function setCamera() {
    if (!engine) return;
    const {camera,orbit,fit}=engine,mobile=engine.width>0&&engine.width<520,radius=orbit.radius*fit*(engine.zoom||1)*(mobile&&stage==='noise'?1.10:1),sn=Math.sin(orbit.phi);
    camera.fov=orbit.fov||35;camera.position.set(orbit.focus[0]+radius*sn*Math.sin(orbit.theta),orbit.focus[1]+radius*Math.cos(orbit.phi),orbit.focus[2]+radius*sn*Math.cos(orbit.theta));camera.lookAt(...orbit.focus);
    if(engine.width>0&&engine.height>0){const offset=orbit.offset||[0,0],factor=mobile?.62:1;camera.setViewOffset(engine.width,engine.height,engine.width*offset[0]*factor,engine.height*offset[1]*factor,engine.width,engine.height);}camera.updateProjectionMatrix();
  }

  function size() {
    if (!engine || !host) return; const rect = host.getBoundingClientRect(), w = Math.max(1, Math.round(rect.width)), h = Math.max(1, Math.round(rect.height));
    if (w === engine.width && h === engine.height) return;
    engine.width = w; engine.height = h; engine.camera.aspect = w / h;
    engine.fit = Math.max(1, .9 / engine.camera.aspect); engine.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, quality === 'high' ? 2 : 1.5)); engine.renderer.setSize(w, h, false); setCamera();
  }
  function appearance(now) {
    if (!engine) return;
    const target=STAGES[stage],r=reaction,semantic=r?.semantic||'whole',theme=SEMANTICS[semantic],moving=canMove()&&r&&r.progress<1;
    const pulse=moving?Math.sin(r.progress*Math.PI):0,strength=r?r.intensity+(pulse*(r.selected===false?.22:.40)):0;
    const focusWeight=key=>semantic===key?1:semantic==='whole'?.30:0;
    engine.attention.origin.value.set(...theme.origin);engine.attention.radius.value=theme.radius;
    engine.attention.color.value.set(r?.palette||theme.color);engine.attention.strength.value=strength;
    engine.attention.scan.value=moving?(r.selected===false?1-r.progress:r.progress):-1;
    engine.optics.time.value=engine.environment.time;engine.optics.energy.value=engine.actionEnergy;
    const hologram=engine.optics.hologram.value;
    engine.wallMaterial.emissiveIntensity=.025+hologram*.055+target.wall*.14+strength*focusWeight('wall')*.15;engine.wallMaterial.opacity=wallOpacity;
    engine.nucleus.material.emissiveIntensity=.20+hologram*.08+target.nucleus*.8+strength*focusWeight('nucleus')*.90;
    engine.nucleolus.material.emissiveIntensity=.08+target.nucleus*.65+strength*focusWeight('nucleus')*.40;
    engine.nucleus.material.color.copy(engine.colors.nucleus).lerp(engine.attention.color.value,focusWeight('nucleus')*.14);
    engine.mitochondrial.emissiveIntensity=.09+hologram*.075+target.network+strength*focusWeight('network')*.72;
    engine.reticular.emissiveIntensity=.055+hologram*.055+target.network*.45+strength*focusWeight('network')*.55;
    engine.reticular.opacity=.26+hologram*.06+strength*focusWeight('network')*.18;
    engine.vacuole.material.emissiveIntensity=.045+hologram*.035+strength*focusWeight('vacuole')*.70;
    engine.vacuole.material.opacity=.29+hologram*.03+strength*focusWeight('vacuole')*.12;
    engine.daughterVacuole.material.emissiveIntensity=.045+hologram*.035+strength*focusWeight('bud')*.80;
    engine.dustMaterial.opacity=.32+strength*focusWeight('whole')*.14;
  }
  function fitObservationStage() {
    const e=engine,rig=e.observationStage,compact=e.width<520;
    rig.rig.position.set(.04,compact?-1.32:-1.48,-.12);rig.rig.scale.setScalar(compact?.78:.92);
    // Keep the open stage in the lower composition as camera shots change;
    // this adapts the illustration, leaving the research-stage camera intact.
    e.camera.updateMatrixWorld();const p=rig.projection.copy(rig.rig.position).project(e.camera);
    if(p.y<-.64){p.y=-.64;rig.rig.position.copy(p.unproject(e.camera));}
  }
  function paint(now = performance.now()) {
    if (!engine || !visible()) return;size();fitObservationStage();appearance(now);engine.tissue.updateWorldMatrix(true,false);engine.densityCamera.value.copy(engine.camera.position);engine.tissue.worldToLocal(engine.densityCamera.value);
    const env=engine.environment;env.aspect.value=engine.width/engine.height;env.view.value.copy(engine.camera.position);env.resolution.value=engine.height*engine.renderer.getPixelRatio();env.focus.value=engine.camera.position.distanceTo(new engine.T.Vector3(...engine.orbit.focus));env.uniformTime.value=env.time;
    if(env.lastBackground<0||env.time-env.lastBackground>=.12||env.lastView.distanceToSquared(engine.camera.position)>.008){engine.renderer.setRenderTarget(env.target);engine.renderer.render(env.backgroundScene,env.backgroundCamera);engine.renderer.setRenderTarget(null);env.lastBackground=env.time;env.lastView.copy(engine.camera.position);}
    engine.renderer.render(engine.scene,engine.camera);lastPaint=now;frames++;
  }

  function cancel() { cancelAnimationFrame(frame); clearTimeout(timer); frame = timer = 0; if(engine)engine.environment.lastTick=0; }
  function tick(now) {
    frame = 0; if (!engine || !visible()) return;
    const animated = canMove() || !!transition, interval = 1000 / 30;
    if (animated && now - lastPaint < interval - .6) { frame = requestAnimationFrame(tick); return; }
    const env=engine.environment,dt=canMove()&&env.lastTick?clamp((now-env.lastTick)/1000,0,.08):0;
    if(canMove())env.time+=dt;env.lastTick=now;
    if(reaction){reaction.elapsed+=dt*1000;reaction.progress=canMove()?clamp(reaction.elapsed/reaction.duration,0,1):1;}
    if (transition) {
      const p=canMove()?clamp((now-transition.start)/transition.duration,0,1):1,anticipation=transition.type==='stage',t=smooth(anticipation?clamp((p-.12)/.88,0,1):p),from=transition.from,to=transition.to;
      for(const key of ['theta','phi','radius','fov'])engine.orbit[key]=from[key]+(to[key]-from[key])*t;
      engine.orbit.focus=from.focus.map((x,i)=>x+(to.focus[i]-x)*t);engine.orbit.offset=from.offset.map((x,i)=>x+(to.offset[i]-x)*t);
      if(anticipation)engine.orbit.radius+=Math.sin(Math.min(1,p/.42)*Math.PI)*.52*(1-p);
      setCamera();if(p>=1){transition=null;report('ready');}
    }
    updateSpecimenPose(dt);
    paint(now);
    if (canMove() || transition) frame = requestAnimationFrame(tick);
  }
  function request() { if (!engine || !visible() || frame || timer) return; frame = requestAnimationFrame(tick); }
  function capture(event) {
    if (!engine || event.button !== 0) return; transition = null; specimenAction = null;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, rx: engine.baseRotation.x, ry: engine.baseRotation.y, moved: false };
    engine.renderer.domElement.setPointerCapture(event.pointerId); engine.renderer.domElement.style.cursor = 'grabbing';
  }
  function move(event) {
    if (!engine || !drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true;
    engine.baseRotation.y = drag.ry + dx * .008; engine.baseRotation.x = clamp(drag.rx + dy * .006, -1.1, 1.1); engine.cell.rotation.set(engine.baseRotation.x, engine.baseRotation.y, engine.baseRotation.z); request();
  }
  function release(event) {
    if (!engine || !drag || event.pointerId !== drag.id) return; const click = !drag.moved; drag = null;
    const canvas = engine.renderer.domElement; canvas.style.cursor = 'grab'; if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if(click){
      const rect=canvas.getBoundingClientRect();engine.raycaster.setFromCamera(new engine.T.Vector2((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1),engine.camera);
      const hits=engine.raycaster.intersectObjects(engine.targets.filter(object=>object.visible),false);let hit=hits[0];
      if(hit?.object.name==='cell-wall'){const n=hit.face.normal.clone().transformDirection(hit.object.matrixWorld),view=engine.camera.position.clone().sub(hit.point).normalize(),opacity=wallOpacity*(.55+1.45*Math.pow(1-Math.abs(n.dot(view)),1.5));if(opacity<.64){const inside=hits.find(h=>h.object.name!=='cell-wall'&&h.distance>hit.distance);if(inside)hit=inside;}}
      if(hit){const id=hit.object.name,semantic=({'cell-wall':'wall','nucleus':'nucleus','nucleolus':'nucleus','vacuole':'vacuole','bud-vacuole':'bud','mitochondrial-network':'network','endomembrane':'network','vesicle':'vacuole'})[id]||'whole';react({kind:'hotspot',id,semantic,action:'inspect',selected:true});try{onHotspot?.({id,stage});}catch{}}
      else react({kind:'view',id:'medium',semantic:'whole',action:'inspect'});
    }
    request();
  }
  function key(event) {
    if (!engine || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return; event.preventDefault();
    if (event.key === 'Home') return resetView();
    specimenAction=null;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') engine.baseRotation.y += event.key === 'ArrowRight' ? .12 : -.12; else engine.baseRotation.x = clamp(engine.baseRotation.x + (event.key === 'ArrowDown' ? .10 : -.10), -1.1, 1.1);
    engine.cell.rotation.set(engine.baseRotation.x, engine.baseRotation.y, engine.baseRotation.z); request();
  }
  function bindCanvas(canvas) {
    canvas.className = 'j17-scene-canvas'; canvas.tabIndex = 0; canvas.setAttribute('role', 'img'); canvas.setAttribute('aria-label', canvasLabel()); canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;cursor:grab;outline-offset:-6px';
    canvas.addEventListener('pointerdown', capture); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', release); canvas.addEventListener('pointercancel', release); canvas.addEventListener('keydown', key);
    canvas.addEventListener('wheel',event=>{if(!engine||!visible())return;event.preventDefault();engine.zoom=clamp((engine.zoom||1)*Math.exp(clamp(event.deltaY,-140,140)*.0014),.74,1.48);setCamera();request()},{passive:false});
    canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); fail('webgl-context-lost'); });
  }
  function fail(reason) { error = reason; cancel(); drop(); report('unavailable'); }
  function drop(e = engine) {
    if (!e) return; if(e === engine) engine = null; e.renderer.domElement.remove();
    const geometries = new Set(), materials = new Set(); e.scene.traverse(o => { if (o.geometry) geometries.add(o.geometry); for (const m of Array.isArray(o.material) ? o.material : [o.material]) if (m) materials.add(m); });
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); e.resources.forEach(r => r.dispose?.()); e.renderer.dispose();
  }
  async function mount(target, options = {}) {
    if (!target || !(target instanceof HTMLElement)) return false;
    if(options.appearance)setAppearance(options.appearance);
    mounted = true; host = target; inViewport = true; const previousQuality = quality; quality = options.quality === 'high' ? 'high' : options.quality === 'balanced' ? 'balanced' : quality; if(Number.isFinite(Number(options.wallOpacity))) wallOpacity=clamp(Number(options.wallOpacity),.16,.72); motion = options.motion ?? motion; onStatus = options.onStatus || onStatus; onHotspot = options.onHotspot || onHotspot;
    if (options.stage && STAGES[options.stage] && !engine) stage = options.stage;
    resizeObserver?.disconnect(); observer?.disconnect(); resizeObserver = new ResizeObserver(() => { size(); request(); }); resizeObserver.observe(host);
    observer = new IntersectionObserver(entries => { inViewport = !!entries[0]?.isIntersecting; if (inViewport) request(); else cancel(); }, { threshold: .01 }); observer.observe(host);
    if (engine) { host.append(engine.renderer.domElement); engine.renderer.domElement.setAttribute('aria-label', canvasLabel()); if (quality !== previousQuality) {engine.width = 0;engine.densitySamples.value=quality==='high'?22:16;} size(); if (options.stage && options.stage !== stage) setStage(options.stage); request(); report('ready'); return true; }
    if (pending) return pending;
    const own = ++generation; error = null; report('loading');
    pending = (async () => {
      let renderer;
      try {
        const T = await import('./vendor/three.module.js'); if (own !== generation || !mounted) return false;
        renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: quality === 'high' ? 'high-performance' : 'low-power', stencil: false }); renderer.setClearColor(0x000000, 0); renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.45;
        const built = await build(T, renderer); if (own !== generation || !mounted) { drop(built); return false; } engine = built;engine.densitySamples.value=quality==='high'?22:16;applyAppearance();updateSpecimenPose();
        bindCanvas(renderer.domElement);host.append(renderer.domElement);engine.orbit=cloneShot(STAGES[stage]);if(canMove()){engine.orbit.radius*=1.16;engine.orbit.fov+=2;engine.orbit.theta-=.12;}size();setCamera();paint();report('ready');beginReaction({kind:'stage',id:stage,semantic:STAGE_SEMANTIC[stage],action:'navigate'},false);if(canMove())cameraTo(STAGES[stage],'entry',900);request();return true;
      } catch (e) { renderer?.dispose(); if (own === generation) fail('webgl-unavailable'); return false; }
      finally { if (own === generation) pending = null; }
    })();
    return pending;
  }
  function cameraTo(to,type='reaction',duration=620){
    if(!engine)return;const from=cloneShot(engine.orbit);to=cloneShot(to);
    while(to.theta-from.theta>Math.PI)to.theta-=Math.PI*2;while(to.theta-from.theta<-Math.PI)to.theta+=Math.PI*2;
    if(canMove()){transition={start:performance.now(),from,to,type,duration};if(type==='stage')report('turning');}
    else{engine.orbit=to;transition=null;setCamera();}
  }
  function describeReaction(){return reaction?{...reaction,active:!!(canMove()&&visible()&&reaction.progress<1),focus:[...SEMANTICS[reaction.semantic].origin]}:null;}
  function beginReaction(payload,moveCamera=true){
    const kind=String(payload.kind||'choice'),id=String(payload.id||payload.action||kind),semantic=SEMANTICS[payload.semantic]?payload.semantic:STAGE_SEMANTIC[stage]||'whole';
    const selected=typeof payload.selected==='boolean'?payload.selected:null,action=String(payload.action||(selected===false?'deselect':selected===true?'select':kind==='complete'?'complete':'inspect'));
    let hash=2166136261;for(const c of kind+':'+id)hash=Math.imul(hash^c.charCodeAt(0),16777619);const variant=(hash>>>0)%1000/999;
    const theme=SEMANTICS[semantic],intensity=selected===false?.12:action==='complete'?.70:action==='filter'?.26:action==='navigate'?.22:kind==='hotspot'?.58:kind==='tool'?.48:kind==='metric'?.42:kind==='marker'?.56:.38;
    let palette=theme.color;
    if(engine){const c=new engine.T.Color(theme.color);if(kind==='tool')c.lerp(new engine.T.Color('#b3a0ec'),.30);if(kind==='metric')c.lerp(new engine.T.Color('#65d7e4'),.32);if(kind==='marker')c.lerp(new engine.T.Color('#e6cf8d'),.22);if(selected===false)c.lerp(new engine.T.Color('#778da8'),.65);c.offsetHSL((variant-.5)*.025,0,0);palette='#'+c.getHexString();}
    reaction={seq:++reactionSequence,kind,id,semantic,action,selected,palette,intensity,variant,duration:kind==='complete'?1250:kind==='stage'?980:900,elapsed:0,progress:canMove()?0:1};
    if(!canMove())reaction.elapsed=reaction.duration;lastPulse=performance.now();pulseUntil=lastPulse+reaction.duration;
    if(engine&&moveCamera&&action!=='navigate'&&kind!=='stage'){
      const to=cloneShot(STAGES[stage]),isLight=action==='filter'||kind==='control'||kind==='view',factor=selected===false?0:isLight?.16:kind==='hotspot'?.34:.25;
      engine.tissue.updateWorldMatrix(true,false);const point=engine.tissue.localToWorld(new engine.T.Vector3(...theme.origin));to.focus=to.focus.map((v,i)=>v+(point.getComponent(i)-v)*factor);
      if(selected!==false){to.radius*=isLight?.985:kind==='hotspot'?.91:.95;to.fov-=isLight?.35:1.1;to.theta+=(variant-.5)*(isLight?.06:.16);}
      cameraTo(to,'reaction',isLight?430:620);
    }
    request();return describeReaction();
  }
  function setStage(value,payload){
    if(!STAGES[value])return false;const changed=value!==stage;stage=value;if(payload)selection={...selection,...payload};
    if(changed){beginReaction({kind:'stage',id:value,semantic:STAGE_SEMANTIC[value],action:'navigate'},false);if(engine)cameraTo(STAGES[value],'stage',980);}
    request();return changed;
  }
  function react(payload={}){
    selection={...selection,...payload};if(payload.stage&&payload.stage!==stage)setStage(payload.stage);
    return beginReaction(payload,true);
  }
  function setWallOpacity(value) { const n=Number(value);if(Number.isFinite(n))wallOpacity=clamp(n,.16,.72);if(engine)engine.wallMaterial.opacity=wallOpacity;request();return wallOpacity; }
  function setQuality(value) { quality = value === 'high' ? 'high' : 'balanced'; if (engine) { engine.densitySamples.value=quality==='high'?22:16;engine.width = 0; size(); request(); } return quality; }
  function setMotion(value) { motion = !!value; cancel(); if(canMove()&&specimenAction?.static)specimenAction=null;if (engine) { if (!canMove() && transition) { engine.orbit = transition.to; transition = null; setCamera(); } if(reaction&&!canMove()){reaction.progress=1;reaction.elapsed=reaction.duration;}request(); } return motion; }
  function resetView() { specimenAction=null;if (!engine) return; engine.zoom=1; engine.baseRotation = { x: .09, y: .11, z: -.12 }; engine.cell.rotation.set(.09, .11, -.12);engine.cell.position.y=0;engine.cell.scale.setScalar(1);engine.actionEnergy=0; engine.orbit = cloneShot(STAGES[stage]); transition = null; reaction=null;setCamera(); request(); }
  function dispose() { generation++; mounted = false; pending = null; cancel(); resizeObserver?.disconnect(); observer?.disconnect(); resizeObserver = observer = null; drag = transition = null; reaction=null;specimenAction=null;drop(); host = null; }
  function state() { let shot=null;if(engine){engine.camera.updateMatrixWorld();const centre=new engine.T.Vector3(0,.15,0).applyMatrix4(engine.cell.matrixWorld).project(engine.camera),focus=new engine.T.Vector3(...engine.orbit.focus),radius=engine.camera.position.distanceTo(focus);const bounds={left:Infinity,right:-Infinity,bottom:Infinity,top:-Infinity};engine.tissue.updateWorldMatrix(true,false);const point=new engine.T.Vector3();for(const p of engine.surfaceSamples){point.copy(p).applyMatrix4(engine.tissue.matrixWorld).project(engine.camera);bounds.left=Math.min(bounds.left,point.x);bounds.right=Math.max(bounds.right,point.x);bounds.bottom=Math.min(bounds.bottom,point.y);bounds.top=Math.max(bounds.top,point.y);}shot={projectedBounds:bounds,radius,fov:engine.camera.fov,focus:[...engine.orbit.focus],offset:[...engine.orbit.offset],elevation:engine.orbit.phi,effectiveScale:1/(2*radius*Math.tan(engine.camera.fov*Math.PI/360)),projectedCenter:{x:centre.x,y:centre.y},viewOffset:engine.camera.view?{x:engine.camera.view.offsetX,y:engine.camera.view.offsetY}:null};} return {reaction:describeReaction(),transition:transition?{type:transition.type,duration:transition.duration}:null,shot,environment:engine?{type:'liquid',time:engine.environment.time,volumeSamples:engine.densitySamples.value,particles:engine.environment.particles,caustics:true,playing:canMove()&&visible(),backdropResolution:[384,256]}:null,visible:!!visible(),inViewport, ready: !!engine, loading: !!pending, stage, quality, wallOpacity, zoom:engine?.zoom||1, motion, reducedMotion: reduced(), playing: !!(frame || timer), mounted, frames, lastPaint, lastPulse, error, selection: { ...selection }, width: engine?.width || 0, height: engine?.height || 0, pixelRatio: engine?.renderer.getPixelRatio() || 0, camera: engine ? { x: engine.camera.position.x, y: engine.camera.position.y, z: engine.camera.position.z } : null, rotation: engine ? { x: engine.cell.rotation.x, y: engine.cell.rotation.y, z: engine.cell.rotation.z } : null, transitioning: !!transition, buildMs: engine?.buildMs || 0, drawCalls: engine?.renderer.info.render.calls || 0, triangles: engine?.renderer.info.render.triangles || 0 }; }
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancel(); else request(); });
  media.addEventListener('change', () => { setMotion(motion); });
  const inspectState=()=>({...state(),appearance:describeAppearance(),specimenAction:specimenAction?{...specimenAction}:null,layerVisibility:engine?Object.fromEntries(Object.entries(engine.layerObjects).map(([key,objects])=>[key,{visible:objects.filter(object=>object.visible).length,total:objects.length}])):null});
  window.YV_JOURNEY_SCENE = { mount, setStage, react, setAppearance, animateSpecimen, setQuality, setWallOpacity, setMotion, resetView, dispose, state:inspectState };
})();
