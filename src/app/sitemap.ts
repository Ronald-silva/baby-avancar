import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/config/site";

// Apenas URLs públicas com valor de busca real. `/plataforma` fica de fora
// (placeholder sem conteúdo, já noindex em plataforma/layout.tsx) e `/api/*`
// não é conteúdo de página (ver AGENTS.md, Bloco 4, item 12).
//
// Sem `lastModified`: `new Date()` a cada build/request mentia "mudou agora"
// mesmo quando o conteúdo não mudou (auditoria SEO, item 6/10) — sinal pior
// que nenhum. Reintroduzir só se passarmos a rastrear a data real da última
// mudança de conteúdo de cada URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/acesso`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
