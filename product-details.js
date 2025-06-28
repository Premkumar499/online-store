// 6. product-details.js
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const products = {
  '1': {
    id: '1',
    name: "Skaya",
    price: 3850,
    description: "Elegant handcrafted blouse with premium materials for all-day comfort.",
    material: "Cotton Silk",
    image: "elite studio pic/collection model.jpg",
    stock: 5,
    vendor: "Elite Studio"
  },
  '2': {
    id: '2',
    name: "Amaya",
    price: 4850,
    description: "Designer blouse with intricate embroidery and royal hues.",
    material: "Chiffon",
    image: "elite studio pic/collection model.jpg",
    stock: 3,
    vendor: "Elite Studio"
  },
  '3': {
    id: '3',
    name: "Velina",
    price: 3250,
    description: "Traditional yet trendy, made with soft cotton and bold prints.",
    material: "Cotton",
    image: "elite studio pic/collection model.jpg",
    stock: 4,
    vendor: "Elite Studio"
  },
  '4': {
    id: '4',
    name: "Hira",
    price: 2850,
    description: "Graceful printed blouse suitable for festivals and gatherings.",
    material: "Semi-Chanderi",
    image: "elite studio pic/collection model.jpg",
    stock: 6,
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
        stock: 2,
        vendor: "Elite Studio"
    },
    '6': {
        id: '5',
        name: "mira",
        price: 4250,
        description: "Stylish blouse with modern cuts and vibrant colors.",
        material: "Georgette",
        image: "elite studio pic/collection model.jpg",
        stock: 2,
        vendor: "Elite Studio"
    },
    '7': {
        id: '5',
        name: "Tara",
        price: 4250,
        description: "Stylish blouse with modern cuts and vibrant colors.",
        material: "Georgette",
        image: "elite studio pic/collection model.jpg",
        stock: 2,
        vendor: "Elite Studio"
    },'8': {
        id: '5',
        name: "kira",
        price: 4250,
        description: "Stylish blouse with modern cuts and vibrant colors.",
        material: "Georgette",
        image: "elite studio pic/collection model.jpg",
        stock: 2,
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

document.addEventListener('DOMContentLoaded', loadProductDetails);
