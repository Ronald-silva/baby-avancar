// API para o dashboard
const { analytics } = require('./analytics');

async function dashboardHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  
  try {
    const report = analytics.getPerformanceReport();
    return res.status(200).json(report);
  } catch (error) {
    console.error('Erro no dashboard:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}

module.exports = dashboardHandler;