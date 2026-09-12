"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { AdvancementPath } from "@/shared/ui/advancement-path";
import { Button } from "@/shared/ui/button";
import { buildWhatsAppLink, WHATSAPP_MESSAGES } from "@/shared/config/site";

const scheduleVisitLink = buildWhatsAppLink(WHATSAPP_MESSAGES.scheduleVisit);
const talkOnWhatsAppLink = buildWhatsAppLink(WHATSAPP_MESSAGES.generalContact);

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Apresentação do Colégio Baby Avançar" className="relative overflow-hidden bg-canvas">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:pt-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-center md:gap-8 lg:gap-16">
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="relative order-1 md:order-2"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] md:aspect-square lg:aspect-[6/5] lg:rounded-[2.5rem]">
              <Image
                alt="Criança sorrindo durante atividade na escola, sentada no chão junto de colegas de turma"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 768px) 48vw, 100vw"
                src="/media/hero/atividade-hero.png"
                style={{ objectPosition: "50% 28%" }}
              />
            </div>
          </motion.div>

          <div className="relative order-2 md:order-1 md:py-4 md:pl-10 lg:pl-12">
            <AdvancementPath
              className="pointer-events-none absolute left-0 top-1 hidden h-[calc(100%-3rem)] w-8 md:block"
              variant="desktop"
            />

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
            >
              <p className="text-sm font-bold uppercase tracking-wide text-brand">Colégio Baby Avançar</p>
              <h1 className="mt-4 font-display text-fluid-title text-ink">{"Cada descoberta é um avanço."}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {"Educação Infantil e Fundamental I no Jóquei Clube, respeitando o ritmo de cada criança."}
              </p>
            </motion.div>

            <AdvancementPath className="mt-7 h-[100px] w-6 md:hidden" variant="mobile" />

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Button asChild>
                <a href={scheduleVisitLink} rel="noopener noreferrer" target="_blank">
                  Agendar uma visita
                </a>
              </Button>
              <a
                className="tap-target inline-flex items-center font-semibold text-brand underline-offset-4 hover:underline"
                href={talkOnWhatsAppLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
