## ADDED Requirements

### Requirement: Capturas atuais da Pulsatrix Apps
O card da Pulsatrix Apps SHALL mostrar capturas do pulsatrixapps.com.br atual, em 1440 × 900, uma
por página ou seção: Home, Projetos, Serviços, Método, Blog e Artigo. As capturas MUST NOT mostrar a
barra flutuante de disponibilidade do site.

#### Scenario: Abrir a seção de trabalhos
- **WHEN** alguém chega ao card da Pulsatrix Apps
- **THEN** o carrossel mostra a home atual e avança pelas seis páginas

### Requirement: Cliente real no useimob
O card do useimob SHALL incluir a home da Márcia Antônia Imóveis (marciaantoniaimoveis.net.br) como
segundo slide, com o rótulo "Cliente real" (en: "Live client").

#### Scenario: Slide do cliente
- **WHEN** o carrossel do useimob chega ao segundo slide
- **THEN** aparece a home da Márcia Antônia e a barra de endereço mostra `marciaantoniaimoveis.net.br`

### Requirement: Barra de endereço por slide
A barra de endereço do navegador falso SHALL mostrar o endereço do slide atual quando ele tiver um, e o
do projeto quando não tiver. Endereço que não cabe MUST ser cortado com reticências, sem quebrar a
barra.

#### Scenario: Slide do blog
- **WHEN** o slide "Blog" da Pulsatrix está na tela
- **THEN** a barra mostra `pulsatrixapps.com.br/blog`

#### Scenario: Endereço longo no celular
- **WHEN** o slide "Artigo" aparece numa tela de 390 px
- **THEN** o endereço termina em reticências e a barra mantém uma linha

### Requirement: Número de slides livre
Cada projeto SHALL poder ter qualquer número de capturas. Os rótulos MUST vir de `previews.p1` até
`previews.p{n}` nos três idiomas.

#### Scenario: Seis capturas
- **WHEN** a Pulsatrix tem seis capturas
- **THEN** o carrossel mostra seis pontos e cada slide tem o próprio rótulo

### Requirement: Avanço automático sem pular slide
O carrossel SHALL avançar sozinho a cada 5 s e MUST recomeçar a contagem a cada troca de slide, seja
manual ou automática.

#### Scenario: Clique perto do fim da contagem
- **WHEN** a pessoa clica em "próximo" 4,5 s depois da última troca
- **THEN** o slide seguinte fica na tela por 5 s antes do próximo avanço
