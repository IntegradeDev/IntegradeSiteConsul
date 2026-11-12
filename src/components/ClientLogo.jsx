import { useEffect, useMemo, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// ClientLogo
//
// Renderiza SEMPRE uma imagem de logo, em três camadas:
//   1. logo arquivo local (`cliente.logo`)  — se existir, tem prioridade
//   2. logo remoto por domínio (Clearbit → favicon Google 128px)
//   3. monograma tipográfico (fallback garantido, nunca exibe imagem quebrada)
//
// Qualquer falha de rede/404/hotlink bloqueado cai automaticamente para a
// camada seguinte via onError — o card nunca mostra ícone de imagem quebrada.
// ─────────────────────────────────────────────────────────────────────────────

const PALAVRAS_IGNORADAS = new Set([
  'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'a', 'o', 'as', 'os',
  'para', 'com', 'the', 'of', 'grupo', 'fundacao', 'fundação',
])

export function iniciaisDoNome(nome = '', max = 3) {
  const limpo = String(nome)
    .replace(/\(.*?\)/g, ' ')
    .replace(/[-–—/.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const palavras = limpo.split(' ').filter(Boolean)
  if (palavras.length === 0) return '?'

  const relevantes = palavras.filter((p) => !PALAVRAS_IGNORADAS.has(p.toLowerCase()))
  const base = relevantes.length > 0 ? relevantes : palavras

  const letras = base.slice(0, max).map((p) => p[0])
  return letras.join('').toUpperCase()
}

function MontarUrlFonte(dominio) {
  const fontes = []
  if (!dominio) return fontes
  fontes.push(`https://logo.clearbit.com/${dominio}`)
  fontes.push(`https://www.google.com/s2/favicons?domain=${dominio}&sz=128`)
  return fontes
}

const TAMANHOS = {
  sm: { caixa: 'h-8', img: 'max-h-8', texto: 'text-[10px]' },
  md: { caixa: 'h-12', img: 'max-h-12', texto: 'text-sm' },
  lg: { caixa: 'h-16', img: 'max-h-16', texto: 'text-base' },
}

function Monograma({ nome, tamanho, destaque }) {
  const t = TAMANHOS[tamanho] ?? TAMANHOS.md
  const letras = iniciaisDoNome(nome)

  return (
    <span
      aria-hidden="true"
      className={[
        'inline-flex items-center justify-center rounded-lg border border-white/15',
        'bg-gradient-to-br from-white/[0.14] via-white/[0.06] to-white/[0.02]',
        'font-semibold tracking-tight text-white/85 shadow-sm',
        destaque ? 'ring-1 ring-emerald-400/25' : '',
        t.caixa,
        letras.length > 2 ? 'min-w-[3.25rem] px-2' : 'w-11',
        t.texto,
      ].filter(Boolean).join(' ')}
    >
      {letras}
    </span>
  )
}

export default function ClientLogo({
  cliente,
  tamanho = 'md',
  colorido = false,
  className = '',
  nomeVisivel = true,
}) {
  const nome = cliente?.nome ?? ''
  const dominio = cliente?.dominio ?? null
  const logoLocal = cliente?.logo ?? null
  const ehDestaque = Boolean(cliente?.destaque)

  const fontes = useMemo(() => MontarUrlFonte(dominio), [dominio])

  const [indice, setIndice] = useState(0)
  const [esgotado, setEsgotado] = useState(false)

  // novo cliente => recomeça a cadeia de fontes
  useEffect(() => {
    setIndice(0)
    setEsgotado(false)
  }, [nome, dominio])

  const t = TAMANHOS[tamanho] ?? TAMANHOS.md

  const avancar = () => {
    setIndice((atual) => {
      if (atual + 1 >= fontes.length) {
        setEsgotado(true)
        return atual
      }
      return atual + 1
    })
  }

  // ícone genérico devolvido com dimensão irrisória = considerar falha
  const validarDimensao = (event) => {
    const img = event.currentTarget
    if (!img.naturalWidth || img.naturalWidth < 32) avancar()
  }

  const classeCor = colorido
    ? 'opacity-90 group-hover:opacity-100'
    : 'opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0'

  if (logoLocal) {
    return (
      <img
        src={logoLocal}
        alt={nomeVisivel ? `Logo ${nome}` : ''}
        title={nome}
        loading="lazy"
        decoding="async"
        onError={avancar}
        className={[
          'w-auto max-w-[92%] object-contain',
          'transition duration-300',
          t.img,
          classeCor,
          className,
        ].join(' ')}
      />
    )
  }

  if (!esgotado && fontes.length > 0 && indice < fontes.length) {
    return (
      <img
        src={fontes[indice]}
        alt={nomeVisivel ? `Logo ${nome}` : ''}
        title={nome}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={avancar}
        onLoad={validarDimensao}
        className={[
          'w-auto max-w-[92%] object-contain',
          'transition duration-300',
          t.img,
          classeCor,
          className,
        ].join(' ')}
      />
    )
  }

  return <Monograma nome={nome} tamanho={tamanho} destaque={ehDestaque} />
}
