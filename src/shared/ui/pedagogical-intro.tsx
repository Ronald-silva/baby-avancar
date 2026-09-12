import Image from "next/image";
import { MotionReveal } from "@/shared/ui/motion-reveal";

// Continua a ideia do Hero ("Cada descoberta é um avanço") sem repetir a
// headline — texto e fatos vêm do conteúdo institucional já existente
// (index.html legado + copy atual do Hero), nunca de missão/valores genéricos.
export function PedagogicalIntro() {
  return (
    <section aria-labelledby="proposta-title" className="bg-surface py-16 sm:py-20 lg:py-28" id="proposta">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <MotionReveal className="lg:col-span-7">
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Proposta pedagógica</p>
            <h2 className="mt-4 max-w-xl text-balance font-display text-3xl leading-tight text-ink sm:text-4xl" id="proposta-title">
              {"Cada criança chega até aqui do seu próprio jeito."}
            </h2>
            <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-muted">
              <p>
                {
                  "Por isso as turmas são reduzidas: dá para conhecer de verdade como cada aluno aprende, o que desperta curiosidade e onde é preciso ir com mais calma. Quando essa calma não é suficiente, a escola conta com acompanhamento psicopedagógico para apoiar a criança e a família."
                }
              </p>
              <p>
                {
                  "Essa proximidade é o que sustenta uma educação de qualidade — pensada para formar crianças inteiras, que aprendem no seu tempo e seguem em frente com confiança."
                }
              </p>
            </div>
          </MotionReveal>

          <MotionReveal className="lg:col-span-5" delay={0.1}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-4xl lg:max-w-none">
              <Image
                alt="Criança em turma reduzida do Colégio Baby Avançar comemorando com os braços erguidos durante atividade de coordenação motora"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 90vw"
                src="/media/home/proposta-pedagogica.jpg"
                style={{ objectPosition: "50% 62%" }}
              />
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
