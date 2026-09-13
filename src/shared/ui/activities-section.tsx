import Image from "next/image";
import { MotionReveal } from "@/shared/ui/motion-reveal";

// Redesign da Home: as 3 atividades viviam em 2 blocos grandes alternados
// (foto+texto) mais uma faixa extra — bastante altura de rolagem pra 3 itens
// que cabem lado a lado. Comprimido num grid de 3 cards do mesmo peso visual;
// nenhum dado (nome, idade mínima, frequência) foi alterado, só o texto de
// apoio foi enxugado para uma frase.
const activities = [
  {
    name: "Jiu-Jitsu",
    description: "Disciplina, respeito e coordenação motora, de um jeito lúdico.",
    details: "A partir de 2 anos · 2x/semana",
    image: {
      src: "/media/home/atividade-jiujitsu.jpg",
      alt: "Duas crianças sorrindo durante aula de Jiu-Jitsu, vestindo kimono, em treino no Colégio Baby Avançar",
      // Os dois rostos ficam no terço superior do arquivo-fonte; crop
      // central cortava a testa do menino ao fundo.
      objectPosition: "50% 12%",
    },
  },
  {
    name: "Bombeiro Mirim",
    description: "Noções de primeiros socorros e cuidado com o próximo.",
    details: "A partir de 5 anos · 1x/semana",
    image: {
      src: "/media/home/atividade-bombeiro.jpg",
      alt: "Crianças fantasiadas de bombeiro mirim, com capacete vermelho, em desfile do Colégio Baby Avançar",
      objectPosition: "50% 50%",
    },
  },
  {
    name: "Reforço Escolar",
    description: "Apoio pedagógico personalizado para as dificuldades de cada aluno.",
    details: "Infantil IV ao 5º ano · horário flexível",
    image: {
      // Antes usava atividade-bombeiro-detalhe.jpg (treino de primeiros
      // socorros em manequim) — foto de Bombeiro Mirim, não de reforço
      // escolar (ver auditoria corretiva #1). Substituída por uma foto real
      // de sala/estudo. Rosto no terço superior do arquivo-fonte (retrato
      // 900x1600); ancorado perto do topo para manter o rosto inteiro e o
      // mural de alfabetização ao fundo (contexto de leitura/estudo).
      src: "/media/home/infantil-leitura.jpg",
      alt: "Criança sorrindo durante atividade de leitura e alfabetização em sala do Colégio Baby Avançar",
      objectPosition: "50% 10%",
    },
  },
] as const;

export function ActivitiesSection() {
  return (
    <section aria-labelledby="atividades-title" className="bg-surface-muted py-16 sm:py-20 lg:py-28" id="atividades">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Atividades</p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl" id="atividades-title">
            {"A formação continua fora da sala de aula."}
          </h2>
        </MotionReveal>

        <div className="mt-12 grid gap-6 sm:mt-14 md:grid-cols-3">
          {activities.map((activity, index) => (
            <MotionReveal delay={index * 0.08} key={activity.name}>
              <article className="h-full overflow-hidden rounded-4xl bg-surface shadow-soft transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-glass">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    alt={activity.image.alt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    src={activity.image.src}
                    style={{ objectPosition: activity.image.objectPosition }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-balance font-display text-xl text-ink">{activity.name}</h3>
                  <p className="mt-2 text-muted">{activity.description}</p>
                  <p className="mt-3 text-sm font-semibold text-brand">{activity.details}</p>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
