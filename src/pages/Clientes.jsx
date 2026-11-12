import React, { useEffect, useState } from 'react';
import { asset } from '../lib/assetUrl.js';

/**
 * VITRINE DE CLIENTES — Integrade Consulting
 *
 * Regras aplicadas nesta versão:
 *  1. Fundo branco, tipografia sóbria, sem cartões repetidos.
 *  2. Nenhuma caixa vazia: só é renderizado card quando existe arquivo de logo.
 *  3. Sem provedor externo de logo (Clearbit / Google / DuckDuckGo) — a rede
 *     do ambiente bloqueia recursos externos e o resultado era globo genérico
 *     ou card vazio.
 *  4. Sem inventar logo: como não há NENHUM arquivo de logo de cliente em
 *     `public/images/clientes/`, a apresentação é tipográfica (wordmark), que
 *     é o padrão usado por Stripe/Linear/Vercel em "trusted by".
 *
 * COMO ATIVAR OS LOGOS REAIS:
 *  1. Suba os PNGs para `public/images/clientes/` (fundo transparente, ~400px).
 *  2. Preencha o mapa LOGOS abaixo com a chave = slug do nome.
 *     Ex.: eletrobras: 'images/clientes/eletrobras.png'
 *  3. Pronto: o card passa a exibir a imagem; o nome continua abaixo.
 *
 * Nomes derivados das pastas de clientes informadas pela empresa. Itens que não
 * são clientes foram excluídos (ex.: "Inquerito", "! Antigos", "lista.txt",
 * arquivo .rar, atalho .lnk) e siglas não identificáveis com segurança foram
 * omitidas para não gerar informação incorreta.
 */

const LOGOS = {
  // Exemplos (descomente ao subir os arquivos):
  // eletrobras: 'images/clientes/eletrobras.png',
  // furnas: 'images/clientes/furnas.png',
  // sabesp: 'images/clientes/sabesp.png',
};

const SETORES = [
  {
    nome: 'Energia & Nuclear',
    clientes: [
      'Eletrobras',
      'FURNAS',
      'Eletrosul',
      'CEEE Grupo Equatorial',
      'Amazonas Energia',
      'Eletronuclear',
      'CNEN',
      'IPEN',
      'INB',
      'NUCLEP',
    ],
  },
  {
    nome: 'Portos & Logística',
    clientes: [
      'Porto de Santos',
      'Portos RS',
      'EMAP',
      'Companhia Docas da Paraíba',
      'Porto de Suape',
      'Grupo CCR',
      'Dominalog',
      'Transauto',
    ],
  },
  {
    nome: 'Saneamento & Desenvolvimento',
    clientes: ['SABESP', 'SEMAE Piracicaba', 'Desenvolve SP'],
  },
  {
    nome: 'Setor Público',
    clientes: [
      'Secretaria de Estado da Saúde',
      'Prefeitura de Cajati',
      'Prefeitura de Congonhinhas',
      'Prefeitura de Jarinu',
      'Prefeitura de Mauá da Serra',
      'Prefeitura de Mirante da Serra',
      'Prefeitura de Navegantes',
      'Prefeitura de Pindamonhangaba',
      'Prefeitura de Ribeira do Pombal',
      'Prefeitura de Betânia do Piauí',
      'Prefeitura de Carlinda',
      'Prefeitura de Comodoro',
      'Prefeitura de Encantado',
      'Prefeitura de Ipiranga',
      'Prefeitura de Nova Esperança',
      'Prefeitura de São Gonçalo do Pará',
      'Prefeitura de São João Batista',
      'Prefeitura de Morada Nova',
      'Câmara de Santa Maria',
      'Câmara de Santa Rita do Passa Quatro',
    ],
  },
  {
    nome: 'Conselhos & Entidades',
    clientes: ['CREA-RS', 'CREAGO', 'COREN-SP', 'CNF', 'ABIT', 'IBAT', 'APEX Brasília', 'FIERO-RO', 'SUSEP'],
  },
  {
    nome: 'Saúde',
    clientes: [
      'Hospital Alemão Oswaldo Cruz',
      'GHC — Grupo Hospitalar Conceição',
      'Irmãs Hospitaleiras',
      'H.Olhos',
      'DaVita',
      'Pro-Saúde',
      'Con Oncologia',
      'MP Biomedicals',
      'Bimeda',
    ],
  },
  {
    nome: 'Educação, Ciência & Cultura',
    clientes: [
      'Grupo Unis',
      'SENAI — CETIQT',
      'Colégio São Judas',
      'Fundação ABC',
      'Fundação Cassiano Ricardo',
      'UNIFESP',
      'UNIFEI',
      'IFBA',
      'IFES — Alegre',
      'Unifesspa',
      'FAA',
      'Centro Educacional Infantil Luz e Lápis',
      'Theatro Municipal',
      'Memorial da América Latina',
      'Fundação Cidade das Artes',
      'Associação Museu Afro Brasil',
      'Quinta do Embaixador',
    ],
  },
  {
    nome: 'Indústria & Recursos Naturais',
    clientes: [
      'Alubar',
      'Bauminas',
      'Brasilagro',
      'COCARI',
      'Wickbold',
      'Nova Flex Espumas',
      'Geominas',
      'Kurita',
      'DTA Engenharia',
    ],
  },
  {
    nome: 'Serviços, Tecnologia & Financeiro',
    clientes: [
      'BANRISUL',
      'Trígono Capital',
      'WebHelp',
      'Eduzz',
      'Figwal',
      'GK Condomínios',
      'Hopi Hari',
      'Igreja Presbiteriana Independente do Brasil',
    ],
  },
];

/** Marcas com maior reconhecimento — abrem a página como faixa de credibilidade. */
const DESTAQUES = [
  'Eletrobras',
  'FURNAS',
  'Eletronuclear',
  'CNEN',
  'INB',
  'NUCLEP',
  'SABESP',
  'Porto de Santos',
  'EMAP',
  'Grupo CCR',
  'SENAI — CETIQT',
  'UNIFESP',
  'UNIFEI',
  'Hospital Alemão Oswaldo Cruz',
  'GHC — Grupo Hospitalar Conceição',
  'BANRISUL',
  'SUSEP',
  'Theatro Municipal',
];

const slugify = (valor) =>
  String(valor)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Renderiza a marca. Se houver arquivo de logo mapeado, mostra a imagem;
 * se a imagem falhar, cai para o nome em texto (nunca um card vazio).
 */
function Marca({ nome, destaque = false }) {
  const [falhou, setFalhou] = useState(false);
  const arquivo = LOGOS[slugify(nome)];

  if (arquivo && !falhou) {
    return (
      <img
        src={asset(arquivo)}
        alt={nome}
        title={nome}
        loading="lazy"
        decoding="async"
        onError={() => setFalhou(true)}
        className="mx-auto h-14 w-auto max-w-[180px] object-contain transition duration-300 hover:scale-[1.04] sm:h-16"
      />
    );
  }

  return (
    <span
      title={nome}
      className={
        destaque
          ? 'block text-center text-[13px] font-semibold uppercase leading-tight tracking-[0.08em] text-slate-500 transition-colors hover:text-[#0B4F8F] sm:text-sm'
          : 'text-sm leading-snug text-slate-700'
      }
    >
      {nome}
    </span>
  );
}

export default function Clientes() {
  useEffect(() => {
    document.title = 'Clientes | Integrade Consulting';
  }, []);

  const total = SETORES.reduce((soma, setor) => soma + setor.clientes.length, 0);

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08954]">Clientes</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Organizações que confiaram na Integrade Consulting
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Atuamos em setores com forte exigência técnica e escrutínio: energia e nuclear, portos,
            saneamento, saúde, educação, indústria e setor público. São trabalhos de controle
            patrimonial e avaliações que precisam resistir à auditoria e à contabilidade.
          </p>

          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Organizações</dt>
              <dd className="mt-1 text-3xl font-semibold text-[#0B4F8F]">+{total}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Setores</dt>
              <dd className="mt-1 text-3xl font-semibold text-[#0B4F8F]">{SETORES.length}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Atuação</dt>
              <dd className="mt-1 text-3xl font-semibold text-[#0B4F8F]">Nacional</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* FAIXA DE MARCAS */}
      <section aria-labelledby="destaques" className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <h2 id="destaques" className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Marcas que confiaram na gente
          </h2>

          <ul className="mt-10 grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {DESTAQUES.map((nome) => (
              <li key={nome} className="flex min-h-[3.5rem] items-center justify-center">
                <Marca nome={nome} destaque />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LISTA COMPLETA POR SETOR */}
      <section aria-labelledby="todos" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 id="todos" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Todas as organizações atendidas
            </h2>
            <p className="mt-3 text-slate-600">
              Lista organizada por setor. Inclui autarquias, conselhos, fundações e empresas de
              pequeno e médio porte que fazem parte da nossa carteira.
            </p>
          </div>

          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {SETORES.map((setor) => (
              <div key={setor.nome}>
                <h3 className="border-b border-slate-200 pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900">
                  {setor.nome}
                  <span className="ml-2 font-normal text-slate-400">{setor.clientes.length}</span>
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {setor.clientes.map((nome) => (
                    <li key={nome} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[#B08954]" />
                      <Marca nome={nome} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Quer entender como tratamos o patrimônio da sua organização?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Conte o desafio da sua empresa e conversamos sobre controle patrimonial, avaliações ou
            sobre a plataforma iFlow.
          </p>
          <a
            href="#/contato"
            className="mt-8 inline-flex items-center rounded-md bg-[#0B4F8F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#093f72] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2"
          >
            Fale com um especialista
          </a>
        </div>
      </section>
    </div>
  );
}
