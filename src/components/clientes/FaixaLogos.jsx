import React from 'react';
import { asset } from '../../lib/assetUrl.js';
import { DESTAQUES } from '../../data/marcas.js';

/**
 * Faixa rolante de logos de clientes (Home). Só usa marcas com arquivo de
 * logo. A lista é duplicada para o loop contínuo; a cópia fica oculta para
 * leitores de tela. Pausa no hover e respeita prefers-reduced-motion.
 */
export default function FaixaLogos() {
  const marcas = DESTAQUES.filter((m) => m.logo);
  if (!marcas.length) return null;

  const item = (m, copia) => (
    <li key={`${copia ? 'b' : 'a'}-${m.nome}`} className="flex shrink-0 items-center px-7 sm:px-10" aria-hidden={copia || undefined}>
      <img
        src={asset(m.logo)}
        alt={copia ? '' : m.nome}
        title={m.nome}
        loading="lazy"
        decoding="async"
        className="h-10 w-auto max-w-[130px] object-contain opacity-75 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
      />
    </li>
  );

  return (
    <div className="faixa-logos group relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
      <ul className="faixa-logos-trilho flex w-max items-center">
        {marcas.map((m) => item(m, false))}
        {marcas.map((m) => item(m, true))}
      </ul>
    </div>
  );
}
