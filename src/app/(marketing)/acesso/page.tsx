import type { Metadata } from "next";
import { BookOpenCheck, Heart, School } from "lucide-react";
import { MarketingHeader } from "@/shared/ui/marketing-header";

const commitments = [
  "Observações contextualizadas, não rótulos sobre a criança.",
  "Participação e consentimento claro de responsáveis.",
  "Acesso protegido e adequado ao papel de cada pessoa.",
];

export const metadata: Metadata = {
  title: "Acesso à Plataforma",
  description:
    "A plataforma do Colégio Baby Avançar para observações pedagógicas e acompanhamento entre família e escola está em preparação.",
  alternates: { canonical: "/acesso" },
};

export default function AccessPage() {
  return (
    <>
      <MarketingHeader />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20" id="conteudo-principal" tabIndex={-1}>
        <div className="max-w-3xl">
          <p className="font-bold tracking-wide text-brand">ACESSO À PLATAFORMA</p>
          <h1 className="mt-4 font-display text-fluid-title">Acompanhar o desenvolvimento também é escutar.</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">Estamos preparando uma plataforma para organizar observações pedagógicas, diálogo entre família e escola e caminhos de desenvolvimento. Ela não classifica, ranqueia ou diagnostica crianças.</p>
        </div>

        <section aria-labelledby="entradas-title" className="mt-12">
          <h2 id="entradas-title" className="font-display text-3xl">Escolha seu acesso</h2>
          <p className="mt-2 text-sm text-muted">Login ainda não disponível — a plataforma está em preparação (ver Fase 4/5 do roadmap técnico).</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="glass-surface rounded-4xl p-7 sm:p-9">
              <Heart aria-hidden="true" className="text-brand" size={30} />
              <h3 className="mt-5 font-display text-2xl">Responsáveis</h3>
              <p className="mt-3 leading-relaxed text-muted">Acompanhe devolutivas, responda questionários quando convidado e saiba como seus dados são usados.</p>
              <button className="tap-target mt-7 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-border px-5 py-2.5 font-semibold text-muted sm:w-auto" disabled type="button">
                Em breve
              </button>
            </article>
            <article className="glass-surface rounded-4xl p-7 sm:p-9">
              <School aria-hidden="true" className="text-brand" size={30} />
              <h3 className="mt-5 font-display text-2xl">Educadores e escolas</h3>
              <p className="mt-3 leading-relaxed text-muted">Registre práticas pedagógicas e acesse apenas as informações autorizadas pela sua instituição.</p>
              <button className="tap-target mt-7 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-border px-5 py-2.5 font-semibold text-muted sm:w-auto" disabled type="button">
                Em breve
              </button>
            </article>
          </div>
        </section>

        <section aria-labelledby="principios-title" className="mt-14 rounded-4xl bg-ink px-7 py-9 text-white sm:px-10">
          <div className="flex items-start gap-4">
            <BookOpenCheck aria-hidden="true" className="mt-1 shrink-0 text-accent" size={28} />
            <div>
              <h2 id="principios-title" className="font-display text-3xl">Compromissos desde o início</h2>
              <ul className="mt-5 space-y-3 text-neutral-200">
                {commitments.map((commitment) => <li className="flex gap-3" key={commitment}><span aria-hidden="true" className="text-accent">•</span>{commitment}</li>)}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
