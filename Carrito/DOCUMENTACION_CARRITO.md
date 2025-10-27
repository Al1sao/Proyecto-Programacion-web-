# Documentación del Sistema de Carrito de Compras

## 📋 Índice
1. [carrito.html](#carritohtml)
2. [carrito2.html](#carrito2html)
3. [carrito-script.js](#carrito-scriptjs)
4. [script.js](#scriptjs)
5. [Flujo de Datos](#flujo-de-datos)

---

## 📄 carrito.html

### Descripción
Página principal del catálogo de juegos donde los usuarios pueden ver productos, agregarlos al carrito y visualizar su carrito de compras en tiempo real.

### Estructura Principal

#### 1. **Head Section** (Líneas 1-7)
```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Carrito de Juegos</title>
<link rel="stylesheet" href="Style.css">
```
- Enlace al archivo `Style.css` que proporciona el tema oscuro general
- Meta tags para responsividad

#### 2. **Estilos Adicionales** (Líneas 8-175)
CSS interno para:
- `.products` - Sección de productos con fondo semitransparente
- `.grid` - Grid responsive con `repeat(auto-fit, minmax(200px, 1fr))`
- `.product` - Tarjetas de productos con efectos hover
- `.cart` - Panel lateral del carrito
- `.product-buttons` - Contenedor de botones Agregar/Eliminar
- `.add-cart-btn` - Estilo verde (#45a29e)
- `.remove-cart-btn` - Estilo rojo (#c92a2a)
- `.btn-disabled` - Para deshabilitar botón de pago

#### 3. **Body - Header** (Líneas 178-180)
```html
<header>
    <h1>Carrito de compras - Juegos</h1>
</header>
```
Encabezado fijo con el título principal.

#### 4. **Body - Main** (Líneas 182-304)
```html
<main>
    <section class="products">
        <h2>Catálogo</h2>
        <div class="grid" id="productsGrid">
            <!-- Productos aquí -->
        </div>
    </section>
    
    <aside class="cart">
        <h2>Carrito de compras</h2>
        <ul id="cartItems"></ul>
        <div id="cartTotal"></div>
        <button id="payBtn">Ir a pagar</button>
    </aside>
</main>
```

**Estructura de cada producto:**
```html
<div class="product" data-price="19.99" data-name="The Witcher 3">
    <div class="name">The Witcher 3</div>
    <div class="price">19.99 €</div>
    <div class="product-buttons">
        <button class="add-cart-btn" onclick="addToCart('The Witcher 3', '19.99')">
            Agregar al carrito
        </button>
        <button class="remove-cart-btn" onclick="removeFromCart('The Witcher 3')">
            Eliminar del carrito
        </button>
    </div>
    <div class="in-cart-label"></div>
</div>
```

#### 5. **Footer** (Líneas 300-302)
Footer simple con copyright.

#### 6. **JavaScript** (Línea 303)
```html
<script src="carrito-script.js"></script>
```
Carga el archivo JavaScript que maneja la lógica del carrito.

### Funcionalidades
- ✅ Mostrar catálogo de 10 juegos
- ✅ Botón "Agregar al carrito" por producto
- ✅ Botón "Eliminar del carrito" (solo visible si está agregado)
- ✅ Validación: máximo 1 unidad por juego
- ✅ Actualización en tiempo real del total
- ✅ Visualización del carrito en panel lateral
- ✅ Botón "Ir a pagar" habilitado solo con productos

---

## 📄 carrito2.html

### Descripción
Página de pago y resumen de compra donde el usuario puede ver el detalle de su compra, elegir método de pago y completar la transacción.

### Estructura Principal

#### 1. **Head Section** (Líneas 1-7)
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pagar - Tienda de Juegos</title>
<link rel="stylesheet" href="Style.css">
```

#### 2. **Estilos** (Líneas 8-272)
CSS interno para:
- Layout centrado con max-width: 800px
- `.cart` - Contenedor principal con padding generoso (50px)
- `.summary-row` - Filas de información del resumen
- `.summary-row.total` - Estilo especial para la fila del total
- `.payment` - Fieldset para métodos de pago
- `.btn` - Botón de pagar
- `.thank-you-popup` - Popup de agradecimiento (oculto por defecto)
- Animaciones: `bounce`, `fadeIn`

#### 3. **Body - Main** (Líneas 278-324)
```html
<main>
    <aside class="cart">
        <h2>Resumen de compra</h2>
        
        <div class="summary-row">
            <span>Artículos:</span><span id="itemsCount">0</span>
        </div>
        
        <div class="summary-row">
            <span>Subtotal:</span><span id="subtotal">0.00 €</span>
        </div>
        
        <div class="summary-row">
            <span>Descuento:</span><span id="discount">0% (0.00 €)</span>
        </div>
        
        <fieldset class="payment">
            <legend>Medio de pago</legend>
            <label>Transferencia (sin recargo)</label>
            <label>Tarjeta débito (+5%)</label>
            <label>Tarjeta crédito (+7%)</label>
            <label class="cuotas">Cuotas: <select></select></label>
        </fieldset>
        
        <div class="summary-row">
            <span>Recargo pago:</span><span id="surcharge">0.00 €</span>
        </div>
        
        <div class="summary-row total">
            <span>Total:</span><span id="total">0.00 €</span>
        </div>
        
        <div class="summary-row">
            <span>Por cuota:</span><span id="perInstallment">0.00 €</span>
        </div>
        
        <button id="payBtn">Pagar Ahora</button>
    </aside>
</main>
```

#### 4. **Popup de Agradecimiento** (Líneas 330-337)
```html
<div class="thank-you-popup" id="thankYouPopup">
    <div class="thank-you-content">
        <div class="thank-you-icon">🎮</div>
        <div class="thank-you-title">¡Gracias!</div>
        <div class="thank-you-message">Gracias por tu compra en</div>
        <div class="thank-you-store">MKL Games</div>
    </div>
</div>
```

### Funcionalidades
- ✅ Leer productos del carrito desde localStorage
- ✅ Calcular subtotal, descuentos y recargos
- ✅ Actualizar total dinámicamente según método de pago
- ✅ Elegir número de cuotas
- ✅ Mostrar animación de agradecimiento al pagar
- ✅ Limpiar carrito después del pago
- ✅ Redirigir automáticamente a carrito.html

### Cálculos Implementados

**Descuentos:**
- Cada 5 artículos = 5% de descuento
- Máximo: 15% de descuento

**Recargos por método de pago:**
- Transferencia: 0%
- Tarjeta débito: +5%
- Tarjeta crédito: +7%

**Fórmula:**
```
Total = (Subtotal - Descuento) × (1 + Recargo de Pago)
Por Cuota = Total / Número de Cuotas
```

---

## 🔧 carrito-script.js

### Descripción
Script JavaScript que maneja toda la lógica del carrito de compras en `carrito.html`.

### Variables Globales
```javascript
let cart = []; // Array que almacena los productos agregados
```

### Funciones Principales

#### 1. `addToCart(productName, price)`
**Qué hace:** Agrega un producto al carrito.

**Parámetros:**
- `productName` - Nombre del juego (string)
- `price` - Precio del juego (number)

**Lógica:**
1. Verifica si el juego ya existe en el carrito
2. Si existe, muestra alerta y detiene ejecución
3. Si no existe, agrega al array `cart`
4. Guarda en localStorage con clave `'gameCart'`
5. Actualiza la visualización del carrito
6. Actualiza el estado de los botones de productos

#### 2. `removeFromCart(productName)`
**Qué hace:** Elimina un producto del carrito.

**Parámetros:**
- `productName` - Nombre del juego a eliminar

**Lógica:**
1. Filtra el array `cart` para eliminar el producto
2. Actualiza localStorage
3. Actualiza la visualización del carrito
4. Actualiza el estado de los botones en los productos

#### 3. `renderCart()`
**Qué hace:** Renderiza visualmente los productos en el carrito lateral.

**Lógica:**
1. Limpia el contenido del `<ul id="cartItems">`
2. Si el carrito está vacío:
   - Muestra mensaje "El carrito está vacío"
   - Deshabilita el botón de pagar
3. Si hay productos:
   - Crea un `<li>` por cada producto
   - Muestra nombre, precio y botón eliminar
   - Calcula y muestra el total
   - Habilita el botón de pagar

**Elemento creado:**
```html
<li class="cart-item">
    <div>
        <span>Nombre del juego</span>
        <div>
            <span>19.99 €</span>
            <button onclick="removeFromCart('Nombre')">Eliminar</button>
        </div>
    </div>
</li>
```

#### 4. `updateProductButtons()`
**Qué hace:** Actualiza qué botón mostrar (Agregar o Eliminar) para cada producto.

**Lógica:**
1. Recorre todos los productos en el DOM
2. Verifica si el producto está en el carrito
3. Si está en el carrito:
   - Oculta botón "Agregar"
   - Muestra botón "Eliminar"
   - Cambia etiqueta a "En carrito"
4. Si no está:
   - Muestra botón "Agregar"
   - Oculta botón "Eliminar"

### Eventos de Carga
```javascript
window.addEventListener('DOMContentLoaded', () => {
    // Cargar carrito guardado de localStorage
    const savedCart = localStorage.getItem('gameCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    
    // Renderizar carrito
    renderCart();
    
    // Actualizar estado de botones
    updateProductButtons();
});
```

### localStorage - Datos Guardados
```javascript
localStorage.setItem('gameCart', JSON.stringify(cart));
// Estructura: [{"name": "The Witcher 3", "price": 19.99}, ...]
```

---

## 🔧 script.js

### Descripción
Script que maneja la lógica de cálculo y visualización en `carrito2.html`.

### Variables Globales
```javascript
let cartData = []; // Array con los productos del carrito
```

### Funciones Principales

#### 1. `loadCartData()`
**Qué hace:** Carga los datos del carrito desde localStorage.

**Lógica:**
1. Obtiene el item `'gameCart'` de localStorage
2. Parsea el JSON
3. Guarda en `cartData`

#### 2. `updateCart()`
**Qué hace:** Calcula y actualiza todos los valores del resumen de compra.

**Pasos:**
1. **Cargar datos:** Si `cartData` está vacío, carga desde localStorage
2. **Calcular subtotal:** Suma los precios de todos los items
3. **Calcular descuento:**
   - Por cada 5 items = 5% de descuento
   - Máximo 15%
   ```javascript
   const discountPercent = Math.min(Math.floor(totalItems / 5) * 5, 15);
   ```
4. **Calcular recargo de pago:**
   - Transferencia: 0%
   - Débito: +5%
   - Crédito: +7%
5. **Calcular total y cuota:**
   ```javascript
   total = (subtotal - descuento) × (1 + recargo de pago)
   por cuota = total / número de cuotas
   ```
6. **Actualizar DOM:** Actualiza todos los elementos del resumen

#### 3. Event Listeners

**Cambio de método de pago:**
```javascript
paymentRadios.forEach(r => r.addEventListener('change', updateCart));
```

**Cambio de cuotas:**
```javascript
installmentsSelect.addEventListener('change', updateCart);
```

**Botón de pago:**
```javascript
payBtn.addEventListener('click', () => {
    // Validar que hay productos
    // Mostrar animación de agradecimiento
    // Limpiar carrito
    // Redirigir a carrito.html
});
```

### Funciones Auxiliares

#### `format(val)`
Convierte un número a formato de moneda.
```javascript
format(19.99) // "19.99 €"
```

### Elementos DOM Manipulados
- `#itemsCount` - Cantidad de artículos
- `#subtotal` - Subtotal sin descuentos
- `#discount` - Descuento aplicado
- `#surcharge` - Recargo por método de pago
- `#total` - Total final
- `#perInstallment` - Precio por cuota
- `#thankYouPopup` - Popup de agradecimiento

---

## 🔄 Flujo de Datos

### Flujo Completo

```
1. carrito.html (Página de Productos)
   ├── Usuario hace clic en "Agregar al carrito"
   ├── carrito-script.js → addToCart()
   ├── Producto agregado a array `cart`
   ├── Guardado en localStorage con clave 'gameCart'
   ├── Actualiza visualización del carrito
   └── Botón "Ir a pagar" se habilita

2. Usuario hace clic en "Ir a pagar"
   ├── Guarda total en localStorage
   └── Redirige a carrito2.html

3. carrito2.html (Página de Pago)
   ├── script.js → loadCartData()
   ├── Lee datos de localStorage
   ├── Calcula totales con updateCart()
   ├── Muestra resumen de compra
   └── Usuario selecciona método de pago y cuotas

4. Usuario hace clic en "Pagar Ahora"
   ├── Validación: verifica que hay productos
   ├── Muestra popup de agradecimiento
   ├── Limpia localStorage
   └── Redirige a carrito.html
```

### Estructura de Datos en localStorage

**Clave: 'gameCart'**
```json
[
    {
        "name": "The Witcher 3",
        "price": 19.99
    },
    {
        "name": "Cyberpunk 2077",
        "price": 29.99
    }
]
```

**Clave: 'cartTotal'**
```json
"49.98"
```

---

## 📝 Resumen de Archivos

| Archivo | Líneas | Responsabilidad |
|---------|--------|-----------------|
| `carrito.html` | 306 | UI de catálogo y carrito lateral |
| `carrito2.html` | 341 | UI de pago y resumen de compra |
| `carrito-script.js` | 137 | Lógica de agregar/eliminar productos |
| `script.js` | 118 | Cálculos de totales y procesamiento de pago |

---

## 🎨 Colores del Tema

- **Fondo principal:** `#0b0c10`
- **Fondo secundario:** `#1f2833`
- **Acento principal:** `#66fcf1`
- **Acento secundario:** `#45a29e`
- **Texto:** `#c5c6c7`
- **Botón eliminar:** `#c92a2a`
- **Advertencia:** `#e63946`

---

## ✅ Características Implementadas

- [x] Catálogo de 10 juegos
- [x] Agregar al carrito con validación de duplicados
- [x] Eliminar del carrito
- [x] Visualización en tiempo real
- [x] Persistencia de datos (localStorage)
- [x] Cálculo de descuentos por cantidad
- [x] Recargos por método de pago
- [x] Selector de cuotas
- [x] Animación de agradecimiento
- [x] Tema oscuro consistente
- [x] Diseño responsive

---

**Documentación generada el:** $(date)

