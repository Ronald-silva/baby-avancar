// ========================================
// TESTIMONIALS - COLÉGIO BABY AVANÇAR
// ========================================

class TestimonialsManager {
  constructor() {
    this.currentTestimonial = 1;
    this.totalTestimonials = 3;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 segundos
    
    this.init();
  }
  
  init() {
    this.setupNavigation();
    this.setupAutoPlay();
    this.setupAccessibility();
    this.setupAnimations();
    this.initializeFirstTestimonial();
  }
  
  // Configurar navegação por pontos
  setupNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const testimonialId = parseInt(dot.dataset.testimonial);
        this.showTestimonial(testimonialId);
      });
      
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const testimonialId = parseInt(dot.dataset.testimonial);
          this.showTestimonial(testimonialId);
        }
      });
    });
    
    // Adicionar controles de setas visuais
    this.addArrowControls();
  }
  
  // Adicionar controles de setas visuais
  addArrowControls() {
    const container = document.querySelector('.testimonials-container');
    if (!container) return;
    
    // Botão anterior
    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-arrow nav-arrow-prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.setAttribute('aria-label', 'Depoimento anterior');
    prevBtn.addEventListener('click', () => this.previousTestimonial());
    
    // Botão próximo
    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-arrow nav-arrow-next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.setAttribute('aria-label', 'Próximo depoimento');
    nextBtn.addEventListener('click', () => this.nextTestimonial());
    
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
  }
  
  // Inicializar primeiro depoimento como ativo
  initializeFirstTestimonial() {
    // Garantir que apenas o primeiro depoimento seja visível inicialmente
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
      if (index === 0) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
    
    // Atualizar navegação
    this.updateNavigation();
  }
  
  // Mostrar depoimento específico
  showTestimonial(testimonialId) {
    // Atualizar estado ativo
    this.currentTestimonial = testimonialId;
    
    // Atualizar navegação
    this.updateNavigation();
    
    // Atualizar visibilidade dos cards
    this.updateTestimonialVisibility();
    
    // Reiniciar autoplay
    this.restartAutoPlay();
    
    // Anunciar mudança para leitores de tela
    this.announceChange(testimonialId);
  }
  
  // Atualizar navegação
  updateNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach(dot => {
      const dotId = parseInt(dot.dataset.testimonial);
      if (dotId === this.currentTestimonial) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-current', 'false');
      }
    });
  }
  
  // Atualizar visibilidade dos depoimentos
  updateTestimonialVisibility() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
      const cardId = parseInt(card.dataset.testimonial);
      
      if (cardId === this.currentTestimonial) {
        card.classList.add('active');
        card.style.display = 'block';
      } else {
        card.classList.remove('active');
        card.style.display = 'block';
      }
    });
  }
  
  // Configurar autoplay
  setupAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextTestimonial();
    }, this.autoPlayDelay);
    
    // Pausar autoplay quando a página não está visível
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoPlay();
      } else {
        this.resumeAutoPlay();
      }
    });
    
    // Pausar autoplay quando o usuário interage
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
      testimonialsSection.addEventListener('mouseenter', () => this.pauseAutoPlay());
      testimonialsSection.addEventListener('mouseleave', () => this.resumeAutoPlay());
      testimonialsSection.addEventListener('focusin', () => this.pauseAutoPlay());
      testimonialsSection.addEventListener('focusout', () => this.resumeAutoPlay());
    }
  }
  
  // Próximo depoimento
  nextTestimonial() {
    const nextId = this.currentTestimonial === this.totalTestimonials ? 1 : this.currentTestimonial + 1;
    this.showTestimonial(nextId);
  }
  
  // Pausar autoplay
  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  // Resumir autoplay
  resumeAutoPlay() {
    if (!this.autoPlayInterval) {
      this.autoPlayInterval = setInterval(() => {
        this.nextTestimonial();
      }, this.autoPlayDelay);
    }
  }
  
  // Reiniciar autoplay
  restartAutoPlay() {
    this.pauseAutoPlay();
    this.resumeAutoPlay();
  }
  
  // Configurar acessibilidade
  setupAccessibility() {
    const testimonialsSection = document.querySelector('.testimonials-section');
    
    if (testimonialsSection) {
      // Adicionar role e aria-label
      testimonialsSection.setAttribute('role', 'region');
      testimonialsSection.setAttribute('aria-label', 'Depoimentos de pais e responsáveis');
      
      // Adicionar controles de teclado
      testimonialsSection.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.previousTestimonial();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextTestimonial();
            break;
          case 'Home':
            e.preventDefault();
            this.showTestimonial(1);
            break;
          case 'End':
            e.preventDefault();
            this.showTestimonial(this.totalTestimonials);
            break;
        }
      });
    }
    
    // Adicionar aria-labels aos pontos de navegação
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach((dot, index) => {
      const testimonialId = index + 1;
      dot.setAttribute('aria-label', `Ver depoimento ${testimonialId} de ${this.totalTestimonials}`);
      dot.setAttribute('aria-current', testimonialId === 1 ? 'true' : 'false');
    });
  }
  
  // Depoimento anterior
  previousTestimonial() {
    const prevId = this.currentTestimonial === 1 ? this.totalTestimonials : this.currentTestimonial - 1;
    this.showTestimonial(prevId);
  }
  
  // Configurar animações
  setupAnimations() {
    // Observer para animações de entrada
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
    
    // Observar elementos com fade-in
    document.querySelectorAll('.testimonials-section .fade-in').forEach(el => {
      observer.observe(el);
    });
  }
  
  // Anunciar mudança para leitores de tela
  announceChange(testimonialId) {
    const announcer = document.getElementById('accessibility-announcer');
    if (announcer) {
      announcer.textContent = `Depoimento ${testimonialId} de ${this.totalTestimonials} selecionado`;
      setTimeout(() => {
        announcer.textContent = '';
      }, 1000);
    }
  }
  
  // Métodos públicos para controle externo
  play() {
    this.resumeAutoPlay();
  }
  
  pause() {
    this.pauseAutoPlay();
  }
  
  goToTestimonial(id) {
    if (id >= 1 && id <= this.totalTestimonials) {
      this.showTestimonial(id);
    }
  }
  
  // Cleanup
  destroy() {
    this.pauseAutoPlay();
    
    // Remover event listeners
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
      dot.replaceWith(dot.cloneNode(true));
    });
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se a seção de depoimentos existe
  if (document.querySelector('.testimonials-section')) {
    window.testimonialsManager = new TestimonialsManager();
    
    // Adicionar controles de teclado globais
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + T para focar na seção de depoimentos
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        const testimonialsSection = document.querySelector('.testimonials-section');
        if (testimonialsSection) {
          testimonialsSection.focus();
        }
      }
    });
  }
});

// Exportar para uso global
window.TestimonialsManager = TestimonialsManager;
