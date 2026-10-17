/**
 * Interactive, non-quantitative S. cerevisiae cell-cycle illustration.
 * Geometry, colors and particle counts are artistic choices, not observations.
 * Bud size does not establish an scRNA-seq cell-cycle label. Nuclear-envelope
 * continuity is retained in the mitotic illustration (closed mitosis).
 * Biology: https://rupress.org/jcb/article/191/6/1097/36197/
 *          https://doi.org/10.1083/jcb.129.3.739
 * API: https://threejs.org/docs/pages/WebGLRenderer.html
 *      https://threejs.org/docs/pages/MeshPhysicalMaterial.html
 * Local dependency only; no CDN or remote assets.
 */
const PHASES = Object.freeze(['G1', 'G1/S', 'S', 'G2', 'G2/M', 'M', 'M/G1']);
const PALETTES = Object.freeze({
  G1: ['#76b8a8', '#d7eee3', '#786ab8', '#f0c883'],
  'G1/S': ['#67b6b2', '#caeee8', '#778bc9', '#ebc684'],
  S: ['#79a9d1', '#d4e7f4', '#9e79bb', '#f0bd87'],
  G2: ['#929fc8', '#e0e6f2', '#8784c0', '#eac38b'],
  'G2/M': ['#a18bc8', '#e6dff2', '#777dc0', '#efb38b'],
  M: ['#c18fab', '#f0dfe7', '#7d8bc7', '#f1cb8c'],
  'M/G1': ['#c3a16e', '#f0e5d1', '#8a8aba', '#a7d4bd']
});
const CONFIG = {
  G1: { bud: 0, separation: 0, mitosis: false },
  'G1/S': { bud: 0.27, separation: 0, mitosis: false },
  S: { bud: 0.46, separation: 0, mitosis: false },
  G2: { bud: 0.63, separation: 0, mitosis: false },
  'G2/M': { bud: 0.72, separation: 0, mitosis: false },
  M: { bud: 0.77, separation: 0, mitosis: true },
  'M/G1': { bud: 0.8, separation: 0.23, mitosis: false }
};
let serial = 0;
let threePromise;
const instances = new WeakMap();
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));
const phaseName = value => PHASES.includes(value) ? value : 'G1';
const loadThree = () => threePromise ||= import('./vendor/three.module.js');

function releaseObject(object) {
  if (!object) return;
  const geometries = new Set(), materials = new Set(), textures = new Set();
  object.traverse(node => {
    if (node.geometry) geometries.add(node.geometry);
    const list = Array.isArray(node.material) ? node.material : [node.material];
    list.filter(Boolean).forEach(material => {
      materials.add(material);
      for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
    });
  });
  textures.forEach(texture => texture.dispose());
  geometries.forEach(geometry => geometry.dispose());
  materials.forEach(material => material.dispose());
  object.removeFromParent();
}

function svgFallback(host, phase, theme, id, labels) {
  const [color, pale, nuclear, gold] = PALETTES[phase];
  const cfg = CONFIG[phase];
  const bud = cfg.bud * 83;
  const bx = 286 + cfg.bud * 30 + cfg.separation * 90;
  const by = 124 - cfg.bud * 15 - cfg.separation * 45;
  const nuclearMark = (x, y, radius = 25) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${nuclear}" fill-opacity=".55" stroke="${nuclear}" stroke-opacity=".85"/><path d="M${x-11} ${y-8}q24-12 18 9t-20 2q-4-9 13-8" fill="none" stroke="${gold}" stroke-width="2.5" stroke-linecap="round"/>`;
  host.innerHTML = `<svg class="yv3d-fallback-svg" viewBox="0 0 480 360" aria-hidden="true"><defs><radialGradient id="yv-cell-${id}" cx="32%" cy="26%" r="76%"><stop stop-color="${pale}" stop-opacity=".85"/><stop offset=".67" stop-color="${color}" stop-opacity=".25"/><stop offset="1" stop-color="${color}" stop-opacity=".68"/></radialGradient></defs><g class="yv3d-svg-model"><ellipse cx="214" cy="214" rx="88" ry="102" fill="url(#yv-cell-${id})" stroke="${color}" stroke-width="2.1"/>${cfg.bud ? `<ellipse cx="${bx}" cy="${by}" rx="${bud*.9}" ry="${bud*1.04}" fill="url(#yv-cell-${id})" stroke="${color}" stroke-width="2"/>` : ''}<ellipse cx="181" cy="230" rx="29" ry="35" fill="${pale}" fill-opacity=".28" stroke="${color}" stroke-opacity=".38"/>${cfg.mitosis ? `<path d="M239 186L${bx-8} ${by+9}" fill="none" stroke="${nuclear}" stroke-width="17" stroke-opacity=".26"/><path d="M239 186L${bx-8} ${by+9}" fill="none" stroke="${gold}" stroke-width="2"/>${nuclearMark(237,188,23)}${nuclearMark(bx-6,by+8,21)}` : nuclearMark(237,192)}${phase === 'M/G1' ? nuclearMark(bx-4,by+4,22) : ''}${cfg.bud && !cfg.separation ? `<ellipse cx="275" cy="151" rx="17" ry="6" transform="rotate(-47 275 151)" fill="none" stroke="${gold}" stroke-width="3"/>` : ''}<path d="M154 188q-14 41 6 68" fill="none" stroke="${pale}" stroke-width="3" stroke-linecap="round" opacity=".8"/></g></svg>`;
  const badge = document.createElement('span');
  badge.className = 'yv3d-fallback-badge';
  badge.textContent = labels.fallback;
  host.append(badge);
  host.dataset.theme = theme;
}

/**
 * mount(container, options) returns an independent controller immediately.
 * controller.ready resolves after local Three.js loads or the fallback appears.
 * setMotion(enabled) controls idle motion; direct user interaction stays enabled.
 * System prefers-reduced-motion always suppresses idle motion.
 * Supply localized labels through options.labels; outer controls belong to host UI.
 */
function mount(container, options = {}) {
  if (!(container instanceof Element)) throw new TypeError('YV3D.mount requires an element');
  instances.get(container)?.destroy();
  const id = ++serial;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const modest = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  const frameInterval = 1000 / (modest ? 24 : 30);
  const initialZoom = Number.isFinite(options.initialZoom) ? clamp(options.initialZoom, 0.7, 1.5) : 1.18;
  const labels = {
    ariaLabel: 'Interactive yeast cell-cycle illustration. Drag to rotate; use arrow keys to rotate and plus or minus to zoom.',
    fallback: '2D fallback',
    schematic: 'Schematic · not measured morphology',
    ...(options.labels || {})
  };
  const state = {
    phase: phaseName(options.phase), theme: options.theme === 'dark' ? 'dark' : 'light',
    motion: options.autoRotate !== false, reduced: Boolean(options.reduceMotion),
    systemReduced: motionQuery.matches, paused: false, visible: true, destroyed: false,
    mode: 'loading', rotationX: -0.12, rotationY: -0.32, zoom: initialZoom,
    renderCount: 0, active: false
  };
  const host = document.createElement('div');
  host.className = 'yv3d-stage';
  host.dataset.theme = state.theme;
  host.dataset.phase = state.phase;
  host.dataset.mode = 'loading';
  host.tabIndex = 0;
  host.setAttribute('role', 'group');
  host.setAttribute('aria-label', labels.ariaLabel);
  const note = document.createElement('span');
  note.className = 'yv3d-schematic';
  note.textContent = labels.schematic;
  host.append(note);
  container.append(host);
  let T, renderer, scene, camera, rig, model, particles, particleMaterial, keyLight, fillLight;
  let width = 0, height = 0, previousTime = 0, elapsed = 0, lastFrame = 0;
  let appliedZoom = 0, appliedPixelRatio = 0, interactionRaf = 0;
  let observer, resizeObserver;
  const pointers = new Map();
  let pinchDistance = 0;
  const removers = [];
  const listen = (target, event, fn, opts) => {
    target.addEventListener(event, fn, opts);
    removers.push(() => target.removeEventListener(event, fn, opts));
  };
  const emit = () => options.onStatus?.(getState());
  function getState() {
    return { phase: state.phase, theme: state.theme, mode: state.mode, destroyed: state.destroyed,
      motion: state.motion, reducedMotion: state.reduced || state.systemReduced,
      paused: state.paused, visible: state.visible, animating: state.active,
      rotation: [state.rotationX, state.rotationY], zoom: state.zoom, renderCount: state.renderCount,
      maxIdleFps: modest ? 24 : 30, pixelRatio: appliedPixelRatio };
  }
  function setLabels(next = {}) {
    Object.assign(labels, next);
    host.setAttribute('aria-label', labels.ariaLabel);
    note.textContent = labels.schematic;
    if (state.mode === 'fallback') drawFallback();
  }
  function drawFallback() {
    svgFallback(host, state.phase, state.theme, id, labels);
    host.append(note);
  }
  function paint() {
    if (!renderer || state.destroyed || !state.visible || document.hidden || !width || !height) return;
    rig.rotation.set(state.rotationX, state.rotationY, 0.045);
    if (appliedZoom !== state.zoom) {
      camera.position.z = 6.8 / state.zoom;
      appliedZoom = state.zoom;
    }
    try {
      renderer.render(scene, camera);
      state.renderCount++;
    } catch (error) { fallback(error); }
  }
  function tick(time) {
    if (time - lastFrame < frameInterval - 0.5) return;
    lastFrame = time;
    const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
    previousTime = time;
    elapsed += dt;
    if (!pointers.size) state.rotationY += dt * 0.095;
    if (particles) particles.rotation.y = elapsed * 0.018;
    if (model) model.position.y = Math.sin(elapsed * 0.7) * 0.025;
    paint();
  }
  function refreshLoop() {
    const active = Boolean(renderer && state.mode === 'webgl' && !state.destroyed && state.visible &&
      !document.hidden && width && height && state.motion && !state.paused && !state.reduced && !state.systemReduced);
    if (state.active !== active) {
      state.active = active;
      previousTime = 0; lastFrame = 0;
      renderer?.setAnimationLoop(active ? tick : null);
    }
    if (!active) paint();
  }
  function resize() {
    if (state.destroyed) return;
    const rect = host.getBoundingClientRect();
    const nextWidth = Math.floor(rect.width), nextHeight = Math.floor(rect.height);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, modest ? 1.25 : 1.5);
    const changed = nextWidth !== width || nextHeight !== height || pixelRatio !== appliedPixelRatio;
    width = nextWidth; height = nextHeight;
    if (renderer && width && height && changed) {
      renderer.setPixelRatio(pixelRatio); appliedPixelRatio = pixelRatio;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Narrow containers need a wider camera angle, without clipping the bud.
      camera.fov = width / height < 0.9 ? 47 : 39;
      camera.updateProjectionMatrix();
    }
    refreshLoop();
  }
  function fallback(error) {
    if (state.destroyed) return;
    renderer?.setAnimationLoop(null);
    state.active = false;
    if (scene) releaseObject(scene);
    if (renderer) {
      renderer.domElement.remove();
      renderer.dispose();
      renderer = null;
    }
    scene = camera = rig = model = particles = null;
    state.mode = 'fallback';
    host.dataset.mode = 'fallback';
    drawFallback();
    options.onStatus?.({ ...getState(), reason: error?.message || 'WebGL unavailable' });
  }
  function mesh(parent, geometry, material, position, scale) {
    const object = new T.Mesh(geometry, material);
    if (position) object.position.copy(position);
    if (scale) object.scale.set(...scale);
    parent.add(object);
    return object;
  }
  function buildModel() {
    if (!T || !rig) return;
    releaseObject(model);
    model = new T.Group();
    rig.add(model);
    const cfg = CONFIG[state.phase];
    const [color, pale, nuclear, accent] = PALETTES[state.phase];
    const dark = state.theme === 'dark';
    const sphere = new T.SphereGeometry(1, modest ? 28 : 32, modest ? 20 : 24);
    const shell = new T.MeshPhysicalMaterial({ color, transparent: true, opacity: dark ? 0.32 : 0.38,
      roughness: 0.24, metalness: 0.02, clearcoat: 1, clearcoatRoughness: 0.17,
      side: T.DoubleSide, depthWrite: false });
    const inner = new T.MeshPhysicalMaterial({ color: pale, transparent: true, opacity: 0.11,
      roughness: 0.56, metalness: 0, side: T.BackSide, depthWrite: false });
    const nucleusMaterial = new T.MeshPhysicalMaterial({ color: nuclear, transparent: true,
      opacity: 0.57, roughness: 0.35, clearcoat: 0.5, depthWrite: false });
    const dnaMaterial = new T.MeshStandardMaterial({ color: accent, roughness: 0.42,
      emissive: accent, emissiveIntensity: dark ? 0.35 : 0.08 });
    const ringMaterial = new T.MeshStandardMaterial({ color: accent, roughness: 0.35, metalness: 0.1 });
    const center = new T.Vector3(-0.42, -0.20, 0);
    const axis = new T.Vector3(0.77, 0.64, 0).normalize();
    const budCenter = center.clone().addScaledVector(axis, 1.04 + cfg.bud * 0.76 + cfg.separation);
    const mother = mesh(model, sphere, shell, center, [0.96, 1.16, 0.88]);
    mother.name = 'mother-cell-wall-schematic';
    mesh(model, sphere, inner, center, [0.91, 1.10, 0.83]);
    if (cfg.bud) {
      mesh(model, sphere, shell, budCenter, [cfg.bud * 0.93, cfg.bud * 1.05, cfg.bud * 0.9]).name = 'bud-or-daughter-schematic';
      if (!cfg.separation) {
        const ring = mesh(model, new T.TorusGeometry(0.19, 0.028, 10, 40), ringMaterial,
          center.clone().addScaledVector(axis, 0.96));
        ring.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), axis);
        ring.name = 'bud-neck-schematic';
      }
    }
    // A smooth nuclear envelope and chromatin coils: not literal chromosome number.
    const nucleus = (position, scale = 1) => {
      const group = new T.Group();
      group.position.copy(position); group.scale.setScalar(scale); model.add(group);
      mesh(group, sphere, nucleusMaterial, null, [0.33, 0.36, 0.31]);
      for (let strand = 0; strand < 2; strand++) {
        const pts = [];
        for (let i = 0; i < 34; i++) {
          const u = i / 33, angle = u * Math.PI * 4.3 + strand * Math.PI;
          pts.push(new T.Vector3(Math.cos(angle) * (0.10 + Math.sin(u * 7) * 0.025),
            (u - 0.5) * 0.40, Math.sin(angle) * 0.11));
        }
        mesh(group, new T.TubeGeometry(new T.CatmullRomCurve3(pts), 44, 0.014, 5, false), dnaMaterial);
      }
      group.name = 'nuclear-envelope-and-chromatin-schematic';
      return group;
    };
    const n1 = center.clone().add(new T.Vector3(0.24, 0.13, 0.19));
    if (cfg.mitosis) {
      const n2 = budCenter.clone().addScaledVector(axis, -0.15);
      n2.z = 0.11;
      nucleus(n1, 0.91); nucleus(n2, 0.82);
      const direction = n2.clone().sub(n1), length = direction.length();
      const midpoint = n1.clone().add(n2).multiplyScalar(0.5);
      const bridge = mesh(model, new T.CylinderGeometry(0.105, 0.12, length, 18), nucleusMaterial, midpoint);
      bridge.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), direction.normalize());
      bridge.name = 'continuous-mitotic-nuclear-envelope-schematic';
      const spindle = mesh(model, new T.CylinderGeometry(0.012, 0.012, length, 7), dnaMaterial, midpoint);
      spindle.quaternion.copy(bridge.quaternion);
    } else {
      nucleus(n1, state.phase === 'G2/M' ? 1.06 : 1);
      if (cfg.separation) nucleus(budCenter.clone().add(new T.Vector3(0, 0, 0.11)), 0.84);
    }
    const vacuoleMaterial = new T.MeshPhysicalMaterial({ color: pale, transparent: true, opacity: 0.22,
      roughness: 0.19, clearcoat: 0.8, depthWrite: false });
    mesh(model, sphere, vacuoleMaterial, center.clone().add(new T.Vector3(-0.29, -0.28, 0.05)), [0.33, 0.43, 0.31]).name = 'vacuole-schematic';
    // A few intracellular granules add depth; their number carries no data.
    const grainMaterial = new T.MeshStandardMaterial({ color: pale, roughness: 0.5,
      transparent: true, opacity: dark ? 0.5 : 0.65 });
    const grainGeometry = new T.SphereGeometry(1, 10, 8);
    for (let i = 0; i < 14; i++) {
      const a = i * 2.39996, r = 0.43 + (i % 3) * 0.075;
      const p = center.clone().add(new T.Vector3(Math.cos(a) * r, Math.sin(a) * r * 1.18, Math.sin(i * 1.9) * 0.39));
      mesh(model, grainGeometry, grainMaterial, p, [0.032, 0.032, 0.032]);
    }
    if (cfg.separation) {
      const scar = mesh(model, new T.TorusGeometry(0.17, 0.015, 8, 32), ringMaterial,
        center.clone().addScaledVector(axis, 1.02));
      scar.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), axis);
    }
    paint();
  }
  function applyTheme() {
    host.dataset.theme = state.theme;
    if (renderer) {
      renderer.setClearColor(0x000000, 0);
      keyLight.intensity = state.theme === 'dark' ? 3.8 : 3.1;
      fillLight.intensity = state.theme === 'dark' ? 2.0 : 1.45;
      particleMaterial.color.set(state.theme === 'dark' ? '#a7c5d8' : '#7094a5');
      particleMaterial.opacity = state.theme === 'dark' ? 0.4 : 0.3;
      buildModel();
    } else if (state.mode === 'fallback') drawFallback();
  }
  function setPhase(phase) {
    if (state.destroyed) return;
    const next = phaseName(phase);
    if (state.phase === next) return;
    state.phase = next; host.dataset.phase = next;
    host.style.setProperty('--yv3d-phase', PALETTES[next][0]);
    if (state.mode === 'webgl') buildModel(); else if (state.mode === 'fallback') drawFallback();
    options.onPhase?.(next);
  }
  function setTheme(theme) {
    if (state.destroyed) return;
    const next = theme === 'dark' ? 'dark' : 'light';
    if (next === state.theme) return;
    state.theme = next; applyTheme();
  }
  function setMotion(enabled) { state.motion = Boolean(enabled); refreshLoop(); }
  function setReducedMotion(reduced) { state.reduced = Boolean(reduced); refreshLoop(); }
  function setPaused(paused) { state.paused = Boolean(paused); refreshLoop(); }
  function resetView() { state.rotationX = -0.12; state.rotationY = -0.32; state.zoom = initialZoom; paint(); }
  function destroy() {
    if (state.destroyed) return;
    state.destroyed = true; state.active = false;
    if (interactionRaf) cancelAnimationFrame(interactionRaf);
    renderer?.setAnimationLoop(null);
    removers.forEach(remove => remove());
    observer?.disconnect(); resizeObserver?.disconnect(); pointers.clear();
    if (scene) releaseObject(scene);
    renderer?.dispose(); renderer?.forceContextLoss(); renderer = null;
    host.remove();
    if (instances.get(container) === controller) instances.delete(container);
  }
  function pointerDown(event) {
    if (state.mode !== 'webgl' || (event.pointerType === 'mouse' && event.button !== 0)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    host.setPointerCapture?.(event.pointerId);
    host.classList.add('is-dragging');
    if (event.pointerType === 'mouse') host.focus({ preventScroll: true });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()]; pinchDistance = Math.hypot(a.x-b.x, a.y-b.y);
    }
  }
  function pointerMove(event) {
    const previous = pointers.get(event.pointerId);
    if (!previous) return;
    event.preventDefault();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 1) {
      state.rotationY += (event.clientX - previous.x) * 0.008;
      state.rotationX = clamp(state.rotationX + (event.clientY - previous.y) * 0.008, -1.2, 1.2);
    } else if (pointers.size === 2) {
      const [a, b] = [...pointers.values()], distance = Math.hypot(a.x-b.x, a.y-b.y);
      if (pinchDistance > 0) state.zoom = clamp(state.zoom * distance / pinchDistance, 0.7, 1.5);
      pinchDistance = distance;
    }
    if (!interactionRaf) interactionRaf = requestAnimationFrame(() => { interactionRaf = 0; paint(); });
  }
  function pointerUp(event) {
    pointers.delete(event.pointerId); pinchDistance = 0;
    if (!pointers.size) host.classList.remove('is-dragging');
    if (host.hasPointerCapture?.(event.pointerId)) host.releasePointerCapture(event.pointerId);
  }
  listen(host, 'pointerdown', pointerDown);
  listen(host, 'pointermove', pointerMove);
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => listen(host, type, pointerUp));
  listen(host, 'wheel', event => {
    if (state.mode !== 'webgl') return;
    event.preventDefault();
    state.zoom = clamp(state.zoom * Math.exp(-event.deltaY * 0.001), 0.7, 1.5); paint();
  }, { passive: false });
  listen(host, 'keydown', event => {
    if (state.mode !== 'webgl') return;
    const actions = {
      ArrowLeft: () => state.rotationY -= 0.13, ArrowRight: () => state.rotationY += 0.13,
      ArrowUp: () => state.rotationX = clamp(state.rotationX - 0.13, -1.2, 1.2),
      ArrowDown: () => state.rotationX = clamp(state.rotationX + 0.13, -1.2, 1.2),
      '+': () => state.zoom = clamp(state.zoom + 0.08, 0.7, 1.5),
      '=': () => state.zoom = clamp(state.zoom + 0.08, 0.7, 1.5),
      '-': () => state.zoom = clamp(state.zoom - 0.08, 0.7, 1.5), Home: resetView
    };
    if (actions[event.key]) { event.preventDefault(); actions[event.key](); paint(); }
  });
  listen(document, 'visibilitychange', refreshLoop);
  listen(window, 'resize', resize);
  listen(motionQuery, 'change', event => { state.systemReduced = event.matches; refreshLoop(); });
  if ('ResizeObserver' in window) { resizeObserver = new ResizeObserver(resize); resizeObserver.observe(host); }
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      state.visible = entries[0]?.isIntersecting ?? true; refreshLoop();
    }, { threshold: 0.01 });
    observer.observe(host);
  }
  const controller = { setPhase, setTheme, setMotion, setReducedMotion, setPaused,
    setLabels, resetView, resize, destroy, getState, ready: null };
  instances.set(container, controller);
  controller.ready = loadThree().then(three => {
    if (state.destroyed) return controller;
    T = three;
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' });
      if (!context) throw new Error('WebGL 2 unavailable');
      renderer = new T.WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.prepend(renderer.domElement);
      listen(canvas, 'webglcontextlost', event => { event.preventDefault(); fallback(new Error('WebGL context lost')); });
      scene = new T.Scene();
      camera = new T.PerspectiveCamera(39, 1, 0.1, 40);
      camera.position.set(0, 0, 6.8); camera.lookAt(0, 0.05, 0);
      rig = new T.Group(); scene.add(rig);
      scene.add(new T.HemisphereLight('#f1f8ff', '#6f7986', 2.0));
      keyLight = new T.DirectionalLight('#fff7e8', 3.1); keyLight.position.set(-3, 4, 5); scene.add(keyLight);
      fillLight = new T.DirectionalLight('#c3e9ff', 1.45); fillLight.position.set(4, -1, 2); scene.add(fillLight);
      const rim = new T.DirectionalLight('#e4dcff', 2.6); rim.position.set(0, 2, -4); scene.add(rim);
      const positions = new Float32Array(48 * 3);
      for (let i = 0; i < 48; i++) {
        const angle = i * 2.399963, radius = 2.0 + (i % 7) * 0.17;
        positions[i*3] = Math.cos(angle) * radius;
        positions[i*3+1] = Math.sin(angle) * radius * 0.8;
        positions[i*3+2] = -1.3 + Math.sin(i * 1.73) * 0.7;
      }
      const particleGeometry = new T.BufferGeometry();
      particleGeometry.setAttribute('position', new T.BufferAttribute(positions, 3));
      particleMaterial = new T.PointsMaterial({ color: '#7094a5', size: 0.025, transparent: true,
        opacity: 0.3, depthWrite: false, sizeAttenuation: true });
      particles = new T.Points(particleGeometry, particleMaterial); scene.add(particles);
      state.mode = 'webgl'; host.dataset.mode = 'webgl';
      host.style.setProperty('--yv3d-phase', PALETTES[state.phase][0]);
      applyTheme(); resize(); emit();
    } catch (error) { fallback(error); }
    return controller;
  }).catch(error => { fallback(error); return controller; });
  resize();
  return controller;
}

const YV3D = Object.freeze({ mount, phases: PHASES, palettes: PALETTES });
window.YV3D = YV3D;
window.dispatchEvent(new CustomEvent('yv3d:ready'));
export { mount, PHASES, YV3D };
export default YV3D;
