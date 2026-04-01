(function () {
  'use strict';

  /* ── Nav scroll state ──────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    const tick = () => nav.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ── Mobile nav ─────────────────────────────────────────────────────── */
  const burger = document.getElementById('nav-burger');
  const links  = document.getElementById('nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Smooth scroll ──────────────────────────────────────────────────── */
  const navH = () => nav ? nav.offsetHeight : 0;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH() - 24, behavior: 'smooth' });
    });
  });
  document.getElementById('hero-down')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ── Scroll reveal ──────────────────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll(
      '.about-layout, .about-values li, .llama, .garlic-layout, .stay-card, .vendor-form, .vendors-layout__left, .stat'
    );
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger siblings
      const delay = (i % 5) * 0.1;
      if (delay) el.style.transitionDelay = `${delay}s`;
      io.observe(el);
    });
  }

  /* ── Vendor form ────────────────────────────────────────────────────── */
  const form     = document.getElementById('vendor-form');
  const feedback = document.getElementById('vendor-feedback');
  const submit   = document.getElementById('vendor-submit');

  if (form && feedback && submit) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const name  = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      if (!name || !email) { show('Please enter your name and email.', false); return; }

      submit.disabled = true;
      submit.textContent = 'Sending…';

      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString(),
        });
        if (res.ok) { show("Thank you — we'll be in touch within 2 business days.", true); form.reset(); }
        else         show('Something went wrong. Please email us directly.', false);
      } catch {
        show('Network error. Please email us directly.', false);
      } finally {
        submit.disabled = false;
        submit.textContent = 'Send Inquiry';
      }
    });
  }

  function show(msg, ok) {
    feedback.textContent = msg;
    feedback.className   = ok ? 'success' : 'error';
    feedback.style.display = 'block';
  }

})();
