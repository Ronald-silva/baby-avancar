// Gallery functionality
document.addEventListener("DOMContentLoaded", function () {
  // Filter functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Load more functionality
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  let currentItems = 8;
  const itemsPerLoad = 4;

  loadMoreBtn.addEventListener("click", () => {
    // Simulate loading more items
    loadMoreBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Carregando...';

    setTimeout(() => {
      // Here you would typically load more items from server
      // For demo, we'll just show a message
      loadMoreBtn.innerHTML =
        '<i class="fas fa-check"></i> Todas as fotos carregadas';
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = "0.6";
    }, 1500);
  });
});

// Modal functionality
function openModal(modalId, imageSrc = null) {
  const modal = document.getElementById("imageModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalTag = document.getElementById("modalTag");
  const modalImageContainer = modal.querySelector(".modal-image");

  // Dados completos de todas as imagens da galeria
  const modalData = {
    // ATIVIDADES
    modal1: {
      title: "Atividades Pedagógicas",
      description:
        "Desenvolvimento integral através de atividades lúdicas e educativas. Nossos alunos participam de brincadeiras que estimulam o aprendizado e a criatividade de forma natural e divertida.",
      tag: "Atividades",
    },
    modal2: {
      title: "Brincadeiras Educativas",
      description:
        "Aprendizado através de jogos e atividades divertidas que desenvolvem habilidades cognitivas, motoras e sociais. Cada brincadeira é cuidadosamente planejada para maximizar o desenvolvimento infantil.",
      tag: "Atividades",
    },
    modal3: {
      title: "Atividades Criativas",
      description:
        "Desenvolvimento da criatividade e expressão artística através de pintura, desenho e trabalhos manuais. Cada criança explora sua individualidade e desenvolve suas habilidades artísticas.",
      tag: "Atividades",
    },
    modal4: {
      title: "Educação Física",
      description:
        "Desenvolvimento motor e coordenação das crianças através de atividades físicas adequadas para cada idade. Promovemos saúde, disciplina e trabalho em equipe.",
      tag: "Atividades",
    },

    // EDUCAÇÃO
    modal5: {
      title: "Ambiente Educativo",
      description:
        "Salas preparadas para o melhor aprendizado, com materiais pedagógicos modernos e ambiente acolhedor. Cada espaço é pensado para estimular a curiosidade e o desenvolvimento das crianças.",
      tag: "Educação",
    },
    modal6: {
      title: "Metodologia de Ensino",
      description:
        "Abordagem pedagógica moderna e eficaz que respeita o ritmo de cada criança. Nossa metodologia combina tradição e inovação para garantir um aprendizado significativo.",
      tag: "Educação",
    },
    modal7: {
      title: "Atividades de Leitura",
      description:
        "Incentivo ao amor pelos livros desde cedo através de contação de histórias e atividades lúdicas. Desenvolvemos o vocabulário, imaginação e o prazer pela leitura.",
      tag: "Educação",
    },
    modal8: {
      title: "Ensino Personalizado",
      description:
        "Atenção individual para cada criança, respeitando suas particularidades e ritmo de aprendizado. Nossos educadores acompanham de perto o desenvolvimento de cada aluno.",
      tag: "Educação",
    },
    modal9: {
      title: "Recursos Pedagógicos",
      description:
        "Material didático moderno e diversificado que torna o aprendizado mais interessante e eficaz. Utilizamos recursos visuais, táteis e interativos para enriquecer a experiência educativa.",
      tag: "Educação",
    },
    modal10: {
      title: "Desenvolvimento Cognitivo",
      description:
        "Estímulo ao pensamento crítico e criativo através de atividades que desafiam e desenvolvem as capacidades intelectuais das crianças de forma progressiva e adequada.",
      tag: "Educação",
    },
    modal11: {
      title: "Alfabetização",
      description:
        "Primeiros passos no mundo da leitura e escrita com metodologia lúdica e eficaz. Preparamos as crianças para o letramento de forma natural e prazerosa.",
      tag: "Educação",
    },

    // ESTRUTURA
    modal12: {
      title: "Fachada da Escola",
      description:
        "Entrada acolhedora e moderna da nossa instituição, projetada para transmitir segurança e bem-estar. O primeiro contato das famílias com nosso ambiente educativo.",
      tag: "Estrutura",
    },
    modal13: {
      title: "Salas de Aula",
      description:
        "Ambientes preparados e equipados para o ensino, com mobiliário adequado e recursos pedagógicos modernos. Cada sala é um espaço de descobertas e aprendizado.",
      tag: "Estrutura",
    },
    modal14: {
      title: "Área de Recreação",
      description:
        "Playground seguro para diversão das crianças, com equipamentos modernos e área ampla para brincadeiras. Espaço fundamental para o desenvolvimento motor e social.",
      tag: "Estrutura",
    },
    modal15: {
      title: "Pátio Interno",
      description:
        "Espaço amplo para convivência e atividades coletivas, onde as crianças socializam e participam de eventos especiais. Área coberta para atividades em qualquer clima.",
      tag: "Estrutura",
    },
    modal16: {
      title: "Biblioteca",
      description:
        "Espaço dedicado à leitura e pesquisa, com acervo adequado para cada faixa etária. Ambiente tranquilo que incentiva o hábito da leitura e o amor pelos livros.",
      tag: "Estrutura",
    },
    modal17: {
      title: "Refeitório",
      description:
        "Espaço para refeições saudáveis e nutritivas, onde as crianças aprendem hábitos alimentares adequados. Ambiente limpo e acolhedor para as refeições diárias.",
      tag: "Estrutura",
    },
    modal18: {
      title: "Área Externa",
      description:
        "Jardim e espaços verdes para contato com a natureza, proporcionando experiências ao ar livre e conexão com o meio ambiente. Área fundamental para o desenvolvimento integral.",
      tag: "Estrutura",
    },

    // EVENTOS
    modal19: {
      title: "Festa Junina",
      description:
        "Celebração das tradições culturais brasileiras com toda a comunidade escolar. Evento que resgata nossas raízes culturais e promove a integração entre famílias e escola.",
      tag: "Eventos",
    },
    modal20: {
      title: "Formatura",
      description:
        "Momento especial de celebração das conquistas dos nossos alunos. Cerimônia que marca uma importante etapa na vida educacional das crianças e suas famílias.",
      tag: "Eventos",
    },
    modal21: {
      title: "Dia das Crianças",
      description:
        "Celebração especial com muita diversão e alegria, dedicada exclusivamente aos nossos pequenos. Dia repleto de brincadeiras, surpresas e momentos inesquecíveis.",
      tag: "Eventos",
    },
    modal22: {
      title: "Apresentações Culturais",
      description:
        "Demonstração dos talentos e habilidades dos alunos através de apresentações artísticas e culturais. Momento de valorização das conquistas e desenvolvimento das crianças.",
      tag: "Eventos",
    },
    modal23: {
      title: "Feira de Ciências",
      description:
        "Exposição de descobertas e experimentos científicos realizados pelos alunos. Evento que estimula a curiosidade científica e o pensamento investigativo das crianças.",
      tag: "Eventos",
    },
    modal24: {
      title: "Olimpíadas Escolares",
      description:
        "Competições esportivas que promovem o espírito de equipe, fair play e vida saudável. Evento que desenvolve valores importantes através do esporte.",
      tag: "Eventos",
    },
    modal25: {
      title: "Festa da Família",
      description:
        "Evento de integração entre escola e famílias, fortalecendo os laços da comunidade educativa. Momento especial de confraternização e união.",
      tag: "Eventos",
    },
    modal26: {
      title: "Natal Solidário",
      description:
        "Celebração natalina com foco em valores e solidariedade, ensinando às crianças a importância do amor ao próximo e da generosidade durante as festividades.",
      tag: "Eventos",
    },
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

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Animate modal
  setTimeout(() => {
    modal.classList.add("active");
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("active");

  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

// Close modal when clicking outside
document.getElementById("imageModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Lazy loading simulation for gallery items
function observeGalleryItems() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Simulate image loading
          const placeholder = entry.target.querySelector(".placeholder-image");
          if (placeholder) {
            setTimeout(() => {
              placeholder.classList.add("loaded");
            }, Math.random() * 500 + 200);
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    }
  );

  galleryItems.forEach((item) => {
    observer.observe(item);
  });
}

// Initialize lazy loading
observeGalleryItems();
