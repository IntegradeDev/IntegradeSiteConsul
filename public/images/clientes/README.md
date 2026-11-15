# Logos de clientes

Arquivos usados na parede de marcas de `/clientes` e na faixa de logos da Home.
A lista de marcas e o arquivo de cada uma ficam em `src/data/marcas.js`.

## Origem dos arquivos

- Wikimedia Commons: eletrobras, furnas, eletronuclear, cnen, inb, nuclep,
  sabesp, banrisul, unifei, unifesp, ghc, senai, grupo-ccr.
- Site oficial: porto-de-santos (portodesantos.com.br), emap (portodoitaqui.com.br),
  theatro-municipal (theatromunicipal.org.br — Theatro Municipal de São Paulo).

`sabesp.svg` teve o `viewBox` recortado (o arquivo original do Wikimedia
exportava a página A4 inteira, com a marca ocupando só uma fatia — por isso
aparecia pequena/apagada ao lado dos demais logos). SUSEP e Hospital Alemão
Oswaldo Cruz seguem sem arquivo: não há logo isolado de uso livre encontrado
(SUSEP hoje usa só a identidade padrão gov.br, sem marca própria).

## Adicionar ou trocar um logo

1. Salve o PNG (fundo transparente, ~400–600px de largura) ou SVG nesta pasta,
   com nome curto, sem acento e sem espaço: `susep.png`, `grupo-ccr.png`...
2. Em `src/data/marcas.js`, preencha `logo: 'images/clientes/susep.png'`.

Marca sem arquivo (ou com arquivo que falhe ao carregar) aparece como nome em
texto na página Clientes e é omitida da faixa da Home — nunca como caixa vazia.
