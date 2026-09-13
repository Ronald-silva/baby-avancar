"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BrandMark } from "@/shared/ui/brand-mark";
import { Button } from "@/shared/ui/button";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/shared/config/site";
import { useHasMounted } from "@/shared/lib/use-has-mounted";

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);
const talkOnWhatsAppLink = buildWhatsAppLink(WHATSAPP_MESSAGES.generalContact);

// Redesign do Hero (banner de alto impacto): foto em sangria total (sem
// caixa/borda arredondada), texto sobre um gradiente refinado em vez de
// dividir a tela 50/50 com o texto ao lado. Nenhuma foto disponível no
// projeto é paisagem — em vez de forçar um crop artificial, o retrato
// ocupa a largura toda no mobile (estilo pôster, texto no degradê inferior)
// e a metade direita em tela cheia no desktop, com o degradê a fazendo
// dissolver no fundo onde o texto começa.
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = useHasMounted() && shouldReduceMotion;

  return (
    <section aria-label="Apresentação do Colégio Baby Avançar" className="relative overflow-hidden bg-ink lg:min-h-[44rem]">
      <div className="relative h-[66vh] min-h-[24rem] w-full sm:h-[70vh] sm:min-h-[28rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[58%]">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/*
            A foto-fonte já tem, no seu próprio topo, um menino ao fundo com a
            cabeça fora do quadro original (não é corte nosso). O container foi
            encurtado (66-70vh, não 78-85vh) especificamente para abrir folga
            suficiente e permitir empurrar object-position bem para baixo
            (85-90%), excluindo esse menino do recorte visível em vez de
            cortar a cabeça dele mais uma vez. Grupo principal (menina
            sorrindo + 3 crianças) continua inteiro no quadro.
          */}
          <Image
            alt="Grupo de crianças sorrindo durante atividade na escola, sentadas no chão da varanda"
            className="object-cover object-[50%_88%] lg:object-[50%_30%]"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            src="/media/hero/atividade-hero.png"
          />
        </motion.div>

        {/* Selo da marca sobre a foto — reforça presença sem repetir o
            wordmark do Header (já visível, sticky, uma tela acima). */}
        <div className="absolute right-5 top-5 sm:right-8 sm:top-8 lg:hidden">
          <BrandMark imageClassName="drop-shadow-[0_2px_10px_rgb(0_0_0_/_0.35)]" showWordmark={false} size={48} />
        </div>

        {/* Degradê inferior (mobile/tablet): funde a foto no fundo onde o texto começa. */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent lg:hidden" />
        {/* Degradê lateral (desktop): funde a foto no painel de texto à esquerda. */}
        <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-ink to-transparent lg:block" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="absolute inset-x-5 bottom-8 sm:inset-x-8 sm:bottom-12 lg:static lg:inset-auto lg:flex lg:min-h-[44rem] lg:max-w-[46%] lg:items-center lg:py-16">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <div className="hidden items-center gap-3 lg:mb-8 lg:flex">
              <BrandMark imageClassName="drop-shadow-[0_2px_10px_rgb(0_0_0_/_0.35)]" showWordmark={false} size={56} />
            </div>
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
        </div>
      </div>
    </section>
  );
}
