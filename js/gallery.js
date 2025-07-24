// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter gallery items
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
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentItems = 8;
    const itemsPerLoad = 4;
    
    loadMoreBtn.addEventListener('click', () => {
        // Simulate loading more items
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
        
        setTimeout(() => {
            // Here you would typically load more items from server
            // For demo, we'll just show a message
            loadMoreBtn.innerHTML = '<i class="fas fa-check"></i> Todas as fotos carregadas';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.6';
        }, 1500);
    });
});

// Modal functionality
function openModal(modalId, imageSrc = null) {
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTag = document.getElementById('modalTag');
    const modalImageContainer = modal.querySelector('.modal-image');
    
    // Sample data - in real implementation, this would come from your data source
    const modalData = {
        modal1: {
            title: 'Atividades Artísticas',
            description: 'Nossas crianças desenvolvem sua criatividade através de diversas atividades artísticas, incluindo pintura, desenho e trabalhos manuais. Cada obra é uma expressão única da personalidade de cada aluno.',
            tag: 'Atividades'
        },
        modal2: {
            title: 'Educação Física',
            description: 'As atividades físicas são fundamentais para o desenvolvimento motor das crianças. Nossos alunos participam de jogos, brincadeiras e exercícios que promovem a coordenação e o trabalho em equipe.',
            tag: 'Atividades'
        },
        modal3: {
            title: 'Festa Junina 2024',
            description: 'Nossa tradicional Festa Junina reuniu toda a comunidade escolar em uma celebração cheia de alegria, danças típicas, comidas tradicionais e muita diversão para toda a família.',
            tag: 'Eventos'
        },
        modal4: {
            title: 'Formatura Infantil V',
            description: 'Um momento muito especial para nossos pequenos que concluem o Infantil V. A cerimônia de formatura marca uma importante conquista e o início de uma nova etapa educacional.',
            tag: 'Eventos'
        },
        modal5: {
            title: 'Salas de Aula',
            description: 'Nossas salas de aula são cuidadosamente preparadas para proporcionar um ambiente acolhedor e estimulante para o aprendizado, com materiais pedagógicos adequados para cada faixa etária.',
            tag: 'Estrutura'
        },
        modal6: {
            title: 'Área de Recreação',
            description: 'Nossa área externa oferece um espaço seguro e amplo para as crianças brincarem e se exercitarem ao ar livre, com playground e áreas verdes que estimulam o contato com a natureza.',
            tag: 'Estrutura'
        },
        modal7: {
            title: 'Hora da Leitura',
            description: 'Incentivamos o amor pela leitura desde cedo através de atividades lúdicas e contação de histórias, desenvolvendo o vocabulário e a imaginação das crianças.',
            tag: 'Educação'
        },
        modal8: {
            title: 'Experimentos Científicos',
            description: 'Através de experimentos simples e seguros, as crianças descobrem o mundo da ciência de forma divertida e educativa, despertando a curiosidade e o pensamento científico.',
            tag: 'Educação'
        }
    };
    
    const data = modalData[modalId];
    if (data) {
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        modalTag.textContent = data.tag;
        
        // Update modal image if imageSrc is provided
        if (imageSrc) {
            modalImageContainer.innerHTML = `
                <img src="${imageSrc}" 
                     alt="${data.title}" 
                     style="width: 100%; height: 100%; object-fit: cover;"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="placeholder-image large" style="display: none;">
                    <i class="fas fa-image"></i>
                    <p>Imagem não encontrada</p>
                </div>
            `;
        }
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animate modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Close modal when clicking outside
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Lazy loading simulation for gallery items
function observeGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Simulate image loading
                const placeholder = entry.target.querySelector('.placeholder-image');
                if (placeholder) {
                    setTimeout(() => {
                        placeholder.classList.add('loaded');
                    }, Math.random() * 500 + 200);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    galleryItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize lazy loading
observeGalleryItems();