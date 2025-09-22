// ========================================
// WIDGET DO CHATBOT - BABY AVANÇAR
// Interface e controles do chat (v2.0 - Humanizado)
// ========================================

// Variáveis globais do chat
let chatOpen = false;
let messageCount = 0;

// Helper para simular atrasos
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para alternar a visibilidade do chat
function toggleChat() {
  const container = document.getElementById("chatbot-container");
  const button = document.getElementById("chatbot-button");
  chatOpen = !chatOpen;

  if (chatOpen) {
    container.style.display = "flex";
    if (button) button.classList.add("hidden");
    container.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      const input = document.getElementById("chat-input");
      if (input) input.focus();
    }, 300);
  } else {
    container.style.display = "none";
    if (button) button.classList.remove("hidden");
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
    // Chama a função que contata a API
    const response = await getBotResponse(message);
    
    // Pilar de Humanização: Atraso de digitação dinâmico
    const typingDelay = Math.min(Math.max(response.length * 15, 600), 3500);
    await sleep(typingDelay);

    hideTypingIndicator();
    addMessage(response, "bot");

  } catch (error) {
    hideTypingIndicator();
    addMessage("Desculpe, um erro inesperado ocorreu. Por favor, tente mais tarde.", "bot");
    console.error("Erro no fluxo de envio de mensagem:", error);
  }
}

// Função para adicionar uma mensagem na interface do chat
function addMessage(text, sender) {
  const container = document.getElementById("chat-messages");
  messageCount++;
  
  // Remove a mensagem de boas-vindas na primeira interação do usuário
  if (sender === "user" && messageCount === 1) {
    const welcome = container.querySelector(".message-welcome");
    if (welcome) welcome.remove();
  }
  
  const msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "message-user" : "message-bot";
  
  // Converte quebras de linha e links para HTML
  msgDiv.innerHTML = text.replace(/\n/g, '<br>');
  
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

// Funções para mostrar/esconder o indicador de "digitando..."
function showTypingIndicator() {
  const container = document.getElementById("chat-messages");
  if (document.getElementById("typing-indicator")) return;

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

  // Pilar de Humanização: Saudações variadas
  try {
    const greetings = [
      "Olá! Sou o Agente Virtual Avançar! 🤖✨ Como posso ajudar sua família hoje?",
      "Oi! Eu sou o Agente Avançar, especialista do Colégio Baby Avançar. Pronto para tirar suas dúvidas!",
      "Bem-vindo(a) ao nosso canal de atendimento! Sou o Agente Avançar. O que você gostaria de saber?",
      "Olá! Sou o assistente virtual do Colégio Baby Avançar. 😊 Estou aqui para te ajudar a encontrar todas as informações!"
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const welcomeText = document.querySelector(".message-welcome p");
    if(welcomeText) {
        welcomeText.innerHTML = `<strong>${randomGreeting}</strong><br />Estou aqui para ajudar sua família a descobrir o melhor caminho educacional!`;
    }
  } catch (e) {
    console.error("Falha ao randomizar saudação:", e);
  }

  // Permite fechar o chat com a tecla ESC
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && chatOpen) {
      toggleChat();
    }
  });

  // Permite fechar o chat clicando fora dele (em modo desktop)
  document.addEventListener('click', (event) => {
    const container = document.getElementById('chatbot-container');
    const button = document.getElementById('chatbot-button');
    
    if (chatOpen && container && !container.contains(event.target) && button && !button.contains(event.target)) {
      toggleChat();
    }
  });
  
  console.log("🤖 Widget do Chatbot (v2.0 Humanizado) carregado e pronto!");
});

// Exporta funções para serem acessíveis globalmente (ex: onclick no HTML)
if (typeof window !== "undefined") {
  window.toggleChat = toggleChat;
  window.sendMessage = sendMessage;
}
