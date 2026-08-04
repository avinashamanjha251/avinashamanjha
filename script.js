/* ============================================================
   AVINASH AMAN — script.js V5
   Intro: profile photo wave emoji → morph-right blend
   Slot-roll stat counters on hero enter
   Case study carousel — CSS scroll-snap, auto-swipe
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     INTRO OVERLAY — photo wave → morph right → reveal
  ══════════════════════════════════════ */
  const overlay      = document.getElementById('intro-overlay');
  let   introTriggered = false;

  function triggerIntro() {
    if (introTriggered || !overlay) return;
    introTriggered = true;

    // Animate the wave-hand emoji
    const waveHand = document.getElementById('introWaveHand');
    if (waveHand) waveHand.classList.add('waving');

    // After the wave is clearly visible (~1.6s), start morph-right
    setTimeout(() => {
      if (overlay) overlay.classList.add('morphing');
    }, 1600);

    // After morph completes, fade overlay and clean up
    setTimeout(() => {
      if (overlay) {
        overlay.classList.add('exit');
        overlay.addEventListener('transitionend', () => {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
        }, { once: true });
      }
    }, 2500);
  }

  if (overlay) {
    document.body.style.overflow = 'hidden';
    const gestures = ['mousemove', 'mousedown', 'touchstart', 'keydown'];
    gestures.forEach(evt =>
      window.addEventListener(evt, triggerIntro, { once: true, passive: true })
    );
    // Auto-dismiss after 6s if user stays idle
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
     PROJECT TABS
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
      document.querySelectorAll('.rd-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.rd-panel')?.classList.remove('open');
      });
      if (!isOpen) { item.classList.add('open'); panel?.classList.add('open'); }
    });
  });

  /* ══════════════════════════════════════
     CASE STUDY FOLDER TABS
  ══════════════════════════════════════ */
  const csTabs     = document.querySelectorAll('.cs-tab');
  const csArticles = document.querySelectorAll('.cs-article');
  csTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      csTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      csArticles.forEach(a => { a.classList.remove('active'); a.style.display = 'none'; });
      const active = document.getElementById(btn.dataset.cs);
      if (active) {
        active.style.display = 'block';
        active.classList.add('active');
        active.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObs.observe(el));
      }
    });
  });

  /* ══════════════════════════════════════
     SLOT-ROLL STAT COUNTERS
     Each time hero section enters viewport, rolls and settles
  ══════════════════════════════════════ */
  const statConfig = [
    { id: 'stat1', end: 10,  suffix: '+',   label: 'Years engineering' },
    { id: 'stat2', end: 200, suffix: 'K+',  label: 'Active users' },
    { id: 'stat3', end: 8,   suffix: '+',   label: 'Flagship apps' },
    { id: 'stat4', end: 0,   suffix: '',    label: 'Deployment failures' },
  ];

  function slotRoll(el, end, suffix) {
    const rollDuration   = 900;
    const settleDuration = 900;
    const startTime = performance.now();
    const maxRand = Math.max(end * 3, 50);

    function tick(now) {
      const elapsed = now - startTime;
      if (elapsed < rollDuration) {
        const rand = Math.floor(Math.random() * maxRand);
        el.textContent = rand + suffix;
      } else if (elapsed < rollDuration + settleDuration) {
        const progress = (elapsed - rollDuration) / settleDuration;
        const eased    = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(eased * end) + suffix;
      } else {
        el.textContent = end + suffix;
        return;
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function runSlotRolls() {
    statConfig.forEach(({ id, end, suffix }) => {
      const el = document.getElementById(id);
      if (el) slotRoll(el, end, suffix);
    });
  }

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const heroObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) runSlotRolls();
      });
    }, { threshold: 0.4 });
    heroObs.observe(heroSection);
  }

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
     CASE STUDY CAROUSELS
     CSS scroll-snap: each slide = 100% of track width (frame width)
     No transform math — browser handles snapping natively
  ══════════════════════════════════════ */
  function initCarousels() {
    document.querySelectorAll('.cs-carousel').forEach(carousel => {
      const track         = carousel.querySelector('.cs-carousel-track');
      const dotsContainer = carousel.querySelector('.cs-carousel-dots');
      const slides        = carousel.querySelectorAll('.cs-slide');

      if (!slides.length || !track) return;

      const count = slides.length;
      let current = 0;
      let timer   = null;

      // Build dot indicators dynamically
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'cs-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { goTo(i); resetTimer(); });
        dotsContainer.appendChild(dot);
      });

      function setActiveDot(index) {
        dotsContainer.querySelectorAll('.cs-dot')
          .forEach((d, i) => d.classList.toggle('active', i === index));
      }

      function goTo(index) {
        const next    = ((index % count) + count) % count;
        const isWrap  = (current === count - 1 && next === 0);

        if (isWrap) {
          // Instant jump so we don't scroll backwards through all slides
          track.scrollLeft = 0;
        } else {
          track.scrollTo({ left: next * track.offsetWidth, behavior: 'smooth' });
        }

        current = next;
        setActiveDot(current);
      }

      function resetTimer() {
        clearInterval(timer);
        if (count > 1) timer = setInterval(() => goTo(current + 1), 3200);
      }

      // Keep dots in sync when user swipes manually
      track.addEventListener('scroll', () => {
        const w = track.offsetWidth;
        if (!w) return;
        const i = Math.round(track.scrollLeft / w);
        if (i !== current && i >= 0 && i < count) {
          current = i;
          setActiveDot(current);
          resetTimer();
        }
      }, { passive: true });

      // Start auto-swipe
      resetTimer();
    });
  }
  initCarousels();

  /* Footer year */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
});
