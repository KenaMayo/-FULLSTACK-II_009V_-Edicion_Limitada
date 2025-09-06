// Array de productos con toda la información necesaria
const products = [
    {
        id: 1,
        name: "Mono Lycra",
        designer: "Vnneno",
        price: 20000,
        stock: 10,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 2,
        name: 'Vestido Malla "Harness.azul"',
        designer: "Valentina Gaymer",
        price: 34990,
        stock: 5,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 3,
        name: 'Poleron "Heavenly"',
        designer: "Incorrecta",
        price: 44990,
        stock: 8,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 4,
        name: 'Abrigo "Antología"',
        designer: "Caro Moya",
        price: 150000,
        stock: 3,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 5,
        name: 'Polera "Eyes yamirajin"',
        designer: "Kuro Archives",
        price: 20000,
        stock: 15,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 6,
        name: "Multizipper jorts",
        designer: "Kuro Archives",
        price: 45000,
        stock: 7,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 7,
        name: 'Abrigo "Patria Rojo"',
        designer: "Lisauskas",
        price: 69990,
        stock: 4,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 8,
        name: "Collar mini Kitsune Desigual",
        designer: "Mitsuki Studios",
        price: 35000,
        stock: 20,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 9,
        name: "Corbatas 1/1",
        designer: "KAZÚ",
        price: 28000,
        stock: 12,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 10,
        name: "Corsét",
        designer: "ALTER",
        price: 39990,
        stock: 6,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 11,
        name: "Pant Legacy Origen",
        designer: "GAMEOVER",
        price: 74000,
        stock: 8,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 12,
        name: 'Blazer "Visage"',
        designer: "Caro Moya",
        price: 78990,
        stock: 5,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 13,
        name: "Poleron Angel",
        designer: "ALTER",
        price: 159990,
        stock: 3,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 14,
        name: "Poleron Toroide / Tarab",
        designer: "Lena Freestyle",
        price: 78000,
        stock: 7,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 15,
        name: "Chaqueta Legacy Origen",
        designer: "GAMEROVER",
        price: 110000,
        stock: 4,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 16,
        name: "Corset Ginebra",
        designer: "Hurga",
        price: 59990,
        stock: 9,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 17,
        name: "Collar Smile Skull",
        designer: "Sin Etiquetas",
        price: 15990,
        stock: 25,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 18,
        name: 'Poleron "Flower"',
        designer: "Happy Berry",
        price: 59990,
        stock: 6,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 19,
        name: "Polera Ribbon",
        designer: "Josefina Collection",
        price: 39990,
        stock: 10,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    },
    {
        id: 20,
        name: "Falda Asimetrica",
        designer: "Kazú",
        price: 59990,
        stock: 8,
        image: "assets/img/products/josefinacollection-PoleraRibbons.jpeg"
    }
];

// Función para formatear el precio en formato CLP
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

// Función para mostrar los primeros 8 productos en el index.html
function displayFeaturedProducts() {
    const productsContainer = document.querySelector('.products-section .row');
    if (!productsContainer) return;

    const featuredProducts = products.slice(0, 8); // Tomar solo los primeros 8 productos
    productsContainer.innerHTML = featuredProducts.map(product => `
        <div class="col-12 col-md-6 col-lg-3">
            <div class="product-card">
                <img src="${product.image}" class="product-image w-100" alt="${product.name}">
                <div class="p-3">
                    <h5 class="mb-2">${product.name}</h5>
                    <p class="text-muted mb-2">por ${product.designer}</p>
                    <p class="fw-bold mb-3">${formatPrice(product.price)}</p>
                    <button class="btn btn-outline-light w-100">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para mostrar productos en la vista de cliente (productos.html)
function displayProducts() {
    const productsContainer = document.querySelector('.products-grid .row');
    if (!productsContainer) return;

    productsContainer.innerHTML = products.map(product => `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="product-card-zoom">
                <div class="product-image-container">
                    <img src="${product.image}" class="product-image w-100" alt="${product.name}">
                </div>
                <div class="p-3">
                    <h5 class="mb-2">${product.name}</h5>
                    <p class="text-muted mb-2">${product.designer}</p>
                    <p class="fw-bold mb-3">${formatPrice(product.price)}</p>
                    <button class="btn btn-outline-light w-100">Agregar al Carrito</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para mostrar productos en la vista de administrador
function displayProductsAdmin() {
    const adminProductsContainer = document.querySelector('.admin-products-table');
    if (!adminProductsContainer) return;

    adminProductsContainer.innerHTML = `
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
                ${products.map(product => `
                    <tr>
                        <td>${product.id}</td>
                        <td><img src="${product.image}" alt="${product.name}" style="height: 50px;"></td>
                        <td>${product.name}</td>
                        <td>${product.designer}</td>
                        <td>${formatPrice(product.price)}</td>
                        <td>${product.stock}</td>
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

// Inicializar las vistas cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Intentar inicializar la vista de productos destacados (index.html)
    displayFeaturedProducts();
    // Intentar inicializar la vista de productos completa (productos.html)
    displayProducts();
    // Intentar inicializar la vista de administrador
    displayProductsAdmin();
});
