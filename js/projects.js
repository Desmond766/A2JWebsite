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

// ==================== PROJECT DATA ====================
const projectData = {
    'School Recladding – Aitken College': {
        location: 'VIC',
        duration: '2 weeks',
        photos: 'aitken-college'
    },
    'Swinburne University Protolab – Hawthorn': {
        location: 'Hawthorn, VIC',
        duration: 'Compressed programme',
        photos: 'swinburne-protolab'
    },
    'TES Office Fitout – Hawthorn': {
        location: 'Hawthorn, VIC',
        photos: 'tes-offices'
    },
    'Jones Rd Apartments – Dandenong': {
        location: 'Dandenong, VIC',
        size: '28 Units',
        duration: 'CSV Program',
        photos: 'jones-rd'
    },
    'Springleaf Pavilion – Clyde': {
        location: 'Clyde, VIC',
        size: '3,000+ sqm',
        duration: 'Tight programme',
        photos: 'springleaf-pavilion'
    },
    'Federation University Nursing Lab – Berwick': {
        location: 'Berwick, VIC',
        duration: '8 weeks',
        photos: 'berwick-nursing'
    },
    '7-Storey Hotel Restoration – Port Vila, Vanuatu': {
        location: 'Port Vila, Vanuatu',
        size: '7 Storeys',
        photos: 'vanuatu'
    }
};

const PHOTO_COUNT = 5;

// ==================== LIGHTBOX & GALLERY ====================
let currentPhotoIndex = 0;
let currentPhotos = [];

function setGalleryPhoto(index) {
    currentPhotoIndex = index;
    const photoEl = document.getElementById('galleryPhoto');
    photoEl.style.opacity = '0';
    setTimeout(() => {
        photoEl.src = currentPhotos[index];
        photoEl.onload = () => { photoEl.style.opacity = '1'; };
    }, 150);

    document.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    document.getElementById('galleryCounter').textContent = (index + 1) + ' / ' + currentPhotos.length;

    document.getElementById('galleryPrev').style.visibility = index === 0 ? 'hidden' : 'visible';
    document.getElementById('galleryNext').style.visibility = index === currentPhotos.length - 1 ? 'hidden' : 'visible';
}

function initLightbox() {
    const overlay = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const cards = document.querySelectorAll('.project-card');

    if (!overlay || !cards.length) return;

    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const title = card.querySelector('.project-info h3').textContent;
            const desc = card.querySelector('.project-info p').textContent;
            const category = card.querySelector('.project-category').textContent;

            document.getElementById('lightboxTitle').textContent = title;
            document.getElementById('lightboxDesc').textContent = desc;
            document.getElementById('lightboxCategory').textContent = category;

            const data = projectData[title] || {};
            const fields = [
                { id: 'lightboxLocation', value: data.location },
                { id: 'lightboxYear', value: data.year },
                { id: 'lightboxSize', value: data.size },
                { id: 'lightboxDuration', value: data.duration }
            ];
            fields.forEach(f => {
                const el = document.getElementById(f.id);
                const wrapper = el.closest('.lightbox-detail');
                if (f.value) {
                    el.textContent = f.value;
                    wrapper.style.display = '';
                } else {
                    wrapper.style.display = 'none';
                }
            });

            const folder = data.photos;
            currentPhotos = [];
            for (let i = 1; i <= PHOTO_COUNT; i++) {
                currentPhotos.push(assetUrl('images/projects/' + folder + '/' + i + '.jpg'));
            }

            const thumbContainer = document.getElementById('galleryThumbnails');
            thumbContainer.innerHTML = '';
            currentPhotos.forEach((src, i) => {
                const thumb = document.createElement('img');
                thumb.src = src;
                thumb.alt = 'Photo ' + (i + 1);
                thumb.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
                thumb.addEventListener('click', (e) => {
                    e.stopPropagation();
                    setGalleryPhoto(i);
                });
                thumbContainer.appendChild(thumb);
            });

            setGalleryPhoto(0);

            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentPhotoIndex > 0) setGalleryPhoto(currentPhotoIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentPhotoIndex < currentPhotos.length - 1) setGalleryPhoto(currentPhotoIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'ArrowLeft' && currentPhotoIndex > 0) setGalleryPhoto(currentPhotoIndex - 1);
        if (e.key === 'ArrowRight' && currentPhotoIndex < currentPhotos.length - 1) setGalleryPhoto(currentPhotoIndex + 1);
        if (e.key === 'Escape') closeLightbox();
    });

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
    });
}
