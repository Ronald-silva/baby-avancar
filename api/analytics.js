// ========================================
// SISTEMA DE ANALYTICS E MONITORAMENTO
// Para otimização contínua do agente
// ========================================

class AgentAnalytics {
  constructor() {
    this.metrics = {
      totalInteractions: 0,
      cacheHits: 0,
      aiCalls: 0,
      averageResponseTime: 0,
      commonQuestions: new Map(),
      errorRate: 0,
      userSatisfaction: new Map()
    };
    
    this.responseTimes = [];
    this.errors = [];
  }

  // Registra interação
  logInteraction(message, responseTime, model, error = false) {
    this.metrics.totalInteractions++;
    
    if (model === 'cache') {
      this.metrics.cacheHits++;
    } else {
      this.metrics.aiCalls++;
    }
    
    // Tempo de resposta
    this.responseTimes.push(responseTime);
    if (this.responseTimes.length > 100) {
      this.responseTimes.shift(); // Mantém apenas os últimos 100
    }
    
    this.metrics.averageResponseTime = 
      this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;
    
    // Perguntas comuns
    const question = message.toLowerCase().trim();
    this.metrics.commonQuestions.set(
      question, 
      (this.metrics.commonQuestions.get(question) || 0) + 1
    );
    
    // Taxa de erro
    if (error) {
      this.errors.push(Date.now());
      // Remove erros antigos (últimas 24h)
      const dayAgo = Date.now() - (24 * 60 * 60 * 1000);
      this.errors = this.errors.filter(time => time > dayAgo);
    }
    
    this.metrics.errorRate = this.errors.length / this.metrics.totalInteractions;
  }

  // Relatório de performance
  getPerformanceReport() {
    const cacheEfficiency = (this.metrics.cacheHits / this.metrics.totalInteractions) * 100;
    
    const topQuestions = Array.from(this.metrics.commonQuestions.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return {
      summary: {
        totalInteractions: this.metrics.totalInteractions,
        cacheEfficiency: `${cacheEfficiency.toFixed(1)}%`,
        averageResponseTime: `${this.metrics.averageResponseTime.toFixed(0)}ms`,
        errorRate: `${(this.metrics.errorRate * 100).toFixed(2)}%`
      },
      topQuestions: topQuestions.map(([question, count]) => ({
        question,
        count,
        percentage: ((count / this.metrics.totalInteractions) * 100).toFixed(1) + '%'
      })),
      recommendations: this.generateRecommendations(cacheEfficiency)
    };
  }

  generateRecommendations(cacheEfficiency) {
    const recommendations = [];
    
    if (cacheEfficiency < 60) {
      recommendations.push("Adicionar mais padrões ao cache para melhorar performance");
    }
    
    if (this.metrics.averageResponseTime > 2000) {
      recommendations.push("Otimizar prompts da IA para respostas mais rápidas");
    }
    
    if (this.metrics.errorRate > 0.05) {
      recommendations.push("Investigar e corrigir causas de erro");
    }
    
    return recommendations;
  }
}

// Instância global
const analytics = new AgentAnalytics();

module.exports = { analytics };