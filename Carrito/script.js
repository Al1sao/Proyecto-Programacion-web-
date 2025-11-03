// Cargar datos del carrito desde localStorage
let cartData = [];

function loadCartData() {
    const savedCart = localStorage.getItem('gameCart');
    if (savedCart) {
        cartData = JSON.parse(savedCart);
    }
}

// Selecciones DOM
const itemsCountEl = document.getElementById('itemsCount');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const surchargeEl = document.getElementById('surcharge');
const totalEl = document.getElementById('total');
const perInstallmentEl = document.getElementById('perInstallment');
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const installmentsSelect = document.getElementById('installments');

function format(val) {
    return val.toFixed(2) + ' USD';
}

function updateCart() {
    // Si no hay datos en localStorage, cargar desde sesión anterior
    if (cartData.length === 0) {
        loadCartData();
    }

    let subtotal = 0;
    let totalItems = cartData.length;

    // Calcular subtotal
    cartData.forEach(item => {
        subtotal += item.price;
    });

    // Si no hay items, no calcular nada más
    if (totalItems === 0) {
        itemsCountEl.textContent = '0';
        subtotalEl.textContent = format(0);
        discountEl.textContent = '0% (0.00 USD)';
        surchargeEl.textContent = format(0);
        totalEl.textContent = format(0);
        perInstallmentEl.textContent = format(0);
        return;
    }

    // Descuento: cada 5 items => 5% extra, tope 15%
    const discountPercent = Math.min(Math.floor(totalItems / 5) * 5, 15);
    const discountAmount = subtotal * (discountPercent / 100);

    // Medio de pago: transferencia 0%, debito +5%, credito +7%
    let payment = document.querySelector('input[name="payment"]:checked').value;
    let surchargePercent = 0;
    if (payment === 'debit') surchargePercent = 5;
    if (payment === 'credit') surchargePercent = 7;

    const baseAfterDiscount = subtotal - discountAmount;
    const surchargeAmount = baseAfterDiscount * (surchargePercent / 100);
    const totalBeforeInstallments = baseAfterDiscount + surchargeAmount;

    // Recargo por cuotas: 3 cuotas 5%, 6 cuotas 10%, 9 cuotas 12%, 12 cuotas 15%
    const cuotas = Math.max(1, parseInt(installmentsSelect.value || 1));
    let installmentSurchargePercent = 0;
    if (cuotas === 3) installmentSurchargePercent = 5;
    else if (cuotas === 6) installmentSurchargePercent = 10;
    else if (cuotas === 9) installmentSurchargePercent = 12;
    else if (cuotas === 12) installmentSurchargePercent = 15;
    
    const installmentSurchargeAmount = totalBeforeInstallments * (installmentSurchargePercent / 100);
    const total = totalBeforeInstallments + installmentSurchargeAmount;
    const perInstallment = total / cuotas;

    // Actualizar UI
    itemsCountEl.textContent = totalItems;
    subtotalEl.textContent = format(subtotal);
    discountEl.textContent = `${discountPercent}% (${format(discountAmount)})`;
    // El surcharge muestra el recargo de pago + recargo de cuotas
    const totalSurcharge = surchargeAmount + installmentSurchargeAmount;
    surchargeEl.textContent = format(totalSurcharge);
    totalEl.textContent = format(total);
    perInstallmentEl.textContent = format(perInstallment);
}

// Configurar eventos
if (paymentRadios.length > 0) {
    paymentRadios.forEach(r => r.addEventListener('change', updateCart));
}

if (installmentsSelect) {
    installmentsSelect.addEventListener('change', updateCart);
}

// Botón de pago con animación
const payBtn = document.getElementById('payBtn');
if (payBtn) {
    payBtn.addEventListener('click', () => {
        // Verificar que hay items en el carrito
        if (cartData.length === 0) {
            alert('Tu carrito está vacío. Por favor, agrega productos antes de pagar.');
            return;
        }

        // Mostrar animación de agradecimiento
        const thankYouPopup = document.getElementById('thankYouPopup');
        if (thankYouPopup) {
            thankYouPopup.classList.add('show');
            
            // Limpiar el carrito después de mostrar la animación
            setTimeout(() => {
                cartData = [];
                localStorage.removeItem('gameCart');
                
                // Redirigir a carrito.html después de 3 segundos
                setTimeout(() => {
                    window.location.href = 'carrito.html';
                }, 3000);
            }, 2000);
        }
    });
}

// inicializar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    loadCartData();
    updateCart();
});