// Favourites Management System

// Get favourites from localStorage
function getFavourites() {
  const favourites = localStorage.getItem('eliteStudioFavourites');
  return favourites ? JSON.parse(favourites) : [];
}

// Save favourites to localStorage
function saveFavourites(favourites) {
  localStorage.setItem('eliteStudioFavourites', JSON.stringify(favourites));
}

// Add product to favourites
function addToFavourites(product) {
  let favourites = getFavourites();
  
  // Check if product already exists
  const existingIndex = favourites.findIndex(item => item.id === product.id);
  
  if (existingIndex === -1) {
    // Add new product with timestamp
    product.addedAt = new Date().toISOString();
    favourites.push(product);
    saveFavourites(favourites);
    return { success: true, message: 'Added to favourites!' };
  } else {
    return { success: false, message: 'Already in favourites!' };
  }
}

// Remove product from favourites
function removeFromFavourites(productId) {
  let favourites = getFavourites();
  favourites = favourites.filter(item => item.id !== productId);
  saveFavourites(favourites);
  
  // Refresh the display if we're on the favourites page
  if (window.location.pathname.includes('favourites.html')) {
    renderFavourites();
    updatePageTitle(); // Update title after removing item
  }
}

// Clear all favourites
function clearAllFavourites() {
  if (confirm('Are you sure you want to remove all items from favourites?')) {
    localStorage.removeItem('eliteStudioFavourites');
    renderFavourites();
    updatePageTitle(); // Update title after clearing
  }
}

// Check if product is in favourites
function isInFavourites(productId) {
  const favourites = getFavourites();
  return favourites.some(item => item.id === productId);
}

// Render favourites on the favourites page
function renderFavourites() {
  const favourites = getFavourites();
  const favouritesGrid = document.getElementById('favouritesGrid');
  const emptyFavourites = document.getElementById('emptyFavourites');
  const resultsCount = document.getElementById('favResultsCount');
  
  if (!favouritesGrid) return; // Not on favourites page
  
  if (favourites.length === 0) {
    favouritesGrid.style.display = 'none';
    emptyFavourites.style.display = 'block';
    resultsCount.textContent = 'No favourites yet';
    return;
  }
  
  favouritesGrid.style.display = 'grid';
  emptyFavourites.style.display = 'none';
  resultsCount.textContent = `${favourites.length} favourite${favourites.length !== 1 ? 's' : ''}`;
  
  favouritesGrid.innerHTML = '';
  
  favourites.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card favourite-card';
    card.innerHTML = `
      <div class="favourite-badge">
        <i class="fas fa-heart"></i>
      </div>
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₹ ${product.price}</p>
        <div class="product-actions">
          <button class="btn btn-primary" onclick="viewProduct(${product.id})">
            <i class="fas fa-eye"></i> View Details
          </button>
          <button class="btn btn-danger" onclick="removeFromFavourites('${product.id}')">
            <i class="fas fa-trash"></i> Remove
          </button>
        </div>
      </div>
      <div class="added-date">
        Added: ${new Date(product.addedAt).toLocaleDateString()}
      </div>
    `;
    favouritesGrid.appendChild(card);
  });
}

// View product details
function viewProduct(productId) {
  window.location.href = `all-collection-detail.html?id=${productId}`;
}

// Initialize favourites page
document.addEventListener('DOMContentLoaded', () => {
  // Only run on favourites page
  if (window.location.pathname.includes('favourites.html')) {
    renderFavourites();
    
    // Clear favourites button
    const clearBtn = document.getElementById('clearFavourites');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearAllFavourites);
    }
    
    // Update the page title to show count
    updatePageTitle();
  }
  
  // Back to top functionality
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
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
});

// Update page title with favourites count
function updatePageTitle() {
  const favourites = getFavourites();
  const count = favourites.length;
  if (count > 0) {
    document.title = `Favourites (${count}) - Elite Studio`;
  } else {
    document.title = 'Favourites - Elite Studio';
  }
}

// Update favourites count in navbar (if you want to show count)
function updateFavouritesCount() {
  const count = getFavourites().length;
  const countElements = document.querySelectorAll('.favourites-count');
  countElements.forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline' : 'none';
  });
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    addToFavourites,
    removeFromFavourites,
    isInFavourites,
    getFavourites,
    clearAllFavourites
  };
}

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

function goToAbout() {
    window.location.href = 'about.html';
}

// Favourites-specific redirects
function continueShopping() {
    window.location.href = 'all-collection.html';
}

function exploreCategories(category) {
    window.location.href = `all-collection.html?category=${encodeURIComponent(category)}`;
}