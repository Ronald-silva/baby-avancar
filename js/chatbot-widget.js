// ========================================
// WIDGET DO CHATBOT - BABY AVANÇAR
// Interface e controles do chat
// ========================================

// Variáveis globais do chat
let chatOpen = false;
let messageCount = 0;

// Função para alternar o chat
function toggleChat() {
  const container = document.getElementById("chatbot-container");
  
  chatOpen = !chatOpen;
  
  if (chatOpen) {
    container.style.display = "flex";
    container.setAttribute("aria-hidden", "false");
    
    // Foco no input
    setTimeout(() => {
      const input = document.getElementById("chat-input");
      if (input) input.focus();
    }, 100);
  } else {
    container.style.display = "none";
    container.setAttribute("aria-hidden", "true");
  }
}

// Função para enviar mensagem
async function sendMessage(quickMsg) {
  const input = document.getElementById("chat-input");
  const message = quickMsg || input.value.trim();
  
  if (!message) return;
  
  // Adicionar mensagem do usuário
  addMessage(message, "user");
  input.value = "";
  
  // Mostrar indicador de digitação
  showTypingIndicator();
  
  try {
    // Usar o Agente Virtual Avançar
    const response = await getResponse(message);
    
    // Remover indicador e mostrar resposta
    hideTypingIndicator();
    addMessage(response, "bot");
  } catch (error) {
    hideTypingIndicator();
    addMessage("Desculpe, ocorreu um erro. Tente novamente!", "bot");
    console.error("Erro no chat:", error);
  }
}

// Função para mostrar indicador de digitação
function showTypingIndicator() {
  const container = document.getElementById("chat-messages");
  const indicator = document.createElement("div");
  
  indicator.className = "message-bot typing-indicator";
  indicator.id = "typing-indicator";
  indicator.innerHTML = "🤖 Agente Virtual Avançar está digitando...";
  indicator.style.opacity = "0.7";
  indicator.style.fontStyle = "italic";
  
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

// Função para esconder indicador de digitação
function hideTypingIndicator() {
  const indicator = document.getElementById("typing-indicator");
  if (indicator) {
    indicator.remove();
  }
}

// Função principal para obter resposta
async function getResponse(message) {
  // Usar o Agente Virtual Avançar se disponível
  if (typeof agenteAvancar !== "undefined" && agenteAvancar) {
    try {
      const result = await agenteAvancar.processMessage(message);
      
      // Log insights para desenvolvimento
      console.log("🧠 Insights da Conversa:", agenteAvancar.getConversationInsights());
      
      // Verificar se é uma despedida
      if (agenteAvancar.detectExitIntent(message)) {
        return agenteAvancar.generateGoodbyeResponse();
      }
      
      // Adicionar sugestões de próximas perguntas se apropriado
      let response = result.response;
      
      if (result.leadScore > 20 && result.confidence > 0.6) {
        const suggestions = agenteAvancar.suggestNextQuestions(result.intent);
        if (suggestions.length > 0) {
          response += "\n\n" + suggestions.slice(0, 2).join(" • ");
        }
      }
      
      return response;
    } catch (error) {
      console.error("Erro no Agente Avançar:", error);
      return getFallbackResponse(message);
    }
  }
  
  // Fallback para o sistema simples
  return getFallbackResponse(message);
}

// Sistema de fallback simples
function getFallbackResponse(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes("olá") || msg.includes("oi") || msg.includes("bom dia")) {
    return "Olá! 😊 Sou o Agente Virtual do Baby Avançar. Como posso ajudar você hoje?";
  }
  
  if (msg.includes("valor") || msg.includes("preço") || msg.includes("mensalidade")) {
    return "Nossa mensalidade é R$ 260,00 no turno da manhã! 💰\n\nInclui todas as atividades pedagógicas.\n\nGostaria de agendar uma visita?";
  }
  
  return "Posso ajudar com informações sobre valores (R$ 260), metodologia, atividades extras ou visitas.\n\nWhatsApp: (85) 9 9970-1822 😊";
}

// Função para adicionar mensagem ao chat
function addMessage(text, sender) {
  const container = document.getElementById("chat-messages");
  messageCount++;
  
  // Remover boas-vindas na primeira mensagem do usuário
  if (sender === "user" && messageCount === 1) {
    const welcome = container.querySelector(".message-welcome");
    if (welcome) welcome.remove();
  }
  
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "message-user" : "message-bot";
  msgDiv.innerHTML = text;
  
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
  // Fechar com ESC
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && chatOpen) {
      toggleChat();
    }
  });
  
  console.log("🤖 Widget do Chatbot carregado com sucesso!");
});

// Exportar funções para uso global
if (typeof window !== "undefined") {
  window.toggleChat = toggleChat;
  window.sendMessage = sendMessage;
}