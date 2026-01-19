// Main application logic
let currentView = 'grid';
let currentCategory = 'All';
let searchQuery = '';
let filteredData = [...EQUIPMENT_DATA];

// Get all unique categories
const categories = ['All', ...new Set(EQUIPMENT_DATA.map(item => item.category))];

// Initialize the app
function init() {
    renderCategories();
    renderEquipment();
    setupEventListeners();
}

// Render category sidebar
function renderCategories() {
    const categoryList = document.getElementById('categories');
    categoryList.innerHTML = categories.map(category => 
        `<li class="category-item ${category === currentCategory ? 'active' : ''}" data-category="${category}">
            ${category}
        </li>`
    ).join('');
}

// Filter equipment based on search and category
function filterEquipment() {
    filteredData = EQUIPMENT_DATA.filter(item => {
        const matchesSearch = searchQuery === '' || 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    renderEquipment();
}

// Render equipment in current view
function renderEquipment() {
    const container = document.getElementById('equipment-container');
    const resultsCount = document.getElementById('results-count');
    
    // Update results count
    resultsCount.textContent = `${filteredData.length} items ${currentCategory !== 'All' ? 'in ' + currentCategory : ''}`;
    
    if (currentView === 'grid') {
        container.className = 'grid-view';
        container.innerHTML = filteredData.map(item => `
            <div class="grid-card">
                <div class="card-image">
                    <img src="images/${item.id}.jpg" alt="${item.name}" onerror="this.style.display='none'">
                </div>
                <div class="card-content">
                    <div class="card-id">${item.id}</div>
                    <div class="card-name">${item.name}</div>
                    <div class="card-description">${item.description}</div>
                    <div class="card-footer">
                        <div class="card-qty">×${item.amount} available</div>
                        <div class="card-price">€${item.price.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        container.className = 'list-view';
        container.innerHTML = `
            <div class="list-header">
                <span>Image</span>
                <span>ID</span>
                <span>Item</span>
                <span>Description</span>
                <span>Qty</span>
                <span>€/Day</span>
            </div>
            ${filteredData.map(item => `
                <div class="list-row">
                    <div class="list-image">
                        <img src="images/${item.id}.jpg" alt="${item.name}" onerror="this.style.display='none'">
                    </div>
                    <span class="list-id">${item.id}</span>
                    <div class="list-info">
                        <span class="list-name">${item.name}</span>
                    </div>
                    <span class="list-description">${item.description}</span>
                    <span class="list-qty">×${item.amount}</span>
                    <span class="list-price">€${item.price.toFixed(2)}</span>
                </div>
            `).join('')}
        `;
    }
}

// Setup event listeners
function setupEventListeners() {
    // View toggle buttons
    document.getElementById('grid-btn').addEventListener('click', () => {
        currentView = 'grid';
        document.getElementById('grid-btn').classList.add('active');
        document.getElementById('list-btn').classList.remove('active');
        renderEquipment();
    });
    
    document.getElementById('list-btn').addEventListener('click', () => {
        currentView = 'list';
        document.getElementById('list-btn').classList.add('active');
        document.getElementById('grid-btn').classList.remove('active');
        renderEquipment();
    });
    
    // Search input
    document.getElementById('search').addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterEquipment();
    });
    
    // Category selection
    document.getElementById('categories').addEventListener('click', (e) => {
        if (e.target.classList.contains('category-item')) {
            currentCategory = e.target.dataset.category;
            renderCategories();
            filterEquipment();
        }
    });
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
