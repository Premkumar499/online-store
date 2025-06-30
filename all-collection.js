// Sample product data
const products = [
  { 
    id: 1, 
    name: "Skaya Blouse", 
    price: 3850,
    category: "Blouses",
    image: "elite studio pic/product.jpeg",
    description: "Elegant handcrafted blouse with premium materials for all-day comfort."
  },
  { 
    id: 2, 
    name: "Amaya Designer", 
    price: 4850,
    category: "Blouses",
    image: "elite studio pic/product.jpeg",
    description: "Designer blouse with intricate embroidery and royal hues."
  },
  { 
    id: 3, 
    name: "Velina Traditional", 
    price: 3250,
    category: "Blouses",
    image: "elite studio pic/product.jpeg",
    description: "Traditional yet trendy, made with soft cotton and bold prints."
  },
  { 
    id: 4, 
    name: "Hira Printed", 
    price: 2850,
    category: "Blouses",
    image: "elite studio pic/product.jpeg",
    description: "Graceful printed blouse suitable for festivals and gatherings."
  },
  { 
    id: 5, 
    name: "Lina Modern", 
    price: 4250,
    category: "Blouses",
    image: "elite studio pic/product.jpeg",
    description: "Stylish blouse with modern cuts and vibrant colors."
  },
  { 
    id: 6, 
    name: "Gold Bangles Set", 
    price: 2250,
    category: "Bangles",
    image: "elite studio pic/product.jpeg",
    description: "Elegant gold-plated bangles set for any occasion."
  },
  { 
    id: 7, 
    name: "Silver Bangles Set", 
    price: 1950,
    category: "Bangles",
    image: "elite studio pic/product.jpeg",
    description: "Beautiful silver-plated bangles with intricate designs."
  },
  { 
    id: 8, 
    name: "Aari Materials Kit", 
    price: 3500,
    category: "Materials",
    image: "elite studio pic/product.jpeg",
    description: "Complete kit with all materials needed for Aari work."
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
const backToTopButton = document.getElementById('backToTop');

// Current filtered products
let filteredProducts = [...products];
let searchTimeout;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEventListeners();
  setupBackToTop();
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

  // Category checkboxes
  document.querySelectorAll('input[name="category"]').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

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

  // Form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
      const results = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      );
      renderProducts(results);
    }
  });
}

function setupBackToTop() {
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
  window.location.href = `all-collection-detail.html?id=${id}`;
}

function applyFilters() {
  const min = parseInt(minPriceInput.value) || 0;
  const max = parseInt(maxPriceInput.value) || Infinity;
  const selectedCategories = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map(el => el.value);

  filteredProducts = products.filter(p => {
    const priceMatch = p.price >= min && p.price <= max;
    const categoryMatch = selectedCategories.length === 0 || 
                         selectedCategories.includes(p.category);
    return priceMatch && categoryMatch;
  });

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
    card.onclick = () => window.location.href = `all-collection-detail.html?id=${product.id}`;
    productsGrid.appendChild(card);
  });

  resultsCount.textContent = `Showing 1 - ${list.length} of ${list.length} results`;
}