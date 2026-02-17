/* ============================================================
   LIVE UTC CLOCK
   ============================================================ */
function updateClock() {
  const now = new Date();
  const h = String(now.getUTCHours()).padStart(2, '0');
  const m = String(now.getUTCMinutes()).padStart(2, '0');
  const s = String(now.getUTCSeconds()).padStart(2, '0');
  const el = document.getElementById('clock');
  if (el) el.textContent = `${h}:${m}:${s} UTC`;
}
updateClock();
setInterval(updateClock, 1000);


/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealTargets = document.querySelectorAll(
  '.section-header, .work-card, .exp-item, .skill-pill, .contact-heading, .contact-links'
);

revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger cards within a grid
  if (el.classList.contains('work-card') || el.classList.contains('skill-pill')) {
    el.style.transitionDelay = `${(i % 6) * 0.07}s`;
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealTargets.forEach((el) => observer.observe(el));


/* ============================================================
   NAV: active link highlight on scroll
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function onScroll() {
  let current = '';
  sections.forEach((sec) => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--ink)' : '';
  });
}

window.addEventListener('scroll', onScroll, { passive: true });


/* ============================================================
   SMOOTH HOVER TILT on work cards
   ============================================================ */
document.querySelectorAll('.work-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `translateY(-5px) rotateX(${y}deg) rotateY(${x}deg)`;
    card.style.perspective = '800px';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
