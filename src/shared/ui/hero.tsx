"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/shared/config/site";
import { useHasMounted } from "@/shared/lib/use-has-mounted";

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);
const talkOnWhatsAppLink = buildWhatsAppLink(WHATSAPP_MESSAGES.generalContact);

const heroImageAlt = "Grupo de crianças sorrindo durante atividade na escola, sentadas no chão da varanda";

type HeroContentProps = {
  reduceMotion: boolean;
  className?: string;
};

// Conteúdo textual do Hero isolado num componente próprio porque agora existem
// duas instâncias no DOM (mobile empilhado vs. desktop lado a lado, cada uma
// oculta via classe responsiva — mesmo padrão já usado no Header entre
// DesktopNav/MobileMenu). Mantém kicker → H1 → subtítulo → CTAs idênticos nos
// dois casos em vez de duplicar o JSX inteiro.
function HeroContent({ reduceMotion, className }: HeroContentProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <p className="text-sm font-bold uppercase tracking-wide text-accent">Colégio Baby Avançar</p>
      <h1 className="mt-3 text-balance font-display text-fluid-title text-inverse">{"Cada descoberta é um avanço."}</h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-inverse/85">
        {"Educação Infantil e Fundamental I em Fortaleza, no ritmo de cada criança."}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
        <Button asChild className="bg-accent text-accent-foreground hover:shadow-glass">
          <a href={scheduleVisitLink} rel="noopener noreferrer" target="_blank">
            Agendar uma visita
          </a>
        </Button>
        <a
          className="tap-target inline-flex items-center font-semibold text-inverse underline-offset-4 hover:underline"
          href={talkOnWhatsAppLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          Falar no WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

// Auditoria corretiva: o Hero mobile sobrepunha texto à foto via gradiente
// (kicker/H1/subtítulo/CTA empilhados sobre a imagem com um degradê escuro
// só para dar legibilidade). A foto não tem uma área de negative space real
// no terço inferior — o degradê escurecia crianças e uniformes só para caber
// o texto, e ainda repetia a marca (selo sobre a foto + wordmark do Header).
// Estrutura nova: foto e texto em blocos próprios, sem sobreposição —
// banner editorial (aspect-ratio fixo, sem vh) seguido do bloco de texto em
// fundo sólido. Nenhuma marca extra sobre a foto: Header já carrega a marca.
// `fetchPriority="high"` em vez de `priority`/`preload` nas duas imagens
// abaixo: Next 16 deprecou `priority` e a doc do componente Image pede
// explicitamente para NÃO usar `preload` quando há mais de uma imagem que
// pode ser o LCP dependendo do viewport (exatamente este caso — a mesma
// foto em dois <Image>, um por breakpoint via classe `lg:hidden`/`hidden
// lg:block`). `preload` forçaria o carregamento das duas variantes de uma
// vez; `fetchPriority` combinado com o `loading="lazy"` padrão garante que
// só a instância realmente visível carrega (ver next/image, seção "Art
// direction"/"Theme switching").
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = useHasMounted() && shouldReduceMotion;

  return (
    <section aria-label="Apresentação do Colégio Baby Avançar" className="relative overflow-hidden bg-ink">
      {/* Mobile/tablet: banner de foto com área própria, texto abaixo em fundo sólido. */}
      <div className="lg:hidden">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/*
            Todos os 4 rostos do grupo (incluindo o menino ao fundo que, num
            crop mais baixo, perde a cabeça pela borda superior do arquivo)
            só cabem inteiros com a janela de corte perto do topo do arquivo:
            50%/30% no mobile (4:3, janela mais alta) e 50%/20% no tablet
            (16:10, janela mais baixa e larga) — validado visualmente antes de
            aplicar, não é um valor genérico.
          */}
          <Image
            alt={heroImageAlt}
            className="object-cover object-[50%_30%] sm:object-[50%_20%]"
            fetchPriority="high"
            fill
            sizes="100vw"
            src="/media/hero/atividade-hero.png"
          />
        </motion.div>

        <div className="px-5 py-10 sm:px-8 sm:py-12">
          <HeroContent reduceMotion={!!reduceMotion} />
        </div>
      </div>

      {/* Desktop: composição em split-screen — foto na metade direita, texto na esquerda, nunca sobrepostos. */}
      <div className="relative hidden lg:block lg:min-h-[44rem]">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-y-0 right-0 h-full w-[58%] overflow-hidden"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            alt={heroImageAlt}
            className="object-cover object-[50%_30%]"
            fetchPriority="high"
            fill
            sizes="58vw"
            src="/media/hero/atividade-hero.png"
          />
          {/* Fusão só no limite entre foto e painel de texto — não passa por cima de nenhum rosto. */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-ink to-transparent" />
        </motion.div>

        <div className="relative mx-auto flex min-h-[44rem] max-w-6xl items-center px-5 py-16 sm:px-8">
          <HeroContent className="max-w-[46%]" reduceMotion={!!reduceMotion} />
        </div>
      </div>
    </section>
  );
}
