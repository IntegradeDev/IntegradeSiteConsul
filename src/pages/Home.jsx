import { useEffect, useState } from 'react'

/* ────────────────────────────────────────────────────────────────────────────
   Integrade Consulting — página inicial
   ────────────────────────────────────────────────────────────────────────────
   ARQUIVO AUTOCONTIDO: sem imports locais, apenas 'react'.
   Motivo: a leitura de arquivos do Hub retorna a página de login, então não é
   possível inspecionar componentes existentes com segurança.

   PALETA PROVISÓRIA — não é a identidade oficial. Trocar os HEX abaixo quando
   os arquivos de marca forem fornecidos.
   ──────────────────────────────────────────────────────────────────────────── */
const AZUL = '#0B3B66'
const AZUL_CLARO = '#12507F'
const BRONZE = '#B08968'
const TINTA = '#0F172A'

const SITE_TITLE = 'Controle Patrimonial e Avaliações | Integrade Consulting'
const SITE_DESC =
  'Controle patrimonial e avaliações de bens móveis e imóveis com a Integrade Consulting. Conheça o iFlow, plataforma para gestão de ativos empresariais.'

/* Evidências: manter vazio até existir material validado.
   Nada é inventado — com a lista vazia a seção não é renderizada. */
const EVIDENCIAS_VALIDADAS = []

/* Recursos externos (CDN, bancos de imagem) são bloqueados neste ambiente.
   Todo o visual é SVG/CSS desenhado em código. */

function scrollToId(id) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (!el || typeof el.scrollIntoView !== 'function') return
  const reduz =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' })
}

/* ── Ícones ──────────────────────────────────────────────────────────────────
   SVG inline preenchido (estilo Material Symbols Rounded), peso uniforme,
   viewBox única. Sem fonte externa, sem dependência. */

const ICONS = {
  box: (
    <>
      <path d="M12 2 3 6.4v11.2L12 22l9-4.4V6.4Z" opacity=".3" />
      <path d="M12 2 3 6.4l9 4.5 9-4.5Z" opacity=".95" />
      <path d="M12 10.9V22l9-4.4V6.4Z" opacity=".6" />
    </>
  ),
  value: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3.4" opacity=".95" />
      <path d="M4 6v5.4c0 1.9 3.6 3.4 8 3.4s8-1.5 8-3.4V6c0 1.9-3.6 3.4-8 3.4S4 7.9 4 6Z" opacity=".6" />
      <path d="M4 11.4V16.8c0 1.9 3.6 3.4 8 3.4s8-1.5 8-3.4v-5.4c0 1.9-3.6 3.4-8 3.4s-8-1.5-8-3.4Z" opacity=".35" />
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
  wrench: (
    <path
      d="M20.6 3.4a5.6 5.6 0 0 1-7.1 7.1l-7.8 7.8a2.4 2.4 0 0 1-3.4-3.4l7.8-7.8a5.6 5.6 0 0 1 7.1-7.1l-3.1 3.1.7 2.7 2.7.7 3.1-3.1Z"
      opacity=".95"
    />
  ),
  layers: (
    <>
      <path d="M12 2 2.5 6.8 12 11.6l9.5-4.8Z" opacity=".95" />
      <path d="m2.5 11.5 9.5 4.8 9.5-4.8" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" opacity=".6" />
      <path d="m2.5 16.5 9.5 4.8 9.5-4.8" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" opacity=".32" />
    </>
  ),
  link: (
    <>
      <rect x="2" y="8.5" width="9.6" height="7" rx="3.5" opacity=".45" />
      <rect x="12.4" y="8.5" width="9.6" height="7" rx="3.5" opacity=".95" />
    </>
  ),
  modules: (
    <>
      <rect x="2.5" y="2.5" width="8.5" height="8.5" rx="2.6" opacity=".95" />
      <rect x="13" y="2.5" width="8.5" height="8.5" rx="2.6" opacity=".45" />
      <rect x="2.5" y="13" width="8.5" height="8.5" rx="2.6" opacity=".45" />
      <rect x="13" y="13" width="8.5" height="8.5" rx="2.6" opacity=".95" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="7.2" fill="none" stroke="currentColor" strokeWidth="2.4" opacity=".95" />
      <path d="M15.8 15.8 21 21" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  calc: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="3.2" opacity=".32" />
      <rect x="7.2" y="5.8" width="9.6" height="3" rx="1.4" opacity=".95" />
      <circle cx="8.8" cy="13" r="1.35" />
      <circle cx="12" cy="13" r="1.35" />
      <circle cx="15.2" cy="13" r="1.35" opacity=".6" />
      <circle cx="8.8" cy="17.2" r="1.35" opacity=".6" />
      <circle cx="12" cy="17.2" r="1.35" />
      <circle cx="15.2" cy="17.2" r="1.35" />
    </>
  ),
  organize: (
    <>
      <rect x="2.5" y="3.5" width="19" height="3.6" rx="1.8" opacity=".95" />
      <rect x="2.5" y="10.2" width="19" height="3.6" rx="1.8" opacity=".6" />
      <rect x="2.5" y="16.9" width="13" height="3.6" rx="1.8" opacity=".35" />
    </>
  ),
  manage: (
    <>
      <rect x="2.5" y="3" width="19" height="18" rx="4" opacity=".3" />
      <rect x="6" y="7.5" width="5.5" height="2.4" rx="1.2" opacity=".95" />
      <rect x="6" y="12" width="12" height="2.4" rx="1.2" opacity=".7" />
      <rect x="6" y="16.5" width="8" height="2.4" rx="1.2" opacity=".5" />
    </>
  ),
  evolve: (
    <>
      <path d="M3 17.5 9 11.4l3.4 3.4L20.6 6.6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity=".95" />
      <path d="M15.4 6.2h5.5v5.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" opacity=".95" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4.2 5.2v7.1c0 4.9 3.3 8.4 7.8 9.7 4.5-1.3 7.8-4.8 7.8-9.7V5.2Z" opacity=".32" />
      <path d="m8.4 12.1 2.6 2.6 4.8-4.9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity=".95" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 2.2 14.4 9l6.6 2.4-6.6 2.4L12 20.6 9.6 13.8 3 11.4 9.6 9Z" opacity=".95" />
      <circle cx="19.6" cy="4.4" r="1.9" opacity=".6" />
      <circle cx="4.4" cy="19.6" r="1.5" opacity=".45" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9.5" opacity=".3" />
      <rect x="11" y="10.6" width="2" height="7" rx="1" opacity=".95" />
      <circle cx="12" cy="7.1" r="1.3" opacity=".95" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9.5" opacity=".32" />
      <rect x="11" y="6.4" width="2" height="7.6" rx="1" opacity=".95" />
      <circle cx="12" cy="17" r="1.3" opacity=".95" />
    </>
  ),
  arrow: (
    <path d="M4 12h15m-5.5-5.5L19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  chevron: (
    <path d="m6 9.5 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  check: (
    <path d="m4.5 12.5 5 5 10-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
}

function Icon({ name, className = 'h-6 w-6', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className} {...rest}>
      {ICONS[name] || ICONS.info}
    </svg>
  )
}

function Tile({ name, size = 'md' }) {
  const dims =
    size === 'lg'
      ? 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] rounded-2xl'
      : size === 'sm'
        ? 'h-11 w-11 rounded-xl'
        : 'h-14 w-14 rounded-2xl'
  const icon = size === 'lg' ? 'h-8 w-8 sm:h-9 sm:w-9' : size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center text-white shadow-[0_12px_28px_-14px_rgba(11,59,102,0.9)] ${dims}`}
      style={{ backgroundImage: `linear-gradient(140deg, ${AZUL_CLARO} 0%, ${AZUL} 100%)` }}
      aria-hidden="true"
    >
      <Icon name={name} className={icon} />
    </span>
  )
}

/* ── Visual da primeira tela ──────────────────────────────────────────────── */

const NOS_PAINEL = [
  { label: 'Patrimônio', icon: 'box', left: '18%', top: '15%' },
  { label: 'Contabilidade', icon: 'ledger', left: '82%', top: '15%' },
  { label: 'Imóveis', icon: 'building', left: '85%', top: '52%' },
  { label: 'Manutenção', icon: 'wrench', left: '74%', top: '86%' },
  { label: 'Projetos', icon: 'layers', left: '26%', top: '86%' },
]

const LINHAS_PAINEL = [
  'M200 160 Q150 126 108 62',
  'M200 160 Q250 126 292 62',
  'M200 160 Q272 152 316 164',
  'M200 160 Q256 210 268 262',
  'M200 160 Q144 210 132 262',
]

const ATIVOS_PAINEL = [
  { icon: 'box', titulo: 'Bem móvel', sub: 'Etiqueta patrimonial', estado: 'Cadastro' },
  { icon: 'building', titulo: 'Imóvel', sub: 'Cadastro imobiliário', estado: 'Escopo' },
  { icon: 'wrench', titulo: 'Manutenção', sub: 'Plano por ativo', estado: 'Programação' },
]

function PainelIfLow() {
  return (
    <div className="relative">
      {/* camadas de profundidade — decorativas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[2rem] blur-2xl"
        style={{ backgroundImage: 'linear-gradient(135deg, rgba(11,59,102,0.10), rgba(176,137,104,0.16))' }}
      />
      <div aria-hidden="true" className="absolute inset-x-8 -bottom-4 top-10 rounded-[1.6rem] border border-slate-200/70 bg-white/60" />

      <figure
        className="relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_30px_70px_-42px_rgba(11,59,102,0.65)]"
        aria-label="Representação conceitual da conexão entre patrimônio, contabilidade, imóveis, manutenção e projetos no iFlow, com lista de ativos e mapa de bens imóveis."
      >
        <div
          aria-hidden="true"
          className="h-1 w-full"
          style={{ backgroundImage: `linear-gradient(90deg, ${AZUL}, ${AZUL_CLARO} 55%, ${BRONZE})` }}
        />

        {/* barra superior do painel */}
        <div aria-hidden="true" className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-slate-200" />
          </div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Painel de ativos</p>
          <span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-slate-500 ring-1 ring-slate-200">
            EAM
          </span>
        </div>

        {/* diagrama */}
        <div className="px-3 pt-5 sm:px-5 sm:pt-6">
          <div className="relative mx-auto w-full max-w-[440px]" style={{ aspectRatio: '5 / 4' }}>
            <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
              <circle cx="200" cy="160" r="58" fill="none" stroke={AZUL} strokeWidth="1" strokeDasharray="3 7" opacity=".22" />
              <circle cx="200" cy="160" r="96" fill="none" stroke={AZUL} strokeWidth="1" strokeDasharray="2 9" opacity=".14" />
              <circle className="iflow-glow" cx="200" cy="160" r="74" fill="none" stroke={BRONZE} strokeWidth="1.4" opacity=".3" />
              {LINHAS_PAINEL.map((d) => (
                <path key={d} d={d} fill="none" stroke={AZUL} strokeWidth="1.6" strokeLinecap="round" opacity=".3" />
              ))}
            </svg>

            {/* núcleo */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <div
                className="flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-[1.1rem] text-white shadow-[0_18px_40px_-16px_rgba(11,59,102,0.95)] sm:h-20 sm:w-20"
                style={{ backgroundImage: `linear-gradient(145deg, ${AZUL_CLARO} 0%, ${AZUL} 100%)` }}
              >
                <span className="text-[13px] font-semibold leading-none tracking-tight sm:text-sm">iFlow</span>
                <span className="mt-1 text-[8px] uppercase leading-none tracking-[0.18em] text-white/70">plataforma</span>
              </div>
            </div>

            {/* nós conectados */}
            {NOS_PAINEL.map((no) => (
              <div key={no.label} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: no.left, top: no.top }}>
                <span className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white/95 px-1.5 py-1 text-[9px] font-medium text-slate-600 shadow-[0_6px_16px_-10px_rgba(15,23,42,0.5)] backdrop-blur-sm sm:gap-2 sm:px-2.5 sm:py-1.5 sm:text-[11px]">
                  <Icon name={no.icon} className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" style={{ color: AZUL }} />
                  {no.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* painéis de apoio */}
        <div className="grid gap-3 border-t border-slate-100 px-3 py-4 sm:grid-cols-2 sm:px-5 sm:py-5">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Ativos</p>
              <span className="rounded-md px-1.5 py-0.5 text-[9px] font-medium text-slate-400 ring-1 ring-slate-200">consulta</span>
            </div>
            <ul className="mt-2.5 space-y-2">
              {ATIVOS_PAINEL.map((a) => (
                <li key={a.titulo} className="flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: 'rgba(11,59,102,0.07)', color: AZUL }}
                    aria-hidden="true"
                  >
                    <Icon name={a.icon} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-medium leading-tight text-slate-700">{a.titulo}</span>
                    <span className="block truncate text-[9px] leading-tight text-slate-400">{a.sub}</span>
                  </span>
                  <span className="shrink-0 rounded px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-wide text-slate-500 ring-1 ring-slate-200">
                    {a.estado}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Bens imóveis</p>
              <Icon name="building" className="h-3.5 w-3.5" style={{ color: AZUL }} />
            </div>
            <svg viewBox="0 0 200 104" className="mt-2.5 h-auto w-full" aria-hidden="true" focusable="false">
              <rect x="4" y="6" width="84" height="48" rx="6" fill={AZUL} opacity=".12" />
              <rect x="96" y="6" width="56" height="24" rx="6" fill={AZUL} opacity=".07" />
              <rect x="158" y="6" width="38" height="48" rx="6" fill={AZUL} opacity=".07" />
              <rect x="4" y="62" width="52" height="36" rx="6" fill={AZUL} opacity=".07" />
              <rect x="64" y="62" width="62" height="36" rx="6" fill={BRONZE} opacity=".22" />
              <rect x="134" y="62" width="62" height="36" rx="6" fill={AZUL} opacity=".1" />
              <path d="M64 20h24v20H64z" fill="none" stroke={AZUL} strokeWidth="1.4" opacity=".35" strokeDasharray="3 4" />
              <circle cx="95" cy="80" r="4.5" fill={BRONZE} />
              <circle cx="95" cy="80" r="9" fill="none" stroke={BRONZE} strokeWidth="1.4" opacity=".5" />
            </svg>
            <p className="mt-1.5 text-[9px] leading-snug text-slate-400">Imóveis vinculados à operação</p>
          </div>
        </div>

        <figcaption className="flex items-start gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-[10px] leading-relaxed text-slate-500 sm:px-5 sm:text-[11px]">
          <Icon name="info" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span>Representação conceitual — não é a interface do produto.</span>
        </figcaption>
      </figure>
    </div>
  )
}

/* ── Conteúdo editorial (sem números inventados) ──────────────────────────── */

const DESAFIOS = [
  {
    icon: 'layers',
    titulo: 'Informações patrimoniais dispersas entre áreas e sistemas',
    frente: 'Controle patrimonial',
    texto:
      'Planilhas, controles locais e bases distintas descrevem o mesmo ativo de formas diferentes. O trabalho começa por definir uma referência única e a origem de cada dado.',
  },
  {
    icon: 'search',
    titulo: 'Dificuldade para identificar e acompanhar os bens',
    frente: 'Controle patrimonial e tecnologia',
    texto:
      'Sem identificação consistente, o inventário deixa de refletir a realidade da operação. Há apoio no cadastro, na conferência e na atualização contínua das informações.',
  },
  {
    icon: 'value',
    titulo: 'Necessidade de entender o valor dos ativos',
    frente: 'Avaliações',
    texto:
      'Decisões sobre registro, revisão e comunicação de valor pedem critério técnico documentado. A avaliação organiza premissas e sustenta a decisão do gestor.',
  },
  {
    icon: 'organize',
    titulo: 'Falta de continuidade entre o levantamento e a gestão cotidiana',
    frente: 'iFlow',
    texto:
      'Muitos trabalhos terminam em um relatório que deixa de ser usado. A plataforma mantém o conhecimento patrimonial em circulação na rotina das áreas.',
  },
]

const FRENTES_IFLOW = [
  { icon: 'box', titulo: 'Patrimônio e bens móveis', texto: 'Cadastro e acompanhamento dos bens, com identificação e histórico por item.' },
  { icon: 'ledger', titulo: 'Gestão contábil patrimonial', texto: 'Informação patrimonial organizada para o diálogo com a contabilidade.' },
  { icon: 'building', titulo: 'Bens imóveis', texto: 'Registro dos imóveis, suas características e vínculos com a operação.' },
  { icon: 'wrench', titulo: 'Manutenção de ativos', texto: 'Organização das rotinas de manutenção dos ativos cadastrados.' },
  { icon: 'layers', titulo: 'Projetos', texto: 'Acompanhamento de projetos vinculados a ativos e empreendimentos.' },
  { icon: 'link', titulo: 'Interfaces com outros ERPs', texto: 'Conexão com os sistemas já utilizados pela empresa, conforme o ambiente.' },
  { icon: 'modules', titulo: 'Módulos especialistas', texto: 'Recursos específicos conforme a necessidade e o escopo da operação.' },
]

const JORNADA = [
  { icon: 'search', titulo: 'Conhecer', texto: 'Levantar o que existe, onde está e como está registrado.' },
  { icon: 'calc', titulo: 'Avaliar', texto: 'Aplicar critério técnico para entender valor e condição.' },
  { icon: 'organize', titulo: 'Organizar', texto: 'Estruturar dados e processos em uma referência comum.' },
  { icon: 'manage', titulo: 'Gerenciar', texto: 'Sustentar a rotina de atualização e acompanhamento.' },
  { icon: 'evolve', titulo: 'Evoluir', texto: 'Ampliar escopo e uso conforme a operação amadurece.' },
]

const FAQ = [
  {
    q: 'O que a Integrade Consulting faz?',
    a: 'Atua em controle patrimonial e em avaliações de bens móveis e imóveis, apoiando empresas a conhecer, organizar e gerir seus ativos. O trabalho combina especialização técnica com a tecnologia do iFlow.',
  },
  {
    q: 'Quais tipos de ativos fazem parte do escopo?',
    a: 'Bens móveis e bens imóveis, incluindo equipamentos, instalações e imóveis corporativos. O recorte exato de cada trabalho é definido no início do projeto, conforme a necessidade da empresa.',
  },
  {
    q: 'O que é o iFlow?',
    a: 'É a plataforma de gestão de ativos empresariais do ecossistema Integrade — o que o mercado chama de EAM (Enterprise Asset Management). Reúne informações patrimoniais e apoia a rotina de gestão dos ativos.',
  },
  {
    q: 'Como são avaliadas as integrações com outros sistemas?',
    a: 'As integrações são definidas conforme o ambiente e o escopo do projeto. A avaliação considera os sistemas já utilizados pela empresa e as necessidades de troca de informação entre eles.',
  },
  {
    q: 'Como solicitar atendimento ou uma demonstração?',
    a: 'Pelo formulário desta página, indicando o interesse em controle patrimonial, avaliações ou iFlow. A partir do contato, o escopo e as condições são alinhados diretamente com a equipe.',
  },
]

const INTERESSES = [
  { valor: 'controle-patrimonial', label: 'Controle patrimonial' },
  { valor: 'avaliacoes', label: 'Avaliações' },
  { valor: 'iflow', label: 'iFlow' },
  { valor: 'outros', label: 'Outros' },
]

const inputBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#12507F] focus:ring-4 focus:ring-[#12507F]/15'

export default function Home() {
  const [form, setForm] = useState({
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    interesse: '',
    mensagem: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | error
  const [faqAberta, setFaqAberta] = useState(0)

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.title = SITE_TITLE
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', SITE_DESC)
  }, [])

  const atualizar = (campo) => (evento) => {
    const { value } = evento.target
    setForm((atual) => ({ ...atual, [campo]: value }))
    setErrors((atual) => {
      if (!atual[campo]) return atual
      const proximo = { ...atual }
      delete proximo[campo]
      return proximo
    })
    if (status === 'error') setStatus('idle')
  }

  const validar = () => {
    const proximo = {}
    if (!form.nome.trim()) proximo.nome = 'Informe seu nome.'
    if (!form.empresa.trim()) proximo.empresa = 'Informe a empresa.'
    if (!form.email.trim()) proximo.email = 'Informe o e-mail corporativo.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) proximo.email = 'E-mail em formato inválido.'
    if (!form.interesse) proximo.interesse = 'Selecione o interesse.'
    if (!form.mensagem.trim()) proximo.mensagem = 'Descreva brevemente a necessidade.'
    return proximo
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const proximo = validar()
    setErrors(proximo)
    if (Object.keys(proximo).length > 0) {
      setStatus('idle')
      const primeiro = Object.keys(proximo)[0]
      const campo = document.getElementById(`campo-${primeiro}`)
      if (campo && typeof campo.focus === 'function') campo.focus()
      return
    }
    /* Sem integração de envio neste ambiente: estado de erro explícito.
       Não simular sucesso. */
    setStatus('error')
  }

  return (
    <div className="bg-white" style={{ color: TINTA }}>
      <style>{`
        @keyframes iflowGlow { 0%,100% { opacity:.22; transform:scale(.97) } 50% { opacity:.42; transform:scale(1.03) } }
        .iflow-glow { animation: iflowGlow 8s ease-in-out infinite; transform-origin: 200px 160px; }
        @media (prefers-reduced-motion: reduce) {
          .iflow-glow { animation: none !important; }
          html { scroll-behavior: auto !important; }
        }
        .cta-foco:focus-visible { outline: 3px solid ${AZUL_CLARO}; outline-offset: 3px; }
      `}</style>

      {/* ── 2. PRIMEIRA TELA ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" aria-labelledby="titulo-principal">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(11,59,102,0.05) 0%, rgba(255,255,255,1) 62%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-32 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(176,137,104,0.18), transparent 70%)' }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                <span aria-hidden="true" className="h-px w-6" style={{ backgroundColor: BRONZE }} />
                Controle patrimonial, avaliações e tecnologia
              </p>

              <h1
                id="titulo-principal"
                className="mt-5 text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]"
              >
                Conheça seu patrimônio. Entenda seu valor. Gerencie todo o seu ciclo de vida.
              </h1>

              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                A Integrade Consulting combina especialização em controle patrimonial e avaliações com a
                tecnologia do iFlow para apoiar a gestão de bens móveis e imóveis e conectar patrimônio,
                contabilidade e operação.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => scrollToId('contato')}
                  className="cta-foco inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_-18px_rgba(11,59,102,0.95)] transition hover:brightness-110"
                  style={{ backgroundColor: AZUL }}
                >
                  Fale com um especialista
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId('iflow')}
                  className="cta-foco inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Conheça o iFlow
                </button>
              </div>

              <p className="mt-6 max-w-md text-xs leading-relaxed text-slate-500">
                Uma empresa do ecossistema Integrade. Consultoria patrimonial e avaliações técnicas com apoio
                da plataforma iFlow.
              </p>
            </div>

            <PainelIfLow />
          </div>
        </div>
      </section>

      {/* ── 3. DESAFIOS DO CLIENTE ───────────────────────────────────────── */}
      <section id="solucoes" className="scroll-mt-24 border-t border-slate-100 bg-slate-50/70">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              O ponto de partida
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Sua empresa tem uma visão confiável dos próprios ativos?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Quatro situações aparecem com frequência em organizações com patrimônio relevante. Cada uma
              pede um tipo diferente de apoio — e todas se conectam.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {DESAFIOS.map((d) => (
              <li key={d.titulo} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <Tile name={d.icon} />
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold leading-snug text-slate-900">{d.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.texto}</p>
                  <p
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500"
                    style={{ backgroundColor: 'rgba(11,59,102,0.05)' }}
                  >
                    <Icon name="check" className="h-3 w-3" style={{ color: AZUL }} />
                    Frente: {d.frente}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 4. CONTROLE PATRIMONIAL E AVALIAÇÕES ─────────────────────────── */}
      <section id="avaliacoes" className="scroll-mt-24 border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              Especialidades
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Duas especialidades que se completam
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Controle patrimonial e avaliações respondem a perguntas diferentes sobre o mesmo conjunto de
              ativos. Na prática, caminham juntas.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.5)] sm:p-8">
              <div className="flex items-center gap-4">
                <Tile name="organize" />
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">Controle patrimonial</h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                Organização das informações e dos processos necessários para conhecer e acompanhar o
                patrimônio da empresa — do cadastro à atualização que sustenta a rotina das áreas.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  'Estrutura de cadastro e critérios de identificação dos bens.',
                  'Rotinas de conferência e atualização entre as áreas envolvidas.',
                  'Aproximação entre a base patrimonial e a informação contábil.',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0" style={{ color: AZUL }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.5)] sm:p-8">
              <div className="flex items-center gap-4">
                <Tile name="value" />
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">Avaliações</h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-600">
                Avaliação de bens móveis e imóveis como apoio técnico às decisões sobre o patrimônio,
                respeitando o escopo de cada trabalho.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  'Levantamento das características e do estado dos bens.',
                  'Critérios e premissas documentados para cada trabalho.',
                  'Resultado orientado à decisão de quem gere o patrimônio.',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0" style={{ color: AZUL }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span>
              O escopo de cada trabalho é definido no início do projeto. Serviços adicionais são avaliados
              caso a caso, conforme a necessidade da empresa.
            </span>
          </p>
        </div>
      </section>

      {/* ── 5. IFLOW ─────────────────────────────────────────────────────── */}
      <section id="iflow" className="scroll-mt-24 border-t border-slate-100" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                Plataforma do ecossistema Integrade
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                iFlow: conecte as informações e a gestão dos seus ativos.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                O iFlow é a plataforma de gestão de ativos empresariais do ecossistema Integrade — o que o
                mercado chama de EAM, do inglês <em>Enterprise Asset Management</em>. Em linguagem simples: é
                o ambiente em que a empresa registra seus ativos, acompanha a situação de cada um e organiza
                as rotinas ligadas a eles.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                A plataforma dá continuidade ao trabalho de consultoria: o levantamento e a avaliação deixam
                de ser um documento e passam a orientar a gestão de todos os dias.
              </p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Integrações</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Conecte a gestão patrimonial aos sistemas utilizados pela sua empresa, com integrações
                  definidas conforme o ambiente e o escopo do projeto.
                </p>
              </div>

              <button
                type="button"
                onClick={() => scrollToId('contato')}
                className="cta-foco mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_-18px_rgba(11,59,102,0.95)] transition hover:brightness-110"
                style={{ backgroundColor: AZUL }}
              >
                Solicite uma demonstração
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>

            <div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {FRENTES_IFLOW.map((f) => (
                  <li key={f.titulo} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: 'rgba(11,59,102,0.07)', color: AZUL }}
                      aria-hidden="true"
                    >
                      <Icon name={f.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold leading-snug text-slate-900">{f.titulo}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{f.texto}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  Descrições resumidas. Recursos e escopo são confirmados em demonstração, conforme a
                  necessidade da operação.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CONSULTORIA E TECNOLOGIA NA MESMA JORNADA ─────────────────── */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              Da informação à rotina
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Consultoria e tecnologia na mesma jornada
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Serviços e plataforma apoiam etapas diferentes do mesmo percurso. A sequência abaixo descreve
              como o trabalho costuma se organizar — não é um método proprietário, e a combinação é ajustada à
              necessidade de cada empresa.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {JORNADA.map((etapa, indice) => (
              <li key={etapa.titulo} className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <span className="absolute right-4 top-4 text-[11px] font-semibold tabular-nums text-slate-300">
                  {String(indice + 1).padStart(2, '0')}
                </span>
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white ring-1 ring-slate-200"
                  aria-hidden="true"
                >
                  <Icon name={etapa.icon} className="h-6 w-6" style={{ color: AZUL }} />
                </span>
                <h3 className="mt-3.5 text-sm font-semibold tracking-tight text-slate-900">{etapa.titulo}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{etapa.texto}</p>
              </li>
            ))}
          </ol>

          <blockquote className="mt-8 rounded-2xl border-l-4 bg-slate-50 p-6 sm:p-8" style={{ borderColor: AZUL }}>
            <p className="text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
              O conhecimento sobre o patrimônio ganha valor quando orienta a gestão de todos os dias.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── 7. EVIDÊNCIAS (oculta até existir material validado) ──────────── */}
      {EVIDENCIAS_VALIDADAS.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50/70">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Evidências de confiança
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {EVIDENCIAS_VALIDADAS.map((item) => (
                <li key={item.titulo} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-sm font-semibold text-slate-900">{item.titulo}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.descricao}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── 8. ECOSSISTEMA INTEGRADE ─────────────────────────────────────── */}
      <section className="border-t border-slate-100" style={{ backgroundColor: '#0B2A4A' }}>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50 sm:text-xs">
                Ecossistema
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                Especialização patrimonial com a força do ecossistema Integrade.
              </h2>
            </div>
            <div>
              <p className="text-sm leading-relaxed text-white/70 sm:text-[15px]">
                A Integrade reúne competências em consultoria, tecnologia e serviços. A Integrade Consulting é
                a frente especializada em controle patrimonial e avaliações; o iFlow é a plataforma de gestão
                de ativos do ecossistema.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Integrade Consulting', 'iFlow · plataforma'].map((tag) => (
                  <span key={tag} className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-white/40">
                A estrutura das demais frentes do ecossistema está em revisão.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. PERGUNTAS FREQUENTES ──────────────────────────────────────── */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <h2 className="text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
            Perguntas frequentes
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            Respostas curtas para as dúvidas mais comuns antes de uma conversa.
          </p>

          <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
            {FAQ.map((item, indice) => {
              const aberta = faqAberta === indice
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setFaqAberta(aberta ? -1 : indice)}
                      aria-expanded={aberta}
                      aria-controls={`faq-resposta-${indice}`}
                      className="cta-foco flex w-full items-start justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-[15px] font-medium leading-snug text-slate-900">{item.q}</span>
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500"
                        style={{ transform: aberta ? 'rotate(180deg)' : 'none' }}
                        aria-hidden="true"
                      >
                        <Icon name="chevron" className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-resposta-${indice}`} hidden={!aberta} className="pb-5 pr-8">
                    <p className="text-sm leading-relaxed text-slate-600">{item.a}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            Condições comerciais, prazos, cobertura geográfica e funcionalidades específicas são informados
            apenas quando confirmados pela equipe.
          </p>
        </div>
      </section>

      {/* ── 10. CONTATO ──────────────────────────────────────────────────── */}
      <section id="contato" className="scroll-mt-24 border-t border-slate-100" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              Contato
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Vamos entender o desafio patrimonial da sua empresa?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Preencha os campos abaixo. Informe o tipo de interesse para direcionar o atendimento ao
              especialista adequado.
            </p>
          </div>

          <form
            onSubmit={enviar}
            noValidate
            className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.55)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="campo-nome" className="block text-sm font-medium text-slate-700">
                  Nome <span aria-hidden="true" style={{ color: BRONZE }}>*</span>
                </label>
                <input
                  id="campo-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={form.nome}
                  onChange={atualizar('nome')}
                  required
                  aria-required="true"
                  aria-invalid={errors.nome ? 'true' : 'false'}
                  aria-describedby={errors.nome ? 'erro-nome' : undefined}
                  className={`${inputBase} mt-2 ${errors.nome ? 'border-red-300 ring-4 ring-red-100' : 'border-slate-200'}`}
                />
                {errors.nome && (
                  <p id="erro-nome" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <Icon name="alert" className="h-3.5 w-3.5" />
                    {errors.nome}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="campo-empresa" className="block text-sm font-medium text-slate-700">
                  Empresa <span aria-hidden="true" style={{ color: BRONZE }}>*</span>
                </label>
                <input
                  id="campo-empresa"
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  value={form.empresa}
                  onChange={atualizar('empresa')}
                  required
                  aria-required="true"
                  aria-invalid={errors.empresa ? 'true' : 'false'}
                  aria-describedby={errors.empresa ? 'erro-empresa' : undefined}
                  className={`${inputBase} mt-2 ${errors.empresa ? 'border-red-300 ring-4 ring-red-100' : 'border-slate-200'}`}
                />
                {errors.empresa && (
                  <p id="erro-empresa" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <Icon name="alert" className="h-3.5 w-3.5" />
                    {errors.empresa}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="campo-email" className="block text-sm font-medium text-slate-700">
                  E-mail corporativo <span aria-hidden="true" style={{ color: BRONZE }}>*</span>
                </label>
                <input
                  id="campo-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={atualizar('email')}
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'erro-email' : undefined}
                  className={`${inputBase} mt-2 ${errors.email ? 'border-red-300 ring-4 ring-red-100' : 'border-slate-200'}`}
                />
                {errors.email && (
                  <p id="erro-email" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <Icon name="alert" className="h-3.5 w-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="campo-telefone" className="block text-sm font-medium text-slate-700">
                  Telefone <span className="font-normal text-slate-400">(opcional)</span>
                </label>
                <input
                  id="campo-telefone"
                  name="telefone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.telefone}
                  onChange={atualizar('telefone')}
                  className={`${inputBase} mt-2 border-slate-200`}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="campo-interesse" className="block text-sm font-medium text-slate-700">
                  Interesse <span aria-hidden="true" style={{ color: BRONZE }}>*</span>
                </label>
                <select
                  id="campo-interesse"
                  name="interesse"
                  value={form.interesse}
                  onChange={atualizar('interesse')}
                  required
                  aria-required="true"
                  aria-invalid={errors.interesse ? 'true' : 'false'}
                  aria-describedby={errors.interesse ? 'erro-interesse' : undefined}
                  className={`${inputBase} mt-2 ${errors.interesse ? 'border-red-300 ring-4 ring-red-100' : 'border-slate-200'}`}
                >
                  <option value="">Selecione uma opção</option>
                  {INTERESSES.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
                {errors.interesse && (
                  <p id="erro-interesse" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <Icon name="alert" className="h-3.5 w-3.5" />
                    {errors.interesse}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="campo-mensagem" className="block text-sm font-medium text-slate-700">
                  Mensagem breve <span aria-hidden="true" style={{ color: BRONZE }}>*</span>
                </label>
                <textarea
                  id="campo-mensagem"
                  name="mensagem"
                  rows={4}
                  value={form.mensagem}
                  onChange={atualizar('mensagem')}
                  required
                  aria-required="true"
                  aria-invalid={errors.mensagem ? 'true' : 'false'}
                  aria-describedby={errors.mensagem ? 'erro-mensagem' : undefined}
                  className={`${inputBase} mt-2 resize-y ${errors.mensagem ? 'border-red-300 ring-4 ring-red-100' : 'border-slate-200'}`}
                />
                {errors.mensagem && (
                  <p id="erro-mensagem" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
                    <Icon name="alert" className="h-3.5 w-3.5" />
                    {errors.mensagem}
                  </p>
                )}
              </div>
            </div>

            {status === 'error' && (
              <div role="alert" className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p className="text-sm leading-relaxed text-amber-900">
                  O envio automático não está disponível neste ambiente.{' '}
                  <strong>Nenhuma informação foi transmitida.</strong> O formulário está em fase de integração
                  — utilize os canais oficiais de contato enquanto isso.
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-[11px] leading-relaxed text-slate-500">
                Solicitamos apenas as informações necessárias ao atendimento. Ao enviar, você concorda com o
                tratamento desses dados para retorno do contato — veja a{' '}
                <a href="#/privacidade" className="font-medium underline underline-offset-2" style={{ color: AZUL }}>
                  política de privacidade
                </a>
                .
              </p>
              <button
                type="submit"
                className="cta-foco inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_-18px_rgba(11,59,102,0.95)] transition hover:brightness-110"
                style={{ backgroundColor: AZUL }}
              >
                Enviar solicitação
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
              Não há promessa de diagnóstico gratuito nem de prazo de atendimento definido nesta página.
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}
