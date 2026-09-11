import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { MarketingHeader } from "@/shared/ui/marketing-header";

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute -left-32 top-8 -z-10 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
        <section className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-center px-5 py-16 sm:px-8">
          <div className="glass-surface max-w-3xl rounded-4xl p-8 sm:p-14">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-bold text-brand">
              <Sparkles aria-hidden="true" size={17} /> Educação infantil com escuta
            </div>
            <h1 className="font-display text-fluid-title">Toda criança merece ser vista por inteiro.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">No Baby Avançar, acolhemos a infância com afeto, experiências significativas e uma parceria transparente com cada família.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/acesso">Conheça a plataforma <ArrowRight aria-hidden="true" size={18} /></Button>
              <Button asChild className="border border-brand/20 bg-transparent text-brand hover:bg-brand/10 hover:text-brand">
                <a href="https://wa.me/5585999701822" rel="noopener noreferrer" target="_blank"><HeartHandshake aria-hidden="true" size={18} /> Falar com a escola</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
