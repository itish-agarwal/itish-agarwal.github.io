/* ═══════════════════════════════════════════════════════════
   Contact Form Module
   — Client-side validation & simulated form submission
   ═══════════════════════════════════════════════════════════ */

const contactForm  = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

/** Show feedback message below the form */
function showFeedback(msg, type) {
  formFeedback.textContent = msg;
  formFeedback.className = 'form-feedback' + (type ? ' ' + type : '');
}

/** Basic email validation */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Initialise form submit handler with validation & simulated send.
 */
export function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    /* Simple client-side validation */
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
