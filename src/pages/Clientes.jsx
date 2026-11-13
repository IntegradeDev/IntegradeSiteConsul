import React, { useEffect, useState } from 'react';
import { asset } from '../lib/assetUrl.js';
import MapaAtuacao from '../components/clientes/MapaAtuacao.jsx';
import { LOCALIDADES } from '../data/atuacao.js';
import { DESTAQUES } from '../data/marcas.js';

/**
 * VITRINE DE CLIENTES — Integrade Consulting
 *
 * Regras aplicadas nesta versão:
 *  1. Fundo branco, tipografia sóbria, sem cartões repetidos.
 *  2. Nenhuma caixa vazia: marca sem logo aparece como wordmark tipográfico.
 *  3. Sem provedor externo de logo (Clearbit / Google / DuckDuckGo) — a rede
 *     do ambiente bloqueia recursos externos e o resultado era globo genérico
 *     ou card vazio. Os logos são arquivos locais em `public/images/clientes/`.
 *
 * Logos e marcas em destaque: `src/data/marcas.js`.
 * Mapa de atuação: `src/data/atuacao.js`.
 *
 * Nomes derivados das pastas de clientes informadas pela empresa. Itens que não
 * são clientes foram excluídos (ex.: "Inquerito", "! Antigos", "lista.txt",
 * arquivo .rar, atalho .lnk) e siglas não identificáveis com segurança foram
 * omitidas para não gerar informação incorreta.
 */

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

/**
 * Célula da parede de marcas. Com logo: imagem em tons de cinza que ganha
 * cor no hover. Sem logo (ou se o arquivo falhar): wordmark tipográfico —
 * nunca uma caixa vazia.
 */
function CelulaMarca({ nome, rotulo, area, logo }) {
  const [falhou, setFalhou] = useState(false);
  const temLogo = logo && !falhou;

  return (
    <li
      title={nome}
      className="group relative flex min-h-[6.5rem] flex-col items-center justify-center gap-3 bg-white px-5 py-6 text-center transition-colors duration-300 hover:bg-slate-50 sm:min-h-[8.5rem]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-[2px] origin-left scale-x-0 bg-[#B08954] transition-transform duration-300 group-hover:scale-x-100"
      />
      {temLogo ? (
        <span className="flex h-12 w-full items-center justify-center sm:h-14">
          <img
            src={asset(logo)}
            alt={nome}
            loading="lazy"
            decoding="async"
            onError={() => setFalhou(true)}
            className="max-h-full w-auto max-w-[150px] object-contain opacity-75 mix-blend-multiply grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </span>
      ) : (
        <span className="flex h-12 items-center text-lg font-semibold leading-tight tracking-tight text-slate-600 transition-colors duration-300 group-hover:text-[#0B4F8F] sm:h-14 sm:text-xl">
          {rotulo || nome}
        </span>
      )}
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{area}</span>
    </li>
  );
}

export default function Clientes() {
  useEffect(() => {
    document.title = 'Clientes | Integrade Consulting';
  }, []);

  const total = SETORES.reduce((soma, setor) => soma + setor.clientes.length, 0);
  const ufsAtendidas = new Set(LOCALIDADES.map((l) => l.uf)).size;

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

          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ['Organizações', `+${total}`],
              ['Setores', SETORES.length],
              ['Estados + DF', ufsAtendidas],
              ['Regiões do país', '5 de 5'],
            ].map(([rotulo, valor]) => (
              <div key={rotulo} className="border-l-2 border-[#B08954] pl-4">
                <dd className="text-3xl font-semibold text-[#0B4F8F]">{valor}</dd>
                <dt className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{rotulo}</dt>
              </div>
            ))}
          </dl>

          <a
            href="#mapa-atuacao"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('mapa-atuacao')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#0B4F8F] hover:text-[#093f72]"
          >
            Ver onde já atuamos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      {/* PAREDE DE MARCAS */}
      <section aria-labelledby="destaques" className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="destaques" className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08954]">
              Marcas que confiaram na gente
            </h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Estatais, reguladores e grandes operadores de infraestrutura
            </p>
            <p className="mt-3 text-slate-600">
              Organizações sujeitas a TCU, CGU, auditoria independente e normas contábeis — onde o
              inventário e a avaliação precisam estar corretos na primeira vez.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
            {DESTAQUES.map((marca) => (
              <CelulaMarca key={marca.nome} {...marca} />
            ))}
          </ul>
        </div>
      </section>

      {/* MAPA DE ATUAÇÃO */}
      <section
        id="mapa-atuacao"
        aria-labelledby="mapa"
        className="scroll-mt-24 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <MapaAtuacao />
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
                      <span className="text-sm leading-snug text-slate-700">{nome}</span>
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
