/**
 * Lista unica de clientes.
 *
 * Regra de ouro: NAO existem duas listas mantidas a mao (era isso que fazia
 * um cliente aparecer nos dois grupos). Os grupos "com logo" e "sem logo"
 * sao DERIVADOS desta lista em tempo de execucao.
 *
 * Campos:
 *  - nome:    como aparece na tela
 *  - setor:   usado no filtro e no agrupamento da lista
 *  - dominio: dominio oficial, usado para buscar o logotipo
 *             null = sem dominio confirmado -> vai direto para a lista de nomes
 *  - logo:    caminho LOCAL de um arquivo de logo (ex.: '/images/clientes/banrisul.png').
 *             Tem prioridade absoluta sobre o provedor externo.
 *             Hoje e' null em todos porque a pasta public/images/clientes/
 *             contem apenas o README.md — nada de apontar para arquivo inexistente.
 */
export const CLIENTES = [
  // ── Energia & Nuclear ────────────────────────────────────────────────
  { nome: 'Eletronuclear', setor: 'Energia & Nuclear', dominio: 'eletronuclear.gov.br', logo: null },
  { nome: 'CNEN', setor: 'Energia & Nuclear', dominio: 'cnen.gov.br', logo: null },
  { nome: 'IPEN', setor: 'Energia & Nuclear', dominio: 'ipen.br', logo: null },
  { nome: 'INB', setor: 'Energia & Nuclear', dominio: 'inb.gov.br', logo: null },
  { nome: 'NUCLEP', setor: 'Energia & Nuclear', dominio: 'nuclep.gov.br', logo: null },
  { nome: 'Eletrobras', setor: 'Energia & Nuclear', dominio: 'eletrobras.com', logo: null },
  { nome: 'FURNAS', setor: 'Energia & Nuclear', dominio: 'furnas.com.br', logo: null },
  { nome: 'Eletrosul', setor: 'Energia & Nuclear', dominio: 'eletrosul.com.br', logo: null },
  { nome: 'CEEE Grupo Equatorial', setor: 'Energia & Nuclear', dominio: 'ceee.com.br', logo: null },
  { nome: 'Amazonas Energia', setor: 'Energia & Nuclear', dominio: 'amazonasenergia.com', logo: null },

  // ── Portos & Logística ───────────────────────────────────────────────
  { nome: 'Porto de Santos', setor: 'Portos & Logística', dominio: 'portodesantos.com.br', logo: null },
  { nome: 'Portos RS', setor: 'Portos & Logística', dominio: 'portosrs.com.br', logo: null },
  { nome: 'Porto de Suape', setor: 'Portos & Logística', dominio: 'suape.pe.gov.br', logo: null },
  { nome: 'EMAP', setor: 'Portos & Logística', dominio: 'emap.ma.gov.br', logo: null },
  { nome: 'Companhia Docas da Paraíba', setor: 'Portos & Logística', dominio: 'docasdaparaiba.com.br', logo: null },
  { nome: 'Grupo CCR', setor: 'Portos & Logística', dominio: 'grupoccr.com.br', logo: null },
  { nome: 'Dominalog', setor: 'Portos & Logística', dominio: 'dominalog.com.br', logo: null },
  { nome: 'TRANSAUTO', setor: 'Portos & Logística', dominio: 'transauto.com.br', logo: null },
  { nome: 'CPL', setor: 'Portos & Logística', dominio: null, logo: null },
  { nome: 'Beira Mar', setor: 'Portos & Logística', dominio: null, logo: null },

  // ── Governo & Municípios ─────────────────────────────────────────────
  { nome: 'SABESP', setor: 'Governo & Municípios', dominio: 'sabesp.com.br', logo: null },
  { nome: 'SEMAE Piracicaba', setor: 'Governo & Municípios', dominio: 'semae.piracicaba.sp.gov.br', logo: null },
  { nome: 'Desenvolve SP', setor: 'Governo & Municípios', dominio: 'desenvolvesp.com.br', logo: null },
  { nome: 'BANRISUL', setor: 'Governo & Municípios', dominio: 'banrisul.com.br', logo: null },
  { nome: 'SUSEP', setor: 'Governo & Municípios', dominio: 'susep.gov.br', logo: null },
  { nome: 'Prefeitura de Pindamonhangaba', setor: 'Governo & Municípios', dominio: 'pindamonhangaba.sp.gov.br', logo: null },
  { nome: 'Prefeitura de Jarinu', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura de Cajati', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura de Congonhinhas', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura de Mauá da Serra', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura de Navegantes - SC', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura de Ribeira do Pombal - BA', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de Betânia do Piauí', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de Carlinda - MT', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de Comodoro - MT', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de Encantado - RS', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de Ipiranga - PR', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de Nova Esperança - PR', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de São Gonçalo do Pará', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de São João Batista', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura Municipal de Morada Nova', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Prefeitura de Mirante da Serra', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Câmara de Santa Maria', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Câmara de Santa Rita do Passa Quatro', setor: 'Governo & Municípios', dominio: null, logo: null },
  { nome: 'Secretaria de Estado da Saúde', setor: 'Governo & Municípios', dominio: null, logo: null },

  // ── Conselhos & Entidades ────────────────────────────────────────────
  { nome: 'CREA-RS', setor: 'Conselhos & Entidades', dominio: 'crea-rs.org.br', logo: null },
  { nome: 'CREAGO', setor: 'Conselhos & Entidades', dominio: 'creago.org.br', logo: null },
  { nome: 'COREN-SP', setor: 'Conselhos & Entidades', dominio: 'coren-sp.gov.br', logo: null },
  { nome: 'ABIT', setor: 'Conselhos & Entidades', dominio: 'abit.org.br', logo: null },
  { nome: 'IBAT', setor: 'Conselhos & Entidades', dominio: null, logo: null },
  { nome: 'CNF', setor: 'Conselhos & Entidades', dominio: null, logo: null },
  { nome: 'APEX - DF', setor: 'Conselhos & Entidades', dominio: null, logo: null },
  { nome: 'FIERO-RO', setor: 'Conselhos & Entidades', dominio: null, logo: null },
  { nome: 'Fundação ABC', setor: 'Conselhos & Entidades', dominio: 'fundacaoabc.org.br', logo: null },
  { nome: 'Fundação Cassiano Ricardo', setor: 'Conselhos & Entidades', dominio: null, logo: null },
  { nome: 'Fundação Cidade das Artes', setor: 'Conselhos & Entidades', dominio: null, logo: null },
  { nome: 'Associação Museu Afro Brasil', setor: 'Conselhos & Entidades', dominio: null, logo: null },

  // ── Saúde ────────────────────────────────────────────────────────────
  { nome: 'Hospital Alemão Oswaldo Cruz', setor: 'Saúde', dominio: 'hoswaldocruz.com.br', logo: null },
  { nome: 'GHC - Grupo Hospitalar Conceição', setor: 'Saúde', dominio: 'ghc.com.br', logo: null },
  { nome: 'H.Olhos', setor: 'Saúde', dominio: 'holhos.com.br', logo: null },
  { nome: 'Davita', setor: 'Saúde', dominio: 'davita.com.br', logo: null },
  { nome: 'MP Biomedicals', setor: 'Saúde', dominio: 'mpbio.com', logo: null },
  { nome: 'Bimeda', setor: 'Saúde', dominio: 'bimeda.com.br', logo: null },
  { nome: 'Irmãs Hospitaleiras', setor: 'Saúde', dominio: null, logo: null },
  { nome: 'Pro-Saúde', setor: 'Saúde', dominio: null, logo: null },
  { nome: 'Con Oncologia', setor: 'Saúde', dominio: null, logo: null },
  { nome: 'Bioquímico', setor: 'Saúde', dominio: null, logo: null },

  // ── Educação ─────────────────────────────────────────────────────────
  { nome: 'Grupo Unis', setor: 'Educação', dominio: 'unis.edu.br', logo: null },
  { nome: 'SENAI - CETIQT', setor: 'Educação', dominio: 'cetiqt.senai.br', logo: null },
  { nome: 'UNIFESP', setor: 'Educação', dominio: 'unifesp.br', logo: null },
  { nome: 'UNIFEI', setor: 'Educação', dominio: 'unifei.edu.br', logo: null },
  { nome: 'IFBA', setor: 'Educação', dominio: 'ifba.edu.br', logo: null },
  { nome: 'IFES - Alegre', setor: 'Educação', dominio: 'alegre.ifes.edu.br', logo: null },
  { nome: 'Unifesspa', setor: 'Educação', dominio: 'unifesspa.edu.br', logo: null },
  { nome: 'Colégio São Judas', setor: 'Educação', dominio: null, logo: null },
  { nome: 'Centro Educacional Infantil Luz e Lápis', setor: 'Educação', dominio: null, logo: null },
  { nome: 'FAA', setor: 'Educação', dominio: null, logo: null },

  // ── Indústria ────────────────────────────────────────────────────────
  { nome: 'Alubar', setor: 'Indústria', dominio: 'alubar.com.br', logo: null },
  { nome: 'Bauminas', setor: 'Indústria', dominio: 'bauminas.com.br', logo: null },
  { nome: 'Brasilagro', setor: 'Indústria', dominio: 'brasilagro.com.br', logo: null },
  { nome: 'COCARI', setor: 'Indústria', dominio: 'cocari.com.br', logo: null },
  { nome: 'Wickbold', setor: 'Indústria', dominio: 'wickbold.com.br', logo: null },
  { nome: 'Nova Flex Espumas', setor: 'Indústria', dominio: 'novaflex.com.br', logo: null },
  { nome: 'Kurita', setor: 'Indústria', dominio: 'kurita.com.br', logo: null },
  { nome: 'Geominas', setor: 'Indústria', dominio: null, logo: null },
  { nome: 'DTA Engenharia', setor: 'Indústria', dominio: null, logo: null },
  { nome: 'PCN Suzano', setor: 'Indústria', dominio: null, logo: null },
  { nome: 'Etiquetas', setor: 'Indústria', dominio: null, logo: null },
  { nome: 'CATENO', setor: 'Indústria', dominio: null, logo: null },
  { nome: 'CET', setor: 'Indústria', dominio: null, logo: null },

  // ── Serviços & Cultura ───────────────────────────────────────────────
  { nome: 'Theatro Municipal', setor: 'Serviços & Cultura', dominio: 'theatromunicipal.org.br', logo: null },
  { nome: 'Memorial da América Latina', setor: 'Serviços & Cultura', dominio: 'memorial.org.br', logo: null },
  { nome: 'Hopi Hari', setor: 'Serviços & Cultura', dominio: 'hopihari.com.br', logo: null },
  { nome: 'WebHelp', setor: 'Serviços & Cultura', dominio: 'webhelp.com', logo: null },
  { nome: 'Eduzz', setor: 'Serviços & Cultura', dominio: 'eduzz.com', logo: null },
  { nome: 'Trígono Capital', setor: 'Serviços & Cultura', dominio: 'trigonocapital.com.br', logo: null },
  { nome: 'Quinta do Embaixador', setor: 'Serviços & Cultura', dominio: null, logo: null },
  { nome: 'Figwal - Aval de Imóveis', setor: 'Serviços & Cultura', dominio: null, logo: null },
  { nome: 'GK Condomínios', setor: 'Serviços & Cultura', dominio: null, logo: null },
  { nome: 'Igreja IPIB', setor: 'Serviços & Cultura', dominio: null, logo: null },
  { nome: 'Clube dos Caiçaras', setor: 'Serviços & Cultura', dominio: null, logo: null },
]

export const SETORES = [...new Set(CLIENTES.map((c) => c.setor))]

/**
 * Fontes de logotipo, em ordem de prioridade.
 * Devolve [] quando nao ha nenhuma fonte confiavel -> o cliente nunca
 * entra na grade (evita card vazio).
 *
 * Cuidado deliberado: o favicon do Google NAO entra na cadeia. Para dominio
 * sem icone ele devolve um globo generico em 128px, que passa em qualquer
 * teste de tamanho e aparece como "logo" falso. Foi exatamente o que gerou
 * os cards vazios reclamados.
 */
export function fontesDoLogo(cliente) {
  if (cliente.logo) return [cliente.logo]

  if (!cliente.dominio) return []

  return [
    `https://logo.clearbit.com/${cliente.dominio}?size=256`,
    `https://icons.duckduckgo.com/ip3/${cliente.dominio}.ico`,
  ]
}
