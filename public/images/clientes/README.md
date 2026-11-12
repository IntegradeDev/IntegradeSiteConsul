# Logos de clientes

Esta pasta ainda não contém nenhum arquivo de logo. Por isso a página
`/clientes` apresenta as marcas de forma **tipográfica** (nome em wordmark),
sem provedor externo e sem card vazio.

## Como ativar os logos oficiais

1. Suba os PNGs aqui, com fundo transparente, ~400px de largura.
   Use nomes curtos, sem acento e sem espaço:
   `eletrobras.png`, `furnas.png`, `sabesp.png`, `porto-de-santos.png` ...
2. Abra `src/pages/Clientes.jsx` e preencha o mapa `LOGOS`, usando o slug do
   nome como chave:

```js
const LOGOS = {
  eletrobras: 'images/clientes/eletrobras.png',
  furnas: 'images/clientes/furnas.png',
  sabesp: 'images/clientes/sabesp.png',
};
```

3. Nada mais precisa ser alterado. Cada marca com arquivo mapeado passa a
   exibir a imagem; se o arquivo falhar, volta para o nome — nunca aparece
   card vazio.

O slug é gerado assim: minúsculas, sem acentos, espaços e pontuação viram `-`.
`GHC — Grupo Hospitalar Conceição` → `ghc-grupo-hospitalar-conceicao`.
