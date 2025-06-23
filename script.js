// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        }
    });
});

// Highlight active navigation link on scroll and handle section visibility
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
        rect.bottom >= 0
    );
}

// Function to handle section visibility
function handleSectionVisibility() {
    sections.forEach((section) => {
        // Skip hero section as it's handled separately
        if (section.id === 'home') return;
        
        if (isInViewport(section)) {
            section.classList.add('visible');
            
            // Handle section-specific content
            const content = section.querySelector('.hero-content, .about-content, .contact-container');
            if (content) {
                content.classList.add('visible');
            }
            
            // Handle experience items
            const experienceItems = section.querySelectorAll('.experience-item');
            if (experienceItems.length) {
                experienceItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
            }
            
            // Handle project cards
            const projectCards = section.querySelectorAll('.project-card');
            if (projectCards.length) {
                projectCards.forEach((card) => {
                    card.classList.add('visible');
                });
            }
        }
    });
}

// Handle scroll events
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Update active navigation link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Handle section visibility
    handleSectionVisibility();

    // Navigation scroll effect
    const nav = document.querySelector('.nav-container');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenuBtn = document.querySelector('.close-menu');

if (mobileMenuBtn && mobileNav && closeMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
}

// Typed.js initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing animation
    if (document.querySelector('#typed')) {
        new Typed('#typed', {
            strings: ['Software Developer', 'Web Developer', 'Problem Solver', 'C++ Programmer', 'Full Stack Developer'],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 1000,
            loop: true,
            showCursor: false,
            cursorChar: '',
            autoInsertCss: false,
            smartBackspace: true
        });
    }

    // Make hero section visible immediately
    const heroSection = document.querySelector('#home');
    const heroContent = document.querySelector('.hero-content');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
    if (heroContent) {
        heroContent.classList.add('visible');
    }

    // Handle other sections
    handleSectionVisibility();
    animateSkills();
    
    // Observe all sections except hero
    document.querySelectorAll('section:not(#home)').forEach(section => {
        observer.observe(section);
    });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-element').forEach(element => {
        observer.observe(element);
    });
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Project filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Skills Animation
function animateSkills() {
    const skills = document.querySelectorAll('.skill');
    const circles = document.querySelectorAll('.circle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percentage = circle.getAttribute('data-percentage');
                
                const skill = circle.closest('.skill');
                skill.classList.add('animate');
                
                // Animate the circle progress
                let progress = 0;
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                
                function updateProgress(currentTime) {
                    const elapsed = currentTime - startTime;
                    progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const currentPercentage = Math.round(easeProgress * percentage);
                    
                    circle.style.background = `conic-gradient(var(--primary-color) ${currentPercentage}%, #2a2a2a ${currentPercentage}%)`;
                    
                    // Add percentage text with animation
                    const innerCircle = circle.querySelector('.inner-circle');
                    const percentageText = document.createElement('span');
                    percentageText.className = 'percentage-text';
                    percentageText.textContent = `${currentPercentage}%`;
                    
                    // Remove existing percentage text if any
                    const existingText = innerCircle.querySelector('.percentage-text');
                    if (existingText) {
                        existingText.remove();
                    }
                    
                    innerCircle.appendChild(percentageText);
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateProgress);
                    }
                }
                
                requestAnimationFrame(updateProgress);
            }
        });
    }, { threshold: 0.5 });

    circles.forEach(circle => observer.observe(circle));
}

// Visitor counter
const visitorCount = document.getElementById('visitor-count');
if (visitorCount) {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    visitorCount.textContent = count;
}

// Particles.js initialization
if (document.getElementById('particles-js')) {
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
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Category switching
const categoryBtns = document.querySelectorAll('.category-btn');
const categorySections = document.querySelectorAll('.category-section');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and sections
        categoryBtns.forEach(b => b.classList.remove('active'));
        categorySections.forEach(s => s.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Show corresponding section
        const category = btn.getAttribute('data-category');
        document.getElementById(category).classList.add('active');
    });
});

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    console.log('Contact form found, adding event listener');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Form submitted, preventing default');

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        console.log('Button state changed to loading');

        try {
            const formData = new FormData(contactForm);
            console.log('Form data created:', Array.from(formData.entries()));
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('Response received:', response.status, response.statusText);

            if (response.ok) {
                // Show success message
                console.log('Response is OK, showing success notification');
                showNotification('Message sent successfully To Youssef! Thank you for reaching out.', 'success');
                contactForm.reset();
            } else {
                // Get error details from response
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || `Server responded with status ${response.status}`;
                console.log('Response not OK, error:', errorMessage);
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Catch block - Error:', error);
            let errorMessage = 'Failed to send message. Please try again later.';
            
            // Provide more specific error messages
            if (error.message.includes('404')) {
                errorMessage = 'Form configuration error. Please contact the site administrator.';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Network error. Please check your internet connection.';
            } else if (error.message.includes('error')) {
                errorMessage = `Error: ${error.message}`;
            }
            
            console.log('Showing error notification:', errorMessage);
            showNotification(errorMessage, 'error');
        } finally {
            // Reset button state
            console.log('Resetting button state');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
} else {
    console.log('Contact form not found!');
}

// Notification system
function showNotification(message, type = 'info') {
    console.log('showNotification called with:', message, type);
    
    // Mobile-specific debugging
    const isMobile = window.innerWidth <= 768;
    console.log('Is mobile device:', isMobile);
    console.log('Viewport dimensions:', window.innerWidth, 'x', window.innerHeight);
    
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        console.log('Removing existing notification');
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add mobile-specific attributes
    if (isMobile) {
        notification.style.position = 'fixed';
        notification.style.zIndex = '999999';
        notification.style.top = '20px';
        notification.style.left = '10px';
        notification.style.right = '10px';
        notification.style.width = 'calc(100vw - 20px)';
        notification.style.transform = 'translateY(-100%)';
        notification.style.opacity = '0';
        console.log('Applied mobile-specific styles');
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    console.log('Notification element created:', notification);
    console.log('Notification computed styles before adding:', {
        position: notification.style.position,
        zIndex: notification.style.zIndex,
        top: notification.style.top
    });

    // Add to page
    document.body.appendChild(notification);
    console.log('Notification added to body');
    
    // Force a reflow to ensure styles are applied
    notification.offsetHeight;

    // Add click to close functionality with touch support
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button clicked');
        notification.remove();
    });
    
    // Add touch support for mobile
    if (isMobile) {
        closeBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button touched');
            notification.remove();
        });
        
        // Make the entire notification clickable on mobile
        notification.addEventListener('touchend', (e) => {
            if (e.target === notification || e.target.classList.contains('notification-content')) {
                e.preventDefault();
                console.log('Notification touched - closing');
                notification.remove();
            }
        });
    }

    // Auto remove after 7 seconds (longer for mobile)
    const autoRemoveTime = isMobile ? 7000 : 5000;
    setTimeout(() => {
        if (notification.parentNode) {
            console.log(`Auto-removing notification after ${autoRemoveTime/1000} seconds`);
            notification.remove();
        }
    }, autoRemoveTime);

    // Trigger animation with a slight delay for mobile
    const animationDelay = isMobile ? 200 : 100;
    setTimeout(() => {
        console.log('Adding show class to notification');
        notification.classList.add('show');
        
        // Additional mobile animation trigger
        if (isMobile) {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
            console.log('Applied mobile animation styles manually');
        }
    }, animationDelay);
    
    // Log final computed styles
    setTimeout(() => {
        const computedStyle = window.getComputedStyle(notification);
        console.log('Final notification computed styles:', {
            position: computedStyle.position,
            zIndex: computedStyle.zIndex,
            top: computedStyle.top,
            left: computedStyle.left,
            right: computedStyle.right,
            transform: computedStyle.transform,
            opacity: computedStyle.opacity,
            visibility: computedStyle.visibility
        });
    }, animationDelay + 100);
}

// Test notification function for debugging
function testNotification() {
    console.log('Testing notification system...');
    showNotification('Test notification - this should appear!', 'success');
}

// Make test function available globally for debugging
window.testNotification = testNotification;

// Check if notification styles are loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, running checks...');
    
    // Test if notification CSS exists
    const testNotification = document.createElement('div');
    testNotification.className = 'notification';
    testNotification.style.position = 'fixed';
    testNotification.style.top = '-100px';
    document.body.appendChild(testNotification);
    
    const computedStyle = window.getComputedStyle(testNotification);
    console.log('Notification CSS check - position:', computedStyle.position);
    console.log('Notification CSS check - z-index:', computedStyle.zIndex);
    
    document.body.removeChild(testNotification);
    
    // Check if contact form exists
    const form = document.getElementById('contact-form');
    console.log('Contact form exists:', !!form);
    if (form) {
        console.log('Form action:', form.action);
    }
});

// ========================================
// VISITOR TRACKING SYSTEM
// ========================================

class VisitorTracker {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.pageViews = [];
        this.events = [];
        this.isReturningVisitor = this.checkReturningVisitor();
        this.init();
    }

    // Generate unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Check if visitor is returning
    checkReturningVisitor() {
        const lastVisit = localStorage.getItem('visitor_last_visit');
        const isReturning = !!lastVisit;
        localStorage.setItem('visitor_last_visit', Date.now().toString());
        return isReturning;
    }

    // Get visitor information
    getVisitorInfo() {
        const info = {
            sessionId: this.sessionId,
            timestamp: Date.now(),
            url: window.location.href,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            isReturningVisitor: this.isReturningVisitor,
            cookiesEnabled: navigator.cookieEnabled,
            onlineStatus: navigator.onLine,
            platform: navigator.platform,
            connectionType: this.getConnectionType(),
            deviceMemory: navigator.deviceMemory || 'unknown',
            hardwareConcurrency: navigator.hardwareConcurrency || 'unknown'
        };

        // Add geolocation if available
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    info.location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    };
                    this.updateVisitorData(info);
                },
                () => {
                    info.location = 'permission_denied';
                    this.updateVisitorData(info);
                }
            );
        }

        return info;
    }

    // Get connection type
    getConnectionType() {
        if ('connection' in navigator) {
            return {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt,
                saveData: navigator.connection.saveData
            };
        }
        return 'unknown';
    }

    // Track page view
    trackPageView(pageName = null) {
        const pageView = {
            id: 'pv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            page: pageName || document.title,
            url: window.location.href,
            sessionId: this.sessionId,
            timeOnPage: 0
        };

        this.pageViews.push(pageView);
        this.saveToLocalStorage();
        this.sendToServer(pageView, 'pageview');

        // Track time on page
        this.trackTimeOnPage(pageView);

        return pageView.id;
    }

    // Track time spent on page
    trackTimeOnPage(pageView) {
        const startTime = Date.now();
        
        const updateTimeOnPage = () => {
            pageView.timeOnPage = Date.now() - startTime;
            this.saveToLocalStorage();
        };

        // Update every 5 seconds
        const interval = setInterval(updateTimeOnPage, 5000);

        // Update on page unload
        window.addEventListener('beforeunload', () => {
            clearInterval(interval);
            updateTimeOnPage();
            this.sendToServer(pageView, 'pageview_end');
        });

        // Update on visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                updateTimeOnPage();
            }
        });
    }

    // Track custom events
    trackEvent(eventName, eventData = {}) {
        const event = {
            id: 'ev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            sessionId: this.sessionId,
            eventName,
            eventData,
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        this.events.push(event);
        this.saveToLocalStorage();
        this.sendToServer(event, 'event');

        return event.id;
    }

    // Track clicks
    trackClicks() {
        document.addEventListener('click', (e) => {
            const element = e.target;
            const tagName = element.tagName.toLowerCase();
            
            let eventData = {
                element: tagName,
                text: element.textContent?.substring(0, 100) || '',
                className: element.className || '',
                id: element.id || '',
                position: { x: e.clientX, y: e.clientY }
            };

            // Special tracking for links
            if (tagName === 'a') {
                eventData.href = element.href;
                eventData.type = 'link';
            }

            // Special tracking for buttons
            if (tagName === 'button' || element.type === 'button') {
                eventData.type = 'button';
            }

            this.trackEvent('click', eventData);
        });
    }

    // Track scrolling behavior
    trackScrolling() {
        let maxScroll = 0;
        let scrollEvents = [];

        const trackScroll = () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            // Track scroll milestones (25%, 50%, 75%, 100%)
            const milestones = [25, 50, 75, 100];
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !scrollEvents.includes(milestone)) {
                    scrollEvents.push(milestone);
                    this.trackEvent('scroll_milestone', {
                        milestone: milestone,
                        timestamp: Date.now()
                    });
                }
            });
        };

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(trackScroll, 100);
        });

        // Track final scroll position on page unload
        window.addEventListener('beforeunload', () => {
            this.trackEvent('scroll_final', {
                maxScrollPercent: maxScroll,
                finalScrollPercent: Math.round(
                    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
                )
            });
        });
    }

    // Track form interactions
    trackFormInteractions() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                this.trackEvent('form_submit', {
                    formId: form.id || 'unnamed',
                    action: form.action || 'none',
                    method: form.method || 'get'
                });
            });
        });

        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => {
                this.trackEvent('form_field_focus', {
                    fieldType: input.type || input.tagName.toLowerCase(),
                    fieldName: input.name || input.id || 'unnamed'
                });
            });
        });
    }

    // Save data to localStorage
    saveToLocalStorage() {
        const data = {
            sessionId: this.sessionId,
            startTime: this.startTime,
            pageViews: this.pageViews,
            events: this.events,
            visitorInfo: this.getVisitorInfo(),
            lastUpdated: Date.now()
        };

        try {
            localStorage.setItem('visitor_data', JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save visitor data to localStorage:', e);
        }
    }

    // Load data from localStorage
    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('visitor_data');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Could not load visitor data from localStorage:', e);
            return null;
        }
    }

    // Update visitor data
    updateVisitorData(newData) {
        const existingData = this.loadFromLocalStorage();
        if (existingData) {
            existingData.visitorInfo = { ...existingData.visitorInfo, ...newData };
            localStorage.setItem('visitor_data', JSON.stringify(existingData));
        }
    }

    // Send data to server (replace with your backend endpoint)
    async sendToServer(data, type) {
        // Option 1: Send to your own backend server
        // Uncomment this section if you're running the Node.js backend
        /*
        try {
            await fetch('http://localhost:3000/api/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, data })
            });
        } catch (error) {
            console.warn('Failed to send tracking data to backend:', error);
        }
        */

        // Option 2: Send to a serverless function (Netlify, Vercel, etc.)
        // Uncomment this section if you're using Netlify Functions
        /*
        try {
            await fetch('/.netlify/functions/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, data })
            });
        } catch (error) {
            console.warn('Failed to send tracking data to serverless function:', error);
        }
        */

        // Option 3: Send to a third-party service (Google Analytics, etc.)
        // Uncomment if you have Google Analytics setup
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', type, {
                custom_parameter_1: data.sessionId,
                custom_parameter_2: data.url || data.page,
                // Add more custom parameters as needed
            });
        }
        */

        // Only log to console in development mode or for admin
        const isAdmin = this.checkAdminMode();
        if (isAdmin || localStorage.getItem('visitor_tracking_debug') === 'true') {
            console.log('Tracking data:', { type, data });
        }
        
        // Store locally as backup
        this.saveToLocalStorage();
    }

    // Get all visitor data
    getAllData() {
        return this.loadFromLocalStorage();
    }

    // Clear all tracking data
    clearData() {
        localStorage.removeItem('visitor_data');
        localStorage.removeItem('visitor_last_visit');
        this.pageViews = [];
        this.events = [];
    }

    // Export data as JSON
    exportData() {
        const data = this.getAllData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `visitor-data-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Get visitor statistics
    getStats() {
        const data = this.loadFromLocalStorage();
        if (!data) return null;

        const totalTimeSpent = data.pageViews.reduce((total, pv) => total + (pv.timeOnPage || 0), 0);
        const clickEvents = data.events.filter(e => e.eventName === 'click');
        const scrollEvents = data.events.filter(e => e.eventName.includes('scroll'));

        return {
            sessionId: data.sessionId,
            totalPageViews: data.pageViews.length,
            totalEvents: data.events.length,
            totalTimeSpent: Math.round(totalTimeSpent / 1000), // in seconds
            totalClicks: clickEvents.length,
            totalScrollEvents: scrollEvents.length,
            averageTimePerPage: data.pageViews.length > 0 ? Math.round(totalTimeSpent / data.pageViews.length / 1000) : 0,
            isReturningVisitor: data.visitorInfo?.isReturningVisitor || false,
            startTime: new Date(data.startTime).toISOString(),
            lastUpdated: new Date(data.lastUpdated).toISOString()
        };
    }

    // Initialize tracking
    init() {
        // Track initial page view
        this.trackPageView();

        // Track various interactions
        this.trackClicks();
        this.trackScrolling();
        this.trackFormInteractions();

        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.trackEvent('visibility_change', {
                hidden: document.hidden,
                visibilityState: document.visibilityState
            });
        });

        // Track window resize
        window.addEventListener('resize', () => {
            this.trackEvent('window_resize', {
                newSize: `${window.innerWidth}x${window.innerHeight}`
            });
        });

        // Track hash changes (for single-page apps)
        window.addEventListener('hashchange', () => {
            this.trackEvent('hash_change', {
                newHash: window.location.hash,
                newUrl: window.location.href
            });
        });

        // Only log initialization for admin or debug mode
        const isAdmin = this.checkAdminMode();
        if (isAdmin || localStorage.getItem('visitor_tracking_debug') === 'true') {
            console.log('Visitor tracking initialized for session:', this.sessionId);
        }
    }

    // Check if current user is admin (website owner)
    checkAdminMode() {
        // Check for authenticated admin session
        const adminSession = localStorage.getItem('admin_session');
        const sessionData = adminSession ? JSON.parse(adminSession) : null;
        
        // Check if session is valid (not expired)
        if (sessionData && sessionData.expires > Date.now()) {
            return true;
        }
        
        // Clear expired session
        if (sessionData) {
            localStorage.removeItem('admin_session');
        }
        
        // Setup admin access trigger
        this.setupAdminAccess();
        
        return false;
    }

    // Setup admin access trigger (invisible to regular users)
    setupAdminAccess() {
        if (!this.adminAccessSetup) {
            // Method 1: Secret key combination (Ctrl+Shift+Alt+A)
            let keys = {};
            document.addEventListener('keydown', (e) => {
                keys[e.key] = true;
                // Secret combo: Ctrl + Shift + Alt + A
                if (keys['Control'] && keys['Shift'] && keys['Alt'] && keys['A']) {
                    e.preventDefault();
                    this.showAdminLogin();
                }
            });
            document.addEventListener('keyup', (e) => {
                delete keys[e.key];
            });

            // Method 2: Hidden URL trigger
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('dashboard') === 'admin') {
                this.showAdminLogin();
                // Clean URL to hide admin trigger
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            this.adminAccessSetup = true;
        }
    }

    // Show admin login modal
    showAdminLogin() {
        // Prevent multiple login modals
        if (document.getElementById('admin-login-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'admin-login-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            font-family: 'Courier New', monospace;
        `;

        modal.innerHTML = `
            <div style="
                background: #1a1a1a;
                padding: 30px;
                border-radius: 10px;
                border: 2px solid #f05a28;
                color: white;
                text-align: center;
                min-width: 350px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            ">
                <h2 style="margin: 0 0 20px 0; color: #f05a28;">🔐 Admin Access</h2>
                <div style="margin-bottom: 15px;">
                    <input type="text" id="admin-username" placeholder="Username" style="
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 10px;
                        border: 1px solid #333;
                        border-radius: 5px;
                        background: #2a2a2a;
                        color: white;
                        font-family: inherit;
                    ">
                </div>
                <div style="margin-bottom: 20px;">
                    <input type="password" id="admin-password" placeholder="Password" style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #333;
                        border-radius: 5px;
                        background: #2a2a2a;
                        color: white;
                        font-family: inherit;
                    ">
                </div>
                <div style="margin-bottom: 15px;">
                    <button onclick="window.visitorTracker.attemptAdminLogin()" style="
                        background: #f05a28;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-right: 10px;
                        font-family: inherit;
                    ">Login</button>
                    <button onclick="window.visitorTracker.closeAdminLogin()" style="
                        background: #666;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-family: inherit;
                    ">Cancel</button>
                </div>
                <div id="login-error" style="color: #ff4444; font-size: 12px; margin-top: 10px;"></div>
                <div style="font-size: 10px; color: #888; margin-top: 15px;">
                    Unauthorized access is prohibited
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Focus on username field
        setTimeout(() => {
            document.getElementById('admin-username').focus();
        }, 100);

        // Allow Enter key to submit
        modal.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.attemptAdminLogin();
            }
        });
    }

    // Attempt admin login
    attemptAdminLogin() {
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        const errorDiv = document.getElementById('login-error');

        // Admin credentials (you can change these)
        const validCredentials = {
            username: 'youssef',    // Change this to your preferred username
            password: 'admin2024'   // Change this to your preferred password
        };

                 // Validate credentials
         if (username === validCredentials.username && password === validCredentials.password) {
             // Create admin session (expires in 24 hours)
             const sessionData = {
                 username: username,
                 loginTime: Date.now(),
                 expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
             };
             
             localStorage.setItem('admin_session', JSON.stringify(sessionData));
             
             // Close login modal
             this.closeAdminLogin();
             
             // Redirect to admin dashboard page
             this.createAdminDashboardPage();
        } else {
            // Show error
            errorDiv.textContent = '❌ Invalid username or password';
            
            // Clear password field
            document.getElementById('admin-password').value = '';
            document.getElementById('admin-password').focus();
            
            // Clear error after 3 seconds
            setTimeout(() => {
                errorDiv.textContent = '';
            }, 3000);
        }
    }

    // Close admin login modal
    closeAdminLogin() {
        const modal = document.getElementById('admin-login-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Check if admin is logged in
    isAdminLoggedIn() {
        return this.checkAdminMode();
    }

    // Create full admin dashboard page
    createAdminDashboardPage() {
        // Store current page state
        const originalContent = document.body.innerHTML;
        const originalTitle = document.title;
        
        // Get current statistics
        const stats = this.getStats();
        const allData = this.getAllData();
        const sessionData = JSON.parse(localStorage.getItem('admin_session') || '{}');
        
        // Create full dashboard page
        document.body.innerHTML = `
            <div style="
                font-family: 'Courier New', monospace;
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: white;
                min-height: 100vh;
                padding: 20px;
                margin: 0;
            ">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <!-- Header -->
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 30px;
                        padding: 20px;
                        background: #333;
                        border-radius: 10px;
                        border: 2px solid #f05a28;
                    ">
                        <div>
                            <h1 style="margin: 0; color: #f05a28;">🔐 Admin Dashboard</h1>
                            <p style="margin: 5px 0 0 0; color: #888;">Welcome back, ${sessionData.username || 'Admin'}</p>
                        </div>
                        <div>
                            <button onclick="window.visitorTracker.returnToWebsite()" style="
                                background: #666;
                                color: white;
                                border: none;
                                padding: 10px 15px;
                                border-radius: 5px;
                                cursor: pointer;
                                margin-right: 10px;
                            ">← Back to Website</button>
                            <button onclick="window.visitorTracker.adminLogout()" style="
                                background: #dc3545;
                                color: white;
                                border: none;
                                padding: 10px 15px;
                                border-radius: 5px;
                                cursor: pointer;
                            ">Logout</button>
                        </div>
                    </div>

                    <!-- Stats Overview -->
                    <div style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 20px;
                        margin-bottom: 30px;
                    ">
                        <div style="background: #333; padding: 20px; border-radius: 10px; text-align: center;">
                            <h3 style="margin: 0 0 10px 0; color: #f05a28;">📊 Page Views</h3>
                            <div style="font-size: 2em; font-weight: bold;">${stats.totalPageViews}</div>
                        </div>
                        <div style="background: #333; padding: 20px; border-radius: 10px; text-align: center;">
                            <h3 style="margin: 0 0 10px 0; color: #f05a28;">👆 Total Clicks</h3>
                            <div style="font-size: 2em; font-weight: bold;">${stats.totalClicks}</div>
                        </div>
                        <div style="background: #333; padding: 20px; border-radius: 10px; text-align: center;">
                            <h3 style="margin: 0 0 10px 0; color: #f05a28;">⏱️ Time Spent</h3>
                            <div style="font-size: 2em; font-weight: bold;">${Math.round(stats.totalTimeSpent / 60)}m</div>
                        </div>
                        <div style="background: #333; padding: 20px; border-radius: 10px; text-align: center;">
                            <h3 style="margin: 0 0 10px 0; color: #f05a28;">🔄 Events</h3>
                            <div style="font-size: 2em; font-weight: bold;">${stats.totalEvents}</div>
                        </div>
                    </div>

                    <!-- Session Information -->
                    <div style="
                        background: #333;
                        padding: 20px;
                        border-radius: 10px;
                        margin-bottom: 30px;
                    ">
                        <h2 style="margin: 0 0 15px 0; color: #f05a28;">📈 Current Session</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                            <div>
                                <strong>Session ID:</strong> ${stats.sessionId}<br>
                                <strong>Started:</strong> ${new Date(stats.startTime).toLocaleString()}<br>
                                <strong>Returning Visitor:</strong> ${stats.isReturningVisitor ? 'Yes' : 'No'}<br>
                                <strong>Browser:</strong> ${navigator.userAgent.split(' ')[0]}
                            </div>
                            <div>
                                <strong>Language:</strong> ${navigator.language}<br>
                                <strong>Screen Resolution:</strong> ${screen.width}x${screen.height}<br>
                                <strong>Viewport:</strong> ${window.innerWidth}x${window.innerHeight}<br>
                                <strong>Platform:</strong> ${navigator.platform}
                            </div>
                        </div>
                    </div>

                    <!-- Visitor Data -->
                    <div style="
                        background: #333;
                        padding: 20px;
                        border-radius: 10px;
                        margin-bottom: 30px;
                    ">
                        <h2 style="margin: 0 0 15px 0; color: #f05a28;">👥 Visitor Data</h2>
                        <div style="max-height: 300px; overflow-y: auto; background: #2a2a2a; padding: 15px; border-radius: 5px;">
                            <pre style="margin: 0; font-size: 12px; line-height: 1.4;">${JSON.stringify(allData, null, 2)}</pre>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div style="
                        background: #333;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <h2 style="margin: 0 0 15px 0; color: #f05a28;">⚡ Actions</h2>
                        <button onclick="window.visitorTracker.exportData()" style="
                            background: #f05a28;
                            color: white;
                            border: none;
                            padding: 12px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            margin: 5px;
                            font-size: 14px;
                        ">📥 Export Data</button>
                        <button onclick="window.visitorTracker.clearData(); location.reload()" style="
                            background: #dc3545;
                            color: white;
                            border: none;
                            padding: 12px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            margin: 5px;
                            font-size: 14px;
                        ">🗑️ Clear Data</button>
                        <button onclick="window.visitorTracker.refreshDashboard()" style="
                            background: #28a745;
                            color: white;
                            border: none;
                            padding: 12px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            margin: 5px;
                            font-size: 14px;
                        ">🔄 Refresh</button>
                    </div>

                    <!-- Footer -->
                    <div style="
                        text-align: center;
                        margin-top: 30px;
                        padding: 20px;
                        color: #888;
                        font-size: 12px;
                    ">
                        <p>Admin session expires: ${new Date(sessionData.expires).toLocaleString()}</p>
                        <p>Logged in: ${new Date(sessionData.loginTime).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Update page title
        document.title = '🔐 Admin Dashboard - Visitor Tracking';
        
        // Store original content for restoration
        window.originalPageContent = originalContent;
        window.originalPageTitle = originalTitle;
        
        console.log('🔐 Admin dashboard page loaded successfully');
    }

    // Return to original website
    returnToWebsite() {
        if (window.originalPageContent) {
            document.body.innerHTML = window.originalPageContent;
            document.title = window.originalPageTitle;
            console.log('🔙 Returned to website');
        } else {
            window.location.reload();
        }
    }

    // Refresh dashboard
    refreshDashboard() {
        this.createAdminDashboardPage();
    }

    // Admin logout
    adminLogout() {
        localStorage.removeItem('admin_session');
        
        // Return to website
        if (window.originalPageContent) {
            document.body.innerHTML = window.originalPageContent;
            document.title = window.originalPageTitle;
        }
        
        alert('🔓 Admin session ended. You have been logged out.');
        
        // Refresh page to reset state
        setTimeout(() => window.location.reload(), 1000);
    }
}

// Initialize visitor tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if tracking is enabled (you can add privacy controls here)
    const trackingEnabled = localStorage.getItem('tracking_consent') !== 'false';
    
    if (trackingEnabled) {
        window.visitorTracker = new VisitorTracker();
        
        // Make tracking functions globally available (admin only)
        window.trackEvent = (name, data) => {
            if (window.visitorTracker && window.visitorTracker.isAdminLoggedIn()) {
                return window.visitorTracker.trackEvent(name, data);
            }
            return null;
        };
        window.getVisitorStats = () => {
            if (window.visitorTracker && window.visitorTracker.isAdminLoggedIn()) {
                return window.visitorTracker.getStats();
            }
            return null;
        };
        window.exportVisitorData = () => {
            if (window.visitorTracker && window.visitorTracker.isAdminLoggedIn()) {
                return window.visitorTracker.exportData();
            }
        };
        window.clearVisitorData = () => {
            if (window.visitorTracker && window.visitorTracker.isAdminLoggedIn()) {
                return window.visitorTracker.clearData();
            }
        };
        
        // Admin-only functions
        window.adminLogin = () => {
            if (window.visitorTracker) {
                window.visitorTracker.showAdminLogin();
            }
        };
        window.adminLogout = () => {
            if (window.visitorTracker) {
                window.visitorTracker.adminLogout();
            }
        };
        
        // Add privacy controls
        window.enableTracking = () => {
            localStorage.setItem('tracking_consent', 'true');
            if (!window.visitorTracker) {
                window.visitorTracker = new VisitorTracker();
            }
        };
        
        window.disableTracking = () => {
            localStorage.setItem('tracking_consent', 'false');
            if (window.visitorTracker) {
                window.visitorTracker.clearData();
                window.visitorTracker = null;
            }
        };
        
        // Display tracking info in console (admin only)
        setTimeout(() => {
            const isAdmin = window.visitorTracker.checkAdminMode();
            if (isAdmin || localStorage.getItem('visitor_tracking_debug') === 'true') {
                console.log('=== VISITOR TRACKING ACTIVE ===');
                console.log('Current session stats:', window.getVisitorStats());
                console.log('Use window.getVisitorStats() to see current stats');
                console.log('Use window.exportVisitorData() to download data');
                console.log('Use window.disableTracking() to disable tracking');
                console.log('Admin mode: Dashboard will be available');
            }
        }, 2000);
    }
});

// ========================================
// VISITOR TRACKING DASHBOARD (Optional)
// ========================================

// Create a simple dashboard to view tracking data
function createTrackingDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'tracking-dashboard';
    dashboard.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 300px;
        max-height: 400px;
        overflow-y: auto;
        background: #1a1a1a;
        color: #fff;
        padding: 15px;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        border: 1px solid #333;
        display: none;
    `;

    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = '📊';
    toggleBtn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;
        background: #f05a28;
        color: white;
        font-size: 18px;
        cursor: pointer;
        z-index: 10001;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;

    toggleBtn.addEventListener('click', () => {
        dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
        if (dashboard.style.display === 'block') {
            updateDashboard();
        }
    });

    function updateDashboard() {
        if (!window.visitorTracker) return;
        
        const stats = window.getVisitorStats();
        const data = window.visitorTracker.getAllData();
        
        const sessionData = JSON.parse(localStorage.getItem('admin_session') || '{}');
        const loginTime = sessionData.loginTime ? new Date(sessionData.loginTime).toLocaleString() : 'Unknown';
        
        dashboard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h3 style="margin: 0; color: #f05a28;">🔐 Admin Dashboard</h3>
                <button onclick="window.visitorTracker.adminLogout()" style="padding: 3px 8px; background: #666; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">Logout</button>
            </div>
            <div style="font-size: 10px; color: #888; margin-bottom: 10px;">Logged in: ${loginTime}</div>
            <hr style="margin: 10px 0; border: 1px solid #333;">
            <div><strong>Current Session:</strong> ${stats.sessionId.substring(0, 15)}...</div>
            <div><strong>Page Views:</strong> ${stats.totalPageViews}</div>
            <div><strong>Total Events:</strong> ${stats.totalEvents}</div>
            <div><strong>Time Spent:</strong> ${stats.totalTimeSpent}s</div>
            <div><strong>Clicks:</strong> ${stats.totalClicks}</div>
            <div><strong>Scroll Events:</strong> ${stats.totalScrollEvents}</div>
            <div><strong>Returning Visitor:</strong> ${stats.isReturningVisitor ? 'Yes' : 'No'}</div>
            <div style="font-size: 10px; margin-top: 10px;">
                <strong>Browser:</strong> ${navigator.userAgent.split(' ')[0]}<br>
                <strong>Language:</strong> ${navigator.language}<br>
                <strong>Screen:</strong> ${screen.width}x${screen.height}
            </div>
            <hr style="margin: 10px 0; border: 1px solid #333;">
            <div style="text-align: center;">
                <button onclick="window.exportVisitorData()" style="padding: 5px 8px; margin: 1px; background: #f05a28; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">Export Data</button>
                <button onclick="window.clearVisitorData(); updateDashboard()" style="padding: 5px 8px; margin: 1px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">Clear Data</button>
                <button onclick="console.log(window.visitorTracker.getAllData())" style="padding: 5px 8px; margin: 1px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px;">Console Log</button>
            </div>
        `;
    }

    document.body.appendChild(toggleBtn);
    document.body.appendChild(dashboard);
}

// Initialize dashboard after a delay (admin only)
setTimeout(() => {
    if (window.visitorTracker && window.visitorTracker.checkAdminMode()) {
        createTrackingDashboard();
        console.log('📊 Admin dashboard loaded - click the button in top-right corner');
    }
}, 3000); 