'use strict';
(() => {
  if (window.YV_COSMOS) return;
  // Keep the existing preferences contract; only one background renderer runs.
  const previous = window.YV_AMBIENT;
  const preferences = (() => { try { return JSON.parse(localStorage.getItem('yv.preferences') || '{}'); } catch { return {}; } })();
  const previousState = previous?.getState?.() || {};
  previous?.configure?.({ enabled: false });
  const oldCanvas = document.getElementById('ambient-canvas');
  if (oldCanvas) oldCanvas.hidden = true;
  const canvas = document.createElement('canvas');
  canvas.id = 'cosmos-canvas'; canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  document.documentElement.classList.add('cosmos-theme');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const modest = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  const maxFps = modest ? 15 : 24;
  let width = 1, height = 1, stars = [], frame = 0, resizeFrame = 0, last = 0, frames = 0;
  let enabled = previousState.enabled !== false, userReduced = Boolean(preferences.reducedMotion), scrollUntil = 0;
  let dark = document.documentElement.dataset.theme !== 'light';
  let px = 0, py = 0, targetX = 0, targetY = 0;
  const interval = 1000 / maxFps;
  function random(i, salt = 0) { const value = Math.sin((i + 1) * 127.1 + salt * 311.7) * 43758.5453123; return value - Math.floor(value); }
  function paint(now = 0) {
    if (!enabled || document.hidden) return;
    ctx.clearRect(0, 0, width, height);
    const frozen = motion.matches || userReduced;
    px += (targetX - px) * .06; py += (targetY - py) * .06;
    const clock = frozen ? 0 : now;
    for (const star of stars) {
      const depth = star.depth;
      const x = (star.x + Math.sin(clock * .000017 + star.phase) * 9 + (frozen ? 0 : px * depth) + width) % width;
      const y = (star.y + Math.cos(clock * .000013 + star.phase) * 7 + (frozen ? 0 : py * depth) + height) % height;
      const pulse = .73 + .27 * Math.sin(clock * star.speed + star.phase);
      const opacity = star.alpha * pulse * (dark ? 1 : .44);
      ctx.fillStyle = `rgba(${dark ? star.color : '55, 83, 130'},${opacity})`;
      ctx.beginPath(); ctx.arc(x, y, star.radius, 0, Math.PI * 2); ctx.fill();
      if (star.bright && dark) {
        ctx.strokeStyle = `rgba(175,207,255,${opacity * .23})`; ctx.lineWidth = .6;
        ctx.beginPath(); ctx.moveTo(x - 3.5, y); ctx.lineTo(x + 3.5, y); ctx.moveTo(x, y - 3.5); ctx.lineTo(x, y + 3.5); ctx.stroke();
      }
    }
    frames++;
  }
  function animate(now) {
    frame = 0;
    if (!enabled || document.hidden || motion.matches || userReduced) return;
    if (now >= scrollUntil && now - last >= interval - .4 && !navigator.scheduling?.isInputPending?.()) { last = now; paint(now); }
    frame = requestAnimationFrame(animate);
  }
  function schedule() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; last = 0;
    document.documentElement.classList.toggle('cosmos-off', !enabled);
    if (!enabled) { ctx.clearRect(0, 0, width, height); return; }
    if (document.hidden) return;
    paint(performance.now());
    if (!motion.matches && !userReduced) frame = requestAnimationFrame(animate);
  }
  function resize() {
    resizeFrame = 0;
    width = Math.max(1, innerWidth); height = Math.max(1, innerHeight);
    const scale = Math.min(devicePixelRatio || 1, 1.25, 1600 / width, 1000 / height);
    canvas.width = Math.max(1, Math.round(width * scale)); canvas.height = Math.max(1, Math.round(height * scale));
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    const count = Math.min(modest ? 92 : 148, Math.max(46, Math.round(width * height / 9500)));
    stars = Array.from({ length: count }, (_, i) => ({
      x: random(i) * width, y: random(i, 1) * height, phase: random(i, 2) * Math.PI * 2,
      radius: i % 13 === 0 ? 1.12 : .4 + random(i, 3) * .55,
      depth: .25 + random(i, 4) * .75, speed: .00016 + random(i, 5) * .00026,
      alpha: .24 + random(i, 6) * .6, bright: i % 17 === 0,
      color: i % 11 === 0 ? '199,180,244' : i % 4 === 0 ? '123,183,242' : '198,222,255'
    }));
    schedule();
  }
  const api = {
    configure({ enabled: next = enabled, reducedMotion = userReduced } = {}) {
      const changed = enabled !== Boolean(next) || userReduced !== Boolean(reducedMotion);
      enabled = Boolean(next); userReduced = Boolean(reducedMotion);
      if (changed) schedule();
    },
    refresh() { dark = document.documentElement.dataset.theme !== 'light'; schedule(); },
    getState() { return { enabled, running: Boolean(frame), frames, maxFps, pixelWidth: canvas.width, pixelHeight: canvas.height, reduced: userReduced || motion.matches, stars: stars.length, renderer: 'cosmos-v5' }; }
  };
  window.YV_AMBIENT = api; window.YV_COSMOS = api;
  window.addEventListener('resize', () => { if (!resizeFrame) resizeFrame = requestAnimationFrame(resize); }, { passive: true });
  window.addEventListener('pointermove', event => { targetX = (event.clientX / width - .5) * 14; targetY = (event.clientY / height - .5) * 10; }, { passive: true });
  window.addEventListener('scroll', () => { scrollUntil = performance.now() + 100; }, { passive: true, capture: true });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', schedule);
  new MutationObserver(() => { dark = document.documentElement.dataset.theme !== 'light'; schedule(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  resize();
})();
