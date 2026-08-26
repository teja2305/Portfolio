// ---------------------------------------------------------------
// Respect reduced motion
// ---------------------------------------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------
// Hero terminal typing effect
// ---------------------------------------------------------------
const typeTarget = document.getElementById('typeTarget');
const heroOutput = document.getElementById('heroOutput');
const cursorBlink = document.getElementById('cursorBlink');
const command = 'whoami';

function typeCommand() {
  if (prefersReducedMotion) {
    typeTarget.textContent = command;
    heroOutput.classList.add('show');
    return;
  }

  let i = 0;
  const interval = setInterval(() => {
    typeTarget.textContent = command.slice(0, i + 1);
    i++;
    if (i === command.length) {
      clearInterval(interval);
      setTimeout(() => {
        heroOutput.classList.add('show');
      }, 350);
    }
  }, 110);
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeCommand, 500);
});

// ---------------------------------------------------------------
// Scroll reveal for sections
// ---------------------------------------------------------------
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ---------------------------------------------------------------
// Active tab tracking based on scroll position
// ---------------------------------------------------------------
const sections = ['home', 'about', 'experience', 'projects', 'skills', 'credentials', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const tabs = Array.from(document.querySelectorAll('.tab, .mobile-link'));

function setActiveTab() {
  const scrollPos = window.scrollY + 120;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  tabs.forEach((tab) => {
    const isActive = tab.getAttribute('href') === `#${currentId}`;
    tab.classList.toggle('active', isActive);
  });
}

window.addEventListener('scroll', setActiveTab, { passive: true });
setActiveTab();

// ---------------------------------------------------------------
// Mobile dropdown menu
// ---------------------------------------------------------------
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}
