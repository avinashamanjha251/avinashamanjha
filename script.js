/* ============================================================
   AVINASH AMAN — script.js V2
   Cursor, reveal, tabs, accordion, case study nav, toast
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══ Custom Cursor ══ */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
  });

  (function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(animateRing);
  })();

  // Expand cursor on interactive elements
  document.querySelectorAll('a, button, [onclick], .rd-trigger, .cs-nav-btn, .tab, .val-card, .ent-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-expanded'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-expanded'));
  });

  /* ══ Sticky Nav ══ */
  const nav = document.getElementById('mainNav');
  const handleScroll = () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
    updateScrollSpy();
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ══ Mobile Menu ══ */
  const mBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  mBtn?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    mBtn.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    mBtn.querySelector('i').className = 'fa-solid fa-bars';
  }));

  /* ══ ScrollSpy ══ */
  const sections = document.querySelectorAll('section[id]');
  function updateScrollSpy() {
    const y = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 130;
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', y >= top && y < top + sec.offsetHeight);
    });
  }

  /* ══ Scroll Reveal ══ */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ══ Project Tabs (Enterprise / R&D) ══ */
  const tabs = document.querySelectorAll('[data-tab]');
  const entGrid = document.getElementById('entGrid');
  const rdList = document.getElementById('rdList');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    t.classList.add('active');
    if (t.dataset.tab === 'enterprise') {
      entGrid.style.display = 'grid';
      rdList.style.display = 'none';
    } else {
      entGrid.style.display = 'none';
      rdList.style.display = 'flex';
    }
  }));

  /* ══ R&D Accordion ══ */
  document.querySelectorAll('.rd-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.rd-item');
      const panel = item.querySelector('.rd-panel');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.rd-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.rd-panel').classList.remove('open');
      });
      if (!isOpen) { item.classList.add('open'); panel.classList.add('open'); }
    });
  });

  /* ══ Case Study Nav ══ */
  const csNavBtns = document.querySelectorAll('.cs-nav-btn');
  const csArticles = document.querySelectorAll('.cs-article');
  csNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      csNavBtns.forEach(b => b.classList.remove('active'));
      csArticles.forEach(a => a.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.cs;
      document.getElementById(target)?.classList.add('active');
    });
  });

  /* ══ Toast ══ */
  window.copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
      .then(() => showToast(`${label} copied!`))
      .catch(() => showToast('Could not copy'));
  };
  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.innerHTML = `<i class="fa-solid fa-check"></i>${msg}`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ══ Year ══ */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ══ Smooth counter animation for hero stats ══ */
  function animateCount(el, end, suffix) {
    let start = 0;
    const dur = 1200;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / dur, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * end) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const vals = [
          { el: document.getElementById('stat1'), n: 10, suf: '+' },
          { el: document.getElementById('stat2'), n: 200, suf: 'K+' },
          { el: document.getElementById('stat3'), n: 8, suf: '+' },
          { el: document.getElementById('stat4'), n: 0, suf: '' },
        ];
        vals.forEach(v => { if (v.el) animateCount(v.el, v.n, v.suf); });
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) statsObs.observe(statsEl);
});
