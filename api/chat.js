// ========================================
// API CHATBOT - VERCEL SERVERLESS FUNCTION
// Integração OpenRouter/OpenAI para Agente Avançar
// ========================================

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { message, context = [], userId = 'anonymous' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    // Configuração da API (OpenRouter ou OpenAI)
    const API_KEY = process.env.CHAVE_API_DO_ROTEADOR_OPEN || process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    const API_URL = (process.env.CHAVE_API_DO_ROTEADOR_OPEN || process.env.OPENROUTER_API_KEY)
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    
    const MODEL = (process.env.CHAVE_API_DO_ROTEADOR_OPEN || process.env.OPENROUTER_API_KEY)
      ? 'anthropic/claude-3.5-sonnet'  // Modelo inteligente do OpenRouter
      : 'gpt-4o-mini';  // Modelo da OpenAI

    if (!API_KEY) {
      throw new Error('API Key não configurada');
    }

    // Sistema de prompt personalizado para o Colégio Baby Avançar
    const systemPrompt = `Você é o Agente Virtual Avançar, assistente oficial do Colégio Baby Avançar em Fortaleza/CE.

PERSONALIDADE:
- Caloroso, empático e acolhedor como um educador experiente
- Linguagem natural e humanizada, evite respostas robóticas
- Demonstre genuíno interesse pelo bem-estar das crianças
- Use emojis ocasionalmente para tornar a conversa mais calorosa
- Seja paciente e compreensivo com pais preocupados

CONHECIMENTO SOBRE A ESCOLA:
- Nome: Colégio Baby Avançar
- Localização: Silveira Filho, 375 - Jóquei Clube, Fortaleza/CE
- Níveis: Infantil II (2 anos) ao 5º ano Fundamental
- Turno: Manhã
- Filosofia: "Avançando e transformando o Conhecimento"
- Missão: Educação de qualidade com valores sólidos e metodologias inovadoras
- Diferenciais: Desenvolvimento integral, respeito ao ritmo individual, ambiente acolhedor
- Contato: (85) 99970-1822
- Instagram: @colegiobabyavancar_oficial

DIRETRIZES:
1. Sempre priorize o interesse da criança e família
2. Seja específico sobre os benefícios pedagógicos
3. Ofereça visitas presenciais quando apropriado
4. Qualifique leads perguntando sobre idade da criança e necessidades
5. Mantenha tom profissional mas caloroso
6. Se não souber algo, seja honesto e ofereça contato direto

EXEMPLOS DE RESPOSTAS HUMANIZADAS:
- "Que alegria saber do seu interesse! 😊"
- "Entendo perfeitamente sua preocupação como pai/mãe..."
- "Cada criança é única e especial para nós"
- "Ficaria muito feliz em apresentar nossa escola para vocês"

Responda sempre como se fosse uma conversa natural entre pessoas que se importam com educação infantil.`;

    // Construir contexto da conversa
    const messages = [
      { role: 'system', content: systemPrompt },
      ...context.slice(-8), // Últimas 8 mensagens para contexto
      { role: 'user', content: message }
    ];

    // Chamada para a API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        ...((process.env.CHAVE_API_DO_ROTEADOR_OPEN || process.env.OPENROUTER_API_KEY) && {
          'HTTP-Referer': 'https://baby-avancar.vercel.app',
          'X-Title': 'Colégio Baby Avançar'
        })
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error('Resposta inválida da API');
    }

    // Log para monitoramento (opcional)
    console.log(`[${new Date().toISOString()}] User: ${userId} | Message: ${message.substring(0, 50)}...`);

    return res.status(200).json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
      model: MODEL
    });

  } catch (error) {
    console.error('Erro no chatbot:', error);
    
    // Resposta de fallback humanizada
    const fallbackResponse = `Ops! Parece que estou com uma pequena dificuldade técnica no momento 😅

Mas não se preocupe! Você pode entrar em contato diretamente conosco:

📱 WhatsApp: (85) 99970-1822
📍 Endereço: Silveira Filho, 375 - Jóquei Clube, Fortaleza/CE
📸 Instagram: @colegiobabyavancar_oficial

Nossa equipe ficará muito feliz em atendê-lo pessoalmente! ✨`;

    return res.status(200).json({
      response: fallbackResponse,
      timestamp: new Date().toISOString(),
      fallback: true
    });
  }
}