// Huzaif Portfolio JS
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('.icon');

  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0b0e14' : '#ffffff');
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    if (themeToggle) themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // Toggle theme
  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  // Update active nav link on scroll
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sectionIds = navLinks.map(a => a.getAttribute('href')).filter(Boolean).map(id => id.replace('#', ''));
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(el => el.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: 0.1 });

  sections.forEach(section => observer.observe(section));

  // Contact form mailto fallback
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = contactForm.dataset.email || 'huzaif@example.com';
    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const message = (document.getElementById('message') || {}).value || '';

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  });

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
})();
