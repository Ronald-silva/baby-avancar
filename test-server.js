// ========================================
// SERVIDOR DE TESTE LOCAL - CHATBOT API
// Simula o ambiente Vercel para testes
// ========================================

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente do .env (se existir)
require('dotenv').config();

// Importar a função da API (simulando Vercel)
const chatHandler = require('./api/chat.js');

const PORT = 3001;

// Tipos MIME para servir arquivos estáticos
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  console.log(`📡 ${req.method} ${pathname}`);

  // Rota da API do chatbot
  if (pathname === '/api/chat') {
    if (req.method === 'OPTIONS') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      res.end();
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        try {
          // Simular objeto req/res do Vercel
          const mockReq = {
            method: 'POST',
            body: JSON.parse(body)
          };

          const mockRes = {
            status: (code) => ({
              json: (data) => {
                res.writeHead(code, {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify(data));
              },
              end: () => {
                res.writeHead(code);
                res.end();
              }
            }),
            setHeader: (key, value) => {
              // Headers já definidos acima
            }
          };

          // Chamar a função da API
          await chatHandler(mockReq, mockRes);
        } catch (error) {
          console.error('❌ Erro na API:', error);
          res.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(JSON.stringify({ error: 'Erro interno do servidor' }));
        }
      });
      return;
    }
  }

  // Servir arquivos estáticos
  let filePath = pathname === '/' ? '/index.html' : pathname;
  filePath = path.join(__dirname, filePath);

  // Verificar se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Arquivo não encontrado</h1>');
      return;
    }

    // Determinar tipo MIME
    const ext = path.extname(filePath);
    const mimeType = mimeTypes[ext] || 'text/plain';

    // Ler e servir o arquivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Erro interno do servidor</h1>');
        return;
      }

      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor de teste rodando em http://localhost:${PORT}`);
  console.log(`📱 Teste o chatbot em: http://localhost:${PORT}`);
  console.log(`🔧 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`\n🔑 Variáveis de ambiente:`);
  console.log(`   CHAVE_API_DO_ROTEADOR_OPEN: ${process.env.CHAVE_API_DO_ROTEADOR_OPEN ? '✅ Configurada' : '❌ Não encontrada'}`);
  console.log(`   OPENROUTER_API_KEY: ${process.env.OPENROUTER_API_KEY ? '✅ Configurada' : '❌ Não encontrada'}`);
  console.log(`   OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '✅ Configurada' : '❌ Não encontrada'}`);
  console.log(`\n💡 Para parar o servidor: Ctrl+C`);
});

// Tratamento de erros
process.on('uncaughtException', (err) => {
  console.error('❌ Erro não capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada:', reason);
});