document.addEventListener('DOMContentLoaded', () => {
    // Auth Check
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    if (role === 'Admin') {
        window.location.href = 'admin-dashboard.html';
        return;
    }
    if (role !== 'User') {
        window.location.href = 'login.html';
        return;
    }

    // Profile updates
    const emailDisplay = document.getElementById('userEmailDisplay');
    if(emailDisplay && email) emailDisplay.innerText = email;
    
    const roleDisplay = document.getElementById('userRoleDisplay');
    if(roleDisplay && role) roleDisplay.innerText = role;

    const dynamicEmail = document.getElementById('dynamicEmail');
    if(dynamicEmail && email) dynamicEmail.innerText = email;
    
    const dynamicRole = document.getElementById('dynamicRole');
    if(dynamicRole && role) dynamicRole.innerText = role;

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        if(sidebar) sidebar.classList.remove('-translate-x-full');
        if(overlay) overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if(sidebar) sidebar.classList.add('-translate-x-full');
        if(overlay) overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && !sidebar.classList.contains('-translate-x-full')) {
            closeSidebar();
        }
    });

    if(sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('nav a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth < 768) {
                    closeSidebar();
                }
            });
        });
    }
});
