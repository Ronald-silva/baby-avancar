// ========================================
// TESTE DO SISTEMA OTIMIZADO
// ========================================

const fetch = require('node-fetch');

async function testOptimizedSystem() {
  console.log('🚀 TESTANDO SISTEMA OTIMIZADO');
  console.log('='.repeat(50));
  
  const baseUrl = 'http://localhost:3003/api/chat';
  const sessionId = 'test_optimized_' + Date.now();
  
  const tests = [
    // Testes de cache (devem ser ultra-rápidos)
    { message: "Oi", expectedModel: "cache" },
    { message: "Qual o valor da mensalidade?", expectedModel: "cache" },
    { message: "Onde vocês ficam?", expectedModel: "cache" },
    { message: "WhatsApp", expectedModel: "cache" },
    
    // Testes de contexto (IA otimizada)
    { message: "5", expectedModel: "gpt-4o-mini" }, // Idade após pergunta de valor
    { message: "A escola tem reforço?", expectedModel: "gpt-4o-mini" },
    { message: "Qual o valor do reforço para 5 anos?", expectedModel: "gpt-4o-mini" },
  ];
  
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    console.log(`\n📝 Teste ${i + 1}: "${test.message}"`);
    
    const startTime = Date.now();
    
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: test.message, 
          sessionId 
        })
      });
      
      const data = await response.json();
      const responseTime = Date.now() - startTime;
      
      console.log(`⚡ Tempo: ${responseTime}ms`);
      console.log(`🤖 Modelo: ${data.model}`);
      console.log(`💬 Resposta: ${data.response.substring(0, 100)}...`);
      
      // Verificações de performance
      if (test.expectedModel === 'cache' && responseTime > 100) {
        console.log(`⚠️  ATENÇÃO: Cache deveria ser <100ms, foi ${responseTime}ms`);
      }
      
      if (test.expectedModel === 'gpt-4o-mini' && responseTime > 2000) {
        console.log(`⚠️  ATENÇÃO: IA deveria ser <2000ms, foi ${responseTime}ms`);
      }
      
      if (data.model === test.expectedModel) {
        console.log(`✅ Modelo correto: ${data.model}`);
      } else {
        console.log(`❌ Modelo esperado: ${test.expectedModel}, recebido: ${data.model}`);
      }
      
    } catch (error) {
      console.log(`❌ Erro: ${error.message}`);
    }
    
    // Pausa entre testes
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n🎯 TESTE DE PERFORMANCE CONCLUÍDO!');
  console.log('='.repeat(50));
}

// Executar se chamado diretamente
if (require.main === module) {
  testOptimizedSystem().catch(console.error);
}

module.exports = { testOptimizedSystem };