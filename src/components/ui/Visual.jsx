import React, { useState } from 'react'

/* ============================================================================
   Camada visual local — composições em SVG.
   Não dependem de rede: são o fallback obrigatório de qualquer fotografia e
   podem ser usadas sozinhas. Nenhuma delas simula captura de tela do iFlow.
   Nenhum número, gráfico com dado fictício ou pessoa genérica é representado.
   ============================================================================ */

const AZUL_900 = '#0B3A5F'
const AZUL_700 = '#0B4F8F'
const BRONZE = '#A67C3D'

/* ---------------------------------------------------------------- HERO ----- */
export function HeroComposition({ className = '' }) {
  return (
    <svg
      viewBox="0 0 800 620"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Composição gráfica conceitual de ativos: galpões industriais, guindaste de porto, contêineres, torre de utilidades e painel de dados"
    >
      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0E4468" />
          <stop offset="52%" stopColor={AZUL_900} />
          <stop offset="100%" stopColor="#072A44" />
        </linearGradient>
        <pattern id="hero-grid" width="46" height="46" patternUnits="userSpaceOnUse">
          <path d="M46 0H0V46" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <linearGradient id="hero-chao" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#061F33" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#041726" stopOpacity="0.92" />
        </linearGradient>
      </defs>

      <rect width="800" height="620" fill="url(#hero-bg)" />
      <rect width="800" height="620" fill="url(#hero-grid)" />

      {/* torre de utilidades */}
      <ellipse cx="106" cy="182" rx="33" ry="25" fill="#0B3350" />
      <rect x="99" y="196" width="14" height="240" fill="#0B3350" />
      <path d="M80 196h52" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="2" />

      {/* galpões */}
      <g fill="#07293F">
        <path d="M170 436V352l76-42 76 42v84z" />
        <path d="M330 436V368l58-32 58 32v68z" />
      </g>
      <g stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.5" fill="none">
        <path d="M170 392h152M246 310v126" />
        <path d="M330 400h116M388 336v100" />
      </g>

      {/* contêineres */}
      <g fill="#0B3350">
        <rect x="466" y="392" width="122" height="44" rx="3" />
        <rect x="466" y="348" width="122" height="44" rx="3" />
        <rect x="598" y="392" width="122" height="44" rx="3" />
      </g>
      <g stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1">
        <path d="M486 392v44M506 392v44M526 392v44M546 392v44M566 392v44" />
        <path d="M486 348v44M506 348v44M526 348v44M546 348v44M566 348v44" />
        <path d="M618 392v44M638 392v44M658 392v44M678 392v44M698 392v44" />
      </g>

      {/* guindaste */}
      <g stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M700 436V196" />
        <path d="M704 200h84" />
        <path d="M778 200v54" />
      </g>
      <rect x="774" y="254" width="10" height="16" fill={BRONZE} opacity="0.9" />

      {/* chão */}
      <rect y="436" width="800" height="184" fill="url(#hero-chao)" />
      <path d="M0 436h800" stroke={BRONZE} strokeOpacity="0.5" strokeWidth="2" />

      {/* painel de dados — sem números */}
      <g>
        <rect
          x="536"
          y="58"
          width="222"
          height="122"
          rx="10"
          fill="#FFFFFF"
          fillOpacity="0.07"
          stroke="#FFFFFF"
          strokeOpacity="0.18"
        />
        <g fill="#FFFFFF" fillOpacity="0.26">
          <rect x="556" y="80" width="102" height="8" rx="4" />
          <rect x="556" y="102" width="150" height="8" rx="4" />
          <rect x="556" y="124" width="126" height="8" rx="4" />
          <rect x="556" y="146" width="86" height="8" rx="4" />
        </g>
        <circle cx="734" cy="84" r="5" fill={BRONZE} />
      </g>
    </svg>
  )
}

/* ---------------------------------------------------------- AVALIAÇÃO ----- */
function AvaliacaoComposition({ className = '' }) {
  return (
    <svg
      viewBox="0 0 800 620"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Composição gráfica conceitual de avaliação técnica: edificação em corte com linhas de cota, grid de medição e curvas de referência"
    >
      <defs>
        <linearGradient id="aval-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F4A70" />
          <stop offset="100%" stopColor="#072A44" />
        </linearGradient>
        <pattern id="aval-grid" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0H0V34" fill="none" stroke="#FFFFFF" strokeOpacity="0.09" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="620" fill="url(#aval-bg)" />
      <rect width="800" height="620" fill="url(#aval-grid)" />

      <g stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2.5" fill="none">
        <rect x="196" y="206" width="408" height="278" rx="4" />
        <path d="M196 296h408M196 384h408M330 206v278M470 206v278" />
      </g>

      <g stroke={BRONZE} strokeOpacity="0.85" strokeWidth="2">
        <path d="M196 164h408" />
        <path d="M196 152v24M604 152v24" />
      </g>

      <g stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.5" fill="none" strokeDasharray="6 8">
        <path d="M96 520h608" />
        <path d="M96 486h608" />
      </g>
      <circle cx="196" cy="486" r="6" fill={BRONZE} />
      <circle cx="604" cy="486" r="6" fill={BRONZE} />
    </svg>
  )
}

/* -------------------------------------------------------------- PORTO ----- */
function PortoComposition({ className = '' }) {
  return (
    <svg
      viewBox="0 0 800 620"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Composição gráfica conceitual de operação portuária: guindaste de pórtico, contêineres empilhados e linha d'água"
    >
      <defs>
        <linearGradient id="porto-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0E4468" />
          <stop offset="100%" stopColor="#05243A" />
        </linearGradient>
        <pattern id="porto-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="800" height="620" fill="url(#porto-bg)" />
      <rect width="800" height="620" fill="url(#porto-grid)" />

      {/* pórtico */}
      <g stroke="#FFFFFF" strokeOpacity="0.42" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M240 470V214M560 470V214" />
        <path d="M200 214h400" />
        <path d="M200 214l-46 62M600 214l46 62" />
        <path d="M400 214v96" />
      </g>
      <rect x="388" y="310" width="24" height="20" fill={BRONZE} opacity="0.9" />

      {/* pilhas de contêineres */}
      <g fill="#0B3350">
        <rect x="120" y="410" width="128" height="46" rx="3" />
        <rect x="120" y="362" width="128" height="46" rx="3" />
        <rect x="256" y="410" width="128" height="46" rx="3" />
        <rect x="520" y="410" width="128" height="46" rx="3" />
        <rect x="656" y="410" width="112" height="46" rx="3" />
        <rect x="656" y="362" width="112" height="46" rx="3" />
      </g>
      <g stroke="#FFFFFF" strokeOpacity="0.11" strokeWidth="1">
        <path d="M142 410v46M164 410v46M186 410v46M208 410v46M230 410v46" />
        <path d="M278 410v46M300 410v46M322 410v46M344 410v46M366 410v46" />
        <path d="M678 362v94M700 362v94M722 362v94M744 362v94" />
      </g>

      {/* linha d'água */}
      <rect y="456" width="800" height="164" fill="#041C2C" fillOpacity="0.85" />
      <g stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="2" strokeLinecap="round">
        <path d="M40 512h96M200 512h96M360 512h96M520 512h96M680 512h80" />
        <path d="M120 552h120M320 552h120M520 552h120" />
      </g>
      <path d="M0 456h800" stroke={BRONZE} strokeOpacity="0.45" strokeWidth="2" />
    </svg>
  )
}

export function EditorialPanel({ variant = 'industrial', className = '' }) {
  if (variant === 'avaliacao') return <AvaliacaoComposition className={className} />
  if (variant === 'porto') return <PortoComposition className={className} />
  return <HeroComposition className={className} />
}

/* ------------------------------------------------- FOTO + FALLBACK LOCAL -- */
/* As fotografias são de banco livre e servem apenas como apoio visual.
   DEVEM ser substituídas por fotografias autorizadas dos ativos reais.
   Se a rede bloquear a imagem, a composição SVG local assume (sem buraco). */
export function PhotoFrame({
  src,
  alt = '',
  variant = 'industrial',
  className = '',
  imgClassName = '',
}) {
  const [falhou, setFalhou] = useState(false)
  const mostrarImagem = Boolean(src) && !falhou

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#E8EDF3] bg-[#0B3A5F] ${className}`}
    >
      {mostrarImagem ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFalhou(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <EditorialPanel variant={variant} className="h-full w-full" />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B3A5F]/70 via-[#0B3A5F]/20 to-transparent"
      />
    </div>
  )
}

/* ------------------------------------------- DIAGRAMA CONCEITUAL iFLOW --- */
/* Diagrama esquemático. NÃO representa a interface do iFlow. */
export function AssetDiagram({ className = '' }) {
  const no = (x, y, w, h, label) => (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill="#FFFFFF"
        stroke="#CBD8E6"
        strokeWidth="1.5"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 5}
        textAnchor="middle"
        fontSize="15"
        fill="#0F172A"
        fontWeight="500"
      >
        {label}
      </text>
    </g>
  )

  return (
    <svg
      viewBox="0 0 900 520"
      className={className}
      role="img"
      aria-label="Diagrama conceitual: o iFlow no centro, conectado a patrimônio e bens móveis, gestão contábil patrimonial, bens imóveis, manutenção de ativos, projetos e interfaces com outros ERPs"
    >
      <defs>
        <linearGradient id="diag-nucleo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={AZUL_700} />
          <stop offset="100%" stopColor={AZUL_900} />
        </linearGradient>
      </defs>

      <g stroke="#C3D2E2" strokeWidth="1.8" strokeDasharray="6 7" fill="none">
        <path d="M450 228V64" />
        <path d="M375 258L240 166" />
        <path d="M375 286L240 378" />
        <path d="M525 258L660 166" />
        <path d="M525 286L660 378" />
        <path d="M450 308V430" />
      </g>

      <g>
        <rect x="330" y="18" width="240" height="46" rx="10" fill="#EAF1F8" stroke="#CBD8E6" strokeWidth="1.5" />
        <text x="450" y="47" textAnchor="middle" fontSize="14" fill="#0B3A5F" fontWeight="500">
          Interfaces com outros ERPs
        </text>
      </g>

      <rect x="375" y="228" width="150" height="80" rx="14" fill="url(#diag-nucleo)" />
      <text x="450" y="262" textAnchor="middle" fontSize="24" fill="#FFFFFF" fontWeight="700">
        iFlow
      </text>
      <text x="450" y="286" textAnchor="middle" fontSize="12" fill="#BFD4E6">
        gestão de ativos
      </text>

      {no(30, 140, 210, 52, 'Patrimônio e bens móveis')}
      {no(30, 352, 210, 52, 'Gestão contábil patrimonial')}
      {no(660, 140, 210, 52, 'Bens imóveis')}
      {no(660, 352, 210, 52, 'Manutenção de ativos')}
      {no(345, 430, 210, 52, 'Projetos')}
    </svg>
  )
}

/* ------------------------------------------------ FAIXA DA JORNADA -------- */
export function JourneyBand({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 80"
      className={className}
      role="img"
      aria-label="Faixa gráfica representando uma linha de continuidade entre as etapas da jornada"
    >
      <defs>
        <linearGradient id="jornada-linha" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C3D2E2" />
          <stop offset="50%" stopColor={AZUL_700} />
          <stop offset="100%" stopColor={BRONZE} />
        </linearGradient>
      </defs>
      <path d="M20 40h1160" stroke="url(#jornada-linha)" strokeWidth="2" strokeDasharray="8 10" />
      {[20, 305, 590, 875, 1160].map((x) => (
        <circle key={x} cx={x} cy="40" r="6" fill="#FFFFFF" stroke={AZUL_900} strokeWidth="2" />
      ))}
    </svg>
  )
}
