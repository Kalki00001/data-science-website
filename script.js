// ============================
// MAIN SCRIPT
// ============================

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      // Toggles the 'active' class on the nav menu to show/hide it
      navMenu.classList.toggle('active');

      // Toggles the 'active' class on the hamburger for the animation
      hamburger.classList.toggle('active');
    });
  }
});

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos =
        window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // initial call

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================
    // HEADER BACKGROUND CHANGE
    // ============================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(139, 69, 19, 0.98)';
            } else {
                header.style.background = 'rgba(139, 69, 19, 0.95)';
            }
        });
    }

    // ============================
    // CONTACT FORM HANDLER
    // ============================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm(this)) {
                const formData = new FormData(this);
                const name = formData.get('name');

                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert(`Thank you ${name}! Your message has been sent successfully. We will get back to you within 24 hours.`);
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // Form validation helper
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            const value = input.value.trim();
            const type = input.type;

            input.classList.remove('error');

            if (!value) {
                input.classList.add('error');
                isValid = false;
            } else if (type === 'email' && !isValidEmail(value)) {
                input.classList.add('error');
                isValid = false;
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================
    // CHATBOT
    // ============================
    class Chatbot {
        constructor() {
            this.chatbotFloat = document.getElementById('chatbot-float');
            this.chatbotContainer = document.getElementById('chatbot');
            this.chatbotToggle = document.getElementById('chatbot-toggle');
            this.chatbotMessages = document.getElementById('chatbot-messages');
            this.chatbotInput = document.getElementById('chatbot-input');
            this.chatbotSend = document.getElementById('chatbot-send');

            this.isOpen = false;
            this.responses = this.initializeResponses();

            this.init();
        }

        init() {
            if (this.chatbotFloat) {
                this.chatbotFloat.addEventListener('click', () => this.openChatbot());
            }

            if (this.chatbotToggle) {
                this.chatbotToggle.addEventListener('click', () => this.closeChatbot());
            }

            if (this.chatbotSend) {
                this.chatbotSend.addEventListener('click', () => this.sendMessage());
            }

            if (this.chatbotInput) {
                this.chatbotInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.sendMessage();
                });
            }

            this.handleQuickReplies();
        }

        initializeResponses() {
            return {
                programs: {
                    text: "We offer several programs in Data Science:",
                    options: [
                        "• B.Tech Data Science (4 years)",
                        "• M.Tech Data Science (2 years)",
                        "• Certificate Courses (3-6 months)",
                        "",
                        "Would you like details about any specific program?"
                    ]
                },
                admissions: {
                    text: "Admission Information:",
                    options: [
                        "• B.Tech: 12th with PCM (60%), KCET/COMEDK",
                        "• M.Tech: B.Tech/B.E (60%), GATE/University Test",
                        "• Applications are open now!",
                        "",
                        "Contact Dr. Amit Singh (admissions.datascience@gmu.ac.in) for more details."
                    ]
                },
                faculty: {
                    text: "Our Distinguished Faculty:",
                    options: [
                        "• Dr. Priya Sharma - Head of Department",
                        "• Prof. Rajesh Kumar - Statistics & Analytics",
                        "• Dr. Anita Verma - Big Data & Cloud Computing",
                        "• Dr. Amit Singh - Computer Vision & AI",
                        "",
                        "All faculty members have 8-15 years of industry experience!"
                    ]
                },
                contact: {
                    text: "Contact Information:",
                    options: [
                        "📍 GM University, Davangere, Karnataka",
                        "📞 +91-8192-123456",
                        "📧 datascience@gmu.ac.in",
                        "",
                        "Visit us or call for more information!"
                    ]
                },
                placement: {
                    text: "Our Placement Record:",
                    options: [
                        "• 92% Placement Rate",
                        "• Highest Package: ₹12 LPA",
                        "• Average Package: ₹6.5 LPA",
                        "• 50+ Recruiting Companies",
                        "",
                        "Top recruiters: Microsoft, Google, Amazon, IBM, TCS"
                    ]
                },
                research: {
                    text: "Research Areas:",
                    options: [
                        "• Artificial Intelligence & Machine Learning",
                        "• Big Data Analytics",
                        "• Computer Vision & NLP",
                        "• Healthcare Analytics",
                        "• Cybersecurity Analytics",
                        "",
                        "Contact Prof. Rajesh Kumar for research opportunities!"
                    ]
                }
            };
        }

        openChatbot() {
            if (this.chatbotContainer) {
                this.chatbotContainer.classList.add('active');
                if (this.chatbotFloat) this.chatbotFloat.style.display = 'none';
                this.isOpen = true;
            }
        }

        closeChatbot() {
            if (this.chatbotContainer) {
                this.chatbotContainer.classList.remove('active');
                if (this.chatbotFloat) this.chatbotFloat.style.display = 'block';
                this.isOpen = false;
            }
        }

        sendMessage() {
            const message = this.chatbotInput.value.trim();
            if (!message) return;

            this.addMessage(message, 'user');
            this.chatbotInput.value = '';

            setTimeout(() => {
                this.generateResponse(message);
            }, 500);
        }

        addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;

            if (sender === 'bot') {
                messageDiv.innerHTML = `
                    <div class="message-avatar">
                        <img src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="Mallika">
                    </div>
                    <div class="message-content"><p>${text}</p></div>`;
            } else {
                messageDiv.innerHTML = `<div class="message-content"><p>${text}</p></div>`;
            }

            this.chatbotMessages.appendChild(messageDiv);
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        }

        generateResponse(userMessage) {
            const lowerMessage = userMessage.toLowerCase();
            let response = "I'm here to help! You can ask me about:";
            let isSpecificQuery = false;

            Object.keys(this.responses).forEach(key => {
                if (lowerMessage.includes(key)) {
                    const data = this.responses[key];
                    response = data.text + "\n\n" + data.options.join("\n");
                    isSpecificQuery = true;
                }
            });

            if (["hello", "hi", "hey"].some(g => lowerMessage.includes(g))) {
                response = "Hello! I'm Mallika, your AI assistant for the Data Science Department. How can I help you today?";
                isSpecificQuery = true;
            }

            if (lowerMessage.includes('department') || lowerMessage.includes('about')) {
                response = "The Department of Data Science at GM University offers cutting-edge education in data analytics, machine learning, and AI. We have 500+ students, 25+ faculty members, and maintain a 90% placement rate with top companies!";
                isSpecificQuery = true;
            }

            if (!isSpecificQuery) {
                response += "\n\n• Programs & Courses\n• Admission Process\n• Faculty Information\n• Placement Records\n• Research Opportunities\n• Contact Details\n\nWhat would you like to know more about?";
            }

            this.addMessage(response, 'bot');

            if (!isSpecificQuery || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                setTimeout(() => this.addQuickReplies(), 200);
            }
        }

        addQuickReplies() {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot-message';
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <img src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop" alt="Mallika">
                </div>
                <div class="message-content">
                    <div class="quick-replies">
                        <button class="quick-reply" data-reply="programs">Programs</button>
                        <button class="quick-reply" data-reply="admissions">Admissions</button>
                        <button class="quick-reply" data-reply="faculty">Faculty</button>
                        <button class="quick-reply" data-reply="placement">Placements</button>
                        <button class="quick-reply" data-reply="contact">Contact</button>
                    </div>
                </div>`;
            this.chatbotMessages.appendChild(messageDiv);
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
            this.handleQuickReplies();
        }

        handleQuickReplies() {
            const quickReplies = document.querySelectorAll('.quick-reply');
            quickReplies.forEach(button => {
                button.addEventListener('click', (e) => {
                    const reply = e.target.dataset.reply || e.target.textContent.toLowerCase();
                    this.addMessage(e.target.textContent, 'user');
                    setTimeout(() => this.generateResponse(reply), 500);
                });
            });
        }
    }

    new Chatbot();

    // ============================
    // INTERSECTION OBSERVER ANIMATIONS
    // ============================
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.style.animationFillMode = 'both';
                entry.target.style.animationName = 'fadeInUp';
                entry.target.style.animationDuration = '0.8s';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const animateElements = document.querySelectorAll('.faculty-card, .program-card, .resource-card, .achievement-item, .alumni-card, .stat-item');
    animateElements.forEach(el => observer.observe(el));

    // ============================
    // COUNTER ANIMATION
    // ============================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-item h3');

        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (counter.textContent.includes('%')) {
                        counter.textContent = Math.round(current) + '%';
                    } else if (counter.textContent.includes('₹')) {
                        counter.textContent = '₹' + Math.round(current) + ' LPA';
                    } else {
                        counter.textContent = Math.round(current) + '+';
                    }
                    requestAnimationFrame(updateCounter);
                }
            };

            updateCounter();
        });
    }

    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) statsObserver.observe(statsSection);

    // ============================
    // LAZY LOADING IMAGES
    // ============================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ============================
    // SCROLL TO TOP BUTTON
    // ============================
    function addScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 120px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #8B4513;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            z-index: 999;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    addScrollToTop();