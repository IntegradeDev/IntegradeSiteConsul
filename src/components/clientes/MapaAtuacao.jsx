import React, { useMemo, useState } from 'react';
import { ESTADOS, MAPA_VIEWBOX, projetar } from '../../data/brasilMapa.js';
import { LOCALIDADES, REGIOES, regiaoDe } from '../../data/atuacao.js';

const AZUL = '#0B4F8F';
const OURO = '#B08954';

/** Siglas pequenas demais para receber rótulo dentro do contorno. */
const SEM_ROTULO = new Set(['DF', 'SE', 'AL', 'PB', 'RN', 'PE', 'ES', 'RJ']);

/** Intensidade do preenchimento conforme o número de organizações no estado. */
function corDoEstado(qtd) {
  if (!qtd) return '#E8EDF3';
  if (qtd >= 10) return AZUL;
  if (qtd >= 4) return '#2F6FAE';
  return '#6E9CCB';
}

export default function MapaAtuacao() {
  const [ativo, setAtivo] = useState(null);

  const porUF = useMemo(() => {
    const mapa = {};
    LOCALIDADES.forEach((loc) => {
      if (!mapa[loc.uf]) mapa[loc.uf] = { localidades: [], total: 0 };
      mapa[loc.uf].localidades.push(loc);
      mapa[loc.uf].total += loc.clientes.length;
    });
    return mapa;
  }, []);

  const ufsAtendidas = Object.keys(porUF);
  const regioesAtendidas = Object.keys(REGIOES).filter((r) => REGIOES[r].some((uf) => porUF[uf]));
  const nomeUF = (uf) => ESTADOS.find((e) => e.uf === uf)?.nome || uf;

  const selecionar = (uf) => setAtivo(porUF[uf] ? uf : null);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      {/* TEXTO + PAINEL */}
      <div className="order-2 lg:order-1">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08954]">Presença nacional</p>
        <h2 id="mapa" className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          Do Amazonas ao Rio Grande do Sul
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          Nossas equipes de inventário e avaliação se deslocam para qualquer município do país. Já
          realizamos projetos em <strong className="font-semibold text-slate-900">{ufsAtendidas.length} unidades da federação</strong>,
          nas <strong className="font-semibold text-slate-900">{regioesAtendidas.length} regiões</strong> — de
          capitais e grandes estatais a prefeituras do interior.
        </p>

        <dl className="mt-8 grid grid-cols-3 divide-x divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {[
            ['Estados + DF', ufsAtendidas.length],
            ['Municípios', LOCALIDADES.length],
            ['Regiões', `${regioesAtendidas.length}/5`],
          ].map(([rotulo, valor]) => (
            <div key={rotulo} className="px-4 py-4 text-center">
              <dd className="text-2xl font-semibold text-[#0B4F8F] sm:text-3xl">{valor}</dd>
              <dt className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">{rotulo}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-6 min-h-[15rem] rounded-xl border border-slate-200 bg-slate-50/70 p-5" aria-live="polite">
          {ativo ? (
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {nomeUF(ativo)} <span className="font-normal text-slate-400">· {regiaoDe(ativo)}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setAtivo(null)}
                  className="text-xs font-medium text-slate-500 hover:text-[#0B4F8F]"
                >
                  Ver resumo
                </button>
              </div>
              <ul className="mt-4 space-y-3">
                {porUF[ativo].localidades.map((loc) => (
                  <li key={loc.cidade}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#B08954]">{loc.cidade}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-700">{loc.clientes.join(' · ')}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Atuação por região</h3>
              <p className="mt-1 text-xs text-slate-500">Passe o cursor ou toque em um estado para ver os projetos.</p>
              <ul className="mt-4 space-y-3">
                {Object.keys(REGIOES).map((regiao) => {
                  const ufs = REGIOES[regiao].filter((uf) => porUF[uf]);
                  return (
                    <li key={regiao} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="w-28 shrink-0 text-sm font-medium text-slate-800">{regiao}</span>
                      <span className="flex flex-wrap gap-1.5">
                        {ufs.map((uf) => (
                          <button
                            key={uf}
                            type="button"
                            onClick={() => selecionar(uf)}
                            className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#0B4F8F] transition hover:border-[#0B4F8F]"
                          >
                            {uf}
                          </button>
                        ))}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* MAPA */}
      <figure className="order-1 lg:order-2">
        <svg
          viewBox={MAPA_VIEWBOX}
          role="img"
          aria-labelledby="mapa-titulo"
          className="mx-auto h-auto w-full max-w-[640px]"
          onMouseLeave={() => setAtivo(null)}
        >
          <title id="mapa-titulo">
            Mapa do Brasil destacando os {ufsAtendidas.length} estados onde a Integrade já realizou projetos
          </title>

          <g>
            {ESTADOS.map((estado) => {
              const dados = porUF[estado.uf];
              const destacado = ativo === estado.uf;
              return (
                <path
                  key={estado.uf}
                  d={estado.d}
                  fill={destacado ? OURO : corDoEstado(dados?.total)}
                  stroke="#fff"
                  strokeWidth={1.2}
                  strokeLinejoin="round"
                  tabIndex={dados ? 0 : -1}
                  aria-label={dados ? `${estado.nome}: ${dados.total} organizações atendidas` : estado.nome}
                  onMouseEnter={() => selecionar(estado.uf)}
                  onFocus={() => selecionar(estado.uf)}
                  onClick={() => selecionar(estado.uf)}
                  className={`outline-none transition-[fill] duration-200 ${dados ? 'cursor-pointer' : ''}`}
                />
              );
            })}
          </g>

          <g pointerEvents="none">
            {ESTADOS.filter((e) => !SEM_ROTULO.has(e.uf)).map((estado) => (
              <text
                key={estado.uf}
                x={estado.cx}
                y={estado.cy}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.06em"
                fill={porUF[estado.uf] ? 'rgba(255,255,255,0.85)' : '#94A3B8'}
              >
                {estado.uf}
              </text>
            ))}
          </g>

          <g pointerEvents="none">
            {LOCALIDADES.map((loc) => {
              const [x, y] = projetar(loc.coord[0], loc.coord[1]);
              const r = 4.5 + Math.min(5, (Math.sqrt(loc.clientes.length) - 1) * 2);
              const realce = ativo === loc.uf;
              return (
                <g key={`${loc.uf}-${loc.cidade}`}>
                  {loc.clientes.length >= 5 ? (
                    <circle cx={x} cy={y} r={r + 5} fill={OURO} opacity="0.25" className="mapa-pulso" />
                  ) : null}
                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={realce ? AZUL : OURO}
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </g>
        </svg>

        <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ background: AZUL }} /> 10+ organizações
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ background: '#2F6FAE' }} /> 4–9
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ background: '#6E9CCB' }} /> 1–3
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full border border-white" style={{ background: OURO }} /> Município com projeto
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
