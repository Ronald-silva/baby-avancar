# ROADMAP DE IMPLEMENTAÇÃO — Ecossistema Digital Baby Avançar

> Este documento é a fonte de verdade técnica do upgrade. Ele parte da [AUDITORIA TÉCNICA — BABY AVANÇAR] (estado atual do código, em 2026-09-11) e da diretriz arquitetural obrigatória definida para preparar o site desde já como camada pública de um ecossistema maior (site institucional → captação/matrícula → administração de conteúdo → área autenticada → Plataforma de Mapeamento de Talentos → IA).
>
> Executor previsto: Ronald, com Claude Code (e, a partir do fechamento deste levantamento, o Railway MCP para reduzir trabalho manual de infraestrutura). Sem prazo fixo — prioridade é fazer certo e evitar reconstrução.

---

## 0. Princípios norteadores

**Critério fundamental (vale para toda decisão deste roadmap):**

> "Isso facilita ou dificulta transformar este site no ecossistema digital Baby Avançar nos próximos estágios?" Uma solução rápida agora que gera forte acoplamento ou exige reconstrução depois deve ser evitada.

**Dois riscos críticos da auditoria que determinam a ordem das fases:**

1. **Risco de deploy:** `vercel.json` vazio + `package.json` com scripts Next.js pode fazer a Vercel trocar o preset de "site estático" para "Next.js app" e derrubar o site legado em produção (arquivos fora de `public/` deixam de ser servidos). Isso precisa ser resolvido **antes** de qualquer outro trabalho, não depois. **Mitigado (Decisão 2, ADR-010):** o site atual permanece na Vercel sem alteração de preset até o fim da Fase 1 — a troca de produção será uma ação controlada, nunca uma consequência acidental de configuração.
2. **Ausência total de controle de versão na raiz do projeto.** Não há `.git` hoje — qualquer erro de edição é irreversível. Nenhuma fase de código deve começar antes disso ser corrigido. **Resolvido:** Git inicializado, histórico real, remoto no GitHub.

**Sequência macro acordada:**

```
Fundação → Institucional/SEO → Captação/Matrícula → Administração de Conteúdo
   → Identidade/Auth → Plataforma de Talentos → IA
```

Institucional/SEO precede Captação/Matrícula porque não faz sentido construir um funil de leads em cima de dois sites fragmentados e parcialmente migrados — unificar em um único frontend Next.js é pré-requisito estrutural, não só de negócio, para instrumentar CTAs e capturar origem de forma confiável (ver §6). A partir daí, a ordem de entrega de funcionalidades de negócio prioriza Captação/Matrícula, porque é o módulo com retorno mensurável mais imediato para a escola — isso é uma decisão de **sequenciamento de entrega**, não de **arquitetura**: nenhuma fase anterior à Plataforma de Talentos deve fechar portas para ela.

A arquitetura reserva desde a Fase 0 os pontos de extensão necessários para a Plataforma de Talentos (rotas, ambientes, fronteiras de domínio) — isso não significa que o modelo de dados pedagógico já existe nessa fase; ele só é desenhado a partir da Fase 5 (§9). "Preparado desde o início" quer dizer que nada nas Fases 0-4 impede essa extensão, não que ela já está construída.

---

## 1. Visão macro das fases

| Fase | Objetivo | Esforço | Critério de pronto |
|---|---|---|---|
| 0 — Fundação | Eliminar os dois riscos críticos e provisionar a base de infraestrutura | P | Git iniciado; site atual da Vercel preservado (Decisão 2, ADR-010); aplicação Next.js full-stack + Postgres provisionados no Railway (Decisão 1, ADR-009); projeto fantasma removido |
| 1 — Institucional & SEO | Unificar os dois sites em um só, no Next.js, sem perder SEO | M | Site legado descontinuado; conteúdo, JSON-LD, sitemap e OG migrados; domínio próprio no ar |
| 2 — Captação & Matrícula | Substituir o link cru de WhatsApp por um funil real, com dados no backend | M | Lead, solicitação de matrícula e origem de CTA persistidos no Postgres via API própria |
| 3 — Administração de Conteúdo | Tirar a galeria e o conteúdo institucional do código-fonte | M | Fotos e textos institucionais editáveis sem deploy, via painel simples |
| 4 — Identidade & Autenticação | Introduzir login e os 4 perfis previstos, sem RBAC completo ainda | M | Responsável e educador conseguem logar; permissões básicas por perfil funcionam |
| 5 — Plataforma de Talentos | Construir o núcleo pedagógico (alunos, turmas, atividades, avaliações, perfil longitudinal, relatórios) | G (6 sub-fases) | Detalhado por sub-fase na Seção 9 |
| 6 — IA Assistida | Camada de IA sobre dados estruturados já confiáveis | M | IA nunca é fonte de verdade; sempre cita a evidência estruturada de onde partiu |

Esforço: **P**equeno / **M**édio / **G**rande — estimativa qualitativa, sem compromisso de prazo.

---

## 2. Modelo de domínios (bounded contexts)

A arquitetura reserva fronteiras para os seguintes domínios desde o início. Não significa criar todos agora — significa que nenhuma fase deve misturar as responsabilidades de dois domínios dentro do mesmo módulo de código ou tabela.

| Domínio | Introduzido na fase | Responsabilidade |
|---|---|---|
| Institucional | 1 | Conteúdo público (textos, páginas, informações da escola) |
| Mídia | 1 (leitura) / 3 (gestão) | Armazenamento e metadados de fotos/arquivos (**não é o Postgres** — ver §3.8) |
| Leads | 2 | Captação de interesse, antes de qualquer vínculo com aluno |
| Matrícula | 2 | Solicitação e processo de matrícula — distinto de Lead e de Aluno |
| Identidade/Auth | 4 | Contas, sessões, perfis (admin, coordenação, educador, responsável) |
| Alunos | 5.1 | Cadastro do aluno matriculado |
| Responsáveis | 5.1 | Cadastro do responsável e vínculo responsável↔aluno |
| Educadores | 5.1 | Cadastro de educadores/professores |
| Turmas | 5.1 | Turmas e períodos letivos |
| Atividades | 5.2 | Atividades pedagógicas e evidências observadas |
| Avaliações | 5.3 | Avaliações, competências, habilidades, indicadores |
| Talentos | 5.4 | Perfil longitudinal, evolução temporal, recomendações |
| Relatórios | 5.5 | Agregações e visualizações para responsáveis/coordenação |
| Comunicação | 2 / 6 | WhatsApp, notificações, futura camada de agente de IA |
| Analytics | 2 | Rastreamento de conversão e uso (não confundir com dados pedagógicos) |

---

## 3. Decisões arquiteturais transversais

Aplicam-se a **todas** as fases a partir do momento em que são introduzidas.

### 3.1 Arquitetura de aplicação e separação de responsabilidades

**Decisão (ADR-009, §13):** a aplicação nova (institucional + `/plataforma` + `/api/*`) roda como um único Next.js full-stack no Railway — não como frontend e backend fisicamente separados:

```
Next.js full-stack (Railway)
├── site institucional
├── /plataforma
└── /api/*
       ↓
PostgreSQL (Railway, rede privada)
```

Isso substitui a suposição original de frontend na Vercel + backend Node separado no Railway (comparação completa registrada no ADR-009). A separação de responsabilidades **continua existindo por organização de código e de domínios** (§2): nenhuma rota de UI acessa o Postgres diretamente, e toda regra de negócio vive nas rotas `/api/*`, nunca em componentes de interface — só deixa de existir como dois servidores físicos distintos.

**Limitações aceitas conscientemente:** perdem-se conveniências nativas da Vercel — preview deployments automáticos por PR, CDN/edge network específico e otimizações de imagem integradas. Escalabilidade horizontal (réplicas Railway) será tratada conforme necessidade real de tráfego, não antecipada agora.

O site institucional **atual** continua na Vercel, sem relação com esta decisão, até a troca controlada ao final da Fase 1 (Decisão 2, ADR-010).

### 3.2 Autenticação

Provedor pronto (ex.: Auth.js/NextAuth, Clerk ou Supabase Auth — decisão final em aberto, ver §11), em vez de auth própria. Critérios de escolha: custo por usuário ativo em escala pequena (dezenas a poucas centenas de contas, não milhares), suporte a múltiplos perfis/roles, facilidade de integrar com o backend Railway (JWT/sessão validável fora do provedor), e maturidade/manutenção do projeto.

### 3.3 Modelo de dados com histórico e auditoria

Nenhuma tabela que representa observação, avaliação ou evidência pedagógica é *mutável por sobrescrita*. Padrão: registros são **append-only** (nova linha a cada nova observação, nunca `UPDATE` destrutivo sobre o conteúdo pedagógico), com `autor_id`, `criado_em`, e referência a que atividade/contexto gerou aquele registro. Tabelas de cadastro simples (nome do aluno, telefone) podem ser mutáveis normalmente — a regra de histórico vale especificamente para o conteúdo interpretativo/pedagógico (ver §9, princípio da Fase 5).

Consequência de modelagem: preferir tabelas de eventos/observações relacionadas a um aluno por chave estrangeira, em vez de colunas fixas em uma tabela `alunos` que seriam sobrescritas a cada nova avaliação.

### 3.4 LGPD e privacidade

Item técnico e arquitetural obrigatório desde a Fase 4 (quando dados pessoais de responsáveis/educadores começam a existir) e crítico a partir da Fase 5 (dados de crianças). Requisitos técnicos a prever na modelagem, independentemente da fase em que cada um for implementado:

- Controle de acesso por perfil (menor privilégio) desde o desenho das tabelas, não como camada adicionada depois.
- Minimização de dados: só coletar o que tem uso definido.
- Consentimento como registro rastreável (quem consentiu, quando, para qual finalidade) quando aplicável — não um checkbox sem persistência.
- Trilha de auditoria (quem acessou/alterou o quê, quando) nas tabelas sensíveis desde que existirem.
- Política de retenção e exclusão definida por domínio (dado de lead não precisa da mesma retenção que dado de avaliação de aluno matriculado).
- Segregação de dados entre domínios (um vazamento em Institucional não deve expor dados de Alunos).

**Importante:** esta seção define requisitos técnicos. Ela **não substitui** a revisão jurídica formal (bases legais de tratamento de dados de crianças, termos de consentimento, política de privacidade publicada) — essa validação com assessoria jurídica é uma pendência explícita (ver §11) e deve ocorrer antes da Fase 5 entrar em uso com dados reais de alunos.

### 3.5 Preparação para IA sem dependência de IA

A lógica de negócio da Plataforma de Talentos (regras de avaliação, cálculo de indicadores, permissões) deve funcionar **integralmente sem LLM**. IA entra apenas como camada de leitura/síntese sobre dados já estruturados (padrões, resumos, correlações, sugestões) e nunca como fonte de verdade — toda saída de IA deve ser rastreável até a evidência estruturada que a originou. Isso também significa que a Fase 6 nunca deve ser pré-requisito técnico de nenhuma fase anterior.

### 3.6 Custo e infraestrutura

Railway já é um custo fixo assumido — priorizar soluções que aproveitem essa infraestrutura ao máximo antes de somar novos serviços pagos. Critério por serviço novo (auth, storage, etc.): usar free tier confiável enquanto o volume for pequeno, evitar assinatura redundante com algo que o Railway já oferece, e considerar explicitamente o custo por usuário/GB projetado para quando a Plataforma de Talentos estiver em uso real (não só o custo de piloto).

### 3.7 Operação e observabilidade

Decisões operacionais que precisam existir antes da Fase 2 (quando dados reais de leads passam a ser persistidos) e amadurecer ao longo das fases seguintes:

- **Ambientes:** no mínimo `staging`/`preview` e `production` separados no Railway, criados **no início da Fase 2** — antes de qualquer dado real de terceiros (lead, matrícula) ser gravado, nunca antecipado sem necessidade (Decisão 3, ADR-011). Não depende da Vercel, que hospeda só o site institucional atual até o fim da Fase 1.
- **Migrations:** todo schema do Postgres versionado por ferramenta de migration (ex.: Prisma Migrate, Drizzle Kit ou equivalente) — nunca alteração manual de schema em produção.
- **Backups e recuperação do PostgreSQL:** estratégia de backup automático definida antes da Fase 2 entrar em produção com dados reais de famílias. Critério de aceite objetivo: pelo menos uma restauração de teste executada com sucesso e documentada (data, duração, dado restaurado) — "o Railway faz backup" sozinho não conta como pronto.
- **Logs estruturados:** o backend deve logar em formato estruturado (JSON) desde a primeira API real, para permitir correlação de erros com o Railway.
- **Health checks:** endpoint de saúde do backend desde o primeiro deploy no Railway.
- **Monitoramento:** alerta mínimo de erro/indisponibilidade antes da Fase 2 ir ao ar (mesmo que rudimentar).
- **Gestão de secrets:** variáveis sensíveis (chaves de auth, conexão do banco) só em variáveis de ambiente do Railway/Vercel, nunca commitadas — nenhum `.env` no repositório.
- **Estratégia de deploy/rollback:** deploy do backend e do frontend deve poder ser revertido rapidamente; migrations de banco precisam de plano de rollback documentado antes de rodarem em produção.
- **Railway MCP como ferramenta operacional:** a partir do fechamento deste roadmap, usar o MCP do Railway para provisionar serviços, variáveis e domínios sempre que suportado, em vez de configuração manual pelo dashboard — reduz erro humano e documenta a operação como comandos reproduzíveis.

### 3.8 Storage/Mídia (decisão arquitetural em aberto)

O PostgreSQL **não deve armazenar arquivos binários** (fotos da galeria hoje, futuros documentos/arquivos ligados a alunos). O banco guarda apenas metadados (categoria, legenda, alt, ordem, referência ao arquivo). A escolha do storage de objetos (ex.: bucket do Railway, S3-compatível, ou outro provedor com bom custo-benefício) é uma decisão a fechar na Fase 3, quando a galeria sai do código — ver §11.

### 3.9 Design & Experiência (produto, não só migração técnica)

**Contexto:** o novo site não é uma migração técnica isolada. Ele é, ao mesmo tempo: (1) o novo produto digital institucional da escola; (2) a principal vitrine digital apresentada à direção; (3) um case real da RonalDigital; (4) peça futura de portfólio comercial. A partir da Fase 1, qualidade visual e de experiência são **requisito de produto**, não polimento opcional de fim de sprint.

**Padrão exigido em toda UI construída a partir da Fase 1:** UI, UX, direção de arte, hierarquia visual, tipografia, grid e espaçamento, responsividade, acessibilidade, microinterações, motion design, feedback visual, storytelling institucional, performance, SEO e consistência de componentes — tratados como requisitos de produto, não como itens isolados a critério de quem implementa.

**Anti-objetivo explícito** (o que não produzir): aparência genérica de template; estética típica de site gerado por IA; excesso de cards; gradientes gratuitos; glassmorphism indiscriminado; animações decorativas sem função; carrosséis sem função; textos genéricos; efeitos que prejudiquem performance; elementos visuais sem relação com a identidade escolar.

**Motion com função, não decoração:** usar Framer Motion (ou equivalente) apenas para entrada progressiva de conteúdo, transições, feedback de interação, revelação de elementos, reforço de hierarquia e pequenas experiências de encantamento — nunca para demonstrar tecnologia. Preferir animar `transform`/`opacity` (custo de performance menor). `prefers-reduced-motion` sempre respeitado — já há uma regra global em `globals.css` (`@media (prefers-reduced-motion: reduce)`); toda animação nova deve continuar caindo dentro dessa regra, não introduzir motion que a contorne.

**Mobile-first de verdade:** o resultado deve ser desenhado para mobile, não ter o desktop adaptado para caber nele. Validar explicitamente nas larguras: `320px`, `375px`, `390px`, `430px`, `768px`, `1024px`, `1440px+`.

**Acessibilidade — WCAG AA como piso, não teto:** contraste (ver tabela §6 de `docs/DESIGN_SYSTEM.md`), navegação por teclado, estados de foco visíveis, semântica HTML correta, labels em todo campo de formulário, `alt text` em toda imagem informativa, tamanho mínimo de alvos de toque (`tap-target`, já usado no projeto), e `reduced motion`.

**Performance como meta de engenharia, não consequência:** Core Web Vitals saudáveis; imagens otimizadas (`next/image`); fontes controladas via `next/font` (corrige a pendência já registrada na Fase 1, ver tabela abaixo); evitar JS desnecessário no cliente; lazy loading onde apropriado; animações preferencialmente em `transform`/`opacity`.

**Processo obrigatório antes de codificar qualquer página nova** (a começar pela Home da Fase 1): não iniciar pela implementação. Primeiro uma etapa de **Design Discovery**, nesta ordem: (1) inventariar o conteúdo institucional existente; (2) identificar público e objetivos de conversão da página; (3) analisar a arquitetura de informação atual; (4) identificar assets disponíveis e assets ausentes; (5) definir a hierarquia de informação; (6) pesquisar referências de excelência (não necessariamente do setor educacional); (7) propor uma direção visual; (8) definir a linguagem de motion; (9) definir os componentes necessários; (10) produzir um wireframe/estrutura da página. Só depois de percorrer essas dez etapas, propor implementação de código.

**Sobre a marca (não bloqueia trabalho estrutural):** a nova logo oficial da escola ainda não está no repositório; a paleta atual (`docs/DESIGN_SYSTEM.md`) continua **provisória**. Quando a nova logo for fornecida e adicionada em `public/media/`, repetir a extração/análise cromática (mesmo método já usado) antes de congelar qualquer valor de cor como definitivo. Isso não impede o trabalho estrutural desta fase (componentes, grid, tipografia, motion, acessibilidade) — só adia o congelamento final da paleta.

**Critério de pronto adicional, transversal a partir da Fase 1:** nenhuma fase que produza UI nova pode ser considerada concluída sem uma **auditoria final separada** de UI, UX, responsividade, acessibilidade, motion, performance, SEO e consistência visual, feita depois da implementação — essa auditoria não é substituída por lint, typecheck ou build passando, nem pela revisão de correção funcional do código.

---

## 4. Fase 0 — Fundação

**Objetivo:** eliminar os dois riscos críticos da auditoria e deixar a infraestrutura básica pronta para todo o resto.

| Entregável | Decisão técnica | Esforço |
|---|---|---|
| Repositório Git inicializado na raiz | `git init`, primeiro commit do estado atual antes de qualquer alteração | P |
| Remoção do projeto fantasma `escola-baby-avancar/` | Deletado por decisão já tomada (housekeeping, zero risco) | P |
| Configuração de deploy da Vercel confirmada/travada | **Decidido (Decisão 2, ADR-010):** site atual mantido no ar sem alteração de preset até o fim da Fase 1; a troca de produção será uma ação controlada, não automática | P |
| Aplicação Next.js full-stack provisionada no Railway + PostgreSQL Railway | Um único serviço Next.js (institucional + `/plataforma` + `/api/*`) no Railway, conectado ao Postgres via rede privada — sem ambiente `staging` nesta fase, adiado para o início da Fase 2 (Decisão 3, ADR-011) | M |
| Esqueleto de rotas `/plataforma/*` reservado no Next.js | Rotas criadas como placeholders protegidos (mesmo sem funcionalidade), para que a Fase 4/5 não precise reestruturar o roteamento | P |
| Health check + logs estruturados no backend | Primeiro endpoint do backend já nasce com isso, não é retrofit depois | P — **DONE** (validado em produção em 2026-09-12, ver ADR-012) |

**Critério de pronto:** `git log` mostra histórico real; aplicação Next.js full-stack acessível no Railway com Postgres via rede privada, a partir de um health check simples; site atual da Vercel preservado sem risco de troca acidental de preset (ADR-010).

**Status F0.5 (health check):** DONE. Validado em 2026-09-12 contra `https://baby-avancar-production.up.railway.app/api/health` — ver evidência completa em ADR-012.

---

## 5. Fase 1 — Institucional & SEO

**Objetivo:** unificar os dois sites em um único app Next.js, sem perder o SEO já conquistado pelo site legado — com padrão de produto digital (§3.9), não apenas paridade técnica de conteúdo.

| Entregável | Decisão técnica | Esforço |
|---|---|---|
| Design Discovery da Home (e das demais páginas migradas) | Executado **antes** de qualquer código de UI, seguindo as dez etapas de §3.9 (inventário de conteúdo, público/conversão, arquitetura de informação, assets disponíveis/ausentes, hierarquia, referências, direção visual, linguagem de motion, componentes, wireframe) | M |
| Fonte única de dados institucionais | Nome, endereço, telefone/WhatsApp, Instagram, cursos extras — hoje duplicados em 9 arquivos — centralizados em um único módulo de configuração no Next.js (arquivo de constantes nesta fase; migrável para o backend na Fase 3 sem mudar quem consome) | M |
| Migração de conteúdo do site legado para `src/app` | Todas as seções de `index.html` (Sobre, Ensino, Diferenciais, Depoimentos, Contato) e as páginas `galeria.html`, `cursos-extras.html`, `servicos-assessoria.html` recriadas como rotas Next.js, com direção visual definida no Design Discovery — não uma migração 1:1 do HTML legado | G |
| Migração de SEO técnico | JSON-LD (`EducationalOrganization`), Open Graph, Twitter Cards, canonical, `sitemap.ts`/`robots.ts` do Next.js cobrindo todas as páginas (o `sitemap.xml` atual só cobre 2 de 4 páginas — corrigir aqui) | M |
| Correção da fonte tipográfica do novo design | Carregar Fraunces/Nunito Sans de fato via `next/font`, ou trocar a declaração se a decisão visual mudar | P |
| Domínio próprio | Migrar de `baby-avancar.vercel.app` para domínio próprio, com redirects 301 das URLs antigas para preservar SEO | M |
| Descomissionamento do site legado | `index.html`, `galeria.html`, `cursos-extras.html`, `servicos-assessoria.html`, `css/`, `js/` (raiz) removidos do build depois que a paridade de conteúdo for confirmada | P |

**Critério de pronto:** todas as páginas do site legado têm equivalente no Next.js; Google Search Console (ou verificação manual de JSON-LD/sitemap) confirma paridade de SEO; domínio próprio resolvendo em produção; **e** auditoria final separada de UI, UX, responsividade, acessibilidade, motion, performance, SEO e consistência visual aprovada (§3.9) — sem essa auditoria, a Fase 1 não é considerada concluída mesmo com todo o conteúdo migrado.

### 5.1 SEO + AEO/GEO (Bloco 4 — Refinamento Final da Home)

**IMPLEMENTADO AGORA** (código, no app Next.js, validado por `npm run build`):

- SEO técnico: `metadata` da Home e de `/acesso` (title/description reais, `metadataBase`, `canonical` por página via `alternates.canonical`), título com template (`%s | Colégio Baby Avançar`). Canônico e `@id` do JSON-LD usam o domínio oficial `babyavancar.com.br` (ADR-015) — o Railway é só ambiente técnico de validação, nunca a referência canônica, mesmo quando acessado diretamente para QA.
- Open Graph: `type`, `locale: pt_BR`, `siteName`, title/description — **sem imagem OG própria ainda** (pendência documentada abaixo, nenhuma imagem improvisada foi gerada só para preencher checklist).
- `robots.ts` nativo do Next.js: libera `/` e `/acesso`, bloqueia `/plataforma` e `/api/*`, aponta para o sitemap.
- `sitemap.ts` nativo do Next.js: só URLs públicas reais (`/`, `/acesso`) — `/plataforma` fica de fora (placeholder sem conteúdo indexável, já `noindex` desde a Fase 0.6).
- Dados estruturados (JSON-LD) na Home: `School` com as duas unidades como `department` (endereço real de cada uma, `PostalAddress`), `WebSite` e `FAQPage` — nenhum rating, preço, horário, telefone por unidade, `foundingDate`, coordenadas ou e-mail inventados.
- SEO local: endereço completo (rua, bairro, **Fortaleza – CE**) consistente em todo conteúdo visível que menciona uma unidade — seção Infantil, seção Fundamental, seção Unidades e Footer — mais o mesmo dado no JSON-LD.
- AEO/GEO: seção de Perguntas Frequentes com 5 perguntas reais (segmentos, endereço de cada unidade, atividades extras, como agendar visita) — respostas derivadas só de conteúdo já confirmado alhures na página, nunca inventadas; `<address>` semântico para todo endereço; heading hierarchy única (um só `<h1>`, na Hero) revisada em toda a Home.
- Acessibilidade: ARIA redundante removida (`role="contentinfo"` no `<footer>`, já implícito), skip link ("Pular para o conteúdo") adicionado ao Header.
- Link quebrado corrigido: os dois botões de `/acesso` apontavam para `/entrar?perfil=...`, rota inexistente — trocados por um estado "Em breve" honesto (a plataforma de fato ainda não tem login, ver Fase 4/5).

**EXIGE CONFIGURAÇÃO EXTERNA APÓS DEPLOY** (não é código, não pode ser marcado concluído antes de domínio/deploy utilizável):

- Google Search Console: verificar propriedade e submeter `sitemap.xml` em `https://babyavancar.com.br/sitemap.xml` — só possível **depois** do DNS apontar para lá e do cutover de fato (domínio adquirido em ADR-015, mas ainda não está resolvendo em produção).
- Bing Webmaster Tools: mesma dependência — etapa pós-cutover, não antes.
- Imagem de Open Graph própria (1200×630): nenhum asset atual tem essa proporção; pendente de um design dedicado.
- Favicon dedicado: hoje o ícone do app reaproveita `public/media/logo.png` (o selo circular completo, com texto) — funciona, mas não é um asset otimizado para 16–32px; um ícone simplificado (só o símbolo, sem o lockup de texto) é uma melhoria pendente, não um bloqueio.
- Confirmação da direção da escola de que o arquivo atual de logo é a identidade final (ver `docs/DESIGN_SYSTEM.md`) e, a partir disso, re-extração cromática da paleta provisória.
- Analytics/conversões (GA4, Plausible ou equivalente): fora de escopo desta rodada por decisão explícita — os pontos de conversão (Agendar visita, WhatsApp, Ver no mapa, Acesso à plataforma) já existem como links reais e rastreáveis; instrumentá-los é etapa operacional da Fase 2 (§ Fase 2, "Rastreamento de origem do CTA"), não deste bloco.

---

## 6. Fase 2 — Captação & Matrícula

**Objetivo:** substituir o link cru de WhatsApp por um funil com dados reais no backend — o módulo de retorno mais imediato para a escola.

**Princípio de modelagem desta fase:** *lead/interesse*, *solicitação de matrícula* e *aluno efetivamente matriculado* são três entidades conceitualmente distintas. Um lead **não** vira aluno automaticamente — a transição de lead → solicitação de matrícula → aluno matriculado é sempre uma ação explícita (da escola ou de um fluxo definido), nunca um efeito colateral implícito de outra ação no sistema.

| Entregável | Decisão técnica | Esforço |
|---|---|---|
| API de Leads no backend Railway | Endpoint que recebe interesse (nome, contato, origem do CTA) e persiste no Postgres, domínio `Leads` isolado de `Matrícula` | M |
| Rastreamento de origem do CTA | Cada botão de WhatsApp/formulário passa a registrar de qual seção/página partiu, resolvendo a lacuna de atribuição identificada na auditoria | P |
| Fluxo de solicitação de matrícula | Formulário próprio (não confundir com o formulário de lead genérico), gravado no domínio `Matrícula`, com campos e status de processo (recebida, em análise, confirmada) | M |
| Analytics real básico | Substituir o `Analytics` mockado de `js/analytics.js` (hoje só grava em `localStorage`) por eventos reais indo para a API própria ou uma ferramenta como GA4/Plausible | M |
| WhatsApp continua como canal, mas instrumentado | Clique em WhatsApp passa a gerar um evento de lead antes do redirecionamento, não é substituído por chat embutido nesta fase | P |
| Criação do ambiente `staging` + backup já operando (§3.7) | `staging` é criado **nesta fase** (Decisão 3, ADR-011 — não mais na Fase 0), junto com backup do Postgres testado, **antes** de dados reais de famílias começarem a ser gravados aqui | — |

**Critério de pronto:** um lead ou uma solicitação de matrícula reais ficam registrados no Postgres, com origem rastreável, e a equipe da escola consegue ver essa lista (mesmo que via uma consulta simples, sem painel completo ainda — o painel entra na Fase 3/4).

---

## 7. Fase 3 — Administração de Conteúdo

**Objetivo:** tirar a galeria e o conteúdo institucional do código-fonte, permitindo edição sem deploy.

| Entregável | Decisão técnica | Esforço |
|---|---|---|
| Decisão de storage de objetos fechada (§3.8) | Bucket compatível com S3 ou solução equivalente de bom custo-benefício, escolhida considerando o que já está disponível via Railway | P |
| Metadados de mídia no Postgres | Tabela de mídia: categoria, legenda, alt, ordem, status publicado/despublicado, referência ao objeto no storage — nunca o binário da imagem no banco | M |
| API de galeria | Endpoint que serve a lista de imagens publicadas por categoria, consumido pelo Next.js em vez do array hardcoded hoje embutido no HTML/JS | M |
| Painel administrativo simples (CRUD de mídia) | Upload, categorização, edição de legenda/alt, ordenação, publicar/despublicar — sem RBAC completo ainda, mas **nunca aberto sem controle nenhum**: acesso protegido por credencial única de administrador (ou equivalente mínimo) até a Fase 4 formalizar login real, em linha com o princípio de menor privilégio desde o desenho (§3.4) | G |
| Migração do conteúdo institucional (textos) para o backend | O que na Fase 1 virou "módulo de configuração" no Next.js passa a ser servido por API, editável sem novo deploy | M |

**Critério de pronto:** uma nova foto pode ser publicada na galeria sem alterar código nem fazer novo deploy do frontend; texto institucional (ex.: trocar um telefone) é editado em um único lugar e reflete em todas as páginas.

---

## 8. Fase 4 — Identidade & Autenticação

**Objetivo:** introduzir login e os 4 perfis previstos (administrador, direção/coordenação, educador/professor, responsável), sem construir o RBAC completo ainda.

| Entregável | Decisão técnica | Esforço |
|---|---|---|
| Provedor de autenticação integrado | Definido em §11 (pendência), integrado ao Next.js e validável pelo backend Railway | M |
| Modelo de perfis no backend | Tabela/enum de perfis previsto desde já para os 4 tipos — administrador (acesso total), direção/coordenação (visão agregada entre turmas), educador (escopo da própria turma), responsável (escopo do próprio aluno) — mesmo que só 1-2 estejam realmente em uso nesta fase; escopo fino de cada perfil só é refinado na Sub-fase 5.6 | P |
| Área autenticada mínima | Login funcional para responsável e educador, com uma tela simples por perfil (ainda sem funcionalidade pedagógica — isso é a Fase 5) | M |
| Permissão básica por perfil nas rotas `/plataforma/*` | Middleware de autorização simples (perfil X pode acessar rota Y), preparado para regras mais finas depois, sem implementá-las todas agora | M |
| Uso administrativo do painel da Fase 3 passa a exigir login real | O acesso "temporário" da Fase 3 é substituído pelo login de administrador desta fase | P |

**Critério de pronto:** um responsável e um educador conseguem logar de fato e ver uma área autenticada distinta da pública; o painel de conteúdo da Fase 3 passa a exigir autenticação real.

---

## 9. Fase 5 — Plataforma de Talentos

**Objetivo:** construir o núcleo pedagógico do ecossistema. Esta é a fase mais extensa e é dividida em 6 sub-fases sequenciais.

**Princípio explícito desta fase (vale para todas as sub-fases abaixo):** observações, avaliações e evidências pedagógicas são **longitudinais, rastreáveis e atribuídas a autor e data**. Nenhum registro pedagógico é sobrescrito — uma nova observação é um novo registro, nunca a edição destrutiva de um registro anterior. Isso é o que permite responder no futuro: como uma habilidade evoluiu, em quais atividades uma aptidão apareceu, quais educadores fizeram quais observações, e quais evidências sustentam um indicador.

| Sub-fase | Escopo | Esforço |
|---|---|---|
| 5.1 — Identidade de domínio | Alunos, Responsáveis, vínculo responsável↔aluno, Educadores, Turmas, Períodos letivos | M |
| 5.2 — Atividades & Evidências | Registro de atividades pedagógicas e evidências observadas, vinculadas a aluno/turma/educador/data | M |
| 5.3 — Avaliações & Competências | Avaliações, competências, habilidades, interesses, aptidões, indicadores comportamentais — modelo **flexível** (ver nota abaixo), não campos rígidos | G |
| 5.4 — Perfil longitudinal | Consolidação da evolução temporal por aluno a partir dos registros append-only das sub-fases anteriores | M |
| 5.5 — Relatórios & Dashboards | Relatórios e dashboards para responsáveis e coordenação, acompanhamento pelos dois perfis | M |
| 5.6 — Permissões refinadas & Auditoria completa | RBAC mais fino que o básico da Fase 4 (ex.: educador só vê alunos da própria turma) + trilha de auditoria completa sobre alterações | M |

**Nota sobre modelagem flexível (Sub-fase 5.3):** competências, indicadores, categorias e instrumentos de avaliação não devem virar colunas fixas de tabela nem enums fechados no código. Preferir um modelo onde a "taxonomia pedagógica" (quais competências/indicadores existem) é ela própria um dado configurável, para que a equipe pedagógica possa evoluir o vocabulário sem exigir migração estrutural de schema a cada ajuste.

**Critério de pronto (da fase completa):** um responsável consegue ver a evolução de um indicador do próprio filho ao longo do tempo, com a evidência e o autor de cada observação visíveis; a coordenação consegue gerar um relatório agregado por turma.

---

## 10. Fase 6 — IA Assistida

**Objetivo:** camada de IA sobre dados estruturados e histórico já confiáveis — nunca antes disso.

**Pré-requisito explícito:** esta fase só começa depois que a Fase 5 tiver dados reais e histórico suficiente para a IA ter o que analisar. Não faz sentido antecipar esta fase.

| Entregável | Decisão técnica | Esforço |
|---|---|---|
| Identificação de padrões | IA lê os registros estruturados (append-only) da Plataforma de Talentos e aponta recorrências | M |
| Resumo de histórico para educadores/responsáveis | Sumarização em linguagem natural do perfil longitudinal, sempre citando a evidência estruturada de origem | M |
| Sugestão de atividades extracurriculares | Recomendação baseada em padrões identificados, apresentada como sugestão, nunca como decisão automática | M |
| Agente de IA no canal de atendimento | Só entra aqui, sobre a base de WhatsApp/comunicação já instrumentada na Fase 2 — não antes | M |

**Critério de pronto:** toda saída de IA é rastreável até o dado estruturado que a originou; a plataforma continua funcionando integralmente se a IA for desligada.

---

## 11. Riscos e decisões em aberto

Itens que este roadmap identifica como necessários, mas cuja escolha final ainda não foi feita — não devem ser decididos por omissão durante a implementação, e sim retomados explicitamente na fase indicada:

| Decisão em aberto | Relevante a partir de | Observação |
|---|---|---|
| Escolha definitiva do provedor de autenticação | Fase 4 | Ver critérios de custo/escala em §3.2 |
| Escolha definitiva de storage de objetos (mídia) | Fase 3 | Postgres não deve guardar binários (§3.8) |
| Domínio e estratégia `/plataforma` vs. subdomínio dedicado (ex. `plataforma.babyavancar.com.br`) | Fase 4/5 | A diretriz já orienta manter tudo no mesmo app Next.js; a forma de exposição (path vs. subdomínio) ainda pode ser decidida sem violar isso |
| Estratégia de backup do PostgreSQL (frequência, retenção, teste de restauração) | Fase 2 (antes de dados reais) | Não pode ser "o Railway cuida disso" sem verificação explícita |
| Requisitos jurídicos/LGPD para dados de crianças (bases legais, termos de consentimento, política de privacidade publicada) | Antes da Fase 5 entrar em uso real | Pendência explícita de assessoria jurídica — a arquitetura técnica (§3.4) não substitui essa revisão |
| Política de retenção/exclusão de dados por domínio | Fase 2 em diante, refinada na Fase 5 | Lead tem ciclo de vida diferente de dado de avaliação de aluno matriculado |
| Custos recorrentes previstos por serviço (auth, storage, monitoramento) em escala real de uso | Fase 4 (auth) / Fase 3 (storage) | Orçar antes de comprometer, não depois |
| Momento exato do descomissionamento do site legado | Fase 1 | Depende da confirmação de paridade de conteúdo e SEO, não de uma data fixa — a troca em si é uma ação controlada (Decisão 2, ADR-010), não automática |

---

## 12. Como usar este documento

- Este arquivo (`ROADMAP.md`) é a referência técnica para qualquer sessão futura de implementação (Claude Code, ou o próprio Ronald). Antes de iniciar trabalho em qualquer fase, reler a seção da fase e a Seção 3 (decisões transversais) correspondente.
- Nenhuma fase deve ser iniciada fora de ordem sem justificar explicitamente por quê, e essa justificativa deve virar uma entrada na Seção 13 (ADR).
- Ao tomar uma decisão listada na Seção 11 ("em aberto"), registrar a decisão na Seção 13 e atualizar a linha correspondente aqui.
- Este documento deve ser atualizado incrementalmente conforme as fases avançam — não é um artefato estático de planejamento único.
- A partir do fechamento deste roadmap, a operação de infraestrutura (Fase 0 em diante) deve preferir o Railway MCP a configuração manual pelo dashboard, sempre que a operação for suportada por ele (§3.7).

---

## 13. Registro de Decisões Arquiteturais (ADR resumido)

> Preencher uma linha por decisão relevante tomada durante a implementação. O objetivo é que sessões futuras não reabram uma decisão já tomada sem motivo novo.

| # | Decisão | Motivo | Alternativas consideradas | Data | Status |
|---|---|---|---|---|---|
| 001 | Backend em Railway, banco PostgreSQL no Railway | Infraestrutura já contratada/paga; aproveitar ao máximo antes de somar serviços novos | Vercel Postgres/outras marketplaces (descartado — infraestrutura já definida pelo usuário antes deste roadmap) | 2026-09-11 | Aceita |
| 002 | Plataforma de Talentos vive no mesmo app Next.js (rotas `/plataforma/*`) em vez de projeto separado | Mais simples de operar agora; evita complexidade de microfrontend sem necessidade comprovada | Projeto/app Next.js separado (microfrontend) | 2026-09-11 | Aceita |
| 003 | Autenticação via provedor pronto, não construída do zero | Menos código próprio de segurança para manter; RBAC básico já resolvido pelo provedor | Auth própria no backend Railway | 2026-09-11 | Aceita (provedor específico ainda em aberto — ver §11) |
| 004 | Domínio próprio substituirá `baby-avancar.vercel.app` | Mais profissional para uma escola real; melhora SEO local de longo prazo | Manter subdomínio Vercel indefinidamente | 2026-09-11 | Aceita — **domínio `babyavancar.com.br` adquirido em 2026-09-12 (ver ADR-015); corte de produção (cutover) ainda não feito** |
| 005 | Projeto fantasma `escola-baby-avancar/` removido | Boilerplate não utilizado, sem risco de remoção, elimina confusão de dois `package.json`/`node_modules`/git aninhados | Manter por enquanto | 2026-09-11 | Implementada — removido fisicamente do disco em 2026-09-12, `.gitignore` limpo da entrada correspondente |
| 006 | Lead, solicitação de matrícula e aluno matriculado são entidades distintas, sem conversão automática | Evita modelagem que force decisões de negócio implícitas (ex.: lead virando aluno sem uma ação humana explícita) | Modelo único "pessoa" com status evolutivo | 2026-09-11 | Aceita |
| 007 | Dados pedagógicos (observações/avaliações/evidências) são append-only, nunca sobrescritos | Necessário para responder perguntas de evolução temporal, autoria e recorrência exigidas pela Plataforma de Talentos | Tabela mutável com histórico em log separado | 2026-09-11 | Aceita |
| 008 | LGPD é requisito técnico desde a Fase 4/5, mas não substitui revisão jurídica formal | Arquitetura técnica sozinha não resolve base legal de tratamento de dados de crianças | Tratar LGPD só como checklist técnico sem validação jurídica | 2026-09-11 | Aceita — pendência jurídica registrada em §11 |
| 009 | Aplicação nova (institucional + `/plataforma` + `/api/*`) roda full-stack no Railway, não como frontend/backend fisicamente separados | Menos complexidade operacional; mesma origem elimina CORS; simplifica cookies/autenticação; usa a rede privada Railway já confirmada ativa; deploy atômico; observabilidade centralizada; extrair workers/serviços depois é trivial no mesmo projeto Railway quando houver necessidade real | Next.js na Vercel + backend Node separado no Railway + Postgres Railway (comparação completa feita antes desta decisão) | 2026-09-12 | Aceita — perde-se preview deployment automático por PR, CDN/edge e otimização de imagem nativos da Vercel; escalabilidade horizontal tratada por réplicas Railway conforme necessidade futura |
| 010 | Site institucional atual permanece na Vercel, sem alteração de preset, durante a Fase 0 e a construção da Fase 1 | Evita derrubar o site em produção antes da nova versão Next.js estar validada; a troca de produção deve ser uma ação controlada, não uma consequência acidental de configuração | Trocar o preset da Vercel imediatamente (rejeitada — é exatamente o Risco Crítico 1 da auditoria) | 2026-09-12 | Aceita — troca de produção fica marcada como ação controlada ao final da Fase 1 |
| 011 | Ambiente `staging` deixa de ser entregável da Fase 0; será criado no início da Fase 2 | Nenhum dado real de terceiros é gravado antes da Fase 2 — criar `staging` agora duplicaria serviços/Postgres sem benefício, só custo e complexidade; corrige a contradição entre §3.7 (implícito "antes da Fase 2") e a antiga redação da tabela da Fase 0 | Criar `staging` já na Fase 0, "para adiantar" | 2026-09-12 | Aceita |
| 012 | F0.5 (health check com conexão real ao Postgres) validado em produção no Railway | Confirma que o serviço `baby-avancar` (projeto `dependable-gentleness`) está de pé, conectado ao Postgres via rede privada, e emitindo logs estruturados — evidência: `GET https://baby-avancar-production.up.railway.app/api/health` → HTTP 200, corpo `{"status":"ok","database":"ok","timestamp":"2026-09-12T02:23:53.421Z"}`; log de deploy Railway no mesmo timestamp: `{"level":"info","event":"health_check","database":"ok","timestamp":"2026-09-12T02:23:53.421Z"}` | — | 2026-09-12 | Aceita — F0.5 = DONE; F0.6 não iniciada |
| 013 | `metadataBase`/canonical/sitemap usam sempre uma URL real e já confirmada como fallback via `NEXT_PUBLIC_SITE_URL`, não um domínio inventado | Nunca apontar metadata/canonical para algo que nunca existiu | Hardcode de um domínio ainda não registrado (rejeitada — violaria "não inventar informação") | 2026-09-12 | Aceita — **superada por ADR-015**: o fallback era a URL do Railway (ADR-012) enquanto não havia domínio próprio; agora é `https://babyavancar.com.br` |
| 014 | FAQ visível na Home + `FAQPage` JSON-LD adicionados no Bloco 4 | As 5 perguntas têm resposta 100% derivada de dado já confirmado alhures na página (segmentos, endereços, atividades, canal de agendamento) — reforça AEO/GEO sem inventar política de matrícula/valor/horário | Não implementar FAQ nesta rodada (rejeitada — o próprio Bloco 4 pede avaliar isso explicitamente e as respostas já eram 100% seguras) | 2026-09-12 | Aceita |
| 015 | Domínio oficial `babyavancar.com.br` adquirido — `SITE_URL` (metadata, canonical, sitemap, robots, JSON-LD `@id`/`url`) passa a usar esse domínio como fallback/canonical, substituindo a URL do Railway (ADR-013) | É a identidade pública real da escola, não um ambiente técnico; o Railway continua existindo só para deploy/QA — o HTML servido por ele deve continuar anunciando `babyavancar.com.br` como canonical | Manter o Railway como canonical até o cutover de fato (rejeitada — o domínio já é real e definitivo, não há motivo para o SEO continuar referenciando um host técnico) | 2026-09-12 | Aceita — **DNS/cutover do domínio ainda não feitos; Search Console e Bing Webmaster continuam etapa pós-cutover, não podem ser marcados concluídos agora** |
