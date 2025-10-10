// ========================================
// SISTEMA DE TREINAMENTO CONTÍNUO
// Melhoria automática baseada em interações
// ========================================

const fs = require('fs');
const path = require('path');

class ContinuousTraining {
  constructor() {
    this.trainingData = [];
    this.patterns = new Map();
    this.loadExistingPatterns();
  }

  loadExistingPatterns() {
    try {
      const patternsFile = path.join(__dirname, 'learned-patterns.json');
      if (fs.existsSync(patternsFile)) {
        const data = JSON.parse(fs.readFileSync(patternsFile, 'utf-8'));
        this.patterns = new Map(data);
      }
    } catch (error) {
      console.log('Iniciando com padrões vazios');
    }
  }

  // Analisa interações para identificar novos padrões
  analyzeInteraction(userMessage, botResponse, feedback = null) {
    const normalized = userMessage.toLowerCase().trim();
    
    // Identifica padrões de perguntas similares
    const pattern = this.extractPattern(normalized);
    if (pattern) {
      if (!this.patterns.has(pattern)) {
        this.patterns.set(pattern, []);
      }
      
      this.patterns.get(pattern).push({
        message: userMessage,
        response: botResponse,
        feedback,
        timestamp: Date.now()
      });
    }
    
    this.savePatterns();
  }

  extractPattern(message) {
    // Identifica tipos de pergunta
    if (message.includes('valor') || message.includes('preço') || message.includes('custa')) {
      return 'pricing_questions';
    }
    
    if (message.includes('horário') || message.includes('funciona')) {
      return 'schedule_questions';
    }
    
    if (message.includes('onde') || message.includes('endereço')) {
      return 'location_questions';
    }
    
    if (message.includes('matrícula') || message.includes('matricular')) {
      return 'enrollment_questions';
    }
    
    if (message.includes('reforço')) {
      return 'tutoring_questions';
    }
    
    return null;
  }

  // Gera sugestões de melhoria
  generateImprovements() {
    const improvements = [];
    
    for (const [pattern, interactions] of this.patterns) {
      if (interactions.length >= 5) {
        const commonResponses = this.findCommonResponses(interactions);
        const avgResponseTime = this.calculateAvgResponseTime(interactions);
        
        if (avgResponseTime > 1000) {
          improvements.push({
            pattern,
            suggestion: `Adicionar resposta rápida para ${pattern}`,
            priority: 'high',
            impact: 'performance'
          });
        }
      }
    }
    
    return improvements;
  }

  findCommonResponses(interactions) {
    const responses = interactions.map(i => i.response);
    const frequency = {};
    
    responses.forEach(response => {
      frequency[response] = (frequency[response] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }

  calculateAvgResponseTime(interactions) {
    // Simulação - em produção, usar dados reais
    return interactions.length * 100;
  }

  savePatterns() {
    try {
      const patternsFile = path.join(__dirname, 'learned-patterns.json');
      fs.writeFileSync(
        patternsFile, 
        JSON.stringify(Array.from(this.patterns.entries()), null, 2)
      );
    } catch (error) {
      console.error('Erro ao salvar padrões:', error);
    }
  }

  // Relatório de aprendizado
  getLearningReport() {
    const totalPatterns = this.patterns.size;
    const totalInteractions = Array.from(this.patterns.values())
      .reduce((sum, interactions) => sum + interactions.length, 0);
    
    const topPatterns = Array.from(this.patterns.entries())
      .map(([pattern, interactions]) => ({
        pattern,
        count: interactions.length,
        lastSeen: new Date(Math.max(...interactions.map(i => i.timestamp)))
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      summary: {
        totalPatterns,
        totalInteractions,
        learningRate: `${(totalPatterns / Math.max(totalInteractions, 1) * 100).toFixed(1)}%`
      },
      topPatterns,
      improvements: this.generateImprovements()
    };
  }
}

module.exports = { ContinuousTraining };