import { useSyncExternalStore } from "react";

const subscribeNever = () => () => {};

/**
 * Verdadeiro só depois de hidratar — nunca no SSR nem no primeiro render do
 * cliente. Existe para usar `useReducedMotion()` (framer-motion) sem causar
 * mismatch de hidratação: essa preferência só é conhecida no cliente, então
 * aplicá-la direto no primeiro render diverge do HTML gerado no servidor.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
}
