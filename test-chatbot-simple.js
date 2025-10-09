// ========================================
// TESTE SIMPLES DO CHATBOT
// Testa as funcionalidades diretamente
// ========================================

const chatHandler = require('./api/chat.js');

// Simular requisição e resposta
function createMockReqRes(message, sessionId = 'test_session') {
  const mockReq = {
    method: 'POST',
    body: { message, sessionId }
  };

  let responseData = null;
  let statusCode = null;

  const mockRes = {
    status: (code) => {
      statusCode = code;
      return {
        json: (data) => {
          responseData = data;
        },
        end: () => {}
      };
    },
    setHeader: () => {}
  };

  return { mockReq, mockRes, getResponse: () => ({ statusCode, data: responseData }) };
}

// Função de teste
async function testChatbot(message, sessionId = 'test_session') {
  console.log(`\n🧪 TESTE: "${message}"`);
  console.log('─'.repeat(50));
  
  try {
    const { mockReq, mockRes, getResponse } = createMockReqRes(message, sessionId);
    
    await chatHandler(mockReq, mockRes);
    
    const { statusCode, data } = getResponse();
    
    if (statusCode === 200 && data) {
      console.log(`✅ Status: ${statusCode}`);
      console.log(`🤖 Modelo: ${data.model}`);
      console.log(`💬 Resposta: ${data.response}`);
    } else {
      console.log(`❌ Erro: Status ${statusCode}`, data);
    }
    
  } catch (error) {
    console.log(`❌ Erro fatal:`, error.message);
  }
}

// Executar testes
async function runTests() {
  console.log('🚀 INICIANDO TESTES DO CHATBOT HUMANIZADO');
  console.log('='.repeat(60));
  
  const testCases = [
    // Teste 1: Saudação
    'Oi',
    
    // Teste 2: Pergunta sobre valores
    'Qual o valor da mensalidade?',
    
    // Teste 3: Idade específica (contexto)
    'Meu filho tem 3 anos',
    
    // Teste 4: Localização
    'Onde vocês ficam?',
    
    // Teste 5: Atividades extras
    'Que atividades extras vocês têm?',
    
    // Teste 6: Agradecimento
    'Obrigada pela ajuda',
    
    // Teste 7: Contato
    'Quero falar com alguém',
    
    // Teste 8: Matrícula
    'Como faço para matricular meu filho?'
  ];
  
  const sessionId = 'test_session_' + Date.now();
  
  for (let i = 0; i < testCases.length; i++) {
    await testChatbot(testCases[i], sessionId);
    
    // Pequena pausa entre testes
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n🎉 TESTES CONCLUÍDOS!');
  console.log('='.repeat(60));
}

// Verificar se tem API key
if (!process.env.OPENAI_API_KEY) {
  console.log('⚠️  AVISO: OPENAI_API_KEY não encontrada no .env');
  console.log('   Apenas respostas locais serão testadas.');
}

// Executar
runTests().catch(console.error);