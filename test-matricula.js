// Teste específico para matrícula
const fetch = require('node-fetch');

async function testMatricula() {
  console.log('📝 TESTANDO RESPOSTAS DE MATRÍCULA');
  console.log('='.repeat(50));
  
  const baseUrl = 'http://localhost:3003/api/chat';
  
  const tests = [
    "preciso de informações sobre matrícula",
    "5", // idade
    "quais documentos preciso para matrícula?",
    "como faço para matricular meu filho?",
    "informação sobre matrícula"
  ];
  
  const sessionId = 'test_matricula_' + Date.now();
  
  for (const message of tests) {
    console.log(`\n👤 Pergunta: "${message}"`);
    
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId })
      });
      
      const data = await response.json();
      console.log(`🤖 Resposta: ${data.response}`);
      console.log(`⚡ Modelo: ${data.model}`);
      
    } catch (error) {
      console.error('❌ Erro:', error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

testMatricula();