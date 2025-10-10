// Teste específico para reforço escolar
const fetch = require('node-fetch');

async function testReforco() {
  const baseUrl = 'http://localhost:3000/api/chat';
  
  const tests = [
    "A escola tem reforço?",
    "5", // idade
    "Qual o valor do reforço?"
  ];
  
  const sessionId = 'test_reforco_' + Date.now();
  
  for (const message of tests) {
    console.log(`\n👤 Usuário: "${message}"`);
    
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId })
      });
      
      const data = await response.json();
      console.log(`🤖 Bot: ${data.response}`);
      console.log(`📊 Modelo: ${data.model}`);
      
      // Pausa entre mensagens
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('❌ Erro:', error.message);
    }
  }
}

testReforco();