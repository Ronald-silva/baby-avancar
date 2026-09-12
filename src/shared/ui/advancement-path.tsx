"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/lib/cn";

/**
 * Trajetória dourada — elemento gráfico proprietário da Direção D ("Infância em Movimento").
 * Liga dois pontos de conteúdo reais (nunca decoração solta): aqui, o topo do bloco de texto
 * do Hero até o CTA, terminando num marcador de estrela. Puramente decorativo (`aria-hidden`).
 */

type AdvancementPathProps = {
  className?: string;
  variant: "desktop" | "mobile";
};

const VARIANTS = {
  desktop: {
    viewBox: "0 0 92 480",
    path: "M46 6 C 84 42, 14 96, 54 142 C 96 190, 20 254, 58 308 C 92 356, 40 404, 46 452",
    star: { x: 46, y: 452 },
    starSize: 10,
  },
  mobile: {
    viewBox: "0 0 24 120",
    path: "M12 4 C 26 26, -2 46, 12 70 C 22 88, 2 104, 12 116",
    star: { x: 12, y: 116 },
    starSize: 8,
  },
} as const;

function starPoints(x: number, y: number, size: number) {
  const inner = size * 0.42;
  return Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? size : inner;
    return `${(x + radius * Math.cos(angle)).toFixed(2)},${(y + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
}

export function AdvancementPath({ className, variant }: AdvancementPathProps) {
  const reduceMotion = useReducedMotion();
  const { viewBox, path, star, starSize } = VARIANTS[variant];

  return (
    <svg aria-hidden="true" className={cn(className)} fill="none" preserveAspectRatio="none" viewBox={viewBox}>
      <motion.path
        animate={{ pathLength: 1 }}
        d={path}
        initial={reduceMotion ? false : { pathLength: 0 }}
        stroke="hsl(var(--accent-hover))"
        strokeLinecap="round"
        strokeWidth={3}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.5 }}
        vectorEffect="non-scaling-stroke"
      />
      <motion.polygon
        animate={{ opacity: 1, scale: 1 }}
        fill="hsl(var(--accent))"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
        points={starPoints(star.x, star.y, starSize)}
        style={{ transformOrigin: `${star.x}px ${star.y}px` }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 1.5 }}
      />
    </svg>
  );
}
