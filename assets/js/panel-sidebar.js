(() => {
  function init() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const links = document.querySelectorAll('.sidebar .nav-link');
    const mainContent = document.querySelector('.main-content');
    const isSmall = () => window.matchMedia('(max-width: 768px)').matches;
    
    // Crear overlay para móvil
    function createOverlay() {
      let overlay = document.getElementById('sidebar-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'sidebar-overlay';
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        
        // Cerrar al hacer click en overlay
        overlay.addEventListener('click', closeSidebar);
      }
      return overlay;
    }
    
    // Función para abrir sidebar
    function openSidebar() {
      if (!sidebar) return;
      
      sidebar.classList.add('show');
      
      if (isSmall()) {
        const overlay = createOverlay();
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    }
    
    // Función para cerrar sidebar
    function closeSidebar() {
      if (!sidebar) return;
      
      sidebar.classList.remove('show');
      
      const overlay = document.getElementById('sidebar-overlay');
      if (overlay) {
        overlay.classList.remove('show');
      }
      document.body.style.overflow = '';
    }

    // Toggle del botón hamburguesa
    toggleBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (sidebar?.classList.contains('show')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    // Cerrar sidebar al seleccionar una opción (solo en pantallas pequeñas)
    links.forEach(link => {
      link.addEventListener('click', () => {
        // Marcar como activo
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Cerrar en móvil
        if (isSmall() && sidebar?.classList.contains('show')) {
          setTimeout(closeSidebar, 150);
        }
      });
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isSmall() && sidebar?.classList.contains('show')) {
        closeSidebar();
      }
    });
    
    // Cerrar sidebar al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
      if (!isSmall()) {
        closeSidebar();
      }
    });

    // Marcar la opción activa según la URL actual
    function setActiveLink() {
      const currentPage = window.location.pathname.split('/').pop();
      links.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPage || 
            (currentPage === 'indexAdministrador.html' && href === 'indexAdministrador.html') ||
            (currentPage === '' && href === 'indexAdministrador.html')) {
          link.classList.add('active');
        }
      });
    }
    
    // Establecer enlace activo al cargar
    setActiveLink();
    
    // Debug
    console.log('Sidebar initialized:', {
      sidebar: !!sidebar,
      toggleBtn: !!toggleBtn,
      linksFound: links.length,
      isMobile: isSmall()
    });
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
