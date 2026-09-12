import Image from "next/image";
import { MotionReveal } from "@/shared/ui/motion-reveal";

// Atividades confirmadas no conteúdo legado (index.html / cursos-extras.html).
// Ballet fica de fora nesta rodada por falta de foto/texto reais — quando
// existir conteúdo real, vira um quarto item nesta mesma lista, sem mudar a
// estrutura da seção (ver AGENTS.md, Bloco 2, item 4).
const activities = [
  {
    name: "Jiu-Jitsu",
    description:
      "Arte marcial que desenvolve disciplina, respeito, coordenação motora e autoconfiança, além de ensinar defesa pessoal de forma lúdica.",
    details: "A partir de 2 anos · 2x por semana",
    image: {
      src: "/media/home/atividade-jiujitsu.jpg",
      alt: "Duas crianças sorrindo durante aula de Jiu-Jitsu, vestindo kimono, em treino no Colégio Baby Avançar",
    },
  },
  {
    name: "Bombeiro Mirim & Primeiros Socorros",
    description:
      "Curso educativo que ensina noções básicas de primeiros socorros, desenvolvendo responsabilidade e cuidado com o próximo.",
    details: "A partir de 5 anos · 1x por semana",
    image: {
      src: "/media/home/atividade-bombeiro.jpg",
      alt: "Crianças fantasiadas de bombeiro mirim, com capacete vermelho, em desfile do Colégio Baby Avançar",
    },
    detailImage: {
      src: "/media/home/atividade-bombeiro-detalhe.jpg",
      alt: "Criança praticando manobra de primeiros socorros em manequim de treino, orientada por instrutor",
    },
  },
] as const;

export function ActivitiesSection() {
  return (
    <section aria-labelledby="atividades-title" className="overflow-hidden bg-surface py-16 sm:py-20 lg:py-28" id="atividades">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Atividades</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl" id="atividades-title">
            {"A formação continua fora da sala de aula."}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {"Jiu-Jitsu e Bombeiro Mirim ampliam o que a criança vive na escola — sempre de um jeito lúdico e adequado à idade."}
          </p>
        </MotionReveal>

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 lg:gap-28">
          {/* Jiu-Jitsu — foto à esquerda */}
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <MotionReveal className="lg:col-span-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
                <Image
                  alt={activities[0].image.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  src={activities[0].image.src}
                />
              </div>
            </MotionReveal>
            <MotionReveal className="lg:col-span-6" delay={0.1}>
              <h3 className="font-display text-2xl text-ink sm:text-3xl">{activities[0].name}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{activities[0].description}</p>
              <p className="mt-4 text-sm font-semibold text-brand">{activities[0].details}</p>
            </MotionReveal>
          </div>

          {/* Bombeiro Mirim — foto à direita, com detalhe sobreposto */}
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <MotionReveal className="lg:order-2 lg:col-span-6">
              <div className="relative mx-auto aspect-[5/4] w-full max-w-lg lg:max-w-none">
                <div className="absolute inset-0 left-[14%] top-0 overflow-hidden rounded-[2rem] shadow-soft">
                  <Image
                    alt={activities[1].image.alt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 34vw, 78vw"
                    src={activities[1].image.src}
                  />
                </div>
                <div className="absolute bottom-[-6%] left-0 aspect-[3/4] w-[42%] overflow-hidden rounded-2xl border-4 border-surface shadow-glass">
                  <Image
                    alt={activities[1].detailImage.alt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 15vw, 34vw"
                    src={activities[1].detailImage.src}
                  />
                </div>
              </div>
            </MotionReveal>
            <MotionReveal className="lg:order-1 lg:col-span-6" delay={0.1}>
              <h3 className="font-display text-2xl text-ink sm:text-3xl">{activities[1].name}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{activities[1].description}</p>
              <p className="mt-4 text-sm font-semibold text-brand">{activities[1].details}</p>
            </MotionReveal>
          </div>
        </div>

        {/* Reforço Escolar — faixa tipográfica, sem foto (nenhuma disponível
            que retrate a atividade com coerência de idade/contexto). */}
        <MotionReveal className="mt-20 sm:mt-24 lg:mt-28">
          <div className="rounded-[2rem] bg-surface-muted px-6 py-10 sm:px-12 sm:py-14 lg:px-16">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-4">
                <h3 className="font-display text-2xl text-ink sm:text-3xl">Reforço Escolar</h3>
                <p className="mt-3 text-sm font-semibold text-brand">Do Infantil IV ao 5º ano · horário flexível</p>
              </div>
              <p className="text-lg leading-relaxed text-muted lg:col-span-8">
                {
                  "Apoio pedagógico personalizado para fortalecer o aprendizado e desenvolver o potencial de cada aluno nas suas dificuldades — dentro da mesma proposta de acompanhamento próximo do dia a dia escolar."
                }
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
