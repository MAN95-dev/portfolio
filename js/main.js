// Me, Michelle & I — small progressive enhancements. Everything works without JS.
document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Header border once the page scrolls
const header = document.querySelector('.site-header');
const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

// Case study: reading progress bar
const progress = document.querySelector('.progress');
if (progress) {
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

// Case study: table of contents (open on desktop, collapsible on mobile, highlights current section)
const toc = document.querySelector('.toc');
if (toc) {
  const details = toc.querySelector('details');
  const desktop = window.matchMedia('(min-width: 961px)');
  const syncOpen = () => { if (details) details.open = desktop.matches; };
  syncOpen();
  desktop.addEventListener('change', syncOpen);

  const links = [...toc.querySelectorAll('a[href^="#"]')];
  links.forEach((a) => a.addEventListener('click', () => { if (!desktop.matches && details) details.open = false; }));

  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const active = links.find((a) => a.getAttribute('href') === '#' + e.target.id);
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach((s) => spy.observe(s));
  }
}

// Booking step screen recordings: play only while on screen, with a pause button (WCAG 2.2.2).
// With reduced motion they stay paused on their poster until the viewer presses play.
const stepVideos = document.querySelectorAll('.step-video video');
stepVideos.forEach((video) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'video-toggle';
  video.parentElement.appendChild(btn);
  let userPaused = reduceMotion;
  const sync = () => {
    const playing = !video.paused;
    btn.textContent = playing ? '❚❚' : '▶';
    btn.setAttribute('aria-label', playing ? 'Pause screen recording' : 'Play screen recording');
  };
  btn.addEventListener('click', () => {
    if (video.paused) { userPaused = false; video.play(); } else { userPaused = true; video.pause(); }
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  sync();
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused) video.play().catch(() => {});
      else if (!e.isIntersecting) video.pause();
    }, { threshold: 0.4 }).observe(video);
  }
});

// Lightbox for charts and diagrams
const zooms = document.querySelectorAll('[data-zoom]');
if (zooms.length && 'HTMLDialogElement' in window) {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Enlarged image');
  dialog.innerHTML = '<button type="button" aria-label="Close enlarged image">×</button><img alt="">';
  document.body.appendChild(dialog);
  const img = dialog.querySelector('img');
  const close = () => dialog.close();
  dialog.querySelector('button').addEventListener('click', close);
  dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
  zooms.forEach((btn) => btn.addEventListener('click', () => {
    const source = btn.querySelector('img');
    img.src = source.currentSrc || source.src;
    img.alt = source.alt;
    dialog.showModal();
  }));
}

