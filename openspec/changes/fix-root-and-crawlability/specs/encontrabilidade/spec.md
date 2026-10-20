## ADDED Requirements

### Requirement: A raiz entrega metadados sem JavaScript
O `index.html` da raiz publicado MUST conter, sem depender de JavaScript, `<title>`, `meta description`, `og:title`,
`og:description`, `og:image`, `twitter:card`, `<link rel="canonical">` apontando para
`https://rayanneblima.github.io/pt/` e `<meta http-equiv="refresh" content="0; url=/pt/">`. A página MUST NOT ser a
casca de erro do Next (`id="__next_error__"`).

#### Scenario: Robô que não executa JavaScript
- **WHEN** alguém faz `curl https://rayanneblima.github.io/`
- **THEN** o HTML tem `<title>` não vazio, `og:image`, a canônica para `/pt/` e o `refresh` para `/pt/`, e não contém
  `__next_error__`

#### Scenario: Visitante no navegador
- **WHEN** alguém abre `https://rayanneblima.github.io/`
- **THEN** o navegador chega em `/pt/` sem passo intermediário visível

#### Scenario: Prévia do link
- **WHEN** o link sem caminho é colado no WhatsApp ou no LinkedIn
- **THEN** a prévia mostra título e imagem

### Requirement: Robôs de busca e de IA podem rastrear
O `robots.txt` MUST permitir o rastreio de todo o site para qualquer user-agent, incluindo `GPTBot`, `ClaudeBot`,
`Google-Extended` e `PerplexityBot`, e MUST declarar o `Sitemap:` absoluto.

#### Scenario: Robô de IA
- **WHEN** o `GPTBot` lê `https://rayanneblima.github.io/robots.txt`
- **THEN** nenhuma regra desautoriza `/`

### Requirement: Sitemap com data da última publicação
O `sitemap.xml` MUST listar `/pt/`, `/en/` e `/es/` com `hreflang` e `x-default`, e o `lastmod` de cada URL MUST ser a
data do build que gerou a publicação.

#### Scenario: Publicação nova
- **WHEN** um push na `main` publica o site
- **THEN** o `lastmod` do sitemap é a data desse build

### Requirement: Site medido no Search Console
O site MUST estar verificado no Google Search Console como propriedade de prefixo de URL, com o sitemap enviado.

#### Scenario: Propriedade listada
- **WHEN** se listam as propriedades da conta no GSC
- **THEN** `https://rayanneblima.github.io/` aparece como proprietária e o sitemap está com status de sucesso
