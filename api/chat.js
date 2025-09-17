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
    * Utilize EXCLUSIVAMENTE as informações fornecidas na sua "BASE DE CONHECIMENTO".
    * NÃO invente, NÃO adicione, NÃO crie, NÃO deduza, e NÃO generalize informações que não estão explicitamente declaradas.
    * Quando responder sobre valores, livros, material escolar, ou horários, sempre solicite a **idade da criança ou a série** para fornecer a informação mais precisa, já que esses dados variam por turma.

2.  **SEJA HONESTO SOBRE LIMITAÇÕES:**
    * Se uma informação específica NÃO estiver na "BASE DE CONHECIMENTO", diga de forma gentil: "Não tenho essa informação específica em minha base de dados no momento. Posso te conectar com nossa equipe pedagógica pelo WhatsApp para esclarecer essa dúvida de forma mais detalhada."

3.  **RESOLVA O MÁXIMO QUE PUDER:**
    * Sempre tente responder a pergunta do usuário de forma completa, utilizando as informações reais da base, antes de considerar um redirecionamento.
    * Forneça detalhes como valores exatos, itens de material, e horários quando a série/idade for informada.

4.  **QUANDO REDIRECIONAR PARA O WHATSAPP:**
    * **Informação Realmente Ausente:** Se a pergunta for sobre algo que está *fora* da sua base de conhecimento (e você não tem dados para responder).
    * **Pedido Explícito de Atendimento Humano:** Se o usuário pedir para falar com alguém ou com um atendente.
    * **Agendamento de Visita:** Para agendar uma visita presencial à escola.
    * **Processos que Requerem Ação Humana:** Ex: iniciar um processo de matrícula que vai além da documentação, ou resolver um problema específico de um aluno.
    * **COMPRAS:** Se o usuário quiser comprar fardamento, livros, materiais ou qualquer item da escola.
    * **AQUISIÇÕES:** Se o usuário perguntar "como comprar", "onde comprar", "quero comprar" qualquer item da escola.

5.  **EXEMPLOS DE INTERAÇÃO PARA REFERÊNCIA:**
    * **Usuário:** "Qual o valor da mensalidade?"
    * **Agente (Ideal):** "Para qual série ou idade da criança você gostaria de saber, por favor? Assim consigo te passar a informação exata! 😊 Para as turmas da Educação Infantil (Infantil II ao V), a mensalidade para 2026 é de R$ 300,00, com um valor promocional de R$ 280,00 para pagamentos realizados até o vencimento. A anuidade é dividida em 12 parcelas."

    * **Usuário:** "Quais os livros para o Infantil III?"
    * **Agente (Ideal):** "Para o Infantil III, os livros adotados para 2026 são da Editora Formando Cidadãos, Edição Atual. O Kit A (Linguagem, Matemática, Natureza e Sociedade + 2 Paradidáticos + Agenda) custa R$ 100,00. O Kit B (Atividades de Desenho) é R$ 37,40 e o Kit C (Trabalhando com a Literatura Infantil) é R$ 28,00. O valor total dos livros é de R$ 165,40. Todos os livros estão à venda na própria escola! 😊"

    * **Usuário:** "Vocês têm alguma atividade para crianças de 2 anos?"
    * **Agente (Ideal):** "Sim! Nossos pequenos do Infantil II (2 a 3 anos) podem participar das aulas de Jiu-Jitsu, que são ótimas para desenvolver disciplina e coordenação motora! A atividade acontece 2x por semana e tem um custo de R$ 40,00 mensais. Além disso, toda nossa metodologia pedagógica é focada no desenvolvimento integral das crianças dessa idade com atividades lúdicas. 😊"

    * **Usuário:** "Quero saber sobre o ensino médio."
    * **Agente (Ideal):** "No momento, o Colégio Baby Avançar oferece ensino desde a Educação Infantil II até o 5º ano do Ensino Fundamental. Temos planos de expandir para atender toda a fase do Ensino Fundamental até 2026, mas ainda não oferecemos Ensino Médio. Não tenho essa informação específica sobre o Ensino Médio em minha base de dados no momento. Posso te conectar com nossa equipe pedagógica pelo WhatsApp caso tenha outras dúvidas sobre o nosso ensino?"

    * **Usuário:** "Quero comprar a farda"
    * **Agente (Ideal):** "Perfeito! Temos dois tipos de fardamento disponíveis: Conjunto Educação Infantil Padrão por R$ 105,00 e Conjunto Educação Infantil Recreação por R$ 95,00. Para realizar a compra, posso te conectar com nossa equipe pelo WhatsApp <a href="https://wa.me/5585999701822" class="chat-link" target="_blank">(85) 9 9970-1822</a> para te ajudar com o processo de aquisição! 😊"

**Lembre-se:** Sua transparência e honestidade são cruciais para a confiança dos pais!
`;

// BASE DE CONHECIMENTO COMPLETA E ORGANIZADA
const responsesContent = `# BASE DE CONHECIMENTO - COLÉGIO BABY AVANÇAR

## 1. SOBRE A ESCOLA
-   **Nome:** Colégio Baby Avançar
-   **Slogan:** "Avançando e transformando o Conhecimento"
-   **Missão:** Proporcionar educação de qualidade, baseada em valores sólidos e metodologias inovadoras.
-   **Filosofia:** Respeitar o ritmo e as particularidades de cada aluno para um desenvolvimento integral e humanizado.
-   **Localização:** Silveira Filho, 375 - Jóquei Clube, Fortaleza - CE. Ambiente seguro e acolhedor.
-   **Horário de Atendimento (Secretaria):** Comercial.
-   **Início das Aulas (Ano Letivo 2026):** 20 de janeiro de 2026.
-   **Entrega de Material Escolar (Ano Letivo 2026):** De 05/01/2026 a 10/01/2026.
-   **Órgão Regulador (Registro no MEC):** Para Educação Infantil e Ensino Fundamental, a autorização e supervisão são da Secretaria Municipal de Educação de Fortaleza (SME Fortaleza). A escola está em total conformidade com a SME Fortaleza.

## 2. PROPOSTA DE ENSINO E VALORES GERAIS
-   **Níveis Oferecidos Atualmente:** Educação Infantil II ao V (2 a 6 anos).
-   **Expansão Futura:** A partir de 2026, ofereceremos Ensino Fundamental 1º ao 5º ano (6 a 11 anos).
-   **Educação com Valores:** Formação integral, desenvolvendo cidadãos conscientes e responsáveis.
-   **Anuidade:** Dividida em 12 parcelas sem reajustes no decorrer do ano letivo (para Educação Infantil).

## 3. INFORMAÇÕES DETALHADAS POR TURMA (ANO LETIVO 2026)

### 3.1. INFANTIL II (Crianças que completam 2 anos até 31/03/2025)
-   **Mensalidade:** R$ 300,00. Desconto para pagamento até o vencimento: R$ 280,00.
-   **Matrícula:** Valor da primeira mensalidade (R$ 300,00 ou R$ 280,00 com desconto).
-   **Vencimento Mensalidade:** Dia 10 de cada mês.
-   **Horário de Aula:** Manhã (7h às 10h50) | Tarde (13h às 17h).
-   **Livros (Editora Formando Cidadãos 2 Anos – Edição Atual):** Todos à venda na escola.
    -   Kit A (Linguagem, Matemática e Natureza e Sociedade + 2 Paradidáticos + Agenda): R$ 43,50
    -   Kit B (Atividades de Desenho): R$ 37,40
    -   Kit C (Trabalhando com a Literatura Infantil): R$ 18,70
    -   **Valor Total Livros:** R$ 99,60
-   **Material Escolar:** 01 Resma A4, 03 Caixas lápis de cor jumbo, 01 Caixa meu 1° giz de cera gigante, 06 Lápis escrever preto jumbo triangular, 06 Borrachas brancas quadrada, 02 Apontadores lápis triangular, 01 Brinquedo educativo, 01 Pasta Colecionadora, 02 Cadernos brochura, 01 Cola branca grande, 01 Tesoura sem ponta, 01 Cx tinta guache, 01 Livro literatura infantil (título a escolha, identificado), 01 Copo inox/garrafinha (identificado), 01 Toalha de mão (identificado), 01 Roupa reserva (identificado), Fraldas descartáveis, 01 Avental infantil impermeável (identificado).
-   **Fardamento (Obrigatório):** Uso de segunda a sexta. Sandália colegial preta obrigatória.
    -   Conjunto Educação Infantil Padrão: R$ 105,00
    -   Conjunto Educação Infantil Recreação: R$ 95,00

### 3.2. INFANTIL III (Crianças que completam 3 anos até 31/03/2025)
-   **Mensalidade:** R$ 300,00. Desconto para pagamento até o vencimento: R$ 280,00.
-   **Matrícula:** Valor da primeira mensalidade (R$ 300,00 ou R$ 280,00 com desconto).
-   **Vencimento Mensalidade:** Dia 10 de cada mês.
-   **Horário de Aula:** Manhã (7h às 10h50) | Tarde (13h às 17h).
-   **Livros (Editora Formando Cidadãos 2 Anos – Edição Atual):** Todos à venda na escola.
    -   Kit A (Linguagem, Matemática e Natureza e Sociedade + 2 Paradidáticos + Agenda): R$ 100,00
    -   Kit B (Atividades de Desenho): R$ 37,40
    -   Kit C (Trabalhando com a Literatura Infantil): R$ 28,00
    -   **Valor Total Livros:** R$ 165,40
-   **Material Escolar:** 01 Resma A4, 03 Caixas lápis de cor jumbo, 02 Caixa giz de cera gigante, 06 Lápis escrever jumbo triangular, 06 Borrachas brancas quadrada, 02 Apontadores lápis triangular, 01 Brinquedo educativo, 01 Pasta Colecionadora, 06 Cadernos pauta dupla, 01 Cola branca grande, 01 Tesoura sem ponta, 01 Cx tinta guache, 01 Livro literatura infantil (título a escolha, identificado), 01 Copo inox/garrafinha (identificado), 01 Toalha de mão (identificado), 01 Roupa reserva (identificado), Fraldas descartáveis, 01 Avental infantil impermeável (identificado).
-   **Fardamento (Obrigatório):** Uso de segunda a sexta. Sandália colegial preta obrigatória.
    -   Conjunto Educação Infantil Padrão: R$ 105,00
    -   Conjunto Educação Infantil Recreação: R$ 95,00

### 3.3. INFANTIL IV (Crianças que completam 4 anos até 31/03/2025)
-   **Mensalidade:** R$ 300,00. Desconto para pagamento até o vencimento: R$ 280,00.
-   **Matrícula:** Valor da primeira mensalidade (R$ 300,00 ou R$ 280,00 com desconto).
-   **Vencimento Mensalidade:** Dia 10 de cada mês.
-   **Horário de Aula:** Manhã (7h às 10h50) | Tarde (13h às 17h).
-   **Livros (Editora Formando Cidadãos 3 Anos – Edição Atual):** Todos à venda na escola.
    -   Kit A (Linguagem, Matemática e Natureza e Sociedade + 2 Paradidáticos + Agenda): R$ 104,00
    -   Kit B (Atividades de Desenho): R$ 22,40
    -   Kit C (Trabalhando com a Literatura Infantil): R$ 32,00
    -   **Valor Total Livros:** R$ 158,40
-   **Material Escolar:** 01 Resma A4, 03 Caixas lápis de jumbo, 02 Caixa giz de cera gigante, 06 Lápis escrever preto jumbo, 10 Borrachas brancas quadrada, 02 Apontadores lápis jumbo, 01 Brinquedo educativo, 01 Pasta Colecionadora, 08 Cadernos pauta dupla grande, 01 Cola branca grande, 01 Tesoura sem ponta, 01 Cx tinta guache, 01 Livro literatura infantil (título a escolha, identificado), 01 Copo inox/garrafinha (identificado), 01 Toalha de mão (identificado), 01 Avental infantil impermeável (identificado).
-   **Fardamento (Obrigatório):** Uso de segunda a sexta. Sandália colegial preta obrigatória.
    -   Conjunto Educação Infantil Padrão: R$ 105,00
    -   Conjunto Educação Infantil Recreação: R$ 95,00

### 3.4. INFANTIL V (Crianças que completam 5 anos até 31/03/2025)
-   **Mensalidade:** R$ 300,00. Desconto para pagamento até o vencimento: R$ 280,00.
-   **Matrícula:** Valor da primeira mensalidade (R$ 300,00 ou R$ 280,00 com desconto).
-   **Vencimento Mensalidade:** Dia 10 de cada mês.
-   **Horário de Aula:** Manhã (7h às 10h50) | Tarde (13h às 17h).
-   **Livros (Editora Formando Cidadãos 3 Anos – Edição Atual):** Todos à venda na escola.
    -   Kit A (Linguagem, Matemática e Natureza e Sociedade + 2 Paradidáticos + Agenda): R$ 112,00
    -   Kit B (Atividades de Desenho): R$ 40,30
    -   Kit C (Trabalhando com a Literatura Infantil): R$ 36,00
    -   **Valor Total Livros:** R$ 188,30
-   **Material Escolar:** 01 Resma A4, 03 Caixas lápis de cor, 02 Caixa giz de cera gigante, 06 Lápis escrever preto, 10 Borrachas brancas quadrada, 02 Apontadores para lápis, 01 Brinquedo educativo, 01 Pasta Colecionadora, 08 Cadernos pauta dupla grande, 01 Cola branca grande, 01 Tesoura sem ponta, 01 Cx tinta guache, 01 Livro literatura infantil (título a escolha, identificado), 01 Copo inox/garrafinha (identificado), 01 Toalha de mão (identificado), 01 Avental infantil impermeável (identificado).
-   **Fardamento (Obrigatório):** Uso de segunda a sexta. Sandália colegial preta obrigatória.
    -   Conjunto Educação Infantil Padrão: R$ 105,00
    -   Conjunto Educação Infantil Recreação: R$ 95,00

### 3.5. ENSINO FUNDAMENTAL (1º ao 5º ano)
-   **Mensalidade (Para 2026):** R$ 320,00. Desconto para pagamento até o vencimento: R$ 300,00.
-   **Matrícula:** Valor da primeira mensalidade (R$ 320,00 ou R$ 300,00 com desconto).
-   **Vencimento Mensalidade:** Dia 10 de cada mês.
-   **Horário de Aula:** Manhã (7h às 10h50) | Tarde (13h às 17h).
-   **Observação:** Metodologia focada no aprendizado significativo e desenvolvimento de competências.
-   **Livros e Material Escolar:** Não há listagem detalhada específica na base para o Ensino Fundamental. O Agente deve redirecionar.

## 4. DOCUMENTAÇÃO PARA MATRÍCULA (PADRÃO PARA TODAS AS TURMAS)
-   01 Pasta escolar
-   Cópia da certidão de nascimento da criança
-   03 fotos 3 x 4
-   Cópia do RG e CPF do pai, mãe ou responsável
-   Cópia do comprovante de residência
-   Cópia do cartão de vacinas atualizado
-   Cópia do cartão do Bolsa Família (caso tenha)
-   Declaração da série que cursou em 2025 (se aplicável)

## 5. DIFERENCIAIS
-   **Turmas Reduzidas:** Atendimento personalizado.
-   **Metodologia Inovadora:** Práticas pedagógicas modernas e eficazes.
-   **Localização Privilegiada:** No Jóquei Clube, ambiente seguro e acolhedor.
-   **Crescimento Planejado:** Expansão até 2026 para Ensino Fundamental completo.

## 6. ATIVIDADES EXTRACURRICULARES
-   **Primeiros Socorros:**
    -   Idade: A partir de 5 anos.
    -   Frequência: 1x por semana.
-   **Jiu-Jitsu:**
    -   Idade: A partir de 2 anos.
    -   Frequência: 2x por semana (terça e quinta, 17h-18h).
    -   Custo: R$ 40,00/mês.
-   **Reforço Escolar:**
    -   Público: Do Infantil IV ao 5º ano.
    -   Horários: 14h-16h e 16h-18h.
    -   **Valores Mensais:**
        -   Educação Infantil: R$ 170,00 (R$ 150,00 com desconto para pagamento até o vencimento).
        -   Ensino Fundamental: R$ 200,00 (R$ 170,00 com desconto para pagamento até o vencimento).
-   **Curso de Bombeiro Mirim:**
    -   Disponibilidade: Apenas para alunos matriculados.
    -   Frequência: 1x por semana (quartas).
    -   Custo: R$ 35,00/mês.

## 7. LANCHE DA TIA THESCA
-   **Disponível:** Bebidas, doces, snacks e salgadinhos
-   **Preços:** De R$ 1,30 a R$ 2,60
-   **Combos:** 4 opções por R$ 6,00 cada
-   **Especial de Quarta:** Salada de Frutas por R$ 5,00

## 8. DEPOIMENTOS (PARA HUMANIZAÇÃO)
-   "A equipe pedagógica é excepcional! Eles realmente entendem cada criança individualmente e adaptam o ensino às necessidades específicas. A comunicação com os pais é constante e transparente. Recomendo muito!" - Fernanda Costa (Mãe da Sofia, 4 anos - Infantil IV).

## 9. CONTATO E AÇÕES
-   **WhatsApp Oficial:** <a href="https://wa.me/5585999701822" class="chat-link" target="_blank">(85) 9 9970-1822</a> (principal canal para dúvidas, matrículas e agendamento de visitas).
-   **Redes Sociais:** @colegiobabyavancar_oficial
-   **Visitas:** Agendamento para conhecer a estrutura e metodologia (preferencialmente via WhatsApp).
`;

async function generateAiResponse(message) {
  try {
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
    const fallbackResponse = `Ops! Um erro interno ocorreu. 😥 Nossa equipe técnica já foi notificada. Por favor, tente mais tarde ou contate-nos pelo WhatsApp: <a href="https://wa.me/5585999701822" class="chat-link" target="_blank">(85) 9 9970-1822</a>.`;
    return res.status(500).json({ response: fallbackResponse, fallback: true });
  }
}

module.exports = handler;