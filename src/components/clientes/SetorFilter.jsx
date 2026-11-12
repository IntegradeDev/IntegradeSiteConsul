/**
 * Filtro discreto por setor. Não classifica marcas — apenas recorta a visão.
 */
export default function SetorFilter({ opcoes, ativo, onChange }) {
  if (!opcoes.length) return null;

  const base =
    'rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onChange('todos')}
        aria-pressed={ativo === 'todos'}
        className={`${base} ${
          ativo === 'todos'
            ? 'border-gray-900 bg-gray-900 text-white'
            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900'
        }`}
      >
        Todos
      </button>

      {opcoes.map((setor) => (
        <button
          key={setor}
          type="button"
          onClick={() => onChange(setor)}
          aria-pressed={ativo === setor}
          className={`${base} ${
            ativo === setor
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900'
          }`}
        >
          {setor}
        </button>
      ))}
    </div>
  );
}
