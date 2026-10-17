'use strict';
(() => {
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas?.getContext('2d', { alpha: true });
  if (!ctx) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const modest = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  const interval = 1000 / (modest ? 20 : 30);
  let w = 1, h = 1, raf = 0, resizeRaf = 0, frames = 0, last = 0;
  let enabled = true, userReduced = false, scrollUntil = 0, dots = [], colors;
  const pointer = { x: .5, y: .5, targetX: .5, targetY: .5 };
  function palette() {
    const style = getComputedStyle(document.documentElement);
    const dark = document.documentElement.dataset.theme === 'dark';
    const read = (name, fallback) => style.getPropertyValue(name).trim() || fallback;
    colors = {
      dark,
      jade: read('--ambient-rgb', dark ? '72, 224, 176' : '22, 130, 112'),
      gold: read('--ambient-gold-rgb', dark ? '231, 188, 112' : '181, 139, 65'),
      blue: read('--ambient-blue-rgb', dark ? '95, 121, 229' : '85, 120, 179')
    };
  }
  function paint(time = 0) {
    if (!enabled || document.hidden) return;
    ctx.clearRect(0, 0, w, h);
    pointer.x += (pointer.targetX - pointer.x) * .045;
    pointer.y += (pointer.targetY - pointer.y) * .045;
    const drift = Math.sin(time * .000045), lift = Math.cos(time * .000033);
    const px = (pointer.x - .5) * 34, py = (pointer.y - .5) * 22;
    const opacity = colors.dark ? .17 : .075;
    const auroras = [
      [w * (.68 + drift * .045) + px, h * (.16 + lift * .05) + py, w * .55, colors.jade, opacity],
      [w * .96 - px, h * (.62 + drift * .08), w * .40, colors.blue, opacity * .72],
      [w * (.38 - drift * .03), h * .91 - py, w * .34, colors.gold, opacity * .45]
    ];
    for (const [x, y, radius, color, alpha] of auroras) {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(radius, h * .35));
      gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
      gradient.addColorStop(.48, `rgba(${color}, ${alpha * .42})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
    }
    for (let i = 0; i < 2; i++) {
      const gradient = ctx.createLinearGradient(w * .1, h * .2, w, h * .8);
      const color = i ? colors.gold : colors.jade;
      gradient.addColorStop(0, `rgba(${color},0)`);
      gradient.addColorStop(.48, `rgba(${color},${colors.dark ? .14 : .075})`);
      gradient.addColorStop(1, `rgba(${color},0)`);
      ctx.strokeStyle = gradient; ctx.lineWidth = i ? .75 : 1;
      ctx.beginPath();
      ctx.moveTo(w * .10, h * (.82 - i * .12));
      ctx.bezierCurveTo(w * .37, h * (-.12 + drift * .025 + i * .17), w * .95, h * (.19 + i * .18), w * 1.03, h * .75);
      ctx.stroke();
    }
    for (const dot of dots) {
      const x = dot.x + Math.sin(time * .00007 + dot.phase) * 16 + px * .25;
      const y = dot.y + Math.cos(time * .00005 + dot.phase) * 21 + py * .25;
      const alpha = dot.alpha * (.72 + Math.sin(time * .0004 + dot.phase) * .28);
      ctx.fillStyle = `rgba(${dot.gold ? colors.gold : colors.jade},${alpha})`;
      ctx.beginPath(); ctx.arc(x, y, dot.r, 0, Math.PI * 2); ctx.fill();
    }
    frames++;
  }
  function animate(time) {
    raf = 0;
    if (!enabled || document.hidden || reduced.matches || userReduced) return;
    const inputPending = navigator.scheduling?.isInputPending?.() || false;
    if (!inputPending && time >= scrollUntil && time - last >= interval - .5) { last = time; paint(time); }
    raf = requestAnimationFrame(animate);
  }
  function schedule() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0; last = 0;
    if (!enabled) { ctx.clearRect(0, 0, w, h); return; }
    if (document.hidden) return;
    paint(performance.now());
    if (!reduced.matches && !userReduced) raf = requestAnimationFrame(animate);
  }
  function resize() {
    resizeRaf = 0;
    w = Math.max(1, innerWidth); h = Math.max(1, innerHeight);
    const scale = Math.min(devicePixelRatio || 1, 1.25, 1600 / w, 1100 / h);
    canvas.width = Math.round(w * scale); canvas.height = Math.round(h * scale);
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    dots = Array.from({ length: Math.min(modest ? 26 : 42, Math.floor(w / 27)) }, (_, i) => ({
      x: ((i * .6180339887) % 1) * w, y: ((i * .41421356 + .17) % 1) * h,
      r: .7 + (i % 4) * .35, phase: i * 1.7, gold: i % 5 === 0, alpha: colors.dark ? .32 : .17
    }));
    schedule();
  }
  window.YV_AMBIENT = {
    configure: ({ enabled: next = enabled, reducedMotion = userReduced } = {}) => {
      const changed = enabled !== next || userReduced !== reducedMotion;
      enabled = Boolean(next); userReduced = Boolean(reducedMotion);
      if (changed) schedule();
    },
    refresh: () => { palette(); schedule(); },
    getState: () => ({ enabled, running: !!raf, frames, maxFps: modest ? 20 : 30, pixelWidth: canvas.width, pixelHeight: canvas.height, reduced: userReduced || reduced.matches })
  };
  window.addEventListener('resize', () => { if (!resizeRaf) resizeRaf = requestAnimationFrame(resize); }, { passive: true });
  window.addEventListener('pointermove', event => { pointer.targetX = event.clientX / w; pointer.targetY = event.clientY / h; }, { passive: true });
  window.addEventListener('scroll', () => { scrollUntil = performance.now() + 100; }, { passive: true, capture: true });
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', schedule);
  new MutationObserver(() => { palette(); schedule(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  palette(); resize();
})();
