document.addEventListener('DOMContentLoaded', () => {
    // Password Toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if(togglePassword && passwordInput && eyeIcon) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            eyeIcon.classList.toggle('fa-eye');
            eyeIcon.classList.toggle('fa-eye-slash');
        });
    }

    // Form Validation
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && emailError) {
                if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                    email.classList.add('border-red-500');
                    email.classList.remove('border-gray-300');
                    emailError.classList.remove('hidden');
                    isValid = false;
                } else {
                    email.classList.remove('border-red-500');
                    email.classList.add('border-gray-300');
                    emailError.classList.add('hidden');
                }
            }

            const password = document.getElementById('password');
            const passwordError = document.getElementById('passwordError');
            
            if (password && passwordError) {
                if (!password.value || password.value.length < 6) {
                    password.classList.add('border-red-500');
                    password.classList.remove('border-gray-300');
                    passwordError.textContent = "Password must be at least 6 characters.";
                    passwordError.classList.remove('hidden');
                    isValid = false;
                } else {
                    password.classList.remove('border-red-500');
                    password.classList.add('border-gray-300');
                    passwordError.classList.add('hidden');
                }
            }
            
            const role = document.getElementById('role');
            const roleError = document.getElementById('roleError');
            
            if (role && roleError) {
                if (!role.value) {
                    role.classList.add('border-red-500');
                    role.classList.remove('border-gray-300');
                    roleError.classList.remove('hidden');
                    isValid = false;
                } else {
                    role.classList.remove('border-red-500');
                    role.classList.add('border-gray-300');
                    roleError.classList.add('hidden');
                }
            }

            if(isValid) {
                const btn = loginForm.querySelector('button[type="submit"]');
                if (btn) {
                    const originalText = btn.innerHTML;
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Signing in...';
                    btn.classList.add('opacity-75', 'cursor-not-allowed');
                    
                    localStorage.setItem("userEmail", email.value.trim());
                    localStorage.setItem("userRole", role.value);
                    localStorage.setItem("isLoggedIn", "true");
                    
                    setTimeout(() => {
                        if (role.value === 'Admin') {
                            window.location.href = 'admin-dashboard.html';
                        } else {
                            window.location.href = 'user-dashboard.html';
                        }
                    }, 1500);
                }
            }
        });
    }
});
