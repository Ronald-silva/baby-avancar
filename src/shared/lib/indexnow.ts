// IndexNow: notificação rápida a mecanismos de busca compatíveis (Bing, etc.)
// quando uma URL pública indexável é criada ou alterada de forma relevante.
// NÃO substitui sitemap.xml/robots.ts nem GSC/Bing Webmaster — só acelera o aviso.
//
// A chave abaixo TEM que ser pública por exigência do protocolo (fica exposta
// em texto puro em `${SITE_URL}/${INDEXNOW_KEY}.txt`) — não é segredo.
// Se a chave mudar, o arquivo `public/<chave>.txt` precisa ser renomeado junto.
import { SITE_URL } from "@/shared/config/site";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_KEY = "e787e88c6ca1a6f0d5a532496d7ebf81";
export const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

export type IndexNowResult =
  | { ok: true; status: number }
  | { ok: false; status: number; error: string };

/**
 * Envia uma lista de URLs públicas ao IndexNow. Uso: quando uma página
 * institucional pública é publicada ou seu conteúdo indexável muda de forma
 * relevante — nunca em toda visita/request, e nunca para URLs não indexáveis
 * (`/plataforma`, `/api/*`, assets, `robots.txt`, `sitemap.xml`).
 */
export async function submitIndexNow(urlList: string[]): Promise<IndexNowResult> {
  if (urlList.length === 0) {
    return { ok: true, status: 200 };
  }

  const host = new URL(SITE_URL).host;

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList,
      }),
    });

    if (response.ok) {
      return { ok: true, status: response.status };
    }

    const error = await response.text();
    console.error(
      JSON.stringify({ level: "error", event: "indexnow_submit_failed", status: response.status, error }),
    );
    return { ok: false, status: response.status, error };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error(JSON.stringify({ level: "error", event: "indexnow_submit_error", message }));
    return { ok: false, status: 0, error: message };
  }
}
