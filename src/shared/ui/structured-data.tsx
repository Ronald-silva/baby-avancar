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
        "@id": `${SITE_URL}/#unidade-infantil`,
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
        "@id": `${SITE_URL}/#unidade-fundamental`,
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
