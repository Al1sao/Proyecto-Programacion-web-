// --- Dropdowns (si existen) ---
document.querySelectorAll('.dropdown').forEach(drop => {
  drop.addEventListener('mouseenter', () => {
    const menu = drop.querySelector('.dropdown-menu');
    menu.style.opacity = '1';
    menu.style.visibility = 'visible';
    menu.style.transform = 'translateY(0)';
  });
  drop.addEventListener('mouseleave', () => {
    const menu = drop.querySelector('.dropdown-menu');
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.transform = 'translateY(-10px)';
  });
});

// --- Login visual ---
const loginBtn = document.getElementById('login-btn');
const user = localStorage.getItem('username');
if (user) {
  loginBtn.textContent = user;
  loginBtn.href = "#";
} else {
  loginBtn.textContent = "Login";
  loginBtn.href = "#";
}

// --- Carrusel simple por grupos de 4 ---
const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.carousel-btn.left');
const rightBtn = document.querySelector('.carousel-btn.right');
const cards = document.querySelectorAll('.game-card');

let currentIndex = 0;
const visibleCards = 4;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 20; // ancho + gap
  const totalCards = cards.length;
  const maxIndex = Math.ceil(totalCards / visibleCards) - 1;

  track.style.transform = `translateX(-${currentIndex * visibleCards * cardWidth}px)`;
  leftBtn.disabled = currentIndex === 0;
  rightBtn.disabled = currentIndex === maxIndex;
}

leftBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

rightBtn.addEventListener('click', () => {
  const maxIndex = Math.ceil(cards.length / visibleCards) - 1;
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

updateCarousel();
