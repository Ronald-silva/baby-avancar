import { SITE, SITE_URL, UNITS } from "@/shared/config/site";

// Dados estruturados da Home — apenas fatos já confirmados em outras partes do
// site (ver ROADMAP.md e relatório do Bloco 4). Nunca incluir: rating, número
// de avaliações, preço, horário, telefone por unidade, foundingDate,
// coordenadas ou e-mail — nenhum desses foi confirmado pela escola.
function buildJsonLd() {
  const school = {
    "@type": "School",
    name: SITE.legalName,
    url: SITE_URL,
    sameAs: [SITE.instagramUrl],
    telephone: `+${SITE.whatsappNumber}`,
    department: [
      {
        "@type": "School",
        name: `${SITE.legalName} — ${UNITS.infantil.name} (${UNITS.infantil.label})`,
        address: {
          "@type": "PostalAddress",
          streetAddress: UNITS.infantil.street,
          addressLocality: UNITS.infantil.addressLocality,
          addressRegion: UNITS.infantil.addressRegion,
          addressCountry: "BR",
        },
      },
      {
        "@type": "School",
        name: `${SITE.legalName} — ${UNITS.fundamental.name} (${UNITS.fundamental.label})`,
        address: {
          "@type": "PostalAddress",
          streetAddress: UNITS.fundamental.street,
          addressLocality: UNITS.fundamental.addressLocality,
          addressRegion: UNITS.fundamental.addressRegion,
          addressCountry: "BR",
        },
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    name: SITE.legalName,
    url: SITE_URL,
    inLanguage: "pt-BR",
  };

  return [{ "@context": "https://schema.org", ...school }, { "@context": "https://schema.org", ...website }];
}

export function StructuredData() {
  const json = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");
  return <script dangerouslySetInnerHTML={{ __html: json }} type="application/ld+json" />;
}
