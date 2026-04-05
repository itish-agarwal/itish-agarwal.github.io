/* ═══════════════════════════════════════════════════════════
   PORTFOLIO — script.js
   Vanilla JavaScript for animations, interactions & UX
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM references ───────────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const navToggle   = document.getElementById('navToggle');
  const navLinks    = document.getElementById('navLinks');
  const backToTop   = document.getElementById('backToTop');
  const yearSpan    = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const formFeedback= document.getElementById('formFeedback');
  const tapBtn      = document.getElementById('tapBtn');
  const tapResult   = document.getElementById('tapResult');

  /* ── Set current year in footer ───────────────────────── */
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ═══════════════════════════════════════════════════════
     NAVBAR — scroll shadow & active link highlight
     ═══════════════════════════════════════════════════════ */
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const scrollY = window.scrollY;

    /* Add shadow when scrolled */
    navbar.classList.toggle('scrolled', scrollY > 40);

    /* Back‑to‑top visibility */
    backToTop.classList.toggle('visible', scrollY > 500);

    /* Highlight active nav link */
    sections.forEach((sec) => {
      const top    = sec.offsetTop - 120;
      const bottom = top + sec.offsetHeight;
      const id     = sec.getAttribute('id');
      const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < bottom);
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ═══════════════════════════════════════════════════════
     MOBILE MENU TOGGLE
     ═══════════════════════════════════════════════════════ */
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close mobile menu when a link is clicked */
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ═══════════════════════════════════════════════════════
     BACK TO TOP
     ═══════════════════════════════════════════════════════ */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ═══════════════════════════════════════════════════════
     SCROLL‑REVEAL (Intersection Observer)
     ═══════════════════════════════════════════════════════ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ═══════════════════════════════════════════════════════
     CONTACT FORM (front‑end only — no backend)
     ═══════════════════════════════════════════════════════ */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = contactForm.name.value.trim();
      const email   = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      /* Simple client‑side validation */
      if (!name || !email || !message) {
        showFeedback('Please fill in all fields.', 'error');
        return;
      }
      if (!isValidEmail(email)) {
        showFeedback('Please enter a valid email address.', 'error');
        return;
      }

      /* Simulate submission */
      showFeedback('Sending…', '');
      setTimeout(() => {
        showFeedback('Message sent! I\'ll get back to you soon. 🚀', 'success');
        contactForm.reset();
      }, 1200);
    });
  }

  function showFeedback(msg, type) {
    formFeedback.textContent = msg;
    formFeedback.className = 'form-feedback' + (type ? ' ' + type : '');
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ═══════════════════════════════════════════════════════
     TAP GAME (Fun Section)
     ═══════════════════════════════════════════════════════ */
  let tapState = 'idle'; // idle | running | done
  let tapCount = 0;
  let tapTimer = null;

  if (tapBtn) {
    tapBtn.addEventListener('click', () => {
      if (tapState === 'idle' || tapState === 'done') {
        /* Start game */
        tapState  = 'running';
        tapCount  = 0;
        tapBtn.textContent = 'Tap! (0)';
        tapResult.textContent = '5 seconds remaining…';

        tapTimer = setTimeout(() => {
          tapState = 'done';
          tapBtn.textContent = 'Play Again';
          const emoji = tapCount > 30 ? '🔥' : tapCount > 20 ? '⚡' : '👏';
          tapResult.textContent = `${emoji} You tapped ${tapCount} times!`;
        }, 5000);

      } else if (tapState === 'running') {
        tapCount++;
        tapBtn.textContent = `Tap! (${tapCount})`;
      }
    });
  }

  /* ═══════════════════════════════════════════════════════
     SMOOTH ANCHOR OFFSET (accounts for fixed navbar)
     ═══════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
