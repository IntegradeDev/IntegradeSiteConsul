import { Component } from 'react'

/**
 * Captura erros de render de qualquer subarvore para que uma pagina
 * com problema nao derrube o site inteiro (tela branca).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { erro: null }
  }

  static getDerivedStateFromError(erro) {
    return { erro }
  }

  componentDidCatch(erro, info) {
    // eslint-disable-next-line no-console
    console.error('[Integrade] Erro de render capturado:', erro, info)
  }

  render() {
    if (this.state.erro) {
      return (
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Secao indisponivel
          </p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Nao foi possivel carregar esta area
          </h2>
          <p className="mt-3 text-gray-600">
            O restante do site continua funcionando normalmente. Tente recarregar a pagina.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ erro: null })}
            className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Tentar novamente
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
