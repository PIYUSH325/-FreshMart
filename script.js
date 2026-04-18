// ============================================
// FRESHMART - JavaScript Functionality (with Shopping Cart)
// ============================================

// Cart State Management
let cart = JSON.parse(localStorage.getItem('freshmart_cart')) || [];

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const subtotalEl = document.getElementById('subtotal');
const totalAmountEl = document.getElementById('totalAmount');
const emptyCartBtn = document.getElementById('emptyCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const toast = document.getElementById('toast');

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // Product Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            productCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Cart Functionality
    function getProductData(productEl) {
        return {
            id: productEl.id.replace('product-', ''),
            name: productEl.dataset.name,
            price: parseFloat(productEl.dataset.price),
            image: productEl.dataset.image,
            originalPrice: productEl.dataset.originalPrice ? parseFloat(productEl.dataset.originalPrice) : null
        };
    }

    function addToCart(productEl) {
        const product = getProductData(productEl);
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
        showToast(`${product.name} added to cart!`);
    }

    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }

        saveCart();
        renderCart();
        updateBadge();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    }

    function emptyCart() {
        cart = [];
        updateCart();
        showToast('Cart emptied!');
    }

    function getTotalItems() {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function getTotalPrice() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.style.display = 'none';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <span class="cart-item-image">${item.image}</span>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn decrease">-</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn increase">+</button>
                        <button class="cart-item-remove remove">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        cartTotal.style.display = 'block';
        subtotalEl.textContent = `$${getTotalPrice()}`;
        totalAmountEl.textContent = `$${getTotalPrice()}`;
    }

    function saveCart() {
        localStorage.setItem('freshmart_cart', JSON.stringify(cart));
    }

    function updateBadge() {
        cartCount.textContent = getTotalItems();
    }

    function updateCart() {
        saveCart();
        updateBadge();
        renderCart();
    }

    // Event Delegation for Cart Item Controls
    cartItems.addEventListener('click', (e) => {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;

        const id = cartItem.dataset.id;

        if (e.target.classList.contains('increase')) {
            updateQuantity(id, 1);
        } else if (e.target.classList.contains('decrease')) {
            updateQuantity(id, -1);
        } else if (e.target.classList.contains('remove')) {
            if (confirm('Remove this item?')) {
                removeFromCart(id);
            }
        }
    });

    // Event Listeners for Cart
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });

    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    emptyCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to empty your cart?')) {
            emptyCart();
        }
    });
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty. Add items before checkout.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('freshmart_user') || '{}');
        if (!user.loggedIn) {
            window.location.href = 'login.html';
        } else {
            window.location.href = 'checkout.html';
        }
    });



    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
            closeCart();
        }
    });

    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }

    // Add to Cart Buttons (Real functionality)
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(btn.closest('.product-card'));
        });
    });

    function showToast(message) {
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }


    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Show success message
            showToast(`Thank you, ${name}! We'll contact you at ${email} soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                showToast('Thank you for subscribing!');
                emailInput.value = '';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
