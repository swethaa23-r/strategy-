document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    
    if(signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Full Name Validation
            const fullName = document.getElementById('fullName');
            const nameError = document.getElementById('nameError');
            if (fullName && nameError) {
                if (!fullName.value.trim()) {
                    fullName.classList.add('border-red-500');
                    fullName.classList.remove('border-gray-300');
                    nameError.classList.remove('hidden');
                    isValid = false;
                } else {
                    fullName.classList.remove('border-red-500');
                    fullName.classList.add('border-gray-300');
                    nameError.classList.add('hidden');
                }
            }
            
            // Email Validation
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
            
            // Phone Validation
            const phone = document.getElementById('phone');
            const phoneError = document.getElementById('phoneError');
            if (phone && phoneError) {
                if (!phone.value.trim() || phone.value.trim().length < 8) {
                    phone.classList.add('border-red-500');
                    phone.classList.remove('border-gray-300');
                    phoneError.classList.remove('hidden');
                    isValid = false;
                } else {
                    phone.classList.remove('border-red-500');
                    phone.classList.add('border-gray-300');
                    phoneError.classList.add('hidden');
                }
            }

            // Role Validation
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

            // Password Validation
            const password = document.getElementById('password');
            const passwordError = document.getElementById('passwordError');
            if (password && passwordError) {
                if (!password.value || password.value.length < 6) {
                    password.classList.add('border-red-500');
                    password.classList.remove('border-gray-300');
                    passwordError.classList.remove('hidden');
                    isValid = false;
                } else {
                    password.classList.remove('border-red-500');
                    password.classList.add('border-gray-300');
                    passwordError.classList.add('hidden');
                }
            }
            
            // Confirm Password Validation
            const confirmPassword = document.getElementById('confirmPassword');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            if (confirmPassword && confirmPasswordError && password) {
                if (confirmPassword.value !== password.value || !confirmPassword.value) {
                    confirmPassword.classList.add('border-red-500');
                    confirmPassword.classList.remove('border-gray-300');
                    confirmPasswordError.classList.remove('hidden');
                    isValid = false;
                } else {
                    confirmPassword.classList.remove('border-red-500');
                    confirmPassword.classList.add('border-gray-300');
                    confirmPasswordError.classList.add('hidden');
                }
            }

            // Terms Validation
            const terms = document.getElementById('terms');
            const termsError = document.getElementById('termsError');
            if (terms && termsError) {
                if (!terms.checked) {
                    termsError.classList.remove('hidden');
                    isValid = false;
                } else {
                    termsError.classList.add('hidden');
                }
            }

            // Successful Submission
            if (isValid) {
                const btn = signupForm.querySelector('button[type="submit"]');
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating Account...';
                    btn.classList.add('opacity-75', 'cursor-not-allowed');
                    
                    localStorage.setItem("userEmail", email.value.trim());
                    localStorage.setItem("userRole", role.value);
                    localStorage.setItem("isLoggedIn", "true");
                    
                    // Add some dummy full name saving too
                    localStorage.setItem("userName", fullName.value.trim());
                    
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
