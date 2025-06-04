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

// Add EmailJS script
const emailScript = document.createElement('script');
emailScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
document.head.appendChild(emailScript);

// Initialize EmailJS after script loads
emailScript.onload = () => {
    emailjs.init("uJJqCmxLEd_7M7HNC");
    console.log("EmailJS initialized successfully");
};

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

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email using EmailJS
        emailjs.send("service_8wwfyyj", "template_5juazgn", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
        })
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            // Show success message
            alert('Message sent successfully!');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error("FAILED...", error);
            // Show error message with more details
            alert('Failed to send message: ' + error.text);
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
body.classList.add(savedTheme + '-mode');

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}); 