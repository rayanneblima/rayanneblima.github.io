## 0. Partida

- [x] 0.1 Registrar a rodada do MakeMeFindable de 19/10/2026 (78,05%) e a tabela do `proposal.md` em
      `.claude/docs/seo/makemefindable.md`; guardar o `curl` da raiz (4.485 bytes, `__next_error__`) como "antes"

## 1. Raiz com HTML de verdade (D1)

- [x] 1.1 `src/app/page.tsx`: trocar `redirect("/pt/")` por página estática com `metadata` (título, descrição,
      `openGraph`, `twitter`, `alternates.canonical` para `/pt/`) e link visível para `/pt/`
- [x] 1.2 `<meta httpEquiv="refresh" content="0; url=/pt/">` e `location.replace('/pt/')` inline; `npm run build` e
      conferir no `out/index.html` que o `refresh` saiu no `<head>`
- [x] 1.3 (Não foi preciso: o React 19 levou o `refresh` ao `<head>` no export.) Se o `refresh` não sair no `<head>`: `scripts/root-redirect.mjs` injeta a tag no `out/index.html` e entra no
      script `build` do `package.json`
- [x] 1.4 `out/index.html` não contém `__next_error__` e tem `<title>`, `og:image` e a canônica

## 2. Robôs e sitemap (D2, D3)

- [x] 2.1 `public/robots.txt`: remover os blocos de `GPTBot`, `ClaudeBot` e `Google-Extended`; manter `Allow: /` e o
      `Sitemap:`
- [x] 2.2 `src/app/sitemap.ts`: `lastModified = new Date()` no build
- [x] 2.3 `npm run build`; conferir `out/robots.txt` e `out/sitemap.xml`

## 3. Publicação e conferência

- [ ] 3.1 Commit e push na `main`; acompanhar o workflow `Deploy to GitHub Pages`
- [ ] 3.2 `curl -s https://rayanneblima.github.io/` mostra título, `og:image`, canônica e `refresh`; abrir no navegador
      chega em `/pt/`
- [ ] 3.3 Colar o link sem caminho no WhatsApp e no LinkedIn (Post Inspector) e conferir título e imagem

## 4. Search Console (D4)

- [ ] 4.1 (Rayanne) Criar a propriedade de prefixo de URL `https://rayanneblima.github.io/` no GSC e copiar o token da
      meta tag
- [ ] 4.2 `src/app/[locale]/layout.tsx` e `src/app/page.tsx`: `metadata.verification.google` com o token; publicar
      (ponto de código pronto: preencher `GOOGLE_SITE_VERIFICATION` em `src/lib/site.ts`; vazio não emite tag)
- [ ] 4.3 (Rayanne) Clicar em "Verificar" no GSC e enviar `https://rayanneblima.github.io/sitemap.xml`
- [ ] 4.4 Pelo MCP do GSC: `list_sites` mostra a propriedade; `inspect_url` de `/pt/` (anotar o estado)

## 5. Fechamento

- [ ] 5.1 Rodar o MakeMeFindable de novo e registrar a segunda leitura em `.claude/docs/seo/makemefindable.md`
- [ ] 5.2 Duas semanas depois: `search_analytics` do GSC (cliques, impressões, consultas) anotado no mesmo arquivo
