/* ═══════════════════════════════════════════════════════════
   Navigation Module
   — Scroll shadow, active link highlighting, mobile menu toggle,
     smooth anchor scrolling
   ═══════════════════════════════════════════════════════════ */

const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const sections  = document.querySelectorAll('section[id]');

/**
 * Update navbar shadow and highlight the active nav link
 * based on current scroll position.
 */
export function handleNavScroll() {
  const scrollY = window.scrollY;

  /* Add shadow when scrolled */
  navbar.classList.toggle('scrolled', scrollY > 40);

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

/**
 * Initialise mobile hamburger toggle and link-click closing.
 */
export function initMobileMenu() {
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
}

/**
 * Smooth-scroll anchor links, accounting for fixed navbar height.
 */
export function initSmoothScroll() {
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
}
