"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { useHasMounted } from "@/shared/lib/use-has-mounted";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Reveal de seção único do projeto — usado por toda a Home a partir do Bloco 2
 * para manter uma só assinatura de motion (ver AGENTS.md, "ritmo da página").
 * Dispara ao entrar na viewport (`whileInView`), uma vez só, com o mesmo
 * easing/duração do Hero.
 *
 * `useReducedMotion()` só sabe a preferência real do usuário depois de montar
 * no cliente (não existe no SSR) — aplicá-la direto no primeiro render causa
 * mismatch de hidratação. `useHasMounted` garante que o primeiro render do
 * cliente repete o estado do servidor; o ajuste para reduced-motion acontece
 * um tick depois, sem flash de conteúdo (a seção já nasce visível nesse caso).
 */
export function MotionReveal({ children, className, delay = 0 }: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = useHasMounted() && shouldReduceMotion;

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
