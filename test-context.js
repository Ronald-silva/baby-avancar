// ========================================
// TESTE DE CONTEXTO CONVERSACIONAL
// Verifica se o chatbot mantém contexto
// ========================================

const chatHandler = require('./api/chat.js');

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

async function testMessage(message, sessionId) {
  const { mockReq, mockRes, getResponse } = createMockReqRes(message, sessionId);
  await chatHandler(mockReq, mockRes);
  const { data } = getResponse();
  return data.response;
}

async function testContextualConversation() {
  console.log('🧠 TESTE DE CONTEXTO CONVERSACIONAL');
  console.log('='.repeat(50));
  
  const sessionId = 'context_test_' + Date.now();
  
  // Conversa 1: Pergunta sobre idade e resposta contextual
  console.log('\n💬 CONVERSA CONTEXTUAL:');
  console.log('─'.repeat(30));
  
  console.log('👤 Usuário: "Qual o valor da mensalidade?"');
  const response1 = await testMessage('Qual o valor da mensalidade?', sessionId);
  console.log('🤖 Bot:', response1.substring(0, 100) + '...');
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('\n👤 Usuário: "Meu filho tem 4 anos"');
  const response2 = await testMessage('Meu filho tem 4 anos', sessionId);
  console.log('🤖 Bot:', response2.substring(0, 150) + '...');
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('\n👤 Usuário: "E os livros?"');
  const response3 = await testMessage('E os livros?', sessionId);
  console.log('🤖 Bot:', response3.substring(0, 150) + '...');
  
  // Teste de diferentes tipos de resposta
  console.log('\n\n🎯 TESTE DE TIPOS DE RESPOSTA:');
  console.log('─'.repeat(30));
  
  const testCases = [
    { input: 'Oi', expected: 'saudação' },
    { input: 'Obrigada', expected: 'agradecimento' },
    { input: 'Onde vocês ficam?', expected: 'localização' },
    { input: 'WhatsApp', expected: 'contato' }
  ];
  
  for (const test of testCases) {
    console.log(`\n👤 "${test.input}" (esperado: ${test.expected})`);
    const response = await testMessage(test.input, 'quick_test_' + Date.now());
    console.log(`🤖 ${response.substring(0, 80)}...`);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log('\n✅ Teste de contexto concluído!');
}

testContextualConversation().catch(console.error);