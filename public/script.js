// Smooth Scroll Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetID);
        const offset = 70; // header height
        const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
    });
});

// Header Background Change on Scroll
const header = document.querySelector('.site-header');
const heroSection = document.querySelector('.section-hero');

function updateHeaderBackground() {
    if (window.scrollY > heroSection.offsetHeight - 70) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
}

window.addEventListener('scroll', updateHeaderBackground);

// Particles.js Configuration for Hero Section
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 120,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: ['#ffffff', '#008080', '#00b3b3', '#e0f7fa']
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 6
                    }
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 3,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 200,
                    color: '#ffffff',
                    opacity: 0.2,
                    width: 1,
                    shadow: {
                        enable: true,
                        blur: 5,
                        color: '#008080'
                    }
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: true,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    },
                    trail: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: {
                        enable: true,
                        mode: ['grab', 'bubble', 'repulse']
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 150,
                        line_linked: {
                            opacity: 0.6
                        }
                    },
                    bubble: {
                        distance: 200,
                        size: 10,
                        duration: 2,
                        opacity: 0.6,
                        speed: 3
                    },
                    repulse: {
                        distance: 100,
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
            retina_detect: true,
            fps_limit: 60,
            background: {
                color: 'transparent',
                image: '',
                position: '50% 50%',
                repeat: 'no-repeat',
                size: 'cover'
            }
        });
    }
}

// Dynamic background for the Skills section
function createMovingShapes() {
    const shapesContainer = document.querySelector('.dynamic-shapes');
    if (!shapesContainer) return;

    // Create small floating shapes
    for (let i = 0; i < 10; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Randomize properties
        const size = Math.random() * 20 + 10; // 10-30px
        const isSquare = Math.random() > 0.5;
        const duration = Math.random() * 15 + 10; // 10-25s
        const delay = Math.random() * 5;
        
        // Apply styles
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.position = 'absolute';
        shape.style.borderRadius = isSquare ? '3px' : '50%';
        shape.style.backgroundColor = i % 2 === 0 ? 'var(--primary-accent)' : 'var(--dark-navy)';
        shape.style.opacity = '0.15';
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.animation = `float-small ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        shapesContainer.appendChild(shape);
    }
}

// Add animation keyframes for small floating shapes
function addKeyframesForShapes() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = `
        @keyframes float-small {
            0% { transform: translate(0, 0) rotate(0deg); }
            100% { transform: translate(${Math.random() * 50 + 20}px, ${Math.random() * 50 + 20}px) rotate(${Math.random() * 180}deg); }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Interactive hover effect for the About section
function initAboutSectionInteraction() {
    const aboutSection = document.getElementById('about');
    const dynamicBg = document.querySelector('.dynamic-bg');
    
    if (!aboutSection || !dynamicBg) return;
    
    aboutSection.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = aboutSection.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        // Subtle parallax effect on the pattern
        dynamicBg.style.backgroundPosition = `${x * 50}px ${y * 50}px, ${-x * 50}px ${y * 50}px, ${x * 50}px ${-y * 50}px, ${-x * 50}px ${-y * 50}px`;
    });
}

// Intersection Observer for Fade-In Elements
const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
const fadeObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
);

fadeElements.forEach(el => fadeObserver.observe(el));

// Skill Bar Animation
const skillFills = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                fill.style.width = fill.dataset.percentage;
                skillObserver.unobserve(fill);
            }
        });
    },
    { threshold: 0.6 }
);

skillFills.forEach(fill => skillObserver.observe(fill));

// Project Demo and Code Viewing Functions
function openDemo(projectId) {
    const demos = {
        meshisele: 'https://apps.apple.com/app/meshisele/id123456789',
        fitpulse: 'https://fitpulse.jp/',
        tokyoai: 'https://tokyopredict.ai/demo'
    };
    
    const url = demos[projectId];
    if (url) {
        window.open(url, '_blank');
    } else {
        showNotification('Demo coming soon!', 'info');
    }
}

function openCode(projectId) {
    const repos = {
        meshisele: 'https://github.com/kahotsang/meshisele',
        fitpulse: 'https://github.com/kahotsang/fitpulse',
        tokyoai: 'https://github.com/kahotsang/tokyo-predict-ai'
    };
    
    const url = repos[projectId];
    if (url) {
        window.open(url, '_blank');
    } else {
        showNotification('Code repository coming soon!', 'info');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
}

// Enhanced Mobile Navigation
function createMobileNav() {
    const header = document.querySelector('.site-header .container');
    const nav = document.querySelector('.main-nav');
    
    // Remove existing toggle if present
    const existingToggle = document.querySelector('.mobile-nav-toggle');
    if (existingToggle) {
        existingToggle.remove();
    }
    
    // Create mobile nav toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-nav-toggle';
    mobileToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Insert toggle before nav
    header.insertBefore(mobileToggle, nav);
    
    // Toggle functionality
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && nav.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Enhanced Timeline Animations
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        this.measurePageLoad();
        this.measureInteractions();
    }
    
    measurePageLoad() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
            this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            
            console.log('Performance Metrics:', this.metrics);
        });
    }
    
    measureInteractions() {
        let interactionCount = 0;
        const interactionEvents = ['click', 'scroll', 'keydown'];
        
        interactionEvents.forEach(eventType => {
            document.addEventListener(eventType, () => {
                interactionCount++;
                if (interactionCount % 10 === 0) {
                    console.log(`User interactions: ${interactionCount}`);
                }
            });
        });
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip to main content
            if (e.key === 'Tab' && e.altKey) {
                e.preventDefault();
                document.querySelector('main')?.focus();
            }
            
            // Close mobile menu with Escape
            if (e.key === 'Escape') {
                const mobileMenu = document.querySelector('.main-nav.active');
                if (mobileMenu) {
                    document.querySelector('.mobile-nav-toggle').click();
                }
            }
        });
    }
    
    setupFocusManagement() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('focus-visible');
            });
            
            element.addEventListener('blur', () => {
                element.classList.remove('focus-visible');
            });
        });
    }
    
    setupScreenReaderSupport() {
        // Add ARIA labels and roles
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (!section.getAttribute('aria-label')) {
                const title = section.querySelector('h2, h3');
                if (title) {
                    section.setAttribute('aria-label', title.textContent);
                }
            }
        });
    }
}

// Firebase Configuration and Contact Form
class FirebaseContactForm {
    constructor() {
        this.db = null;
        this.isInitialized = false;
        this.recipientEmail = null;
    }

    async init() {
        try {
            // Firebase configuration - Replace with your actual Firebase config
            const firebaseConfig = {
                apiKey: "AIzaSyDFk-mhPtg2Ufkyg3C98OB5kSE4eC8RzI0",
                authDomain: "kahotsang-portfolio.firebaseapp.com",
                projectId: "kahotsang-portfolio",
                storageBucket: "kahotsang-portfolio.firebasestorage.app",
                messagingSenderId: "290418004803",
                appId: "1:290418004803:web:15c09ecd48a6f8c25b15f6",
                measurementId: "G-XX7DDMEB8K"
            };

            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            this.db = firebase.firestore();
            this.isInitialized = true;
            
            // Decrypt recipient email
            this.recipientEmail = this.decryptEmail();
            
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            this.showFormMessage('Contact form is temporarily unavailable. Please try again later.', 'error');
        }
    }

    decryptEmail() {
        try {
            const encryptedEmail = document.querySelector('#email-display').getAttribute('data-email');
            return atob(encryptedEmail); // Base64 decode
        } catch (error) {
            console.error('Email decryption failed:', error);
            return 'tsangkaho12@gmail.com'; // Fallback
        }
    }

    setupEmailReveal() {
        const emailDisplay = document.querySelector('#email-display');
        if (emailDisplay) {
            emailDisplay.addEventListener('click', () => {
                if (!emailDisplay.classList.contains('revealed')) {
                    emailDisplay.textContent = this.recipientEmail;
                    emailDisplay.classList.add('revealed');
                }
            });
        }
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) {
            console.error('Contact form not found!');
            return;
        }

        // Add real-time validation feedback
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'text':
                isValid = value.length >= 2;
                errorMessage = 'Name must be at least 2 characters long';
                break;
            default:
                isValid = value.length >= 10;
                errorMessage = 'Message must be at least 10 characters long';
        }

        if (!isValid && value) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }

        // Show loading state
        this.setLoadingState(form, true);
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            if (!this.isInitialized) {
                throw new Error('Firebase not initialized');
            }

            // Prepare message data
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const message = formData.get('message') || '';
            
            const messageData = {
                name: name.trim(),
                email: email.trim(),
                message: message.trim(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                ip: await this.getClientIP(),
                userAgent: navigator.userAgent
            };

            // Save to Firebase
            await this.db.collection('contact_messages').add(messageData);

            // Send email notification (you can implement this with Firebase Functions)
            await this.sendEmailNotification(messageData);

            // Show success message
            this.showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
            form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
        } finally {
            // Reset loading state
            this.setLoadingState(form, false);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    }

    validateForm(formData) {
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const message = formData.get('message') || '';
        
        const nameTrimmed = name.trim();
        const emailTrimmed = email.trim();
        const messageTrimmed = message.trim();

        // Clear previous messages
        this.clearFormMessage();

        // Validate name
        if (!nameTrimmed || nameTrimmed.length < 2) {
            this.showFormMessage('Please enter a valid name (at least 2 characters).', 'error');
            return false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
            this.showFormMessage('Please enter a valid email address.', 'error');
            return false;
        }

        // Validate message
        if (!messageTrimmed || messageTrimmed.length < 10) {
            this.showFormMessage('Please enter a message (at least 10 characters).', 'error');
            return false;
        }

        return true;
    }

    setLoadingState(form, isLoading) {
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            if (isLoading) {
                group.classList.add('loading');
            } else {
                group.classList.remove('loading');
            }
        });
    }

    showFormMessage(message, type) {
        const messageContainer = document.getElementById('form-message');
        if (messageContainer) {
            messageContainer.textContent = message;
            messageContainer.className = `form-message ${type} show`;
            
            // Auto-hide success messages after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    this.clearFormMessage();
                }, 5000);
            }
        }
    }

    clearFormMessage() {
        const messageContainer = document.getElementById('form-message');
        if (messageContainer) {
            messageContainer.className = 'form-message';
            messageContainer.textContent = '';
        }
    }

    async getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return 'Unknown';
        }
    }

    async sendEmailNotification(messageData) {
        // This would typically be handled by Firebase Functions
        // For now, we'll just log the notification
        console.log('Email notification would be sent to:', this.recipientEmail);
        console.log('Message data:', messageData);
        
        // You can implement Firebase Functions to send actual emails
        // Example Firebase Function (to be deployed separately):
        /*
        exports.sendContactEmail = functions.firestore
            .document('contact_messages/{messageId}')
            .onCreate(async (snap, context) => {
                const messageData = snap.data();
                
                // Send email using nodemailer or similar
                // Implementation depends on your email service
            });
        */
    }
}

// Initialize Firebase Contact Form
const firebaseContactForm = new FirebaseContactForm();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Firebase contact form
    await firebaseContactForm.init();
    firebaseContactForm.setupEmailReveal();
    firebaseContactForm.setupContactForm();
    
    // Initialize other components
    initParticles();
    createMovingShapes();
    addKeyframesForShapes();
    initAboutSectionInteraction();
    createMobileNav();
    setupTimelineAnimations();
    
    // Initialize managers
    const performanceMonitor = new PerformanceMonitor();
    const accessibilityManager = new AccessibilityManager();
    const progressIndicator = new ProgressIndicator();
    const animationManager = new AnimationManager();
    const skillBarManager = new SkillBarManager();
    const performanceOptimizer = new PerformanceOptimizer();
    const articleModal = new ArticleModal();
    
    performanceMonitor.init();
    accessibilityManager.init();
    progressIndicator.init();
    skillBarManager.init();
    performanceOptimizer.init();
    articleModal.init();
});

// Progress Indicator
class ProgressIndicator {
    constructor() {
        this.progressBar = document.querySelector('.progress-bar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateProgress());
    }

    updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = scrollPercent + '%';
        }
    }
}

// Enhanced Animations
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupTypingEffect();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.2;
                        entry.target.style.animationDelay = `${delay}s`;
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-title .title-line');
        if (heroTitle) {
            const text = heroTitle.getAttribute('data-text') || heroTitle.textContent;
            
            // Set the initial text to reserve space
            heroTitle.textContent = text;
            
            // Force a reflow to ensure the space is calculated
            heroTitle.offsetHeight;
            
            // Clear the text and start typing
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing effect when hero section is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(heroTitle);
        }
    }
}

// Enhanced Skill Bar Animation
class SkillBarManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSkillBars();
        this.setupIntersectionObserver();
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
            // Set initial state
            bar.style.width = '0%';
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Store the target percentage
            const percentage = bar.getAttribute('data-percentage');
            bar.setAttribute('data-target', percentage);
        });
    }

    setupIntersectionObserver() {
        const skillSection = document.querySelector('.section-skills');
        if (!skillSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(skillSection);
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        
        skillBars.forEach((bar, index) => {
            const percentage = bar.getAttribute('data-target');
            
            // Add delay for staggered animation
            setTimeout(() => {
                bar.style.width = percentage;
                bar.classList.add('animated');
            }, index * 200); // 200ms delay between each bar
        });
    }

    // Fallback method to ensure animation triggers
    forceAnimate() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        skillBars.forEach((bar, index) => {
            const percentage = bar.getAttribute('data-percentage');
            setTimeout(() => {
                bar.style.width = percentage;
            }, index * 200);
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupScrollThrottling();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    setupImageOptimization() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
    }

    setupScrollThrottling() {
        let ticking = false;
        
        const updateOnScroll = () => {
            // Update scroll-based animations here
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
}

// Update when window resizes
window.addEventListener('resize', createMobileNav);

// Article Modal System
class ArticleModal {
    constructor() {
        this.modal = document.getElementById('article-modal');
        this.articles = {
            'meshisele': {
                title: 'From Side Hustle to Success: How I Built MeshiSele in 6 Months',
                date: 'Jan 15, 2025',
                category: 'Business & Innovation',
                content: `
                    <p>It all started with a simple problem: "What should I eat today?" Like most people, I was spending way too much time deciding on meals, only to end up eating the same things or ordering takeout. But unlike most people, I decided to build a solution.</p>
                    
                    <h3>The Problem That Started It All</h3>
                    <p>Every day, millions of people face decision fatigue when it comes to meal planning. We have countless recipes, restaurants, and options, yet we often default to the same few choices. I realized this wasn't just about food—it was about reducing cognitive load in our daily lives.</p>
                    
                    <h3>From Idea to App Store in 6 Months</h3>
                    <p>The journey wasn't smooth, but it was educational. Here's what actually worked:</p>
                    <ul>
                        <li><strong>Start with the core problem:</strong> I focused on the spin-to-decide mechanism first, not fancy features</li>
                        <li><strong>Test with real users early:</strong> I shared prototypes with friends and family before writing a single line of code</li>
                        <li><strong>Keep it simple:</strong> The first version had just 3 screens: add meals, spin, and view history</li>
                        <li><strong>Listen to feedback:</strong> User reviews directly shaped the app's evolution</li>
                    </ul>
                    
                    <h3>What I Learned About Building a Successful App</h3>
                    <p><strong>Marketing matters more than you think.</strong> I spent 40% of my time on development and 60% on getting people to discover the app. App Store optimization, social media, and word-of-mouth were crucial.</p>
                    
                    <p><strong>User retention is harder than acquisition.</strong> Getting downloads was relatively easy. Getting people to use the app daily was the real challenge. I had to constantly iterate based on usage patterns.</p>
                    
                    <p><strong>Monetization should be secondary.</strong> I focused on building value first. The premium features came after I had a solid user base that actually wanted them.</p>
                    
                    <h3>The Numbers That Matter</h3>
                    <p>After 6 months: 10,000+ downloads, 4.8-star rating, and most importantly—users who actually use the app daily. The retention rate is what I'm most proud of.</p>
                    
                    <h3>Lessons for Aspiring Entrepreneurs</h3>
                    <p>If you're thinking about building an app or starting a business:</p>
                    <ul>
                        <li>Solve a real problem you experience personally</li>
                        <li>Start small and iterate quickly</li>
                        <li>Focus on user experience over features</li>
                        <li>Be prepared to spend more time on marketing than development</li>
                        <li>Don't quit your day job until you have traction</li>
                    </ul>
                    
                    <p>The success of MeshiSele taught me that the best business ideas often come from solving everyday problems. You don't need to reinvent the wheel—just make it spin better.</p>
                `
            },
            'ai-practical': {
                title: 'AI in 2025: Beyond the Hype, What Actually Works',
                date: 'Apr 20, 2025',
                category: 'AI & Technology',
                content: `
                    <p>After building several AI projects and working with tech systems across three major banks, I've learned to separate the hype from reality. Here's what AI actually delivers in 2025, backed by real data and industry research.</p>
                    
                    <h3>The AI Tools That Actually Work</h3>
                    <p><strong>Predictive Analytics:</strong> Focused, domain-specific predictive models deliver the highest ROI. TokyoPredict.AI, for example, achieves over 92% accuracy in forecasting Tokyo property prices by training on eight years of transaction and zoning data. The global predictive analytics market will grow from $17.07 billion in 2024 to $20.77 billion in 2025 at a 21.6% CAGR, driven by demand for actionable insights in finance, healthcare, and retail.</p>
                    
                    <p><strong>Process Automation:</strong> AI-driven automation excels at repetitive, rule-based tasks. According to Flobotics, 92% of organizations report improved compliance with RPA, and 86% experience productivity gains after deployment. Gartner predicts that by 2025, 90% of RPA vendors will integrate generative AI capabilities, enabling bots to handle more complex workflows and decision support.</p>
                    
                    <p><strong>Natural Language Processing:</strong> NLP applications in customer service and document analysis are delivering real value. Exploding Topics forecasts that chatbots will save businesses $11 billion and 2.5 billion work hours by 2025. Gartner finds 80% of companies will use or plan to adopt AI-powered chatbots for customer support by that year, reducing response times and freeing agents for high-value interactions.</p>
                    
                    <h3>What's Still Overhyped</h3>
                    <p><strong>General AI:</strong> True artificial general intelligence (AGI) remains a theoretical concept rather than a practical technology. The Financial Times reports that industry leaders can't agree on AGI definitions, timelines, or benchmarks, underscoring the absence of a clear development path. Critics warn that much of the AGI narrative serves marketing interests more than scientific advancement.</p>
                    
                    <p><strong>Creative AI:</strong> Generative models are powerful remix tools but fall short on originality and depth. Forbes notes that while AI can optimize campaigns, it lacks the human insight necessary for truly creative storytelling, resulting in surface-level outputs. Moreover, generative systems frequently hallucinate facts and misinterpret context, limiting their reliability for critical creative tasks.</p>
                    
                    <p><strong>AI as a Replacement:</strong> The idea that AI will replace human experts overlooks the synergies between humans and machines. Asynchronous Agile argues for "augmentation over automation," emphasizing that AI should enhance human capabilities rather than supplant them. Industry leaders likewise stress that human oversight is essential to catch AI errors and biases.</p>
                    
                    <h3>Practical AI Implementation Lessons</h3>
                    <p>Drawing from successful deployments like TokyoPredict.AI, effective AI implementations share these characteristics:</p>
                    <ul>
                        <li><strong>Data Quality Trumps Algorithm Complexity:</strong> Proactive data quality measures enable models to perform reliably and reduce downstream failures</li>
                        <li><strong>Start with a Specific Problem:</strong> Narrowly scoped use cases clarify objectives, simplify data needs, and foster stakeholder alignment</li>
                        <li><strong>Validate with Real-World Testing:</strong> Pilot programs and controlled rollouts ensure that strong model metrics translate into tangible business outcomes</li>
                        <li><strong>Consider the Human Factor:</strong> AI solutions shine when seamlessly embedded in workflows and designed around human decision processes</li>
                    </ul>
                    
                    <h3>AI in Finance: The Reality Check</h3>
                    <p>Banks and financial institutions adopt AI cautiously, balancing innovation with stringent controls:</p>
                    <ul>
                        <li><strong>Explainable AI for Regulatory Compliance:</strong> Models must provide transparent decision paths to satisfy auditors and regulators</li>
                        <li><strong>Legacy System Integration:</strong> Outdated core platforms demand extensive middleware and data engineering, slowing AI rollout</li>
                        <li><strong>Advanced Risk Management:</strong> Fraud detection solutions now leverage real-time analytics and machine learning to preempt threats, but 77% of finance teams still report significant gaps in readiness</li>
                        <li><strong>Human Oversight:</strong> Governance frameworks mandate that AI outputs in critical functions be reviewed by expert teams to mitigate bias and error</li>
                    </ul>
                    
                    <h3>Where AI Will Make Real Impact in 2025</h3>
                    <p><strong>Healthcare:</strong> AI enhancements in diagnostics and drug discovery are already reducing costs and improving outcomes. Medical imaging systems aid radiologists in detecting anomalies with up to 20% greater sensitivity, cutting false negatives in breast and skin cancer screening. In drug discovery, startups like SandboxAQ use AI-generated datasets to accelerate binding-affinity predictions, shortening early-stage research by as much as 30%.</p>
                    
                    <p><strong>Manufacturing:</strong> Predictive maintenance and AI-driven quality control are reshaping plant floors. The AI in manufacturing market is set to grow from $5.94 billion in 2024 to $8.57 billion in 2025, at a 44.2% CAGR. Half of manufacturers plan to deploy AI/ML for quality inspection by year-end, improving defect detection and reducing scrap rates. Unplanned downtime costs global industry $1.4 trillion annually; AI platforms from Aquant and Gecko Robotics now predict equipment failures days in advance, slashing downtime by up to 30%.</p>
                    
                    <p><strong>Finance:</strong> AI-driven fraud detection and risk assessment tools are essential safeguards. The financial fraud detection market is projected to grow from $24.31 billion in 2024 to $27.27 billion in 2025, at a 12.2% CAGR. Around 91% of U.S. banks now use AI for fraud detection, and 83% plan to add generative AI capabilities by 2025. These systems enable real-time anomaly detection, helping institutions cut losses by up to 30% while strengthening risk controls.</p>
                    
                    <p><strong>Education:</strong> AI is transforming learning through personalization and automation. The AI-powered EdTech market is on pace to hit $6 billion by 2025, driven by platforms that adapt content to individual student needs and automate administrative workflows. Seventy percent of students now leverage AI tools for study and assignments, reflecting the rise of personalized learning paths. Adaptive learning systems show positive outcomes in 86% of studies, boosting retention and performance. Meanwhile, AI assistants like Kira Learning handle grading and lesson planning, freeing educators to focus on student mentorship and engagement.</p>
                    
                    <p>The key is focusing on domains where AI can augment human expertise rather than trying to replace it entirely. The most successful implementations combine cutting-edge technology with deep domain knowledge and human oversight.</p>
                `
            },
            'fintech-reality': {
                title: 'The Real State of Fintech: What Banks Won\'t Tell You',
                date: 'Jan 18, 2025',
                category: 'Finance & Tech',
                content: `
                    <p>Having spent years at Goldman Sachs, Bank of America Merrill Lynch, and Barclays, I've seen firsthand the gulf between fintech marketing and operational reality. While the global fintech market was valued at $340.10 billion in 2024, true disruption remains elusive—most successful startups end up partnering with incumbent banks rather than replacing them.</p>
                    
                    <h3>The Fintech Revolution: Marketing vs. Reality</h3>
                    <p>Fintech firms love to talk "disruption," but the truth is more nuanced. According to an EY-Parthenon survey, 55% of banks expect fintech partnerships to play a "very important" role in their strategy by 2025—up from just 32% today—and 95% already use these alliances to bolster their digital offerings. Meanwhile, fintechs still account for only 3% of global banking and insurance revenue pools, leaving significant room for collaboration rather than outright competition.</p>
                    
                    <h3>What's Actually Changing in Banking</h3>
                    <p><strong>Customer Experience:</strong> Fintech's greatest impact has been on UX—mobile banking, instant peer-to-peer transfers, and intuitive apps are now table stakes. In a recent Financial Technology Association survey, 79% of consumers and 95% of small businesses said fintech meets their needs better than traditional banks.</p>
                    
                    <p><strong>Backend Automation:</strong> Advanced AI and RPA tools are transforming compliance and operations. Banks now leverage machine learning for fraud detection in real time—91% of U.S. banks already use AI in their fraud workflows, and 83% plan to expand those capabilities by 2025.</p>
                    
                    <p><strong>Data Analytics:</strong> Open banking is unlocking massive volumes of data—banks will process approximately 137 billion API calls in 2025 as they build personalized products and risk models—and over 76 million consumer accounts are actively sharing data via FDX-compliant open banking APIs.</p>
                    
                    <h3>The Regulatory Reality</h3>
                    <p>Banking is among the world's most regulated industries, and every innovation must clear multiple hurdles:</p>
                    <ul>
                        <li>Anti-money laundering (AML) compliance</li>
                        <li>Know Your Customer (KYC) requirements</li>
                        <li>Data protection regulations (e.g., GDPR, CCPA)</li>
                        <li>Capital adequacy standards (e.g., Basel III/IV)</li>
                        <li>Consumer protection laws</li>
                    </ul>
                    
                    <p>Meeting these obligations isn't cheap—financial institutions spent $34.7 billion on financial crime compliance technology and $155.3 billion on related operations in 2024, and UK banks alone incur an estimated £30 billion in AML costs each year. This regulatory burden explains why fintech innovation often moves more slowly than its hype suggests.</p>
                    
                    <h3>What Banks Are Actually Investing In</h3>
                    <p>Based on my experience and industry data, leading banks are prioritizing:</p>
                    <ul>
                        <li><strong>Cloud Migration:</strong> Moving core systems to cloud platforms to improve scalability and reduce hardware costs—94% of banks plan to boost investment in modern payments and cloud technology over the next two to three years</li>
                        <li><strong>API Development:</strong> Building secure, open banking APIs to integrate third-party services—total open banking API volume is set to hit 137 billion calls in 2025</li>
                        <li><strong>Cybersecurity:</strong> Defending against ever-evolving threats—global financial institutions will spend around $32 billion on cybersecurity in 2025, making it one of the largest line items on IT budgets</li>
                        <li><strong>Process Automation:</strong> Automating compliance and routine operations to cut costs and reduce error—91% of banks now use AI for fraud detection, saving billions in prevented losses</li>
                    </ul>
                    
                    <h3>The Future of Banking</h3>
                    <p><strong>Hybrid Models:</strong> The winners will blend traditional balance-sheet strength with fintech agility—"boring banking" powered by cutting-edge technology.</p>
                    
                    <p><strong>Embedded Finance:</strong> Financial services embedded in nonfinancial platforms (e-commerce, social media, etc.) will continue booming; the embedded finance market was already $104.8 billion in 2024 and is set to grow at a 23.3% CAGR through 2034, with 56% of companies now embedding financial services into their products.</p>
                    
                    <p><strong>Decentralized Finance (DeFi):</strong> While still early stage, DeFi's total value locked (TVL) reached $156 billion in Q1 2025, underscoring growing institutional and retail interest in programmable finance.</p>
                    
                    <h3>Advice for Fintech Entrepreneurs</h3>
                    <ul>
                        <li><strong>Master the Regulatory Landscape:</strong> Know AML, KYC, and data rules before you build</li>
                        <li><strong>Solve Specific Problems:</strong> Target well-defined use cases rather than chasing "platform" narratives</li>
                        <li><strong>Partner Early:</strong> Banks offer distribution, compliance support, and trust—collaboration beats isolation</li>
                        <li><strong>Embed Security & Compliance:</strong> Bake these into your product from day one to avoid costly rework</li>
                        <li><strong>Be Patient:</strong> Financial innovation moves at institution-grade speeds; plan for multi-year rollouts</li>
                    </ul>
                    
                    <p>The future of finance hinges not on fintech vs. banks, but on how these worlds intersect to deliver safer, smarter, and more seamless services for end users.</p>
                `
            }
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close modal on overlay click
        this.modal.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on close button click
        this.modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    openModal(articleId) {
        const article = this.articles[articleId];
        if (!article) return;

        // Populate modal content
        document.getElementById('modal-title').textContent = article.title;
        document.getElementById('modal-date').textContent = article.date;
        document.getElementById('modal-category').textContent = article.category;
        document.getElementById('modal-body').innerHTML = article.content;

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management
        this.modal.querySelector('.modal-close').focus();
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize modal system
const articleModal = new ArticleModal();

// Global function to open articles
function openArticle(articleId) {
    articleModal.openModal(articleId);
} 