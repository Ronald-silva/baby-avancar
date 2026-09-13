#!/usr/bin/env node
// Dispara o IndexNow manualmente para uma lista de URLs canônicas, depois de
// publicar conteúdo novo/alterado — nunca automático a cada request, build
// ou render (auditoria de correções, itens 22/23). `submitIndexNow()` em
// src/shared/lib/indexnow.ts existe mas não é chamado de lugar nenhum no
// app; este script é o gatilho explícito que faltava.
//
// Uso:
//   npm run indexnow                                  -> lê todas as URLs de {SITE_URL}/sitemap.xml
//   npm run indexnow -- <url> [url...]                -> envia só as URLs informadas
//
// A chave abaixo é a MESMA de public/e787e88c6ca1a6f0d5a532496d7ebf81.txt e
// de src/shared/lib/indexnow.ts — pública por exigência do próprio protocolo
// IndexNow (fica exposta em texto puro no arquivo acima), não é segredo. Se a
// chave mudar, atualize os três lugares juntos.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://babyavancar.com.br";
const INDEXNOW_KEY = "e787e88c6ca1a6f0d5a532496d7ebf81";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

async function getUrlsFromSitemap() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Falha ao buscar ${SITE_URL}/sitemap.xml: HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  if (urls.length === 0) {
    throw new Error("Nenhuma <loc> encontrada no sitemap.xml — nada para enviar.");
  }
  return urls;
}

async function main() {
  const argUrls = process.argv.slice(2);
  const urls = argUrls.length > 0 ? argUrls : await getUrlsFromSitemap();

  const invalid = urls.filter((url) => !url.startsWith(SITE_URL));
  if (invalid.length > 0) {
    console.error("Recusado: URL(s) fora do domínio canônico:", invalid);
    process.exitCode = 1;
    return;
  }

  console.log(`Enviando ${urls.length} URL(s) ao IndexNow:\n${urls.map((url) => `  - ${url}`).join("\n")}`);

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (response.ok) {
    console.log(`OK — HTTP ${response.status}`);
    return;
  }

  console.error(`Falha — HTTP ${response.status}: ${await response.text()}`);
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
