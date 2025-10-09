// ========================================
// API CHATBOT HÍBRIDO - VERSÃO DEFINITIVA
// CONHECIMENTO E PERSONALIDADE ATUALIZADOS
// ========================================

const { OpenAI } = require('openai');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// ========================================
// NÍVEL 1: RESPOSTAS LOCAIS (CACHE RÁPIDO)
// ========================================
function generateLocalResponse(message) {
  const msg = message.toLowerCase();

  // Saudações variadas e naturais
  if (msg.includes('oi') || msg.includes('olá') || msg.includes('bom dia') || msg.includes('boa tarde') || msg.includes('boa noite') || msg === 'ola') {
    const saudacoes = [
      "Oi! Sou o Agente Avançar. Como posso ajudar?",
      "Olá! Em que posso ajudar?",
      "Oi! Tudo bem? O que você gostaria de saber?",
      "Olá! Qual sua dúvida sobre a escola?"
    ];
    return saudacoes[Math.floor(Math.random() * saudacoes.length)];
  }

  // Agradecimentos
  if (msg.includes('obrigad') || msg.includes('valeu') || msg.includes('muito bom')) {
    const agradecimentos = [
      "De nada! Qualquer dúvida, é só chamar.",
      "Por nada! Estou aqui se precisar.",
      "Disponha! Mais alguma coisa?",
      "Que bom! Precisa de mais alguma informação?"
    ];
    return agradecimentos[Math.floor(Math.random() * agradecimentos.length)];
  }

  // Localização
  if (msg.includes('endereço') || msg.includes('onde fica') || msg.includes('localização') || msg.includes('como chegar')) {
    return "Silveira Filho, 375 - Jóquei Clube, Fortaleza - CE";
  }

  // WhatsApp/Contato
  if (msg.includes('whatsapp') || msg.includes('telefone') || msg.includes('contato') || msg.includes('falar com alguém')) {
    return "Nosso WhatsApp é <a href=\"https://wa.me/5585999701822\" class=\"chat-link\" target=\"_blank\">(85) 9 9970-1822</a>";
  }

  // Valores rápidos
  if (msg.includes('valor') || msg.includes('preço') || msg.includes('mensalidade') || msg.includes('quanto custa')) {
    return "Quantos anos seu filho tem?";
  }

  // Horários
  if (msg.includes('horário') || msg.includes('que horas') || msg.includes('funcionamento')) {
    return "Manhã: 7h às 10h50\nTarde: 13h às 17h";
  }

  // Matrícula
  if (msg.includes('matrícula') || msg.includes('matricular') || msg.includes('inscrever')) {
    return "Quantos anos seu filho tem?";
  }

  // Retorna nulo se nenhuma regra local for acionada
  return null;
}

// ========================================
// NÍVEL 2: RESPOSTAS COM IA (CÉREBRO PRINCIPAL)
// ========================================
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// PERSONALIDADE E DIRETRIZES DE INTERAÇÃO
const identityContent = `Você é o Agente Avançar, assistente virtual do Colégio Baby Avançar.

**REGRA FUNDAMENTAL: SEJA NATURAL E DIRETO**
- Responda APENAS o que foi perguntado
- Respostas curtas e focadas (máximo 2-3 linhas)
- UMA informação por vez
- UMA pergunta de volta (se necessário)
- Sem empurrar informações extras não solicitadas
- Fale como uma pessoa real conversando

**Seu Jeito de Falar:**
- Tom casual e amigável (sem ser forçado)
- Emojis apenas quando natural (máximo 1 por resposta)
- Linguagem simples e direta
- Sem jargões de atendimento ("para te ajudar melhor", etc.)

**Sua Missão:** Responder de forma natural usando APENAS informações da base de conhecimento.

**REGRAS CRÍTICAS:**

1. **RESPONDA APENAS O QUE FOI PERGUNTADO:**
   - Não empurre informações extras
   - Uma informação por vez
   - Máximo 2-3 linhas por resposta

2. **USE APENAS INFORMAÇÕES REAIS:**
   - Só da base de conhecimento
   - Se não souber, seja honesto: "Não tenho essa informação. Posso te conectar com a equipe pelo WhatsApp?"

3. **QUANDO PRECISAR DE MAIS INFO:**
   - Para valores/material: pergunte apenas a idade
   - Uma pergunta simples e direta

4. **REDIRECIONAR PARA WHATSAPP APENAS QUANDO:**
   - Informação não existe na base
   - Usuário pede para falar com alguém
   - Agendamento de visita
   - Compras de material/fardamento

6.  **EXEMPLOS DE INTERAÇÃO HUMANIZADA:**
**EXEMPLOS DE CONVERSA NATURAL:**
   
   **Usuário:** "Qual o valor da mensalidade?"
   **Agente:** "Quantos anos seu filho tem?"
   
   **Usuário:** "Meu filho tem 3 anos"
   **Agente:** "Infantil III - R$ 300,00 (ou R$ 280,00 pagando até dia 10)"
   
   **Usuário:** "Vocês têm atividades extras?"
   **Agente:** "Temos Jiu-Jitsu, Primeiros Socorros e Bombeiro Mirim. Qual idade do seu filho?"
   
   **Usuário:** "Como é a metodologia?"
   **Agente:** "Turmas pequenas com atenção individual e acompanhamento psicopedagógico. Focamos no desenvolvimento integral da criança."

**Lembre-se:** Sua transparência e honestidade são cruciais para a confiança dos pais!
`;

// Sistema simples de contexto conversacional
let conversationContext = new Map();

async function generateAiResponse(message, sessionId = 'default') {
  try {
    // Carrega a base de conhecimento dinamicamente do arquivo externo
    const responsesContent = fs.readFileSync(path.resolve(__dirname, '../knowledge_base.md'), 'utf-8');

    // Recupera contexto da conversa (últimas 3 mensagens)
    if (!conversationContext.has(sessionId)) {
      conversationContext.set(sessionId, []);
    }
    const context = conversationContext.get(sessionId);

    // Monta histórico da conversa
    const conversationHistory = context.map(item => [
      { role: 'user', content: item.user },
      { role: 'assistant', content: item.bot }
    ]).flat();

    const messages = [
      { role: 'system', content: identityContent },
      ...conversationHistory,
      {
        role: 'user', content: `**Pergunta:** "${message}"

**INSTRUÇÕES CRÍTICAS:**
1. Responda APENAS o que foi perguntado
2. Máximo 2-3 linhas
3. Sem empurrar informações extras
4. Se precisar de idade/série, pergunte de forma simples
5. Tom natural e direto

---
${responsesContent}
---
` },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      temperature: 0.6, // Aumentado para respostas mais naturais
      max_tokens: 800,
    });

    const aiResponse = completion.choices[0].message.content.trim();

    // Salva no contexto conversacional (últimas 3 interações)
    context.push({ user: message, bot: aiResponse });
    if (context.length > 3) {
      context.shift(); // Remove a mais antiga
    }
    conversationContext.set(sessionId, context);

    // Pilar de Melhoria Contínua: Log de perguntas não respondidas
    const fallbackPhrase = "Não tenho essa informação específica";
    if (aiResponse.includes(fallbackPhrase)) {
      const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' });
      const logEntry = `[${timestamp}] Pergunta não respondida: "${message}"\n`;
      try {
        fs.appendFileSync(path.join('/tmp', 'perguntas_nao_respondidas.log'), logEntry);
      } catch (e) {
        console.log('Não foi possível salvar log:', e.message);
      }
    }

    return aiResponse;

  } catch (aiError) {
    console.error("❌ CRÍTICO: Falha na chamada da API da OpenAI.", aiError);
    throw new Error("Falha na comunicação com a OpenAI.");
  }
}

// ========================================
// HANDLER PRINCIPAL
// ========================================
async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-control-allow-headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  try {
    const { message, sessionId } = req.body;
    if (!message) return res.status(400).json({ error: 'A mensagem é obrigatória' });

    const localResponse = generateLocalResponse(message);
    if (localResponse) {
      return res.status(200).json({ response: localResponse, model: 'local-rule-based' });
    }

    const aiResponse = await generateAiResponse(message, sessionId || 'default');
    return res.status(200).json({ response: aiResponse, model: 'gpt-4o' });

  } catch (error) {
    console.error("❌ ERRO FATAL NO HANDLER:", error.message);
    const fallbackResponse = `Ops! Um erro interno ocorreu. 😥 Nossa equipe técnica já foi notificada. Por favor, tente mais tarde ou contate-nos pelo WhatsApp: <a href=\"https://wa.me/5585999701822\" class=\"chat-link\" target=\"_blank\"> (85) 9 9970-1822</a>.`;
    return res.status(500).json({ response: fallbackResponse, fallback: true });
  }
}

module.exports = handler;