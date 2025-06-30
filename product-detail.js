// Product data (should match with product-blows.js)
const products = [
  { 
    id: 1, 
    name: "Skaya Designer", 
    price: 3850, 
    image: "elite studio pic/collection model.jpg", 
    description: "Beautiful Skaya blouse with intricate embroidery work.",
    material: "Premium Silk",
    color: "Red",
    stock: "In Stock",
    vendor: "Ellie Studio",
    images: [
      "elite studio pic/collection model.jpg",
      "https://via.placeholder.com/800x1000/ff0000",
      "https://via.placeholder.com/800x1000/cc0000",
      "https://via.placeholder.com/800x1000/990000"
    ]
  },
  { 
    id: 2, 
    name: "Amaya Designer", 
    price: 4850, 
    image: "elite studio pic/collection model.jpg", 
    description: "Elegant Amaya blouse with premium fabric and intricate embroidery work.",
    material: "Premium Cotton",
    color: "Ivory",
    stock: "In Stock",
    vendor: "Ellie Studio",
    images: [
      "elite studio pic/collection model.jpg",
      "https://via.placeholder.com/800x1000/cccccc",
      "https://via.placeholder.com/800x1000/999999",
      "https://via.placeholder.com/800x1000/666666"
    ]
  },
  { 
    id: 3, 
    name: "Velina Designer", 
    price: 3250, 
    image: "elite studio pic/collection model.jpg", 
    description: "Stylish Velina blouse perfect for occasions.",
    material: "Silk Blend",
    color: "Blue",
    stock: "In Stock",
    vendor: "Ellie Studio",
    images: [
      "elite studio pic/collection model.jpg",
      "https://via.placeholder.com/800x1000/0000ff",
      "https://via.placeholder.com/800x1000/0000cc",
      "https://via.placeholder.com/800x1000/000099"
    ]
  },
  { 
    id: 4, 
    name: "Hira Designer", 
    price: 2850, 
    image: "elite studio pic/collection model.jpg", 
    description: "Simple yet elegant Hira blouse for daily wear.",
    material: "Cotton",
    color: "Black",
    stock: "In Stock",
    vendor: "Ellie Studio",
    images: [
      "elite studio pic/collection model.jpg",
      "https://via.placeholder.com/800x1000/000000",
      "https://via.placeholder.com/800x1000/333333",
      "https://via.placeholder.com/800x1000/666666"
    ]
  },
  { 
    id: 5, 
    name: "Lina Designer", 
    price: 4250, 
    image: "elite studio pic/collection model.jpg", 
    description: "Luxurious Lina blouse with designer patterns.",
    material: "Chiffon",
    color: "Pink",
    stock: "In Stock",
    vendor: "Ellie Studio",
    images: [
      "elite studio pic/collection model.jpg",
      "https://via.placeholder.com/800x1000/ffcccc",
      "https://via.placeholder.com/800x1000/ff9999",
      "https://via.placeholder.com/800x1000/ff6666"
    ]
  },
  { 
    id: 6, 
    name: "Mira Designer", 
    price: 3650, 
    image: "elite studio pic/collection model.jpg", 
    description: "Trendy Mira blouse with modern cuts.",
    material: "Georgette",
    color: "Green",
    stock: "In Stock",
    vendor: "Ellie Studio",
    images: [
      "elite studio pic/collection model.jpg",
      "https://via.placeholder.com/800x1000/00ff00",
      "https://via.placeholder.com/800x1000/00cc00",
      "https://via.placeholder.com/800x1000/009900"
    ]
  },
  { 
    id: 7, 
    name: "Tara Designer", 
    price: 3150, 
    image: "elite studio pic/collection model.jpg", 
    description: "Classic Tara blouse with traditional motifs.",
    material: "Silk",
    color: "Gold",
    stock: "In Stock",
    vendor: "Ellie Studio",
    images: [
      "elite studio pic/collection model.jpg",
      "https://via.placeholder.com/800x1000/ffcc00",
      "https://via.placeholder.com/800x1000/cc9900",
      "https://via.placeholder.com/800x1000/996600"
    ]
  },
  { 
    id: 8, 
    name: "Kira Designer", 
    price: 2750, 
    image: "elite studio pic/collection model.jpg", 
    description: "Affordable Kira blouse with great quality.",
    material: "Cotton Blend",
    color: "White",
    stock: "In Stock",
    vendor: "Ellie Studio",
    images: [
      "elite studio pic/collection model.jpg",
      "https://via.placeholder.com/800x1000/ffffff",
      "https://via.placeholder.com/800x1000/eeeeee",
      "https://via.placeholder.com/800x1000/dddddd"
    ]
  }
];

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));

// Find the product by ID
const productData = products.find(p => p.id === productId) || products[0]; // Default to first product if not found

// DOM Elements
const mainImage = document.getElementById('mainImage');
const thumbnailContainer = document.getElementById('thumbnailContainer');
const zoomModal = document.getElementById('zoomModal');
const zoomedImage = document.getElementById('zoomedImage');
const closeZoom = document.getElementById('closeZoom');
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');
const quantityInput = document.getElementById('quantityInput');
const addToCartBtn = document.getElementById('addToCart');
const addToWishlistBtn = document.getElementById('addToWishlist');

// Initialize page with product data
function initProductPage() {
    // Update product info in the page
    document.querySelector('.product-title').textContent = productData.name;
    document.querySelector('.product-price').textContent = `₹${productData.price.toLocaleString('en-IN')}.00`;
    document.querySelector('.product-description p').textContent = productData.description;
    document.querySelector('.stock-status span').textContent = productData.stock;
    document.querySelector('.product-vendor').textContent = `Vendor: ${productData.vendor}`;
    
    // Set main image
    mainImage.src = productData.images[0];
    mainImage.alt = productData.name;
    
    // Create thumbnails
    thumbnailContainer.innerHTML = '';
    productData.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `${productData.name} thumbnail ${index + 1}`;
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.addEventListener('click', () => changeMainImage(index));
        thumbnailContainer.appendChild(thumbnail);
    });
}

// Change main image when thumbnail is clicked
function changeMainImage(index) {
    mainImage.src = productData.images[index];
    mainImage.alt = productData.name;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Zoom image functionality
mainImage.addEventListener('click', () => {
    zoomedImage.src = mainImage.src;
    zoomedImage.alt = productData.name;
    zoomModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeZoom.addEventListener('click', () => {
    zoomModal.style.display = 'none';
    document.body.style.overflow = '';
});

// Close modal when clicking outside the image
zoomModal.addEventListener('click', (e) => {
    if (e.target === zoomModal) {
        zoomModal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Quantity controls
decreaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
});

// Add to cart functionality
addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    alert(`Added ${quantity} ${productData.name} to your cart!`);
    // In a real app, you would add to cart storage/API here
});

// Add to wishlist functionality
addToWishlistBtn.addEventListener('click', () => {
    alert(`Added ${productData.name} to your wishlist!`);
    // In a real app, you would add to wishlist storage/API here
});

// Initialize the page when loaded
document.addEventListener('DOMContentLoaded', initProductPage);