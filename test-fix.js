// Teste das correções específicas
const fetch = require('node-fetch');

async function testFixes() {
  console.log('🔧 TESTANDO CORREÇÕES ESPECÍFICAS');
  console.log('='.repeat(50));
  
  const baseUrl = 'http://localhost:3003/api/chat';
  
  const tests = [
    "qual o valor do bombeiro mirim?",
    "quanto custa o jiu-jitsu?", 
    "valor do reforço escolar",
    "a escola tem reforço?",
    "qual valor e horarios do reforço?",
    "quais atividades extracurriculares?",
    "quanto é o bombeiro mirim?"
  ];
  
  for (const message of tests) {
    console.log(`\n👤 Pergunta: "${message}"`);
    
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          sessionId: 'test_fix_' + Date.now() 
        })
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

testFixes();