# Design System Cromático — Baby Avançar

> Fundação de cor do ecossistema digital Baby Avançar (site institucional, captação/matrícula, painel administrativo, área de responsáveis/educadores, Plataforma de Mapeamento de Talentos, relatórios, IA assistida). Escopo: app Next.js em `src/`. O site estático legado (`index.html`, `css/`) **não** foi migrado para este sistema — está previsto para descomissionamento na Fase 1 do `ROADMAP.md` e reescrevê-lo agora seria esforço perdido.
>
> **Status: PALETA PROVISÓRIA DE TRABALHO — reconfirmar após a extração cromática pendente.** Um arquivo de logo novo (selo circular CBA — azul/dourado, estrela, trajetória ascendente, crianças, livro aberto, wordmark "COLÉGIO BABY AVANÇAR") substituiu o placeholder antigo em `public/media/logo.png`/`img/logo.png` em 2026-09-12. Isto **não** foi confirmado neste projeto como o asset final aprovado pela direção da escola — apenas que o arquivo no repositório mudou. Os valores de azul/amarelo abaixo continuam sendo uma direção de trabalho, não uma paleta re-extraída do arquivo atual — ver "Origem da paleta" e a "Ação pendente" logo abaixo.

## Origem da paleta

**Os arquivos de logo hoje no repositório (`img/logo.png` e `public/media/logo.png`, idênticos, mesmo MD5) já são o selo circular CBA mais recente — não mais a logo antiga usada quando esta paleta foi definida.** Essa troca de arquivo ainda não foi acompanhada da re-extração cromática descrita abaixo, e este documento não tem como confirmar se esse é o asset final aprovado pela direção da escola (isso exige confirmação direta, não uma inferência de código).

Os tons de azul desta paleta foram ancorados nas cores da logo antiga apenas como ponto de partida técnico (família de matiz 196°–220°, mesma direção dos candidatos Azul CBA/profundo/claro fornecidos pela direção de marca). O amarelo/dourado (`#FFC107`) é um valor de trabalho baseado na descrição da identidade (azul + amarelo/dourado — presente na letra B, na estrela e no destaque "JÓQUEI"), **não** extraído por quantização do arquivo hoje em `public/media/logo.png`. Nenhum valor desta paleta foi, portanto, validado por extração cromática contra o arquivo atual.

**Ação pendente:** repetir a extração cromática (quantização de cor, mesmo método usado na auditoria original) sobre `public/media/logo.png` e decidir se `blue-*`/`yellow-*` precisam de refinamento — e, em paralelo, confirmar com a direção da escola que este é de fato o arquivo final da identidade. Até as duas coisas acontecerem, todo valor desta paleta continua provisório.

## 1. Paleta anterior encontrada (auditoria)

| Cor | Local | Finalidade atual | Ação |
|---|---|---|---|
| `#4A90E2` (49×), `#667eea` (28×), `#764ba2` (6×) | `css/components/*.css` (site legado) | Azul/roxo primário e gradientes | Manter como está — fora de escopo (site legado, será descomissionado) |
| `#25D366`, `#128C7E` | `css/components/*.css` | Verde WhatsApp | Manter — fora de escopo |
| `#333`, `#666`, `#555`, `#2c3e50`, `#34495e` | `css/components/*.css` | Textos/neutros do legado | Manter — fora de escopo |
| `#28a745`, `#dc3545`, `#007bff`, `#20c997` | `css/components/*.css` | Estados funcionais do legado (Bootstrap-like) | Manter — fora de escopo |
| `--brand: 198 56% 35%` (`#276D8B`) | `src/app/globals.css` | Cor de marca do app novo | **Substituído** — não correspondia a nenhum candidato oficial nem à logo |
| `--canvas: 39 49% 97%` (creme quente) | `src/app/globals.css` | Fundo de página do app novo | **Substituído** — tom quente incoerente com identidade azul |
| `border-slate-200`, `text-slate-200`, `text-amber-200`, `bg-amber-200/40` | `src/app/globals.css`, `acesso/page.tsx`, `page.tsx` | Cores avulsas da paleta padrão do Tailwind, sem relação com tokens do projeto | **Substituídas** por tokens semânticos (`border`, `neutral-200`, `accent`) |

Nenhuma cor hardcoded (hex/rgb/hsl) foi encontrada em `src/` antes desta mudança — o app novo já usava CSS custom properties, só não cobria o vocabulário semântico completo nem os valores oficiais de marca.

## 2. Paleta primitiva

Escalas de 50 (mais claro) a 900/950 (mais escuro), definidas em `tailwind.config.ts`. Os passos em **negrito** são os candidatos oficiais fornecidos pela direção de marca — todos os demais foram interpolados a partir deles para formar uma escala consistente (mesma família de matiz, progressão suave de luminosidade).

| Passo | Azul (`blue`) | Amarelo (`yellow`) | Neutro (`neutral`) |
|---|---|---|---|
| 50 | `#F0F9FE` | `#FFFBEB` | `#F8FAFB` |
| 100 | `#DDF2FE` | `#FFF4D1` | `#F1F5F9` |
| 200 | `#B9E4FE` | `#FFE9A8` | `#E3E8ED` |
| 300 | `#75CFFF` | `#FFDB70` | `#CDD3DB` |
| 400 | **`#30B5FF`** (Azul claro) | `#FFCF3D` | `#A3ADB8` |
| 500 | `#0582FF` | **`#FFC107`** (Amarelo Avançar) | `#7C8998` |
| 600 | **`#0057D9`** (Azul CBA) | `#E69D00` | `#5C6A7A` |
| 700 | `#0047B2` | `#BD7305` | `#435060` |
| 800 | **`#003A8C`** (Azul profundo) | `#965408` | `#2B3646` |
| 900 | `#02285A` | `#713A09` | `#171F2C` |
| 950 | `#031735` | — | `#0C121D` |

**Uso:** as escalas primitivas (`blue-500`, `yellow-300`, `neutral-700`...) ficam disponíveis para casos sem significado semântico — ilustrações, gráficos e badges de talento na futura plataforma (§8). Componentes de produto (botões, links, superfícies, textos) usam os **tokens semânticos** abaixo, nunca a escala primitiva diretamente.

## 3. Tokens semânticos

Definidos como CSS custom properties em `src/app/globals.css` (`:root`), expostos ao Tailwind via `tailwind.config.ts`. Nomenclatura segue o padrão já existente no projeto (nomes curtos, sem prefixo `color-`); a coluna da direita mostra a equivalência com a nomenclatura de referência do design system.

| Token do projeto | Valor | Equivalente de referência |
|---|---|---|
| `--canvas` | `#F8FAFB` | `--color-background` |
| `--surface` | `#FFFFFF` | `--color-surface` |
| `--surface-muted` | `#F1F5F9` | `--color-surface-muted` |
| `--ink` | `#171F2C` | `--color-text` |
| `--muted` | `#5C6A7A` | `--color-text-muted` |
| `--inverse` | `#FFFFFF` | `--color-text-inverse` |
| `--border` | `#E3E8ED` | `--color-border` |
| `--border-strong` | `#CDD3DB` | `--color-border-strong` |
| `--brand` | `#0057D9` | `--color-primary` |
| `--brand-hover` | `#0047B2` | `--color-primary-hover` |
| `--brand-active` | `#003A8C` | `--color-primary-active` |
| `--brand-foreground` | `#FFFFFF` | `--color-primary-foreground` |
| `--secondary` | `#003A8C` | `--color-secondary` |
| `--secondary-hover` | `#02285A` | `--color-secondary-hover` |
| `--secondary-foreground` | `#FFFFFF` | `--color-secondary-foreground` |
| `--accent` | `#FFC107` | `--color-accent` |
| `--accent-hover` | `#E69D00` | `--color-accent-hover` |
| `--accent-foreground` | `#171F2C` | `--color-accent-foreground` |
| `--success` | `#15803D` | `--color-success` |
| `--warning` | `#C2410C` | `--color-warning` |
| `--error` | `#DC2626` | `--color-error` |
| `--info` | `#075985` | `--color-info` |

**Nota sobre `secondary`:** a identidade tem só duas famílias de cor (azul e amarelo). "Secundário" foi mapeado para o Azul profundo (`blue-800`) — o mesmo tom já usado para textos/áreas de alto contraste (§4) — em vez de inventar uma terceira cor sem lastro na marca.

**Nota sobre `info`:** usa `blue-800`/`#075985`-equivalente com texto branco (não `blue-600`) porque `blue-600` com texto branco fica em 4.1:1 — abaixo do mínimo AA de 4.5:1 (§6, tabela de contraste).

## 4. Hierarquia de uso

| Cor | Papel |
|---|---|
| **Azul institucional** (`brand` / `blue-600`) | Cor principal de marca — navegação, links, botões primários, elementos institucionais, estados selecionados |
| **Azul profundo** (`secondary` / `blue-800`) | Textos/áreas de alto contraste, header/footer quando apropriado, fundos institucionais, dashboards |
| **Amarelo/dourado** (`accent` / `yellow-500`) | Destaque, CTA importante, indicadores, detalhes visuais — nunca cobrindo grandes áreas sem justificativa |
| **Azul claro** (`blue-400`/`blue-50`/`blue-100`) | Superfícies secundárias, cards, destaques leves, elementos educacionais — como tinta de fundo (`blue-50`/`blue-100`), não como preenchimento sólido de botão (falha de contraste com texto branco, §6) |
| **Branco/neutros** (`surface`, `surface-muted`, `neutral-*`) | Fundos, superfícies, leitura, separação de conteúdo |

## 5. Cores funcionais

Independentes de azul/amarelo da marca, para não sobrecarregar a identidade com significado de estado:

| Token | Valor | Uso |
|---|---|---|
| `success` | `#15803D` | Confirmações, matrícula concluída, avaliação positiva |
| `warning` | `#C2410C` | Atenção, pendências, prazos próximos |
| `error` | `#DC2626` | Erros de formulário, falhas, campos obrigatórios |
| `info` | `#075985` | Mensagens informativas, dicas, estados neutros de sistema |

Reservadas para formulários, matrícula, dashboards, avaliações, status e alertas em toda a plataforma — inclusive na futura Plataforma de Talentos.

## 6. Combinações aprovadas (WCAG)

Calculado com a fórmula oficial de contraste (luminância relativa). Mínimo-alvo: **AA** (4.5:1 texto normal, 3:1 texto grande/UI).

| Combinação | Contraste | Resultado | Uso recomendado |
|---|---|---|---|
| Branco sobre Azul institucional (`brand`) | 6.24:1 | ✅ AA | Botões primários, badges sólidos |
| Branco sobre Azul profundo (`secondary`) | 10.59:1 | ✅ AAA | Headers escuros, botões secundários |
| **Branco sobre Azul claro (`blue-400`)** | **2.29:1** | ❌ **Reprovado** | Nunca usar texto branco sobre `blue-400` sólido |
| Texto escuro (`ink`) sobre Azul claro (`blue-400`) | 7.36:1 | ✅ AAA | Se precisar de texto sobre `blue-400`, usar `ink`, não branco |
| Azul institucional sobre branco (link) | 6.24:1 | ✅ AA | Links de texto |
| Azul profundo sobre branco/cinza de fundo | 10.59:1 / 9.66:1 | ✅ AAA | Títulos, texto institucional de ênfase |
| **Branco sobre Amarelo (`accent`)** | **1.63:1** | ❌ **Reprovado** | Nunca usar texto branco sobre amarelo |
| Preto/`ink` sobre Amarelo (`accent`) | 12.88:1 / 10.33:1 | ✅ AAA | Texto e ícones sobre fundo amarelo sempre escuros (`accent-foreground`) |
| Azul profundo sobre Amarelo | 6.49:1 | ✅ AA | Alternativa de texto sobre amarelo quando não for `ink` puro |
| `muted` sobre `canvas`/`surface` | 5.28–6.39:1 | ✅ AA | Texto secundário, legendas |
| `ink` sobre `canvas` | 15.81:1 | ✅ AAA | Texto de corpo padrão |
| Branco sobre `success` / `warning` / `error` | 5.0–5.2:1 | ✅ AA | Badges e alertas sólidos |
| Branco sobre `info` (`#075985`) | 7.56:1 | ✅ AAA | Badges informativos — usar este tom, não `blue-600`, para texto branco |

**Regra geral:** nunca forçar texto branco sobre `accent` ou sobre `blue-400`/`blue-300` — sempre `ink` (ou `accent-foreground`, que é o mesmo valor).

## 7. Gradientes oficiais

Poucos, com moderação — nunca substituindo hierarquia ou prejudicando legibilidade de texto sobreposto.

| Nome | Valores | Uso |
|---|---|---|
| `gradient-brand` | `blue-600 → blue-400` (`#0057D9 → #30B5FF`) | Heros e fundos decorativos amplos — sem texto sobreposto sem um overlay escuro |
| `gradient-institutional` | `blue-800 → blue-600` (`#003A8C → #0057D9`) | Headers/seções institucionais de alto contraste, aceita texto branco |
| `gradient-accent-soft` | `yellow-400 → yellow-600` (`#FFCF3D → #E69D00`) | Detalhes pequenos (ícones, barras de destaque) — nunca como fundo de texto |

Não implementados como utilitário Tailwind nesta tarefa (fora do escopo de "fundação", sem redesenho) — documentados para uso futuro via `bg-gradient-to-r from-... to-...` com os tokens acima.

## 8. Plataforma de Talentos (preparação)

A paleta já comporta gráficos, indicadores, competências, filtros e badges: a escala `blue` inteira (50–950) mais `success/warning/error/info` cobrem status e progressão sem precisar de cor nova por talento/competência. **Regra explícita:** não criar uma cor dedicada por competência/talento — usar a escala neutra/azul para estrutura (eixos, grades, bordas de tabela) e reservar `accent` só para o que precisa saltar aos olhos (ex.: uma conquista, um destaque pontual). A identidade visual da plataforma continua sendo a do Baby Avançar, não uma paleta de dashboard genérica.

## 9. Dark mode

Não implementado agora. Os tokens são todos CSS custom properties já centralizadas em `:root` — introduzir dark mode no futuro é redefinir os mesmos nomes de token sob `@media (prefers-color-scheme: dark)` / `[data-theme="dark"]`, sem tocar nos componentes que os consomem. Nenhuma decisão desta tarefa impede isso.

## Regras

- **Use azul institucional (`brand`)** para toda ação primária: botões principais, links, navegação ativa, estados selecionados.
- **Use azul profundo (`secondary`)** para contraste alto: headers escuros, textos de ênfase institucional, fundos de dashboard.
- **Use amarelo/dourado (`accent`)** com moderação: um destaque por seção, no máximo. Nunca como cor de fundo de bloco de texto extenso. Texto sobre `accent` é sempre `accent-foreground` (escuro) — nunca branco.
- **Use neutros (`canvas`/`surface`/`surface-muted`/`neutral-*`)** para tudo que não carrega significado de marca ou de estado: fundos, divisores, texto secundário.
- **Não use `brand`/`accent`** para representar sucesso, erro, aviso ou informação — use sempre `success`/`warning`/`error`/`info`.
- **Componentes novos:** sempre um token semântico primeiro; a escala primitiva (`blue-500`, `yellow-200`...) só quando não houver significado de marca/estado (ex.: um gráfico com múltiplas séries neutras).
- **Contraste:** qualquer combinação nova de texto sobre fundo colorido deve ser verificada contra a tabela do §6 antes de ir para produção — especialmente qualquer uso de `blue-400`/`blue-300` ou `accent` como fundo sólido atrás de texto.
