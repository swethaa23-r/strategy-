document.addEventListener('DOMContentLoaded', () => {
    // Auth Check
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    if (role === 'User') {
        window.location.href = 'user-dashboard.html';
        return;
    }
    if (role !== 'Admin') {
        window.location.href = 'login.html';
        return;
    }

    // Profile updates
    const emailDisplay = document.getElementById('adminEmailDisplay');
    if(emailDisplay && email) emailDisplay.innerText = email;
    const roleDisplay = document.getElementById('adminRoleDisplay');
    if(roleDisplay && role) roleDisplay.innerText = role;
    const profileRoleDisplay = document.getElementById('adminProfileRoleDisplay');
    if(profileRoleDisplay && role) profileRoleDisplay.innerText = role;

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
        if(sidebar) sidebar.classList.remove('-left-full');
        if(overlay) overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeSidebar();
        }
    });
    
    function closeSidebar() {
        if(sidebar) sidebar.classList.add('-left-full');
        if(overlay) overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (overlay) overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && !sidebar.classList.contains('-left-full')) {
            closeSidebar();
        }
    });

    if(sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('nav a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(window.innerWidth < 1024) {
                    closeSidebar();
                }
            });
        });
    }
});



