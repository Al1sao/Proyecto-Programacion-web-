<<<<<<< HEAD
// --- MAIN.JS COMPLETO ---
document.addEventListener('DOMContentLoaded', () => {

  // ======== LOGIN / LOGOUT ========
  const loginBtn = document.getElementById('login-btn');
  const isLogged = localStorage.getItem('mkl_logged') === '1';
  const user = localStorage.getItem('mkl_user');

  // Permitir acceso si se abre Main.html con ?guest=1
  const urlParams = new URLSearchParams(window.location.search);
  const isGuest = urlParams.get('guest') === '1';

  if (loginBtn) {
    if (isLogged && user) {
      // Si está logueado, mostrar usuario y opción de logout
      loginBtn.textContent = `${user}`;
      loginBtn.addEventListener('click', () => {
        if (confirm('¿Deseas cerrar sesión?')) {
          localStorage.removeItem('mkl_logged');
          localStorage.removeItem('mkl_user');
          window.location.reload();
        }
      });
    } else {
      // Si no está logueado, mostrar botón de login
      loginBtn.textContent = 'Iniciar sesión';
      loginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
      });
    }
  }

  // Protección de página - redirigir a login si no hay sesión y no es invitado
  const isMainPage = window.location.pathname.includes('Main.html');
  if (isMainPage && !isLogged && !isGuest) {
    window.location.href = 'login.html';
    return;
  }

  // ======== CARRUSEL DE JUEGOS ========
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

    window.addEventListener('resize', updateCarousel);

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
      });
      if (loaded === imgs.length) updateCarousel();
    }
  });
});
=======
// --- MAIN.JS COMPLETO ---
document.addEventListener('DOMContentLoaded', () => {

  // ======== LOGIN / LOGOUT ========
  const loginBtn = document.getElementById('login-btn');
  const isLogged = localStorage.getItem('mkl_logged') === '1';
  const user = localStorage.getItem('mkl_user');

  // Permitir acceso si se abre Main.html con ?guest=1
  const urlParams = new URLSearchParams(window.location.search);
  const isGuest = urlParams.get('guest') === '1';

  if (loginBtn) {
    if (isLogged && user) {
      // Si está logueado, mostrar usuario y opción de logout
      loginBtn.textContent = `${user}`;
      loginBtn.addEventListener('click', () => {
        if (confirm('¿Deseas cerrar sesión?')) {
          localStorage.removeItem('mkl_logged');
          localStorage.removeItem('mkl_user');
          window.location.reload();
        }
      });
    } else {
      // Si no está logueado, mostrar botón de login
      loginBtn.textContent = 'Iniciar sesión';
      loginBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
      });
    }
  }

  // Protección de página - redirigir a login si no hay sesión y no es invitado
  const isMainPage = window.location.pathname.includes('Main.html');
  if (isMainPage && !isLogged && !isGuest) {
    window.location.href = 'login.html';
    return;
  }

  // ======== CARRUSEL DE JUEGOS ========
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

    window.addEventListener('resize', updateCarousel);

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
      });
      if (loaded === imgs.length) updateCarousel();
    }
  });
});
>>>>>>> da3c42526263f5e0dc9559ef8354a54488999f46
