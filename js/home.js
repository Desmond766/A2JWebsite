/**
 * home.js — Home page specific functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initComponents('home');
    initStatsCounter();
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
