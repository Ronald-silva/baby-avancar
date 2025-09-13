# 🤖 Agente Virtual Avançar - Setup Completo

## 🚀 Deploy no Vercel

### 1. **Preparação**
```bash
# Clone o projeto
git clone <seu-repositorio>
cd baby-avancar

# Instale dependências (se houver)
npm install
```

### 2. **Configuração das APIs**

#### **Opção A: OpenRouter (Recomendado para testes)**
1. Acesse: https://openrouter.ai/
2. Crie uma conta e obtenha sua API key
3. Modelos recomendados:
   - `anthropic/claude-3.5-sonnet` (Mais inteligente)
   - `meta-llama/llama-3.1-8b-instruct:free` (Gratuito)
   - `google/gemma-2-9b-it:free` (Gratuito)

#### **Opção B: OpenAI (Para produção)**
1. Acesse: https://platform.openai.com/
2. Crie uma conta e adicione créditos
3. Obtenha sua API key
4. Modelo recomendado: `gpt-4o-mini` (Custo-benefício)

### 3. **Deploy no Vercel**

#### **Via Dashboard:**
1. Acesse: https://vercel.com/
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `OPENROUTER_API_KEY` = sua_chave_openrouter
   - OU `OPENAI_API_KEY` = sua_chave_openai

#### **Via CLI:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis
vercel env add OPENROUTER_API_KEY
vercel env add OPENAI_API_KEY
```

### 4. **Estrutura dos Arquivos**
```
baby-avancar/
├── api/
│   └── chat.js          # API serverless do chatbot
├── js/
│   └── chatbot.js       # Frontend do chatbot
├── css/
│   └── components/
│       └── chatbot.css  # Estilos do chat
├── vercel.json          # Configuração do Vercel
└── .env.example         # Exemplo de variáveis
```

## 🧠 Funcionalidades do Agente

### **Inteligência Artificial**
- ✅ Processamento de linguagem natural
- ✅ Contexto de conversação
- ✅ Respostas humanizadas
- ✅ Qualificação de leads
- ✅ Análise de sentimentos

### **Conhecimento Especializado**
- 📚 Informações completas sobre o colégio
- 🎯 Metodologia pedagógica
- 📍 Localização e contatos
- 💰 Processo de matrícula
- 👨‍👩‍👧‍👦 Orientação para pais

### **Experiência do Usuário**
- 💬 Interface moderna e responsiva
- ⚡ Respostas rápidas e contextuais
- 📱 Funciona em mobile e desktop
- 🎨 Design integrado ao site
- 🔄 Fallback para respostas offline

## 📊 Monitoramento

### **Logs no Vercel**
- Acesse o dashboard do Vercel
- Vá em "Functions" → "chat.js"
- Monitore logs em tempo real

### **Métricas Importantes**
- Taxa de resposta da API
- Tempo de resposta
- Qualidade das conversas
- Taxa de conversão de leads

## 🛠️ Customização

### **Personalidade do Agente**
Edite em `api/chat.js`:
```javascript
const systemPrompt = `Você é o Agente Virtual Avançar...`
```

### **Conhecimento da Escola**
Atualize informações em:
- `api/chat.js` (sistema de prompt)
- `js/chatbot.js` (KNOWLEDGE_BASE)

### **Aparência**
Modifique em `css/components/chatbot.css`

## 🔧 Troubleshooting

### **Chatbot não responde**
1. Verifique se a API key está configurada
2. Veja os logs no Vercel Dashboard
3. Teste a API diretamente: `/api/chat`

### **Respostas genéricas**
1. Verifique se o prompt está correto
2. Ajuste a temperatura do modelo
3. Melhore o contexto da conversa

### **Erro de CORS**
1. Verifique o `vercel.json`
2. Confirme os headers da API
3. Teste em diferentes navegadores

## 💡 Dicas de Otimização

### **Performance**
- Use `gpt-4o-mini` para melhor custo-benefício
- Limite o contexto a 8-10 mensagens
- Implemente cache para respostas comuns

### **Qualidade**
- Teste diferentes prompts
- Monitore conversas reais
- Ajuste baseado no feedback dos usuários

### **Custos**
- OpenRouter: ~$0.001 por mensagem
- OpenAI: ~$0.002 por mensagem
- Monitore uso no dashboard das APIs

## 🎯 Próximos Passos

1. **Deploy inicial** com OpenRouter
2. **Teste extensivo** com usuários reais
3. **Otimização** baseada em dados
4. **Migração** para OpenAI se necessário
5. **Integração** com CRM/WhatsApp

---

**🚀 Seu agente inteligente está pronto para transformar visitantes em alunos!**