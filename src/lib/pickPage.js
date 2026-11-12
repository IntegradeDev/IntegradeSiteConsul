import React from 'react';

/**
 * IMPORTANTE: este arquivo é `.js`, não `.jsx`. Portanto NÃO pode conter JSX —
 * o Vite só transpila JSX em arquivos `.jsx`. Por isso o fallback é criado com
 * React.createElement. (Uma versão anterior deste arquivo tinha JSX aqui e
 * quebrou o build do Hub com Internal Server Error.)
 *
 * Algumas páginas do repositório original podem usar `export default` e outras
 * `export function Nome()`. Como não consigo ler os arquivos (a API de leitura
 * do Hub devolve a tela de login), este resolvedor aceita os dois formatos em
 * vez de quebrar a rota inteira por causa de um export diferente.
 */

function criarPaginaIndisponivel(name) {
  return function PaginaIndisponivel() {
    return React.createElement(
      'div',
      { className: 'mx-auto max-w-3xl px-4 py-24 text-center' },
      React.createElement(
        'p',
        { className: 'text-xs font-semibold uppercase tracking-[0.2em] text-[#B08954]' },
        'Conteúdo'
      ),
      React.createElement(
        'h2',
        { className: 'mt-3 text-2xl font-semibold text-slate-900' },
        `${name || 'Página'} indisponível`
      ),
      React.createElement(
        'p',
        { className: 'mt-3 text-slate-600' },
        'Não foi possível carregar esta página agora. Use o menu para continuar navegando.'
      ),
      React.createElement(
        'a',
        {
          href: '#/',
          className:
            'mt-6 inline-flex items-center rounded-md bg-[#0B4F8F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#093f72]',
        },
        'Voltar para a página inicial'
      )
    );
  };
}

export function pickPage(mod, name) {
  if (!mod) return criarPaginaIndisponivel(name);

  if (typeof mod.default === 'function') return mod.default;
  if (mod[name] && typeof mod[name] === 'function') return mod[name];
  if (mod.Page && typeof mod.Page === 'function') return mod.Page;

  const keys = Object.keys(mod);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (/^[A-Z]/.test(key) && typeof mod[key] === 'function') return mod[key];
  }

  return criarPaginaIndisponivel(name);
}

export default pickPage;
