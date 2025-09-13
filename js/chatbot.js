// ========================================
// AGENTE VIRTUAL AVANÇAR - IA EDUCACIONAL
// Sistema inteligente e humanizado com API
// ========================================

// Configuração do Agente Avançar
const AGENT_CONFIG = {
  name: "Agente Virtual Avançar",
  version: "2.0",
  personality: {
    empathy: 0.9,
    knowledge: 0.95,
    patience: 1.0,
    warmth: 0.85,
  },
  capabilities: {
    nlp: true,
    contextMemory: true,
    leadQualification: true,
    sentimentAnalysis: true,
    multiTurn: true,
  },
  typingSpeed: { min: 800, max: 1500 },
  maxContextLength: 10,
  responseVariations: 3,
};

// Base de Conhecimento Atualizada - Colégio Baby Avançar
const KNOWLEDGE_BASE = {
  school: {
    name: "Colégio Baby Avançar",
    mission: "Proporcionar educação de qualidade baseada em valores sólidos e metodologias inovadoras, reconhecendo e desenvolvendo o potencial único de cada criança",
    philosophy: "Avançando e transformando o Conhecimento - respeitando o ritmo e as particularidades de cada aluno para promover um desenvolvimento integral e humanizado",
    location: "Jóquei Clube, Fortaleza/CE",
    fullAddress: "Silveira Filho, 375 - Jóquei Clube, Fortaleza/CE",
    grades: {
      current: [
        "Infantil II (2 anos)",
        "Infantil III (3 anos)", 
        "Infantil IV (4 anos)",
        "Infantil V (5 anos)",
        "1º ao 5º ano do Fundamental"
      ],
      expansion: "Expansão para todo o Ensino Fundamental até 2026"
    },
    shift: "Turno manhã",
    methodology: {
      infantil: "Foco no desenvolvimento integral através de atividades lúdicas e pedagógicas planejadas",
      fundamental: "Metodologia que valoriza o aprendizado significativo e o desenvolvimento de competências",
      values: "Formação integral que desenvolve cidadãos conscientes e responsáveis, indo além do conhecimento acadêmico"
    },
    differentials: [
      "Turmas reduzidas para atendimento personalizado",
      "Metodologia inovadora com práticas pedagógicas modernas e eficazes", 
      "Localização privilegiada no Jóquei Clube - ambiente seguro e acolhedor",
      "Crescimento planejado com expansão até 2026"
    ]
  },
  
  pricing: {
    monthly: {
      value: 260,
      currency: "R$",
      description: "Mensalidade escolar"
    }
  },

  extraCourses: {
    "Jiu-Jitsu": {
      description: "Desenvolve disciplina, respeito, coordenação motora e autoconfiança. Ensina defesa pessoal de forma lúdica",
      age: "A partir de 2 anos",
      frequency: "2 vezes por semana",
      days: "Terça e quinta-feira",
      schedule: "17h às 18h",
      cost: 40,
      currency: "R$"
    },
    "Primeiros Socorros": {
      description: "Curso educativo que ensina noções básicas de primeiros socorros",
      age: "A partir de 5 anos",
      frequency: "Conforme cronograma escolar",
      cost: "Incluído nas atividades"
    },
    "Reforço Escolar": {
      description: "Apoio pedagógico personalizado para fortalecer o aprendizado e desenvolver o potencial máximo",
      target: "Do Infantil IV ao 5º ano",
      schedules: ["14h às 16h", "16h às 18h"],
      pricing: {
        fundamental: {
          regular: 200,
          earlyPayment: 170,
          description: "R$ 170,00 para pagamento até o vencimento"
        },
        infantil: {
          regular: 170,
          earlyPayment: 150,
          description: "R$ 150,00 para pagamento até o vencimento"
        }
      }
    },
    "Bombeiro Mirim": {
      description: "Curso disponível somente para alunos da escola",
      day: "Quarta-feira",
      integration: "Implementado nas aulas da escola",
      cost: 35,
      currency: "R$"
    }
  },

  cafeteria: {
    name: "Lanches Tia Thesca",
    categories: {
      drinks: {
        "Suco no copo 200ml": {
          flavors: ["goiaba", "acerola", "manga"],
          price: 1.30
        },
        "Caixa Nescau": { price: 2.20 },
        "Caixinha de suco": {
          flavors: ["goiaba", "maracujá", "uva"],
          price: 2.00
        },
        "Capo": {
          flavors: ["caju", "morango", "laranja"],
          price: 2.60
        }
      },
      sweets: {
        "Bolinhos Animado Zoo": { price: 2.50 },
        "Wafer": { price: 1.30 },
        "Biscoito Amori Chocolate": { price: 2.50 },
        "Bolo Bauducco Duo": { price: 2.00 },
        "Biscoito Amori Pequeno": { price: 1.25 },
        "Marujinho": { price: 2.00 }
      },
      snacks: {
        "Cheetos Assado (Onda)": { price: 1.50 },
        "Fandangos Feito de Milho": { price: 1.50 }
      },
      combos: {
        price: 6.00,
        options: [
          "5 Bolinhas Mistas + Copo de Suco",
          "4 Pastelzinhos de Frango + Copo de Suco", 
          "3 Pães de Queijo + Suco",
          "Suco + Pão Misto (queijo muçarela e peito de peru)"
        ]
      },
      special: {
        "Salada de Frutas": {
          day: "Quarta-feira",
          ingredients: ["banana", "maçã", "goiaba", "uva"],
          size: "Copo 200ml",
          price: 5.00
        }
      }
    }
  },

  contact: {
    whatsapp: "(85) 9 9970-1822",
    purpose: "Para dúvidas, matrículas e agendamento de visitas",
    address: "Silveira Filho, 375 - Jóquei Clube, Fortaleza - CE",
    social: {
      instagram: "@colegiobabyavancar_oficial"
    },
    visit: {
      availability: "Agendamento disponível via WhatsApp",
      purpose: "Conhecer a escola e esclarecer dúvidas"
    }
  }
};

// Sistema de Contexto Conversacional Avançado
class ConversationContext {
  constructor() {
    this.history = [];
    this.userProfile = {
      name: null,
      childName: null,
      childAge: null,
      location: null,
      phone: null,
      email: null,
      interests: [],
      concerns: [],
      preferences: {},
      stage: "initial", // initial, interested, qualifying, ready, objection
      leadScore: 0,
      urgencyLevel: "normal", // low, normal, high, urgent
      familySize: 1,
      hasSpecialNeeds: false,
      previousSchool: null,
      timeframe: null
    };
    this.currentTopic = null;
    this.emotionalState = { primary: "neutral", intensity: 0 };
    this.sessionStart = Date.now();
    this.lastInteraction = Date.now();
    this.engagementLevel = 0;
    this.questionsAsked = [];
    this.topicsDiscussed = [];
  }

  addMessage(message, sender, intent = null, emotion = null) {
    this.history.push({
      message,
      sender,
      intent,
      emotion,
      timestamp: Date.now(),
      sessionTime: Date.now() - this.sessionStart,
    });

    // Atualizar engajamento
    if (sender === "user") {
      this.updateEngagement(message);
      this.lastInteraction = Date.now();
    }

    // Manter apenas últimas mensagens para performance
    if (this.history.length > AGENT_CONFIG.maxContextLength) {
      this.history.shift();
    }
  }

  updateUserProfile(data) {
    Object.assign(this.userProfile, data);
    this.calculateLeadScore();
  }

  updateEngagement(message) {
    const messageLength = message.length;
    const hasQuestions = message.includes("?");
    const hasEmotions = /!|😊|😍|❤️|👍/.test(message);
    
    let engagementBoost = 0;
    if (messageLength > 50) engagementBoost += 2;
    if (hasQuestions) engagementBoost += 3;
    if (hasEmotions) engagementBoost += 1;
    
    this.engagementLevel = Math.min(100, this.engagementLevel + engagementBoost);
  }

  calculateLeadScore() {
    let score = 0;
    
    // Dados pessoais fornecidos
    if (this.userProfile.name) score += 15;
    if (this.userProfile.phone) score += 20;
    if (this.userProfile.email) score += 15;
    if (this.userProfile.childAge) score += 10;
    
    // Engajamento
    score += Math.min(20, this.engagementLevel / 5);
    
    // Tópicos de interesse
    score += Math.min(15, this.topicsDiscussed.length * 3);
    
    // Urgência
    if (this.userProfile.urgencyLevel === "high") score += 10;
    if (this.userProfile.urgencyLevel === "urgent") score += 15;
    
    this.userProfile.leadScore = Math.min(100, score);
  }

  getLastUserMessage() {
    return this.history.filter((h) => h.sender === "user").pop();
  }

  getConversationSummary() {
    return {
      messageCount: this.history.length,
      duration: Date.now() - this.sessionStart,
      stage: this.userProfile.stage,
      leadScore: this.userProfile.leadScore,
      engagementLevel: this.engagementLevel,
      emotionalState: this.emotionalState,
      topics: [...new Set(this.history.map((h) => h.intent).filter(Boolean))],
      completedProfile: this.getProfileCompleteness(),
    };
  }

  getProfileCompleteness() {
    const fields = ['name', 'childAge', 'phone'];
    const completed = fields.filter(field => this.userProfile[field]).length;
    return Math.round((completed / fields.length) * 100);
  }

  shouldAskFollowUp() {
    const lastMessages = this.history.slice(-3);
    const hasUnansweredQuestions = this.questionsAsked.length > 0;
    const lowEngagement = this.engagementLevel < 30;
    
    return hasUnansweredQuestions || lowEngagement;
  }
}

// Processamento de Linguagem Natural Avançado
class NLPProcessor {
  constructor() {
    this.intents = {
      greeting: ["olá", "oi", "bom dia", "boa tarde", "boa noite", "hey", "eae", "salve"],
      pricing: [
        "valor", "preço", "mensalidade", "custo", "quanto custa", "investimento",
        "taxa", "pagamento", "financeiro", "orçamento", "barato", "caro", "260"
      ],
      schedule: ["horário", "rotina", "funcionamento", "que horas", "período", "turno", "manhã"],
      methodology: ["metodologia", "ensino", "como funciona", "pedagogia", "método", "abordagem", "filosofia"],
      enrollment: ["matrícula", "inscrição", "como matricular", "vaga", "disponibilidade", "processo", "documentos"],
      contact: ["contato", "telefone", "whatsapp", "endereço", "localização", "onde fica", "silveira filho"],
      events: ["evento", "festa", "atividade", "comemoração", "apresentação", "projeto"],
      courses: [
        "curso", "jiu-jitsu", "jiu jitsu", "primeiros socorros", "reforço", "reforço escolar", 
        "extra", "adicional", "bombeiro mirim", "atividades extras", "extracurricular"
      ],
      age: ["idade", "anos", "criança de", "filho", "filha", "pequeno", "infantil", "fundamental"],
      visit: ["visita", "conhecer", "ver a escola", "agendar", "tour", "apresentar"],
      goodbye: ["tchau", "obrigado", "obrigada", "até logo", "valeu", "bye", "falou"],
      concern: ["preocupado", "ansioso", "dúvida", "receio", "medo", "inseguro"],
      compliment: ["ótimo", "excelente", "perfeito", "adorei", "maravilhoso", "incrível"],
      comparison: ["comparar", "diferença", "melhor", "pior", "versus", "concorrente"],
      urgency: ["urgente", "rápido", "hoje", "agora", "pressa", "imediato"],
      family: ["família", "irmão", "irmã", "segundo filho", "desconto família"],
      special_needs: ["especial", "deficiência", "inclusão", "adaptação", "necessidade"],
      cafeteria: ["lanche", "lanchonete", "comida", "suco", "combo", "tia thesca", "salada de frutas"],
      location: ["jóquei clube", "joquei", "fortaleza", "onde fica", "endereço", "localização"],
      expansion: ["expansão", "2026", "fundamental completo", "crescimento", "futuro"]
    };

    this.entities = {
      ages: /(\d+)\s*anos?/gi,
      names: /(?:meu nome é|eu sou|me chamo|sou o|sou a)\s+(\w+)/gi,
      urgency: /urgente|rápido|preciso hoje|com pressa|imediato|agora/gi,
      phone: /\(?\d{2}\)?\s*\d{4,5}-?\d{4}/gi,
      email: /[\w.-]+@[\w.-]+\.\w+/gi,
      childName: /(?:meu filho|minha filha|criança)\s+(?:se chama|é o|é a)\s+(\w+)/gi,
      location: /moro em|sou de|venho do|região do?\s+(\w+)/gi,
      timeframe: /(?:para|em)\s+(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro|\d{4})/gi
    };

    this.emotionalMarkers = {
      anxiety: ["preocupado", "ansioso", "nervoso", "inseguro", "receoso"],
      excitement: ["animado", "empolgado", "feliz", "contente", "alegre"],
      frustration: ["difícil", "complicado", "problema", "ruim", "péssimo"],
      satisfaction: ["ótimo", "perfeito", "excelente", "maravilhoso", "adorei"],
      urgency: ["urgente", "rápido", "pressa", "hoje", "agora", "imediato"]
    };
  }

  analyzeIntent(message) {
    const text = message.toLowerCase();
    const scores = {};

    for (const [intent, keywords] of Object.entries(this.intents)) {
      scores[intent] = keywords.reduce((score, keyword) => {
        return text.includes(keyword) ? score + 1 : score;
      }, 0);
    }

    const topIntent = Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b
    );

    return {
      intent: topIntent[1] > 0 ? topIntent[0] : "unknown",
      confidence: topIntent[1] / Math.max(...Object.values(scores), 1),
      allScores: scores,
    };
  }

  extractEntities(message) {
    const entities = {};

    // Extrair idades
    const ageMatches = [...message.matchAll(this.entities.ages)];
    if (ageMatches.length > 0) {
      entities.childAge = parseInt(ageMatches[0][1]);
    }

    // Extrair nomes
    const nameMatches = [...message.matchAll(this.entities.names)];
    if (nameMatches.length > 0) {
      entities.name =
        nameMatches[0][1] || nameMatches[0][2] || nameMatches[0][3];
    }

    // Detectar urgência
    if (this.entities.urgency.test(message)) {
      entities.urgency = true;
    }

    return entities;
  }

  analyzeSentiment(message) {
    const text = message.toLowerCase();
    const emotions = {};
    let totalScore = 0;

    // Analisar cada tipo de emoção
    for (const [emotion, markers] of Object.entries(this.emotionalMarkers)) {
      const score = markers.reduce((acc, marker) => {
        const regex = new RegExp(`\\b${marker}\\b`, 'gi');
        const matches = (text.match(regex) || []).length;
        return acc + matches;
      }, 0);
      
      emotions[emotion] = score;
      totalScore += score;
    }

    // Determinar emoção dominante
    if (totalScore === 0) return { primary: "neutral", emotions, intensity: 0 };

    const dominantEmotion = Object.entries(emotions)
      .reduce((a, b) => emotions[a[0]] > emotions[b[0]] ? a : b);

    return {
      primary: dominantEmotion[0],
      emotions,
      intensity: dominantEmotion[1] / totalScore,
      confidence: totalScore > 1 ? 0.8 : 0.5
    };
  }

  detectConversationStage(message, context) {
    const text = message.toLowerCase();
    
    // Estágio inicial - primeira interação
    if (context.history.length <= 1) return "greeting";
    
    // Interesse demonstrado
    if (text.includes("interessante") || text.includes("gostei") || 
        text.includes("quero saber mais")) return "interested";
    
    // Qualificação - fazendo perguntas específicas
    if (text.includes("quanto") || text.includes("como") || 
        text.includes("quando") || text.includes("onde")) return "qualifying";
    
    // Pronto para ação
    if (text.includes("quero matricular") || text.includes("vou visitar") || 
        text.includes("vamos agendar")) return "ready";
    
    // Objeções ou preocupações
    if (text.includes("mas") || text.includes("porém") || 
        text.includes("preocupado")) return "objection";
    
    return "exploring";
  }
}

// Gerador de Respostas Inteligentes e Humanizadas
class ResponseGenerator {
  constructor(context, nlp) {
    this.context = context;
    this.nlp = nlp;
    this.templates = {
      greeting: {
        first_time: [
          "Oi! 😊 Sou o Avançar, do Baby Avançar. Como posso ajudar você hoje?",
          "Olá! 👋 Sou seu assistente virtual. Em que posso ajudar sua família?",
          "Bem-vindo! 🌟 Sou o Avançar. Qual sua principal dúvida sobre nossa escola?",
        ],
        returning: [
          "Oi de novo! 😊 Como posso continuar ajudando?",
          "Olá! 👋 Em que mais posso ajudar?",
        ]
      },
      pricing: {
        general: [
          "Nossa mensalidade é R$ 260,00 no turno da manhã. 😊\n\nInclui todas as atividades pedagógicas!\n\nTem alguma idade específica em mente?",
          "R$ 260,00 por mês, turno manhã! 💰\n\nÉ um investimento acessível para educação de qualidade.\n\nGostaria de saber sobre atividades extras?",
        ],
        concerned: [
          "Entendo sua preocupação! 💙\n\nR$ 260,00/mês é nosso investimento para educação de qualidade no Jóquei Clube.\n\nQue tal uma visita para conhecer nossa proposta?"
        ]
      },
      methodology: {
        general: [
          "Nossa filosofia é 'Avançando e transformando o Conhecimento'! 🎨\n\nRespeitamos o ritmo de cada criança com turmas reduzidas.\n\nQual a idade do seu filho?",
          "Trabalhamos com metodologia lúdica e respeitosa! 😊\n\nCada criança tem seu tempo e isso é respeitado aqui.\n\nPosso falar sobre alguma idade específica?",
        ],
        concerned_parent: [
          "Entendo sua preocupação! 💙\n\nAqui respeitamos o ritmo individual de cada criança.\n\nQue tal conhecer nossa escola pessoalmente?"
        ]
      },
      schedule: [
        "Funcionamos no turno da manhã! ☀️\n\nAtendemos do Infantil II ao 5º ano.\n\nEstamos no Jóquei Clube. Quer agendar uma visita?",
      ],
      enrollment: [
        "O processo é bem simples! 😊\n\nPrimeiro você agenda uma visita pelo WhatsApp (85) 9 9970-1822.\n\nTemos vagas disponíveis! Qual idade você tem em mente?",
      ],
      visit: [
        "Adoraria agendar sua visita! 🏫\n\nVocê vai conhecer nossa estrutura no Jóquei Clube e tirar todas as dúvidas.\n\nWhatsApp: (85) 9 9970-1822. Qual o melhor dia?",
      ],
      courses: [
        "Temos atividades extras incríveis! 🥋\n\n• Jiu-Jitsu (R$ 40/mês)\n• Reforço Escolar\n• Bombeiro Mirim (R$ 35/mês)\n\nQual idade do seu filho?",
      ],
      cafeteria: [
        "Temos a Lanchonete Tia Thesca! 🍎\n\nSucos naturais, combos por R$ 6,00 e salada de frutas às quartas.\n\nSeu filho tem alguma preferência?",
      ],
      location: [
        "Estamos no Jóquei Clube! 📍\n\nSilveira Filho, 375 - ambiente seguro e tranquilo.\n\nQuer agendar uma visita? (85) 9 9970-1822",
      ],
      expansion: [
        "Atualmente atendemos até o 5º ano! 🚀\n\nEm 2026 teremos o Fundamental completo.\n\nSeu filho pode crescer conosco! Qual a idade dele?",
      ],
      family: [
        "Somos uma família educacional! 👨‍👩‍👧‍👦\n\nAmbiente acolhedor com atenção personalizada.\n\nQuantos filhos você tem em idade escolar?",
      ]
    };

    this.emotionalResponses = {
      anxiety: {
        prefix: "Entendo sua preocupação, é completamente natural! 💙 ",
        suffix: " Estou aqui para esclarecer todas suas dúvidas e deixar você tranquilo(a)."
      },
      excitement: {
        prefix: "Que alegria sentir seu entusiasmo! 🌟 ",
        suffix: " Vamos tornar essa jornada ainda mais especial!"
      },
      frustration: {
        prefix: "Percebo que algo está te incomodando. 😔 ",
        suffix: " Vamos resolver isso juntos, ok?"
      },
      urgency: {
        prefix: "Entendo que você precisa de uma resposta rápida! ⚡ ",
        suffix: " Vou te ajudar da forma mais ágil possível."
      }
    };
  }

  generateResponse(intent, entities, message, emotion) {
    // Atualizar contexto com entidades extraídas
    this.updateContextFromEntities(entities);
    
    // Determinar o tipo de resposta baseado no contexto emocional e histórico
    const responseType = this.determineResponseType(intent, emotion);
    
    // Gerar resposta base
    let response = this.getBaseResponse(intent, responseType);
    
    // Aplicar personalização emocional
    response = this.applyEmotionalLayer(response, emotion);
    
    // Personalizar com dados do usuário
    response = this.personalizeResponse(response, entities);
    
    // Adicionar informações contextuais e follow-ups
    response = this.addContextualInfo(response, intent);
    
    // Adicionar perguntas de qualificação se apropriado
    response = this.addQualificationQuestions(response, intent);

    return response;
  }

  updateContextFromEntities(entities) {
    const updates = {};
    
    if (entities.name) updates.name = entities.name[0];
    if (entities.childAge) updates.childAge = entities.childAge;
    if (entities.childName) updates.childName = entities.childName[0];
    if (entities.phone) updates.phone = entities.phone[0];
    if (entities.email) updates.email = entities.email[0];
    if (entities.location) updates.location = entities.location[0];
    if (entities.timeframe) updates.timeframe = entities.timeframe[0];
    if (entities.urgency) updates.urgencyLevel = "high";

    if (Object.keys(updates).length > 0) {
      this.context.updateUserProfile(updates);
    }
  }

  determineResponseType(intent, emotion) {
    // Primeira interação
    if (this.context.history.length <= 2 && intent === "greeting") {
      return "first_time";
    }
    
    // Usuário retornando
    if (this.context.history.length > 5 && intent === "greeting") {
      return "returning";
    }
    
    // Resposta baseada na emoção
    if (emotion && emotion.primary === "anxiety" && intent === "pricing") {
      return "concerned";
    }
    
    if (emotion && emotion.primary === "anxiety" && intent === "methodology") {
      return "concerned_parent";
    }
    
    return "general";
  }

  getBaseResponse(intent, responseType = "general") {
    // Respostas especiais para intents específicos
    if (intent === "courses") {
      return this.generateCoursesResponse();
    }
    
    if (intent === "cafeteria") {
      return this.getCafeteriaInfo();
    }

    const templates = this.templates[intent];
    if (!templates) {
      return this.generateFallbackResponse();
    }

    // Se há tipos específicos de resposta
    if (typeof templates === "object" && templates[responseType]) {
      const specificTemplates = templates[responseType];
      const randomIndex = Math.floor(Math.random() * specificTemplates.length);
      return specificTemplates[randomIndex];
    }
    
    // Fallback para templates simples
    if (Array.isArray(templates)) {
      const randomIndex = Math.floor(Math.random() * templates.length);
      return templates[randomIndex];
    }

    return this.generateFallbackResponse();
  }

  generateCoursesResponse() {
    return "Temos atividades extras incríveis! 🥋\n\n• Jiu-Jitsu: R$ 40/mês (terça e quinta)\n• Reforço Escolar: valores especiais\n• Bombeiro Mirim: R$ 35/mês\n\nQual idade do seu filho?";
  }

  applyEmotionalLayer(response, emotion) {
    if (!emotion || emotion.primary === "neutral") return response;
    
    const emotionalResponse = this.emotionalResponses[emotion.primary];
    if (!emotionalResponse) return response;
    
    // Aplicar camada emocional apenas se a intensidade for significativa
    if (emotion.intensity > 0.6) {
      return emotionalResponse.prefix + response + emotionalResponse.suffix;
    }
    
    return response;
  }

  personalizeResponse(response, entities) {
    // Personalizar com nome se disponível
    if (this.context.userProfile.name) {
      response = response.replace(/você/g, this.context.userProfile.name);
    }

    // Personalizar com idade da criança
    if (entities.childAge || this.context.userProfile.childAge) {
      const age = entities.childAge || this.context.userProfile.childAge;
      const grade = this.getGradeByAge(age);
      if (grade) {
        response += `\n\n👶 Para uma criança de ${age} anos, recomendamos o **${grade}**!`;
      }
    }

    return response;
  }

  addContextualInfo(response, intent) {
    const profile = this.context.userProfile;

    // Informações específicas por idade
    if (profile.childAge && (intent === "methodology" || intent === "pricing")) {
      const ageSpecificInfo = this.getAgeSpecificInfo(profile.childAge);
      if (ageSpecificInfo) {
        response += `\n\n${ageSpecificInfo}`;
      }
    }

    // Oferecer visita para leads interessados
    if (profile.leadScore > 50 && intent === "pricing") {
      response += "\n\nQue tal uma visita?";
    }

    // Urgência detectada
    if (profile.urgencyLevel === "high") {
      response += "\n\nWhatsApp: (85) 9 9970-1822 ⚡";
    }

    return response;
  }

  addQualificationQuestions(response, intent) {
    const profile = this.context.userProfile;
    
    // Usar fluxo conversacional inteligente
    const flowQuestion = this.getConversationalFlow(intent, profile);
    if (flowQuestion && this.context.questionsAsked.length < 1) {
      response += "\n\n" + flowQuestion;
      this.context.questionsAsked.push(intent + "_flow");
    }

    return response;
  }

  getAgeSpecificInfo(age) {
    const ageInfo = {
      2: "Infantil II - desenvolvimento da autonomia! Pode fazer Jiu-Jitsu também. 👶",
      3: "Infantil III - criatividade e coordenação motora! 🎨",
      4: "Infantil IV - preparação para alfabetização! Tem Reforço se precisar. 📚",
      5: "Infantil V - pré-alfabetização! Pode fazer Primeiros Socorros. ✏️",
      6: "1º Ano - alfabetização completa! 📖",
      7: "2º Ano - leitura, escrita e matemática! 🔢",
      8: "3º Ano - conhecimento de mundo! 🌍",
      9: "4º Ano - projetos interdisciplinares! 🔬",
      10: "5º Ano - preparação para o Fundamental II! 🎓"
    };
    
    return ageInfo[age] || null;
  }

  getCourseDetails(courseName) {
    const courses = KNOWLEDGE_BASE.extraCourses;
    const course = courses[courseName];
    
    if (!course) return null;
    
    let details = `**${courseName}:**\n`;
    details += `• ${course.description}\n`;
    
    if (course.age) details += `• Idade: ${course.age}\n`;
    if (course.days) details += `• Dias: ${course.days}\n`;
    if (course.schedule) details += `• Horário: ${course.schedule}\n`;
    if (course.frequency) details += `• Frequência: ${course.frequency}\n`;
    if (course.cost) details += `• Valor: R$ ${course.cost},00/mês\n`;
    
    return details;
  }

  getCafeteriaInfo(category = null) {
    return "Temos a Lanchonete Tia Thesca! 🍎\n\nSucos naturais, combos por R$ 6,00 e salada de frutas às quartas.\n\nSeu filho tem alguma preferência?";
  }

  getGradeByAge(age) {
    const gradeMap = {
      2: "Infantil II",
      3: "Infantil III",
      4: "Infantil IV",
      5: "Infantil V",
      6: "1º Ano",
      7: "2º Ano",
      8: "3º Ano",
      9: "4º Ano",
      10: "5º Ano",
    };
    return gradeMap[age];
  }

  generateFallbackResponse() {
    const profile = this.context.userProfile;
    
    // Fallback personalizado baseado no contexto
    if (profile.name) {
      return `Não entendi bem, ${profile.name}! 😊\n\nPosso ajudar com: valores, metodologia, atividades extras ou visitas.\n\nO que te interessa mais?`;
    }
    
    if (profile.childAge) {
      return `Para ${profile.childAge} anos, posso falar sobre nossa metodologia, valores ou atividades.\n\nO que gostaria de saber?`;
    }
    
    // Fallbacks gerais mais diretos
    const fallbacks = [
      "Não entendi bem! 😊\n\nPosso ajudar com: valores (R$ 260), metodologia, atividades extras ou visitas.\n\nO que te interessa?",
      
      "Desculpe, não compreendi! 🤔\n\nFalo sobre: mensalidade, nossa escola no Jóquei Clube, atividades extras.\n\nQual sua dúvida?",
      
      "Ops, não captei! 😅\n\nPosso esclarecer sobre valores, metodologia ou agendar uma visita.\n\nO que você quer saber?",
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

// Agente Virtual Principal
class AgenteVirtualAvancar {
  constructor() {
    this.context = new ConversationContext();
    this.nlp = new NLPProcessor();
    this.responseGenerator = new ResponseGenerator(this.context, this.nlp);
    this.isTyping = false;
  }

  async processMessage(message) {
    try {
      // Análise local básica (mantida para fallback)
      const intent = this.nlp.analyzeIntent(message);
      const emotion = this.nlp.analyzeSentiment(message);
      
      // Atualizar contexto local
      this.context.addMessage(message, "user", intent.intent, emotion);

      // Simular digitação antes de processar
      this.isTyping = true;
      await this.simulateTyping(message.length);

      // Preparar contexto para API
      const conversationContext = this.context.history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.message
      }));

      // Chamar API inteligente
      const apiResponse = await this.callChatAPI(message, conversationContext);
      
      if (apiResponse && apiResponse.response) {
        // Resposta da API
        const response = apiResponse.response;
        
        // Adicionar resposta ao contexto
        this.context.addMessage(response, "agent", intent.intent, emotion);
        
        // Analytics
        this.trackInteraction(intent, [], emotion, 'api_response');
        
        this.isTyping = false;
        
        return {
          response,
          intent: intent.intent,
          confidence: 0.9, // Alta confiança para API
          emotion,
          conversationStage: 'api_powered',
          leadScore: this.context.userProfile.leadScore,
          engagementLevel: this.context.engagementLevel,
          needsFollowUp: false,
          context: this.context.getConversationSummary(),
          apiPowered: true
        };
      } else {
        // Fallback para resposta local
        return await this.processMessageLocal(message, intent, emotion);
      }
      
    } catch (error) {
      console.error('Erro no processamento:', error);
      // Fallback para resposta local em caso de erro
      const intent = this.nlp.analyzeIntent(message);
      const emotion = this.nlp.analyzeSentiment(message);
      return await this.processMessageLocal(message, intent, emotion);
    }
  }

  async callChatAPI(message, context) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context,
          userId: this.context.sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na API:', error);
      return null;
    }
  }

  async processMessageLocal(message, intent, emotion) {
    // Processamento local original (fallback)
    const entities = this.nlp.extractEntities(message);
    const conversationStage = this.nlp.detectConversationStage(message, this.context);

    // Atualizar contexto
    this.context.emotionalState = emotion;
    this.context.userProfile.stage = conversationStage;

    // Gerar resposta local
    const response = this.responseGenerator.generateResponse(
      intent.intent,
      entities,
      message,
      emotion
    );

    // Adicionar resposta ao contexto
    this.context.addMessage(response, "agent", intent.intent, emotion);

    // Analytics
    this.trackInteraction(intent, entities, emotion, conversationStage);

    this.isTyping = false;

    return {
      response,
      intent: intent.intent,
      confidence: intent.confidence,
      entities,
      emotion,
      conversationStage,
      leadScore: this.context.userProfile.leadScore,
      engagementLevel: this.context.engagementLevel,
      needsFollowUp: this.context.shouldAskFollowUp(),
      context: this.context.getConversationSummary(),
      apiPowered: false
    };
  }

  async simulateTyping(responseLength = 100) {
    // Calcular delay baseado no comprimento da resposta (mais realista)
    const baseDelay = AGENT_CONFIG.typingSpeed.min;
    const lengthFactor = Math.min(responseLength / 100, 3); // Máximo 3x o delay base
    const randomFactor = Math.random() * 0.5 + 0.75; // 75% a 125% do tempo calculado
    
    const delay = baseDelay * lengthFactor * randomFactor;

    this.isTyping = true;
    
    // Simular pausa de "pensamento" para respostas complexas
    if (responseLength > 200) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    
    await new Promise((resolve) => setTimeout(resolve, delay));
    this.isTyping = false;
  }

  trackInteraction(intent, entities, emotion, conversationStage) {
    // Analytics para Google Analytics
    if (typeof gtag !== "undefined") {
      gtag("event", "agent_interaction", {
        event_category: "ai_agent",
        event_label: intent.intent,
        custom_parameter_1: emotion.primary,
        custom_parameter_2: conversationStage,
        custom_parameter_3: this.context.userProfile.leadScore,
        value: intent.confidence,
      });

      // Evento especial para leads qualificados
      if (this.context.userProfile.leadScore > 70) {
        gtag("event", "qualified_lead", {
          event_category: "lead_generation",
          event_label: "high_score",
          value: this.context.userProfile.leadScore,
        });
      }
    }

    // Log detalhado para desenvolvimento
    console.log("🤖 Agente Avançar - Interação:", {
      intent: intent.intent,
      confidence: intent.confidence,
      entities,
      emotion,
      conversationStage,
      leadScore: this.context.userProfile.leadScore,
      engagementLevel: this.context.engagementLevel,
      profileCompleteness: this.context.getProfileCompleteness(),
      sessionDuration: Date.now() - this.context.sessionStart,
    });
  }

  // Método para obter insights da conversa
  getConversationInsights() {
    const summary = this.context.getConversationSummary();
    const profile = this.context.userProfile;
    
    return {
      leadQuality: this.assessLeadQuality(),
      recommendedActions: this.getRecommendedActions(),
      conversationHealth: this.assessConversationHealth(),
      nextBestAction: this.getNextBestAction(),
      summary
    };
  }

  assessLeadQuality() {
    const score = this.context.userProfile.leadScore;
    if (score >= 80) return "hot";
    if (score >= 60) return "warm";
    if (score >= 40) return "qualified";
    if (score >= 20) return "interested";
    return "cold";
  }

  getRecommendedActions() {
    const actions = [];
    const profile = this.context.userProfile;
    
    if (profile.leadScore > 70 && !profile.phone) {
      actions.push("collect_phone");
    }
    
    if (profile.urgencyLevel === "high") {
      actions.push("priority_follow_up");
    }
    
    if (this.context.engagementLevel < 30) {
      actions.push("re_engage");
    }
    
    if (profile.leadScore > 60) {
      actions.push("schedule_visit");
    }
    
    return actions;
  }

  assessConversationHealth() {
    const engagement = this.context.engagementLevel;
    const messageCount = this.context.history.length;
    const duration = Date.now() - this.context.sessionStart;
    
    let health = "good";
    
    if (engagement < 20 || (messageCount > 10 && duration < 60000)) {
      health = "poor";
    } else if (engagement > 70 && messageCount > 5) {
      health = "excellent";
    }
    
    return health;
  }

  getNextBestAction() {
    const profile = this.context.userProfile;
    
    if (profile.leadScore > 80) return "schedule_call";
    if (profile.leadScore > 60) return "schedule_visit";
    if (profile.leadScore > 40) return "send_materials";
    if (profile.leadScore > 20) return "continue_nurturing";
    
    return "build_interest";
  }

  getPersonalityResponse() {
    const timeOfDay = this.getTimeOfDay();
    const greeting = this.getTimeBasedGreeting(timeOfDay);
    
    return `${greeting} Sou o **Avançar**, seu assistente virtual especializado em educação infantil! 🤖✨\n\n**Minha missão**: Ajudar famílias a descobrirem o melhor caminho educacional para seus filhos no Colégio Baby Avançar.\n\n**Posso ajudar com**:\n• 💰 Informações sobre valores e planos\n• 🎨 Nossa metodologia pedagógica única\n• 📅 Horários e rotina escolar\n• 🏫 Agendamento de visitas\n• 📞 Contato direto com a escola\n• 🎯 Orientações personalizadas\n\n**Estou aqui 24/7 para sua família!** Como posso ajudar você hoje? 😊`;
  }

  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  }

  getTimeBasedGreeting(timeOfDay) {
    const greetings = {
      morning: "Bom dia! ☀️",
      afternoon: "Boa tarde! 🌤️", 
      evening: "Boa noite! 🌙"
    };
    return greetings[timeOfDay] || "Olá! 👋";
  }

  // Método para sugerir próximas perguntas
  suggestNextQuestions(intent) {
    const suggestions = {
      pricing: ["Atividades extras?", "Agendar visita?"],
      methodology: ["Valores?", "Visita?"],
      courses: ["Mensalidade?", "Visita?"],
      visit: ["Valores?", "Atividades extras?"],
      location: ["Mensalidade?", "Visita?"]
    };

    return suggestions[intent] || ["Valores?", "Visita?"];
  }

  // Método para detectar intenção de sair
  detectExitIntent(message) {
    const exitKeywords = [
      "tchau", "obrigado", "obrigada", "até logo", "valeu", 
      "bye", "falou", "já vou", "tenho que ir"
    ];
    
    return exitKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
  }

  // Resposta de despedida personalizada
  generateGoodbyeResponse() {
    const profile = this.context.userProfile;

    if (profile.name) {
      return `Foi um prazer, ${profile.name}! 😊\n\nWhatsApp: (85) 9 9970-1822\n\nAté breve! 👋`;
    }

    return "Foi um prazer! 😊\n\nWhatsApp: (85) 9 9970-1822\n\nAté breve! 👋";
  }

  // Sistema de fluxo conversacional inteligente
  getConversationalFlow(intent, profile) {
    const flows = {
      greeting: () => {
        if (!profile.childAge) return "Qual a idade do seu filho?";
        return "Em que posso ajudar?";
      },
      
      pricing: () => {
        if (!profile.childAge) return "Para qual idade?";
        if (profile.leadScore > 40) return "Quer agendar uma visita?";
        return "Gostaria de saber sobre nossa metodologia?";
      },
      
      methodology: () => {
        if (!profile.childAge) return "Qual a idade da criança?";
        return "Quer conhecer nossa escola?";
      },
      
      courses: () => {
        if (!profile.childAge) return "Qual a idade do seu filho?";
        return "Gostaria de agendar uma visita?";
      }
    };

    const flowFunction = flows[intent];
    return flowFunction ? flowFunction() : null;
  }
}

// Instância global do agente
let agenteAvancar = null;

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  agenteAvancar = new AgenteVirtualAvancar();
  console.log("🚀 Agente Virtual Avançar inicializado com sucesso!");
  console.log("🧠 Capacidades:", AGENT_CONFIG.capabilities);
});

// Exportar para uso global
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    AgenteVirtualAvancar,
    AGENT_CONFIG,
    KNOWLEDGE_BASE,
  };
}
