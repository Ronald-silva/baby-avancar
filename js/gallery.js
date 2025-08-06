// ========================================
// GALERIA SIMPLIFICADA - COLÉGIO BABY AVANÇAR
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Filtros da galeria
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Funcionalidade dos filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona active ao botão clicado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filtra os itens
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Modal simples
function openModal(imageSrc) {
    // Cria o modal se não existir
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
                <img class="modal-image" src="" alt="Imagem da galeria">
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Define a imagem e mostra o modal
    const modalImage = modal.querySelector('.modal-image');
    modalImage.src = imageSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Fechar modal clicando fora da imagem
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Lazy loading simples - CORRIGIDO
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-item img');
    
    // Garantir que todas as imagens sejam visíveis
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.display = 'block';
    });
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Não definir opacity 0 - deixar visível
                    img.addEventListener('load', () => {
                        img.style.opacity = '1';
                    });
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});