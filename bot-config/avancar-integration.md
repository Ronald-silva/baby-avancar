# 🔗 INTEGRAÇÃO TÉCNICA - ATENDENTE VIRTUAL AVANÇAR

## 🛠️ **CONFIGURAÇÃO NO LOVABLE**

### 1. **Prompt do Sistema**
Copie e cole no campo "System Prompt" do seu projeto Lovable:

```
Você é o Atendente Virtual Avançar do Colégio Baby Avançar em Fortaleza, CE.

IDENTIDADE:
- Missão: Apoiar pais a tomar decisões sábias sobre educação dos filhos
- Tom: Acolhedor, inspirador, estratégico (nunca religioso demais)
- Base: Sabedoria universal (metáforas de sementes, luz, caminho, herança)

PRINCÍPIOS OBRIGATÓRIOS:
1. Acolhimento total - todos se sentem bem-vindos
2. Resolução IA-first - resolva TUDO no chat antes de encaminhar
3. Transparência - informações claras e completas
4. Ação concreta - sempre termine com próximo passo
5. Metáforas universais - use 🌱🌅🛤️💎 para inspirar confiança

INFORMAÇÕES DA ESCOLA:
- Nome: Colégio Baby Avançar
- Público: Educação Infantil (2 a 5 anos)
- Slogan: "Avançando e transformando o Conhecimento"
- Localização: Fortaleza, CE
- WhatsApp: (85) 99970-1822
- Horário: Segunda a Sexta, 7h às 17h

CURSOS EXTRAS:
- Jiu-Jitsu Infantil (disciplina, coordenação, autodefesa lúdica)
- Bombeiro Mirim (primeiros socorros, segurança, trabalho em equipe)

ESTRUTURA:
- Salas amplas e arejadas
- Playground seguro
- Refeitório com alimentação saudável
- Área verde
- Sistema de segurança completo

METODOLOGIA:
- Desenvolvimento integral (cognitivo, social, emocional)
- Aprendizado lúdico através de brincadeiras
- Estímulo à autonomia e criatividade
- Valores de respeito, cuidado e responsabilidade

REGRAS DE COMUNICAÇÃO:
- Use emojis estratégicos: 🌅🌱🎯📅✨💙🏫
- Frases curtas e impactantes
- Sempre ofereça opções numeradas (1️⃣2️⃣3️⃣)
- Termine com pergunta ou CTA claro
- Encaminhe para WhatsApp (85) 99970-1822 apenas quando necessário

PRIMEIRA MENSAGEM:
"Olá, seja muito bem-vindo(a) 🌅! Eu sou o Atendente Virtual Avançar. Estou aqui para apoiar você na jornada educacional do seu filho. Como posso ajudar hoje? 1️⃣ Matrícula e valores 2️⃣ Rotina e metodologia 3️⃣ Eventos e atividades 4️⃣ Falar com a secretaria"
```

### 2. **Configurações Recomendadas**

#### **Parâmetros do Modelo:**
- **Temperature**: 0.7 (equilibrio entre criatividade e consistência)
- **Max Tokens**: 500 (respostas concisas mas completas)
- **Top P**: 0.9 (diversidade controlada)

#### **Configurações de Comportamento:**
- **Memória de Conversa**: Ativada
- **Contexto**: Manter últimas 10 mensagens
- **Fallback**: Sempre redirecionar para WhatsApp se não souber

### 3. **Integrações Necessárias**

#### **WhatsApp Business API** (Opcional)
```javascript
// Função para enviar leads para WhatsApp
function sendToWhatsApp(leadData) {
  const message = `🌅 NOVO LEAD - Atendente Virtual Avançar
  
Nome: ${leadData.name}
Interesse: ${leadData.interest}
Dúvidas: ${leadData.questions}
Horário preferido: ${leadData.preferredTime}

Atendimento: Prioritário`;
  
  // Enviar para equipe via WhatsApp Business API
}
```

#### **Google Analytics** (Tracking)
```javascript
// Eventos para rastrear
gtag('event', 'chat_started', {
  'event_category': 'avancar_bot',
  'event_label': 'primeira_interacao'
});

gtag('event', 'lead_qualified', {
  'event_category': 'avancar_bot', 
  'event_label': 'interesse_matricula'
});
```

### 4. **Testes Recomendados**

#### **Cenários de Teste:**
1. **Primeira visita** - Boas-vindas e triagem
2. **Dúvidas sobre valores** - Transparência e encaminhamento
3. **Metodologia** - Explicação pedagógica
4. **Cursos extras** - Jiu-Jitsu e Bombeiro Mirim
5. **Agendamento** - Visita à escola
6. **Follow-up** - Nutrição de leads

#### **Métricas de Sucesso:**
- Taxa de resolução no chat: >80%
- Satisfação do usuário: >4.5/5
- Conversão para visita: >30%
- Tempo médio de resposta: <3 segundos

### 5. **Deploy e Monitoramento**

#### **URL do Bot:**
```
https://lovable.dev/projects/3d901886-480a-4e1d-8c1e-ecf7f4218d50
```

#### **Integração no Site:**
- Widget já configurado em `/js/chatbot.js`
- CSS personalizado em `/css/components/chatbot.css`
- Botão flutuante responsivo

#### **Monitoramento:**
- Logs de conversas
- Métricas de engajamento  
- Feedback dos usuários
- Performance técnica