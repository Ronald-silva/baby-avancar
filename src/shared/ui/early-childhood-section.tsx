import Image from "next/image";
import { MotionReveal } from "@/shared/ui/motion-reveal";
import { formatUnitAddress, UNITS } from "@/shared/config/site";

const unit = UNITS.infantil;

// Composição A — colagem de duas fotos (acolhimento + descoberta). Contrasta
// de propósito com a Composição B do Fundamental (elementary-section.tsx):
// aqui a superfície é suave e a foto é fragmentada; lá é uma superfície
// institucional escura com uma única foto cheia.
export function EarlyChildhoodSection() {
  return (
    <section aria-labelledby="infantil-title" className="bg-surface-muted py-16 sm:py-20 lg:py-28" id="infantil">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          <MotionReveal className="lg:col-span-6 lg:order-2">
            <div className="relative mx-auto aspect-[5/4] w-full max-w-lg lg:max-w-none">
              <div className="absolute inset-0 right-[16%] top-0 overflow-hidden rounded-[2rem] shadow-soft">
                <Image
                  alt="Criança pequena concentrada encaixando peças de madeira coloridas em brinquedo pedagógico na Educação Infantil"
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 55vw, 78vw"
                  src="/media/home/infantil-descoberta.jpg"
                />
              </div>
              <div className="absolute bottom-[-6%] right-0 aspect-[3/4] w-[42%] overflow-hidden rounded-2xl border-4 border-surface-muted shadow-glass">
                <Image
                  alt="Criança da Educação Infantil lendo um livro ilustrado em sala de aula"
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 15vw, (min-width: 640px) 24vw, 34vw"
                  src="/media/home/infantil-leitura.jpg"
                />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal className="lg:col-span-6 lg:order-1" delay={0.1}>
            <p className="text-sm font-bold uppercase tracking-wide text-brand">
              {unit.label} · {unit.name}
            </p>
            <h2 className="mt-4 max-w-md font-display text-3xl leading-tight text-ink sm:text-4xl" id="infantil-title">
              {"Onde a curiosidade dá os primeiros passos."}
            </h2>
            <div className="mt-6 max-w-md space-y-5 text-lg leading-relaxed text-muted">
              <p>
                {
                  "Acolher vem antes de ensinar. Na unidade Jóquei Clube, o dia a dia é construído para que cada criança se sinta segura para explorar, brincar e descobrir no seu próprio ritmo — com atividades pensadas para a idade de cada turma."
                }
              </p>
              <p>{"É brincando, com cuidado e atenção próxima, que a aprendizagem realmente acontece."}</p>
            </div>
            <address className="mt-6 text-sm not-italic text-muted">{formatUnitAddress(unit)}</address>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
