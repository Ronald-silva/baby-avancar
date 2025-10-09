// ========================================
// CHATBOT API CONNECTOR
// Conecta a interface do chat com a API do backend
// ========================================

/**
 * Envia a mensagem do usuário para a API do chatbot e retorna a resposta.
 * @param {string} message A mensagem do usuário.
 * @param {string} sessionId ID da sessão para manter contexto.
 * @returns {Promise<string>} A resposta do bot.
 */
async function getBotResponse(message, sessionId = null) {
  try {
    console.log(`Enviando para API: "${message}"`);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      console.error('Erro na resposta da API:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Detalhes do erro:', errorText);
      return "Ops! Tivemos um problema de comunicação com minha inteligência. 😥 Por favor, tente novamente ou contate-nos pelo WhatsApp: (85) 99970-1822.";
    }

    const result = await response.json();
    console.log('Resposta da API recebida:', result);
    return result.response;

  } catch (error) {
    console.error('Erro fatal ao chamar a API:', error);
    return "Não foi possível conectar ao nosso servidor. 😥 Verifique sua conexão ou tente mais tarde. Se o problema persistir, nosso WhatsApp é (85) 99970-1822.";
  }
}

// Exporta a função para ser usada pelo widget do chat.
// A verificação `typeof module` garante compatibilidade com diferentes ambientes.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getBotResponse };
}
