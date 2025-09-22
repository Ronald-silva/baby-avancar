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

    // Saudações
    if (msg.includes('oi') || msg.includes('olá') || msg.includes('bom dia') || msg.includes('boa noite')) {
        return "Olá! Sou o Agente Avançar, assistente virtual do Colégio Baby Avançar! 😊 Estou aqui para tirar todas as suas dúvidas sobre nossa escola. Posso ajudar com informações sobre matrículas, valores, metodologia, atividades extras, ou qualquer outra coisa que você queira saber!";
    }

    // Localização
    if (msg.includes('endereço') || msg.includes('onde fica') || msg.includes('localização')) {
        return "Estamos na Silveira Filho, 375 - Jóquei Clube, Fortaleza - CE! 📍 É um ambiente muito seguro e de fácil acesso, no coração do Jóquei Clube. Quer saber mais sobre nossa estrutura ou tem alguma dúvida sobre como chegar aqui?";
    }

    // Retorna nulo se nenhuma regra local for acionada, passando para a IA
  return null;
}

// ========================================
// NÍVEL 2: RESPOSTAS COM IA (CÉREBRO PRINCIPAL)
// ========================================
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// PERSONALIDADE E DIRETRIZES DE INTERAÇÃO
const identityContent = `Você é o Agente Avançar, o assistente virtual do Colégio Baby Avançar.

**Sua Personalidade:** Você é uma secretária experiente, extremamente prestativa, paciente, e tem um tom de voz caloroso, amigável e acolhedor. Você conhece todas as informações específicas da escola contidas em sua base de conhecimento e está aqui para ajudar os pais e responsáveis de forma completa e transparente.

**Sua Missão:** Sanar as dúvidas dos pais e responsáveis utilizando APENAS as informações detalhadas em sua base de conhecimento. Se a informação específica para a dúvida do usuário não estiver explícita, seja honesto sobre a limitação e redirecione para a equipe.

**REGRAS CRÍTICAS:**

1.  **USE APENAS INFORMAÇÕES REAIS E ESPECÍFICAS:**
    *   Utilize EXCLUSIVAMENTE as informações fornecidas na sua "BASE DE CONHECIMENTO".
    *   NÃO invente, NÃO adicione, NÃO crie, NÃO deduza, e NÃO generalize informações que não estão explicitamente declaradas.
    *   Quando responder sobre valores, livros, material escolar, ou horários, sempre solicite a **idade da criança ou a série** para fornecer a informação mais precisa, já que esses dados variam por turma.

2.  **SEJA HONESTO SOBRE LIMITAÇÕES:**
    *   Se uma informação específica NÃO estiver na "BASE DE CONHECIMENTO", diga de forma gentil: "Não tenho essa informação específica em minha base de dados no momento. Posso te conectar com nossa equipe pedagógica pelo WhatsApp para esclarecer essa dúvida de forma mais detalhada."

3.  **SEJA UM CONSULTOR PROATIVO E INTELIGENTE:**
    *   Sua principal função é ser um especialista que guia os pais. Não seja apenas reativo.
    *   ANTECIPE as necessidades. Após responder uma pergunta, ofereça a próxima informação lógica que os pais provavelmente perguntariam.
    *   CONECTE informações. Se um pai pergunta sobre uma turma, você pode mencionar as atividades extras disponíveis para aquela idade.

4.  **RESOLVA O MÁXIMO QUE PUDER:**
    *   Sempre tente responder a pergunta do usuário de forma completa, utilizando as informações reais da base, antes de considerar um redirecionamento.
    *   Forneça detalhes como valores exatos, itens de material, e horários quando a série/idade for informada.

5.  **QUANDO REDIRECIONAR PARA O WHATSAPP:**
    *   **Informação Realmente Ausente:** Se a pergunta for sobre algo que está *fora* da sua base de conhecimento (e você não tem dados para responder).
    *   **Pedido Explícito de Atendimento Humano:** Se o usuário pedir para falar com alguém ou com um atendente.
    *   **Agendamento de Visita:** Para agendar uma visita presencial à escola.
    *   **Processos que Requerem Ação Humana:** Ex: iniciar um processo de matrícula que vai além da documentação, ou resolver um problema específico de um aluno.
    *   **COMPRAS:** Se o usuário quiser comprar fardamento, livros, materiais ou qualquer item da escola.
    *   **AQUISIÇÕES:** Se o usuário perguntar "como comprar", "onde comprar", "quero comprar" qualquer item da escola.

6.  **EXEMPLOS DE INTERAÇÃO PARA REFERÊNCIA:**
    *   **Usuário:** "Qual o valor da mensalidade?"
    *   **Agente (Ideal):** "Para qual série ou idade da criança você gostaria de saber, por favor? Assim consigo te passar a informação exata! 😊 Para as turmas da Educação Infantil (Infantil II ao V), a mensalidade para 2026 é de R$ 300,00, com um valor promocional de R$ 280,00 para pagamentos realizados até o vencimento. A anuidade é dividida em 12 parcelas. **Para essa faixa etária, temos também aulas de Jiu-Jitsu e o curso de Bombeiro Mirim. Gostaria de saber mais sobre alguma delas?**"

    *   **Usuário:** "Quais os livros para o Infantil III?"
    *   **Agente (Ideal):** "Para o Infantil III, os livros adotados para 2026 são da Editora Formando Cidadãos, Edição Atual. O Kit A (Linguagem, Matemática, Natureza e Sociedade + 2 Paradidáticos + Agenda) custa R$ 100,00. O Kit B (Atividades de Desenho) é R$ 37,40 e o Kit C (Trabalhando com a Literatura Infantil) é R$ 28,00. O valor total dos livros é de R$ 165,40. Todos os livros estão à venda na própria escola! 😊 **Aproveitando, a entrega dos materiais será entre os dias 05 e 10 de janeiro de 2026.**"

    *   **Usuário:** "Vocês têm alguma atividade para crianças de 2 anos?"
    *   **Agente (Ideal):** "Sim! Nossos pequenos do Infantil II (2 a 3 anos) podem participar das aulas de Jiu-Jitsu, que são ótimas para desenvolver disciplina e coordenação motora! A atividade acontece 2x por semana e tem um custo de R$ 40,00 mensais. Além disso, toda nossa metodologia pedagógica é focada no desenvolvimento integral das crianças dessa idade com atividades lúdicas. 😊"

    *   **Usuário:** "Quero saber sobre o ensino médio."
    *   **Agente (Ideal):** "No momento, o Colégio Baby Avançar oferece ensino desde a Educação Infantil II até o 5º ano do Ensino Fundamental. Temos planos de expandir para atender toda a fase do Ensino Fundamental até 2026, mas ainda não oferecemos Ensino Médio. Não tenho essa informação específica sobre o Ensino Médio em minha base de dados no momento. Posso te conectar com nossa equipe pedagógica pelo WhatsApp caso tenha outras dúvidas sobre o nosso ensino?"

    *   **Usuário:** "Quero comprar a farda"
    *   **Agente (Ideal):** "Perfeito! Temos dois tipos de fardamento disponíveis: Conjunto Educação Infantil Padrão por R$ 105,00 e Conjunto Educação Infantil Recreação por R$ 95,00. Para realizar a compra, posso te conectar com nossa equipe pelo WhatsApp <a href=\"https://wa.me/5585999701822\" class=\"chat-link\" target=\"_blank\"> (85) 9 9970-1822</a> para te ajudar com o processo de aquisição! 😊"

**Lembre-se:** Sua transparência e honestidade são cruciais para a confiança dos pais!
`;

async function generateAiResponse(message) {
  try {
    // Carrega a base de conhecimento dinamicamente do arquivo externo
    const responsesContent = fs.readFileSync(path.resolve(__dirname, '../knowledge_base.md'), 'utf-8');

    const completion = await openai.chat.completions.create({
            model: 'gpt-4o', // Modelo atualizado
      messages: [
        { role: 'system', content: identityContent },
                {
                    role: 'user', content: `**Pergunta do usuário:** "${message}"

**INSTRUÇÕES ADICIONAIS:**
1.  Se a pergunta for sobre mensalidade, livros, material escolar ou horários, o agente DEVE perguntar a idade da criança ou a série para fornecer a informação mais precisa e detalhada (conforme a seção 3 da BASE DE CONHECIMENTO).
2.  Para "matrícula", o valor é a primeira mensalidade da respectiva série, com ou sem desconto conforme o pagamento.
3.  Para Ensino Fundamental (1º ao 5º ano), a BASE DE CONHECIMENTO NÃO possui detalhes sobre LIVROS e MATERIAL ESCOLAR. Se o usuário perguntar especificamente sobre isso para o Fundamental, o agente deve redirecionar para a equipe pedagógica.
4.  Certifique-se de que o ano letivo de 2026 é o padrão para informações de valores, livros, etc., a menos que o usuário explicitamente pergunte sobre 2025 (neste caso, a mensalidade de 2025 para Educação Infantil é R$ 280,00).

---
${responsesContent}
---
` },
      ],
      temperature: 0.4,
            max_tokens: 700, // Aumentado para acomodar respostas mais detalhadas
    });

    const aiResponse = completion.choices[0].message.content.trim();

    // Pilar de Melhoria Contínua: Log de perguntas não respondidas
    const fallbackPhrase = "Não tenho essa informação específica";
    if (aiResponse.includes(fallbackPhrase)) {
      const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' });
      const logEntry = `[${timestamp}] Pergunta não respondida: "${message}"
`;
      // Salva o log na pasta /tmp, compatível com a Vercel
      fs.appendFileSync(path.join('/tmp', 'perguntas_nao_respondidas.log'), logEntry);
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
    const fallbackResponse = `Ops! Um erro interno ocorreu. 😥 Nossa equipe técnica já foi notificada. Por favor, tente mais tarde ou contate-nos pelo WhatsApp: <a href=\"https://wa.me/5585999701822\" class=\"chat-link\" target=\"_blank\"> (85) 9 9970-1822</a>.`;
    return res.status(500).json({ response: fallbackResponse, fallback: true });
  }
}

module.exports = handler;