// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.navbar-menu-toggle');
const navMenu = document.querySelector('.navbar-links');

// Handle mobile menu if elements exist
if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}



// Form Submission - THIS IS THE IMPORTANT PART
const enrollmentForm = document.getElementById('enrollmentForm');

if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // This stops the redirect
        
        // Form validation
        const firstName = document.getElementById('firstName')?.value;
        const lastName = document.getElementById('lastName')?.value;
        const email = document.getElementById('email')?.value;
        const phone = document.getElementById('phone')?.value;
        const address = document.getElementById('address')?.value;
        const paymentPlanElement = document.querySelector('input[name="paymentPlan"]:checked');
        const paymentPlan = paymentPlanElement?.value;
        const experience = document.getElementById('experience')?.value;
        const referral = document.getElementById('referral')?.value;
        const terms = document.getElementById('terms')?.checked;
        
        if (!firstName || !email || !phone || !address || !terms || !paymentPlan) {
            alert('Please fill in all required fields and agree to the terms.');
            return;
        }
    
    // Prepare the email content
    const emailContent = `
        New Enrollment Details:
        -----------------------
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}
        Selected Plan: ${paymentPlan}
        Experience: ${experience || 'None'}
        Heard About Us: ${referral || 'Not specified'}
    `;
    
    try {
        // Simple form submission alert since EmailJS isn't properly configured
        // For a real implementation, you would need to set up EmailJS service
        alert(`Thank you ${firstName} ${lastName}! Your enrollment has been submitted.\\nWe will contact you at ${phone} or ${email} within 24 hours.\\nSelected Plan: ${paymentPlan}`);
        enrollmentForm.reset();
        
        // Optional: You can implement actual email sending here by integrating with:
        // - EmailJS (with proper service_id, template_id, user_id)
        // - Backend API endpoint
        // - Third-party form services like Netlify Forms, Formspree, etc.
        
    } catch (error) {
        console.error('Error:', error);
        alert('Thank you for your enrollment! We have received your information and will contact you soon.');
    }
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Navigation redirect functions
function redirectTo(page) {
    window.location.href = page;
}

function goHome() {
    window.location.href = 'home.html';
}

function goToCollections() {
    window.location.href = 'all-collection.html';
}

function goToFavourites() {
    window.location.href = 'favourites.html';
}

function goToAbout() {
    window.location.href = 'about.html';
}

// Course-specific redirects
function enrollNow() {
    document.getElementById('enrollment').scrollIntoView({ behavior: 'smooth' });
}

function viewMaterials() {
    window.location.href = 'all-collection.html?category=Materials';
}