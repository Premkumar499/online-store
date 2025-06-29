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
    image: "elite studio pic/product.jpegg"
  }
};

// Product images for gallery
const productImages = {
  '1': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '2': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '3': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '4': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '5': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '6': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '7': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '8': [
    "elite studio pic/product.jpeg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
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
  } else {
    document.querySelector('.product-details-container').innerHTML = '<p style="color:red">Product not found.</p>';
  }
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

function openZoomModal(element) {
  const modal = document.getElementById('zoomModal');
  const modalImg = document.getElementById('zoomedImage');
  const captionText = document.querySelector('.zoom-caption');
  
  modal.style.display = "block";
  modalImg.src = element.querySelector('img').src;
  captionText.innerHTML = element.querySelector('img').alt;
}

function closeZoomModal() {
  document.getElementById('zoomModal').style.display = "none";
}

// Toggle side navbar function (should be in a shared functions.js file)
function toggleSideNavbar() {
  const sideNavbar = document.getElementById('sideNavbar');
  sideNavbar.style.left = sideNavbar.style.left === '0px' ? '-60%' : '0px';
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