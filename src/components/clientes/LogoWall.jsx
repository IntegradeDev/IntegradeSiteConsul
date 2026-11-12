import ClientLogo from './ClientLogo';

/**
 * Grade de marcas: cada card mostra logotipo + nome da empresa.
 * Só recebe clientes que possuem logotipo — quem não tem nunca gera card.
 */
export default function LogoWall({ clientes, onFalha }) {
  if (!clientes.length) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {clientes.map((cliente) => (
        <li
          key={cliente.id}
          className="group flex min-h-[11rem] flex-col items-center justify-start gap-5 rounded-xl border border-gray-200 bg-white px-4 py-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
        >
          <div className="flex h-16 w-full items-center justify-center">
            <ClientLogo cliente={cliente} onFalha={onFalha} />
          </div>

          <p
            className="w-full text-center text-[13px] font-semibold leading-snug text-gray-700"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            title={cliente.nome}
          >
            {cliente.nome}
          </p>
        </li>
      ))}
    </ul>
  );
}
