// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidenav = document.querySelector('.sidenav');

    if (menuToggle && sidenav) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            sidenav.classList.toggle('active');
            // Toggle aria-expanded for accessibility
            const isExpanded = sidenav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidenav.contains(e.target) && !menuToggle.contains(e.target)) {
                sidenav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Product Collection Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-item');

    if (filterButtons.length > 0 && products.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const category = button.dataset.category;

                // Add fade effect to filtering
                products.forEach(product => {
                    product.style.opacity = '0';
                    setTimeout(() => {
                        if (category === 'all' || product.dataset.category === category) {
                            product.style.display = 'block';
                            setTimeout(() => {
                                product.style.opacity = '1';
                            }, 50);
                        } else {
                            product.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                sidenav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');

                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-out'); // Initial state
        observer.observe(section);
    });

    // Product Category Hover Effects
    const productCategories = document.querySelectorAll('.product-category');

    productCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Product Item Hover Effects for Explore Page
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Testimonial Carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialInterval = 5000; // 5 seconds per testimonial

    if (testimonials.length > 1) {
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) testimonial.style.display = 'none';
        });

        // Function to show next testimonial
        function showNextTestimonial() {
            testimonials[currentTestimonial].style.opacity = '0';
            setTimeout(() => {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
                setTimeout(() => {
                    testimonials[currentTestimonial].style.opacity = '1';
                }, 50);
            }, 500);
        }

        // Start testimonial rotation
        setInterval(showNextTestimonial, testimonialInterval);
    }

    // Form Validation (if contact form exists)
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Lazy Loading for Images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Scroll to Top Button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollButton);

    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add CSS for scroll button and animations
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--gold-primary);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: none;
            font-size: 20px;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .scroll-top:hover {
            background: var(--gold-dark);
            transform: translateY(-3px);
        }

        .fade-out {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }

        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }

        .product-item {
            transition: all 0.3s ease;
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden (user switched tabs)
            document.title = 'Come back to Timber & Touch!';
        } else {
            // Page is visible again
            document.title = 'Timber & Touch';
        }
    });

    // Performance monitoring
    window.addEventListener('load', () => {
        // Log performance metrics
        const performance = window.performance;
        if (performance) {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }
    });
});