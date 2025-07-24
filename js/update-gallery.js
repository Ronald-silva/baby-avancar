// Script para atualizar galeria com imagens reais
// Execute no console do navegador ou como Node.js script

const galleryImages = [
    {
        id: 'modal1',
        category: 'atividades',
        src: 'img/galeria/atividades/arte-1.jpg',
        title: 'Artes e Criatividade',
        description: 'Desenvolvimento da expressão artística das crianças',
        tag: 'Atividades'
    },
    {
        id: 'modal2',
        category: 'atividades',
        src: 'img/galeria/atividades/educacao-fisica-1.jpg',
        title: 'Atividades Físicas',
        description: 'Desenvolvimento motor e trabalho em equipe',
        tag: 'Atividades'
    },
    {
        id: 'modal3',
        category: 'eventos',
        src: 'img/galeria/eventos/festa-junina-1.jpg',
        title: 'Festa Junina 2024',
        description: 'Celebração tradicional com toda a comunidade escolar',
        tag: 'Eventos'
    },
    {
        id: 'modal4',
        category: 'eventos',
        src: 'img/galeria/eventos/formatura-1.jpg',
        title: 'Formatura Infantil V',
        description: 'Momento especial de conquista dos nossos pequenos',
        tag: 'Eventos'
    },
    {
        id: 'modal5',
        category: 'estrutura',
        src: 'img/galeria/estrutura/sala-aula-1.jpg',
        title: 'Salas de Aula',
        description: 'Ambientes preparados para o aprendizado',
        tag: 'Estrutura'
    },
    {
        id: 'modal6',
        category: 'estrutura',
        src: 'img/galeria/estrutura/playground-1.jpg',
        title: 'Área de Recreação',
        description: 'Espaço seguro para brincadeiras e atividades ao ar livre',
        tag: 'Estrutura'
    },
    {
        id: 'modal7',
        category: 'educacao',
        src: 'img/galeria/educacao/leitura-1.jpg',
        title: 'Hora da Leitura',
        description: 'Incentivo ao amor pelos livros desde cedo',
        tag: 'Educação'
    },
    {
        id: 'modal8',
        category: 'educacao',
        src: 'img/galeria/educacao/ciencias-1.jpg',
        title: 'Experimentos',
        description: 'Descobrindo o mundo através da ciência',
        tag: 'Educação'
    }
];

// Função para gerar HTML da galeria
function generateGalleryHTML() {
    return galleryImages.map(img => `
        <div class="gallery-item fade-in" data-category="${img.category}">
            <div class="gallery-card">
                <div class="gallery-image">
                    <img src="${img.src}" 
                         alt="${img.title}" 
                         loading="lazy"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="placeholder-image" style="display: none;">
                        <i class="fas fa-image"></i>
                        <p>${img.title}</p>
                    </div>
                    <div class="gallery-overlay">
                        <button class="gallery-btn" onclick="openModal('${img.id}', '${img.src}')">
                            <i class="fas fa-expand"></i>
                        </button>
                    </div>
                </div>
                <div class="gallery-info">
                    <h3>${img.title}</h3>
                    <p>${img.description}</p>
                    <span class="gallery-tag">${img.tag}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Para usar: copie o resultado e cole no HTML
console.log(generateGalleryHTML());