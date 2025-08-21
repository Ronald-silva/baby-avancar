# Exemplo de Personalização dos Depoimentos

## Como Personalizar os Depoimentos

### 1. Editar o HTML (index.html)

Localize a seção de depoimentos e personalize:

```html
<!-- Depoimento 1 -->
<div class="testimonial-card fade-in" data-testimonial="1">
  <div class="testimonial-content">
    <div class="testimonial-quote">
      <i class="fas fa-quote-left quote-icon"></i>
      <p>
        "Seu depoimento personalizado aqui..."
      </p>
      <i class="fas fa-quote-right quote-icon"></i>
    </div>
    <div class="testimonial-author">
      <div class="author-avatar">
        <i class="fas fa-user-circle"></i>
      </div>
      <div class="author-info">
        <h4>Nome do Autor</h4>
        <p>Descrição do autor</p>
        <div class="rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 2. Personalizar o CSS (css/components/testimonials.css)

#### Cores dos cards:
```css
.testimonial-card {
  background: var(--white); /* Cor de fundo */
  border-radius: var(--border-radius-lg); /* Arredondamento */
}

.testimonial-card::before {
  background: var(--gradient-primary); /* Linha superior colorida */
}
```

#### Cores das estrelas:
```css
.rating i {
  color: #ffd700; /* Cor dourada das estrelas */
}
```

#### Cores dos ícones de citação:
```css
.quote-icon {
  color: var(--primary-blue); /* Cor dos ícones de aspas */
}
```

### 3. Funcionalidades JavaScript (js/testimonials.js)

#### Velocidade do autoplay:
```javascript
this.autoPlayDelay = 5000; // 5 segundos entre depoimentos
```

#### Controles de teclado:
- **Setas esquerda/direita**: Navegar entre depoimentos
- **Home**: Primeiro depoimento
- **End**: Último depoimento
- **Ctrl/Cmd + Shift + T**: Focar na seção

### 4. Adicionar Mais Depoimentos

1. **Adicionar novo card HTML**:
```html
<div class="testimonial-card fade-in" data-testimonial="4">
  <!-- Conteúdo do depoimento -->
</div>
```

2. **Adicionar ponto de navegação**:
```html
<button class="nav-dot" data-testimonial="4" aria-label="Ver depoimento 4"></button>
```

3. **Atualizar JavaScript**:
```javascript
this.totalTestimonials = 4; // Atualizar total
```

### 5. Personalizar Avaliações

#### 5 estrelas (excelente):
```html
<div class="rating">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
</div>
```

#### 4 estrelas (muito bom):
```html
<div class="rating">
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="fas fa-star"></i>
  <i class="far fa-star"></i> <!-- Estrela vazia -->
</div>
```

### 6. Ícones Disponíveis

#### Avatares alternativos:
- `fas fa-user-circle` - Usuário genérico
- `fas fa-user-graduate` - Estudante
- `fas fa-user-tie` - Profissional
- `fas fa-user-nurse` - Profissional de saúde
- `fas fa-user-graduate` - Graduado

#### Ícones de citação alternativos:
- `fas fa-quote-left` / `fas fa-quote-right` - Aspas padrão
- `fas fa-comment` - Comentário
- `fas fa-heart` - Coração (para depoimentos emocionais)

### 7. Responsividade

A seção é totalmente responsiva:
- **Desktop**: 3 colunas
- **Tablet**: 2 colunas
- **Mobile**: 1 coluna

### 8. Acessibilidade

- **ARIA labels** para navegação
- **Controles de teclado** completos
- **Anúncios para leitores de tela**
- **Foco visível** em todos os elementos
- **Contraste** otimizado

### 9. Performance

- **Lazy loading** das animações
- **Intersection Observer** para otimização
- **Autoplay inteligente** (pausa na interação)
- **Cache** via Service Worker

### 10. Exemplo de Depoimento Realista

```html
<div class="testimonial-card fade-in" data-testimonial="1">
  <div class="testimonial-content">
    <div class="testimonial-quote">
      <i class="fas fa-quote-left quote-icon"></i>
      <p>
        "Meu filho começou no Baby Avançar com 3 anos e hoje, com 6, 
        está lendo e escrevendo perfeitamente. A equipe é incrível e 
        o desenvolvimento dele superou todas as expectativas!"
      </p>
      <i class="fas fa-quote-right quote-icon"></i>
    </div>
    <div class="testimonial-author">
      <div class="author-avatar">
        <i class="fas fa-user-graduate"></i>
      </div>
      <div class="author-info">
        <h4>Ana Paula Santos</h4>
        <p>Mãe do Lucas, 6 anos - 1º Ano</p>
        <div class="rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

**Dica**: Mantenha os depoimentos autênticos e específicos, mencionando benefícios concretos e resultados observáveis. 