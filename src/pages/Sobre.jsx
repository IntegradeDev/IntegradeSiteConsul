import React from 'react'
import { Link } from 'react-router-dom'
import { EMPRESA, mailtoComercial } from '../data/empresa.js'
import { SETORES } from '../data/clientes.js'

/* ────────────────────────────────────────────────────────────────────────────
   Sobre — Integrade Consulting.
   Página institucional no mesmo padrão visual de Serviços, Soluções e
   Identificação de Ativos: hero claro, Icon/Tile local, tom sóbrio.
   Nada de números ou prêmios inventados — só o que já está em EMPRESA e em
   data/clientes.js.
   ──────────────────────────────────────────────────────────────────────────── */

const AZUL = '#0B3B66'
const AZUL_CLARO = '#12507F'
const BRONZE = '#B08968'

const ICONS = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="7.2" fill="none" stroke="currentColor" strokeWidth="2.4" opacity=".95" />
      <path d="M15.8 15.8 21 21" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4.2 5.2v7.1c0 4.9 3.3 8.4 7.8 9.7 4.5-1.3 7.8-4.8 7.8-9.7V5.2Z" opacity=".32" />
      <path d="m8.4 12.1 2.6 2.6 4.8-4.9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 2.2 14.4 9l6.6 2.4-6.6 2.4L12 20.6 9.6 13.8 3 11.4 9.6 9Z" opacity=".95" />
      <circle cx="19.6" cy="4.4" r="1.9" opacity=".6" />
      <circle cx="4.4" cy="19.6" r="1.5" opacity=".45" />
    </>
  ),
  check: (
    <path d="m4.5 12.5 5 5 10-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  layers: (
    <>
      <path d="M12 2 2.5 6.8 12 11.6l9.5-4.8Z" opacity=".95" />
      <path d="m2.5 11.5 9.5 4.8 9.5-4.8" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" opacity=".6" />
      <path d="m2.5 16.5 9.5 4.8 9.5-4.8" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" opacity=".32" />
    </>
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

const VALORES = [
  {
    icon: 'search',
    titulo: 'Especialização',
    texto: 'Foco total em controle patrimonial, inventário e avaliações — domínio técnico profundo do segmento.',
  },
  {
    icon: 'shield',
    titulo: 'Confiabilidade',
    texto: 'Processos auditáveis, laudos técnicos e dados confiáveis para a tomada de decisão.',
  },
  {
    icon: 'sparkle',
    titulo: 'Inovação',
    texto: 'RFID, QR-Code e código de barras integrados à plataforma Integrade One.',
  },
  {
    icon: 'check',
    titulo: 'Compromisso',
    texto: 'Atendimento próximo, prazos cumpridos e soluções desenhadas para gerar resultado real.',
  },
]

const SOLUCAO_COMPLETA = [
  'Plaquetas de patrimônio e identificação',
  'Equipamentos, dispositivos e impressoras',
  'Serviços de inventário físico e patrimonial',
  'Avaliação de ativos e laudos técnicos',
  'Serviços contábeis especializados',
  'Integrade One — plataforma de gestão patrimonial',
  'Suporte a RFID, QR-Code e código de barras',
]

export default function Sobre() {
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
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
            <span aria-hidden="true" className="h-px w-6" style={{ backgroundColor: BRONZE }} />
            Sobre nós
          </p>
          <h1 className="mt-5 max-w-3xl text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
            Especialistas em controle patrimonial e avaliações.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
            A Integrade Consulting é a frente do ecossistema Integrade especializada em controle
            patrimonial e avaliações — da elaboração de plaquetas ao software de gestão, com
            equipe própria em cada etapa.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta to="/contato">Fale com um especialista</Cta>
            <Cta to="/solucoes" variant="outline">Ver soluções</Cta>
          </div>
        </div>
      </section>

      {/* 2. NOSSA HISTÓRIA */}
      <section className="bg-slate-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                Nossa história
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                Desde {EMPRESA.fundacao}, simplificando a gestão patrimonial das empresas brasileiras
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Reunimos em um único parceiro as competências necessárias para o controle do
                patrimônio: identificação, tecnologia, contabilidade e avaliação de ativos.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Consolidamos uma metodologia própria que une hardware, software e serviços
                especializados, capaz de atender desde pequenas operações até grandes parques de
                ativos distribuídos por todo o país.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Nossa atuação é orientada por tecnologia de ponta — RFID, QR-Code e código de
                barras — e por um rigoroso padrão de qualidade técnica e contábil.
              </p>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_30px_70px_-42px_rgba(11,59,102,0.5)]">
              <img
                src="/images/fotos/armazem-800.webp"
                srcSet="/images/fotos/armazem-800.webp 800w, /images/fotos/armazem-1600.webp 1600w"
                sizes="(max-width: 1024px) 100vw, 480px"
                alt="Corredor de armazém com estantes de produtos identificados"
                width="800"
                height="600"
                className="h-full w-full object-cover"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 3. SOLUÇÃO COMPLETA */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Tile name="layers" />
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
                Ponta a ponta
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                Nossa solução completa
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                A Integrade desenvolve todos os serviços de controle patrimonial — sem a lacuna de
                trocar de fornecedor entre identificação, inventário, avaliação e sistema.
              </p>
              <div className="mt-6">
                <Cta to="/solucoes" variant="outline">Ver todas as soluções</Cta>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-3">
              {SOLUCAO_COMPLETA.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-700">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: AZUL }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. NOSSOS VALORES */}
      <section className="border-t border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              Como trabalhamos
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Nossos valores
            </h2>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v) => (
              <li key={v.titulo} className="rounded-2xl border border-slate-200 bg-white p-6">
                <Tile name={v.icon} />
                <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900">{v.titulo}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{v.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. ECOSSISTEMA */}
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
                A Integrade reúne competências em consultoria, tecnologia e serviços. A Integrade
                Consulting é a frente especializada em controle patrimonial e avaliações; o
                Integrade One é a plataforma de gestão de ativos do ecossistema.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Integrade Consulting', 'Integrade One · plataforma'].map((tag) => (
                  <span key={tag} className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEGMENTOS */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              Segmentos
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Segmentos que atendemos
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Organizações de diversos setores confiam na Integrade Consulting para controlar,
              avaliar e proteger seus ativos.
            </p>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SETORES.map((setor) => (
              <div key={setor} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4 text-sm text-slate-700">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: BRONZE }} />
                {setor}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/clientes"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:underline ${focus}`}
              style={{ color: AZUL }}
            >
              Ver todos os clientes por setor
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="border-t border-slate-100 px-5 py-16 sm:px-8 sm:py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: AZUL }}>
                Vamos conversar sobre o patrimônio da sua empresa?
              </h2>
              <p className="mt-3 text-slate-600">
                Fale com nossos especialistas e receba uma proposta personalizada para o seu
                parque de ativos.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Cta to="/contato" variant="bronze">Entrar em contato</Cta>
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
                <a href={mailtoComercial('Contato pelo site — Sobre')} className={`flex items-center gap-3 rounded-lg ${focus}`}>
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
