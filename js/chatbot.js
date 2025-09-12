// ========================================
// ASSISTENTE VIRTUAL - AVANÇAR
// Colégio Baby Avançar
// ========================================

class ChatbotWidget {
  constructor() {
    this.isOpen = false;
    this.botUrl = 'https://lovable.dev/projects/3d901886-480a-4e1d-8c1e-ecf7f4218d50';
    this.init();
  }

  init() {
    this.createWidget();
    this.bindEvents();
    this.showWelcomeMessage();
  }

  createWidget() {
    // Criar HTML do widget
    const widgetHTML = `
      <div class="chatbot-widget" id="chatbotWidget">
        <div class="chatbot-tooltip">
          💬 Olá! Sou a Avançar, sua assistente virtual
        </div>
        <button class="chatbot-button" id="chatbotButton" aria-label="Abrir assistente virtual">
          <div class="chatbot-status"></div>
          <i class="fas fa-robot"></i>
        </button>
      </div>

      <div class="chatbot-modal" id="chatbotModal">
        <div class="chatbot-container">
          <div class="chatbot-header">
            <div class="chatbot-header-info">
              <div class="chatbot-avatar">
                <i class="fas fa-robot"></i>
              </div>
              <div>
                <h3 class="chatbot-title">Avançar</h3>
                <p class="chatbot-subtitle">Assistente Virtual do Colégio Baby Avançar</p>
              </div>
            </div>
            <button class="chatbot-close" id="chatbotClose" aria-label="Fechar chat">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <iframe 
            class="chatbot-iframe" 
            id="chatbotIframe"
            src=""
            title="Avançar - Assistente Virtual"
            loading="lazy">
          </iframe>
        </div>
      </div>
    `;

    // Adicionar ao body
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  bindEvents() {
    const button = document.getElementById('chatbotButton');
    const modal = document.getElementById('chatbotModal');
    const closeBtn = document.getElementById('chatbotClose');
    const iframe = document.getElementById('chatbotIframe');

    // Abrir chat
    button.addEventListener('click', () => {
      this.openChat();
    });

    // Fechar chat
    closeBtn.addEventListener('click', () => {
      this.closeChat();
    });

    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeChat();
      }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });

    // Carregar iframe apenas quando necessário
    button.addEventListener('click', () => {
      if (!iframe.src) {
        this.loadBot();
      }
    }, { once: true });
  }

  openChat() {
    const modal = document.getElementById('chatbotModal');
    const button = document.getElementById('chatbotButton');
    
    modal.classList.add('active');
    button.classList.add('loading');
    this.isOpen = true;
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
    
    // Analytics
    this.trackEvent('avancar_opened');
    
    // Remover loading após um tempo
    setTimeout(() => {
      button.classList.remove('loading');
    }, 1000);
  }

  closeChat() {
    const modal = document.getElementById('chatbotModal');
    
    modal.classList.remove('active');
    this.isOpen = false;
    
    // Restaurar scroll do body
    document.body.style.overflow = '';
    
    // Analytics
    this.trackEvent('avancar_closed');
  }

  loadBot() {
    const iframe = document.getElementById('chatbotIframe');
    const button = document.getElementById('chatbotButton');
    
    button.classList.add('loading');
    
    // Carregar o bot
    iframe.src = this.botUrl;
    
    // Remover loading quando carregar
    iframe.onload = () => {
      button.classList.remove('loading');
      this.trackEvent('avancar_loaded');
    };
    
    // Fallback para remover loading
    setTimeout(() => {
      button.classList.remove('loading');
    }, 3000);
  }

  showWelcomeMessage() {
    // Mostrar tooltip de boas-vindas após 3 segundos
    setTimeout(() => {
      const tooltip = document.querySelector('.chatbot-tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(0)';
        
        // Esconder após 5 segundos
        setTimeout(() => {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'translateX(10px)';
        }, 5000);
      }
    }, 3000);
  }

  trackEvent(eventName, data = {}) {
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'avancar_assistant',
        event_label: 'avancar_bot',
        ...data
      });
    }
    
    // Console log para debug
    console.log(`Avançar Event: ${eventName}`, data);
  }

  // Métodos públicos para controle externo
  open() {
    document.getElementById('chatbotButton').click();
  }

  close() {
    this.closeChat();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Aguardar um pouco para não interferir com outras animações
  setTimeout(() => {
    window.chatbot = new ChatbotWidget();
  }, 1000);
});

// Expor globalmente para uso externo
window.ChatbotWidget = ChatbotWidget;