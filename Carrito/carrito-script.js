// Sistema de carrito para carrito.html
let cart = [];

// Función para agregar juego al carrito
function addToCart(productName, price) {
    // Verificar si el juego ya está en el carrito
    const exists = cart.find(item => item.name === productName);
    
    if (exists) {
        alert('Este juego ya está en el carrito (máximo 1 unidad por juego)');
        return;
    }

    // Agregar al carrito
    cart.push({
        name: productName,
        price: parseFloat(price)
    });

    // Guardar en localStorage
    localStorage.setItem('gameCart', JSON.stringify(cart));

    // Actualizar visualización
    renderCart();
}

// Función para eliminar del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    
    // Actualizar localStorage
    localStorage.setItem('gameCart', JSON.stringify(cart));
    
    // Actualizar visualización
    renderCart();
    
    // Actualizar botones de los productos
    updateProductButtons();
}

// Función para renderizar el carrito
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const payBtn = document.getElementById('payBtn');
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<li style="color: #8b8b8b; text-align: center; padding: 20px;">El carrito está vacío</li>';
        cartTotal.textContent = 'Total: 0.00 €';
        // Deshabilitar botón de pago
        if (payBtn) {
            payBtn.classList.add('btn-disabled');
            payBtn.style.pointerEvents = 'none';
        }
    } else {
        let total = 0;
        
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>${item.name}</span>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #66fcf1; font-weight: bold;">${item.price.toFixed(2)} €</span>
                        <button onclick="removeFromCart('${item.name}')" 
                                style="background: #c92a2a; border: none; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 0.8em;">Eliminar</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(li);
            total += item.price;
        });
        
        cartTotal.textContent = `Total: ${total.toFixed(2)} €`;
        
        // Habilitar botón de pago
        if (payBtn) {
            payBtn.classList.remove('btn-disabled');
            payBtn.style.pointerEvents = 'auto';
            payBtn.onclick = function() {
                localStorage.setItem('cartTotal', total.toFixed(2));
                window.location.href = 'carrito2.html';
            };
        }
    }
}

// Función para actualizar estado de botones de productos
function updateProductButtons() {
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('.name').textContent;
        const addBtn = product.querySelector('.add-cart-btn');
        const removeBtn = product.querySelector('.remove-cart-btn');
        const inCartLabel = product.querySelector('.in-cart-label');
        
        const inCart = cart.find(item => item.name === productName);
        
        if (addBtn && removeBtn) {
            if (inCart) {
                addBtn.style.display = 'none';
                removeBtn.style.display = 'block';
                if (inCartLabel) {
                    inCartLabel.textContent = 'En carrito';
                    inCartLabel.style.color = '#66fcf1';
                }
            } else {
                addBtn.style.display = 'block';
                removeBtn.style.display = 'none';
                if (inCartLabel) {
                    inCartLabel.textContent = '';
                }
            }
        }
    });
}

// Cargar carrito desde localStorage al iniciar
window.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('gameCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    renderCart();
    updateProductButtons();
});

// Permitir acceso global a las funciones
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

