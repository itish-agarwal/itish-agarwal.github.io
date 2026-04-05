/* ═══════════════════════════════════════════════════════════
   Main Entry Point
   — Imports all modules and bootstraps the application
   ═══════════════════════════════════════════════════════════ */

/* ── Mark document as JS-ready (enables reveal animations) ── */
document.documentElement.classList.add('js-ready');

import { handleNavScroll, initMobileMenu, initSmoothScroll } from './navigation.js';
import { handleBackToTop, initBackToTop, initScrollReveal }  from './scroll.js';
import { initContactForm }                                   from './contact.js';
import { initHobbyModals }                                   from './hobbies.js';

/* ── Set current year in footer ───────────────────────────── */
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ── Scroll-based handlers (navbar shadow + back-to-top) ──── */
function onScroll() {
  handleNavScroll();
  handleBackToTop();
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ── Initialise modules ──────────────────────────────────── */
initMobileMenu();
initSmoothScroll();
initBackToTop();
initScrollReveal();
initContactForm();
initHobbyModals();
