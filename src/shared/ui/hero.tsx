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
// Estrutura: foto e texto em blocos próprios, sem sobreposição — banner
// editorial (aspect-ratio fixo, sem vh) seguido do bloco de texto em fundo
// sólido. Nenhuma marca extra sobre a foto: Header já carrega a marca.
//
// Correção da auditoria de performance: a versão anterior tinha DUAS
// instâncias de <Image> (mobile/desktop, cada uma escondida via `lg:hidden`/
// `hidden lg:block`) e DUAS instâncias de <HeroContent> (logo, dois <h1>
// idênticos no DOM). Medido ao vivo via Network: em viewport >=1024px o
// navegador baixava as DUAS variantes da mesma foto (a escondida via
// `display:none` incluída) — `display:none` não impede o fetch do `src`,
// só a pintura. Como as duas instâncias sempre usam o MESMO arquivo-fonte
// (não é troca de foto por breakpoint, é só recorte/posição diferentes),
// a correção não precisa de `<picture>`/`getImageProps` (isso é para
// arquivos DIFERENTES por breakpoint) — basta UMA única <Image> cujo
// contêiner muda de "bloco normal com aspect-ratio" (mobile/tablet) para
// "painel absoluto de 58% de largura" (desktop) via classes responsivas do
// Tailwind no mesmo elemento, e um único <HeroContent> cujo contêiner muda
// de "abaixo da foto, fundo sólido" para "coluna esquerda de um flex ao
// lado do painel" do mesmo jeito. Existindo só uma <Image>, `preload`
// (substituto de `priority`, depreciada no Next 16) volta a ser seguro: já
// não há "mais de uma imagem que pode ser o LCP dependendo do viewport" —
// só existe uma, sempre. `fetchPriority="high"` junto do `preload` porque o
// `preload` sozinho só injeta o `<link rel="preload">`; sem `fetchPriority`
// explícito esse link nasce sem `fetchpriority`, e o Lighthouse aponta isso
// (`priorityHinted`) mesmo com o request já saindo eager.
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = useHasMounted() && shouldReduceMotion;

  return (
    <section aria-label="Apresentação do Colégio Baby Avançar" className="relative overflow-hidden bg-ink lg:min-h-[44rem]">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[58%]"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/*
          Todos os 4 rostos do grupo (incluindo o menino ao fundo que, num
          crop mais baixo, perde a cabeça pela borda superior do arquivo) só
          cabem inteiros com a janela de corte perto do topo do arquivo:
          50%/30% no mobile e desktop (janela mais alta), 50%/20% só no
          tablet (16:10, janela mais baixa e larga) — validado visualmente
          antes de aplicar, não é um valor genérico.
        */}
        <Image
          alt={heroImageAlt}
          className="object-cover object-[50%_30%] sm:object-[50%_20%] lg:object-[50%_30%]"
          fetchPriority="high"
          fill
          preload
          sizes="(min-width: 1024px) 58vw, 100vw"
          src="/media/hero/atividade-hero.png"
        />
        {/* Fusão só no limite entre foto e painel de texto, só existe em desktop (só lá a foto fica ao lado do texto). */}
        <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-ink to-transparent lg:block" />
      </motion.div>

      <div className="px-5 py-10 sm:px-8 sm:py-12 lg:relative lg:mx-auto lg:flex lg:min-h-[44rem] lg:max-w-6xl lg:items-center lg:py-16">
        <HeroContent className="lg:max-w-[46%]" reduceMotion={!!reduceMotion} />
      </div>
    </section>
  );
}
