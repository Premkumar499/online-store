// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Close all answers first
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('show');
        });
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
        });
        
        // Open current if it wasn't active
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('show');
        }
    });
});

// Form Submission - THIS IS THE IMPORTANT PART
const enrollmentForm = document.getElementById('enrollmentForm');

enrollmentForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // This stops the redirect
    
    // Form validation
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentPlan = document.querySelector('input[name="paymentPlan"]:checked').value;
    const experience = document.getElementById('experience').value;
    const referral = document.getElementById('referral').value;
    const terms = document.getElementById('terms').checked;
    
    if (!firstName || !email || !phone || !address || !terms) {
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
        // Simple way to send email without external services
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: 'YOUR_SERVICE_ID',
                template_id: 'YOUR_TEMPLATE_ID',
                user_id: 'YOUR_USER_ID',
                template_params: {
                    to_email: 'premkumar67861@gmail.com',
                    from_name: `${firstName} ${lastName}`,
                    from_email: email,
                    message: emailContent,
                    subject: 'New Aari Class Enrollment'
                }
            })
        });
        
        if (response.ok) {
            alert('Thank you for your enrollment! We will contact you shortly.');
            enrollmentForm.reset();
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Your enrollment was received but we couldn\'t send the confirmation email. We will still contact you.');
    }
});

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