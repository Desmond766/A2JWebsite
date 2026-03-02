/**
 * config.js — Site-wide configuration.
 * Must be loaded BEFORE all other scripts.
 */

// Cloudflare R2 CDN base URL (no trailing slash).
// Leave empty ('') for local development.
// For production, set to your R2 public URL, e.g.:
//   'https://pub-xxxxxxxx.r2.dev'
//   or your custom domain: 'https://assets.a2jcs.com'
const CDN_BASE = 'https://pub-c60a4e1516b2419b943f46b87f327c12.r2.dev';

function assetUrl(path) {
    if (!CDN_BASE) return path;
    return CDN_BASE + '/' + path;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-path]').forEach(img => {
        img.src = assetUrl(img.dataset.path);
    });
});
