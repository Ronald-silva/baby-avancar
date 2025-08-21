// ========================================
// EMAILJS CONFIGURATION - COLÉGIO BABY AVANÇAR
// ========================================

// Configuração do EmailJS
const EMAILJS_CONFIG = {
  // SUBSTITUA ESTAS CHAVES PELAS SUAS DO EMAILJS
  publicKey: 'SEU_PUBLIC_KEY_AQUI',
  serviceId: 'SEU_SERVICE_ID_AQUI', 
  templateId: 'SEU_TEMPLATE_ID_AQUI'
};

// Inicializar EmailJS
(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: EMAILJS_CONFIG.publicKey,
    });
  }
})();

// Função para enviar email via EmailJS
async function sendEmailJS(formData) {
  try {
    // Preparar dados do template
    const templateParams = {
      from_name: formData.nome,
      from_email: formData.email,
      phone: formData.telefone,
      subject: formData.assunto || 'Contato do Site',
      child_age: formData['idade-crianca'] || 'Não informado',
      message: formData.mensagem,
      to_email: 'colegiobabyavancar@gmail.com', // Seu email
      reply_to: formData.email
    };

    // Enviar email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Email enviado com sucesso:', response);
    return response;

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;
  }
}

// Substituir a função sendContactEmail no script.js
if (typeof window !== 'undefined') {
  window.sendContactEmail = sendEmailJS;
}