import Image from "next/image";
import { MotionReveal } from "@/shared/ui/motion-reveal";

// Depoimentos reais, já publicados no site legado (index.html, seção
// "O que dizem sobre nós") — nenhum nome, cargo, frase ou avaliação foi
// inventado nesta rodada. Nenhuma nota em estrelas é reproduzida: o legado
// exibia 5 estrelas fixas nos três cards, sem fonte de avaliação real por
// trás do número, então isso não é levado para o novo design (ver Bloco 3).
const featuredTestimonial = {
  quote:
    "Tomar a decisão de tirar meu filho Arthur da escola municipal foi difícil, mas necessária. Ele estava estagnado, sem aprender nada. Desde que chegou ao Colégio Baby Avançar, a transformação foi impressionante! Hoje tenho a tranquilidade de saber que ele realmente está aprendendo e se desenvolvendo.",
  name: "Ronald",
  role: "Pai do Arthur, 6 anos · Infantil V",
  photo: { src: "/media/perfil.jpeg", alt: "Ronald, pai do Arthur, aluno do Colégio Baby Avançar" },
};

const supportingTestimonials = [
  {
    quote:
      "Escolhemos o Baby Avançar pela localização e metodologia, mas o que mais nos impressionou foi o compromisso com a formação integral das crianças. Meu filho desenvolveu não só academicamente, mas também socialmente e emocionalmente.",
    name: "Carlos Oliveira",
    role: "Pai do Pedro, 7 anos · 2º Ano",
    initials: "CO",
  },
  {
    quote:
      "A equipe pedagógica é excepcional! Eles realmente entendem cada criança individualmente e adaptam o ensino às necessidades específicas. A comunicação com os pais é constante e transparente. Recomendo muito!",
    name: "Fernanda Costa",
    role: "Mãe da Sofia, 4 anos · Infantil IV",
    initials: "FC",
  },
] as const;

export function TestimonialsSection() {
  return (
    <section aria-labelledby="depoimentos-title" className="bg-surface py-16 sm:py-20 lg:py-28" id="depoimentos">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <MotionReveal className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">Depoimentos</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl" id="depoimentos-title">
            {"O que as famílias dizem sobre o Baby Avançar."}
          </h2>
        </MotionReveal>

        <MotionReveal className="mt-14 sm:mt-16" delay={0.05}>
          <figure className="grid gap-6 rounded-[2rem] bg-surface-muted p-8 sm:p-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-4 lg:p-14">
            <div className="lg:col-span-4 lg:row-span-2">
              <div className="relative aspect-square w-24 overflow-hidden rounded-full shadow-soft sm:w-28 lg:w-full lg:max-w-[9rem]">
                <Image
                  alt={featuredTestimonial.photo.alt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 9rem, 7rem"
                  src={featuredTestimonial.photo.src}
                />
              </div>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <span aria-hidden="true" className="font-display text-6xl leading-none text-brand/25 sm:text-7xl">
                {"“"}
              </span>
              <blockquote className="-mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
                {featuredTestimonial.quote}
              </blockquote>
            </div>
            <figcaption className="lg:col-span-8 lg:col-start-5">
              <p className="font-semibold text-ink">{featuredTestimonial.name}</p>
              <p className="text-sm text-muted">{featuredTestimonial.role}</p>
            </figcaption>
          </figure>
        </MotionReveal>

        <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-10">
          {supportingTestimonials.map((testimonial, index) => (
            <MotionReveal delay={0.1 + index * 0.06} key={testimonial.name}>
              <figure className="flex h-full flex-col border-t border-border pt-6">
                <blockquote className="flex-1 text-lg leading-relaxed text-muted">{"“"}{testimonial.quote}{"”"}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand"
                  >
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{testimonial.name}</p>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
