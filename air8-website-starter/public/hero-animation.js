// The hero rebuilds #heroTitle into per-letter spans for the animation, so
// it can't use the shared data-content-key path (that sets textContent).
// Instead we wait for the content map and read the admin's headline from it.
// Waiting on contentReady also removes any flash between the HTML default and
// an edited headline. Falls back to the default if content never loads.
(window.contentReady || Promise.resolve({})).then(function (content) {
  startHero((content && content['home.hero.title']) || 'We move air.\nWe control sound.');
});

function startHero(headlineRaw) {
  const root = document.getElementById('a8Hero');
  const canvas = document.getElementById('heroCanvas');
  const titleEl = document.getElementById('heroTitle');
  if (!root || !canvas || !titleEl) return;

  const accent = '3ce0ff';
  root.style.setProperty('--accent', '#' + accent);
  const [ar, ag, ab] = hexToRgb(accent);

  // Lines can be separated by a real newline (from the admin textarea) or the
  // legacy "|" — accept both.
  const headline = headlineRaw.split(/\r?\n|\|/).filter(Boolean).join('|');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build letter spans for the reveal animation
  titleEl.innerHTML = headline.split('|').map(line => {
    const words = line.split(' ').filter(Boolean).map(word => {
      const chars = word.split('').map(ch => `<span class="letter">${ch}</span>`).join('');
      return `<span class="word">${chars}</span>`;
    }).join('');
    return `<span class="line">${words}</span>`;
  }).join('');

  const letters = titleEl.querySelectorAll('.letter');
  if (window.gsap) gsap.set(letters, { opacity: 0 });
  else letters.forEach(l => (l.style.opacity = 0));

  function hexToRgb(hex) {
    const n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  const ctx = canvas.getContext('2d');
  let w = 1, h = 1, dpr = 1;
  let particles = [];
  let waves = [];
  let waveAcc = 0;
  let last = performance.now();
  let played = false, playing = false, playStart = 0;
  let turb = 0.14;
  const turbLo = 0.14;
  let turbHi = 1;
  let turbDur = 3900;

  function resize() {
    const r = canvas.getBoundingClientRect();
    w = Math.max(1, r.width);
    h = Math.max(1, r.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const density = 1;
    const count = Math.min(360, Math.floor((w * h) / 8600 * density));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 0.5 + Math.random() * 1.7,
        a: 0.18 + Math.random() * 0.5,
        tint: Math.random(),
        seed: Math.random() * 1000
      });
    }
  }

  function flowAngle(x, y, t) {
    return Math.sin(x * 0.0021 + t * 0.18) * 1.1 +
           Math.cos(y * 0.0026 - t * 0.14) * 0.9 +
           Math.sin((x + y) * 0.0012 + t * 0.09) * 0.7;
  }

  function play() {
    if (played) return;
    played = true;
    playing = true;
    playStart = performance.now();
    if (reduced) { turbHi = 0.16; turbDur = 700; }
    animateLetters();
  }

  function animateLetters() {
    if (!window.gsap) {
      setTimeout(() => letters.forEach(l => (l.style.opacity = 1)), 300);
      return;
    }
    const gsap = window.gsap;
    gsap.killTweensOf(letters);
    if (reduced) {
      gsap.fromTo(letters, { opacity: 0, y: 14 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        stagger: { each: 0.02, from: 'start' }
      });
      return;
    }
    const tl = gsap.timeline();
    tl.fromTo(letters, { opacity: 0, filter: 'blur(20px)' }, {
      opacity: 1, filter: 'blur(0px)', duration: 1.0, ease: 'power2.out',
      stagger: { each: 0.05, from: 'random' }
    }, 0);
    tl.fromTo(letters, {
      x: () => (Math.random() * 2 - 1) * w * 0.5,
      y: () => (Math.random() * 2 - 1) * h * 0.42,
      rotation: () => (Math.random() * 2 - 1) * 75,
      scale: () => 0.35 + Math.random() * 0.7
    }, {
      x: 0, y: 0, rotation: 0, scale: 1, duration: 1.9,
      ease: 'elastic.out(0.82,0.52)',
      stagger: { each: 0.05, from: 'random' }
    }, 0);
  }

  function drawParticles(dt, t) {
    const base = reduced ? 26 : 66;
    const speedT = reduced ? 0.35 : 1;
    ctx.lineCap = 'round';
    for (const p of particles) {
      const a = flowAngle(p.x, p.y, t + p.seed * 0.01);
      const vx = base * (0.85 + Math.cos(a) * 0.7 * (0.55 + turb)) * speedT;
      const vy = base * (Math.sin(a) * 0.95 * (0.35 + turb * 1.7) + Math.sin(p.seed + t * 0.6) * 0.25 * turb) * speedT;
      p.x += vx * dt;
      p.y += vy * dt;
      if (p.x > w + 24) { p.x = -20; p.y = Math.random() * h; }
      if (p.x < -24) p.x = w + 20;
      if (p.y > h + 24) p.y = -20;
      if (p.y < -24) p.y = h + 20;
      const sl = 0.9 + turb * 2.6;
      const ex = p.x - vx * sl * 0.02, ey = p.y - vy * sl * 0.02;
      const alpha = p.a * (0.4 + 0.6 * Math.min(1, turb + 0.28));
      ctx.strokeStyle = p.tint > 0.62 ? `rgba(${ar},${ag},${ab},${alpha})` : `rgba(226,238,250,${alpha * 0.75})`;
      ctx.lineWidth = p.size;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  }

  function drawPressureWaves(dt) {
    waveAcc += dt;
    const interval = 0.42;
    if (turb > 0.32 && waveAcc > interval && !reduced) {
      waveAcc = 0;
      waves.push({ x: w * (0.55 + Math.random() * 0.3), y: h * (0.2 + Math.random() * 0.4), r: 4, life: 1 });
    }
    for (let i = waves.length - 1; i >= 0; i--) {
      const wv = waves[i];
      wv.r += (120 + 180 * turb) * dt;
      wv.life -= dt * 0.7;
      if (wv.life <= 0) { waves.splice(i, 1); continue; }
      ctx.strokeStyle = `rgba(${ar},${ag},${ab},${wv.life * turb * 0.4})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawSpiral(t) {
    const cx = w * 0.82, cy = h * 0.36;
    const maxR = Math.min(w, h) * (w < 720 ? 0.34 : 0.3);
    const rings = [0.32, 0.5, 0.68, 0.86, 1];
    ctx.lineCap = 'round';
    rings.forEach((rf, ri) => {
      const r = maxR * rf;
      const dots = 20;
      const rot = t * (0.14 + ri * 0.05) * (1 + turb * 0.6);
      const dir = ri % 2 === 0 ? 1 : -1;
      for (let i = 0; i < dots; i++) {
        const ang = (i / dots) * Math.PI * 2 + rot * dir;
        const x = cx + Math.cos(ang) * r, y = cy + Math.sin(ang) * r;
        const tang = ang + (Math.PI / 2) * dir;
        const len = 5 + turb * 6;
        const ex = x + Math.cos(tang) * len, ey = y + Math.sin(tang) * len;
        ctx.strokeStyle = `rgba(${ar},${ag},${ab},${0.06 + 0.05 * turb})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(${ar},${ag},${ab},0.035)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.fillStyle = `rgba(${ar},${ag},${ab},${0.14 + turb * 0.12})`;
    ctx.beginPath();
    ctx.arc(cx, cy, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawSoundwave(t) {
    const amp = Math.max(0, (turb - turbLo) / (1 - turbLo));
    const groupA = Math.min(1, amp * 1.25);
    if (groupA < 0.01) return;
    const bx = Math.max(24, w * 0.062);
    const by = h - Math.max(70, h * 0.11);
    const bars = 30, gap = 6;
    ctx.font = '10px "Space Mono", monospace';
    ctx.fillStyle = `rgba(${ar},${ag},${ab},${groupA * 0.6})`;
    ctx.fillText('SOUND ATTENUATION', bx, by - 16);
    for (let i = 0; i < bars; i++) {
      const env = Math.sin((i / bars) * Math.PI);
      const hgt = amp * env * (0.35 + 0.65 * Math.abs(Math.sin(i * 0.55 + t * 5.5))) * 34;
      const x = bx + i * gap;
      ctx.strokeStyle = `rgba(${ar},${ag},${ab},${groupA * 0.85})`;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(x, by - hgt / 2);
      ctx.lineTo(x, by + hgt / 2);
      ctx.stroke();
    }
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (playing) {
      const p = Math.min(1, (now - playStart) / turbDur);
      const e = 1 - Math.pow(1 - p, 3);
      turb = turbHi + (turbLo - turbHi) * e;
    } else {
      turb = turbLo;
    }
    const t = now / 1000;
    ctx.clearRect(0, 0, w, h);
    drawSpiral(t);
    drawParticles(dt, t);
    drawPressureWaves(dt);
    drawSoundwave(t);
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting && en.intersectionRatio > 0.3) play(); });
  }, { threshold: [0, 0.3, 0.6] });
  io.observe(root);
  setTimeout(play, 4200); // safety net if it never enters viewport

  requestAnimationFrame(loop);
}