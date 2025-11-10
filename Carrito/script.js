let cartData = [];
function loadCartData() {
  const saved = localStorage.getItem('gameCart');
  if (saved) cartData = JSON.parse(saved);
}

const itemsCountEl = document.getElementById('itemsCount');
const subtotalEl = document.getElementById('subtotal');
const discountEl = document.getElementById('discount');
const surchargeEl = document.getElementById('surcharge');
const totalEl = document.getElementById('total');
const perInstallmentEl = document.getElementById('perInstallment');
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const installmentsSelect = document.getElementById('installments');

const format = val => `${val.toFixed(2)} USD`;

function updateCart() {
  if (!cartData.length) loadCartData();
  let subtotal = 0;
  cartData.forEach(i => subtotal += i.price);
  const totalItems = cartData.length;
  if (!totalItems) {
    itemsCountEl.textContent = '0';
    subtotalEl.textContent = discountEl.textContent = surchargeEl.textContent = totalEl.textContent = perInstallmentEl.textContent = format(0);
    discountEl.textContent = '0% (0.00 USD)';
    return;
  }
  const discountPercent = Math.min(Math.floor(totalItems / 5) * 5, 15);
  const discountAmount = subtotal * (discountPercent / 100);
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const surchargePercent = payment === 'debit' ? 5 : payment === 'credit' ? 7 : 0;
  const base = subtotal - discountAmount;
  const surchargeAmount = base * (surchargePercent / 100);
  const cuotas = parseInt(installmentsSelect.value || 1);
  const extra = cuotas === 3 ? 5 : cuotas === 6 ? 10 : cuotas === 9 ? 12 : cuotas === 12 ? 15 : 0;
  const extraAmount = (base + surchargeAmount) * (extra / 100);
  const total = base + surchargeAmount + extraAmount;
  const perInstallment = total / cuotas;
  itemsCountEl.textContent = totalItems;
  subtotalEl.textContent = format(subtotal);
  discountEl.textContent = `${discountPercent}% (${format(discountAmount)})`;
  surchargeEl.textContent = format(surchargeAmount + extraAmount);
  totalEl.textContent = format(total);
  perInstallmentEl.textContent = format(perInstallment);
}

paymentRadios.forEach(r => r.addEventListener('change', updateCart));
installmentsSelect.addEventListener('change', updateCart);

const payBtn = document.getElementById('payBtn');
if (payBtn) {
  payBtn.addEventListener('click', () => {
    if (!cartData.length) return alert('Tu carrito está vacío.');
    const popup = document.getElementById('thankYouPopup');
    if (popup) {
      popup.classList.add('show');
      setTimeout(() => {
        cartData = [];
        localStorage.removeItem('gameCart');
        setTimeout(() => window.location.href = 'carrito.html', 3000);
      }, 2000);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => { loadCartData(); updateCart(); });
