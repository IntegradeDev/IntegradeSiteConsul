import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EMPRESA, mailtoComercial } from '../data/empresa.js'
import FaixaLogos from '../components/clientes/FaixaLogos.jsx'

/* ────────────────────────────────────────────────────────────────────────────
   Soluções — Integrade: fornecedor único de controle patrimonial.
   Estratégia da página (referências de mercado: fornecedores "ponta a ponta"
   que vendem pacotes de etiqueta + coletor + software e inventário recorrente
   terceirizado; SaaS patrimonial vendido como despesa operacional, sem licença):
     1. Herói com dupla CTA (especialista / iFlow)
     2. "Qual é o seu desafio?" — seletor por dor, cada uma com CTA própria
     3. Catálogo dos 6 pilares, cada um com CTA de orçamento direcionada
     4. Faixa-gatilho do iFlow (o inventário acabou — e agora?)
     5. Pacotes que combinam produto + serviço + SaaS
     6. Conformidade normativa (gatilho de urgência legal/contábil)
     7. Como funciona + CTA final com contatos diretos
   Nada de números, depoimentos ou métricas inventadas.
   ──────────────────────────────────────────────────────────────────────────── */

const AZUL = '#0B3B66'
const AZUL_CLARO = '#12507F'
const BRONZE = '#B08968'

/* ── Ícones (SVG local, preenchido, viewBox 24) ─────────────────────────── */
const ICONS = {
  tag: (
    <>
      <path d="M3 3h8.2l9.8 9.8-8.2 8.2L3 11.2Z" opacity=".35" />
      <circle cx="7.6" cy="7.6" r="1.9" />
      <path d="M11 13.5h6M12.5 16.5h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  device: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" opacity=".35" />
      <rect x="8.2" y="4.6" width="7.6" height="8" rx="1.3" />
      <path d="M8.5 16h7M8.5 18.6h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  clipboard: (
    <>
      <rect x="4" y="3.5" width="16" height="18" rx="3" opacity=".35" />
      <rect x="8.5" y="2" width="7" height="4" rx="1.6" />
      <path d="m7.8 13 2.4 2.4 5.6-5.6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  chart: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" opacity=".3" />
      <rect x="6.5" y="12" width="2.6" height="5.5" rx="1" />
      <rect x="10.7" y="8" width="2.6" height="9.5" rx="1" />
      <rect x="14.9" y="10.2" width="2.6" height="7.3" rx="1" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 19a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 19 10.5 4.25 4.25 0 0 1 18 19Z" opacity=".35" />
      <path d="m9 14 2.2 2.2L15.5 12" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  team: (
    <>
      <circle cx="8" cy="8" r="3.2" />
      <circle cx="16.5" cy="9" r="2.6" opacity=".6" />
      <path d="M2.5 19.5c0-3.2 2.5-5.4 5.5-5.4s5.5 2.2 5.5 5.4Z" opacity=".95" />
      <path d="M13.2 19.5c.2-2.6 1.6-4.4 3.3-4.4 2.5 0 4.5 1.8 4.5 4.4Z" opacity=".5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4.2 5.2v7.1c0 4.9 3.3 8.4 7.8 9.7 4.5-1.3 7.8-4.8 7.8-9.7V5.2Z" opacity=".32" />
      <path d="m8.4 12.1 2.6 2.6 4.8-4.9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  check: (
    <path d="m4.5 12.5 5 5 10-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  arrow: (
    <path d="M4 12h15m-5.5-5.5L19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  phone: (
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  ),
  mail: (
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  ),
  pin: (
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  ),
}

function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {ICONS[name] || ICONS.check}
    </svg>
  )
}

function Tile({ name }) {
  return (
    <span
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_12px_28px_-14px_rgba(11,59,102,0.9)]"
      style={{ background: `linear-gradient(135deg, ${AZUL_CLARO}, ${AZUL})` }}
    >
      <Icon name={name} className="h-6 w-6" />
    </span>
  )
}

/* ── Botões / CTAs ──────────────────────────────────────────────────────── */
const focus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2'

function Cta({ to, href, children, variant = 'primary', className = '' }) {
  const base = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${focus} ${className}`
  const styles = {
    primary: 'bg-[#0B3B66] text-white hover:bg-[#093054]',
    bronze: 'bg-[#B08968] text-white hover:bg-[#9a7556]',
    outline: 'border border-[#0B3B66]/25 bg-white text-[#0B3B66] hover:border-[#0B3B66] hover:bg-slate-50',
    light: 'bg-white text-[#0B3B66] hover:bg-slate-100',
    ghostLight: 'border border-white/30 text-white hover:bg-white/10',
  }
  const content = (
    <>
      {children}
      <Icon name="arrow" className="h-4 w-4" />
    </>
  )
  if (to)
    return (
      <Link to={to} className={`${base} ${styles[variant]}`}>
        {content}
      </Link>
    )
  return (
    <a href={href} className={`${base} ${styles[variant]}`}>
      {content}
    </a>
  )
}

/* ── Conteúdo ───────────────────────────────────────────────────────────── */
const PILARES = [
  {
    id: 'plaquetas',
    icon: 'tag',
    kicker: 'Produtos',
    title: 'Plaquetas e etiquetas patrimoniais',
    desc: 'Identificação durável para cada tipo de bem e ambiente — do escritório à área industrial, de ativos de TI a equipamentos expostos ao tempo.',
    items: [
      'Plaquetas em alumínio, aço inox e poliéster metalizado',
      'Etiquetas adesivas de alta aderência e antifraude (destrutíveis)',
      'Gravação com numeração sequencial, código de barras e QR Code',
      'Tags RFID UHF para leitura em massa, inclusive sobre metal',
      'Personalização com marca, brasão ou dados da instituição',
    ],
    cta: { label: 'Orçar plaquetas e etiquetas', assunto: 'Orçamento — Plaquetas e etiquetas patrimoniais' },
  },
  {
    id: 'equipamentos',
    icon: 'device',
    kicker: 'Produtos',
    title: 'Equipamentos e insumos',
    desc: 'Hardware homologado para identificar, coletar e conferir ativos, já configurado para trabalhar com o iFlow.',
    items: [
      'Coletores de dados Android com leitor 1D/2D',
      'Leitores RFID portáteis, fixos, antenas e portais',
      'Impressoras térmicas de etiquetas e impressoras RFID',
      'Ribbons, etiquetas virgens e insumos de reposição',
      'Venda ou locação, com configuração e suporte',
    ],
    cta: { label: 'Orçar equipamentos', assunto: 'Orçamento — Equipamentos (coletores, leitores, impressoras)' },
  },
  {
    id: 'servicos',
    icon: 'clipboard',
    kicker: 'Serviços',
    title: 'Inventário e emplaquetamento',
    desc: 'Equipes em campo para levantar, identificar e conciliar todo o parque de bens, com metodologia e rastreabilidade de ponta a ponta.',
    items: [
      'Inventário físico de bens móveis com registro fotográfico',
      'Emplaquetamento e reemplaquetamento de bens',
      'Conciliação físico × contábil e tratamento de sobras e faltas',
      'Inventários rotativos e anuais (inclusive setor público)',
      'Saneamento e carga da base patrimonial no sistema',
    ],
    cta: { label: 'Solicitar proposta de inventário', assunto: 'Proposta — Inventário e emplaquetamento' },
  },
  {
    id: 'avaliacoes',
    icon: 'chart',
    kicker: 'Serviços',
    title: 'Avaliações e laudos',
    desc: 'Laudos técnicos de bens móveis e imóveis, elaborados por profissionais habilitados, para fins contábeis, fiscais, societários e de seguro.',
    items: [
      'Valor justo, custo atribuído (deemed cost) e reavaliação',
      'Revisão de vida útil econômica e valor residual',
      'Teste de recuperabilidade (impairment)',
      'Laudos de máquinas, equipamentos, imóveis e instalações',
      'Avaliação para M&A, garantias, seguros e fins judiciais',
    ],
    cta: { label: 'Solicitar avaliação', assunto: 'Proposta — Avaliação de ativos e laudos' },
  },
  {
    id: 'sistemas',
    icon: 'cloud',
    kicker: 'Software · SaaS',
    title: 'iFlow — gestão de ativos em nuvem',
    desc: 'O inventário é uma foto; o iFlow mantém o filme. Plataforma SaaS para gerir patrimônio, movimentações, depreciação e manutenção no dia a dia.',
    items: [
      'Patrimônio, bens móveis e imóveis em um só lugar',
      'Gestão contábil patrimonial e cálculo de depreciação',
      'Aplicativo de coleta com código de barras, QR Code e RFID',
      'Transferências, baixas e termos de responsabilidade',
      'Integração com ERPs e sistemas contábeis',
    ],
    cta: { label: 'Agendar demonstração do iFlow', to: '/tecnologias' },
    destaque: true,
  },
  {
    id: 'outsourcing',
    icon: 'team',
    kicker: 'Outsourcing',
    title: 'Gestão patrimonial terceirizada',
    desc: 'Sua área de patrimônio operada pela Integrade: equipe, processo, sistema e equipamentos sob um único contrato, com previsibilidade de custo.',
    items: [
      'Equipe residente ou volante dedicada ao seu patrimônio',
      'Operação contínua do iFlow: entradas, transferências e baixas',
      'Inventários periódicos e conciliação mensal com a contabilidade',
      'Equipamentos e etiquetas inclusos no contrato',
      'Indicadores e relatórios gerenciais para a gestão',
    ],
    cta: { label: 'Conversar sobre outsourcing', assunto: 'Proposta — Outsourcing de gestão patrimonial' },
  },
]

const DESAFIOS = [
  {
    id: 'identificar',
    label: 'Identificar meus bens',
    titulo: 'Seus bens ainda não têm identificação — ou ela se perdeu?',
    texto:
      'Definimos o material e a tecnologia certos para cada ativo e entregamos plaquetas, etiquetas e equipamentos prontos para uso. Se preferir, nossa equipe faz o emplaquetamento.',
    solucoes: ['plaquetas', 'equipamentos', 'servicos'],
    cta: { label: 'Orçar identificação', assunto: 'Orçamento — Identificação patrimonial' },
  },
  {
    id: 'inventariar',
    label: 'Fazer o inventário',
    titulo: 'Precisa saber o que existe, onde está e em que estado?',
    texto:
      'Levantamento físico completo, conciliação com a contabilidade e tratamento das divergências. Ao final, a base já sobe saneada para o iFlow.',
    solucoes: ['servicos', 'sistemas'],
    cta: { label: 'Solicitar proposta de inventário', assunto: 'Proposta — Inventário patrimonial' },
  },
  {
    id: 'avaliar',
    label: 'Avaliar e cumprir normas',
    titulo: 'Auditoria, balanço ou fiscalização batendo à porta?',
    texto:
      'Laudos de valor justo, vida útil e impairment para atender CPC 27, CPC 01 e, no setor público, NBC TSP e MCASP — com conciliação documentada para o auditor.',
    solucoes: ['avaliacoes', 'servicos'],
    cta: { label: 'Falar com um avaliador', assunto: 'Proposta — Avaliação e conformidade contábil' },
  },
  {
    id: 'gerir',
    label: 'Gerir no dia a dia',
    titulo: 'O controle vive em planilhas e se desatualiza a cada mês?',
    texto:
      'Com o iFlow, cada entrada, transferência e baixa fica registrada, com depreciação calculada e histórico auditável. Coleta pelo celular ou coletor.',
    solucoes: ['sistemas', 'equipamentos'],
    cta: { label: 'Ver o iFlow em ação', to: '/tecnologias' },
  },
  {
    id: 'terceirizar',
    label: 'Terceirizar tudo',
    titulo: 'Quer o patrimônio sob controle sem montar uma equipe?',
    texto:
      'Assumimos a operação completa — pessoas, processo, sistema e equipamentos — com custo mensal previsível e um único responsável.',
    solucoes: ['outsourcing', 'sistemas'],
    cta: { label: 'Conversar sobre outsourcing', assunto: 'Proposta — Outsourcing de gestão patrimonial' },
  },
]

const PACOTES = [
  {
    nome: 'Identificação',
    para: 'Para quem vai identificar ou reidentificar o parque.',
    inclui: [
      'Plaquetas ou etiquetas personalizadas',
      'Coletor ou leitor (venda ou locação)',
      'Aplicativo de coleta iFlow',
      'Treinamento da equipe',
    ],
    cta: { label: 'Montar meu kit', assunto: 'Pacote Identificação — kit plaquetas + coletor + app' },
  },
  {
    nome: 'Projeto completo',
    para: 'Para quem precisa organizar a base do zero.',
    inclui: [
      'Inventário físico e emplaquetamento',
      'Conciliação físico × contábil',
      'Avaliação e laudos (valor justo / vida útil)',
      'Carga da base saneada no iFlow',
    ],
    cta: { label: 'Solicitar proposta', assunto: 'Pacote Projeto completo — inventário + avaliação + iFlow' },
    recomendado: true,
  },
  {
    nome: 'Gestão contínua',
    para: 'Para manter tudo em dia, mês a mês.',
    inclui: [
      'Assinatura iFlow',
      'Outsourcing da operação patrimonial',
      'Inventários rotativos programados',
      'Etiquetas e equipamentos inclusos',
    ],
    cta: { label: 'Falar com um especialista', assunto: 'Pacote Gestão contínua — iFlow + outsourcing' },
  },
]

const NORMAS = [
  { sigla: 'CPC 27', nome: 'Ativo imobilizado — vida útil, depreciação e valor residual' },
  { sigla: 'CPC 01', nome: 'Redução ao valor recuperável (impairment)' },
  { sigla: 'ICPC 10', nome: 'Custo atribuído na adoção inicial' },
  { sigla: 'NBC TSP 07', nome: 'Ativo imobilizado no setor público' },
  { sigla: 'MCASP', nome: 'Manual de contabilidade aplicada ao setor público' },
  { sigla: 'Lei 4.320/64', nome: 'Inventário e controle de bens públicos' },
  { sigla: 'ABNT NBR 14653', nome: 'Avaliação de bens' },
]

const ETAPAS = [
  { n: '01', t: 'Diagnóstico', d: 'Entendemos seu parque, seu processo e suas obrigações contábeis.' },
  { n: '02', t: 'Proposta sob medida', d: 'Combinamos produtos, serviços e software só no que você precisa.' },
  { n: '03', t: 'Execução', d: 'Identificação, inventário, avaliação e carga da base no iFlow.' },
  { n: '04', t: 'Gestão contínua', d: 'Patrimônio atualizado no iFlow — por você ou por nós.' },
]

const DIFERENCIAIS = [
  {
    icon: 'device',
    t: 'Também entregamos o equipamento',
    d: 'Coletores, leitores RFID e impressoras fornecidos e configurados por nós — você não precisa de um segundo fornecedor de hardware.',
  },
  {
    icon: 'shield',
    t: 'Participamos de licitações',
    d: 'Atendemos órgãos públicos, estatais, universidades, portos e energia via licitação, com entregas aderentes a NBC TSP, MCASP e Lei 4.320/64 — e também o setor privado.',
  },
  {
    icon: 'cloud',
    t: 'Do projeto ao SaaS',
    d: 'Todo projeto termina com a base carregada no iFlow, para o controle não se perder depois do inventário.',
  },
]

const porId = Object.fromEntries(PILARES.map((p) => [p.id, p]))

function ctaProps(cta) {
  return cta.to ? { to: cta.to } : { href: mailtoComercial(cta.assunto) }
}

/* ── Página ─────────────────────────────────────────────────────────────── */
export default function Solucoes() {
  const [desafioId, setDesafioId] = useState(DESAFIOS[0].id)
  const desafio = DESAFIOS.find((d) => d.id === desafioId) || DESAFIOS[0]

  return (
    <div className="text-slate-900">
      {/* 1. HERÓI */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: `linear-gradient(135deg, ${AZUL} 0%, #082C4D 60%, #061F36 100%)` }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BRONZE }}>
            Soluções em controle patrimonial · desde {EMPRESA.fundacao}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Da plaqueta ao software: todo o controle do seu patrimônio com um único fornecedor.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Plaquetas, equipamentos, inventário, avaliações, sistema em nuvem e outsourcing —
            integrados, sem retrabalho entre fornecedores e com a base sempre pronta para a
            auditoria.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta to="/contato" variant="bronze">Fale com um especialista</Cta>
            <Cta to="/tecnologias" variant="ghostLight">Conhecer o iFlow</Cta>
          </div>

          <nav aria-label="Atalhos das soluções" className="mt-12 flex flex-wrap gap-2">
            {PILARES.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-slate-100 transition hover:border-white/50 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {p.title.split(' — ')[0]}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* 2. QUAL É O SEU DESAFIO? */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
              Qual é o seu desafio hoje?
            </h2>
            <p className="mt-3 text-slate-600">
              Escolha o ponto de partida. Indicamos a combinação certa de soluções.
            </p>
          </div>

          <div role="tablist" aria-label="Desafios" className="mt-8 flex flex-wrap gap-2">
            {DESAFIOS.map((d) => {
              const ativo = d.id === desafio.id
              return (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={ativo}
                  aria-controls="painel-desafio"
                  onClick={() => setDesafioId(d.id)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${focus} ${
                    ativo
                      ? 'bg-[#0B3B66] text-white shadow'
                      : 'border border-slate-300 bg-white text-slate-700 hover:border-[#0B3B66] hover:text-[#0B3B66]'
                  }`}
                >
                  {d.label}
                </button>
              )
            })}
          </div>

          <div
            id="painel-desafio"
            role="tabpanel"
            className="mt-6 grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-5"
          >
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold text-slate-900">{desafio.titulo}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{desafio.texto}</p>
              <div className="mt-6">
                <Cta {...ctaProps(desafio.cta)}>{desafio.cta.label}</Cta>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Soluções indicadas
              </p>
              <ul className="mt-4 space-y-3">
                {desafio.solucoes.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      className={`flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-[#0B3B66] hover:bg-slate-50 ${focus}`}
                    >
                      <Tile name={porId[id].icon} />
                      <span className="text-sm font-semibold text-slate-800">{porId[id].title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2b. DIFERENCIAIS + PROVA SOCIAL
          Posicionamento frente ao mercado: concorrentes diretos vendem
          serviço + software, mas não fornecem hardware e, em alguns casos,
          não atendem o setor público. A Integrade fecha o ciclo inteiro. */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BRONZE }}>
            Por que a Integrade
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
            O ciclo inteiro, sem lacunas entre fornecedores
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {DIFERENCIAIS.map((d) => (
            <div key={d.t} className="rounded-2xl border border-slate-200 bg-white p-6">
              <Tile name={d.icon} />
              <h3 className="mt-4 text-lg font-bold text-slate-900">{d.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Empresas e instituições que confiam na Integrade
          </p>
          <div className="mt-6">
            <FaixaLogos />
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/clientes"
              className={`inline-flex items-center gap-1.5 rounded text-sm font-semibold text-[#0B3B66] hover:underline ${focus}`}
            >
              Ver clientes por setor
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CATÁLOGO */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BRONZE }}>
            Portfólio completo
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
            Produtos, serviços e software que se encaixam
          </h2>
          <p className="mt-3 text-slate-600">
            Compre só o que precisa — ou contrate tudo integrado. Cada solução conversa com as
            demais: a plaqueta que aplicamos é lida pelo coletor que fornecemos e registrada no
            iFlow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILARES.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className={`flex scroll-mt-28 flex-col rounded-2xl border p-7 transition hover:shadow-lg ${
                p.destaque
                  ? 'border-[#0B3B66] bg-gradient-to-b from-[#F1F6FB] to-white ring-1 ring-[#0B3B66]/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <Tile name={p.icon} />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {p.kicker}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#12507F]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Cta {...ctaProps(p.cta)} variant={p.destaque ? 'primary' : 'outline'} className="w-full">
                  {p.cta.label}
                </Cta>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. GATILHO iFLOW */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-3xl p-8 text-white sm:p-12 lg:grid-cols-5 lg:items-center"
          style={{ background: `linear-gradient(120deg, ${AZUL} 0%, ${AZUL_CLARO} 100%)` }}
        >
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E3CDB6]">
              iFlow · SaaS de gestão de ativos
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              O inventário terminou. Como manter a base certa no mês que vem?
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-200">
              Sem um sistema, cada transferência, compra e baixa volta a desalinhar o físico do
              contábil. O iFlow recebe a base saneada do inventário e mantém o controle vivo — com
              aplicativo de coleta, depreciação automática e trilha de auditoria.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-2 lg:items-end">
            <Cta to="/tecnologias" variant="light">Agendar demonstração</Cta>
            <Cta href={mailtoComercial('iFlow — quero migrar minha base para o sistema')} variant="ghostLight">
              Migrar minha base para o iFlow
            </Cta>
            <Link
              to="/calculadora-depreciacao"
              className="text-sm font-semibold text-[#E3CDB6] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Testar a calculadora de depreciação grátis
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PACOTES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
            Pacotes para começar mais rápido
          </h2>
          <p className="mt-3 text-slate-600">
            Combinações prontas de produto, serviço e software. Ajustamos o escopo ao tamanho do seu
            parque.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PACOTES.map((pk) => (
            <div
              key={pk.nome}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                pk.recomendado ? 'border-[#B08968] shadow-xl' : 'border-slate-200'
              }`}
            >
              {pk.recomendado ? (
                <span className="absolute -top-3 left-7 rounded-full bg-[#B08968] px-3 py-1 text-xs font-semibold text-white">
                  Recomendado
                </span>
              ) : null}
              <h3 className="text-xl font-bold text-slate-900">{pk.nome}</h3>
              <p className="mt-1 text-sm text-slate-600">{pk.para}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {pk.inclui.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#B08968]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Cta {...ctaProps(pk.cta)} variant={pk.recomendado ? 'bronze' : 'outline'} className="w-full">
                  {pk.cta.label}
                </Cta>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CONFORMIDADE */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <Tile name="shield" />
            <h2 className="mt-5 text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
              Conformidade contábil e normativa
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Entregas preparadas para auditoria, balanço e órgãos de controle — em empresas
              privadas, estatais e setor público.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Cta href={mailtoComercial('Conformidade — avaliação e conciliação patrimonial')}>
                Preparar para a auditoria
              </Cta>
              <Cta href={mailtoComercial('Setor público — licitação / termo de referência')} variant="outline">
                Sou órgão público
              </Cta>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-3">
            {NORMAS.map((n) => (
              <li key={n.sigla} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-bold" style={{ color: AZUL }}>{n.sigla}</p>
                <p className="mt-1 text-sm text-slate-600">{n.nome}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. COMO FUNCIONA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
          Como trabalhamos
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((e) => (
            <li key={e.n} className="rounded-2xl border border-slate-200 p-6">
              <span className="text-sm font-bold" style={{ color: BRONZE }}>{e.n}</span>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{e.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{e.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. CTA FINAL */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
                Vamos montar a solução do seu patrimônio?
              </h2>
              <p className="mt-3 text-slate-600">
                Conte o seu cenário e receba uma proposta com o escopo certo — de um lote de
                etiquetas a uma operação completa.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Cta to="/contato" variant="bronze">Solicitar proposta</Cta>
                <Cta href={EMPRESA.whatsappHref} variant="outline">Chamar no WhatsApp</Cta>
              </div>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={EMPRESA.telefoneHref} className={`flex items-center gap-3 rounded-lg ${focus}`}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#0B3B66]">
                    <Icon name="phone" className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-slate-800">{EMPRESA.telefone}</span>
                </a>
              </li>
              <li>
                <a href={mailtoComercial('Contato pelo site — Soluções')} className={`flex items-center gap-3 rounded-lg ${focus}`}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#0B3B66]">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-slate-800">{EMPRESA.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={EMPRESA.mapaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 rounded-lg ${focus}`}
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#0B3B66]">
                    <Icon name="pin" className="h-5 w-5" />
                  </span>
                  <span className="text-slate-700">
                    {EMPRESA.endereco.linha1}
                    <br />
                    {EMPRESA.endereco.linha2} · CEP {EMPRESA.endereco.cep}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
