// Sample product data (100+ products with Pexels URLs)
const products = [
    // Fruits (25 products)
    { id: 1, name: 'Apple', category: 'fruits', price: 0.99, image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Fresh red apples, perfect for snacking.' },
    { id: 2, name: 'Banana', category: 'fruits', price: 0.59, image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Sweet and ripe bananas.' },
    { id: 3, name: 'Orange', category: 'fruits', price: 1.29, image: 'https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Juicy and tangy oranges.' },
    // Add more fruits up to 25...
    { id: 25, name: 'Mango', category: 'fruits', price: 2.49, image: 'https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Sweet tropical mangoes.' },
    // Vegetables (25 products)
    { id: 26, name: 'Carrot', category: 'vegetables', price: 0.79, image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Crunchy and fresh carrots.' },
    { id: 27, name: 'Broccoli', category: 'vegetables', price: 1.29, image: 'https://images.pexels.com/photos/47347/pexels-photo-47347.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Nutritious green broccoli.' },
    // Add more vegetables up to 50...
    { id: 50, name: 'Tomato', category: 'vegetables', price: 0.99, image: 'https://images.pexels.com/photos/364129/pexels-photo-364129.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Ripe red tomatoes.' },
    // Dairy (25 products)
    { id: 51, name: 'Milk', category: 'dairy', price: 3.49, image: 'https://images.pexels.com/photos/533336/pexels-photo-533336.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Fresh whole milk.' },
    { id: 52, name: 'Cheese', category: 'dairy', price: 4.99, image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Cheddar cheese block.' },
    // Add more dairy up to 75...
    { id: 75, name: 'Yogurt', category: 'dairy', price: 1.99, image: 'https://images.pexels.com/photos/1437718/pexels-photo-1437718.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Creamy plain yogurt.' },
    // Bakery (25 products)
    { id: 76, name: 'Bread', category: 'bakery', price: 2.99, image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Freshly baked white bread.' },
    { id: 77, name: 'Croissant', category: 'bakery', price: 1.99, image: 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Buttery and flaky croissants.' },
    // Add more bakery up to 100...
    { id: 100, name: 'Bagel', category: 'bakery', price: 1.49, image: 'https://images.pexels.com/photos/2115991/pexels-photo-2115991.jpeg?auto=compress&cs=tinysrgb&w=150', description: 'Chewy and delicious bagels.' },
];

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Hero Slider
if (document.querySelector('.slider')) {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Initial slide
    showSlide(currentSlide);
}

// Home page: Display featured products
if (document.getElementById('featured-products')) {
    const featuredProducts = products.slice(0, 8);
    const container = document.getElementById('featured-products');
    container.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.pexels.com/photos/2084239/pexels-photo-2084239.jpeg?auto=compress&cs=tinysrgb&w=150';">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <a href="product.html?id=${product.id}" class="cta-button">View Details</a>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
    updateCartCount();
}

// Category page: Display products by category
if (document.getElementById('category-products')) {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('cat');
    const categoryTitle = document.getElementById('category-title');
    const container = document.getElementById('category-products');
    if (category && categoryTitle && container) {
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        const filteredProducts = products.filter(product => product.category === category);
        container.innerHTML = filteredProducts.length > 0 ? filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.pexels.com/photos/2084239/pexels-photo-2084239.jpeg?auto=compress&cs=tinysrgb&w=150';">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <a href="product.html?id=${product.id}" class="cta-button">View Details</a>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `).join('') : '<p>No products found in this category.</p>';
        // Highlight active category
        document.querySelector(`.cat-${category}`).classList.add('active');
    }
    updateCartCount();
}

// Product details page
if (document.getElementById('product-name')) {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-image').innerHTML = `<img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.pexels.com/photos/2084239/pexels-photo-2084239.jpeg?auto=compress&cs=tinysrgb&w=150';">`;
        document.getElementById('add-to-cart').onclick = () => addToCart(productId);
    } else {
        document.querySelector('.product-details').innerHTML = '<p>Product not found.</p>';
    }
    updateCartCount();
}

// Cart page
if (document.getElementById('cart-items')) {
    function displayCart() {
        const container = document.getElementById('cart-items');
        container.innerHTML = cart.length > 0 ? cart.map(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return '';
            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.pexels.com/photos/2084239/pexels-photo-2084239.jpeg?auto=compress&cs=tinysrgb&w=150';">
                    <div>
                        <h3>${product.name}</h3>
                        <p>$${product.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        }).join('') : '<p>Your cart is empty.</p>';
        const total = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return product ? sum + product.price * item.quantity : sum;
        }, 0);
        document.getElementById('cart-total').textContent = total.toFixed(2);
    }
    displayCart();
    updateCartCount();
}

// Add to cart
function addToCart(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    saveCart();
    alert('Added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    if (document.getElementById('cart-items')) {
        displayCart();
    }
}