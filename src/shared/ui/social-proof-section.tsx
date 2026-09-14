import Image from "next/image";
import { MotionReveal } from "@/shared/ui/motion-reveal";

// Redesign da Home: Depoimentos e Galeria eram duas seções inteiras contando
// a mesma história (confiança de quem já vive a escola) de dois jeitos —
// texto numa tela, fotos noutra. Fundidas aqui num só bloco: uma citação em
// destaque real (Ronald, pai do Arthur — foto e depoimento já existentes,
// nada inventado) ao lado de uma seleção compacta de 4 fotos do acervo.
// Nenhuma nota em estrelas — o legado exibia 5 fixas nos três depoimentos,
// sem fonte de avaliação real por trás do número.
const featuredTestimonial = {
  quote:
    "Tomar a decisão de tirar meu filho Arthur da escola municipal foi difícil, mas necessária. Desde que chegou ao Colégio Baby Avançar, a transformação foi impressionante!",
  name: "Ronald",
  role: "Pai do Arthur, 6 anos",
  photo: { src: "/media/perfil.jpeg", alt: "Ronald, pai do Arthur, aluno do Colégio Baby Avançar" },
};

const shortTestimonials = [
  {
    quote: "O que mais nos impressionou foi o compromisso com a formação integral das crianças.",
    name: "Carlos Oliveira",
    role: "Pai do Pedro, 7 anos",
  },
  {
    quote: "A equipe pedagógica entende cada criança individualmente e adapta o ensino às necessidades específicas.",
    name: "Fernanda Costa",
    role: "Mãe da Sofia, 4 anos",
  },
] as const;

const photos = [
  {
    src: "/media/gallery/acolhimento-familia.jpg",
    alt: "Mãe sorridente abraçando as duas filhas gêmeas em evento de boas-vindas do Colégio Baby Avançar",
    // Retrato 720x1280; rostos no terço superior. Sem ancorar no topo, o
    // crop quadrado (56% da altura original visível) corta a testa da mãe.
    objectPosition: "50% 20%",
  },
  {
    src: "/media/home/proposta-pedagogica.jpg",
    alt: "Aluna comemorando com os braços erguidos durante brincadeira com bambolê e bolinhas coloridas no Colégio Baby Avançar",
    objectPosition: "50% 15%",
  },
  {
    src: "/media/gallery/jiu-jitsu-interacao.jpg",
    alt: "Aluna orientando um colega mais novo durante treino de Jiu-Jitsu no tatame do Colégio Baby Avançar",
    objectPosition: "50% 50%",
  },
  {
    src: "/media/gallery/evento-parquinho.jpg",
    alt: "Educadora e aluna sorrindo abraçadas em frente ao painel do evento “É hora do parquinho”",
    objectPosition: "50% 50%",
  },
] as const;

export function SocialProofSection() {
  return (
    <section aria-labelledby="prova-social-title" className="bg-canvas py-16 sm:py-20 lg:py-28" id="prova-social">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Quem já vive a escola</p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl" id="prova-social-title">
            {"Confiança que se vê no dia a dia."}
          </h2>
        </MotionReveal>

        <div className="mt-12 grid gap-10 sm:mt-14 lg:grid-cols-2 lg:items-center lg:gap-14">
          <MotionReveal>
            <figure>
              <div className="relative aspect-square w-20 overflow-hidden rounded-full shadow-soft sm:w-24">
                <Image alt={featuredTestimonial.photo.alt} className="object-cover" fill sizes="6rem" src={featuredTestimonial.photo.src} />
              </div>
              <blockquote className="mt-5 font-display text-2xl leading-snug text-ink sm:text-3xl">
                {featuredTestimonial.quote}
              </blockquote>
              <figcaption className="mt-4">
                <p className="font-semibold text-ink">{featuredTestimonial.name}</p>
                <p className="text-sm text-muted">{featuredTestimonial.role}</p>
              </figcaption>
            </figure>

            <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
              {shortTestimonials.map((testimonial) => (
                <figure key={testimonial.name}>
                  <blockquote className="text-sm leading-relaxed text-muted">{"“"}{testimonial.quote}{"”"}</blockquote>
                  <figcaption className="mt-2 text-sm font-semibold text-ink">{testimonial.name}</figcaption>
                </figure>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal className="grid grid-cols-2 gap-3 sm:gap-4" delay={0.1}>
            {photos.map((photo) => (
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl" key={photo.src}>
                <Image
                  alt={photo.alt}
                  className="object-cover transition-transform duration-300 ease-out hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 22vw, 46vw"
                  src={photo.src}
                  style={{ objectPosition: photo.objectPosition }}
                />
              </div>
            ))}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
