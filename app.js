// Scroll-triggered fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is tapped
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// Smooth scroll for anchor links (fallback for browsers without CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// "Get Early Access" button reveals form
document.querySelectorAll('[id$="-open-form"]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const section = btn.closest('section');
    const form = section.querySelector('.early-access-form');
    if (form) {
      form.classList.add('open');
      btn.style.display = 'none';
      form.querySelector('input[type="email"]').focus();
    }
  });
});

// Early access form submission
function handleFormSubmit(form, successEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        form.style.display = 'none';
        successEl.classList.add('show');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection and try again.');
    }
  });
}

const heroForm = document.getElementById('hero-form');
const heroSuccess = document.getElementById('hero-success');
if (heroForm && heroSuccess) handleFormSubmit(heroForm, heroSuccess);

const bottomForm = document.getElementById('bottom-form');
const bottomSuccess = document.getElementById('bottom-success');
if (bottomForm && bottomSuccess) handleFormSubmit(bottomForm, bottomSuccess);
