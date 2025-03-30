// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    createImprovedGlimmerEffect();
    initCardInteractions('.team-member', true);
    initCardInteractions('.game-card', true);
    setupNavigation();
    setupSmoothScrolling();
    
    // Setup the "Meet our glorious Developers" button
    document.querySelector('.premium-button')?.addEventListener('click', () => {
        document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Setup navigation scroll effects
function setupNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // Function to check scroll position and update nav styles
    function updateNavigation() {
        const scrollPosition = window.scrollY;
        
        // Add/remove scrolled class
        nav.classList.toggle('scrolled', scrollPosition > 50);
        
        // Highlight active nav link based on scroll position
        const activePosition = scrollPosition + 100; // Offset for better detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (activePosition >= sectionTop && activePosition < sectionBottom) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    // Use toggle instead of add/remove
                    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
                });
            }
        });
    }
    
    // Throttle scroll event for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavigation();
                // Add parallax effect here for better performance
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    updateNavigation();
}

// Setup smooth scrolling for all internal links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize ScrollReveal animations for all elements
function initScrollAnimations() {
    const sr = ScrollReveal();
    // Common options for all elements
    const commonOptions = {
        duration: 1000,
        distance: '50px',
        reset: true
    };

    // Define animation groups with their specific options
    const animations = [
        {
            selector: '.glowing-logo',
            options: { ...commonOptions, origin: 'top', delay: 200 }
        },
        {
            selector: '.tagline',
            options: { ...commonOptions, origin: 'bottom', delay: 400 }
        },
        {
            selector: '.premium-button',
            options: { ...commonOptions, origin: 'bottom', delay: 600 }
        },
        {
            selector: '.team h2',
            options: { ...commonOptions, origin: 'top', delay: 200 }
        },
        {
            selector: '.team-member',
            options: { ...commonOptions, origin: 'bottom', interval: 200 }
        },
        {
            selector: '.game-card',
            options: { ...commonOptions, origin: 'bottom', interval: 200 }
        },
        {
            selector: '.contributions h2, .contributions-subtitle',
            options: { ...commonOptions, origin: 'top', delay: 200 }
        },
        {
            selector: '.nav-links a',
            options: { ...commonOptions, origin: 'top', interval: 100, delay: 200 }
        }
    ];

    // Apply animations to all defined groups
    animations.forEach(group => {
        sr.reveal(group.selector, group.options);
    });
}

// Unified card interactions for both team members and game cards
function initCardInteractions(selector, enableClick = false) {
    const cards = document.querySelectorAll(selector);
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) translateY(-10px)';
            card.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.2)';
            
            // For game cards, show stats and scale image
            if (selector === '.game-card') {
                card.querySelector('.game-stats')?.style.setProperty('opacity', '1');
                card.querySelector('.game-image img')?.style.setProperty('transform', 'scale(1.1)');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.1)';
            
            // Reset game card specific styles
            if (selector === '.game-card') {
                card.querySelector('.game-stats')?.style.setProperty('opacity', '0');
                card.querySelector('.game-image img')?.style.setProperty('transform', 'scale(1)');
            }
        });
        
        // Setup click behavior if enabled
        if (enableClick) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const link = selector === '.team-member' 
                    ? card.querySelector('a') 
                    : card.querySelector('.play-button');
                
                if (link) {
                    window.open(link.getAttribute('href'), '_blank');
                }
            });
        }
    });
    
    // Hide the view all container if it's a game card
    if (selector === '.game-card') {
        document.querySelector('.view-all-container')?.style.setProperty('display', 'none');
    }
}

// Improved Glimmer Effect
function createImprovedGlimmerEffect() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Create and append glimmer container
    const glimmerContainer = document.createElement('div');
    glimmerContainer.className = 'glimmer-container';
    Object.assign(glimmerContainer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none'
    });
    heroSection.appendChild(glimmerContainer);

    // Function to create a single glimmer
    function createGlimmer() {
        const glimmer = document.createElement('div');
        glimmer.className = 'glimmer';
        
        // Center-biased positioning
        const centerBiasX = Math.random() * 0.6 + 0.2; // 20% to 80% horizontal
        const centerBiasY = Math.random() * 0.6 + 0.2; // 20% to 80% vertical
        
        // Size and animation duration
        const size = Math.random() * 4 + 2; // 2px to 6px
        const duration = Math.random() * 2 + 3; // 3 to 5 seconds
        
        // Apply styles
        Object.assign(glimmer.style, {
            left: `${centerBiasX * 100}%`,
            top: `${centerBiasY * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animation: `glimmer ${duration}s ease-in-out`,
            boxShadow: `0 0 ${size * 2}px rgba(255, 215, 0, 0.${Math.floor(Math.random() * 5) + 3})`
        });
        
        // Add to container
        glimmerContainer.appendChild(glimmer);

        // Remove after animation completes to prevent memory leaks
        setTimeout(() => {
            glimmer.remove();
        }, duration * 1000);
    }

    // Create glimmers at intervals
    setInterval(() => {
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
            setTimeout(createGlimmer, Math.random() * 100); // Staggered creation
        }
    }, 700);
}