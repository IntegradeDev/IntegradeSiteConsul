import React from 'react'
import { Link } from 'react-router-dom'

/* ============================================================================
   Privacidade.jsx
   ----------------------------------------------------------------------------
   Página criada para dar um destino válido ao link "Política de privacidade"
   exigido no formulário de contato (LGPD).

   IMPORTANTE: o texto jurídico definitivo precisa ser fornecido/aprovado pelo
   responsável legal da Integrade. Esta página NÃO inventa cláusulas, prazos,
   bases legais específicas nem dados de encarregado — apenas informa o estado
   atual e o canal de contato.
   ========================================================================== */

export default function Privacidade() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B08D57]">
        Integrade Consulting
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
        Política de privacidade
      </h1>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
        <strong className="font-semibold">Documento em aprovação.</strong> O texto jurídico completo
        desta política está em revisão pela área responsável da Integrade. Enquanto a versão final
        não for publicada, esta página existe apenas para informar o estado atual e o canal de
        contato.
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="text-base font-semibold text-slate-900">Quais dados o site coleta</h2>
          <p className="mt-2">
            O formulário de contato solicita apenas as informações necessárias para retorno
            comercial: nome, empresa, e-mail corporativo, telefone (opcional), área de interesse e
            uma mensagem breve. Nenhum dado sensível é solicitado.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Como o envio funciona hoje</h2>
          <p className="mt-2">
            O envio automático do formulário ainda não está conectado a um serviço de recebimento.
            Quando o envio não está disponível, o formulário exibe uma mensagem de erro explícita e
            nenhuma informação é transmitida ou armazenada.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Seus direitos</h2>
          <p className="mt-2">
            Para solicitar acesso, correção ou exclusão de dados, utilize os canais de contato
            oficiais da Integrade Consulting. Os prazos e procedimentos formais serão publicados
            junto com a versão aprovada desta política.
          </p>
        </section>
      </div>

      <Link
        to="/?s=contato"
        className="mt-10 inline-flex items-center rounded-lg bg-[#0B3B63] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#092F4F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3B63]"
      >
        Ir para o contato
      </Link>
    </article>
  )
}
