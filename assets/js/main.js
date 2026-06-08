/*!
 * 魏聪 — 产品经理个人站
 * 头像 SVG：简洁几何风格
 */
const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3498db"/>
      <stop offset="100%" stop-color="#2c3e50"/>
    </linearGradient>
  </defs>
  <!-- 圆形背景 -->
  <circle cx="60" cy="60" r="60" fill="url(#avatarBg)"/>
  <!-- 人物轮廓：脑袋 -->
  <circle cx="60" cy="42" r="20" fill="rgba(255,255,255,0.9)"/>
  <!-- 人物轮廓：身体（类似产品经理在思考的姿态） -->
  <path d="M30 62 Q30 90 60 95 Q90 90 90 62" fill="rgba(255,255,255,0.85)"/>
  <!-- 眼镜（体现产品经理/分析者气质） -->
  <circle cx="50" cy="40" r="8" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
  <circle cx="70" cy="40" r="8" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
  <line x1="58" y1="40" x2="62" y2="40" stroke="#2c3e50" stroke-width="1.5"/>
  <!-- 微笑 -->
  <path d="M52 50 Q60 56 68 50" fill="none" stroke="#2c3e50" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

document.addEventListener('DOMContentLoaded', function() {
  // Set avatar SVG to all avatar placeholders
  document.querySelectorAll('.hero-avatar, .about-avatar-img').forEach(el => {
    el.innerHTML = avatarSvg;
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
    // Close nav on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // Fade-in on scroll (Intersection Observer)
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }
});
