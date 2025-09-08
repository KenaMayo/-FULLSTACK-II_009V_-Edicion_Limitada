// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Shopping Cart Functionality (basic)
    document.getElementById('cartButton').addEventListener('click', function() {
        alert('Funcionalidad del carrito en desarrollo');
    });

    // Admin Sidebar Toggle for Mobile
    initAdminSidebarToggle();
});

// Function to initialize admin sidebar toggle
function initAdminSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }
}
