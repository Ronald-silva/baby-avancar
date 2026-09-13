import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Imagem única para todo o site (Home e /acesso) — instituição pequena, com
// só 2 páginas públicas reais, não justifica uma imagem dedicada por rota.
// Composição usa só elementos já aprovados: o logo com fundo transparente
// (public/media/babyavancar.png, reduzido para public/media/og/logo-mark.png
// por causa do limite de 500KB do ImageResponse) e as mesmas cores/copy já
// usadas no Hero (bg-ink, text-accent, título real do metadata) — nenhuma
// identidade nova, nenhum texto inventado.
export const alt = "Colégio Baby Avançar — Educação Infantil e Fundamental I em Fortaleza";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public/media/og/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#171f2b",
          display: "flex",
          gap: 56,
          height: "100%",
          padding: "0 96px",
          width: "100%",
        }}
      >
        <img alt="" height={180} src={logoSrc} width={180} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffc105",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Colégio Baby Avançar
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 52,
              fontWeight: 600,
              lineHeight: 1.2,
              marginTop: 20,
              maxWidth: 760,
            }}
          >
            Educação Infantil e Fundamental I em Fortaleza
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
