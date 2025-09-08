document.addEventListener('DOMContentLoaded', function() {
    const designers = [
        { name: 'Alter', image: 'assets/img/brands/Alter.jpg', url: 'designers/alter.html' },
        { name: 'Amanda', image: 'assets/img/brands/Amanda.jpg', url: 'designers/amanda.html' },
        { name: 'Caro Piña', image: 'assets/img/brands/CaroPiña.jpg', url: 'designers/caro-pina.html' },
        { name: 'Coca Moya', image: 'assets/img/brands/CaroMoya.jpg', url: 'designers/coca-moya.html' },
        { name: 'Cog by Cal', image: 'assets/img/brands/Cogbycal.jpg', url: 'designers/cog-by-cal.html' },
        { name: 'Dreamworld', image: 'assets/img/brands/Dreamworld.jpg', url: 'designers/dreamworld.html' },
        { name: 'Fancy', image: 'assets/img/brands/Fancy.jpg', url: 'designers/fancy.html' },
        { name: 'Fran Garcia', image: 'assets/img/brands/FranGarcia.jpg', url: 'designers/fran-garcia.html' },
        { name: 'Game Over', image: 'assets/img/brands/GameOver.jpg', url: 'designers/game-over.html' },
        { name: 'GOIS', image: 'assets/img/brands/Gois.jpg', url: 'designers/gois.html' },
        { name: 'Happy Berry', image: 'assets/img/brands/HappyBerry.jpg', url: 'designers/happy-berry.html' },
        { name: 'Hurga', image: 'assets/img/brands/Hurga.jpg', url: 'designers/hurga.html' },
        { name: 'Incorrecta', image: 'assets/img/brands/Incorrecta.jpg', url: 'designers/incorrecta.html' },
        { name: 'Irreversible', image: 'assets/img/brands/Irreversible.jpg', url: 'designers/irreversible.html' },
        { name: 'Josefina Collection', image: 'assets/img/brands/Josefina Colection.jpg', url: 'designers/josefina-collection.html' },
        { name: 'Kaosfera', image: 'assets/img/brands/Kaosfera.jpg', url: 'designers/kaosfera.html' },
        { name: 'Kazú', image: 'assets/img/brands/Kazu.jpg', url: 'designers/kazu.html' },
        { name: 'KELIO', image: 'assets/img/brands/Kelio.jpg', url: 'designers/kelio.html' },
        { name: 'Kuro Archives', image: 'assets\img\brands\Kuro Archives.jpg', url: 'designers/kuro-archives.html' },
        { name: 'Lena Freestyle', image: 'assets/img/brands/LenaFreestyle.jpg', url: 'designers/lena-freestyle.html' },
        { name: 'Lisauskas', image: 'assets/img/brands/LISAUSKAS.jpg', url: 'designers/lisauskas.html' },
        { name: 'Mal Vidal', image: 'assets/img/brands/Malvidal.jpg', url: 'designers/mal-vidal.html' },
        { name: 'Marta by Tamar', image: 'assets/img/brands/Martabytamar.jpg', url: 'designers/marta-by-tamar.html' },
        { name: 'Mitsuki Studio', image: 'assets/img/brands/Mitsuki Studio.jpg', url: 'designers/mitsuki-studio.html' },
        { name: 'Sin Etiquetas', image: 'assets/img/brands/Sin Etiquetas.jpg', url: 'designers/sin-etiquetas.html' },
        { name: 'Valentina Gaymer', image: 'assets/img/brands/ValentinaGaymer.jpg', url: 'designers/valentina-gaymer.html' },
        { name: 'Virtual Genesis', image: 'assets/img/brands/VirtualGenesis.jpg', url: 'designers/virtual-genesis.html' },
        { name: 'Vnneno', image: 'assets/img/brands/Vnneno.jpg', url: 'designers/vnneno.html' }
    ].sort((a, b) => a.name.localeCompare(b.name));

    const designersPerPage = 9;
    const totalPages = Math.ceil(designers.length / designersPerPage);
    
    function createDesignerCard(designer) {
        return `
            <div class="col-md-4">
                <a href="${designer.url}" class="text-decoration-none">
                    <div class="designer-card">
                        <img src="${designer.image}" alt="${designer.name}" class="designer-image">
                        <div class="designer-name">${designer.name}</div>
                    </div>
                </a>
            </div>
        `;
    }

    function showPage(pageNumber) {
        const start = (pageNumber - 1) * designersPerPage;
        const end = start + designersPerPage;
        const pageDesigners = designers.slice(start, end);
        
        const grid = document.querySelector('.designers-grid .row');
        grid.innerHTML = pageDesigners.map(designer => createDesignerCard(designer)).join('');
        
        // Update active state in pagination
        document.querySelectorAll('.page-item').forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('.page-link').textContent == pageNumber) {
                item.classList.add('active');
            }
        });
    }

    // Create pagination
    function createPagination() {
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = ''; // Clear existing pagination

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = 'page-item';
        prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>`;
        pagination.appendChild(prevLi);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = 'page-item';
            li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
            pagination.appendChild(li);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = 'page-item';
        nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>`;
        pagination.appendChild(nextLi);

        // Add click handlers
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                let currentPage = document.querySelector('.page-item.active .page-link');
                let pageNumber;

                if (this.getAttribute('aria-label') === 'Previous') {
                    pageNumber = Math.max(1, parseInt(currentPage.dataset.page) - 1);
                } else if (this.getAttribute('aria-label') === 'Next') {
                    pageNumber = Math.min(totalPages, parseInt(currentPage.dataset.page) + 1);
                } else {
                    pageNumber = parseInt(this.dataset.page);
                }

                showPage(pageNumber);
            });
        });
    }

    // Initialize pagination
    createPagination();

    // Show first page by default
    showPage(1);

    // No necesitamos event listeners para la lista alfabética ya que los enlaces funcionan por sí mismos
    // Los enlaces en el HTML ya tienen las URLs correctas
});
