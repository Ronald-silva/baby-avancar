// ========================================
// WIDGET DO CHATBOT - BABY AVANÇAR
// Interface e controles do chat (v2.0 - Humanizado)
// ========================================

// Variáveis globais do chat
let chatOpen = false;
let messageCount = 0;
let sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

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
    // Chama a função que contata a API com contexto de sessão
    const response = await getBotResponse(message, sessionId);
    
    // Pilar de Humanização: Atraso de digitação mais natural
    const baseDelay = Math.min(Math.max(response.length * 12, 800), 3000);
    const humanDelay = baseDelay + Math.random() * 500; // Adiciona variação humana
    await sleep(humanDelay);

    hideTypingIndicator();
    addMessage(response, "bot");

  } catch (error) {
    hideTypingIndicator();
    const errorMessages = [
      "Ops! Algo deu errado aqui... 😅 Pode tentar novamente?",
      "Eita! Tive um probleminha técnico. Tenta de novo para mim?",
      "Nossa, parece que tive uma falha. Pode repetir a pergunta? 🤔"
    ];
    const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    addMessage(randomError, "bot");
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
  
  // Mensagens de digitação mais humanizadas
  const typingMessages = [
    "💭 Pensando na melhor resposta para você...",
    "✨ Organizando as informações...",
    "📚 Consultando nossa base de dados...",
    "💙 Preparando uma resposta completa...",
    "🤔 Analisando sua pergunta..."
  ];
  
  const randomMessage = typingMessages[Math.floor(Math.random() * typingMessages.length)];
  indicator.innerHTML = randomMessage;
  
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

  // Pilar de Humanização: Saudações variadas e naturais
  try {
    const greetings = [
      "Oi! 😊 Sou o Agente Avançar! Que bom ter você aqui! Como posso ajudar sua família hoje?",
      "Olá! 👋 Eu sou o Agente Avançar do Baby Avançar! Estou aqui para tirar todas as suas dúvidas!",
      "Oi, tudo bem? 🌟 Sou o assistente virtual da escola! Vamos conversar sobre o futuro do seu pequeno?",
      "Olá! 💙 Que alegria te receber aqui! Sou o Agente Avançar e adoro ajudar famílias como a sua!"
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const welcomeText = document.querySelector(".message-welcome p");
    if(welcomeText) {
        welcomeText.innerHTML = `<strong>${randomGreeting}</strong><br />Pode me perguntar sobre matrículas, valores, atividades, metodologia... qualquer coisa! 😊`;
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
