function toggleSideNavbar() {
  const sideNavbar = document.getElementById('sideNavbar');
  const isMobile = window.innerWidth <= 768;
  const targetWidth = isMobile ? '80%' : '60%';
  sideNavbar.style.left = sideNavbar.style.left === '0px' ? `-${targetWidth}` : '0px';
}

// Carousel logic
const header = document.querySelector('.header');
const dots = document.querySelectorAll('.dot');
const arrowLeft = document.getElementById('arrowLeft');
const arrowRight = document.getElementById('arrowRight');

const images = [
  'elite studio pic/pic1.jpg',
  'elite studio pic/fashion-designers-work-beautiful-young-260nw-2458032929.webp',
  'elite studio pic/pic1.jpg',
  'elite studio pic/fashion-designers-work-beautiful-young-260nw-2458032929.webp',
  'elite studio pic/pic1.jpg',
  'elite studio pic/fashion-designers-work-beautiful-young-260nw-2458032929.webp'
];

let currentImageIndex = 0;

function updateHeaderBackground() {
  header.style.background = `url('${images[currentImageIndex]}') center/cover no-repeat`;
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentImageIndex);
  });
}

function navigateCarousel(direction) {
  currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
  updateHeaderBackground();
}

arrowLeft.addEventListener('click', () => navigateCarousel(-1));
arrowRight.addEventListener('click', () => navigateCarousel(1));

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentImageIndex = index;
    updateHeaderBackground();
  });
});

window.onload = updateHeaderBackground;

document.addEventListener('click', (event) => {
  const sideNavbar = document.getElementById('sideNavbar');
  const menuToggle = document.querySelector('.navbar-menu-toggle');
  const isMobile = window.innerWidth <= 768;
  const targetWidth = isMobile ? '80%' : '60%';

  if (!sideNavbar.contains(event.target) && event.target !== menuToggle && sideNavbar.style.left === '0px') {
    sideNavbar.style.left = `-${targetWidth}`;
  }
});

// Shop Now button functionality
document.getElementById('shopNowButton').addEventListener('click', () => {
  document.querySelector('.product-section').scrollIntoView({ behavior: 'smooth' });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// collection page
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sideNavbar = document.getElementById('sideNavbar');
  const filterButton = document.getElementById('filterButton');
  const filterSidebar = document.getElementById('filterSidebar');
  const closeFilter = document.getElementById('closeFilter');
  const overlay = document.getElementById('overlay');
  const applyFilters = document.getElementById('applyFilters');

  // Toggle side navbar
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    sideNavbar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Close filter sidebar if open
    if (filterSidebar.classList.contains('active')) {
      filterSidebar.classList.remove('active');
    }
  });

  // Open filter sidebar
  filterButton.addEventListener('click', (e) => {
    e.stopPropagation();
    filterSidebar.classList.add('active');
    overlay.classList.add('active');
    
    // Close side navbar if open
    if (sideNavbar.classList.contains('active')) {
      sideNavbar.classList.remove('active');
    }
  });

  // Close filter sidebar
  closeFilter.addEventListener('click', (e) => {
    e.stopPropagation();
    filterSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Close all on overlay click
  overlay.addEventListener('click', () => {
    sideNavbar.classList.remove('active');
    filterSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Apply filters button
  applyFilters.addEventListener('click', () => {
    const inStock = document.getElementById('in-stock').checked;
    const outStock = document.getElementById('out-of-stock').checked;
    const min = document.getElementById('min-price').value;
    const max = document.getElementById('max-price').value;

    // Here you would typically filter products based on these values
    console.log(`Filters Applied:\nIn stock: ${inStock}\nOut of stock: ${outStock}\nPrice: ₹${min} - ₹${max}`);

    // Close the filter sidebar
    filterSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Close sidebars when clicking outside
  document.addEventListener('click', (e) => {
    if (!sideNavbar.contains(e.target) && e.target !== menuToggle) {
      sideNavbar.classList.remove('active');
    }
    
    if (!filterSidebar.contains(e.target) && e.target !== filterButton) {
      filterSidebar.classList.remove('active');
    }
    
    if (!sideNavbar.classList.contains('active') && !filterSidebar.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  });
});

// Prevent clicks inside sidebars from closing them
document.getElementById('sideNavbar').addEventListener('click', (e) => {
  e.stopPropagation();
});

document.getElementById('filterSidebar').addEventListener('click', (e) => {
  e.stopPropagation();
});