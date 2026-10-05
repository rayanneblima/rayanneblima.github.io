## 1. Capturas

- [x] 1.1 Capturar o pulsatrixapps.com.br em 1440 × 900 (Home, Projetos, Serviços, Método, Blog, Artigo), sem a barra flutuante (D1, D2)
- [x] 1.2 Capturar a home da marciaantoniaimoveis.net.br em 1440 × 900 (D3)
- [x] 1.3 Converter para WebP (`cwebp -q 82`) em `public/images/` e apagar `preview-pulsatrix.png` (D4)

## 2. Carrossel

- [x] 2.1 Slides com `src` e `url` opcional em `selected-work.tsx`; barra de endereço por slide, com corte por reticências
- [x] 2.2 Rótulos `previews.p{n}` pelo número de slides (D5) e textos em pt, en e es
- [x] 2.3 Timer de avanço que recomeça a cada troca

## 3. Conferência

- [x] 3.1 `tsc --noEmit` e `npm run build` sem erro
- [x] 3.2 No `out/` servido localmente, em 1440 × 900 e 390 × 844: os dois carrosséis passam por todos os slides, a barra de endereço acompanha, nenhum slide é pulado depois de clique, o avanço automático continua sem interação, sem erro no console
- [ ] 3.3 Conferir em https://rayanneblima.github.io/ depois do deploy
