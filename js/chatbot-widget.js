// ========================================
// WIDGET DO CHATBOT - BABY AVANÇAR
// Interface e controles do chat
// ========================================

// Variáveis globais do chat
let chatOpen = false;
let messageCount = 0;

// Função para alternar a visibilidade do chat
function toggleChat() {
  const container = document.getElementById("chatbot-container");
  chatOpen = !chatOpen;
  
  if (chatOpen) {
    container.style.display = "flex";
    container.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      const input = document.getElementById("chat-input");
      if (input) input.focus();
    }, 100);
  } else {
    container.style.display = "none";
    container.setAttribute("aria-hidden", "true");
  }
}

// Função para enviar a mensagem do usuário e obter a resposta da API
async function sendMessage(quickMsg) {
  const input = document.getElementById("chat-input");
  const message = quickMsg || input.value.trim();
  
  if (!message) return;
  
  addMessage(message, "user");
  input.value = "";
  showTypingIndicator();
  
  try {
    // Chama a função simplificada do chatbot.js que contata a API
    const response = await getBotResponse(message);
    
    hideTypingIndicator();
    addMessage(response, "bot");
  } catch (error) {
    hideTypingIndicator();
    // A função getBotResponse já trata os erros de API, mas mantemos um fallback final.
    addMessage("Desculpe, um erro inesperado ocorreu. Por favor, tente mais tarde.", "bot");
    console.error("Erro no fluxo de envio de mensagem:", error);
  }
}

// Função para adicionar uma mensagem na interface do chat
function addMessage(text, sender) {
  const container = document.getElementById("chat-messages");
  messageCount++;
  
  // Remove a mensagem de boas-vindas inicial na primeira interação do usuário
  if (sender === "user" && messageCount === 1) {
    const welcome = container.querySelector(".message-welcome");
    if (welcome) welcome.remove();
  }
  
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "message-user" : "message-bot";
  
  // Converte quebras de linha em <br> para exibição correta no HTML
  msgDiv.innerHTML = text.replace(/\n/g, '<br>');
  
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

// Funções para mostrar/esconder o indicador de "digitando..."
function showTypingIndicator() {
  const container = document.getElementById("chat-messages");
  if (document.getElementById("typing-indicator")) return; // Evita duplicatas

  const indicator = document.createElement("div");
  indicator.className = "message-bot typing-indicator";
  indicator.id = "typing-indicator";
  indicator.innerHTML = "🤖 Agente Virtual Avançar está digitando...";
  
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

function hideTypingIndicator() {
  const indicator = document.getElementById("typing-indicator");
  if (indicator) {
    indicator.remove();
  }
}

// Event listeners para funcionalidades da página
document.addEventListener("DOMContentLoaded", function() {
  // Permite fechar o chat com a tecla ESC
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && chatOpen) {
      toggleChat();
    }
  });
  
  console.log("🤖 Widget do Chatbot carregado e pronto!");
});

// Exporta funções para serem acessíveis globalmente (ex: onclick no HTML)
if (typeof window !== "undefined") {
  window.toggleChat = toggleChat;
  window.sendMessage = sendMessage;
}
