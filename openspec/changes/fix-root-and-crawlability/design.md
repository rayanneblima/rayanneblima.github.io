## Context

Next.js 16 com `output: "export"` e `trailingSlash: true`, next-intl com `pt`, `en` e `es` em `src/app/[locale]/`.
A raiz `src/app/page.tsx` só faz `redirect("/pt/")`. No export estático, o `redirect()` do servidor vira uma casca de
erro do Next que o cliente resolve, e o `out/index.html` sai sem `<head>` útil. O GitHub Pages serve arquivos e não
permite cabeçalho nem redirecionamento HTTP.

## Goals / Non-Goals

**Goals:**
- A raiz entrega título, descrição, imagem de compartilhamento e canônica para quem não roda JS, e leva para `/pt/`.
- Robôs de busca e de IA podem rastrear o site.
- O Search Console passa a medir o site.

**Non-Goals:**
- Detectar o idioma do navegador na raiz (continua indo para `/pt/`).
- Esconder o e-mail ou trocar a tela de abertura.
- Domínio próprio para o portfólio.

## Decisions

**D1. A raiz vira página estática com `refresh` + canônica.** Em vez de `redirect()`, `src/app/page.tsx` exporta
`metadata` (título, descrição, `openGraph`, `twitter`, `alternates.canonical` apontando para `/pt/`, os mesmos textos de
`pt.json`) e renderiza um link visível "Abrir o portfólio" para `/pt/`. O `refresh` precisa estar no `<head>`. A
primeira tentativa é `<meta httpEquiv="refresh" content="0; url=/pt/" />` no componente, contando com o React 19 para
levar a tag ao `<head>`. Se o export não levar, um script de pós-build (`scripts/root-redirect.mjs`, chamado no
`npm run build`) injeta a tag no `out/index.html`. Um `location.replace('/pt/')` inline cobre o caso de o navegador
ignorar o `refresh`.
*Alternativas:* (a) servir o conteúdo de `/pt/` também na raiz. Rejeitada: duas URLs com o mesmo conteúdo, e a canônica
teria de escolher uma de qualquer forma. (b) Domínio próprio na Cloudflare, com 301 de verdade. Fica para depois; não
é necessário para resolver o problema.

**D2. `robots.txt` libera todos.** Saem os três blocos `Disallow: /` (GPTBot, ClaudeBot, Google-Extended). Fica
`User-agent: *` / `Allow: /` com o `Sitemap:`. É a mesma linha da Devanture (`landing-seo-geo`). O `public/llms.txt`
continua.

**D3. `lastModified` do sitemap vem do build.** `new Date()` no momento do export. Como o deploy acontece a cada push
na `main`, a data acompanha a última mudança publicada. *Alternativa:* data do último commit via `git log`. É mais
precisa, mas o `actions/checkout@v4` faz clone raso, e pedir histórico só para isso não compensa.

**D4. Search Console por meta tag.** Propriedade de prefixo de URL (não dá para usar domínio em `github.io`),
verificada pela meta `google-site-verification` em `src/app/[locale]/layout.tsx` (via `metadata.verification.google`)
e também na raiz. O token é gerado pela Rayanne no painel do GSC.

## Risks / Trade-offs

- [Risco] O Google considerar a raiz como "página com redirecionamento" e não indexá-la → é o esperado: o que deve ser
  indexado é `/pt/`, e a canônica aponta para lá.
- [Risco] Liberar robôs de IA expõe o conteúdo para treinamento → decisão consciente de 19/10/2026; o site é público e
  feito para ser encontrado.
- [Trade-off] O MakeMeFindable tem a checagem "Meta refresh", que hoje passa. Com o `refresh` na raiz ela pode passar
  a acusar → aceito: é 1 de 41 checagens, e o ganho na prévia do link e no Google vale mais. Só a raiz tem `refresh`;
  `/pt/`, `/en/` e `/es/` continuam sem (conferido no build local de 20/10/2026).
- [Trade-off] A nota do MakeMeFindable pode quase não mudar (ela já via a página renderizada). O ganho real aparece no
  `curl` da raiz, na prévia do link e no Search Console.

## Migration Plan

Push na `main`; o workflow publica. Rollback: reverter o commit. A verificação do GSC não depende de rollback.

## Open Questions

- Nenhuma que bloqueie.
