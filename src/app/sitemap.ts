import type { MetadataRoute } from "next";
import { SITE_URL } from "@/shared/config/site";

// Apenas URLs públicas com valor de busca real. `/plataforma` fica de fora
// (placeholder sem conteúdo, já noindex em plataforma/layout.tsx) e `/api/*`
// não é conteúdo de página (ver AGENTS.md, Bloco 4, item 12).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/acesso`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
