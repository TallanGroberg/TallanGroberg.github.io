

// merch links inside video tiles — don't toggle the sound
document.querySelectorAll('.merch-link').forEach(a => {
  a.addEventListener('click', e => e.stopPropagation());
});

// mobile nav
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    })
  );
}

// footer year
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// sci-fi shorts: tap a tile to start its video (covers phones that block autoplay)
document.querySelectorAll('.vtile').forEach(tile => {
  const v = tile.querySelector('video');
  if (!v) return;
  tile.addEventListener('click', () => {
    if (v.paused) v.play().catch(() => {});
  });
});
