// 6. product-details.js
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const products = {
  '1': {
    id: '1',
    name: "Skaya",
    price: 3850,
    description: "Elegant handcrafted blouse with premium materials for all-day comfort.Drape yourself in elegance with this graceful wisteria-colored Matka Tussar Banarasi saree, adorned with delicate buttas with meenakari work woven throughout the fabric. The soft, muted tone of wisteria pairs beautifully with the rich texture of Matka Tussar, while the violet border and pallu are intricately designed with Meenakari designs and zari work, adding depth and a luxurious finish to the overall look. Accompanying the saree is a plain violet blouse, styled with silver zari detailing on the sleeve borders, perfectly mirroring the saree’s intricate craftsmanship. This refined combination of pastel elegance and bold accents makes it a standout choice for both traditional and contemporary occasions.",
    material: "Cotton Silk",
    image: "elite studio pic/collection model.jpg",
    vendor: "Elite Studio"
  },
  '2': {
    id: '2',
    name: "Amaya",
    price: 4850,
    description: "Designer blouse with intricate embroidery and royal hues.",
    material: "Chiffon",
    image: "elite studio pic/collection model.jpg",
    vendor: "Elite Studio"
  },
  '3': {
    id: '3',
    name: "Velina",
    price: 3250,
    description: "Traditional yet trendy, made with soft cotton and bold prints.",
    material: "Cotton",
    image: "elite studio pic/collection model.jpg",
    vendor: "Elite Studio"
  },
  '4': {
    id: '4',
    name: "Hira",
    price: 2850,
    description: "Graceful printed blouse suitable for festivals and gatherings.",
    material: "Semi-Chanderi",
    image: "elite studio pic/collection model.jpg",
    vendor: "Elite Studio"
  }
  ,
    '5': {
        id: '5',
        name: "Lina",
        price: 4250,
        description: "Stylish blouse with modern cuts and vibrant colors.",
        material: "Georgette",
        image: "elite studio pic/collection model.jpg",
        vendor: "Elite Studio"
    },
    '6': {
        id: '5',
        name: "mira",
        price: 4250,
        description: "Stylish blouse with modern cuts and vibrant colors.",
        material: "Georgette",
        image: "elite studio pic/collection model.jpg",
        vendor: "Elite Studio"
    },
    '7': {
        id: '5',
        name: "Tara",
        price: 4250,
        description: "Stylish blouse with modern cuts and vibrant colors.",
        material: "Georgette",
        image: "elite studio pic/collection model.jpg",
        vendor: "Elite Studio"
    },'8': {
        id: '5',
        name: "kira",
        price: 4250,
        description: "Stylish blouse with modern cuts and vibrant colors.",
        material: "Georgette",
        image: "elite studio pic/collection model.jpg",
        vendor: "Elite Studio"
    }
  
};

function loadProductDetails() {
  const product = products[productId];
  if (product) {
    document.getElementById('productTitle').textContent = product.name;
    document.getElementById('productPrice').textContent = `₹ ${product.price}`;
    document.getElementById('mainProductImage').src = product.image;
    document.getElementById('mainProductImage').alt = product.name;
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
// Add this at the top of your file (after the products object)
const productImages = {
  '1': [
    "elite studio pic/collection model.jpg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '2': [
    "elite studio pic/collection model.jpg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '3': [
    "elite studio pic/collection model.jpg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '4': [
    "elite studio pic/collection model.jpg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '5': [
    "elite studio pic/collection model.jpg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '6': [
    "elite studio pic/collection model.jpg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '7': [
    "elite studio pic/collection model.jpg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ],
  '8': [
    "elite studio pic/collection model.jpg",
    "elite studio pic/pic1.jpg",
    "elite studio pic/pic2.jpg",
    "elite studio pic/pic3.jpg"
  ]
  // Add image arrays for other products as needed
};

// Update the loadProductDetails function
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

// Add these new functions
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

document.addEventListener('DOMContentLoaded', loadProductDetails);
