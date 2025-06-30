const products = [
  { 
    id: 1, 
    name: "Skaya", 
    price: 3850, 
    image: "elite studio pic/collection model.jpg", 
    description: "Beautiful Skaya blouse with intricate embroidery work." 
  },
  { 
    id: 2, 
    name: "Amaya", 
    price: 4850, 
    image: "elite studio pic/collection model.jpg", 
    description: "Elegant Amaya blouse with premium fabric." 
  },
  { 
    id: 3, 
    name: "Velina", 
    price: 3250, 
    image: "elite studio pic/collection model.jpg", 
    description: "Stylish Velina blouse perfect for occasions." 
  },
  { 
    id: 4, 
    name: "Hira", 
    price: 2850, 
    image: "elite studio pic/collection model.jpg", 
    description: "Simple yet elegant Hira blouse for daily wear." 
  },
  { 
    id: 5, 
    name: "Lina", 
    price: 4250, 
    image: "elite studio pic/collection model.jpg", 
    description: "Luxurious Lina blouse with designer patterns." 
  },
  { 
    id: 6, 
    name: "Mira", 
    price: 3650, 
    image: "elite studio pic/collection model.jpg", 
    description: "Trendy Mira blouse with modern cuts." 
  },
  { 
    id: 7, 
    name: "Tara", 
    price: 3150, 
    image: "elite studio pic/collection model.jpg", 
    description: "Classic Tara blouse with traditional motifs." 
  },
  { 
    id: 8, 
    name: "Kira", 
    price: 2750, 
    image: "elite studio pic/collection model.jpg", 
    description: "Affordable Kira blouse with great quality." 
  }
];

// DOM Elements
const filterButton = document.getElementById('filterButton');
const filterSidebar = document.getElementById('filterSidebar');
const closeFilter = document.getElementById('closeFilter');
const productsGrid = document.getElementById('productsGrid');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const applyPriceButton = document.getElementById('applyPrice');
const resultsCount = document.querySelector('.results-count');
const searchInput = document.getElementById('search');
const searchForm = document.getElementById('searchForm');
const searchSuggestions = document.getElementById('searchSuggestions');

// Current filtered products
let filteredProducts = [...products];
let searchTimeout;

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEventListeners();
});

function setupEventListeners() {
  // Filter sidebar
  filterButton.addEventListener('click', () => {
    filterSidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeFilter.addEventListener('click', () => {
    filterSidebar.classList.remove('open');
    document.body.style.overflow = '';
  });

  applyPriceButton.addEventListener('click', applyFilters);

  // Real-time search functionality
  searchInput.addEventListener('input', handleRealTimeSearch);
  
  // Close suggestions when clicking outside
  document.addEventListener('click', (event) => {
    if (!searchForm.contains(event.target)) {
      searchSuggestions.style.display = 'none';
    }
    
    if (!filterSidebar.contains(event.target) && event.target !== filterButton) {
      filterSidebar.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

function handleRealTimeSearch() {
  clearTimeout(searchTimeout);
  
  searchTimeout = setTimeout(() => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm.length === 0) {
      renderProducts(filteredProducts);
      searchSuggestions.style.display = 'none';
      return;
    }
    
    const results = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(results);
    showSearchSuggestions(results);
  }, 300);
}

function showSearchSuggestions(suggestions) {
  if (suggestions.length === 0) {
    searchSuggestions.innerHTML = '<div class="no-results">No matching products found</div>';
    searchSuggestions.style.display = 'block';
    return;
  }
  
  searchSuggestions.innerHTML = suggestions.map(product => `
    <a href="#" onclick="goToProduct(${product.id}); return false;">
      ${product.name} - ₹${product.price}
    </a>
  `).join('');
  
  searchSuggestions.style.display = 'block';
}

function goToProduct(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

function applyFilters() {
  const min = parseInt(minPriceInput.value) || 0;
  const max = parseInt(maxPriceInput.value) || Infinity;

  filteredProducts = products.filter(p => p.price >= min && p.price <= max);
  renderProducts(filteredProducts);
  filterSidebar.classList.remove('open');
  document.body.style.overflow = '';
  
  // Clear search input when filters change
  searchInput.value = '';
  searchSuggestions.style.display = 'none';
}

function renderProducts(list) {
  productsGrid.innerHTML = '';
  
  if (list.length === 0) {
    productsGrid.innerHTML = '<div class="no-products">No products match your criteria</div>';
    resultsCount.textContent = `Showing 0 results`;
    return;
  }
  
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₹ ${product.price}</p>
      </div>
    `;
    card.onclick = () => window.location.href = `product-detail.html?id=${product.id}`;
    productsGrid.appendChild(card);
  });

  resultsCount.textContent = `Showing 1 - ${list.length} of ${list.length} results`;
}