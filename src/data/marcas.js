/**
 * Marcas em destaque — usadas na parede de logos da página /clientes e na
 * faixa de logos da Home.
 *
 *  - nome:   nome completo (alt / title)
 *  - rotulo: forma curta usada quando não há logo (wordmark tipográfico)
 *  - area:   legenda discreta sob a marca
 *  - logo:   arquivo em public/images/clientes/ (null = mostra o wordmark)
 *
 * Logos obtidos no Wikimedia Commons ou no site oficial de cada organização
 * (Porto de Santos, Theatro Municipal de São Paulo, EMAP). Grupo CCR (hoje
 * Motiva), SUSEP e Hospital Alemão Oswaldo Cruz ainda sem arquivo — basta
 * salvar o PNG/SVG na pasta e preencher `logo`.
 */
export const DESTAQUES = [
  { nome: 'Eletrobras', area: 'Energia', logo: 'images/clientes/eletrobras.png' },
  { nome: 'FURNAS', area: 'Energia', logo: 'images/clientes/furnas.png' },
  { nome: 'Eletronuclear', area: 'Nuclear', logo: 'images/clientes/eletronuclear.png' },
  { nome: 'CNEN', area: 'Nuclear', logo: 'images/clientes/cnen.svg' },
  { nome: 'INB', area: 'Nuclear', logo: 'images/clientes/inb.png' },
  { nome: 'NUCLEP', area: 'Nuclear', logo: 'images/clientes/nuclep.png' },
  { nome: 'SABESP', area: 'Saneamento', logo: 'images/clientes/sabesp.svg' },
  { nome: 'Porto de Santos', area: 'Portos', logo: 'images/clientes/porto-de-santos.png' },
  { nome: 'EMAP', area: 'Portos', logo: 'images/clientes/emap.svg' },
  { nome: 'Grupo CCR', area: 'Infraestrutura', logo: null },
  { nome: 'BANRISUL', area: 'Financeiro', logo: 'images/clientes/banrisul.svg' },
  { nome: 'SUSEP', area: 'Regulação', logo: null },
  { nome: 'SENAI — CETIQT', rotulo: 'SENAI CETIQT', area: 'Educação', logo: 'images/clientes/senai.png' },
  { nome: 'UNIFESP', area: 'Educação', logo: 'images/clientes/unifesp.png' },
  { nome: 'UNIFEI', area: 'Educação', logo: 'images/clientes/unifei.png' },
  { nome: 'Hospital Alemão Oswaldo Cruz', rotulo: 'Oswaldo Cruz', area: 'Saúde', logo: null },
  { nome: 'GHC — Grupo Hospitalar Conceição', rotulo: 'GHC', area: 'Saúde', logo: 'images/clientes/ghc.png' },
  { nome: 'Theatro Municipal', area: 'Cultura', logo: 'images/clientes/theatro-municipal.png' },
];
