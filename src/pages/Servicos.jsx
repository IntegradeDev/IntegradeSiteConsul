import React from 'react'
import { Link } from 'react-router-dom'
import { EMPRESA, mailtoComercial } from '../data/empresa.js'

/* ────────────────────────────────────────────────────────────────────────────
   Serviços — metodologia de controle patrimonial da Integrade Consulting.
   Página narrativa (não comercial): explica como o trabalho é conduzido,
   do levantamento em campo à base saneada. O catálogo comercial (produtos,
   pacotes, SaaS) permanece em /solucoes; aqui o foco é a frente de serviço.
   Nada de números, prazos ou métricas inventadas.
   ──────────────────────────────────────────────────────────────────────────── */

const AZUL = '#0B3B66'
const AZUL_CLARO = '#12507F'
const BRONZE = '#B08968'

const ICONS = {
  clipboard: (
    <>
      <rect x="4" y="3.5" width="16" height="18" rx="3" opacity=".35" />
      <rect x="8.5" y="2" width="7" height="4" rx="1.6" />
      <path d="m7.8 13 2.4 2.4 5.6-5.6" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="7.2" fill="none" stroke="currentColor" strokeWidth="2.4" opacity=".95" />
      <path d="M15.8 15.8 21 21" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  scale: (
    <>
      <circle cx="9.3" cy="12" r="6.8" opacity=".45" />
      <circle cx="14.7" cy="12" r="6.8" opacity=".85" />
      <path d="m9.6 12 2.1 2.1 3.4-3.6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
    </>
  ),
  broom: (
    <>
      <path d="M14.5 2.5 21 9l-3.1 3.1-6.5-6.5Z" opacity=".5" />
      <path d="m10.3 6.7 6.5 6.5-7.3 7.3a2.6 2.6 0 0 1-3.9-3.4Z" opacity=".95" />
      <path d="M3 21c1-2.5 2.6-3.6 4.4-3.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
  check: (
    <path d="m4.5 12.5 5 5 10-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  arrow: (
    <path d="M4 12h15m-5.5-5.5L19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9.5" opacity=".3" />
      <rect x="11" y="10.6" width="2" height="7" rx="1" opacity=".95" />
      <circle cx="12" cy="7.1" r="1.3" opacity=".95" />
    </>
  ),
  device: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" opacity=".35" />
      <rect x="8.2" y="4.6" width="7.6" height="8" rx="1.3" />
      <path d="M8.5 16h7M8.5 18.6h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  building: (
    <>
      <rect x="2.5" y="9" width="7.5" height="12.5" rx="2" opacity=".45" />
      <rect x="11" y="2.5" width="10.5" height="19" rx="2.5" opacity=".95" />
      <rect x="14" y="6" width="2" height="2" rx=".7" fill="#fff" opacity=".8" />
      <rect x="17.5" y="6" width="2" height="2" rx=".7" fill="#fff" opacity=".8" />
      <rect x="14" y="10" width="2" height="2" rx=".7" fill="#fff" opacity=".8" />
      <rect x="17.5" y="10" width="2" height="2" rx=".7" fill="#fff" opacity=".8" />
    </>
  ),
  ledger: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="3.2" opacity=".3" />
      <rect x="7.5" y="6.5" width="9" height="2" rx="1" opacity=".95" />
      <rect x="7.5" y="10.5" width="9" height="2" rx="1" opacity=".7" />
      <rect x="7.5" y="14.5" width="5.5" height="2" rx="1" opacity=".5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4.2 5.2v7.1c0 4.9 3.3 8.4 7.8 9.7 4.5-1.3 7.8-4.8 7.8-9.7V5.2Z" opacity=".32" />
      <path d="m8.4 12.1 2.6 2.6 4.8-4.9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  phone: (
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  ),
  mail: (
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  ),
}

function Icon({ name, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {ICONS[name] || ICONS.info}
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

const focus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2'

function Cta({ to, href, children, variant = 'primary', className = '' }) {
  const base = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${focus} ${className}`
  const styles = {
    primary: 'bg-[#0B3B66] text-white hover:bg-[#093054]',
    bronze: 'bg-[#B08968] text-white hover:bg-[#9a7556]',
    outline: 'border border-[#0B3B66]/25 bg-white text-[#0B3B66] hover:border-[#0B3B66] hover:bg-slate-50',
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

const FRENTES = [
  {
    id: 'inventario-patrimonial',
    icon: 'clipboard',
    title: 'Inventário Patrimonial',
    texto:
      'O ciclo completo do controle patrimonial: planejamento, levantamento físico, levantamento contábil, conciliação e saneamento em um único projeto conduzido por equipe própria.',
    itens: [
      'Escopo e critérios de inventário definidos com o cliente',
      'Base de ativos organizada e pronta para auditoria',
    ],
  },
  {
    id: 'inventario-fisico',
    icon: 'search',
    title: 'Inventário Físico',
    texto:
      'Localização, contagem e identificação dos bens em campo, com a tecnologia de identificação adequada a cada operação — RFID, QR-Code ou código de barras.',
    itens: [
      'Mobilização de equipe própria, sem terceirização do campo',
      'Registro de localização e estado de conservação por item',
    ],
    extraLink: { label: 'Ver tecnologias de identificação', to: '/tecnologias' },
  },
  {
    id: 'conciliacao-contabil',
    icon: 'scale',
    title: 'Conciliação Contábil',
    texto:
      'Cruzamento entre o que foi apurado no levantamento físico e o que está registrado na contabilidade, com apontamento técnico de cada divergência.',
    itens: [
      'Identificação de bens não localizados ou não registrados',
      'Parecer técnico alinhado a CPC 27 e normas vigentes',
    ],
  },
  {
    id: 'saneamento',
    icon: 'broom',
    title: 'Saneamento',
    texto:
      'Ajuste da base patrimonial a partir das divergências identificadas na conciliação — baixas, reclassificações e correção de registros.',
    itens: [
      'Formalização de baixas e reclassificação de itens',
      'Normas e rotinas para manter a base atualizada depois do projeto',
    ],
  },
  {
    id: 'avaliacao',
    icon: 'chart',
    title: 'Avaliação',
    texto:
      'Laudos técnicos de avaliação de bens móveis, máquinas e equipamentos, imóveis e intangíveis, assinados por profissionais habilitados, para fins contábeis, fiscais, de seguros e judiciais.',
    itens: [
      'Valor justo, vida útil remanescente e teste de impairment',
      'Conformidade com CPC 27 e, no setor público, com o MCASP',
    ],
  },
]

/* Detalhamento da frente de Avaliação — tipos de bem e normas atendidas. */
const AVALIACAO_TIPOS = [
  {
    icon: 'device',
    titulo: 'Bens móveis, máquinas e equipamentos',
    texto: 'Laudos de valor justo, vida útil econômica e depreciação de máquinas, equipamentos, veículos e demais bens móveis.',
  },
  {
    icon: 'building',
    titulo: 'Bens imóveis',
    texto: 'Avaliação de terrenos, edificações e instalações, com metodologia técnica aderente à ABNT NBR 14653.',
  },
  {
    icon: 'shield',
    titulo: 'Avaliação para fins de seguros',
    texto: 'Valor de reposição dos bens, utilizado para dimensionar corretamente a cobertura da apólice.',
  },
  {
    icon: 'ledger',
    titulo: 'CPC 27 — Ativo Imobilizado',
    texto: 'Vida útil econômica, valor residual, depreciação e teste de recuperabilidade (impairment) conforme a norma contábil.',
  },
  {
    icon: 'scale',
    titulo: 'MCASP — setor público',
    texto: 'Avaliação e depreciação de bens patrimoniais conforme o Manual de Contabilidade Aplicada ao Setor Público.',
  },
]

const ETAPAS = [
  { n: '01', t: 'Planejamento', d: 'Diagnóstico da situação atual e definição do escopo, critérios e regras contábeis do projeto.' },
  { n: '02', t: 'Inventário físico', d: 'Vistoria e contagem dos bens em campo, com coleta padronizada por RFID, QR-Code ou código de barras.' },
  { n: '03', t: 'Levantamento contábil', d: 'Validação das informações já registradas na contabilidade e no sistema de controle patrimonial.' },
  { n: '04', t: 'Conciliação', d: 'Cruzamento entre os dados físicos e os registros contábeis, com apontamento das divergências.' },
  { n: '05', t: 'Saneamento', d: 'Ajuste da base: baixas, reclassificações e correções a partir das divergências identificadas.' },
  { n: '06', t: 'Entrega e continuidade', d: 'Relatórios completos e base organizada — pronta para seguir atualizada no Integrade One.' },
]

export default function Servicos() {
  return (
    <div className="text-slate-900">
      {/* 1. HERÓI */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(11,59,102,0.05) 0%, rgba(255,255,255,1) 62%)' }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                <span aria-hidden="true" className="h-px w-6" style={{ backgroundColor: BRONZE }} />
                Serviços
              </p>
              <h1 className="mt-5 max-w-3xl text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
                Do levantamento em campo à base patrimonial saneada.
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                A Integrade desenvolve e executa, com equipe própria, cada etapa do controle
                patrimonial — inventário, conciliação, saneamento e avaliação. Metodologia
                consolidada, rastreabilidade de ponta a ponta e entregas prontas para auditoria.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Cta to="/contato">Fale com um especialista</Cta>
                <Cta to="/solucoes" variant="outline">Ver portfólio completo</Cta>
              </div>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_30px_70px_-42px_rgba(11,59,102,0.5)]">
              <img
                src="/images/fotos/consultoria-800.webp"
                srcSet="/images/fotos/consultoria-800.webp 800w, /images/fotos/consultoria-1600.webp 1600w"
                sizes="(max-width: 1024px) 100vw, 480px"
                alt="Consultores analisando dados de controle patrimonial em um notebook"
                width="800"
                height="600"
                className="h-full w-full object-cover"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 2. CINCO FRENTES */}
      <section className="bg-slate-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              O que fazemos
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Cinco frentes, um único método
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Cada frente responde a uma necessidade diferente do patrimônio — e todas se
              conectam no mesmo projeto, conduzidas pela mesma equipe.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FRENTES.map((f) => (
              <li key={f.id} id={f.id} className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <Tile name={f.icon} />
                <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{f.texto}</p>
                <ul className="mt-4 space-y-2">
                  {f.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-700">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: AZUL }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {f.extraLink && (
                  <Link
                    to={f.extraLink.to}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
                    style={{ color: AZUL }}
                  >
                    {f.extraLink.label}
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2b. AVALIAÇÃO EM PROFUNDIDADE */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <figure className="overflow-hidden rounded-2xl border border-slate-200">
                <img
                  src="/images/fotos/engenheiro-campo-800.webp"
                  srcSet="/images/fotos/engenheiro-campo-800.webp 800w, /images/fotos/engenheiro-campo-1600.webp 1600w"
                  sizes="(max-width: 1024px) 100vw, 360px"
                  alt="Engenheira de capacete inspecionando equipamentos industriais para avaliação patrimonial"
                  width="800"
                  height="533"
                  className="h-48 w-full object-cover sm:h-56"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                Avaliação em detalhe
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                Laudos técnicos para cada tipo de bem e cada norma aplicável
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Bens móveis, máquinas e equipamentos, imóveis e intangíveis — com critérios
                documentados e aderência às normas contábeis privadas e do setor público.
              </p>
              <div className="mt-6">
                <Cta to="/contato">Solicitar avaliação</Cta>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
              {AVALIACAO_TIPOS.map((t) => (
                <li key={t.titulo} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'rgba(11,59,102,0.07)', color: AZUL }}
                  >
                    <Icon name={t.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3.5 text-sm font-semibold leading-snug text-slate-900">{t.titulo}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{t.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. METODOLOGIA */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              Como conduzimos
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Metodologia de um projeto de controle patrimonial
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              A sequência abaixo descreve como o trabalho costuma se organizar. O escopo de cada
              etapa é ajustado à necessidade e ao tamanho do parque de ativos de cada empresa.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ETAPAS.map((e) => (
              <li key={e.n} className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
                <span className="absolute right-5 top-5 text-[11px] font-semibold tabular-nums text-slate-300">
                  {e.n}
                </span>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">{e.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{e.d}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-sm leading-relaxed text-slate-600">
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span>
              O trabalho não termina no relatório: a base saneada segue atualizada no dia a dia
              com o apoio do{' '}
              <Link to="/solucoes" className="font-semibold underline underline-offset-2" style={{ color: AZUL }}>
                Integrade One
              </Link>
              , a suíte de gestão patrimonial do ecossistema Integrade.
            </span>
          </p>
        </div>
      </section>

      {/* 4. CTA FINAL */}
      <section className="border-t border-slate-100 px-5 py-16 sm:px-8 sm:py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
                Vamos entender o desafio patrimonial da sua empresa?
              </h2>
              <p className="mt-3 text-slate-600">
                Conte o cenário do seu parque de ativos e receba uma proposta com o escopo certo
                para inventário, conciliação, saneamento ou avaliação.
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
                <a href={mailtoComercial('Contato pelo site — Serviços')} className={`flex items-center gap-3 rounded-lg ${focus}`}>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#0B3B66]">
                    <Icon name="mail" className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-slate-800">{EMPRESA.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
