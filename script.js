/**
 * Interactive Portfolio Website JavaScript
 * 
 * This file contains all the interactive functionality for the portfolio website including:
 * - Particle background system
 * - Navigation interactions
 * - Smooth scrolling
 * - Animation triggers
 * - Form handling
 * - Skills progress animations
 * - Project filtering
 * - Counter animations
 * - Mobile navigation
 */

/* =============================================================================
   GLOBAL VARIABLES & CONFIGURATION
   ============================================================================= */

// Animation settings
const ANIMATION_SETTINGS = {
    duration: 1000,
    easing: 'ease-out',
    offset: 100 // Pixels from viewport bottom to trigger animations
};

// Counter animation speed
const COUNTER_SPEED = 2000; // milliseconds

// Form validation patterns
const VALIDATION_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[1-9][\d]{0,15}$/
};

/* =============================================================================
   DOCUMENT READY & INITIALIZATION
   ============================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initNavigation();
    initAnimations();
    initSkillsProgress();
    initCounters();
    initProjectFilters();
    initContactForm();
    initScrollIndicators();
    initTypingAnimation();
});

/* =============================================================================
   PARTICLE SYSTEM INITIALIZATION
   ============================================================================= */

function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js not loaded');
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00d4ff', '#b84fff', '#ffffff']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00d4ff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

/* =============================================================================
   NAVIGATION FUNCTIONALITY
   ============================================================================= */

function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links (if any on the same page)
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(15, 20, 25, 0.98)';
            } else {
                navbar.style.background = 'rgba(15, 20, 25, 0.95)';
            }
        }
    });
}

/* =============================================================================
   SCROLL ANIMATIONS
   ============================================================================= */

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: `0px 0px -${ANIMATION_SETTINGS.offset}px 0px`
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger specific animations based on element
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillProgress(entry.target);
                } else if (entry.target.classList.contains('soft-skill-item')) {
                    animateCircularProgress(entry.target);
                } else if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .hero-content,
        .about-content,
        .skill-card,
        .soft-skill-item,
        .project-card,
        .timeline-item,
        .highlight-card,
        .stat-item,
        .contact-item,
        .goal-item
    `);

    animatableElements.forEach(el => {
        observer.observe(el);
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all ${ANIMATION_SETTINGS.duration}ms ${ANIMATION_SETTINGS.easing}`;
    });

    // CSS for animated state
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* =============================================================================
   SKILLS PROGRESS ANIMATION
   ============================================================================= */

function initSkillsProgress() {
    // This will be triggered by the intersection observer
    // when skill cards come into view
}

function animateSkillProgress(skillCard) {
    const progressBars = skillCard.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const percentage = bar.parentElement.getAttribute('data-percentage');
        
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, 300);
    });
}

function animateCircularProgress(skillItem) {
    const circleProgress = skillItem.querySelector('.circle-progress');
    if (!circleProgress) return;

    const percentage = circleProgress.getAttribute('data-percentage');
    const circleFill = circleProgress.querySelector('.circle-fill');
    
    if (circleFill) {
        const circumference = 283; // 2 * π * 45 (radius)
        const offset = circumference - (percentage / 100) * circumference;
        
        setTimeout(() => {
            circleFill.style.strokeDashoffset = offset;
        }, 300);
    }
}

/* =============================================================================
   COUNTER ANIMATIONS
   ============================================================================= */

function initCounters() {
    // This will be triggered by the intersection observer
}

function animateCounter(statItem) {
    const counter = statItem.querySelector('.stat-number');
    if (!counter) return;

    const target = parseInt(counter.getAttribute('data-count'));
    const duration = COUNTER_SPEED;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        counter.textContent = Math.floor(current);
    }, stepDuration);
}

/* =============================================================================
   PROJECT FILTERING SYSTEM
   ============================================================================= */

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

/* =============================================================================
   CONTACT FORM HANDLING
   ============================================================================= */

function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        let isValid = true;
        const formData = new FormData(form);
        
        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });

        // Validate name
        const name = formData.get('name').trim();
        if (name.length < 2) {
            showError('nameError', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }

        // Validate email
        const email = formData.get('email').trim();
        if (!VALIDATION_PATTERNS.email.test(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject
        const subject = formData.get('subject').trim();
        if (subject.length < 5) {
            showError('subjectError', 'Please enter a subject (at least 5 characters)');
            isValid = false;
        }

        // Validate message
        const message = formData.get('message').trim();
        if (message.length < 10) {
            showError('messageError', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function submitForm() {
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Show success message
            form.style.display = 'none';
            successMessage.classList.add('show');

            // Reset form
            form.reset();

            // Hide success message after 5 seconds and show form again
            setTimeout(() => {
                successMessage.classList.remove('show');
                form.style.display = 'block';
            }, 5000);
        }, 2000);
    }
}

/* =============================================================================
   TYPING ANIMATION
   ============================================================================= */

function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let index = 0;
    
    function typeChar() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 100);
        }
    }
    
    // Start typing animation after page load
    setTimeout(typeChar, 1000);
}

/* =============================================================================
   SCROLL INDICATORS & SMOOTH SCROLLING
   ============================================================================= */

function initScrollIndicators() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Hide scroll indicator after scrolling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }

        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Set new timeout to handle scroll end
        scrollTimeout = setTimeout(function() {
            // Scroll ended
        }, 150);
    });
}

/* =============================================================================
   DOWNLOAD CV FUNCTIONALITY
   ============================================================================= */

// Initialize download CV button
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadCV');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Download CV functionality
            setTimeout(() => {
                // Create a temporary link element to trigger download
                const link = document.createElement('a');
                link.href = 'public/vidyaresume (1).pdf'; // Path to your CV file
                link.download = 'Vidyashree_Resume.pdf'; // Name for downloaded file
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 200);
        });
    }
});

/* =============================================================================
   UTILITY FUNCTIONS
   ============================================================================= */

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/* =============================================================================
   ERROR HANDLING & GRACEFUL DEGRADATION
   ============================================================================= */

// Global error handler for graceful degradation
window.addEventListener('error', function(e) {
    console.warn('Portfolio script error:', e.error);
    // Continue execution without breaking the user experience
});

// Handle cases where external libraries might not load
if (typeof particlesJS === 'undefined') {
    console.warn('Particles.js library not loaded. Continuing without particle effects.');
}

/* =============================================================================
   PERFORMANCE OPTIMIZATIONS
   ============================================================================= */

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(function() {
    // Handle scroll-related updates here if needed
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Optimize resize events with debouncing
const optimizedResizeHandler = debounce(function() {
    // Handle resize-related updates here if needed
}, 250);

window.addEventListener('resize', optimizedResizeHandler);