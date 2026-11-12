import React from 'react';

/**
 * Isola falhas por seção: se uma página quebrar, o cabeçalho e o rodapé
 * continuam de pé e o visitante vê um aviso visível — nunca uma tela branca.
 */
export default class SafeBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (typeof console !== 'undefined' && console.error) {
      console.error('[Integrade] Falha ao renderizar a seção:', error, info);
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08954]">Seção indisponível</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            Não foi possível carregar este conteúdo
          </h2>
          <p className="mt-3 text-slate-600">
            O restante do site continua funcionando. Use o menu acima ou volte à página inicial.
          </p>
          <a
            href="#/"
            className="mt-6 inline-flex items-center rounded-md bg-[#0B4F8F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#093f72] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2"
          >
            Ir para a página inicial
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
