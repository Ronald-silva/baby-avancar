import { SITE, SITE_URL, UNITS } from "@/shared/config/site";

// Dados estruturados da Home — apenas fatos já confirmados em outras partes do
// site (ver ROADMAP.md e relatório do Bloco 4). Nunca incluir: rating, número
// de avaliações, preço, horário, telefone por unidade, foundingDate,
// coordenadas ou e-mail — nenhum desses foi confirmado pela escola.
// `@id` usa sempre SITE_URL (domínio canônico, nunca o host técnico de onde a
// página é servida) — assim o identificador da entidade não muda conforme o
// ambiente (Railway para QA, produção depois), só a env var precisa mudar.
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function buildJsonLd() {
  const school = {
    "@type": "School",
    "@id": ORGANIZATION_ID,
    name: SITE.legalName,
    url: SITE_URL,
    sameAs: [SITE.instagramUrl],
    telephone: `+${SITE.whatsappNumber}`,
    department: [
      {
        "@type": "School",
        "@id": `${SITE_URL}/#unidade-joquei-clube`,
        name: `${SITE.legalName} — ${UNITS.joqueiClube.name} (${UNITS.joqueiClube.label})`,
        address: {
          "@type": "PostalAddress",
          streetAddress: UNITS.joqueiClube.street,
          addressLocality: UNITS.joqueiClube.addressLocality,
          addressRegion: UNITS.joqueiClube.addressRegion,
          addressCountry: "BR",
        },
      },
      {
        "@type": "School",
        "@id": `${SITE_URL}/#unidade-joao-xxiii`,
        name: `${SITE.legalName} — ${UNITS.joaoXXIII.name} (${UNITS.joaoXXIII.label})`,
        address: {
          "@type": "PostalAddress",
          streetAddress: UNITS.joaoXXIII.street,
          addressLocality: UNITS.joaoXXIII.addressLocality,
          addressRegion: UNITS.joaoXXIII.addressRegion,
          addressCountry: "BR",
        },
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.legalName,
    url: SITE_URL,
    inLanguage: "pt-BR",
    publisher: { "@id": ORGANIZATION_ID },
  };

  return [{ "@context": "https://schema.org", ...school }, { "@context": "https://schema.org", ...website }];
}

export function StructuredData() {
  const json = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");
  return <script dangerouslySetInnerHTML={{ __html: json }} type="application/ld+json" />;
}
