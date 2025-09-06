document.addEventListener('DOMContentLoaded', function() {
    const designers = [
        'Alter', 'Amanda', 'Caro Piña', 'Coca Moya', 'Cog by Cal',
        'Dreamworld', 'Fancy', 'Fran Garcia', 'Game Over', 'GOIS',
        'Happy Berry', 'Hurga', 'Incorrecta', 'Irreversible',
        'Josefina Collection', 'Kaosfera', 'Kazú', 'KELIO',
        'Kuro Archives', 'Lena Freestyle', 'Lisauskas', 'Mal Vidal',
        'Marta by Tamar', 'Mitsuki Studio', 'Sin Etiquetas',
        'Valentina Gaymer', 'Virtual Genesis', 'Vnneno'
    ].sort();

    const designersPerPage = 9;
    const totalPages = Math.ceil(designers.length / designersPerPage);
    
    function createDesignerCard(designer) {
        return `
            <div class="col-md-4">
                <div class="designer-card">
                    <img src="assets/img/brands/GameOver.jpg" alt="${designer}">
                    <div class="designer-name">${designer}</div>
                </div>
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

    // Add click handlers to alphabetical list
    document.querySelectorAll('.alphabet-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const designer = this.textContent;
            const index = designers.indexOf(designer);
            const page = Math.floor(index / designersPerPage) + 1;
            showPage(page);
        });
    });
});
