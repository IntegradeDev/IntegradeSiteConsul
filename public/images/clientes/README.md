# Logos de clientes

Arquivos usados na parede de marcas de `/clientes` e na faixa de logos da Home.
A lista de marcas e o arquivo de cada uma ficam em `src/data/marcas.js`.

## Origem dos arquivos

- Wikimedia Commons: eletrobras, furnas, eletronuclear, cnen, inb, nuclep,
  sabesp, banrisul, unifei, unifesp, ghc, senai.
- Site oficial: porto-de-santos (portodesantos.com.br), emap (portodoitaqui.com.br),
  theatro-municipal (theatromunicipal.org.br — Theatro Municipal de São Paulo).

## Adicionar ou trocar um logo

1. Salve o PNG (fundo transparente, ~400–600px de largura) ou SVG nesta pasta,
   com nome curto, sem acento e sem espaço: `susep.png`, `grupo-ccr.png`...
2. Em `src/data/marcas.js`, preencha `logo: 'images/clientes/susep.png'`.

Marca sem arquivo (ou com arquivo que falhe ao carregar) aparece como nome em
texto na página Clientes e é omitida da faixa da Home — nunca como caixa vazia.
