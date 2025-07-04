document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('toggle-password')) {
            const targetId = e.target.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = e.target;
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        }
    });

    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const forgotPassword = document.querySelector('.forgot-password');

    // Show Register Form
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        formTitle.textContent = 'Create Account';
        formSubtitle.textContent = 'Register to continue';
    });

    // Show Login Form
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        formTitle.textContent = 'Welcome to ShopPi';
        formSubtitle.textContent = 'Login to your account';
    });

    // Login Form Submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        console.log('Login attempt:', { email, password });
        alert('Login successful! Redirecting to shop...');
        // window.location.href = 'shop.html';
    });

    // Register Form Submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const firstName = document.getElementById('register-firstname').value;
        const lastName = document.getElementById('register-lastname').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirm = document.getElementById('register-confirm').value;
        
        if (!firstName || !lastName || !email || !password || !confirm) {
            alert('Please fill in all fields');
            return;
        }
        
        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        
        console.log('Registration:', { firstName, lastName, email, password });
        alert('Registration successful! Please login.');
        showLogin.click();
    });

    // Forgot Password
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Please enter your email to reset your password:');
        if (email) {
            console.log('Password reset requested for:', email);
            alert(`If an account exists for ${email}, you will receive a password reset link.`);
        }
    });
});