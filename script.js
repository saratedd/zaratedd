// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Portfolio filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.classList.remove('hide');
                item.style.display = 'block';
            } else {
                item.classList.add('hide');
                item.style.display = 'none';
            }
        });
    });
});

// Magnifying Glass Effect
class ImageMagnifier {
    constructor() {
        this.magnifier = document.getElementById('magnifier');
        this.initMagnifier();
    }

    initMagnifier() {
        const imageContainers = document.querySelectorAll('.image-container');
        
        imageContainers.forEach(container => {
            const placeholder = container.querySelector('.image-placeholder');
            
            container.addEventListener('mouseenter', (e) => {
                this.showMagnifier(container, placeholder);
            });
            
            container.addEventListener('mousemove', (e) => {
                this.updateMagnifier(e, container, placeholder);
            });
            
            container.addEventListener('mouseleave', () => {
                this.hideMagnifier(container);
            });
        });
    }

    showMagnifier(container, placeholder) {
        container.classList.add('magnify-active');
        this.magnifier.style.display = 'block';
        
        // For demonstration, create a zoomed background
        // In a real implementation, you would use the actual image
        const bgColor = window.getComputedStyle(placeholder).backgroundColor;
        this.magnifier.style.background = `${bgColor} url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="20" text-anchor="middle" x="50">🔍</text></svg>') center/50px 50px no-repeat`;
    }

    updateMagnifier(e, container, placeholder) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position the magnifier
        const magnifierSize = 150;
        this.magnifier.style.left = (e.pageX - magnifierSize/2) + 'px';
        this.magnifier.style.top = (e.pageY - magnifierSize/2) + 'px';
        
        // Calculate background position for zoom effect
        const bgPosX = -x * 2 + magnifierSize/2;
        const bgPosY = -y * 2 + magnifierSize/2;
        
        this.magnifier.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`;
    }

    hideMagnifier(container) {
        container.classList.remove('magnify-active');
        this.magnifier.style.display = 'none';
    }
}

// Initialize magnifier when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageMagnifier();
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !service || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.gallery-item, .skill-item, .contact-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Lazy loading simulation for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const placeholder = entry.target;
            // In a real implementation, you would load the actual image here
            placeholder.style.opacity = '1';
            imageObserver.unobserve(placeholder);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    imagePlaceholders.forEach(placeholder => {
        imageObserver.observe(placeholder);
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Touch support for mobile magnifier
let touchTimeout;
document.addEventListener('touchstart', (e) => {
    const target = e.target.closest('.image-container');
    if (target) {
        touchTimeout = setTimeout(() => {
            // Simulate long press for mobile magnification
            const event = new MouseEvent('mouseenter', {
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY
            });
            target.dispatchEvent(event);
        }, 500);
    }
});

document.addEventListener('touchend', () => {
    clearTimeout(touchTimeout);
    // Hide magnifier on touch end
    document.querySelectorAll('.image-container').forEach(container => {
        container.dispatchEvent(new MouseEvent('mouseleave'));
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Photography Portfolio Website Loaded Successfully! 📸');