// ============================================
// Navigation Toggle for Mobile
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// ============================================
// Close Mobile Menu When Link Clicked
// ============================================
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// Contact Information Configuration
// ============================================
// Configure these values when you have your business contact details
const CONTACT_CONFIG = {
    email: 'contact@bezaleldigitalstudio.com',
    phone: '+254110982961',
    formEndpoint: 'https://formspree.io/f/xaeqvkpy'
};

// Update contact information in the DOM
function updateContactInfo() {
    const contactEmail = document.getElementById('contact-email');
    const contactPhone = document.getElementById('contact-phone');
    const footerEmail = document.getElementById('footer-email');
    const footerPhone = document.getElementById('footer-phone');
    
    if (CONTACT_CONFIG.email) {
        if (contactEmail) {
            contactEmail.textContent = CONTACT_CONFIG.email;
            contactEmail.classList.remove('contact-placeholder');
        }
        if (footerEmail) {
            footerEmail.textContent = CONTACT_CONFIG.email;
            footerEmail.classList.remove('contact-placeholder');
        }
    }
    
    if (CONTACT_CONFIG.phone) {
        if (contactPhone) {
            contactPhone.textContent = CONTACT_CONFIG.phone;
            contactPhone.classList.remove('contact-placeholder');
        }
        if (footerPhone) {
            footerPhone.textContent = CONTACT_CONFIG.phone;
            footerPhone.classList.remove('contact-placeholder');
        }
    }
}

// Initialize contact info on page load
document.addEventListener('DOMContentLoaded', updateContactInfo);

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Check if form endpoint is configured
        if (!CONTACT_CONFIG.formEndpoint) {
            showFormStatus('This form requires backend configuration. Please configure the form endpoint in script.js before deployment.', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const response = await fetch(CONTACT_CONFIG.formEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormStatus('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showFormStatus('There was an error sending your message. Please try again or contact us directly via email.', 'error');
            }
        } catch (error) {
            showFormStatus('There was an error sending your message. Please try again or contact us directly via email.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
    }
}

/*
FORM BACKEND OPTIONS:

1. Formspree (Recommended for simplicity):
   - Sign up at https://formspree.io/
   - Create a new form
   - Copy your form endpoint URL
   - Paste it in CONTACT_CONFIG.formEndpoint above
   - Free tier: 50 submissions/month

2. Netlify Forms (If deploying to Netlify):
   - Add netlify attribute to form tag: <form netlify>
   - No additional configuration needed
   - Free: 100 submissions/month
   - Remove the JavaScript form handling above if using this method

3. Custom Server:
   - Build your own backend endpoint
   - Add your endpoint URL to CONTACT_CONFIG.formEndpoint
   - Ensure CORS is configured properly

4. EmailJS:
   - Sign up at https://www.emailjs.com/
   - Configure email service and template
   - Use their SDK instead of fetch above
*/
