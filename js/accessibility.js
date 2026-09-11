// Sistema Avançado de Acessibilidade
class AccessibilityManager {
    constructor() {
        this.settings = {
            fontSize: 100,
            contrast: 'normal',
            animations: true,
            focusVisible: true,
            screenReader: false,
            keyboardNavigation: true
        };
        
        this.init();
    }
    
    init() {
        this.loadSettings();
        this.createAccessibilityPanel();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupScreenReaderSupport();
        this.setupAnimationControls();
        this.monitorAccessibility();
    }
    
    // Carregar configurações salvas
    loadSettings() {
        try {
            const saved = localStorage.getItem('accessibility_settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
                this.applySettings();
            }
        } catch (error) {
            console.warn('Erro ao carregar configurações de acessibilidade:', error);
        }
    }
    
    // Salvar configurações
    saveSettings() {
        try {
            localStorage.setItem('accessibility_settings', JSON.stringify(this.settings));
        } catch (error) {
            console.warn('Erro ao salvar configurações de acessibilidade:', error);
        }
    }
    
    // Criar painel de acessibilidade
    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.id = 'accessibility-panel';
        panel.className = 'accessibility-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Painel de Acessibilidade');
        panel.setAttribute('aria-hidden', 'true');
        
        panel.innerHTML = `
            <div class="accessibility-header">
                <h3>Opções de Acessibilidade</h3>
                <button class="close-panel" aria-label="Fechar painel">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
            
            <div class="accessibility-content">
                <div class="accessibility-group">
                    <h4>Tamanho da Fonte</h4>
                    <div class="font-controls">
                        <button class="font-btn" data-size="80" aria-label="Diminuir fonte">A-</button>
                        <span class="font-size-display">${this.settings.fontSize}%</span>
                        <button class="font-btn" data-size="120" aria-label="Aumentar fonte">A+</button>
                        <button class="font-btn reset" data-size="100" aria-label="Resetar fonte">Reset</button>
                    </div>
                </div>
                
                <div class="accessibility-group">
                    <h4>Contraste</h4>
                    <div class="contrast-controls">
                        <button class="contrast-btn ${this.settings.contrast === 'normal' ? 'active' : ''}" 
                                data-contrast="normal">Normal</button>
                        <button class="contrast-btn ${this.settings.contrast === 'high' ? 'active' : ''}" 
                                data-contrast="high">Alto Contraste</button>
                        <button class="contrast-btn ${this.settings.contrast === 'dark' ? 'active' : ''}" 
                                data-contrast="dark">Modo Escuro</button>
                    </div>
                </div>
                
                <div class="accessibility-group">
                    <h4>Animações</h4>
                    <label class="toggle-label">
                        <input type="checkbox" ${this.settings.animations ? 'checked' : ''} 
                               id="animations-toggle">
                        <span class="toggle-slider"></span>
                        <span class="toggle-text">Ativar animações</span>
                    </label>
                </div>
                
                <div class="accessibility-group">
                    <h4>Navegação</h4>
                    <label class="toggle-label">
                        <input type="checkbox" ${this.settings.focusVisible ? 'checked' : ''} 
                               id="focus-toggle">
                        <span class="toggle-slider"></span>
                        <span class="toggle-text">Destacar foco do teclado</span>
                    </label>
                </div>
                
                <div class="accessibility-group">
                    <h4>Leitor de Tela</h4>
                    <label class="toggle-label">
                        <input type="checkbox" ${this.settings.screenReader ? 'checked' : ''} 
                               id="screen-reader-toggle">
                        <span class="toggle-slider"></span>
                        <span class="toggle-text">Otimizar para leitor de tela</span>
                    </label>
                </div>
            </div>
            
            <div class="accessibility-footer">
                <button class="reset-all-btn">Restaurar Padrões</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupPanelEvents();
        this.createAccessibilityButton();
    }
    
    // Criar botão de acessibilidade
    createAccessibilityButton() {
        const button = document.createElement('button');
        button.id = 'accessibility-toggle';
        button.className = 'accessibility-toggle';
        button.setAttribute('aria-label', 'Abrir opções de acessibilidade');
        button.innerHTML = '<i class="fas fa-universal-access" aria-hidden="true"></i>';
        
        button.addEventListener('click', () => {
            this.togglePanel();
        });
        
        document.body.appendChild(button);
    }
    
    // Configurar eventos do painel
    setupPanelEvents() {
        const panel = document.getElementById('accessibility-panel');
        
        // Fechar painel
        panel.querySelector('.close-panel').addEventListener('click', () => {
            this.closePanel();
        });
        
        // Controles de fonte
        panel.querySelectorAll('.font-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const size = parseInt(btn.dataset.size);
                this.setFontSize(size);
            });
        });
        
        // Controles de contraste
        panel.querySelectorAll('.contrast-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setContrast(btn.dataset.contrast);
                panel.querySelectorAll('.contrast-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Toggle animações
        panel.querySelector('#animations-toggle').addEventListener('change', (e) => {
            this.setAnimations(e.target.checked);
        });
        
        // Toggle foco visível
        panel.querySelector('#focus-toggle').addEventListener('change', (e) => {
            this.setFocusVisible(e.target.checked);
        });
        
        // Toggle leitor de tela
        panel.querySelector('#screen-reader-toggle').addEventListener('change', (e) => {
            this.setScreenReaderMode(e.target.checked);
        });
        
        // Reset todas as configurações
        panel.querySelector('.reset-all-btn').addEventListener('click', () => {
            this.resetAllSettings();
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panel.getAttribute('aria-hidden') === 'false') {
                this.closePanel();
            }
        });
    }
    
    // Aplicar configurações
    applySettings() {
        this.setFontSize(this.settings.fontSize);
        this.setContrast(this.settings.contrast);
        this.setAnimations(this.settings.animations);
        this.setFocusVisible(this.settings.focusVisible);
        this.setScreenReaderMode(this.settings.screenReader);
    }
    
    // Controle de tamanho da fonte
    setFontSize(size) {
        this.settings.fontSize = Math.max(80, Math.min(150, size));
        document.documentElement.style.fontSize = `${this.settings.fontSize}%`;
        
        const display = document.querySelector('.font-size-display');
        if (display) {
            display.textContent = `${this.settings.fontSize}%`;
        }
        
        this.saveSettings();
        this.announceChange(`Tamanho da fonte alterado para ${this.settings.fontSize}%`);
    }
    
    // Controle de contraste
    setContrast(mode) {
        document.body.classList.remove('high-contrast', 'dark-mode');
        
        switch (mode) {
            case 'high':
                document.body.classList.add('high-contrast');
                break;
            case 'dark':
                document.body.classList.add('dark-mode');
                break;
        }
        
        this.settings.contrast = mode;
        this.saveSettings();
        this.announceChange(`Contraste alterado para ${mode}`);
    }
    
    // Controle de animações
    setAnimations(enabled) {
        this.settings.animations = enabled;
        
        if (!enabled) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
        
        this.saveSettings();
        this.announceChange(`Animações ${enabled ? 'ativadas' : 'desativadas'}`);
    }
    
    // Controle de foco visível
    setFocusVisible(enabled) {
        this.settings.focusVisible = enabled;
        
        if (enabled) {
            document.body.classList.add('focus-visible');
        } else {
            document.body.classList.remove('focus-visible');
        }
        
        this.saveSettings();
    }
    
    // Modo leitor de tela
    setScreenReaderMode(enabled) {
        this.settings.screenReader = enabled;
        
        if (enabled) {
            document.body.classList.add('screen-reader-mode');
            this.enhanceForScreenReader();
        } else {
            document.body.classList.remove('screen-reader-mode');
        }
        
        this.saveSettings();
    }
    
    // Melhorar para leitor de tela
    enhanceForScreenReader() {
        // Adicionar mais descrições ARIA
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', 'Imagem decorativa');
        });
        
        // Melhorar navegação por landmarks
        document.querySelectorAll('section:not([role])').forEach(section => {
            section.setAttribute('role', 'region');
        });
        
        // Adicionar skip links adicionais
        this.addSkipLinks();
    }
    
    // Adicionar skip links
    addSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
            <a href="#navigation" class="skip-link">Pular para navegação</a>
            <a href="#footer" class="skip-link">Pular para rodapé</a>
        `;
        
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }
    
    // Configurar navegação por teclado
    setupKeyboardNavigation() {
        let focusableElements = [];
        let currentFocusIndex = -1;
        
        const updateFocusableElements = () => {
            focusableElements = Array.from(document.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            ));
        };
        
        document.addEventListener('keydown', (e) => {
            updateFocusableElements();
            
            // Alt + A para abrir painel de acessibilidade
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                this.togglePanel();
                return;
            }
            
            // Navegação com setas (quando apropriado)
            if (e.target.matches('.nav-menu a, .filter-btn, .contact-btn')) {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.focusNext(e.target);
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.focusPrevious(e.target);
                }
            }
        });
        
        // Melhorar indicadores de foco
        document.addEventListener('focusin', (e) => {
            if (this.settings.focusVisible) {
                e.target.classList.add('keyboard-focus');
            }
        });
        
        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('keyboard-focus');
        });
    }
    
    // Focar próximo elemento
    focusNext(currentElement) {
        const siblings = Array.from(currentElement.parentElement.children);
        const currentIndex = siblings.indexOf(currentElement);
        const nextIndex = (currentIndex + 1) % siblings.length;
        const nextElement = siblings[nextIndex].querySelector('a, button') || siblings[nextIndex];
        nextElement.focus();
    }
    
    // Focar elemento anterior
    focusPrevious(currentElement) {
        const siblings = Array.from(currentElement.parentElement.children);
        const currentIndex = siblings.indexOf(currentElement);
        const prevIndex = currentIndex === 0 ? siblings.length - 1 : currentIndex - 1;
        const prevElement = siblings[prevIndex].querySelector('a, button') || siblings[prevIndex];
        prevElement.focus();
    }
    
    // Gerenciamento de foco
    setupFocusManagement() {
        // Trap focus no modal/painel quando aberto
        document.addEventListener('keydown', (e) => {
            const panel = document.getElementById('accessibility-panel');
            if (e.key === 'Tab' && panel.getAttribute('aria-hidden') === 'false') {
                this.trapFocus(e, panel);
            }
        });
    }
    
    // Trap focus dentro de um elemento
    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    
    // Suporte para leitor de tela
    setupScreenReaderSupport() {
        // Criar região para anúncios
        const announcer = document.createElement('div');
        announcer.id = 'accessibility-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
    }
    
    // Anunciar mudanças para leitores de tela
    announceChange(message) {
        const announcer = document.getElementById('accessibility-announcer');
        if (announcer) {
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    }
    
    // Controles de animação
    setupAnimationControls() {
        // Detectar preferência do sistema
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            this.setAnimations(false);
        }
        
        // Escutar mudanças na preferência
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                this.setAnimations(false);
            }
        });
    }
    
    // Monitorar acessibilidade
    monitorAccessibility() {
        // Verificar problemas comuns de acessibilidade
        setInterval(() => {
            this.checkAccessibilityIssues();
        }, 5000);
    }
    
    // Verificar problemas de acessibilidade
    checkAccessibilityIssues() {
        const issues = [];
        
        // Verificar imagens sem alt
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
            issues.push(`${imagesWithoutAlt.length} imagens sem texto alternativo`);
        }
        
        // Verificar links sem texto
        const emptyLinks = document.querySelectorAll('a:empty, a:not([aria-label]):not([title])');
        if (emptyLinks.length > 0) {
            issues.push(`${emptyLinks.length} links sem texto descritivo`);
        }
        
        // Verificar contraste baixo (simulação básica)
        if (this.settings.contrast === 'normal') {
            const lightElements = document.querySelectorAll('.text-light, .opacity-50');
            if (lightElements.length > 0) {
                issues.push('Possíveis problemas de contraste detectados');
            }
        }
        
        // Log issues em desenvolvimento
        if (issues.length > 0 && window.location.hostname === 'localhost') {
            console.warn('Problemas de acessibilidade detectados:', issues);
        }
    }
    
    // Toggle painel
    togglePanel() {
        const panel = document.getElementById('accessibility-panel');
        const isHidden = panel.getAttribute('aria-hidden') === 'true';
        
        if (isHidden) {
            this.openPanel();
        } else {
            this.closePanel();
        }
    }
    
    // Abrir painel
    openPanel() {
        const panel = document.getElementById('accessibility-panel');
        panel.setAttribute('aria-hidden', 'false');
        panel.style.display = 'block';
        
        // Focar primeiro elemento
        setTimeout(() => {
            const firstButton = panel.querySelector('button');
            if (firstButton) {
                firstButton.focus();
            }
        }, 100);
        
        this.announceChange('Painel de acessibilidade aberto');
    }
    
    // Fechar painel
    closePanel() {
        const panel = document.getElementById('accessibility-panel');
        panel.setAttribute('aria-hidden', 'true');
        panel.style.display = 'none';
        
        // Retornar foco para o botão
        const toggleButton = document.getElementById('accessibility-toggle');
        if (toggleButton) {
            toggleButton.focus();
        }
        
        this.announceChange('Painel de acessibilidade fechado');
    }
    
    // Reset todas as configurações
    resetAllSettings() {
        this.settings = {
            fontSize: 100,
            contrast: 'normal',
            animations: true,
            focusVisible: true,
            screenReader: false,
            keyboardNavigation: true
        };
        
        this.applySettings();
        this.updatePanelControls();
        this.announceChange('Configurações de acessibilidade restauradas');
    }
    
    // Atualizar controles do painel
    updatePanelControls() {
        const panel = document.getElementById('accessibility-panel');
        if (!panel) return;
        
        // Atualizar display de fonte
        const fontDisplay = panel.querySelector('.font-size-display');
        if (fontDisplay) {
            fontDisplay.textContent = `${this.settings.fontSize}%`;
        }
        
        // Atualizar botões de contraste
        panel.querySelectorAll('.contrast-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.contrast === this.settings.contrast);
        });
        
        // Atualizar toggles
        panel.querySelector('#animations-toggle').checked = this.settings.animations;
        panel.querySelector('#focus-toggle').checked = this.settings.focusVisible;
        panel.querySelector('#screen-reader-toggle').checked = this.settings.screenReader;
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager = new AccessibilityManager();
});

// CSS para acessibilidade
const accessibilityCSS = `
    .accessibility-toggle {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #4A90E2;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        z-index: 1001;
        box-shadow: 0 4px 20px rgba(74, 144, 226, 0.3);
        transition: all 0.3s ease;
    }
    
    .accessibility-toggle:hover {
        background: #357ABD;
        transform: scale(1.1);
    }
    
    .accessibility-panel {
        position: fixed;
        top: 80px;
        right: 20px;
        width: 320px;
        max-height: calc(100vh - 100px);
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 1002;
        display: none;
        overflow-y: auto;
    }
    
    .accessibility-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    
    .accessibility-header h3 {
        margin: 0;
        color: #333;
        font-size: 18px;
    }
    
    .close-panel {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        padding: 5px;
    }
    
    .accessibility-content {
        padding: 20px;
    }
    
    .accessibility-group {
        margin-bottom: 25px;
    }
    
    .accessibility-group h4 {
        margin: 0 0 15px 0;
        color: #333;
        font-size: 16px;
    }
    
    .font-controls {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .font-btn {
        padding: 8px 12px;
        border: 2px solid #4A90E2;
        background: white;
        color: #4A90E2;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }
    
    .font-btn:hover {
        background: #4A90E2;
        color: white;
    }
    
    .font-size-display {
        font-weight: bold;
        color: #333;
        min-width: 50px;
        text-align: center;
    }
    
    .contrast-controls {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .contrast-btn {
        padding: 8px 15px;
        border: 2px solid #ddd;
        background: white;
        color: #333;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    }
    
    .contrast-btn.active {
        border-color: #4A90E2;
        background: #4A90E2;
        color: white;
    }
    
    .toggle-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }
    
    .toggle-slider {
        position: relative;
        width: 50px;
        height: 24px;
        background: #ddd;
        border-radius: 12px;
        transition: background 0.3s;
    }
    
    .toggle-slider::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s;
    }
    
    input[type="checkbox"]:checked + .toggle-slider {
        background: #4A90E2;
    }
    
    input[type="checkbox"]:checked + .toggle-slider::before {
        transform: translateX(26px);
    }
    
    input[type="checkbox"] {
        display: none;
    }
    
    .accessibility-footer {
        padding: 20px;
        border-top: 1px solid #eee;
    }
    
    .reset-all-btn {
        width: 100%;
        padding: 12px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    }
    
    .reset-all-btn:hover {
        background: #c82333;
    }
    
    /* Estados de acessibilidade */
    .high-contrast {
        filter: contrast(150%);
    }
    
    .dark-mode {
        filter: invert(1) hue-rotate(180deg);
    }
    
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .focus-visible *:focus {
        outline: 3px solid #4A90E2 !important;
        outline-offset: 2px !important;
    }
    
    .keyboard-focus {
        outline: 3px solid #4A90E2 !important;
        outline-offset: 2px !important;
    }
    
    .skip-links {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 3px;
        z-index: 1000;
    }
    
    .skip-link:focus {
        top: 6px;
    }
    
    @media (max-width: 768px) {
        .accessibility-toggle {
            top: 15px;
            right: 15px;
            width: 45px;
            height: 45px;
            font-size: 18px;
        }
        
        .accessibility-panel {
            top: 70px;
            right: 15px;
            width: calc(100vw - 30px);
            max-width: 300px;
        }
    }
`;

// Adicionar CSS
const style = document.createElement('style');
style.textContent = accessibilityCSS;
document.head.appendChild(style);