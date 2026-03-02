/**
 * contact.js — Contact page specific functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initComponents('contact');
    initContactForm();
});

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(this);
            const payload = Object.fromEntries(formData.entries());

            console.log('Submitting form with payload:', payload);

            const response = await fetch(WEB3FORMS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log('Web3Forms response:', result);

            if (result.success) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#10b981';
                submitBtn.style.borderColor = '#10b981';
                this.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (err) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
            submitBtn.style.background = '#ef4444';
            submitBtn.style.borderColor = '#ef4444';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.disabled = false;
            }, 3000);

            console.error('Contact form error:', err);
        }
    });
}
