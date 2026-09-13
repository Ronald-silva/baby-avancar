import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagem única para todo o site (Home e /acesso) — instituição pequena, com
// só 2 páginas públicas reais, não justifica uma imagem dedicada por rota.
// Usa o banner oficial já pronto (public/media/og.webp), servido como está —
// sem recompor com ImageResponse/satori. Redimensionado para o padrão
// 1200×630 (auditoria de correções, item 15): a proporção original
// (1731×909) já era ~1.9:1, praticamente idêntica a 1.91:1 — reescala
// direta (Lanczos), sem recorte, preservando 100% da composição/logo/texto.
export const alt = "Colégio Baby Avançar — Educação Infantil e Fundamental I em Fortaleza";
export const size = { width: 1200, height: 630 };
export const contentType = "image/webp";

export default async function Image() {
  const buffer = await readFile(join(process.cwd(), "public/media/og.webp"));
  return new Response(buffer, {
    headers: { "Content-Type": contentType },
  });
}
