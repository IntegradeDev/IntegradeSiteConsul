/**
 * Onde a Integrade já realizou trabalhos — base do mapa da página /clientes.
 *
 * Cada item é uma LOCALIDADE (cidade) com as organizações atendidas ali.
 * Coordenadas são aproximadas (centro do município), suficientes para o mapa.
 *
 * ATENÇÃO: a localização foi inferida pelo nome / sede conhecida de cada
 * cliente. Clientes cuja cidade é ambígua (ex.: "Prefeitura de São João
 * Batista", que existe em SC e MA; "Theatro Municipal", SP ou RJ) ficaram
 * de fora. Para incluir ou corrigir, basta editar esta lista — os totais
 * de estados e regiões da página são calculados a partir dela.
 */
export const LOCALIDADES = [
  // ── Sudeste ────────────────────────────────────────────────────────────
  {
    cidade: 'São Paulo',
    uf: 'SP',
    coord: [-46.63, -23.55],
    clientes: [
      'SABESP',
      'Desenvolve SP',
      'Grupo CCR',
      'IPEN',
      'COREN-SP',
      'ABIT',
      'Hospital Alemão Oswaldo Cruz',
      'H.Olhos',
      'UNIFESP',
      'Memorial da América Latina',
      'Associação Museu Afro Brasil',
      'Wickbold',
      'Brasilagro',
      'Trígono Capital',
    ],
  },
  { cidade: 'Santos', uf: 'SP', coord: [-46.33, -23.96], clientes: ['Porto de Santos'] },
  { cidade: 'Piracicaba', uf: 'SP', coord: [-47.65, -22.73], clientes: ['SEMAE Piracicaba'] },
  { cidade: 'Pindamonhangaba', uf: 'SP', coord: [-45.46, -22.92], clientes: ['Prefeitura de Pindamonhangaba'] },
  { cidade: 'São José dos Campos', uf: 'SP', coord: [-45.89, -23.18], clientes: ['Fundação Cassiano Ricardo'] },
  { cidade: 'Jarinu', uf: 'SP', coord: [-46.73, -23.1], clientes: ['Prefeitura de Jarinu'] },
  { cidade: 'Itupeva', uf: 'SP', coord: [-47.06, -23.15], clientes: ['Hopi Hari'] },
  { cidade: 'Cajati', uf: 'SP', coord: [-48.12, -24.73], clientes: ['Prefeitura de Cajati'] },
  {
    cidade: 'Santa Rita do Passa Quatro',
    uf: 'SP',
    coord: [-47.48, -21.71],
    clientes: ['Câmara de Santa Rita do Passa Quatro'],
  },
  {
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    coord: [-43.2, -22.91],
    clientes: ['Eletrobras', 'FURNAS', 'CNEN', 'INB', 'SUSEP', 'SENAI — CETIQT', 'Fundação Cidade das Artes'],
  },
  { cidade: 'Angra dos Reis', uf: 'RJ', coord: [-44.32, -23.0], clientes: ['Eletronuclear'] },
  { cidade: 'Itaguaí', uf: 'RJ', coord: [-43.77, -22.85], clientes: ['NUCLEP'] },
  { cidade: 'Itajubá', uf: 'MG', coord: [-45.45, -22.42], clientes: ['UNIFEI'] },
  { cidade: 'Varginha', uf: 'MG', coord: [-45.43, -21.55], clientes: ['Grupo Unis'] },
  { cidade: 'São Gonçalo do Pará', uf: 'MG', coord: [-44.86, -19.98], clientes: ['Prefeitura de São Gonçalo do Pará'] },
  { cidade: 'Alegre', uf: 'ES', coord: [-41.53, -20.76], clientes: ['IFES — Alegre'] },

  // ── Sul ────────────────────────────────────────────────────────────────
  {
    cidade: 'Porto Alegre',
    uf: 'RS',
    coord: [-51.23, -30.03],
    clientes: ['CEEE Grupo Equatorial', 'BANRISUL', 'GHC — Grupo Hospitalar Conceição', 'CREA-RS', 'Portos RS'],
  },
  { cidade: 'Santa Maria', uf: 'RS', coord: [-53.81, -29.68], clientes: ['Câmara de Santa Maria'] },
  { cidade: 'Encantado', uf: 'RS', coord: [-51.87, -29.24], clientes: ['Prefeitura de Encantado'] },
  { cidade: 'Florianópolis', uf: 'SC', coord: [-48.55, -27.59], clientes: ['Eletrosul'] },
  { cidade: 'Navegantes', uf: 'SC', coord: [-48.65, -26.9], clientes: ['Prefeitura de Navegantes'] },
  { cidade: 'Castro', uf: 'PR', coord: [-50.01, -24.79], clientes: ['Fundação ABC'] },
  { cidade: 'Mandaguari', uf: 'PR', coord: [-51.67, -23.55], clientes: ['COCARI'] },
  { cidade: 'Congonhinhas', uf: 'PR', coord: [-50.55, -23.55], clientes: ['Prefeitura de Congonhinhas'] },
  { cidade: 'Mauá da Serra', uf: 'PR', coord: [-51.23, -23.9], clientes: ['Prefeitura de Mauá da Serra'] },
  { cidade: 'Ipiranga', uf: 'PR', coord: [-50.58, -25.02], clientes: ['Prefeitura de Ipiranga'] },
  { cidade: 'Nova Esperança', uf: 'PR', coord: [-52.2, -23.18], clientes: ['Prefeitura de Nova Esperança'] },

  // ── Centro-Oeste ───────────────────────────────────────────────────────
  { cidade: 'Brasília', uf: 'DF', coord: [-47.88, -15.79], clientes: ['APEX Brasília', 'CNF'] },
  { cidade: 'Goiânia', uf: 'GO', coord: [-49.25, -16.68], clientes: ['CREAGO'] },
  { cidade: 'Carlinda', uf: 'MT', coord: [-55.83, -9.97], clientes: ['Prefeitura de Carlinda'] },
  { cidade: 'Comodoro', uf: 'MT', coord: [-59.79, -13.66], clientes: ['Prefeitura de Comodoro'] },

  // ── Nordeste ───────────────────────────────────────────────────────────
  { cidade: 'Salvador', uf: 'BA', coord: [-38.5, -12.97], clientes: ['IFBA'] },
  { cidade: 'Ribeira do Pombal', uf: 'BA', coord: [-38.54, -10.83], clientes: ['Prefeitura de Ribeira do Pombal'] },
  { cidade: 'Ipojuca', uf: 'PE', coord: [-35.06, -8.4], clientes: ['Porto de Suape'] },
  { cidade: 'Cabedelo', uf: 'PB', coord: [-34.83, -6.97], clientes: ['Companhia Docas da Paraíba'] },
  { cidade: 'Morada Nova', uf: 'CE', coord: [-38.37, -5.11], clientes: ['Prefeitura de Morada Nova'] },
  { cidade: 'Betânia do Piauí', uf: 'PI', coord: [-40.79, -8.14], clientes: ['Prefeitura de Betânia do Piauí'] },
  { cidade: 'São Luís', uf: 'MA', coord: [-44.3, -2.53], clientes: ['EMAP'] },

  // ── Norte ──────────────────────────────────────────────────────────────
  { cidade: 'Manaus', uf: 'AM', coord: [-60.02, -3.12], clientes: ['Amazonas Energia'] },
  { cidade: 'Marabá', uf: 'PA', coord: [-49.12, -5.37], clientes: ['Unifesspa'] },
  { cidade: 'Barcarena', uf: 'PA', coord: [-48.62, -1.51], clientes: ['Alubar'] },
  { cidade: 'Porto Velho', uf: 'RO', coord: [-63.9, -8.76], clientes: ['FIERO-RO'] },
  { cidade: 'Mirante da Serra', uf: 'RO', coord: [-62.67, -11.03], clientes: ['Prefeitura de Mirante da Serra'] },
];

export const REGIOES = {
  Norte: ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'],
  Nordeste: ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'],
  'Centro-Oeste': ['DF', 'GO', 'MT', 'MS'],
  Sudeste: ['ES', 'MG', 'RJ', 'SP'],
  Sul: ['PR', 'RS', 'SC'],
};

export const regiaoDe = (uf) => Object.keys(REGIOES).find((r) => REGIOES[r].includes(uf));
