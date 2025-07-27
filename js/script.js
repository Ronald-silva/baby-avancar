// Mobile menu toggle - VERSÃO CORRIGIDA
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    // Toggle menu ao clicar no hamburger
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            // Fechar menu
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Abrir menu
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Active link highlighting
function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Sistema de formulário simplificado para Vercel
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Send email using Formspree
        sendContactEmail(data)
            .then(() => {
                // Success - Hide form and show success message
                this.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    this.style.display = 'block';
                    document.getElementById('formSuccess').style.display = 'none';
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
                
                // Track successful submission
                if (window.analytics) {
                    window.analytics.trackEvent('form_submission_success', {
                        form: 'contact',
                        method: 'formspree'
                    });
                }
            })
            .catch((error) => {
                // Error handling
                console.error('Erro ao enviar formulário:', error);
                
                // Show error message with WhatsApp fallback
                showFormError('Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Track failed submission
                if (window.analytics) {
                    window.analytics.trackEvent('form_submission_error', {
                        form: 'contact',
                        error: error.message
                    });
                }
            });
    });
}

// Send contact email via Formspree
async function sendContactEmail(formData) {
    // Formspree endpoint - substitua pelo seu ID real
    const formspreeEndpoint = 'https://formspree.io/f/xdkogqpv'; // Endpoint temporário para colegiobabyavancar@gmail.com
    
    const emailData = {
        email: formData.email,
        nome: formData.nome,
        telefone: formData.telefone,
        assunto: formData.assunto,
        'idade-crianca': formData['idade-crianca'] || 'Não informado',
        mensagem: formData.mensagem,
        _replyto: formData.email,
        _subject: `Novo Contato - ${formData.assunto || 'Formulário do Site'}`,
        _template: 'table'
    };
    
    const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
    });
    
    if (!response.ok) {
        throw new Error(`Erro no envio: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.errors) {
        throw new Error('Erro na validação dos dados');
    }
    
    return result;
}

// Show form error message with WhatsApp fallback
function showFormError(message) {
    // Create or update error message element
    let errorElement = document.getElementById('formError');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = 'formError';
        errorElement.style.cssText = `
            background: linear-gradient(135deg, #dc3545, #c82333);
            color: white;
            padding: 1.5rem;
            border-radius: 15px;
            margin-top: 1rem;
            text-align: center;
            display: none;
            box-shadow: 0 4px 20px rgba(220, 53, 69, 0.3);
        `;
        document.getElementById('contactForm').parentNode.appendChild(errorElement);
    }
    
    errorElement.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
            <p style="margin: 0; font-weight: 600;">${message}</p>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="https://wa.me/5585999701822?text=Olá! Tive problemas com o formulário do site e gostaria de entrar em contato." 
               target="_blank" 
               style="background: #25D366; color: white; padding: 0.75rem 1.5rem; border-radius: 25px; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600; transition: all 0.3s ease;">
                <i class="fab fa-whatsapp"></i>
                Contato via WhatsApp
            </a>
            <button onclick="this.parentElement.parentElement.style.display='none'" 
                    style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
                Fechar
            </button>
        </div>
    `;
    errorElement.style.display = 'block';
    
    // Hide error after 15 seconds
    setTimeout(() => {
        if (errorElement.style.display !== 'none') {
            errorElement.style.display = 'none';
        }
    }, 15000);
}

// Phone number formatting (only if field exists)
const telefoneField = document.getElementById('telefone');
if (telefoneField) {
    telefoneField.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    e.target.value = value;
    });
}

// Form validation feedback
function addValidationFeedback() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
                this.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
            } else {
                this.style.borderColor = '#28a745';
                this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#4A90E2';
            this.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.1)';
        });
    });
}

// Initialize validation feedback
if (document.getElementById('contactForm')) {
    addValidationFeedback();
}

// WhatsApp integration
function openWhatsApp() {
    window.open('https://wa.me/5585999701822', '_blank');
}

// Add click event to WhatsApp contact (only if exists)
const whatsappContact = document.querySelector('.contact-item .fab.fa-whatsapp');
if (whatsappContact && whatsappContact.parentElement) {
    whatsappContact.parentElement.addEventListener('click', openWhatsApp);
}