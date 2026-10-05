## Context

- O componente `ProjectPreview` já era um carrossel (setas, pontos, rótulo, avanço a cada 5 s) e o
  useimob já usava três capturas 1440 × 900. Faltava conteúdo, não componente.
- O carrossel ocupa no máximo 512 px de largura (`max-w-lg`) com `aspect-16/10` e `object-cover
  object-top`. Uma captura de página inteira aparece só como o topo; capturas do tamanho da tela
  mostram cada página como ela é vista.

## Decisions

### D1. Capturas do site no ar, tamanho de tela, 1440 × 900

Mesmo formato das capturas do useimob. Playwright com o Chromium local, 1440 × 900, escala 1. Em
512 px CSS numa tela retina (1024 px de dispositivo), 1440 px ainda sobram.

Antes de capturar, a página é rolada até o fim para disparar as animações de entrada e depois volta
à seção. Na captura ficam escondidas a barra flutuante "Disponível para novos projetos · Poucas vagas
para <mês>" e o desfoque da borda inferior, via estilo injetado só na captura:
- a barra cairia exatamente onde ficam os pontos do carrossel;
- o mês da frase venceria em 30 dias.

### D2. Seis slides na Pulsatrix

| # | Rótulo (pt) | Página | Barra de endereço |
|---|---|---|---|
| 1 | Home | hero | pulsatrixapps.com.br |
| 2 | Projetos | `#projects` | pulsatrixapps.com.br/#projects |
| 3 | Serviços | `#services` | pulsatrixapps.com.br/#services |
| 4 | Método | `#method` | pulsatrixapps.com.br/#method |
| 5 | Blog | `/blog` | pulsatrixapps.com.br/blog |
| 6 | Artigo | `/blog/historia-da-pulsatrix-apps` | pulsatrixapps.com.br/blog/historia-da-pulsatrix-apps |

As páginas de serviço (`content/services/` no pulsatrix-lp) ainda não estão no ar e ficam de fora.

### D3. Márcia Antônia como segundo slide do useimob

É a prova de que o produto roda num cliente real, no domínio do cliente. Por isso vem logo depois da
plataforma, antes da vitrine de demonstração (Horizonte Imóveis). O rótulo é "Cliente real" /
"Live client" e a barra mostra o domínio dela.

### D4. WebP nas imagens novas

`cwebp -q 82`: as seis capturas da Pulsatrix somam cerca de 300 KB, contra 2 MB da captura antiga.
As PNG já existentes (deskbee, sosuba, tray, useimob) não foram mexidas nesta change.

### D5. Rótulos pelo número de slides

`previews.p{n}` com n de 1 ao total de imagens do projeto. Os projetos com uma imagem só continuam
com `p2`/`p3` no JSON, sem uso. Ficam lá para quando ganharem mais capturas.

## Risks / Trade-offs

- **Capturas envelhecem de novo.** O site muda e o portfólio não acompanha sozinho. Para refazer:
  repetir a captura com os mesmos enquadramentos (tabela D2) e substituir os arquivos com o mesmo nome.
- **Cliente real no portfólio.** A home da Márcia Antônia é pública. Se a cliente sair do useimob, o
  slide sai junto.
