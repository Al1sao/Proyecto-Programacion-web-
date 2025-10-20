// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  // --- Login visual ---
  const loginBtn = document.getElementById('login-btn');
  const user = localStorage.getItem('username');
  if (loginBtn) loginBtn.textContent = user || 'Login';

  // --- Inicializar todos los carruseles ---
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
    const visibleCards = 4; // ajustar si quieres responsive
    const gap = 20; // debe coincidir con CSS (.carousel-track gap)

    function updateCarousel() {
      // proteger si no hay cartas
      if (cards.length === 0) return;
      const cardWidth = cards[0].offsetWidth + gap;
      const totalCards = cards.length;
      const pages = Math.ceil(totalCards / visibleCards);
      const maxIndex = Math.max(0, pages - 1);

      track.style.transform = `translateX(-${currentIndex * visibleCards * cardWidth}px)`;
      leftBtn.disabled = currentIndex === 0;
      rightBtn.disabled = currentIndex === maxIndex;
    }

    leftBtn.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; updateCarousel(); }
    });

    rightBtn.addEventListener('click', () => {
      const pages = Math.ceil(cards.length / visibleCards);
      const maxIndex = Math.max(0, pages - 1);
      if (currentIndex < maxIndex) { currentIndex++; updateCarousel(); }
    });

    // recalcular al redimensionar
    window.addEventListener('resize', updateCarousel);

    // esperar a que las imágenes del carrusel carguen para calcular tamaños correctos
    const imgs = carousel.querySelectorAll('img');
    if (imgs.length === 0) {
      updateCarousel();
    } else {
      let loaded = 0;
      imgs.forEach(img => {
    if (img.complete) {
     loaded++;
      } else {
      img.addEventListener('load', () => {
      loaded++;
       if (loaded === imgs.length) updateCarousel();
       });
       }
      }
    );
      if (loaded === imgs.length) updateCarousel();
    }
  });
});
// ...existing code...
