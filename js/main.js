/**
 * main.js — shared functionality across all pages.
 * Runs after components.js has injected the header/footer.
 */

/**
 * Called by initComponents() after header/footer are injected into the DOM.
 * This ensures the navbar element exists before we attach scroll listeners.
 */
function initMain() {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initFaqAccordion();
}

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Only apply transparent->solid transition on home page (no .navbar-light)
    if (navbar.classList.contains('navbar-light')) return;

    function handleScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on load
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    if (!mobileToggle || !navLinks) return;

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ==================== SCROLL ANIMATIONS (Fade-in) ====================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .testimonial-card, .contact-card, .contact-form-wrapper, .why-us-content, .why-us-image, .feature, .section-header, .trust-item, .overview-card, .process-step, .fade-in-target'
    );

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        observer.observe(el);
    });
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    // Create button and inject into DOM
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== FAQ ACCORDION ====================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked (if it wasn't already open)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ==================== ANIMATION KEYFRAMES ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
