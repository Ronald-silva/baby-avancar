import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Plataforma Baby Avançar",
  description: "Um novo espaço digital está sendo preparado para apoiar o acompanhamento e o desenvolvimento dos alunos.",
};

export default function PlataformaPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16 sm:px-8">
      <div className="glass-surface max-w-xl rounded-4xl p-8 text-center sm:p-12">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2 text-sm font-bold text-brand">
          <Sparkles aria-hidden="true" size={17} /> Em preparação
        </div>
        <h1 className="font-display text-3xl sm:text-4xl">Plataforma Baby Avançar</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Um novo espaço digital está sendo preparado para apoiar o acompanhamento e o desenvolvimento dos alunos.
        </p>
        <p className="mt-2 text-lg font-semibold text-ink">Em breve.</p>
        <Link
          className="tap-target mt-8 inline-flex items-center gap-2 rounded-full border border-brand/20 px-5 py-2.5 font-semibold text-brand transition-colors hover:bg-brand/10"
          href="/"
        >
          <ArrowLeft aria-hidden="true" size={18} /> Voltar ao site institucional
        </Link>
      </div>
    </main>
  );
}
