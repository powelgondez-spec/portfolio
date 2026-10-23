(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tahun copyright ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Bayangan header saat scroll ---------- */
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Navigasi mobile ---------- */
  const setNav = (open) => {
    header.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  };

  const closeNav = () => {
    if (header.classList.contains('is-open')) setNav(false);
  };

  navToggle.addEventListener('click', () => {
    setNav(!header.classList.contains('is-open'));
  });

  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeNav();
  });

  /* ---------- Reveal on scroll ---------- */
  const revealItems = [...document.querySelectorAll('.reveal')];
  let revealObserver = null;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    document.documentElement.classList.remove('js');
  }

  // Tandai bahwa reveal sudah aktif supaya failsafe di <head> tidak menghapus kelas .js.
  window.__revealReady = true;

  // Elemen yang sudah terlihat saat halaman dibuka langsung ditampilkan.
  if (!prefersReducedMotion) {
    requestAnimationFrame(() => {
      revealItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          item.classList.add('is-visible');
        }
      });
    });
  }

  /* ---------- Highlight menu sesuai section ---------- */
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- FAQ accordion ---------- */
  const faqButtons = [...document.querySelectorAll('.faq-q')];

  const closeFaq = (item) => {
    item.classList.remove('is-open');
    item.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  };

  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const willOpen = !item.classList.contains('is-open');

      document.querySelectorAll('.faq-item.is-open').forEach(closeFaq);

      if (willOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Modal proyek ---------- */
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');

  if (modal && modalBody && typeof modal.showModal === 'function') {
    document.querySelectorAll('[data-project]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const template = document.getElementById(`tpl-${trigger.dataset.project}`);
        if (!template) return;

        modalBody.replaceChildren(template.content.cloneNode(true));
        modal.showModal();
        document.body.classList.add('modal-open');
        modalBody.parentElement.scrollTop = 0;
      });
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) modal.close();
    });

    modal.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      modalBody.replaceChildren();
    });
  } else {
    document.querySelectorAll('[data-project]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        window.location.href = '#proyek';
      });
    });
  }
})();
