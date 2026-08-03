/* ============================================================
   AVINASH AMAN — script.js V2
   Intro overlay · Custom cursor · Scroll reveal
   Project tabs · R&D accordion · Case study tabs · Toast
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     INTRO OVERLAY
  ══════════════════════════════════════ */
  const overlay    = document.getElementById('intro-overlay');
  const bodySvg    = document.getElementById('intro-body-svg');
  let introTriggered = false;

  function triggerIntro() {
    if (introTriggered) return;
    introTriggered = true;

    // 1. Reveal the body SVG (slides up from below the face)
    if (bodySvg) {
      bodySvg.classList.add('show');
      // 2. Start wave animation after SVG is visible
      setTimeout(() => {
        bodySvg.classList.add('waving');
      }, 500);
    }

    // 3. After waving, dismiss the overlay
    setTimeout(() => {
      if (overlay) {
        overlay.classList.add('exit');
        // Remove from DOM after animation ends
        overlay.addEventListener('animationend', () => {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
        }, { once: true });
      }
    }, 2200);
  }

  // Lock scroll while intro is shown
  if (overlay) {
    document.body.style.overflow = 'hidden';
    // Listen for ANY user gesture
    const gestures = ['mousemove', 'mousedown', 'touchstart', 'keydown', 'scroll'];
    gestures.forEach(evt => {
      window.addEventListener(evt, triggerIntro, { once: true, passive: true });
    });
    // Auto-dismiss after 6 seconds if user is idle
    setTimeout(triggerIntro, 6000);
  }

  /* ══════════════════════════════════════
     CUSTOM CURSOR
  ══════════════════════════════════════ */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
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
  document.querySelectorAll('a, button, [onclick], .rd-trigger, .cs-tab, .tab, .val-card, .ent-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-expanded'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-expanded'));
  });

  /* ══════════════════════════════════════
     STICKY NAV + SCROLL SPY
  ══════════════════════════════════════ */
  const nav = document.getElementById('mainNav');

  function updateScrollSpy() {
    const y = window.pageYOffset;
    document.querySelectorAll('section[id]').forEach(sec => {
      const top  = sec.offsetTop - 130;
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (link) link.classList.toggle('active', y >= top && y < top + sec.offsetHeight);
    });
  }

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 60);
    updateScrollSpy();
  }, { passive: true });

  /* ══════════════════════════════════════
     MOBILE MENU
  ══════════════════════════════════════ */
  const mBtn     = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mBtn?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const icon = mBtn.querySelector('i');
    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
    const icon = mBtn?.querySelector('i');
    if (icon) icon.className = 'fa-solid fa-bars';
  }));

  /* ══════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════ */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ══════════════════════════════════════
     PROJECT TABS (Enterprise / R&D)
  ══════════════════════════════════════ */
  const projTabs = document.querySelectorAll('[data-tab]');
  const entGrid  = document.getElementById('entGrid');
  const rdList   = document.getElementById('rdList');

  projTabs.forEach(t => t.addEventListener('click', () => {
    projTabs.forEach(b => b.classList.remove('active'));
    t.classList.add('active');
    const isEnt = t.dataset.tab === 'enterprise';
    if (entGrid) entGrid.style.display = isEnt ? 'grid' : 'none';
    if (rdList)  rdList.style.display  = isEnt ? 'none'  : 'flex';
  }));

  /* ══════════════════════════════════════
     R&D ACCORDION
  ══════════════════════════════════════ */
  document.querySelectorAll('.rd-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item   = trigger.closest('.rd-item');
      const panel  = item.querySelector('.rd-panel');
      const isOpen = item.classList.contains('open');

      // Close all first
      document.querySelectorAll('.rd-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.rd-panel')?.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        panel?.classList.add('open');
      }
    });
  });

  /* ══════════════════════════════════════
     CASE STUDY FOLDER TABS
  ══════════════════════════════════════ */
  const csTabs     = document.querySelectorAll('.cs-tab');
  const csArticles = document.querySelectorAll('.cs-article');

  csTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update tab active state
      csTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show matching article
      const target = btn.dataset.cs;
      csArticles.forEach(a => {
        a.classList.remove('active');
        a.style.display = 'none';
      });
      const active = document.getElementById(target);
      if (active) {
        active.style.display = 'block';
        active.classList.add('active');
        // Re-trigger reveal animations inside the newly shown article
        active.querySelectorAll('.reveal:not(.visible)').forEach(el => {
          revealObs.observe(el);
        });
      }
    });
  });

  /* ══════════════════════════════════════
     TOAST UTILITY
  ══════════════════════════════════════ */
  window.copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
      .then(() => showToast(`${label} copied!`))
      .catch(() => showToast('Could not copy'));
  };

  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.innerHTML = `<i class="fa-solid fa-check"></i> ${msg}`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ══════════════════════════════════════
     FOOTER YEAR
  ══════════════════════════════════════ */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════
     HERO STAT COUNTER ANIMATION
  ══════════════════════════════════════ */
  function animateCount(el, end, suffix) {
    if (!el) return;
    let start = 0;
    const dur = 1400;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / dur, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCount(document.getElementById('stat1'),  10,  '+');
        animateCount(document.getElementById('stat2'), 200, 'K+');
        animateCount(document.getElementById('stat3'),   8,  '+');
        // stat4 stays "0 failures"
        const s4 = document.getElementById('stat4');
        if (s4) s4.textContent = '0';
      }
    }, { threshold: 0.5 }).observe(statsEl);
  }

});
