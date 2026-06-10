/*!
 * 魏聪 — 产品经理个人站 · 科技感主题
 * Particles / Typewriter / Scroll progress
 */
const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="60" fill="url(#avatarBg)"/>
  <circle cx="60" cy="42" r="20" fill="rgba(255,255,255,0.9)"/>
  <path d="M30 62 Q30 90 60 95 Q90 90 90 62" fill="rgba(255,255,255,0.85)"/>
  <circle cx="50" cy="40" r="8" fill="none" stroke="#0a0a0f" stroke-width="1.5"/>
  <circle cx="70" cy="40" r="8" fill="none" stroke="#0a0a0f" stroke-width="1.5"/>
  <line x1="58" y1="40" x2="62" y2="40" stroke="#0a0a0f" stroke-width="1.5"/>
  <path d="M52 50 Q60 56 68 50" fill="none" stroke="#0a0a0f" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

/* ───────── Particle Animation ───────── */
function initParticles() {
  const existing = document.getElementById('particles-canvas');
  if (existing) existing.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];
  const COUNT = 80;
  const MAX_DIST = 120;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.5,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,240,255,0.3)';
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,240,255,${0.08 * (1 - dist / MAX_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ──────── Typewriter Effect ──────── */
function initTypewriter(el, texts, { typeDelay = 80, deleteDelay = 40, pauseAfter = 2000 } = {}) {
  if (!el) return;
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let cursor = el.querySelector('.cursor') || (() => { const c = document.createElement('span'); c.className = 'cursor'; c.textContent = '|'; el.appendChild(c); return c; })();

  function tick() {
    const current = texts[textIndex];
    if (!isDeleting) {
      el.innerHTML = current.slice(0, charIndex + 1) + ' <span class="cursor">|</span>';
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfter);
        return;
      }
      setTimeout(tick, typeDelay);
    } else {
      el.innerHTML = current.slice(0, charIndex - 1) + ' <span class="cursor">|</span>';
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      setTimeout(tick, deleteDelay);
    }
  }
  tick();
}

/* ──────── Scroll Progress ──────── */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  });
}

/* ───────── Boot ───────── */
document.addEventListener('DOMContentLoaded', function () {
  // Set avatar SVG
  document.querySelectorAll('.hero-avatar, .about-avatar-img').forEach(el => {
    el.innerHTML = avatarSvg;
  });

  // Mobile nav
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // Particles
  initParticles();

  // Scroll progress
  initScrollProgress();

  // Typewriter
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    initTypewriter(subtitle, [
      '8年经验产品经理 · 互联网医疗 / 电商 / SaaS',
      '从0到1 · 千万级用户产品 · 数据驱动决策',
      'Axure / 墨刀 · 数据分析 · 敏捷开发 · 团队管理',
    ]);
  }
});
