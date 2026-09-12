import Image from "next/image";
import { MotionReveal } from "@/shared/ui/motion-reveal";
import { formatUnitAddress, UNITS } from "@/shared/config/site";

const unit = UNITS.fundamental;

// Composição B — superfície institucional escura (azul profundo) com uma
// única foto cheia, o oposto da colagem clara do Infantil (ver
// early-childhood-section.tsx). O contraste é a resposta ao pedido de "não
// repetir visualmente" as duas etapas.
export function ElementarySection() {
  return (
    <section aria-labelledby="fundamental-title" className="bg-secondary py-16 sm:py-20 lg:py-28" id="fundamental">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <MotionReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] lg:aspect-[3/4]">
              <Image
                alt="Criança do Fundamental I registrando atividade escrita em caderno do Colégio Baby Avançar"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 90vw"
                src="/media/home/fundamental-registro.jpg"
              />
            </div>
          </MotionReveal>

          <MotionReveal className="lg:col-span-7" delay={0.1}>
            <p className="text-sm font-bold uppercase tracking-wide text-accent">
              {unit.label} · {unit.name}
            </p>
            <h2 className="mt-4 max-w-lg font-display text-3xl leading-tight text-inverse sm:text-4xl" id="fundamental-title">
              {"Da descoberta para a autonomia."}
            </h2>
            <div className="mt-6 max-w-lg space-y-5 text-lg leading-relaxed text-inverse/85">
              <p>
                {
                  "No Fundamental I, a criança segue construindo conhecimento — agora com mais registro, mais responsabilidade pelo próprio aprendizado e o mesmo acompanhamento próximo que marca o Baby Avançar desde a Educação Infantil."
                }
              </p>
              <p>{"O objetivo não muda: cada aluno avançando no seu tempo, com quem conhece o seu jeito de aprender."}</p>
            </div>
            <address className="mt-6 text-sm not-italic text-inverse/70">
              {formatUnitAddress(unit)} — {unit.landmark}
            </address>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
