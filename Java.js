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
  loginBtn.href = "#"; // luego podés poner perfil.html
} else {
  loginBtn.textContent = "Login";
  loginBtn.href = "#"; // luego podés poner login.html
}

// --- Carrito (simulado) ---
const cartBtn = document.getElementById('cart-btn');

// Cantidad de productos en el carrito (simulada)
let cartCount = localStorage.getItem('cartCount') || 0;
cartBtn.setAttribute('data-count', cartCount);

// Simulación: al hacer clic aumenta el contador
cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  cartCount++;
  localStorage.setItem('cartCount', cartCount);
  cartBtn.setAttribute('data-count', cartCount);
});
