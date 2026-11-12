import React, { useEffect, useMemo, useState } from 'react';
import { assetCandidates } from '../lib/assetUrl.js';

/**
 * Logotipo oficial da Integrade Consulting.
 *
 * Os nomes abaixo foram copiados LITERALMENTE da listagem real de
 * `public/images/` (confirmados por listFiles), incluindo o sufixo `-branco`
 * usado sobre fundo escuro. Não há CDN nem provedor externo: só arquivo local.
 *
 * Ordem de tentativa:
 *   1. caminho base-aware (funciona sob /demonstracao/<uuid>/)
 *   2. caminho relativo explícito `./`
 *   3. caminho absoluto `/` (caso o site rode na raiz do domínio)
 *   4. variantes alternativas do mesmo logo
 *   5. wordmark tipográfico (último recurso, só se todos os arquivos falharem)
 */

const COLOR = [
  'images/Logo_integrade_Consulting-Horizontal.png',
  'images/Logo_integrade-Horizontal.png',
  'images/Logo_integrade_Consulting-Vertical.png',
];

const WHITE = [
  'images/Logo_integrade_Consulting-Horizontal-branco.png',
  'images/Logo_integrade-Horizontal-Branco.png',
  'images/Logo_integrade_Consulting-Vertical-branco.png',
];

export default function BrandLogo({
  variant = 'color',
  alt = 'Integrade Consulting',
  className = 'h-9 w-auto max-w-[210px]',
  showWordmarkOnError = true,
}) {
  const sources = useMemo(() => {
    const files = variant === 'white' ? WHITE : COLOR;
    const list = [];
    files.forEach((file) => {
      assetCandidates(file).forEach((url) => {
        if (!list.includes(url)) list.push(url);
      });
    });
    return list;
  }, [variant]);

  const [index, setIndex] = useState(0);

  // Se `sources` mudar (troca de variante), reinicia a tentativa.
  useEffect(() => {
    setIndex(0);
  }, [sources]);

  const exhausted = index >= sources.length;

  if (exhausted && !showWordmarkOnError) return null;

  if (exhausted) {
    return (
      <span
        className={
          variant === 'white'
            ? 'inline-flex items-baseline gap-1.5 font-semibold tracking-tight text-white'
            : 'inline-flex items-baseline gap-1.5 font-semibold tracking-tight text-[#0B4F8F]'
        }
      >
        <span className="text-lg leading-none">INTEGRADE</span>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] opacity-70">Consulting</span>
      </span>
    );
  }

  return (
    <img
      src={sources[index]}
      alt={alt}
      className={className}
      style={{ objectFit: 'contain' }}
      decoding="async"
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
