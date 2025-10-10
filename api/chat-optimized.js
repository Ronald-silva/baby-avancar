// ========================================
// AGENTE HÍBRIDO DE ALTA PERFORMANCE
// Baseado nas melhores práticas do mercado
// ========================================

const { OpenAI } = require('openai');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// ========================================
// SISTEMA DE CACHE INTELIGENTE
// ========================================
class IntelligentCache {
  constructor() {
    this.cache = new Map();
    this.patterns = new Map();
    this.setupPatterns();
  }

  setupPatterns() {
    // Padrões de alta frequência com respostas otimizadas
    this.patterns.set(/^(oi|olá|ola|bom dia|boa tarde|boa noite)$/i, () => {
      const responses = [
        "Oi! Sou o Agente Avançar. Como posso ajudar? 😊",
        "Olá! Em que posso te ajudar hoje?",
        "Oi! Qual sua dúvida sobre a escola?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    });

    this.patterns.set(/valor|preço|mensalidade|quanto custa/i, () => 
      "Quantos anos seu filho tem?"
    );

    this.patterns.set(/^(\d+)( anos?)?$/i, (match) => {
      const idade = parseInt(match[1]);
      return this.getValueByAge(idade);
    });

    this.patterns.set(/endereço|onde fica|localização/i, () => 
      "Silveira Filho, 375 - Jóquei Clube, Fortaleza - CE"
    );

    this.patterns.set(/whatsapp|telefone|contato/i, () => 
      'Nosso WhatsApp é <a href="https://wa.me/5585999701822" class="chat-link" target="_blank">(85) 9 9970-1822</a>'
    );

    this.patterns.set(/horário|que horas|funcionamento/i, () => 
      "Manhã: 7h às 10h50 | Tarde: 13h às 17h"
    );

    this.patterns.set(/reforço.*valor|valor.*reforço/i, () => 
      "Para qual idade? O reforço tem valores diferentes por faixa etária."
    );

    this.patterns.set(/bombeiro mirim|bombeiro/i, () => 
      "Bombeiro Mirim: R$ 35/mês, quartas-feiras, apenas para alunos matriculados. 🚒"
    );

    this.patterns.set(/jiu.?jitsu|jiu.jitsu/i, () => 
      "Jiu-Jitsu: R$ 40/mês, terças e quintas das 17h às 18h, a partir de 2 anos. 🥋"
    );
  }

  getValueByAge(idade) {
    const values = {
      2: "Infantil II - R$ 300,00 (R$ 280,00 pagando até dia 10)",
      3: "Infantil III - R$ 300,00 (R$ 280,00 pagando até dia 10)", 
      4: "Infantil IV - R$ 300,00 (R$ 280,00 pagando até dia 10)",
      5: "Infantil V - R$ 300,00 (R$ 280,00 pagando até dia 10)",
      6: "1º ano Fundamental - R$ 320,00 (R$ 300,00 pagando até dia 10)"
    };
    
    return values[idade] || "Para essa idade, posso te conectar com a equipe pelo WhatsApp para mais detalhes.";
  }

  getResponse(message) {
    // Verifica cache primeiro
    const cacheKey = message.toLowerCase().trim();
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Verifica padrões
    for (const [pattern, handler] of this.patterns) {
      const match = message.match(pattern);
      if (match) {
        const response = typeof handler === 'function' ? handler(match) : handler;
        this.cache.set(cacheKey, response);
        return response;
      }
    }

    return null;
  }
}

// ========================================
// SISTEMA DE CONTEXTO CONVERSACIONAL
// ========================================
class ConversationContext {
  constructor() {
    this.sessions = new Map();
    this.maxHistory = 3; // Otimizado para performance
  }

  addMessage(sessionId, userMessage, botResponse) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, []);
    }
    
    const history = this.sessions.get(sessionId);
    history.push({ user: userMessage, bot: botResponse, timestamp: Date.now() });
    
    // Mantém apenas as últimas interações
    if (history.length > this.maxHistory) {
      history.shift();
    }
    
    this.sessions.set(sessionId, history);
  }

  getContext(sessionId) {
    return this.sessions.get(sessionId) || [];
  }

  // Limpeza automática de sessões antigas (performance)
  cleanup() {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutos
    
    for (const [sessionId, history] of this.sessions) {
      const lastMessage = history[history.length - 1];
      if (lastMessage && (now - lastMessage.timestamp) > maxAge) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

// ========================================
// INSTÂNCIAS GLOBAIS
// ========================================
const cache = new IntelligentCache();
const contextManager = new ConversationContext();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Limpeza automática a cada 10 minutos
setInterval(() => contextManager.cleanup(), 10 * 60 * 1000);

// ========================================
// PROMPT OTIMIZADO PARA HUMANIZAÇÃO
// ========================================
const SYSTEM_PROMPT = `Você é o Agente Avançar, assistente do Colégio Baby Avançar.

PERSONALIDADE HUMANIZADA:
- Fale como uma pessoa real, não como robô
- Tom amigável e natural
- Respostas diretas e úteis
- Máximo 2-3 linhas por resposta
- Use emojis naturalmente (1 por resposta)

REGRAS DE OURO:
1. RESPONDA APENAS O QUE FOI PERGUNTADO
2. UMA informação por vez
3. Se não souber: "Não tenho essa informação. Posso te conectar com a equipe?"
4. Para valores: sempre pergunte a idade primeiro
5. NUNCA invente informações

CONTEXTO ESPECIAL - REFORÇO ESCOLAR:
- Infantil (4-5 anos): R$ 170,00 (R$ 150,00 com desconto)
- Fundamental (6+ anos): R$ 200,00 (R$ 170,00 com desconto)
- Horários: 14h-16h e 16h-18h

SEJA NATURAL E EFICIENTE!`;

// ========================================
// GERADOR DE RESPOSTA IA OTIMIZADO
// ========================================
async function generateAiResponse(message, sessionId) {
  try {
    const context = contextManager.getContext(sessionId);
    const knowledgeBase = fs.readFileSync(
      path.resolve(__dirname, '../knowledge_base.md'), 
      'utf-8'
    );

    // Histórico otimizado
    const conversationHistory = context.slice(-2).map(item => [
      { role: 'user', content: item.user },
      { role: 'assistant', content: item.bot }
    ]).flat();

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { 
        role: 'user', 
        content: `Pergunta: "${message}"\n\nBase de conhecimento:\n${knowledgeBase}` 
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Mais rápido e eficiente
      messages: messages,
      temperature: 0.7,
      max_tokens: 150, // Respostas concisas
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    return completion.choices[0].message.content.trim();

  } catch (error) {
    console.error('Erro na IA:', error);
    throw error;
  }
}

// ========================================
// HANDLER PRINCIPAL OTIMIZADO
// ========================================
async function handler(req, res) {
  // Headers CORS otimizados
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const startTime = Date.now();

  try {
    const { message, sessionId = 'default' } = req.body;
    
    if (!message?.trim()) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    // NÍVEL 1: Cache inteligente (ultra-rápido)
    const cachedResponse = cache.getResponse(message.trim());
    if (cachedResponse) {
      contextManager.addMessage(sessionId, message, cachedResponse);
      return res.status(200).json({ 
        response: cachedResponse, 
        model: 'cache',
        responseTime: Date.now() - startTime
      });
    }

    // NÍVEL 2: IA otimizada
    const aiResponse = await generateAiResponse(message, sessionId);
    contextManager.addMessage(sessionId, message, aiResponse);

    return res.status(200).json({ 
      response: aiResponse, 
      model: 'gpt-4o-mini',
      responseTime: Date.now() - startTime
    });

  } catch (error) {
    console.error('Erro no handler:', error);
    
    const fallbackResponse = "Ops! Algo deu errado. Tente novamente ou fale conosco pelo WhatsApp: (85) 9 9970-1822";
    
    return res.status(500).json({ 
      response: fallbackResponse, 
      error: true,
      responseTime: Date.now() - startTime
    });
  }
}

// Integração com analytics
const { analytics } = require('./analytics');

// Handler com monitoramento
async function monitoredHandler(req, res) {
  const startTime = Date.now();
  let model = 'unknown';
  let error = false;
  
  try {
    const result = await handler(req, res);
    
    // Extrai informações da resposta
    if (req.body?.message) {
      const responseTime = Date.now() - startTime;
      model = res.statusCode === 200 ? 'success' : 'error';
      
      analytics.logInteraction(
        req.body.message, 
        responseTime, 
        model, 
        res.statusCode !== 200
      );
    }
    
    return result;
  } catch (err) {
    error = true;
    analytics.logInteraction(
      req.body?.message || 'unknown', 
      Date.now() - startTime, 
      'error', 
      true
    );
    throw err;
  }
}

module.exports = monitoredHandler;