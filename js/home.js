/**
 * home.js — Home page specific functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initComponents('home');
    initStatsCounter();
    initVideoControls();
});

// ==================== STATS COUNTER ANIMATION ====================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    let animated = false;

    function animateStats() {
        if (animated) return;

        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animated = true;

            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                function updateNumber(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    num.textContent = current;
                    if (progress < 1) requestAnimationFrame(updateNumber);
                }

                requestAnimationFrame(updateNumber);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // trigger on load if visible
}

function initVideoControls() {
    const video = document.getElementById('heroVideo');
    if (!video) return;

    const wrapper = document.getElementById('videoWrapper');
    const playPauseBtn = document.getElementById('videoPlayPause');
    const rewindBtn = document.getElementById('videoRewind');
    const forwardBtn = document.getElementById('videoForward');
    const muteBtn = document.getElementById('videoMute');
    const volumeSlider = document.getElementById('videoVolume');

    video.volume = 0.5;
    volumeSlider.value = 0;
    wrapper.classList.add('playing');

    function updateMuteIcon() {
        if (video.muted || video.volume === 0) {
            muteBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
        } else if (video.volume < 0.5) {
            muteBtn.innerHTML = '<i class="fas fa-volume-low"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
        }
    }

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            wrapper.classList.add('playing');
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            wrapper.classList.remove('playing');
        }
    });

    rewindBtn.addEventListener('click', () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
    });

    forwardBtn.addEventListener('click', () => {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (!video.muted && video.volume === 0) {
            video.volume = 0.5;
            volumeSlider.value = 0.5;
        }
        updateMuteIcon();
    });

    volumeSlider.addEventListener('input', () => {
        video.volume = parseFloat(volumeSlider.value);
        video.muted = video.volume === 0;
        updateMuteIcon();
    });
}
