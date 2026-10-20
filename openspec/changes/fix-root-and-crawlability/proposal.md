## Why

Em 19/10/2026 o MakeMeFindable deu **78,05%** para `https://rayanneblima.github.io`, com 3 falhas e 6 avisos. A
ferramenta renderiza a página com JavaScript e por isso não viu o problema maior. **O HTML da raiz não tem conteúdo
nenhum para quem não roda JS.**

- `curl https://rayanneblima.github.io/` (com o user-agent do Chrome e com o do Googlebot) devolve 4.485 bytes:
  `<html id="__next_error__">`, sem `<title>`, sem `description`, sem `og:*`, sem `canonical`. A raiz é
  `src/app/page.tsx`, que chama `redirect("/pt/")`; no `output: "export"` isso vira uma casca que só redireciona pelo
  JavaScript (`NEXT_REDIRECT;replace;/pt/;307;` no `out/index.html`).
- Consequência prática: o link sem caminho (o que vai no currículo, no LinkedIn e no GitHub) aparece **sem título e sem
  imagem** no WhatsApp, LinkedIn e X, porque esses leitores não executam JS. O Google costuma seguir o redirecionamento
  por JS, mas com atraso e sem garantia.
- O site **não está no Search Console**: a lista de propriedades da conta (19/10/2026) não tem `rayanneblima.github.io`.
  Não há como saber o que está indexado.
- `public/robots.txt` bloqueia `GPTBot`, `ClaudeBot` e `Google-Extended`. Para um portfólio, isso tira a Rayanne das
  respostas do ChatGPT, do Claude e do Gemini. A decisão de 19/10/2026 é **liberar**, na mesma linha da Devanture.
- `src/app/sitemap.ts` fixa `lastModified` em `2026-03-12`, mas o site mudou em outubro (commits de capturas novas).

O que a ferramenta acusou e foi conferido:

| Checagem | MMF | Conferido | Situação |
|---|---|---|---|
| SPF DNS record | falha | `github.io` é domínio do GitHub | fora do nosso alcance |
| Image alt text | falha, 1 | `src/components/ui/splash-screen.tsx:29`, logo da tela de abertura | decorativo, aceito |
| Plaintext email | falha | `rayanne_lima2010@hotmail.com` no JSON-LD, no hero e no rodapé | canal de contato de recrutador, aceito |
| HTML page size | aviso, 200 KB | `/pt/` tem 233 KB por causa do payload do Next (RSC) | aceito |
| Media query, Inline CSS, Modern media, Meta description, Domain Age | aviso | CSS externo; `style` do Framer Motion; imagens já em WebP; WHOIS do `github.io` | falsos positivos ou aceitos |
| JS errors | ok | Chromium real em `/pt/`: nenhum erro | — |

## What Changes

- **Raiz com HTML de verdade**: `/` passa a ser uma página estática com `<title>`, `description`, `og:*`,
  `twitter:*`, `<link rel="canonical" href="https://rayanneblima.github.io/pt/">` e
  `<meta http-equiv="refresh" content="0; url=/pt/">`, além do redirecionamento por JS que já existe. O GitHub Pages
  não faz 301, e o `refresh` com zero segundos é tratado pelo Google como redirecionamento permanente.
- **Robôs de IA liberados** no `public/robots.txt`.
- **Sitemap com data real**: `lastModified` passa a vir da data do build (ou do último commit).
- **Search Console**: propriedade de prefixo de URL `https://rayanneblima.github.io/`, verificada por meta tag, e o
  sitemap enviado.

## Capabilities

### New Capabilities
- `encontrabilidade`: o que a raiz entrega sem JavaScript, o que os robôs podem rastrear, o sitemap e a medição pelo
  Search Console e pelas auditorias externas.

### Modified Capabilities
- Nenhuma (`openspec/specs/` vazio).

## Impact

- `src/app/page.tsx` (ou um script de pós-build que escreve `out/index.html`), `src/app/[locale]/layout.tsx` (meta de
  verificação do Google), `src/app/sitemap.ts`, `public/robots.txt`.
- Deploy pelo workflow `.github/workflows/deploy.yml` de sempre. Sem dependência nova. O GA4 (`G-NZ2LQ173MH`) e o
  Clarity não mudam.
