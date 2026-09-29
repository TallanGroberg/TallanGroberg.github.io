// lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCap = document.getElementById('lightbox-cap');
const lightboxPrint = document.getElementById('lightbox-print');
const lightboxDetails = document.getElementById('lightbox-details');

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', () => {
    const img = tile.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCap.textContent = tile.dataset.title || img.alt;
    if (tile.dataset.print) {
      lightboxPrint.href = tile.dataset.print;
      lightboxPrint.classList.add('show');
    } else {
      lightboxPrint.classList.remove('show');
    }
    lightboxDetails.href = tile.dataset.page || 'index.html#gallery';
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

// merch links inside tiles — don't trigger the lightbox
document.querySelectorAll('.merch-link').forEach(a => {
  a.addEventListener('click', e => e.stopPropagation());
});

// animation tiles — tap toggles sound
document.querySelectorAll('.vtile').forEach(tile => {
  const v = tile.querySelector('video');
  if (!v) return;
  const badge = document.createElement('span');
  badge.className = 'snd';
  badge.setAttribute('aria-hidden', 'true');
  tile.appendChild(badge);
  const show = () => { badge.textContent = v.muted ? '🔇' : '🔊'; };
  show();
  tile.addEventListener('click', () => {
    v.muted = !v.muted;
    tile.classList.toggle('unmuted', !v.muted);
    show();
  });
});

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
