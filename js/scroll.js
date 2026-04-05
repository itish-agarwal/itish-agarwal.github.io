/* ═══════════════════════════════════════════════════════════
   Scroll Module
   — Back-to-top button, scroll-reveal (IntersectionObserver)
   ═══════════════════════════════════════════════════════════ */

const backToTop = document.getElementById('backToTop');

/**
 * Toggle back-to-top button visibility based on scroll position.
 */
export function handleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}

/**
 * Set up back-to-top click handler.
 */
export function initBackToTop() {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Observe `.reveal` elements and add `.visible` class
 * when they enter the viewport (fires only once per element).
 */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}
