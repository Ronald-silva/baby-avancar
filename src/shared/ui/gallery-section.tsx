import Image from "next/image";
import { MotionReveal } from "@/shared/ui/motion-reveal";

// Seleção editorial do acervo real (img/galeria/*) — cinco fotos, uma por
// momento da vida escolar, escolhidas por qualidade de enquadramento e por
// não repetir nenhuma foto já usada em outra seção da Home (ver Bloco 3).
const dominantPhoto = {
  src: "/media/gallery/aprendizagem-volta-as-aulas.jpg",
  alt: "Menino sorridente segurando cartão de boas-vindas de volta às aulas, ao lado de blocos educativos com as letras A, B e C, no Colégio Baby Avançar",
};

const secondaryPhotos = [
  {
    src: "/media/gallery/atividade-folclore.jpg",
    alt: "Educadora fantasiada de Curupira ao lado de aluno sorridente durante atividade do Dia do Folclore",
  },
  {
    src: "/media/gallery/jiu-jitsu-interacao.jpg",
    alt: "Aluna orientando um colega mais novo durante treino de Jiu-Jitsu no tatame do Colégio Baby Avançar",
  },
  {
    src: "/media/gallery/evento-parquinho.jpg",
    alt: "Educadora e aluna sorrindo abraçadas em frente ao painel do evento “É hora do parquinho”",
  },
  {
    src: "/media/gallery/acolhimento-familia.jpg",
    alt: "Educadora com duas alunas da Educação Infantil em comemoração de volta às aulas, com balões coloridos ao fundo",
  },
] as const;

export function GallerySection() {
  return (
    <section aria-labelledby="galeria-title" className="bg-surface-muted py-16 sm:py-20 lg:py-28" id="galeria">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Vida na Baby Avançar</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl" id="galeria-title">
            {"Um dia a dia que também se aprende olhando."}
          </h2>
        </MotionReveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:h-[34rem] lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          <MotionReveal className="col-span-2 lg:col-span-2 lg:row-span-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] lg:h-full lg:rounded-[2rem]">
              <Image
                alt={dominantPhoto.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 46vw, 92vw"
                src={dominantPhoto.src}
              />
            </div>
          </MotionReveal>

          {secondaryPhotos.map((photo, index) => (
            <MotionReveal delay={0.06 * (index + 1)} key={photo.src}>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl lg:h-full lg:rounded-[1.5rem]">
                <Image
                  alt={photo.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 22vw, 46vw"
                  src={photo.src}
                />
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
