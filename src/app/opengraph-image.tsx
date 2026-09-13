import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Imagem única para todo o site (Home e /acesso) — instituição pequena, com
// só 2 páginas públicas reais, não justifica uma imagem dedicada por rota.
// Usa o banner oficial já pronto (public/media/og.webp), servido como está —
// sem recompor com ImageResponse/satori.
export const alt = "Colégio Baby Avançar — Educação Infantil e Fundamental I em Fortaleza";
export const size = { width: 1731, height: 909 };
export const contentType = "image/webp";

export default async function Image() {
  const buffer = await readFile(join(process.cwd(), "public/media/og.webp"));
  return new Response(buffer, {
    headers: { "Content-Type": contentType },
  });
}
