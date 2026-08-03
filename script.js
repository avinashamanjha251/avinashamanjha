/* =============================================================
   Avinash Aman — Portfolio Script
   Premium interactions, cursor, scroll animations, accordions
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) { cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px'; }
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* ── Sticky nav ── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) { nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
    updateScrollSpy();
  }, { passive: true });

  /* ── Mobile menu ── */
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const mobileIcon = mobileBtn?.querySelector('i');

  mobileBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    if (mobileIcon) {
      mobileIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      if (mobileIcon) mobileIcon.className = 'fa-solid fa-bars';
    });
  });

  /* ── ScrollSpy ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  function updateScrollSpy() {
    const scrollY = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) { link.classList.add('active'); }
        else { link.classList.remove('active'); }
      }
    });
  }

  /* ── Fade-up scroll animations ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ── Project Tabs (Enterprise / Personal R&D) ── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const enterpriseGrid = document.getElementById('enterpriseGrid');
  const personalGrid = document.getElementById('personalGrid');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');

      if (tab === 'enterprise') {
        enterpriseGrid.style.display = 'grid';
        personalGrid.style.display = 'none';
      } else {
        enterpriseGrid.style.display = 'none';
        personalGrid.style.display = 'flex';
      }
    });
  });

  /* ── R&D Accordion Expand ── */
  document.querySelectorAll('.rd-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.rd-card');
      const body = card.querySelector('.rd-body');
      const isOpen = card.classList.contains('open');

      // Close all first
      document.querySelectorAll('.rd-card').forEach(c => {
        c.classList.remove('open');
        c.querySelector('.rd-body').classList.remove('open');
      });

      // Open clicked if wasn't open
      if (!isOpen) {
        card.classList.add('open');
        body.classList.add('open');
      }
    });
  });

  /* ── Copy to Clipboard ── */
  window.copyToClipboard = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied!`);
    }).catch(() => {
      showToast('Copy failed');
    });
  };

  /* ── Toast ── */
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ── Hero text animation ── */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroTitle.style.transition = 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 200);
  }

  /* ── Year in footer ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
