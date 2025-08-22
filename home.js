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

arrowLeft?.addEventListener('click', () => navigateCarousel(-1));
arrowRight?.addEventListener('click', () => navigateCarousel(1));

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

// Shop Now scroll
const shopBtn = document.getElementById('shopNowButton');
if (shopBtn) {
  shopBtn.addEventListener('click', () => {
    document.querySelector('.product-section')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// Back to Top
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Redirect to training page when "Join Now" button is clicked
function redirectToTraining() {
    window.location.href = 'training.html';
}