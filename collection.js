// 5. collection.js
const products = [
  { id: 1, name: "Skaya", price: 3850 },
  { id: 2, name: "Amaya", price: 4850 },
  { id: 3, name: "Velina", price: 3250 },
  { id: 4, name: "Hira", price: 2850 },
  { id: 5, name: "Lina", price: 4250 },
  { id: 6, name: "Mira", price: 3650 },
  { id: 7, name: "Tara", price: 3150 },
  { id: 8, name: "Kira", price: 2750 }
];

const filterButton = document.getElementById('filterButton');
const filterSidebar = document.getElementById('filterSidebar');
const closeFilter = document.getElementById('closeFilter');
const productsGrid = document.getElementById('productsGrid');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const applyPriceButton = document.getElementById('applyPrice');
const resultsCount = document.querySelector('.results-count');

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});

filterButton.addEventListener('click', () => {
  filterSidebar.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closeFilter.addEventListener('click', () => {
  filterSidebar.classList.remove('open');
  document.body.style.overflow = '';
});

applyPriceButton.addEventListener('click', applyFilters);

document.addEventListener('click', (event) => {
  if (!filterSidebar.contains(event.target) && event.target !== filterButton) {
    filterSidebar.classList.remove('open');
    document.body.style.overflow = '';
  }
});

function applyFilters() {
  const min = parseInt(minPriceInput.value) || 0;
  const max = parseInt(maxPriceInput.value) || Infinity;

  const filtered = products.filter(p => p.price >= min && p.price <= max);
  renderProducts(filtered);
}

function renderProducts(list) {
  productsGrid.innerHTML = '';
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="elite studio pic/collection model.jpg" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₹ ${product.price}</p>
      </div>
    `;
    card.onclick = () => window.location.href = `product-details.html?id=${product.id}`;
    productsGrid.appendChild(card);
  });

  resultsCount.textContent = `Showing 1 - ${list.length} of ${list.length} results`;
}
