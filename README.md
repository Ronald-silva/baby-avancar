# Colégio Baby Avançar - Site Institucional

## 🎯 Visão Geral

Site institucional moderno e responsivo para o Colégio Baby Avançar, uma escola de educação infantil e fundamental localizada no Jóquei Clube, Fortaleza-CE.

## 📧 Configuração do Formulário de Contato

### Formspree Setup (Recomendado para Vercel)

1. **Acesse [formspree.io](https://formspree.io)**
2. **Crie uma conta gratuita**
3. **Crie um novo formulário:**
   - Email de destino: `colegiobabyavancar@gmail.com`
   - Nome do formulário: "Contato Colégio Baby Avançar"
4. **Copie o endpoint gerado** (formato: `https://formspree.io/f/xxxxxxxx`)
5. **Substitua no código:**
   - No arquivo `js/script.js`, linha ~45: substitua `xdkogqpv` pelo seu ID
   - No arquivo `index.html`, no atributo `action` do formulário

### Configuração Atual

- **Endpoint temporário**: `https://formspree.io/f/xdkogqpv`
- **Email de destino**: `colegiobabyavancar@gmail.com`
- **Método**: POST com JSON
- **Domínio canônico**: `https://baby-avancar.vercel.app`

## ✨ Funcionalidades Principais

### 🏠 Página Principal (index.html)

- **Hero Section** com call-to-action
- **Seção Sobre** com informações da escola
- **Proposta de Ensino** com cards informativos
- **Diferenciais** da instituição
- **Seção de Depoimentos** com carrossel interativo
- **Formulário de Contato** completo com validação
- **Cards de Contato** com WhatsApp, localização e redes sociais

### 🖼️ Galeria (galeria.html)

- **Sistema de Filtros** por categoria (Atividades, Eventos, Estrutura, Educação)
- **Modal de Visualização** para imagens em alta resolução
- **Lazy Loading** para otimização de performance
- **Botão "Carregar Mais"** para paginação

## 🚀 Tecnologias e Otimizações

### 📱 Responsividade

- **Design Mobile-First** com breakpoints otimizados
- **Menu Mobile** com animações suaves
- **Imagens Responsivas** com fallbacks
- **Tipografia Fluida** que se adapta ao dispositivo

### ⚡ Performance

- **Service Worker** para cache inteligente
- **Lazy Loading** de imagens e seções
- **Preload** de recursos críticos
- **Otimização de Web Vitals** (LCP, FID, CLS)
- **Compressão** e minificação automática

### ♿ Acessibilidade

- **WCAG 2.1 AA** compliance
- **Skip Navigation** links
- **ARIA Labels** e roles apropriados
- **Navegação por Teclado** completa
- **Suporte a Leitores de Tela**
- **Painel de Acessibilidade** com opções:
  - Controle de tamanho da fonte
  - Modo alto contraste
  - Modo escuro
  - Controle de animações
  - Otimizações para leitores de tela

### 📊 Analytics e Monitoramento

- **Sistema de Analytics Avançado** com tracking de:
  - Visualizações de página
  - Interações do usuário
  - Tempo na página
  - Scroll depth
  - Performance metrics
  - Heatmap de cliques
- **Monitoramento de Erros** JavaScript
- **Relatórios de Performance** automáticos

### 🔍 SEO

- **Meta Tags** otimizadas
- **Open Graph** e Twitter Cards
- **Structured Data** (JSON-LD)
- **Sitemap.xml** e robots.txt
- **URLs Canônicas**
- **Schema.org** markup para escola

### 🔧 PWA (Progressive Web App)

- **Manifest.json** configurado
- **Service Worker** registrado e funcionando
- **Cache Strategy** inteligente (Cache First para estáticos, Network First para dinâmicos)
- **Instalação** como app nativo
- **Preload** de recursos críticos

## 📁 Estrutura de Arquivos

```
/
├── index.html                 # Página principal
├── galeria.html              # Página da galeria
├── style.css                 # Estilos principais
├── gallery-responsive.css    # Estilos específicos da galeria
├── script.js                 # JavaScript principal
├── gallery.js               # JavaScript da galeria
├── testimonials.js          # Sistema de depoimentos
├── analytics.js             # Sistema de analytics
├── accessibility.js         # Sistema de acessibilidade
├── performance-optimizer.js  # Otimizações de performance
├── service-worker.js        # Service Worker para PWA
├── manifest.json            # Manifest PWA
├── sitemap.xml             # Sitemap para SEO
├── robots.txt              # Robots.txt para SEO
├── update-gallery.js       # Script para atualização da galeria
└── img/                    # Diretório de imagens
    ├── logo.png
    ├── foto-1.jpg
    ├── foto-2.jpg
    ├── foto-3.jpg
    ├── foto-4.jpg
    ├── professsores.jpg
    └── galeria/            # Imagens da galeria
```

## 🎨 Design System

### 🎨 Cores

- **Primária**: #4A90E2 (Azul)
- **Secundária**: #667eea (Azul claro)
- **Accent**: #25D366 (Verde WhatsApp)
- **Texto**: #333333
- **Background**: #ffffff

### 📝 Tipografia

- **Fonte Principal**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Hierarquia**: H1 (2.5-4rem), H2 (2-2.5rem), H3 (1.5rem)
- **Responsiva**: clamp() para tamanhos fluidos

### 🎭 Animações

- **Fade In** para elementos ao scroll
- **Hover Effects** suaves
- **Transições** de 0.3s
- **Respeita** prefers-reduced-motion

## 📱 Breakpoints Responsivos

- **Mobile**: 320px - 480px
- **Mobile Landscape**: 481px - 767px
- **Tablet**: 768px - 991px
- **Desktop**: 992px - 1199px
- **Large Desktop**: 1200px+

## 🔧 Configuração e Instalação

### Pré-requisitos

- Servidor web (Apache, Nginx, ou servidor local)
- Navegador moderno com suporte a ES6+

### Instalação

1. Clone ou baixe os arquivos
2. Configure o servidor web para servir os arquivos
3. Acesse index.html no navegador
4. Para desenvolvimento local, use um servidor como Live Server

### Configurações Opcionais

- **Analytics**: Configure seu ID do Google Analytics no analytics.js
- **Service Worker**: Ajuste os arquivos para cache no service-worker.js
- **Imagens**: Adicione suas imagens no diretório img/galeria/

## 📞 Informações de Contato

- **WhatsApp**: (85) 9 9970-1822
- **Instagram**: @colegiobabyavancar_oficial
- **Localização**: Jóquei Clube, Fortaleza - CE

## 🔄 Atualizações e Manutenção

### Adicionando Novas Imagens à Galeria

1. Adicione as imagens ao diretório `img/galeria/`
2. Edite `galeria.html` para incluir os novos itens
3. Atualize os textos alternativos (alt) para melhor SEO e acessibilidade
4. Execute `update-gallery.js` se necessário

### Correções Recentes Aplicadas

- ✅ **Domínios unificados**: Padronizado para `baby-avancar.vercel.app`
- ✅ **Service Worker**: Registrado e com caminhos corretos
- ✅ **Ícones da galeria**: Corrigidos ícones inválidos do Font Awesome
- ✅ **Acessibilidade**: Adicionados IDs para navegação e rodapé
- ✅ **Performance**: Preload de recursos críticos corrigido
- ✅ **SEO**: Textos alternativos melhorados
- ✅ **Segurança**: SRI adicionado ao Font Awesome
- ✅ **Depoimentos**: Nova seção com carrossel interativo e acessibilidade

### Atualizando Informações

- **Contato**: Edite as seções de contato em index.html
- **Sobre**: Modifique a seção "sobre" conforme necessário
- **SEO**: Atualize meta tags e structured data

### Monitoramento

- Verifique métricas de performance no console (desenvolvimento)
- Monitore analytics para insights de usuário
- Teste acessibilidade regularmente

## 🏆 Certificações e Compliance

- ✅ **WCAG 2.1 AA** - Acessibilidade
- ✅ **Core Web Vitals** - Performance
- ✅ **PWA** - Progressive Web App
- ✅ **SEO** - Otimização para motores de busca
- ✅ **Mobile-First** - Design responsivo

## 📈 Métricas de Performance

### Objetivos de Performance

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Score**: > 90

### Otimizações Implementadas

- Lazy loading de imagens
- Preload de recursos críticos
- Cache inteligente via Service Worker
- Minificação de CSS/JS
- Compressão de imagens
- CDN para recursos externos

## 🤝 Contribuição

Para contribuir com melhorias:

1. Teste todas as funcionalidades
2. Verifique compatibilidade cross-browser
3. Mantenha padrões de acessibilidade
4. Documente mudanças significativas

## 📄 Licença

© 2025 Colégio Baby Avançar. Todos os direitos reservados.

---

**"Avançando e transformando o Conhecimento"**
