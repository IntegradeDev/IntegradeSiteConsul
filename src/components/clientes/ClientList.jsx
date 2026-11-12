import { useMemo } from 'react';
import { setores as ordemSetores } from '../../data/clientes';

/**
 * Lista editorial de organizações: apenas nomes, agrupados por setor.
 * Sem cards, sem caixas, sem placeholders.
 */
export default function ClientList({ clientes }) {
  const grupos = useMemo(() => {
    const mapa = new Map();

    clientes.forEach((cliente) => {
      if (!mapa.has(cliente.setor)) mapa.set(cliente.setor, []);
      mapa.get(cliente.setor).push(cliente);
    });

    const conhecidos = ordemSetores.filter((setor) => mapa.has(setor));
    const extras = [...mapa.keys()].filter((setor) => !ordemSetores.includes(setor));

    return [...conhecidos, ...extras].map((setor) => ({
      setor,
      itens: mapa.get(setor).slice().sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
    }));
  }, [clientes]);

  if (!grupos.length) return null;

  return (
    <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {grupos.map((grupo) => (
        <div key={grupo.setor}>
          <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
            {grupo.setor}
          </h4>

          <ul className="space-y-2.5">
            {grupo.itens.map((cliente) => (
              <li key={cliente.id} className="flex items-start gap-2.5 text-[15px] leading-snug text-gray-700">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gray-300" />
                <span>{cliente.nome}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
