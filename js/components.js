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
                <div class="logo-icon-wrap"><img src="${assetUrl('images/A2J-Logo_white background.png')}" alt="A2J Construction Services" class="logo-img"></div>
                <div class="logo-text"><span class="logo-a2j">A2J</span><span class="logo-lines">Construction<br>Services</span></div>
            </a>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html" class="nav-link ${activePage === 'home' ? 'active' : ''}">Home</a></li>
                <li class="dropdown">
                    <a href="services.html" class="nav-link ${activePage === 'services' ? 'active' : ''}">Our Services <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <div class="dropdown-grid">
                            <div class="dropdown-category">
                                <h4><i class="fas fa-trowel"></i> Framing & Plastering</h4>
                                <ul>
                                    <li><a href="services.html#plastering">Metal Stud Framing</a></li>
                                    <li><a href="services.html#plastering">Plasterboard Lining</a></li>
                                    <li><a href="services.html#plastering">Suspended Ceilings</a></li>
                                    <li><a href="services.html#plastering">Feature Ceilings</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-category">
                                <h4><i class="fas fa-layer-group"></i> Cladding & Panels</h4>
                                <ul>
                                    <li><a href="services.html#cladding">Fibre Cement Cladding</a></li>
                                    <li><a href="services.html#timber">Architectural Panels</a></li>
                                    <li><a href="services.html#cladding">Facade Systems</a></li>
                                    <li><a href="services.html#recladding">Recladding & Remedial</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-category">
                                <h4><i class="fas fa-border-top-left"></i> Ceilings & Acoustic</h4>
                                <ul>
                                    <li><a href="services.html#ceilings">Suspended Ceiling Grids</a></li>
                                    <li><a href="services.html#ceilings">Acoustic Panels</a></li>
                                    <li><a href="services.html#ceilings">Healthcare-Grade Systems</a></li>
                                    <li><a href="services.html#ceilings">Specialty Tiles</a></li>
                                </ul>
                            </div>
                            <div class="dropdown-category">
                                <h4><i class="fas fa-cubes"></i> Multi-Trade</h4>
                                <ul>
                                    <li><a href="services.html#multitrade">Painting</a></li>
                                    <li><a href="services.html#multitrade">Glazing</a></li>
                                    <li><a href="services.html#multitrade">Waterproofing</a></li>
                                    <li><a href="services.html#multitrade">Tiling</a></li>
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
                        <div class="footer-logo-icon-wrap"><img src="${assetUrl('images/A2J-Logo_white background.png')}" alt="A2J Construction Services" class="footer-logo-img"></div>
                        <span class="footer-logo-text">A2J Construction Services</span>
                    </a>
                    <p>Melbourne-based construction services company. Founded on transparency, communication and reliability — delivering across Victoria and interstate since 2024.</p>
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
                        <li><a href="services.html#plastering">Framing & Plastering</a></li>
                        <li><a href="services.html#timber">Architectural Panels</a></li>
                        <li><a href="services.html#recladding">Recladding & Remedial</a></li>
                        <li><a href="services.html#cladding">Cladding & External Linings</a></li>
                        <li><a href="services.html#ceilings">Ceiling & Acoustic Systems</a></li>
                        <li><a href="services.html#multitrade">Multi-Trade Interior Packages</a></li>
                        <li><a href="services.html#live-environments">Live & Staged Environments</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact</h4>
                    <ul>
                        <li><i class="fas fa-location-dot"></i> Melbourne, VIC</li>
                        <li><i class="fas fa-phone"></i> (03) 9191 8089</li>
                        <li><i class="fas fa-envelope"></i> marketing@a2jcs.com</li>
                    </ul>
                    <h4 class="footer-social-heading">Follow Us On</h4>
                    <ul class="footer-social-list">
                        <li><a href="https://www.linkedin.com/company/a2j-construction-services" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i> LinkedIn</a></li>
                        <li><a href="https://www.instagram.com/a2jconstruction/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i> Instagram</a></li>
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
            <a href="tel:+61391918089" class="btn-cta-call">
                <i class="fas fa-phone"></i> Call Now
            </a>
            <a href="contact.html" class="btn-cta-quote">
                <i class="fas fa-file-lines"></i> Free Quote
            </a>
        </div>
    `;
    document.body.appendChild(cta);
}
