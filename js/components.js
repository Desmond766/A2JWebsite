/**
 * Shared components loader — injects header and footer HTML into each page.
 * Each page includes <div id="site-header"></div> and <div id="site-footer"></div>
 * and this script fills them, keeping a single source of truth.
 */

function getNavHTML(activePage) {
    return `
    <nav class="navbar ${activePage !== 'home' ? 'navbar-light' : ''}" id="navbar">
        <div class="nav-container">
            <a href="index.html" class="logo">
                <span class="logo-a2j">A2J</span><span class="logo-construction">CONSTRUCTION</span>
            </a>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
                <li class="dropdown">
                    <a href="services.html" class="nav-link ${activePage === 'services' ? 'active' : ''}">Our Services <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <div class="dropdown-grid">
                            <div class="dropdown-category">
                                <h4><i class="fas fa-trowel"></i> Plastering</h4>
                                <ul>
                                    <li><a href="services.html#plastering">Interior Plastering</a></li>
                                    <li><a href="services.html#plastering">Exterior Rendering</a></li>
                                    <li><a href="services.html#plastering">Decorative Finishes</a></li>
                                    <li><a href="services.html#plastering">Repair & Patching</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-category">
                                <h4><i class="fas fa-layer-group"></i> Cladding</h4>
                                <ul>
                                    <li><a href="services.html#cladding">Timber Cladding</a></li>
                                    <li><a href="services.html#cladding">Metal Cladding</a></li>
                                    <li><a href="services.html#cladding">Composite Panels</a></li>
                                    <li><a href="services.html#cladding">Weatherboard Installation</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-category">
                                <h4><i class="fas fa-hard-hat"></i> Concrete Works</h4>
                                <ul>
                                    <li><a href="services.html#concrete">Foundations & Slabs</a></li>
                                    <li><a href="services.html#concrete">Driveways & Paths</a></li>
                                    <li><a href="services.html#concrete">Retaining Walls</a></li>
                                    <li><a href="services.html#concrete">Decorative Concrete</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-category">
                                <h4><i class="fas fa-home"></i> Renovations</h4>
                                <ul>
                                    <li><a href="services.html#renovations">Kitchen Renovations</a></li>
                                    <li><a href="services.html#renovations">Bathroom Renovations</a></li>
                                    <li><a href="services.html#renovations">Home Extensions</a></li>
                                    <li><a href="services.html#renovations">Commercial Fit-outs</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li><a href="projects.html" class="nav-link ${activePage === 'projects' ? 'active' : ''}">Past Projects</a></li>
                <li><a href="contact.html" class="nav-link ${activePage === 'contact' ? 'active' : ''}">Contact Us</a></li>
            </ul>
            <a href="contact.html" class="nav-cta">Get a Quote</a>
            <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>`;
}

function getFooterHTML() {
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <a href="index.html" class="footer-logo">
                        <span class="logo-a2j">A2J</span><span class="logo-construction">CONSTRUCTION</span>
                    </a>
                    <p>Building quality structures and lasting relationships across Australia since 2009. Licensed, insured, and committed to excellence.</p>
                    <div class="footer-license">
                        <i class="fas fa-id-card"></i>
                        <span>NSW Builders Licence: 12345678</span>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Our Services</a></li>
                        <li><a href="projects.html">Past Projects</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-services">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="services.html#plastering">Plastering</a></li>
                        <li><a href="services.html#cladding">Cladding</a></li>
                        <li><a href="services.html#concrete">Concrete Works</a></li>
                        <li><a href="services.html#renovations">Renovations</a></li>
                        <li><a href="services.html#extensions">Extensions</a></li>
                        <li><a href="services.html#commercial">Commercial Fit-outs</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact</h4>
                    <ul>
                        <li><i class="fas fa-location-dot"></i> 123 Builder St, Sydney NSW</li>
                        <li><i class="fas fa-phone"></i> +61 400 000 000</li>
                        <li><i class="fas fa-envelope"></i> info@a2jconstruction.com.au</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 A2J Construction. All rights reserved.</p>
                <div class="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>`;
}

/**
 * Initialize shared components.
 * Call this from each page's script or inline <script>.
 * @param {string} activePage - 'home' | 'services' | 'projects' | 'contact'
 */
function initComponents(activePage) {
    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');

    if (headerEl) headerEl.innerHTML = getNavHTML(activePage);
    if (footerEl) footerEl.innerHTML = getFooterHTML();

    // Inject sticky mobile CTA bar
    injectMobileCTA();

    // Now that header/footer are in the DOM, initialize shared functionality
    if (typeof initMain === 'function') initMain();
}

function injectMobileCTA() {
    const cta = document.createElement('div');
    cta.className = 'mobile-cta';
    cta.innerHTML = `
        <div class="mobile-cta-inner">
            <a href="tel:+61400000000" class="btn-cta-call">
                <i class="fas fa-phone"></i> Call Now
            </a>
            <a href="contact.html" class="btn-cta-quote">
                <i class="fas fa-file-lines"></i> Free Quote
            </a>
        </div>
    `;
    document.body.appendChild(cta);
}
