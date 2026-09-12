import { AdvancementPath } from "@/shared/ui/advancement-path";
import { MotionReveal } from "@/shared/ui/motion-reveal";

// Diferenciais confirmados no conteúdo legado (index.html, seções "Sobre Nós"
// e "Diferenciais") — nenhum número ou selo foi inventado; ver AGENTS.md,
// Bloco 2, item 5.
const differentiators = [
  {
    title: "Turmas reduzidas",
    description: "Atendimento que conhece cada aluno de verdade — não uma sala cheia de rostos.",
  },
  {
    title: "Acompanhamento psicopedagógico",
    description: "Apoio disponível quando a criança ou a família precisar, parte do dia a dia, não um serviço à parte.",
  },
  {
    title: "Metodologia própria",
    description: "Pensada para o Baby Avançar, não um pacote pronto aplicado do mesmo jeito em qualquer lugar.",
  },
  {
    title: "Atividades para além da sala",
    description: "Jiu-Jitsu, Bombeiro Mirim e Reforço Escolar ampliando o que a criança vive na escola.",
  },
] as const;

export function DifferentiatorsSection() {
  return (
    <section aria-labelledby="diferenciais-title" className="bg-canvas py-16 sm:py-20 lg:py-28" id="diferenciais">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Diferenciais</p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-tight text-ink sm:text-4xl" id="diferenciais-title">
            {"O que sustenta esse jeito de ensinar."}
          </h2>
        </MotionReveal>

        <div className="relative mt-14 sm:mt-16">
          <AdvancementPath
            className="pointer-events-none absolute -left-2 top-2 hidden h-[calc(100%-2rem)] w-8 lg:block"
            variant="desktop"
          />

          <ul className="divide-y divide-border lg:pl-16">
            {differentiators.map((item, index) => (
              <li key={item.title}>
                <MotionReveal className="grid gap-2 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-10" delay={index * 0.06}>
                  <span className="font-display text-3xl text-brand/30 sm:col-span-2 sm:text-4xl" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-balance font-display text-xl text-ink sm:col-span-3 sm:text-2xl">{item.title}</h3>
                  <p className="text-lg leading-relaxed text-muted sm:col-span-7">{item.description}</p>
                </MotionReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
