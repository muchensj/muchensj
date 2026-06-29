// ================================================
// Beijing Muchen Shengjing Technology Co., Ltd
// Corporate Website JavaScript
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoader();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initCookieBanner();
    initScrollTop();
    initContactForm();
});

// Loader
function initLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }
}

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Add scrolled class on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Set active nav item
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Animations
function initAnimations() {
    // Counter animation for stats
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(animate, 10);
            } else {
                counter.innerText = target;
            }
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animate();
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });

    // Parallax effect for hero shapes
    window.addEventListener('scroll', () => {
        const shapes = document.querySelectorAll('.shape');
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 * (index + 1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Cookie Banner
function initCookieBanner() {
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptBtn = document.querySelector('.cookie-btn-accept');
    const declineBtn = document.querySelector('.cookie-btn-decline');

    // Show banner after 2 seconds
    setTimeout(() => {
        if (cookieBanner && !getCookie('cookieConsent')) {
            cookieBanner.classList.add('show');
        }
    }, 2000);

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            setCookie('cookieConsent', 'accepted', 365);
            cookieBanner.classList.remove('show');
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            setCookie('cookieConsent', 'declined', 365);
            cookieBanner.classList.remove('show');
        });
    }
}

// Cookie helper functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Scroll to Top
function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                }
            });

            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = `
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="#4CAF50">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <p>Thank you for your message! We'll get back to you soon.</p>
                `;
                successMsg.style.cssText = `
                    text-align: center;
                    padding: 40px;
                    background: #f0f9ff;
                    border-radius: 12px;
                    margin-top: 20px;
                `;
                contactForm.appendChild(successMsg);

                // Reset form
                contactForm.reset();

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// News card hover effects
document.querySelectorAll('.news-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Value card hover effects
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Typing effect for hero text (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect if element exists
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const text = typingElement.getAttribute('data-text');
    typeWriter(typingElement, text);
}

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance: Debounce function
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimize scroll events
const optimizeScroll = debounce(function() {
    // Add any scroll-based optimizations here
}, 10);

window.addEventListener('scroll', optimizeScroll);

// Console message for developers
console.log('%c🌟 Beijing Muchen Shengjing Technology Co., Ltd', 'font-size: 24px; font-weight: bold; color: #0066cc;');
console.log('%cWelcome to our corporate website!', 'font-size: 14px; color: #666;');
console.log('%cWebsite: muchensj.com', 'font-size: 12px; color: #999;');