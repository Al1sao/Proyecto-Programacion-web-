// --- VERIFICAR SESIÓN ---
const userLogged = localStorage.getItem('mkl_logged') === '1';

// --- BLOQUEAR BOTONES SI NO HAY SESIÓN ---
window.addEventListener('DOMContentLoaded', () => {
  if (!userLogged) {
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
      btn.addEventListener('click', e => {
        e.preventDefault();
        alert('⚠️ Necesitas iniciar sesión para añadir juegos al carrito.');
      });
    });
  }
});

let cart = [];

// --- FUNCIONES PRINCIPALES ---
function addToCart(productName, price) {
  if (!userLogged) return alert('⚠️ Inicia sesión para comprar.');
  if (cart.find(item => item.name === productName))
    return alert('Este juego ya está en el carrito.');
  cart.push({ name: productName, price: parseFloat(price) });
  localStorage.setItem('gameCart', JSON.stringify(cart));
  renderCart();
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('gameCart', JSON.stringify(cart));
  renderCart();
  updateProductButtons();
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const payBtn = document.getElementById('payBtn');
  cartItems.innerHTML = '';
  if (!cart.length) {
    cartItems.innerHTML = '<li style="color:#8b8b8b;text-align:center;padding:20px;">El carrito está vacío</li>';
    cartTotal.textContent = 'Total: 0.00 USD';
    if (payBtn) { payBtn.classList.add('btn-disabled'); payBtn.style.pointerEvents = 'none'; }
  } else {
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;">
        <span>${item.name}</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="color:#66fcf1;font-weight:bold;">${item.price.toFixed(2)} USD</span>
          <button onclick="removeFromCart('${item.name}')" style="background:#c92a2a;border:none;color:white;padding:5px 10px;border-radius:5px;cursor:pointer;font-size:0.8em;">Eliminar</button>
        </div></div>`;
      cartItems.appendChild(li);
      total += item.price;
    });
    cartTotal.textContent = `Total: ${total.toFixed(2)} USD`;
    if (payBtn) {
      payBtn.classList.remove('btn-disabled');
      payBtn.style.pointerEvents = 'auto';
      payBtn.onclick = () => {
        localStorage.setItem('cartTotal', total.toFixed(2));
        window.location.href = 'carrito2.html';
      };
    }
  }
}

function updateProductButtons() {
  document.querySelectorAll('.product').forEach(product => {
    const name = product.querySelector('.name').textContent;
    const addBtn = product.querySelector('.add-cart-btn');
    const removeBtn = product.querySelector('.remove-cart-btn');
    const label = product.querySelector('.in-cart-label');
    const inCart = cart.find(i => i.name === name);
    if (inCart) {
      addBtn.style.display = 'none';
      removeBtn.style.display = 'block';
      if (label) { label.textContent = 'En carrito'; label.style.color = '#66fcf1'; }
    } else {
      addBtn.style.display = 'block';
      removeBtn.style.display = 'none';
      if (label) label.textContent = '';
    }
  });
}

// --- INICIALIZAR ---
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('gameCart');
  if (saved) cart = JSON.parse(saved);
  renderCart();
  updateProductButtons();
});

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
