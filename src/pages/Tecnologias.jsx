import React from 'react'
import { Link } from 'react-router-dom'
import { EMPRESA, mailtoComercial } from '../data/empresa.js'

/* ────────────────────────────────────────────────────────────────────────────
   Identificação de Ativos — RFID, QR-Code e Código de Barras.
   Página de soluções de tecnologia (não é mais a página do "iFlow"/EAM —
   essa frente agora vive em /solucoes, seção Integrade One). Não está no
   menu principal; é alcançada a partir de Soluções e Serviços.
   ──────────────────────────────────────────────────────────────────────────── */

const AZUL = '#0B3B66'
const AZUL_CLARO = '#12507F'
const BRONZE = '#B08968'

const ICONS = {
  rfid: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 2.5a9.5 9.5 0 0 1 6.7 16.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".55" />
      <path d="M12 6.3a5.7 5.7 0 0 1 4 9.7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".85" />
    </>
  ),
  qrcode: (
    <>
      <rect x="2.5" y="2.5" width="8" height="8" rx="1.6" opacity=".95" />
      <rect x="13.5" y="2.5" width="8" height="8" rx="1.6" opacity=".4" />
      <rect x="2.5" y="13.5" width="8" height="8" rx="1.6" opacity=".4" />
      <rect x="5.3" y="5.3" width="2.4" height="2.4" fill="#fff" />
      <rect x="16.3" y="5.3" width="2.4" height="2.4" fill="#fff" />
      <rect x="5.3" y="16.3" width="2.4" height="2.4" fill="#fff" />
      <rect x="13.5" y="13.5" width="3.6" height="3.6" rx="1" opacity=".95" />
      <rect x="18.2" y="13.5" width="3.3" height="3.3" rx=".9" opacity=".7" />
      <rect x="13.5" y="18.2" width="3.3" height="3.3" rx=".9" opacity=".7" />
    </>
  ),
  barcode: (
    <>
      <rect x="2.5" y="4" width="1.8" height="16" rx=".5" />
      <rect x="5.8" y="4" width="1" height="16" rx=".5" opacity=".7" />
      <rect x="8.2" y="4" width="2.6" height="16" rx=".5" />
      <rect x="12.3" y="4" width="1" height="16" rx=".5" opacity=".7" />
      <rect x="14.7" y="4" width="1.8" height="16" rx=".5" />
      <rect x="18" y="4" width="1" height="16" rx=".5" opacity=".7" />
      <rect x="20.3" y="4" width="1.2" height="16" rx=".5" opacity=".9" />
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
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="7.2" fill="none" stroke="currentColor" strokeWidth="2.4" opacity=".95" />
      <path d="M15.8 15.8 21 21" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  link: (
    <>
      <rect x="2" y="8.5" width="9.6" height="7" rx="3.5" opacity=".45" />
      <rect x="12.4" y="8.5" width="9.6" height="7" rx="3.5" opacity=".95" />
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

const TECNOLOGIAS = [
  {
    icon: 'rfid',
    tag: 'RFID',
    title: 'Identificação por Radiofrequência (RFID)',
    desc: 'Leitura automática de etiquetas sem contato visual, com capacidade de ler centenas de itens simultaneamente. Ideal para inventários rápidos, rastreamento em tempo real e controle de grandes volumes de ativos.',
    vantagens: ['Leitura em massa e sem contato', 'Rastreamento em tempo real', 'Alta velocidade de inventário', 'Ideal para grandes volumes'],
  },
  {
    icon: 'qrcode',
    tag: 'QR-CODE',
    title: 'QR-Code',
    desc: 'Identificação rápida e econômica por meio de qualquer smartphone. Ao escanear, o usuário acessa instantaneamente a ficha completa do bem, histórico de movimentações e informações de manutenção.',
    vantagens: ['Leitura por smartphone comum', 'Baixo custo de implantação', 'Armazena grande volume de dados', 'Acesso rápido à ficha do bem'],
  },
  {
    icon: 'barcode',
    tag: 'CÓDIGO DE BARRAS',
    title: 'Código de Barras',
    desc: 'Padrão consolidado de identificação, reconhecido por sua confiabilidade e custo acessível. Amplamente utilizado em inventários patrimoniais e integração com sistemas de gestão.',
    vantagens: ['Padrão consolidado no mercado', 'Custo acessível', 'Compatível com coletores', 'Alta confiabilidade'],
  },
]

const APLICACOES = [
  { icon: 'building', title: 'Identificação de bens', desc: 'Etiquetas e plaquetas com a tecnologia mais adequada ao seu ativo.' },
  { icon: 'search', title: 'Inventário ágil', desc: 'Coleta em campo com coletores e aplicativos móveis.' },
  { icon: 'link', title: 'Gestão integrada', desc: 'Dados consolidados no Integrade One e em sistemas contábeis.' },
  { icon: 'check', title: 'Rastreamento e rastreabilidade', desc: 'Histórico de movimentações e localização dos ativos.' },
]

export default function Tecnologias() {
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
                Soluções de identificação
              </p>
              <h1 className="mt-5 max-w-3xl text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
                RFID, QR-Code e Código de Barras para cada tipo de ativo.
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                Definimos a tecnologia ideal para cada operação, garantindo precisão, agilidade e
                escalabilidade no controle do seu patrimônio — da plaqueta ao dado consolidado no
                Integrade One.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Cta to="/contato">Fale com um especialista</Cta>
                <Cta to="/solucoes" variant="outline">Ver plaquetas e equipamentos</Cta>
              </div>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_30px_70px_-42px_rgba(11,59,102,0.5)]">
              <img
                src="/images/fotos/etiqueta-ativo-800.webp"
                srcSet="/images/fotos/etiqueta-ativo-800.webp 800w, /images/fotos/etiqueta-ativo-1600.webp 1600w"
                sizes="(max-width: 1024px) 100vw, 480px"
                alt="Plaqueta de identificação em pallet dentro de um armazém"
                width="800"
                height="600"
                className="h-full w-full object-cover"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 2. TECNOLOGIAS */}
      <section className="bg-slate-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="space-y-6">
            {TECNOLOGIAS.map((t) => (
              <div key={t.tag} className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:grid-cols-3">
                <div>
                  <Tile name={t.icon} />
                  <span
                    className="mt-4 inline-block rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: 'rgba(11,59,102,0.08)', color: AZUL }}
                  >
                    {t.tag}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-slate-900">{t.title}</h2>
                </div>
                <div className="lg:col-span-2">
                  <p className="text-[15px] leading-relaxed text-slate-600">{t.desc}</p>
                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {t.vantagens.map((v) => (
                      <div key={v} className="flex items-center gap-2 text-sm text-slate-700">
                        <Icon name="check" className="h-3.5 w-3.5 shrink-0" style={{ color: AZUL }} />
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. COLETA EM CAMPO */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-slate-200 order-2 lg:order-1">
              <img
                src="/images/fotos/coleta-campo-800.webp"
                srcSet="/images/fotos/coleta-campo-800.webp 800w, /images/fotos/coleta-campo-1600.webp 1600w"
                sizes="(max-width: 1024px) 100vw, 560px"
                alt="Técnico fazendo a leitura de equipamentos com coletor de dados em um rack"
                width="800"
                height="533"
                className="h-64 w-full object-cover sm:h-80"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                Coleta em campo
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                Leitura rápida, mesmo em ambientes de difícil acesso
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Coletores de dados, leitores RFID portáteis e aplicativos móveis permitem
                identificar ativos em racks, galpões e áreas industriais sem interromper a
                operação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APLICAÇÕES */}
      <section className="border-t border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              Aplicações
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Aplicações na gestão patrimonial
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APLICACOES.map((a) => (
              <div key={a.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 text-center">
                <span
                  className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: 'rgba(11,59,102,0.07)', color: AZUL }}
                >
                  <Icon name={a.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-3.5 text-sm font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA FINAL */}
      <section className="border-t border-slate-100 px-5 py-16 sm:px-8 sm:py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
                Quero implementar identificação na minha empresa
              </h2>
              <p className="mt-3 text-slate-600">
                Conte o seu parque de ativos e indicamos a tecnologia certa — RFID, QR-Code ou
                código de barras, isolados ou combinados.
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
                <a href={mailtoComercial('Contato pelo site — Identificação de ativos')} className={`flex items-center gap-3 rounded-lg ${focus}`}>
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
