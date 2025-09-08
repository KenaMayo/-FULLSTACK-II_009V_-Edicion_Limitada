// ============================
// Datos
// ============================
const products = [
  { id: 1,  name: "Mono Lycra",                   designer: "Vnneno",             price: 20000,  stock: 10, image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 2,  name: 'Vestido Malla "Harness.azul"', designer: "Valentina Gaymer",   price: 34990,  stock: 5,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 3,  name: 'Poleron "Heavenly"',           designer: "Incorrecta",         price: 44990,  stock: 8,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 4,  name: 'Abrigo "Antología"',           designer: "Caro Moya",          price: 150000, stock: 3,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 5,  name: 'Polera "Eyes yamirajin"',      designer: "Kuro Archives",      price: 20000,  stock: 15, image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 6,  name: "Multizipper jorts",            designer: "Kuro Archives",      price: 45000,  stock: 7,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 7,  name: 'Abrigo "Patria Rojo"',         designer: "Lisauskas",          price: 69990,  stock: 4,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 8,  name: "Collar mini Kitsune Desigual", designer: "Mitsuki Studios",    price: 35000,  stock: 20, image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 9,  name: "Corbatas 1/1",                 designer: "KAZÚ",               price: 28000,  stock: 12, image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 10, name: "Corsét",                        designer: "ALTER",              price: 39990,  stock: 6,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 11, name: "Pant Legacy Origen",           designer: "GAMEOVER",           price: 74000,  stock: 8,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 12, name: 'Blazer "Visage"',              designer: "Caro Moya",          price: 78990,  stock: 5,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 13, name: "Poleron Angel",                designer: "ALTER",              price: 159990, stock: 3,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 14, name: "Poleron Toroide / Tarab",      designer: "Lena Freestyle",     price: 78000,  stock: 7,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 15, name: "Chaqueta Legacy Origen",       designer: "GAMEROVER",          price: 110000, stock: 4,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 16, name: "Corset Ginebra",               designer: "Hurga",              price: 59990,  stock: 9,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 17, name: "Collar Smile Skull",           designer: "Sin Etiquetas",      price: 15990,  stock: 25, image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 18, name: 'Poleron "Flower"',             designer: "Happy Berry",        price: 59990,  stock: 6,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 19, name: "Polera Ribbon",                designer: "Josefina Collection",price: 39990,  stock: 10, image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" },
  { id: 20, name: "Falda Asimetrica",             designer: "Kazú",               price: 59990,  stock: 8,  image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg" }
];

const productSpecs = {
  1: { features: ["Tejido lycra elástico", "Corte ajustado", "Color negro"], materials: "Lycra 92% · Elastano 8%", care: "Lavado a mano en agua fría", sku: "EL-0001" },
  2: { features: ["Malla semitransparente", "Ajuste tipo harness", "Tono azul"], materials: "Poliéster 95% · Elastano 5%", care: "Lavado delicado / secado a la sombra", sku: "EL-0002" },
  3: { features: ["Felpa suave interior", "Capucha amplia", "Gráfico 'Heavenly'"], materials: "Algodón 80% · Poliéster 20%", care: "Lavado ciclo suave", sku: "EL-0003" }
};

// ============================
// Estado carrito + offcanvas
// ============================
let cart = []; // [{id,name,price,image,qty}]
let cartOffcanvasInstance = null;

// ============================
// Persistencia localStorage
// ============================
const CART_KEY = 'el_cart_v1';

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
function saveCartToStorage() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // ignore
  }
}

// ============================
// Utilidades
// ============================
function formatPrice(price) {
  try {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(price);
  } catch {
    return '$' + (price || 0).toLocaleString('es-CL');
  }
}
function escapeHtml(str){ return (str||'').replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#039;' }[m])); }
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

// ============================
// Render index destacados (si existe)
// ============================
function displayFeaturedProducts() {
  const wrap = document.querySelector('.products-section .row');
  if (!wrap) return;
  const featured = products.slice(0, 8);
  wrap.innerHTML = featured.map(p => `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="product-card">
        <img src="${p.image}" class="product-image w-100" alt="${escapeHtml(p.name)}">
        <div class="p-3">
          <h5 class="mb-2">${p.name}</h5>
          <p class="text-muted mb-2">por ${p.designer}</p>
          <p class="fw-bold mb-3">${formatPrice(p.price)}</p>
          <button class="btn btn-outline-light w-100">Agregar al Carrito</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================
// Render productos (productos.html)
// ============================
function displayProducts() {
  const wrap = document.querySelector('.products-grid .row');
  if (!wrap) return;

  wrap.innerHTML = products.map((p, idx) => {
    const canAdd = idx < 3; // solo los tres primeros
    const addBtn = canAdd
      ? `<button class="btn btn-outline-light w-100 add-to-cart" data-id="${p.id}">
           <i class="fas fa-cart-plus me-1"></i> Añadir al carrito
         </button>`
      : `<button class="btn btn-outline-secondary w-100" disabled>No disponible</button>`;

    const detailsAttr = canAdd ? `data-id="${p.id}"` : '';
    const detailsClass = canAdd ? 'details-enabled' : '';

    return `
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="product-card-zoom ${detailsClass}" ${detailsAttr}>
          <div class="product-image-container">
            <img src="${p.image}" class="product-image w-100" alt="${escapeHtml(p.name)}">
          </div>
          <div class="p-3">
            <h5 class="mb-2">${p.name}</h5>
            <p class="text-muted mb-2">${p.designer}</p>
            <p class="fw-bold mb-3">${formatPrice(p.price)}</p>
            ${addBtn}
          </div>
        </div>
      </div>
    `;
  }).join('');

  initCartForProductsPage();
  initDetailsForFirstThree();
  updateAddButtonsFromCart(); // desactiva botones de los ya agregados
}

// ============================
// Admin (si corresponde en otras vistas)
// ============================
function displayProductsAdmin() {
  const container = document.querySelector('.admin-products-table');
  if (!container) return;
  container.innerHTML = `
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Diseñador</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(p => `
          <tr>
            <td>${p.id}</td>
            <td><img src="${p.image}" alt="${escapeHtml(p.name)}" style="height: 50px;"></td>
            <td>${p.name}</td>
            <td>${p.designer}</td>
            <td>${formatPrice(p.price)}</td>
            <td>${p.stock}</td>
            <td>
              <button class="btn btn-sm btn-primary me-1">Editar</button>
              <button class="btn btn-sm btn-danger">Eliminar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ============================
// Carrito (usa #cartOffcanvas del HTML)
// ============================
function initCartForProductsPage() {
  const grid = document.querySelector('.products-grid .row');
  if (!grid) return;

  // instanciar offcanvas
  const offcanvasEl = document.getElementById('cartOffcanvas');
  if (offcanvasEl) cartOffcanvasInstance = new bootstrap.Offcanvas(offcanvasEl);

  // Cargar carrito persistido
  cart = loadCartFromStorage();

  // Abrir con el botón del navbar
  const cartButton = document.getElementById('cartButton');
  if (cartButton && cartOffcanvasInstance) {
    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      cartOffcanvasInstance.show();
    });
  }

  // Añadir 1 unidad desde la tarjeta (solo 3 primeros)
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // evita abrir modal
      const id = Number(btn.dataset.id);
      addToCart(id, 1);

      // feedback visual
      btn.classList.remove('btn-outline-light');
      btn.classList.add('btn-success');
      btn.innerHTML = '<i class="fas fa-check me-1"></i> Añadido';
      btn.disabled = true;

      renderCart();
      cartOffcanvasInstance?.show();
    });
  });

  // Eliminar item (delegación sobre la lista)
  const itemsEl = document.getElementById('cartItems');
  if (itemsEl) {
    itemsEl.addEventListener('click', (e) => {
      const delBtn = e.target.closest('.btn-delete');
      if (!delBtn) return;
      const id = Number(delBtn.dataset.id);
      removeFromCart(id);
      renderCart();
      updateAddButtonsFromCart(); // re-habilita el botón en la card si corresponde
    });
  }

  renderCart();
}

function addToCart(id, qtyToAdd) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;

  const existing = cart.find(i => i.id === id);
  if (!existing) {
    cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty: clamp(qtyToAdd, 1, 3) });
  } else {
    existing.qty = clamp(existing.qty + qtyToAdd, 1, 3); // máximo 3 por producto
  }
  saveCartToStorage();
}

function removeFromCart(id) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx !== -1) {
    cart.splice(idx, 1);
    saveCartToStorage();
  }
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!itemsEl || !totalEl) return;

  if (!cart.length) {
    itemsEl.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
    totalEl.textContent = formatPrice(0);
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <li class="list-group-item bg-dark text-white border-secondary d-flex align-items-center">
      <img src="${item.image}" alt="${escapeHtml(item.name)}" class="me-3 rounded" style="width:48px;height:48px;object-fit:cover;">
      <div class="flex-grow-1">
        <div class="small">${item.name}</div>
        <div class="text-muted small">x${item.qty} · ${formatPrice(item.price)}</div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div class="fw-semibold">${formatPrice(item.price * item.qty)}</div>
        <button type="button" class="btn btn-sm btn-outline-danger btn-delete" data-id="${item.id}" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </li>
  `).join('');

  const total = cart.reduce((sum, it) => sum + it.price * it.qty, 0);
  totalEl.textContent = formatPrice(total);
}

// Deshabilita/habilita botones "Añadir al carrito" según estado del carrito
function updateAddButtonsFromCart() {
  const idsInCart = new Set(cart.map(i => i.id));
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    const id = Number(btn.dataset.id);
    if (idsInCart.has(id)) {
      btn.classList.remove('btn-outline-light');
      btn.classList.add('btn-success');
      btn.innerHTML = '<i class="fas fa-check me-1"></i> Añadido';
      btn.disabled = true;
    } else {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-outline-light');
      btn.innerHTML = '<i class="fas fa-cart-plus me-1"></i> Añadir al carrito';
      btn.disabled = false;
    }
  });
}

// ============================
// Modal de detalles (usa #productDetailsModal del HTML)
// ============================
function initDetailsForFirstThree() {
  document.querySelectorAll('.product-card-zoom.details-enabled').forEach(card => {
    card.addEventListener('click', () => {
      const id = Number(card.getAttribute('data-id'));
      const prod = products.find(p => p.id === id);
      if (!prod) return;
      showProductDetailsModal(prod, productSpecs[id]);
    });
  });
}

function showProductDetailsModal(prod, spec) {
  const modalEl = document.getElementById('productDetailsModal');
  if (!modalEl) return;

  const titleEl = modalEl.querySelector('#pdTitle');
  const bodyEl  = modalEl.querySelector('#pdBody');
  const addBtn  = modalEl.querySelector('#pdAddBtn');

  titleEl.textContent = prod.name;

  const features = (spec?.features || []).map(f => `<li>${escapeHtml(f)}</li>`).join('') || '<li>Especificaciones próximamente</li>';
  const materials = spec?.materials ? `<p class="mb-1"><strong>Materiales:</strong> ${escapeHtml(spec.materials)}</p>` : '';
  const care = spec?.care ? `<p class="mb-1"><strong>Cuidado:</strong> ${escapeHtml(spec.care)}</p>` : '';
  const sku = spec?.sku ? `<p class="mb-0 text-muted"><small>SKU: ${escapeHtml(spec.sku)}</small></p>` : '';

  bodyEl.innerHTML = `
    <div class="row g-3">
      <div class="col-md-5">
        <img src="${prod.image}" alt="${escapeHtml(prod.name)}" class="w-100 rounded" style="object-fit:cover;max-height:300px;">
      </div>
      <div class="col-md-7">
        <p class="mb-1 text-muted">por ${escapeHtml(prod.designer)}</p>
        <p class="fw-bold fs-5">${formatPrice(prod.price)}</p>

        <div class="d-flex align-items-center gap-2 my-2">
          <label for="pdQty" class="form-label mb-0">Cantidad:</label>
          <div class="input-group" style="width: 140px;">
            <button class="btn btn-outline-light" type="button" id="qtyMinus">−</button>
            <input type="number" id="pdQty" class="form-control bg-dark text-white text-center" value="1" min="1" max="3">
            <button class="btn btn-outline-light" type="button" id="qtyPlus">+</button>
          </div>
          <small class="text-muted">máx. 3</small>
        </div>

        <h6 class="mt-3">Especificaciones</h6>
        <ul class="mb-3">${features}</ul>
        ${materials}
        ${care}
        ${sku}
      </div>
    </div>
  `;

  // Controles de cantidad (1–3)
  const qtyInput = bodyEl.querySelector('#pdQty');
  const minusBtn = bodyEl.querySelector('#qtyMinus');
  const plusBtn  = bodyEl.querySelector('#qtyPlus');
  minusBtn.addEventListener('click', () => qtyInput.value = clamp(parseInt(qtyInput.value || '1', 10) - 1, 1, 3));
  plusBtn .addEventListener('click', () => qtyInput.value = clamp(parseInt(qtyInput.value || '1', 10) + 1, 1, 3));

  // Acción: añadir al carrito y abrir offcanvas
  addBtn.onclick = () => {
    const qty = clamp(parseInt(qtyInput.value || '1', 10), 1, 3);
    addToCart(prod.id, qty);
    renderCart();
    updateAddButtonsFromCart();

    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.hide();
    cartOffcanvasInstance?.show();
  };

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

// ============================
// Init
// ============================
document.addEventListener('DOMContentLoaded', () => {
  displayFeaturedProducts(); // si existe en index
  displayProducts();         // productos.html
  displayProductsAdmin();    // si existe tabla admin
});