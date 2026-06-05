/* ================================================================
   PORTFOLIO — script.js
   ================================================================ */


/* ── Mobile Navigation ─────────────────────────────────────────── */

const hamburger  = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

// Close the mobile menu when any link inside it is clicked
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});


/* ── Navbar Scroll Behavior ────────────────────────────────────── */
// Adds a backdrop blur + border when the user scrolls past 20px.

const navWrapper = document.querySelector('.nav-wrapper');

window.addEventListener('scroll', () => {
  navWrapper?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


/* ── Scroll-to-Top Button ──────────────────────────────────────── */
// The button appears after the user has scrolled 400px down.

const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── Fade-in on Scroll ─────────────────────────────────────────── */
// Elements with class .fade-in animate into view as they enter the
// viewport. Each element animates once, then the observer stops
// watching it to keep things performant.

const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px', // triggers slightly before fully in view
  }
);

fadeElements.forEach(el => fadeObserver.observe(el));
