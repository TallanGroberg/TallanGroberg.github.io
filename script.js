// lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCap = document.getElementById('lightbox-cap');

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const img = tile.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCap.textContent = tile.dataset.title || img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
if (lightbox) {
  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// mobile nav
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// newsletter modal — appears after 45s, at most once every 30 days
const nlModal = document.getElementById('nl-modal');
if (nlModal) {
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const KEY = 'nl-modal-last-shown';
  const DELAY_MS = 45000;
  const COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;
  const lastShown = parseInt(store.get(KEY) || '0', 10) || 0;
  let shownThisSession = false;

  function openNlModal() {
    if (shownThisSession || !nlModal) return;
    shownThisSession = true;
    store.set(KEY, String(Date.now()));
    nlModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('nl-modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeNlModal() {
    nlModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (Date.now() - lastShown > COOLDOWN_MS) {
    setTimeout(openNlModal, DELAY_MS);
  }
  const nlClose = document.getElementById('nl-modal-close');
  if (nlClose) nlClose.addEventListener('click', closeNlModal);
  nlModal.addEventListener('click', e => {
    if (e.target === nlModal) closeNlModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nlModal.classList.contains('open')) closeNlModal();
  });
}
