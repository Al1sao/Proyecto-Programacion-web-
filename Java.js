document.addEventListener('DOMContentLoaded', () => {
  // --- CONTROL GLOBAL DE SESIÓN ---
  const loginBtn = document.getElementById('login-btn');
  const user = localStorage.getItem('mkl_user');
  const logged = localStorage.getItem('mkl_logged');
  const path = window.location.pathname;
  const isMain = path.endsWith('Main.html') || path.endsWith('Main');

  if (logged === '1' && user) {
    if (loginBtn) {
      loginBtn.textContent = `${user} (Salir)`;
      loginBtn.href = "#";
      loginBtn.addEventListener('click', e => {
        e.preventDefault();
        localStorage.removeItem('mkl_logged');
        localStorage.removeItem('mkl_user');
        // Redirige correctamente sin importar la carpeta
const base = window.location.origin + window.location.pathname.split('/')[1];
window.location.href = `${window.location.origin}/${base.includes('Main.html') ? '' : 'Main.html'}`;
      });
    }
  } else {
    if (loginBtn) {
      if (isMain) {
        loginBtn.textContent = 'Login';
        loginBtn.href = 'login.html';
      } else {
        loginBtn.textContent = 'Iniciar sesión (solo desde página principal)';
        loginBtn.removeAttribute('href');
        loginBtn.style.opacity = '0.5';
        loginBtn.style.pointerEvents = 'none';
      }
    }
  }

  // --- CARRUSELES DE JUEGOS ---
  const carousels = document.querySelectorAll('.game-carousel');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const leftBtn = carousel.querySelector('.carousel-btn.left');
    const rightBtn = carousel.querySelector('.carousel-btn.right');
    const cards = carousel.querySelectorAll('.game-card');
    if (!track || !leftBtn || !rightBtn || cards.length === 0) {
      if (leftBtn) leftBtn.style.display = 'none';
      if (rightBtn) rightBtn.style.display = 'none';
      return;
    }

    let currentIndex = 0;
    const visibleCards = 4, gap = 20;

    const updateCarousel = () => {
      if (!cards.length) return;
      const cardWidth = cards[0].offsetWidth + gap;
      const pages = Math.ceil(cards.length / visibleCards);
      const maxIndex = Math.max(0, pages - 1);
      track.style.transform = `translateX(-${currentIndex * visibleCards * cardWidth}px)`;
      leftBtn.disabled = currentIndex === 0;
      rightBtn.disabled = currentIndex === maxIndex;
    };

    leftBtn.onclick = () => { if (currentIndex > 0) { currentIndex--; updateCarousel(); } };
    rightBtn.onclick = () => {
      const pages = Math.ceil(cards.length / visibleCards);
      const maxIndex = Math.max(0, pages - 1);
      if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); }
    };
    window.addEventListener('resize', updateCarousel);

    const imgs = carousel.querySelectorAll('img');
    if (!imgs.length) updateCarousel();
    else {
      let loaded = 0;
      imgs.forEach(img => {
        if (img.complete) loaded++;
        else img.addEventListener('load', () => {
          if (++loaded === imgs.length) updateCarousel();
        });
      });
      if (loaded === imgs.length) updateCarousel();
    }
  });
});
