import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SITE_URL } from "@/shared/config/site";

// `middleware.ts` foi renomeado para `proxy.ts` no Next 16 (mesmo
// comportamento, só o nome do arquivo/export mudou).
const CANONICAL_HOST = new URL(SITE_URL).hostname;

// O domínio técnico do Railway (baby-avancar-production.up.railway.app)
// serve o mesmo conteúdo do domínio canônico — necessário para QA (ver
// src/shared/config/site.ts) mas é risco real de conteúdo duplicado se
// algum crawler indexar as duas versões. O canonical tag já aponta sempre
// para SITE_URL, mas isso é só um sinal (Google pode ignorá-lo); um
// `X-Robots-Tag: noindex` só quando o host da requisição não é o canônico
// fecha esse risco sem afetar em nada o domínio de produção real
// (auditoria SEO, itens 10 e 48).
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // `request.nextUrl.hostname` reflete o endereço em que o servidor Node
  // está de pé (sempre "localhost" atrás do proxy do Railway), não o Host
  // que o cliente/crawler realmente usou — por isso lemos o header bruto.
  const requestHost = request.headers.get("host")?.split(":")[0];

  if (requestHost !== CANONICAL_HOST) {
    response.headers.set("X-Robots-Tag", "noindex");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
