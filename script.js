(function () {
  const docEl = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  const yearEl = document.getElementById('year');

  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      docEl.classList.add('theme-light');
      docEl.classList.remove('theme-dark');
    } else {
      docEl.classList.add('theme-dark');
      docEl.classList.remove('theme-light');
    }
  }

  // Init theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = docEl.classList.contains('theme-light') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // Mobile nav
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Intersection Observer for reveal animations
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Current year in footer
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Netlify form enhancement: if not on Netlify, optional mailto fallback
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const host = location.hostname;
      const likelyNetlify = host.endsWith('netlify.app') || host.endsWith('netlify.com');
      if (!likelyNetlify) {
        // Let the browser do a normal POST; also provide mailto link next to button
        // No-op here; progressive enhancement only
      }
    });
  }
})();
