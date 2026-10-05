## Why

Na seção de trabalhos do portfólio, o card da Pulsatrix Apps mostrava uma única captura de página
inteira (1280 × 7168 px, 2 MB) do site antigo, de março de 2026. O pulsatrixapps.com.br foi refeito
(v3): hero escuro, projetos, serviços, método e blog. Quem abre o portfólio vê uma empresa que não existe
mais. O card do useimob mostrava só a vitrine de demonstração, sem nenhum cliente real no ar.

## What Changes

- **Pulsatrix Apps:** a captura antiga sai e entram seis capturas do site atual, em 1440 × 900:
  Home, Projetos, Serviços, Método, Blog e Artigo (`/blog/historia-da-pulsatrix-apps`).
- **useimob:** entra a home da Márcia Antônia Imóveis (marciaantoniaimoveis.net.br), cliente real,
  como segundo slide ("Cliente real"), entre a plataforma e a vitrine de demonstração.
- **Barra de endereço por slide:** o slide pode ter o próprio endereço, e a barra do navegador
  falso mostra a página que está na tela (`pulsatrixapps.com.br/blog`, `marciaantoniaimoveis.net.br`).
  Endereço longo é cortado com reticências.
- **Quantidade de slides livre:** os rótulos (`previews.p1`, `p2`, ...) acompanham o número de
  imagens. Antes o código lia sempre `p1` a `p3`.
- **Avanço automático:** o timer de 5 s recomeça a cada troca de slide. Antes um clique manual podia
  ser seguido de outro avanço logo em seguida, e a pessoa pulava um slide.

## Capabilities

### New Capabilities

- `work-previews`: o carrossel de capturas de cada projeto na seção de trabalhos.

### Modified Capabilities

Nenhuma (primeira spec do repositório).

## Impact

- `src/components/sections/selected-work.tsx`: lista de slides com `src` e `url` opcional, rótulos
  dinâmicos, barra de endereço por slide, timer que recomeça.
- `src/i18n/messages/{pt,en,es}.json`: rótulos `previews` da Pulsatrix (6) e do useimob (4).
- `public/images/`: sai `preview-pulsatrix.png` (2 MB); entram `preview-pulsatrix-*.webp` (6 arquivos,
  cerca de 300 KB no total) e `preview-useimob-marcia-antonia.webp` (120 KB).
