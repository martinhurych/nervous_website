// Main application logic
let currentView = 'grid';
let currentCategory = 'All';
let searchQuery = '';
let filteredData = [...EQUIPMENT_DATA];
let cart = [];

// Get all unique categories
const categories = ['All', ...new Set(EQUIPMENT_DATA.map(item => item.category))];

// Initialize the app
function init() {
    renderCategories();
    renderEquipment();
    setupEventListeners();
    updateCartCount();
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
    
    if (currentView === 'grid') {
        container.className = 'grid-view';
        container.innerHTML = filteredData.map(item => {
            // Check if item has variants
            if (item.variants && item.variants.length > 0) {
                const defaultVariant = item.variants[0];
                // Generate variant IDs (CA-01, CA-02, CA-03, CA-04)
                const baseId = item.id.split('-')[0];
                const baseNum = parseInt(item.id.split('-')[1]);
                const variantIds = item.variants.map((v, idx) => `${baseId}-${String(baseNum + idx).padStart(2, '0')}`).join(', ');
                
                return `
                    <div class="grid-card" onclick="openItemModal('${item.id}')">
                        <div class="card-image">
                            <img src="images/${item.id}.jpg" alt="${item.name}" onerror="this.style.display='none'">
                        </div>
                        <div class="card-content">
                            <div class="card-id">${variantIds}</div>
                            <div class="card-name">${item.name}</div>
                            <div class="card-description">${item.description}</div>
                            <div class="variant-selector" onclick="event.stopPropagation()">
                                <label>Length:</label>
                                <select id="variant-${item.id}" onchange="updateVariantInfo('${item.id}')">
                                    ${item.variants.map(v => `<option value="${v.length}">${v.length}</option>`).join('')}
                                </select>
                            </div>
                            <div class="card-footer" id="footer-${item.id}">
                                <div class="card-qty">×${defaultVariant.amount} available</div>
                                <div class="card-price">€${defaultVariant.price.toFixed(2)}/day</div>
                            </div>
                            <button class="card-add-btn" onclick="event.stopPropagation(); addToCartWithVariant('${item.id}')">Add to Cart</button>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="grid-card" onclick="openItemModal('${item.id}')">
                        <div class="card-image">
                            <img src="images/${item.id}.jpg" alt="${item.name}" onerror="this.style.display='none'">
                        </div>
                        <div class="card-content">
                            <div class="card-id">${item.id}</div>
                            <div class="card-name">${item.name}</div>
                            <div class="card-description">${item.description}</div>
                            <div class="card-footer">
                                <div class="card-qty">×${item.amount} available</div>
                                <div class="card-price">€${item.price.toFixed(2)}/day</div>
                            </div>
                            <button class="card-add-btn" onclick="event.stopPropagation(); addToCart('${item.id}')">Add to Cart</button>
                        </div>
                    </div>
                `;
            }
        }).join('');
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
                <span>Add</span>
            </div>
            ${filteredData.map(item => {
                const displayQty = item.variants ? `${item.variants.map(v => v.length).join(', ')}` : `×${item.amount}`;
                const displayPrice = item.variants ? `from €${Math.min(...item.variants.map(v => v.price)).toFixed(2)}` : `€${item.price.toFixed(2)}`;
                const qtyInputId = `qty-list-${item.id}`;
                return `
                    <div class="list-row" onclick="openItemModal('${item.id}')">
                        <div class="list-image">
                            <img src="images/${item.id}.jpg" alt="${item.name}" onerror="this.style.display='none'">
                        </div>
                        <span class="list-id">${item.id}</span>
                        <div class="list-info">
                            <span class="list-name">${item.name}</span>
                        </div>
                        <span class="list-description">${item.description}</span>
                        <span class="list-qty">${displayQty}</span>
                        <span class="list-price">${displayPrice}</span>
                        <span class="list-add" onclick="event.stopPropagation();">
                            <input type="number" id="${qtyInputId}" value="1" min="1" max="${item.amount}" style="width:50px;">
                            <button class="card-add-btn" onclick="event.stopPropagation(); addToCartFromList('${item.id}', '${qtyInputId}')">Add to Cart</button>
                        </span>
                    </div>
                `;
            }).join('')}
        `;
    }
}

// Update variant info when selection changes
function updateVariantInfo(itemId) {
    const select = document.getElementById(`variant-${itemId}`);
    const selectedLength = select.value;
    const item = EQUIPMENT_DATA.find(eq => eq.id === itemId);
    const variant = item.variants.find(v => v.length === selectedLength);
    
    const footer = document.getElementById(`footer-${itemId}`);
    footer.innerHTML = `
        <div class="card-qty">×${variant.amount} available</div>
        <div class="card-price">€${variant.price.toFixed(2)}/day</div>
    `;
}

// Add to cart with variant
function addToCartWithVariant(itemId) {
    // Try to get variant from grid view first, then from modal
    let select = document.getElementById(`variant-${itemId}`);
    if (!select) {
        select = document.getElementById(`modal-variant-${itemId}`);
    }
    
    if (!select) {
        console.error('No variant selector found for item:', itemId);
        return;
    }
    
    const selectedLength = select.value;
    const item = EQUIPMENT_DATA.find(eq => eq.id === itemId);
    const variant = item.variants.find(v => v.length === selectedLength);
    
    const cartKey = `${itemId}-${selectedLength}`;
    const existingItem = cart.find(cartItem => cartItem.cartKey === cartKey);
    
    if (existingItem) {
        if (existingItem.quantity < variant.amount) {
            existingItem.quantity++;
        } else {
            alert(`Maximum available quantity for ${item.name} (${selectedLength}) is ${variant.amount}`);
            return;
        }
    } else {
        cart.push({
            id: item.id,
            cartKey: cartKey,
            name: `${item.name} / ${selectedLength}`,
            description: item.description,
            category: item.category,
            amount: variant.amount,
            price: variant.price,
            quantity: 1,
            days: 1,
            variant: selectedLength
        });
    }
    
    updateCartCount();
    renderCart();
}

// Cart Management
function addToCart(itemId) {
    const item = EQUIPMENT_DATA.find(eq => eq.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        if (existingItem.quantity < item.amount) {
            existingItem.quantity++;
        } else {
            alert(`Maximum available quantity for ${item.name} is ${item.amount}`);
            return;
        }
    } else {
        cart.push({
            ...item,
            quantity: 1,
            days: 1
        });
    }
    
    updateCartCount();
    renderCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    renderCart();
}

function updateCartItem(itemId, field, value) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    const equipment = EQUIPMENT_DATA.find(eq => eq.id === itemId);
    
    if (item) {
        if (field === 'quantity') {
            const qty = Math.max(1, Math.min(parseInt(value) || 1, equipment.amount));
            item.quantity = qty;
        } else if (field === 'days') {
            item.days = Math.max(1, parseInt(value) || 1);
        }
        renderCart();
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    countElement.textContent = count;
    countElement.classList.toggle('hidden', count === 0);
}

function calculateTotal(rentalDays = null) {
    return cart.reduce((sum, item) => {
        const days = rentalDays !== null ? rentalDays : item.days;
        let itemTotal;
        
        if (days === 1) {
            itemTotal = item.price * item.quantity;
        } else {
            // First day full price, remaining days 50% off
            const firstDayPrice = item.price * item.quantity;
            const additionalDays = (days - 1) * item.price * item.quantity * 0.5;
            itemTotal = firstDayPrice + additionalDays;
        }
        
        return sum + itemTotal;
    }, 0);
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        cartSubtotal.textContent = '€0.00';
        cartTotal.textContent = '€0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => {
        let itemPrice;
        if (item.days === 1) {
            itemPrice = item.price * item.quantity;
        } else {
            const firstDay = item.price * item.quantity;
            const additionalDays = (item.days - 1) * item.price * item.quantity * 0.5;
            itemPrice = firstDay + additionalDays;
        }
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="images/${item.id}.jpg" alt="${item.name}" onerror="this.style.display='none'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-id">${item.id}</div>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <label>Qty:</label>
                            <input type="number" value="${item.quantity}" min="1" max="${item.amount}" 
                                   onchange="updateCartItem('${item.id}', 'quantity', this.value)">
                        </div>
                        <div class="days-control">
                            <label>Days:</label>
                            <input type="number" value="${item.days}" min="1" 
                                   onchange="updateCartItem('${item.id}', 'days', this.value)">
                        </div>
                        <div class="cart-item-price">€${itemPrice.toFixed(2)}</div>
                    </div>
                    ${item.days > 1 ? '<div style="font-size:12px;color:#666;margin-top:4px;">Multi-day discount: 50% off from 2nd day is automatically applied.</div>' : ''}
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">&times;</button>
            </div>
        `;
    }).join('');
    
    const total = calculateTotal();
    cartSubtotal.textContent = `€${total.toFixed(2)}`;
    cartTotal.textContent = `€${total.toFixed(2)}`;
}

function openCartModal() {
    renderCart();
    document.getElementById('cart-modal').classList.add('active');
}

function closeCartModal() {
    document.getElementById('cart-modal').classList.remove('active');
}

function openBookingModal() {
    closeCartModal();
    // Set minimum date to today
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    document.getElementById('rental-start').min = todayStr;
    document.getElementById('rental-end').min = todayStr;

    // If all items in cart have the same days, pre-fill the date range
    if (cart.length > 0) {
        const maxDays = Math.max(...cart.map(item => item.days));
        const startDateInput = document.getElementById('rental-start');
        const endDateInput = document.getElementById('rental-end');
        // Only set if not already set
        if (!startDateInput.value) {
            startDateInput.value = todayStr;
        }
        if (!endDateInput.value || new Date(endDateInput.value) <= new Date(startDateInput.value)) {
            const endDate = new Date(startDateInput.value);
            endDate.setDate(endDate.getDate() + maxDays);
            endDateInput.value = endDate.toISOString().split('T')[0];
        }
    }

    renderBookingSummary();
    document.getElementById('booking-modal').classList.add('active');

    // Add event listeners to update summary when dates change
    document.getElementById('rental-start').addEventListener('change', renderBookingSummary);
    document.getElementById('rental-end').addEventListener('change', renderBookingSummary);
}

function closeBookingModal() {
    document.getElementById('booking-modal').classList.remove('active');
}

function renderBookingSummary() {
    const summary = document.getElementById('booking-summary');
    
    if (cart.length === 0) {
        summary.innerHTML = '<div class="cart-empty">No items in cart</div>';
        return;
    }
    
    // Calculate rental days from date inputs
    const startDate = document.getElementById('rental-start').value;
    const endDate = document.getElementById('rental-end').value;
    let rentalDays = 1;
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end - start;
        rentalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    
    const itemsHTML = cart.map(item => {
        let itemPrice;
        if (rentalDays === 1) {
            itemPrice = item.price * item.quantity;
        } else {
            const firstDay = item.price * item.quantity;
            const additionalDays = (rentalDays - 1) * item.price * item.quantity * 0.5;
            itemPrice = firstDay + additionalDays;
        }
        return `
            <div class="booking-item">
                <span>${item.name} (×${item.quantity} for ${rentalDays} day${rentalDays > 1 ? 's' : ''})</span>
                <span>€${itemPrice.toFixed(2)}</span>
            </div>
        `;
    }).join('');
    
    const subtotal = calculateTotal(rentalDays);
    const vat = subtotal * 0.21;
    const total = subtotal + vat;
    
    summary.innerHTML = `
        ${itemsHTML}
        <div class="booking-discount" style="font-size:13px; color:#666; margin-bottom:8px;">
            ${rentalDays > 1 ? 'Multi-day discount: 50% off from 2nd day is automatically applied.' : ''}
        </div>
        <div class="booking-total">
            <span>Total (excl. VAT):</span>
            <span>€${subtotal.toFixed(2)}</span>
        </div>
        <div class="booking-total">
            <span>VAT (21%):</span>
            <span>€${vat.toFixed(2)}</span>
        </div>
        <div class="booking-total" style="border-top: 2px solid #000; margin-top: 10px; padding-top: 10px; font-weight: 600;">
            <span>Total (incl. VAT):</span>
            <span>€${total.toFixed(2)}</span>
        </div>
    `;
}

function handleReservationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        customer: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            message: formData.get('message')
        },
        rental: {
            startDate: formData.get('start-date'),
            endDate: formData.get('end-date')
        },
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            days: item.days,
            price: item.price,
            total: item.price * item.quantity * item.days
        })),
        total: calculateTotal()
    };
    
    // Generate reservation number based on date and time: YYYYMMDD-HHMMSS
    function generateReservationNumber() {
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        return `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    }
    
    // Here you would typically send this to a server
    console.log('Reservation Data:', data);
    
    // Send booking info to Formspree
    const formDataToSend = new FormData();
    formDataToSend.append('reservation_number', generateReservationNumber());
    formDataToSend.append('name', data.customer.name);
    formDataToSend.append('email', data.customer.email);
    formDataToSend.append('phone', data.customer.phone);
    formDataToSend.append('company', data.customer.company);
    formDataToSend.append('message', data.customer.message);
    formDataToSend.append('start_date', data.rental.startDate);
    formDataToSend.append('end_date', data.rental.endDate);
    formDataToSend.append('items', data.items.map(item => `${item.name} (x${item.quantity} for ${item.days} day${item.days > 1 ? 's' : ''})`).join(', '));
    formDataToSend.append('total', data.total.toFixed(2));

    fetch('https://formspree.io/f/xgokzwwj', {
        method: 'POST',
        body: formDataToSend,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        // Optionally handle response
    }).catch(error => {
        // Optionally handle error
    });
    
    // Show success message
    const modalBody = document.querySelector('#booking-modal .modal-body');
    modalBody.innerHTML = `
        <div class="success-message">
            <h3 style="margin-bottom: 10px;">Reservation Request Submitted!</h3>
            <p>Thank you for your reservation request. We will contact you at <strong>${data.customer.email}</strong> shortly to confirm availability and arrange details.</p>
            <p style="margin-top: 15px;"><strong>Reservation Number:</strong> ${generateReservationNumber()}</p>
        </div>
        <button class="btn-primary" onclick="closeBookingModal(); cart = []; updateCartCount(); location.reload();">Close</button>
    `;
    
    // In a real application, you might send an email or API request here
    // For example:
    // fetch('/api/reservations', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
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
    
    // Cart button
    document.getElementById('cart-btn').addEventListener('click', openCartModal);
    
    // Close cart modal
    document.getElementById('close-cart').addEventListener('click', closeCartModal);
    
    // Proceed to booking
    document.getElementById('proceed-to-booking').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before proceeding.');
            return;
        }
        openBookingModal();
    });
    
    // Close booking modal
    document.getElementById('close-booking').addEventListener('click', closeBookingModal);
    
    // Reservation form submit
    document.getElementById('reservation-form').addEventListener('submit', handleReservationSubmit);
    
    // Close modals when clicking outside
    document.getElementById('cart-modal').addEventListener('click', (e) => {
        if (e.target.id === 'cart-modal') {
            closeCartModal();
        }
    });
    
    document.getElementById('booking-modal').addEventListener('click', (e) => {
        if (e.target.id === 'booking-modal') {
            closeBookingModal();
        }
    });
    
    // Item detail modal
    document.getElementById('close-item').addEventListener('click', closeItemModal);
    
    document.getElementById('item-modal').addEventListener('click', (e) => {
        if (e.target.id === 'item-modal') {
            closeItemModal();
        }
    });
}

// Item Detail Modal Functions
function openItemModal(itemId) {
    const item = EQUIPMENT_DATA.find(eq => eq.id === itemId);
    if (!item) return;
    
    document.getElementById('item-modal-id').textContent = item.id;
    document.getElementById('item-modal-title').textContent = item.name;
    document.getElementById('item-modal-name').textContent = item.name;
    
    // Show both short and detailed description if available
    const descriptionEl = document.getElementById('item-modal-description');
    if (item.detailedDescription) {
        descriptionEl.innerHTML = `<strong>${item.description}</strong><br><br>${item.detailedDescription}`;
    } else {
        descriptionEl.textContent = item.description;
    }
    
    const image = document.getElementById('item-modal-image');
    image.src = `images/${item.id}.jpg`;
    image.alt = item.name;
    image.onerror = function() { this.style.display = 'none'; };
    
    // Handle variants or regular items
    if (item.variants && item.variants.length > 0) {
        const defaultVariant = item.variants[0];
        const specsDiv = document.querySelector('.item-modal-specs');
        specsDiv.innerHTML = `
            <div class="variant-selector-modal">
                <label>Select Length:</label>
                <select id="modal-variant-${item.id}" onchange="updateModalVariant('${item.id}')">
                    ${item.variants.map(v => `<option value="${v.length}">${v.length}</option>`).join('')}
                </select>
            </div>
            <div class="item-modal-qty" id="modal-qty-${item.id}">×${defaultVariant.amount} available</div>
            <div class="item-modal-price" id="modal-price-${item.id}">€${defaultVariant.price.toFixed(2)}/day</div>
        `;
        
        const addBtn = document.getElementById('item-modal-add-btn');
        addBtn.onclick = function() {
            addToCartWithVariant(itemId);
            closeItemModal();
        };
    } else {
        const specsDiv = document.querySelector('.item-modal-specs');
        specsDiv.innerHTML = `
            <div class="item-modal-qty">×${item.amount} available</div>
            <div class="item-modal-price">€${item.price.toFixed(2)}/day</div>
        `;
        
        const addBtn = document.getElementById('item-modal-add-btn');
        addBtn.onclick = function() {
            addToCart(itemId);
            closeItemModal();
        };
    }
    
    document.getElementById('item-modal').classList.add('active');
}

function updateModalVariant(itemId) {
    const select = document.getElementById(`modal-variant-${itemId}`);
    const selectedLength = select.value;
    const item = EQUIPMENT_DATA.find(eq => eq.id === itemId);
    const variant = item.variants.find(v => v.length === selectedLength);
    
    document.getElementById(`modal-qty-${itemId}`).textContent = `×${variant.amount} available`;
    document.getElementById(`modal-price-${itemId}`).textContent = `€${variant.price.toFixed(2)}/day`;
}

function closeItemModal() {
    document.getElementById('item-modal').classList.remove('active');
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Make functions global for onclick handlers
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItem = updateCartItem;
window.openItemModal = openItemModal;

// Add to cart from list view with quantity
function addToCartFromList(itemId, qtyInputId) {
    const qty = Math.max(1, parseInt(document.getElementById(qtyInputId).value) || 1);
    const item = EQUIPMENT_DATA.find(eq => eq.id === itemId);
    if (!item) return;
    let cartItem = cart.find(ci => ci.id === itemId);
    if (cartItem) {
        cartItem.quantity = Math.min(cartItem.quantity + qty, item.amount);
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            amount: item.amount,
            quantity: Math.min(qty, item.amount),
            days: 1
        });
    }
    updateCartCount();
    renderCart();
}
