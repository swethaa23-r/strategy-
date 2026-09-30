document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS Init
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, offset: 50, duration: 800, easing: 'ease-out-cubic' });
    }

    // 2. Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const body = document.body;
    
    function openMenu() {
        if(!menu) return;
        menu.classList.remove('-right-full'); menu.classList.add('right-0');
        if(overlay) {
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        }
        body.style.overflow = 'hidden';
        if(menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        }
    }
    
    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
    
    function closeMenu() {
        if(!menu) return;
        menu.classList.remove('right-0'); menu.classList.add('-right-full');
        if(overlay) {
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
        body.style.overflow = '';
        if(menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        }
    }
    
    if(menuBtn && menu) {
        menuBtn.addEventListener('click', (e) => {
            if (menu.classList.contains('-right-full')) {
                openMenu();
            } else {
                closeMenu();
            }
        });
        if(overlay) overlay.addEventListener('click', closeMenu);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !menu.classList.contains('-right-full')) closeMenu();
        });
        
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 3. Dropdown Menus
    const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = toggle.getAttribute('data-dropdown-toggle');
            const target = document.getElementById(targetId);
            if(target) target.classList.toggle('hidden');
        });
    });
    document.addEventListener('click', (e) => {
        dropdownToggles.forEach(toggle => {
            const targetId = toggle.getAttribute('data-dropdown-toggle');
            const target = document.getElementById(targetId);
            if(target && !target.contains(e.target) && !toggle.contains(e.target)) {
                target.classList.add('hidden');
            }
        });
    });

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Active Navigation
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if(!href || href.startsWith('javascript:')) return;
        
        // Remove existing hardcoded active classes
        link.classList.remove('border-b-2', 'border-brand-orange', 'pb-1', 'text-brand-orange', 'border-transparent');
        
        // Skip logo and CTA
        if(link.textContent.trim() === 'STACKLY' || link.textContent.trim() === 'Login') return;

        if (href === currentPath) {
            link.classList.add('border-b-2', 'border-brand-orange', 'pb-1', 'text-brand-orange');
        }
    });

    // 6. Scroll Effects & Header Shadow
    const header = document.querySelector('nav');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('shadow-lg', 'bg-opacity-95');
            } else {
                header.classList.remove('shadow-lg', 'bg-opacity-95');
            }
        }, { passive: true });
    }

    // 8. Counters Animation
    const counters = document.querySelectorAll('.counter-value, [data-counter]');
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetNum = parseInt(target.getAttribute('data-target') || target.innerText.replace(/[^0-9]/g, ''), 10);
                    if (isNaN(targetNum)) return;
                    
                    let startNum = 0;
                    const duration = 2000;
                    const step = targetNum / (duration / 16);
                    
                    const updateCounter = () => {
                        startNum += step;
                        if (startNum < targetNum) {
                            target.innerText = Math.ceil(startNum) + (target.innerText.includes('+') ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.innerText = targetNum + (target.innerText.includes('+') ? '+' : '');
                        }
                    };
                    updateCounter();
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            if(!counter.hasAttribute('data-target')) {
                counter.setAttribute('data-target', counter.innerText.replace(/[^0-9]/g, ''));
                counter.innerText = '0' + (counter.innerText.includes('+') ? '+' : '');
            }
            counterObserver.observe(counter);
        });
    }
});

    // 9. Generic Form Handling
    document.querySelectorAll('form').forEach(form => {
        if (form.id === 'loginForm' || form.id === 'signupForm') return; // Handled by their specific scripts
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            form.querySelectorAll('[required]').forEach(input => {
                const errorId = (input.id || 'field_' + Math.random().toString(36).substr(2, 9)) + 'Error';
                let errorMsg = document.getElementById(errorId);
                
                if (!errorMsg) {
                    errorMsg = document.createElement('p');
                    errorMsg.id = errorId;
                    errorMsg.className = 'text-red-500 text-xs mt-1 hidden';
                    errorMsg.innerText = 'This field is required.';
                    if(input.parentNode) {
                        input.parentNode.appendChild(errorMsg);
                    }
                }

                if (!input.value.trim() || (input.type === 'checkbox' && !input.checked)) {
                    input.classList.add('border-red-500');
                    if(errorMsg) errorMsg.classList.remove('hidden');
                    isValid = false;
                } else {
                    input.classList.remove('border-red-500');
                    if(errorMsg) errorMsg.classList.add('hidden');
                }
            });

            if (isValid) {
                const btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
                const originalText = btn ? btn.innerHTML : '';
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = '<i class=\"fas fa-spinner fa-spin mr-2\"></i>Processing...';
                    btn.classList.add('opacity-75', 'cursor-not-allowed');
                }
                
                setTimeout(() => {
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                        btn.classList.remove('opacity-75', 'cursor-not-allowed');
                    }
                    
                    form.reset();
                    
                    let successMsg = form.querySelector('.form-success-msg');
                    if (!successMsg) {
                        successMsg = document.createElement('div');
                        successMsg.className = 'form-success-msg bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 mt-4';
                        successMsg.innerHTML = '<strong class=\"font-bold\">Success!</strong><span class=\"block sm:inline\"> Action completed successfully.</span>';
                        form.prepend(successMsg);
                    }
                    successMsg.classList.remove('hidden');
                    
                    setTimeout(() => {
                        if (successMsg) successMsg.classList.add('hidden');
                    }, 5000);
                }, 1500);
            }
        });
    });
    
    // FAQ Accordion Logic
    document.addEventListener("DOMContentLoaded", () => {
        const faqHeaders = document.querySelectorAll(".faq-header");
        faqHeaders.forEach(header => {
            header.addEventListener("click", () => {
                const item = header.closest(".faq-item");
                const content = item.querySelector(".faq-content");
                const icon = header.querySelector(".faq-icon");

                if(!content) return;

                const isCurrentlyActive = !content.classList.contains("hidden");

                const container = item.parentElement;
                container.querySelectorAll(".faq-item").forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector(".faq-content");
                        const otherHeader = otherItem.querySelector(".faq-header");
                        const otherIcon = otherItem.querySelector(".faq-icon");
                        
                        if (otherContent && !otherContent.classList.contains("hidden")) {
                            otherContent.classList.add("hidden");
                            
                            if (otherIcon) {
                                otherIcon.classList.remove("fa-chevron-up");
                                otherIcon.classList.add("fa-chevron-down");
                            }
                            
                            if (otherHeader && otherHeader.dataset.activeClasses && otherHeader.dataset.inactiveClasses) {
                                const activeClasses = otherHeader.dataset.activeClasses.split(" ").filter(c => c);
                                const inactiveClasses = otherHeader.dataset.inactiveClasses.split(" ").filter(c => c);
                                otherHeader.classList.remove(...activeClasses);
                                otherHeader.classList.add(...inactiveClasses);
                            }
                        }
                    }
                });

                if (isCurrentlyActive) {
                    content.classList.add("hidden");
                    if (icon) {
                        icon.classList.remove("fa-chevron-up");
                        icon.classList.add("fa-chevron-down");
                    }

                    if (header.dataset.activeClasses && header.dataset.inactiveClasses) {
                        const activeClasses = header.dataset.activeClasses.split(" ").filter(c => c);
                        const inactiveClasses = header.dataset.inactiveClasses.split(" ").filter(c => c);
                        header.classList.remove(...activeClasses);
                        header.classList.add(...inactiveClasses);
                    }
                } else {
                    content.classList.remove("hidden");
                    if (icon) {
                        icon.classList.remove("fa-chevron-down");
                        icon.classList.add("fa-chevron-up");
                    }

                    if (header.dataset.activeClasses && header.dataset.inactiveClasses) {
                        const activeClasses = header.dataset.activeClasses.split(" ").filter(c => c);
                        const inactiveClasses = header.dataset.inactiveClasses.split(" ").filter(c => c);
                        header.classList.remove(...inactiveClasses);
                        header.classList.add(...activeClasses);
                    }
                }
            });
        });
    });





