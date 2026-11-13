import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { EMPRESA, mailtoComercial } from '../data/empresa.js'

/* ────────────────────────────────────────────────────────────────────────────
   Calculadora de depreciação — ferramenta gratuita (isca para o iFlow).
   Método linear (quotas constantes), mês a mês, a partir do mês de início de
   uso. Base depreciável = custo − valor residual (CPC 27).
   Taxas fiscais de referência: IN RFB nº 1.700/2017, Anexo III.
   Gatilhos: (1) "faça isso para todo o patrimônio" → demo iFlow;
             (2) vida útil fiscal ≠ econômica → laudo de avaliação;
             (3) receber a simulação por e-mail → contato comercial.
   ──────────────────────────────────────────────────────────────────────────── */

const AZUL = '#0B3B66'
const BRONZE = '#B08968'

const CATEGORIAS = [
  { id: 'edificacoes', nome: 'Edificações', taxa: 4 },
  { id: 'instalacoes', nome: 'Instalações', taxa: 10 },
  { id: 'maquinas', nome: 'Máquinas e equipamentos', taxa: 10 },
  { id: 'moveis', nome: 'Móveis e utensílios', taxa: 10 },
  { id: 'computadores', nome: 'Computadores e periféricos', taxa: 20 },
  { id: 'veiculos', nome: 'Veículos de passageiros', taxa: 20 },
  { id: 'caminhoes', nome: 'Caminhões e veículos de carga', taxa: 25 },
  { id: 'outro', nome: 'Outro (informar vida útil)', taxa: null },
]

const brl = (v) =>
  (Number.isFinite(v) ? v : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function hojeMes() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function mesesEntre(inicio, fim) {
  // conta o mês de início como 1º mês de depreciação, até o mês-base inclusive
  const [ai, mi] = inicio.split('-').map(Number)
  const [af, mf] = fim.split('-').map(Number)
  if (!ai || !mi || !af || !mf) return 0
  return (af - ai) * 12 + (mf - mi) + 1
}

/* Converte "12.345,67" ou "12345.67" em número. */
function parseValor(txt) {
  if (typeof txt !== 'string') return Number(txt) || 0
  const limpo = txt.replace(/[^\d,.-]/g, '')
  const normal = limpo.includes(',') ? limpo.replace(/\./g, '').replace(',', '.') : limpo
  const n = parseFloat(normal)
  return Number.isFinite(n) ? n : 0
}

export function calcular({ custo, residual, vidaAnos, inicio, base }) {
  const vidaMeses = Math.round(vidaAnos * 12)
  const depreciavel = Math.max(custo - residual, 0)
  const mensal = vidaMeses > 0 ? depreciavel / vidaMeses : 0
  const decorridos = Math.min(Math.max(mesesEntre(inicio, base), 0), vidaMeses)
  const acumulada = Math.min(mensal * decorridos, depreciavel)
  const liquido = custo - acumulada

  // cronograma anual (ano civil)
  const anos = []
  const [ai, mi] = inicio.split('-').map(Number)
  if (ai && mi && vidaMeses > 0) {
    let restante = vidaMeses
    let acum = 0
    let ano = ai
    let mesInicial = mi
    while (restante > 0 && anos.length < 60) {
      const mesesNoAno = Math.min(13 - mesInicial, restante)
      const dep = Math.min(mensal * mesesNoAno, depreciavel - acum)
      acum += dep
      anos.push({ ano, meses: mesesNoAno, dep, acum, liquido: custo - acum })
      restante -= mesesNoAno
      ano += 1
      mesInicial = 1
    }
  }

  return {
    vidaMeses,
    depreciavel,
    mensal,
    anual: mensal * 12,
    decorridos,
    acumulada,
    liquido,
    pct: depreciavel > 0 ? (acumulada / depreciavel) * 100 : 0,
    anos,
  }
}

const focus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2'
const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#0B3B66] focus:ring-2 focus:ring-[#0B3B66]/20'
const labelClass = 'mb-2 block text-sm font-medium text-slate-700'

function Resultado({ rotulo, valor, destaque }) {
  return (
    <div className={`rounded-xl p-4 ${destaque ? 'bg-[#0B3B66] text-white' : 'border border-slate-200 bg-white'}`}>
      <p className={`text-xs font-medium uppercase tracking-wide ${destaque ? 'text-slate-200' : 'text-slate-500'}`}>
        {rotulo}
      </p>
      <p className={`mt-1 text-lg font-bold tabular-nums sm:text-xl ${destaque ? 'text-white' : 'text-slate-900'}`}>
        {valor}
      </p>
    </div>
  )
}

export default function Calculadora() {
  const [categoria, setCategoria] = useState('maquinas')
  const [custoTxt, setCustoTxt] = useState('100.000,00')
  const [residualTxt, setResidualTxt] = useState('0,00')
  const [vidaTxt, setVidaTxt] = useState('10')
  const [inicio, setInicio] = useState('2022-01')
  const [base, setBase] = useState(hojeMes())
  const [mostrarTabela, setMostrarTabela] = useState(false)

  const cat = CATEGORIAS.find((c) => c.id === categoria)
  const vidaFiscal = cat?.taxa ? 100 / cat.taxa : null

  const escolherCategoria = (id) => {
    setCategoria(id)
    const c = CATEGORIAS.find((x) => x.id === id)
    if (c?.taxa) setVidaTxt(String(100 / c.taxa))
  }

  const custo = parseValor(custoTxt)
  const residual = parseValor(residualTxt)
  const vidaAnos = parseValor(vidaTxt)
  const valido = custo > 0 && vidaAnos > 0 && residual >= 0 && residual < custo && inicio && base

  const r = useMemo(
    () => calcular({ custo, residual, vidaAnos, inicio, base }),
    [custo, residual, vidaAnos, inicio, base],
  )

  const difereDoFiscal = vidaFiscal && Math.abs(vidaAnos - vidaFiscal) > 0.001

  const corpoEmail = [
    'Simulação feita na calculadora de depreciação do site:',
    '',
    `Categoria: ${cat?.nome}`,
    `Custo de aquisição: ${brl(custo)}`,
    `Valor residual: ${brl(residual)}`,
    `Vida útil: ${vidaAnos} anos`,
    `Início de uso: ${inicio} · Data-base: ${base}`,
    `Depreciação mensal: ${brl(r.mensal)}`,
    `Depreciação acumulada: ${brl(r.acumulada)}`,
    `Valor contábil líquido: ${brl(r.liquido)}`,
    '',
    'Gostaria de conversar sobre o controle do meu patrimônio.',
  ].join('\n')
  const hrefEmail = `${mailtoComercial('Calculadora de depreciação — quero falar com um especialista')}&body=${encodeURIComponent(corpoEmail)}`

  return (
    <div className="text-slate-900">
      {/* HERÓI */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: `linear-gradient(135deg, ${AZUL} 0%, #082C4D 60%, #061F36 100%)` }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BRONZE }}>
            Ferramenta gratuita
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Calculadora de depreciação
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Calcule a depreciação mensal, a acumulada e o valor contábil líquido de um bem pelo
            método linear, com as taxas fiscais de referência. Sem cadastro.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* ENTRADAS */}
          <form
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Dados do bem"
          >
            <h2 className="text-lg font-bold" style={{ color: AZUL }}>Dados do bem</h2>
            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="k-cat" className={labelClass}>Categoria</label>
                <select id="k-cat" value={categoria} onChange={(e) => escolherCategoria(e.target.value)} className={inputClass}>
                  {CATEGORIAS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}{c.taxa ? ` — ${c.taxa}% a.a.` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="k-custo" className={labelClass}>Custo de aquisição (R$)</label>
                <input id="k-custo" inputMode="decimal" value={custoTxt} onChange={(e) => setCustoTxt(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="k-res" className={labelClass}>Valor residual estimado (R$)</label>
                <input id="k-res" inputMode="decimal" value={residualTxt} onChange={(e) => setResidualTxt(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label htmlFor="k-vida" className={labelClass}>Vida útil (anos)</label>
                <input id="k-vida" inputMode="decimal" value={vidaTxt} onChange={(e) => setVidaTxt(e.target.value)} className={inputClass} />
                {vidaFiscal ? (
                  <p className="mt-1.5 text-xs text-slate-500">
                    Referência fiscal para a categoria: {vidaFiscal} anos ({cat.taxa}% a.a.).
                  </p>
                ) : null}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="k-ini" className={labelClass}>Início de uso</label>
                  <input id="k-ini" type="month" value={inicio} onChange={(e) => setInicio(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="k-base" className={labelClass}>Data-base</label>
                  <input id="k-base" type="month" value={base} onChange={(e) => setBase(e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          </form>

          {/* RESULTADOS */}
          <div className="lg:col-span-3" aria-live="polite">
            {valido ? (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Resultado rotulo="Depreciação mensal" valor={brl(r.mensal)} />
                  <Resultado rotulo="Depreciação anual" valor={brl(r.anual)} />
                  <Resultado rotulo={`Acumulada (${r.decorridos} de ${r.vidaMeses} meses)`} valor={brl(r.acumulada)} />
                  <Resultado rotulo="Valor contábil líquido" valor={brl(r.liquido)} destaque />
                </div>

                <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">Base depreciável consumida</span>
                    <span className="font-bold tabular-nums" style={{ color: AZUL }}>
                      {r.pct.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100" role="presentation">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(r.pct, 100)}%`, background: AZUL }} />
                  </div>
                  {r.pct >= 100 ? (
                    <p className="mt-3 text-sm text-slate-600">
                      Bem totalmente depreciado. Se ele segue em uso, vale revisar a vida útil e o valor
                      residual — o CPC 27 pede essa revisão ao menos ao fim de cada exercício.
                    </p>
                  ) : null}
                </div>

                {difereDoFiscal ? (
                  <div className="mt-5 rounded-xl border border-[#B08968]/40 bg-[#B08968]/[0.08] p-4 text-sm text-slate-700">
                    <strong className="text-slate-900">Vida útil diferente da fiscal.</strong> Usar a vida útil
                    econômica (CPC 27) em vez da taxa fiscal é correto, mas exige laudo que a sustente e
                    controle das diferenças entre o livro societário e o fiscal.{' '}
                    <a href={mailtoComercial('Laudo de vida útil econômica')} className="font-semibold text-[#0B3B66] underline">
                      Solicitar laudo de vida útil
                    </a>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => setMostrarTabela((v) => !v)}
                  aria-expanded={mostrarTabela}
                  className={`mt-5 text-sm font-semibold text-[#0B3B66] underline ${focus}`}
                >
                  {mostrarTabela ? 'Ocultar cronograma anual' : 'Ver cronograma anual'}
                </button>
                {mostrarTabela ? (
                  <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full min-w-[480px] text-sm tabular-nums">
                      <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                          <th className="px-4 py-3">Ano</th>
                          <th className="px-4 py-3">Meses</th>
                          <th className="px-4 py-3 text-right">Depreciação</th>
                          <th className="px-4 py-3 text-right">Acumulada</th>
                          <th className="px-4 py-3 text-right">Valor líquido</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {r.anos.map((a) => (
                          <tr key={a.ano}>
                            <td className="px-4 py-2.5 font-medium">{a.ano}</td>
                            <td className="px-4 py-2.5">{a.meses}</td>
                            <td className="px-4 py-2.5 text-right">{brl(a.dep)}</td>
                            <td className="px-4 py-2.5 text-right">{brl(a.acum)}</td>
                            <td className="px-4 py-2.5 text-right">{brl(a.liquido)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600">
                Informe custo maior que zero, valor residual menor que o custo e vida útil em anos para
                ver o cálculo.
              </div>
            )}

            {/* GATILHO iFLOW */}
            <div className="mt-8 rounded-2xl p-6 text-white sm:p-8" style={{ background: `linear-gradient(120deg, ${AZUL}, #12507F)` }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E3CDB6]">iFlow</p>
              <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                Um bem na calculadora. E os outros milhares?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">
                O iFlow calcula a depreciação de todo o patrimônio, mês a mês, com histórico de
                movimentações, baixas e transferências — e relatórios prontos para o fechamento.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/tecnologias"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0B3B66] hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Conhecer o iFlow
                </Link>
                <a
                  href={hrefEmail}
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Enviar esta simulação a um especialista
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-3xl text-xs leading-relaxed text-slate-500">
          <p>
            <strong className="text-slate-600">Como calculamos:</strong> método linear (quotas
            constantes). Base depreciável = custo de aquisição − valor residual. A depreciação começa
            no mês de início de uso e é contada até o mês da data-base, inclusive. Taxas de referência
            da IN RFB nº 1.700/2017 (Anexo III). Ferramenta de simulação: não substitui laudo técnico
            nem a orientação do seu contador. Dúvidas: {EMPRESA.telefone} · {EMPRESA.email}.
          </p>
        </div>
      </section>
    </div>
  )
}
