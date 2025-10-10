// Teste das correções de matrícula e menu
const fetch = require('node-fetch');

async function testCorrecoes() {
  console.log('🔧 TESTANDO CORREÇÕES - MATRÍCULA E MENU');
  console.log('='.repeat(50));
  
  const baseUrl = 'http://localhost:3003/api/chat';
  
  const tests = [
    "preciso de informação sobre matrícula",
    "5", // idade
    "a escola tem merenda?",
    "manda o menu pra mim",
    "cardápio da escola",
    "menu dos lanches"
  ];
  
  const sessionId = 'test_correcoes_' + Date.now();
  
  for (const message of tests) {
    console.log(`\n👤 Pergunta: "${message}"`);
    
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId })
      });
      
      const data = await response.json();
      console.log(`🤖 Resposta: ${data.response.substring(0, 200)}...`);
      console.log(`⚡ Modelo: ${data.model}`);
      
    } catch (error) {
      console.error('❌ Erro:', error.message);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

testCorrecoes();