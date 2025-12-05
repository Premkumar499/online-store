// About Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Initialize page functionality
  initializeScrollAnimations();
  setupBackToTop();
  setupSmoothScrolling();
});

// Scroll animations for elements
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections for animations
  document.querySelectorAll('.about-section, .excellence-card, .service-item, .team-member, .value-item').forEach(el => {
    observer.observe(el);
  });
}

// Back to top functionality
function setupBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Smooth scrolling for internal links
function setupSmoothScrolling() {
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
      }
    });
  });
}

// Counter animation for statistics (if needed)
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      counter.textContent = Math.floor(current);
      
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  });
}

// Team member hover effects
document.querySelectorAll('.team-member').forEach(member => {
  member.addEventListener('mouseenter', function() {
    this.classList.add('hovered');
  });
  
  member.addEventListener('mouseleave', function() {
    this.classList.remove('hovered');
  });
});

// Service item interactions
document.querySelectorAll('.service-item').forEach(item => {
  item.addEventListener('click', function() {
    // Could add modal or expanded view functionality here
    console.log('Service item clicked:', this.querySelector('h3').textContent);
  });
});

// Contact form functionality (if added)
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Simulate form submission
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
}

// Call setup functions
setupContactForm();

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

function goToTraining() {
    window.location.href = 'training.html';
}

function goToFavourites() {
    window.location.href = 'favourites.html';
}

// About page specific redirects
function exploreCollections() {
    window.location.href = 'all-collection.html';
}

function joinTraining() {
    window.location.href = 'training.html';
}

function contactUs() {
    document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
}