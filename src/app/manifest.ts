import type { MetadataRoute } from "next";
import { FAVICON_ICON_192, FAVICON_ICON_512 } from "@/shared/ui/brand-mark";
import { SITE } from "@/shared/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.legalName,
    short_name: SITE.name,
    description: "Colégio Baby Avançar — Educação Infantil e Fundamental I em Fortaleza (CE).",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFB",
    theme_color: "#0057D9",
    icons: [
      { src: FAVICON_ICON_192, sizes: "192x192", type: "image/png" },
      { src: FAVICON_ICON_512, sizes: "512x512", type: "image/png" },
    ],
  };
}
