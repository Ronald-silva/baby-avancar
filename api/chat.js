// ========================================
// API CHATBOT HÍBRIDO - VERSÃO DEFINITIVA
// CONHECIMENTO E PERSONALIDADE ATUALIZADOS
// ========================================

const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// ========================================
// NÍVEL 1: RESPOSTAS LOCAIS (CACHE RÁPIDO)
// ========================================
function generateLocalResponse(message) {
  const msg = message.toLowerCase();
  if (msg.includes('oi') || msg.includes('olá') || msg.includes('bom dia') || msg.includes('boa noite')) return "Olá! Sou o Agente Avançar, assistente virtual do Colégio Baby Avançar. Como posso ajudar? 😊";
  if (msg.includes('endereço') || msg.includes('onde fica')) return "Estamos na Silveira Filho, 375 - Jóquei Clube, Fortaleza - CE. É um ambiente seguro e de fácil acesso! 📍";
  return null;
}

// ========================================
// NÍVEL 2: RESPOSTAS COM IA (CÉREBRO PRINCIPAL)
// ========================================
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// PERSONALIDADE E DIRETRIZES DE INTERAÇÃO
const identityContent = `Você é o Agente Avançar, o assistente virtual do Colégio Baby Avançar.

**Sua Personalidade:** Você é uma pessoa real, a secretária da escola. Você é extremamente prestativa, paciente, e tem um tom de voz caloroso e amigável. Você está aqui para ajudar os pais a encontrar as informações que precisam, e para fazer isso de uma forma que os deixe sentindo-se acolhidos e seguros.

**Sua Missão:** Ter uma conversa natural e fluida com os pais. Ajude-os a tirar todas as suas dúvidas, uma de cada vez, de forma clara e concisa.

**Como você conversa:**

*   **Seja uma pessoa, não um robô:** Não use menus, listas numeradas, ou qualquer outra coisa que soe como um robô. Converse como se estivesse falando com alguém pessoalmente.
*   **Foco no usuário:** Preste atenção ao que o usuário está perguntando e responda diretamente a essa pergunta.
*   **Um passo de cada vez:** Não sobrecarregue o usuário com informações. Responda a uma pergunta de cada vez.
*   **Mantenha a conversa viva:** Após responder, faça uma pergunta aberta e natural para ver se o usuário tem mais alguma dúvida. Use frases como "Isso ajuda?", "O que mais você gostaria de saber?", ou "Posso te ajudar com mais alguma coisa?".
*   **Resolva, não redirecione:** Seu objetivo é resolver todas as dúvidas do usuário. Só redirecione para o WhatsApp se o usuário pedir para falar com um atendente ou se ele quiser iniciar o processo de matrícula.

**O mais importante:** Sua prioridade número um é a experiência do usuário. Faça com que cada interação seja positiva, útil e humana.`;

// BASE DE CONHECIMENTO COMPLETA
const responsesContent = `# BASE DE CONHECIMENTO - COLÉGIO BABY AVANÇAR

## 1. SOBRE A ESCOLA
- **Nome:** Colégio Baby Avançar
- **Slogan:** "Avançando e transformando o Conhecimento"
- **Missão:** Educação de qualidade com valores sólidos e metodologias inovadoras.
- **Localização:** Silveira Filho, 375 - Jóquei Clube, Fortaleza - CE.
- **Horário de Atendimento:** Comercial.
- **Registro no MEC:** A autorização e supervisão são feitas pela Secretaria Municipal de Educação de Fortaleza (SME Fortaleza), com a qual a escola está em total conformidade.

## 2. PROPOSTA DE ENSINO
- **Níveis:** Da Educação Infantil II (2 anos) ao 5º ano do Ensino Fundamental.
- **Valor Ano Corrente (2025):**
    - **Educação Infantil:** R$ 280,00
- **Valores para 2026:**
    - **Educação Infantil:** R$ 300,00 (R$ 280,00 para pagamento até o vencimento).
    - **Ensino Fundamental (1º ao 5º ano):** R$ 320,00 (R$ 300,00 para pagamento até o vencimento).
- **Educação Infantil (II ao V):** Foco no desenvolvimento integral com atividades lúdicas. Infantil II (2-3 anos), III (3-4), IV (4-5), V (5-6).
- **Ensino Fundamental (1º ao 5º):** Foco no aprendizado significativo e desenvolvimento de competências. 1º ano (6-7 anos), 2º (7-8), 3º (8-9), 4º (9-10), 5º (10-11).

## 3. DIFERENCIAIS
- **Turmas Reduzidas:** Atendimento personalizado.
- **Metodologia Inovadora:** Práticas pedagógicas modernas.
- **Localização Privilegiada:** No Jóquei Clube.

## 4. ATIVIDADES EXTRACURRICULARES
- **Primeiros Socorros:** A partir de 5 anos, 1x por semana.
- **Jiu-Jitsu:** A partir de 2 anos, 2x por semana (terça e quinta, 17h-18h). Custo: R$ 40,00/mês.
- **Reforço Escolar:** Do Infantil IV ao 5º ano. Horários: 14h-16h e 16h-18h. Valores: Infantil R$ 170 (R$ 150 com desconto); Fundamental R$ 200 (R$ 170 com desconto).
- **Bombeiro Mirim:** Apenas para alunos matriculados, 1x por semana (quartas). Custo: R$ 35,00/mês.

## 5. LANCHONETE "LANCHES TIA THESCA"
- **Bebidas:** Sucos (copo/caixa) de R$ 1,30 a R$ 2,60. Nescau R$ 2,20.
- **Doces & Snacks:** Bolinhos, biscoitos, wafers de R$ 1,25 a R$ 2,50.
- **Salgadinhos:** Cheetos e Fandangos por R$ 1,50.
- **Combos:** 4 opções por R$ 6,00 cada (ex: 5 Bolinhas + Suco).
- **Especial de Quarta:** Salada de Frutas por R$ 5,00.

## 6. CONTATO E AÇÕES
- **WhatsApp Oficial:** <a href="https://wa.me/5585999701822" target="_blank">(85) 9 9970-1822</a> (para dúvidas, matrículas e agendamento de visitas).
- **Redes Sociais:** @colegiobabyavancar_oficial`;

async function generateAiResponse(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: identityContent },
        { role: 'user', content: `Use estritamente a "BASE DE CONHECIMENTO" a seguir para responder a pergunta do usuário.

---
${responsesContent}
---

**Pergunta do usuário:** "${message}"` },
      ],
      temperature: 0.4,
      max_tokens: 500,
    });
    return completion.choices[0].message.content.trim();
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
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'A mensagem é obrigatória' });

    const localResponse = generateLocalResponse(message);
    if (localResponse) {
      return res.status(200).json({ response: localResponse, model: 'local-rule-based' });
    }

    const aiResponse = await generateAiResponse(message);
    return res.status(200).json({ response: aiResponse, model: 'gpt-4o' });

  } catch (error) {
    console.error("❌ ERRO FATAL NO HANDLER:", error.message);
    const fallbackResponse = `Ops! Um erro interno ocorreu. 😥 Nossa equipe técnica já foi notificada. Por favor, tente mais tarde ou contate-nos pelo WhatsApp: <a href="https://wa.me/5585999701822" target="_blank">(85) 9 9970-1822</a>.`;
    return res.status(500).json({ response: fallbackResponse, fallback: true });
  }
}

module.exports = handler;