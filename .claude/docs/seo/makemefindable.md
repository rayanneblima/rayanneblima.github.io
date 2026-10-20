# MakeMeFindable: leituras de https://rayanneblima.github.io

Change que acompanha: `openspec/changes/fix-root-and-crawlability/`.

## 1ª leitura: 19/10/2026 (antes)

Nota: **78,05%**, com 3 falhas e 6 avisos. A ferramenta renderiza a página com JavaScript, por isso não viu que a
raiz não tem HTML útil para quem não roda JS (ver "Raiz sem JS" abaixo).

| Checagem | MMF | Conferido | Situação |
|---|---|---|---|
| SPF DNS record | falha | `github.io` é domínio do GitHub | fora do nosso alcance |
| Image alt text | falha, 1 | `src/components/ui/splash-screen.tsx:29`, logo da tela de abertura | decorativo, aceito |
| Plaintext email | falha | `rayanne_lima2010@hotmail.com` no JSON-LD, no hero e no rodapé | canal de contato de recrutador, aceito |
| HTML page size | aviso, 200 KB | `/pt/` tem 233 KB por causa do payload do Next (RSC) | aceito |
| Media query, Inline CSS, Modern media, Meta description, Domain Age | aviso | CSS externo; `style` do Framer Motion; imagens já em WebP; WHOIS do `github.io` | falsos positivos ou aceitos |
| JS errors | ok | Chromium real em `/pt/`: nenhum erro | — |
| Meta refresh | ok | a raiz ainda não tinha `refresh` | pode passar a acusar depois do D1 (ver `design.md`) |

### Raiz sem JS (antes)

`curl` em 20/10/2026, com o user-agent do Chrome e com o do Googlebot (respostas idênticas):

```
$ curl -s https://rayanneblima.github.io/ -w "%{http_code} %{size_download}\n" -o raiz.html
200 4485
```

- `<html id="__next_error__">`, sem `<title>`, sem `meta description`, sem `og:*`, sem `canonical`.
- O redirecionamento só existe no payload do Next: `NEXT_REDIRECT;replace;/pt/;307;`.
- HTML completo guardado em `raiz-antes-2026-10-20.html`, nesta pasta.

## 2ª leitura (depois do deploy)

Pendente (tarefa 5.1).

## Search Console

Pendente (tarefas 4.x e 5.2).

## 2ª rodada (20/10/2026): 78,05%

Igual à de 19/10. Detalhe na tarefa 5.1 de `openspec/changes/fix-root-and-crawlability/tasks.md`.
