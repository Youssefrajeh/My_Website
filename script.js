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

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        }
    });
} else {
    console.log('Theme toggle element not found - skipping theme functionality');
}

// Chatbot Functionality
console.log('Chatbot script starting...');

const chatButton = document.getElementById('chatButton');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');

console.log('Chatbot elements:', {
    chatButton: chatButton,
    chatContainer: chatContainer,
    closeChat: closeChat,
    chatMessages: chatMessages,
    userInput: userInput,
    sendMessage: sendMessage
});

if (!chatButton) {
    console.error('chatButton element not found!');
} else {
    console.log('chatButton found successfully');
}

// Toggle chat window
if (chatButton) {
    chatButton.addEventListener('click', () => {
        console.log('Chat button clicked!');
        if (chatContainer) {
            chatContainer.classList.add('active');
            chatButton.style.display = 'none';
        } else {
            console.error('chatContainer not found when trying to open');
        }
    });
}

if (closeChat) {
    closeChat.addEventListener('click', () => {
        console.log('Close chat clicked!');
        if (chatContainer) {
            chatContainer.classList.remove('active');
            chatButton.style.display = 'flex';
        }
    });
}

// Send message function
async function sendUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot', 'typing');
        typingDiv.textContent = '...';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Call our local backend API
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message
                })
            });

            if (response.ok) {
                const data = await response.json();
                chatMessages.removeChild(typingDiv);
                
                // Add source indicator to the response
                let responseText = data.response;
                if (data.source === 'openai') {
                    responseText += ' ✨'; // OpenAI indicator
                } else if (data.source === 'huggingface') {
                    responseText += ' 🤗'; // Hugging Face indicator
                } else {
                    responseText += ' 🧠'; // Fallback indicator
                }
                
                addMessage(responseText, 'bot');
            } else {
                throw new Error('Backend API failed');
            }
        } catch (error) {
            console.log('Backend API failed, using local fallback:', error);
            chatMessages.removeChild(typingDiv);
            
            // Local fallback if backend is not available
            const smartResponse = getSmartResponse(message);
            addMessage(smartResponse + ' 🔧', 'bot'); // Local fallback indicator
        }
    }
}

// Enhanced smart response function
function getSmartResponse(message) {
    const msg = message.toLowerCase();
    
    // Jokes
    if (msg.includes('joke') || msg.includes('funny') || msg.includes('laugh')) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they don't C#! 👓",
            "What's a programmer's favorite hangout place? Foo Bar! 🍺",
            "Why did the programmer quit his job? He didn't get arrays! 📊"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Personal questions about the AI
    if (msg.includes('how old') || msg.includes('your age') || msg.includes('age are you')) {
        return "I'm a digital AI assistant, so I don't have an age in the traditional sense! I was created to help visitors learn about Youssef's portfolio. How can I assist you today? 🤖";
    }
    
    if (msg.includes('where are you') || msg.includes('your location') || msg.includes('located')) {
        return "I exist in the digital realm! I'm hosted on this portfolio website to help visitors learn about Youssef Rajeh's skills and projects. He's located in London, Ontario, Canada. 🌐";
    }
    
    if (msg.includes('what is my name') || msg.includes('my name') || msg.includes('who am i')) {
        return "I don't know your name, but I'd love to help you learn about Youssef Rajeh's portfolio! Feel free to ask me about his programming skills, projects, or experience. 😊";
    }
    
    if (msg.includes('your name') || msg.includes('who are you') || msg.includes('what are you')) {
        return "I'm Youssef's AI assistant! I'm here to help visitors learn about his skills, projects, and experience. Think of me as his digital portfolio guide! 🤖";
    }
    
    // How are you / feelings
    if (msg.includes('how are you') || msg.includes('how do you feel') || msg.includes('how you doing')) {
        return "I'm doing great, thank you for asking! I'm excited to help you explore Youssef's portfolio. What would you like to know about his software development journey? 😊";
    }
    
    // Name questions
    if (msg.includes('his name') || msg.includes('owner') || msg.includes('developer')) {
        return "This is Youssef Rajeh's portfolio! He's a talented software developer currently studying Computer Programming at Fanshawe College with a 3.9 GPA. 👨‍💻";
    }
    
    // General knowledge responses
    if (msg.includes('what is') || msg.includes('define') || msg.includes('explain')) {
        const topics = {
            'programming': 'Programming is the process of creating instructions for computers using programming languages like JavaScript, Python, C++, etc. It\'s like teaching a computer how to solve problems step by step! 💻',
            'javascript': 'JavaScript is a versatile programming language primarily used for web development, both frontend and backend. It makes websites interactive and dynamic! ⚡',
            'ai': 'Artificial Intelligence (AI) refers to computer systems that can perform tasks typically requiring human intelligence, like understanding language, recognizing images, or making decisions. 🧠',
            'machine learning': 'Machine Learning is a subset of AI that enables systems to learn and improve from data without explicit programming. It\'s like teaching computers to learn patterns! 📈',
            'web development': 'Web development involves creating websites and web applications using technologies like HTML, CSS, and JavaScript. It\'s about building the digital experiences we use every day! 🌐',
            'html': 'HTML (HyperText Markup Language) is the foundation of web pages. It provides structure and content, like the skeleton of a website! 🏗️',
            'css': 'CSS (Cascading Style Sheets) makes websites look beautiful! It handles colors, layouts, fonts, and animations. 🎨',
            'sql': 'SQL (Structured Query Language) is used to communicate with databases. It helps store, retrieve, and manage data efficiently! 🗄️'
        };
        
        for (let topic in topics) {
            if (msg.includes(topic)) {
                return topics[topic];
            }
        }
    }
    
    // Math calculations
    if (msg.includes('+') || msg.includes('-') || msg.includes('*') || msg.includes('/') || msg.includes('calculate')) {
        try {
            const mathExpression = msg.match(/[\d+\-*/\.\s()]+/);
            if (mathExpression) {
                const result = eval(mathExpression[0].replace(/[^0-9+\-*/.() ]/g, ''));
                return `The answer is: ${result} 🧮`;
            }
        } catch (e) {
            return "I can help with basic math calculations. Try asking something like '5 + 3' or 'calculate 10 * 2'. 📊";
        }
    }
    
    // Time and date
    if (msg.includes('time') || msg.includes('date') || msg.includes('today')) {
        return "I don't have access to real-time data, but I can help you with information about Youssef's portfolio, programming questions, math calculations, and much more! ⏰";
    }
    
    // Weather (mock response)
    if (msg.includes('weather')) {
        return "I can't check the weather, but I can tell you about Youssef's skills in any programming language! What would you like to know? ☀️";
    }
    
    // Portfolio-specific responses
    if (msg.includes('skill') || msg.includes('programming') || msg.includes('language')) {
        return "Youssef has expertise in C++ (90%), Java (80%), JavaScript (80%), HTML (85%), CSS (85%), SQL (75%), C# (70%), and Kotlin (75%). He's also skilled in Cisco Networking (85%). His strongest area is C++ programming! 💪";
    }
    
    if (msg.includes('experience') || msg.includes('work') || msg.includes('job')) {
        return "Youssef has 15+ years of professional experience spanning chemistry, quality control, and production management across Syria and Cameroon. He's currently pursuing Computer Programming at Fanshawe College with a 3.9 GPA and seeking software development opportunities! 🌟";
    }
    
    if (msg.includes('project') || msg.includes('github') || msg.includes('code')) {
        return "Youssef has developed several impressive C++ projects including an Emergency Room Triage system using priority queues, a Breast Cancer Decision Tree for medical AI, and various data analysis tools. Check out his GitHub for more details! 🚀";
    }
    
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('hire')) {
        return "You can reach Youssef at youssefrrajeh@gmail.com or +1 (548) 388-4360. He's located in London, Ontario, Canada and is actively seeking software development opportunities! 📧📞";
    }
    
    if (msg.includes('education') || msg.includes('school') || msg.includes('college') || msg.includes('fanshawe')) {
        return "Youssef is currently pursuing an Advanced Diploma in Computer Programming and Analysis at Fanshawe College with an outstanding 3.9 GPA. He has a background in Applied Chemistry! 🎓";
    }
    
    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hello! I'm an AI assistant that can help answer questions about programming, technology, math, and more. I can also tell you about Youssef's portfolio and experience. What would you like to know? 👋";
    }
    
    // Help
    if (msg.includes('help') || msg.includes('what can you do')) {
        return "I can help with: Programming questions, basic math calculations, general knowledge, information about this portfolio, tell jokes, and much more! Try asking me anything - from 'What is JavaScript?' to 'Tell me about Youssef's skills'! 🎯";
    }
    
    // Thank you
    if (msg.includes('thank') || msg.includes('thanks')) {
        return "You're very welcome! I'm happy to help. Feel free to ask me anything else! 😊";
    }
    
    // Default responses with variety
    const defaultResponses = [
        "That's an interesting question! I can help with programming topics, math, general knowledge, jokes, and information about Youssef's portfolio. What would you like to explore? 🤔",
        "I'm here to help! I can answer questions about software development, technology, basic calculations, tell jokes, and share details about this portfolio. What catches your interest? 💡",
        "Great question! I'm best at discussing programming, technology, math problems, general knowledge, and portfolio information. I can even tell jokes! What would you like to know? 🎈",
        "I'd love to help with that! Try asking me about programming languages, math calculations, technology topics, Youssef's experience, or ask me to tell you a joke! 🌟"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle send button click
sendMessage.addEventListener('click', sendUserMessage);

// Handle enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
}); 