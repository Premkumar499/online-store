// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Product data with images
const products = {
  '1': {
    id: '1',
    name: "Skaya Blouse",
    price: 3850,
    description: "Elegant handcrafted blouse with premium materials for all-day comfort. Drape yourself in elegance with this graceful wisteria-colored Matka Tussar Banarasi saree, adorned with delicate buttas with meenakari work woven throughout the fabric. The soft, muted tone of wisteria pairs beautifully with the rich texture of Matka Tussar, while the violet border and pallu are intricately designed with Meenakari designs and zari work, adding depth and a luxurious finish to the overall look. Accompanying the saree is a plain violet blouse, styled with silver zari detailing on the sleeve borders, perfectly mirroring the saree's intricate craftsmanship. This refined combination of pastel elegance and bold accents makes it a standout choice for both traditional and contemporary occasions.",
    material: "Cotton Silk",
    stock: "In Stock",
    vendor: "Elite Studio",
    image: "elite studio pic/product.jpeg"
  },
  '2': {
    id: '2',
    name: "Amaya Designer",
    price: 4850,
    description: "Designer blouse with intricate embroidery and royal hues.",
    material: "Chiffon",
    stock: "In Stock",
    vendor: "Elite Studio",
    image: "elite studio pic/product.jpeg"
  },
  '3': {
    id: '3',
    name: "Velina Traditional",
    price: 3250,
    description: "Traditional yet trendy, made with soft cotton and bold prints.",
    material: "Cotton",
    stock: "In Stock",
    vendor: "Elite Studio",
    image: "elite studio pic/product.jpeg"
  },
  '4': {
    id: '4',
    name: "Hira Printed",
    price: 2850,
    description: "Graceful printed blouse suitable for festivals and gatherings.",
    material: "Semi-Chanderi",
    stock: "In Stock",
    vendor: "Elite Studio",
    image: "elite studio pic/product.jpeg"
  },
  '5': {
    id: '5',
    name: "Lina Modern",
    price: 4250,
    description: "Stylish blouse with modern cuts and vibrant colors.",
    material: "Georgette",
    stock: "In Stock",
    vendor: "Elite Studio",
    image: "elite studio pic/product.jpeg"
  },
  '6': {
    id: '6',
    name: "Gold Bangles Set",
    price: 2250,
    description: "Elegant gold-plated bangles set for any occasion.",
    material: "Metal with gold plating",
    stock: "In Stock",
    vendor: "Elite Studio",
    image: "elite studio pic/product.jpeg"
  },
  '7': {
    id: '7',
    name: "Silver Bangles Set",
    price: 1950,
    description: "Beautiful silver-plated bangles with intricate designs.",
    material: "Metal with silver plating",
    stock: "In Stock",
    vendor: "Elite Studio",
    image: "elite studio pic/product.jpeg"
  },
  '8': {
    id: '8',
    name: "Aari Materials Kit",
    price: 3500,
    description: "Complete kit with all materials needed for Aari work.",
    material: "Various materials",
    stock: "In Stock",
    vendor: "Elite Studio",
    image: "elite studio pic/product.jpeg"
  }
};

// Product images for gallery
const productImages = {
  '1': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/collection model.jpg",
    "elite studio pic/training.jpg"
  ],
  '2': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/collection model.jpg",
    "elite studio pic/training.jpg"
  ],
  '3': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/collection model.jpg",
    "elite studio pic/training.jpg"
  ],
  '4': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/collection model.jpg",
    "elite studio pic/training.jpg"
  ],
  '5': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/collection model.jpg",
    "elite studio pic/training.jpg"
  ],
  '6': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/collection model.jpg",
    "elite studio pic/training.jpg"
  ],
  '7': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/collection model.jpg",
    "elite studio pic/training.jpg"
  ],
  '8': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/collection model.jpg",
    "elite studio pic/training.jpg"
  ]
};

// Load product details when page loads
document.addEventListener('DOMContentLoaded', loadProductDetails);

function loadProductDetails() {
  const product = products[productId];
  if (product) {
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `₹ ${product.price}`;
    
    // Set main image
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = product.image;
    mainImage.alt = product.name;
    
    // Create thumbnails
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const images = productImages[productId] || [product.image];
    
    images.forEach((imgSrc, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';
      if (index === 0) thumbnail.classList.add('active');
      
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `${product.name} - ${index + 1}`;
      img.onclick = (e) => {
        e.stopPropagation();
        changeMainImage(imgSrc, index);
      };
      
      thumbnail.appendChild(img);
      thumbnailContainer.appendChild(thumbnail);
    });

    document.querySelector('.product-description').innerHTML = `
      <p>${product.description}</p>
      <p><strong>Material:</strong> ${product.material}</p>
      <p><strong>Stock:</strong> ${product.stock}</p>
      <p><strong>Vendor:</strong> ${product.vendor}</p>
    `;

    // Setup Add to Favourites button
    setupFavouritesButton(product);
  } else {
    document.querySelector('.product-details-container').innerHTML = '<p style="color:red">Product not found.</p>';
  }
}

// Setup favourites button functionality
function setupFavouritesButton(product) {
  const addToFavouritesBtn = document.getElementById('addToFavouritesBtn');
  
  if (!addToFavouritesBtn) return;
  
  // Check if product is already in favourites and update button state
  updateFavouritesButtonState();
  
  addToFavouritesBtn.addEventListener('click', () => {
    if (typeof addToFavourites === 'function') {
      const result = addToFavourites(product);
      
      if (result.success) {
        // Show success message
        showMessage(result.message, 'success');
        updateFavouritesButtonState();
      } else {
        // Show info message
        showMessage(result.message, 'info');
      }
    } else {
      console.error('Favourites functionality not available');
      showMessage('Unable to add to favourites', 'error');
    }
  });
}

// Update button state based on whether product is in favourites
function updateFavouritesButtonState() {
  const addToFavouritesBtn = document.getElementById('addToFavouritesBtn');
  const product = products[productId];
  
  if (!addToFavouritesBtn || !product) return;
  
  if (typeof isInFavourites === 'function' && isInFavourites(product.id)) {
    addToFavouritesBtn.innerHTML = '<i class="fas fa-heart"></i> In Favourites';
    addToFavouritesBtn.classList.add('in-favourites');
    addToFavouritesBtn.disabled = true;
  } else {
    addToFavouritesBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favourites';
    addToFavouritesBtn.classList.remove('in-favourites');
    addToFavouritesBtn.disabled = false;
  }
}

// Show message to user
function showMessage(message, type = 'info') {
  // Create message element if it doesn't exist
  let messageEl = document.querySelector('.message-popup');
  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.className = 'message-popup';
    document.body.appendChild(messageEl);
  }
  
  // Set message and type
  messageEl.textContent = message;
  messageEl.className = `message-popup ${type} show`;
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    messageEl.classList.remove('show');
  }, 3000);
}

function changeMainImage(src, index) {
  const mainImage = document.getElementById('mainProductImage');
  mainImage.src = src;
  
  // Update active thumbnail
  document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Open zoom modal
function openZoomModal(element) {
  const modal = document.getElementById('zoomModal');
  const zoomedImage = document.getElementById('zoomedImage');
  
  // Get the image source from the clicked element
  const imgSrc = element.querySelector('img').src;
  zoomedImage.src = imgSrc;
  
  // Show the modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close zoom modal
function closeZoomModal(event) {
  // Only close if clicking on the background or close button
  if (!event || event.target.classList.contains('zoom-modal') || 
      event.target.classList.contains('close-zoom')) {
    const modal = document.getElementById('zoomModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
}

// Change product image
function changeImage(thumbnail, imageUrl) {
  // Update main image
  const mainImage = document.getElementById('mainProductImage');
  mainImage.src = imageUrl;
  
  // Update active thumbnail
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.classList.remove('active');
  });
  thumbnail.classList.add('active');
}

// Toggle side navbar function
function toggleSideNavbar() {
  const sideNavbar = document.getElementById('sideNavbar');
  const isMobile = window.innerWidth <= 768;
  const targetWidth = isMobile ? '80%' : '60%';
  sideNavbar.style.left = sideNavbar.style.left === '0px' ? `-${targetWidth}` : '0px';
}

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
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

function goToTraining() {
    window.location.href = 'training.html';
}

function goToFavourites() {
    window.location.href = 'favourites.html';
}

function goToAbout() {
    window.location.href = 'about.html';
}

// Product-specific redirects
function continueShopping() {
    window.location.href = 'all-collection.html';
}

function viewSimilarProducts(category) {
    window.location.href = `all-collection.html?category=${encodeURIComponent(category)}`;
}