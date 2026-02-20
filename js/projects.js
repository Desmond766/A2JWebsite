/**
 * projects.js — Past Projects page specific functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initComponents('projects');
    initProjectFilters();
    initLightbox();
});

// ==================== PROJECT FILTER ====================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==================== LIGHTBOX ====================
const projectData = {
    'Modern Family Home – Sydney': {
        location: 'Sydney, NSW',
        year: 'Completed 2024',
        size: '320 sqm',
        duration: '8 months'
    },
    'Office Complex – Melbourne CBD': {
        location: 'Melbourne, VIC',
        year: 'Completed 2023',
        size: '1,200 sqm',
        duration: '12 months'
    },
    'Heritage Kitchen Renovation – Brisbane': {
        location: 'Brisbane, QLD',
        year: 'Completed 2024',
        size: '45 sqm',
        duration: '6 weeks'
    },
    'Luxury Duplex – Gold Coast': {
        location: 'Gold Coast, QLD',
        year: 'Completed 2023',
        size: '480 sqm',
        duration: '10 months'
    },
    'Restaurant Fit-out – Perth': {
        location: 'Perth, WA',
        year: 'Completed 2024',
        size: '180 sqm',
        duration: '3 months'
    },
    'Bathroom Suite Upgrade – Adelaide': {
        location: 'Adelaide, SA',
        year: 'Completed 2025',
        size: '28 sqm',
        duration: '3 weeks'
    },
    'Eco Home – Canberra': {
        location: 'Canberra, ACT',
        year: 'Completed 2024',
        size: '260 sqm',
        duration: '7 months'
    },
    'Dental Clinic Fit-out – Hobart': {
        location: 'Hobart, TAS',
        year: 'Completed 2025',
        size: '150 sqm',
        duration: '2 months'
    },
    'Open Plan Living Conversion – Darwin': {
        location: 'Darwin, NT',
        year: 'Completed 2024',
        size: '65 sqm',
        duration: '5 weeks'
    }
};

function initLightbox() {
    const overlay = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const cards = document.querySelectorAll('.project-card');

    if (!overlay || !cards.length) return;

    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const title = card.querySelector('.project-info h3').textContent;
            const desc = card.querySelector('.project-info p').textContent;
            const category = card.querySelector('.project-category').textContent;
            const imageBg = card.querySelector('.project-image').style.background;
            const iconHTML = card.querySelector('.project-image-icon').innerHTML;

            // Populate lightbox
            document.getElementById('lightboxTitle').textContent = title;
            document.getElementById('lightboxDesc').textContent = desc;
            document.getElementById('lightboxCategory').textContent = category;
            document.getElementById('lightboxImage').style.background = imageBg;
            document.getElementById('lightboxIcon').innerHTML = iconHTML;

            // Populate details from data
            const data = projectData[title] || {
                location: 'Australia',
                year: 'Recent',
                size: '—',
                duration: '—'
            };
            document.getElementById('lightboxLocation').textContent = data.location;
            document.getElementById('lightboxYear').textContent = data.year;
            document.getElementById('lightboxSize').textContent = data.size;
            document.getElementById('lightboxDuration').textContent = data.duration;

            // Show
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeLightbox();
    });
}
