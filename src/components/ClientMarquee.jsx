import ClientLogo from './ClientLogo'
import { CLIENTES_DESTAQUE } from '../data/clientes'

// Faixa rolante contínua ("trusted by"). A lista é duplicada para o loop ser
// invisível: a animação desloca exatamente -50% da largura total.
export default function ClientMarquee({ clientes = CLIENTES_DESTAQUE, velocidade = 55 }) {
  const lista = [...clientes, ...clientes]

  return (
    <div className="relative overflow-hidden py-2">
      <style>{`
        @keyframes integrade-marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .integrade-marquee-track {
          animation: integrade-marquee-scroll ${velocidade}s linear infinite;
          will-change: transform;
        }
        .integrade-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .integrade-marquee-track { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-neutral-950 to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-neutral-950 to-transparent sm:w-28" />

      <div className="integrade-marquee-track flex w-max items-center gap-10 sm:gap-14">
        {lista.map((cliente, i) => (
          <div
            key={`${cliente.nome}-${i}`}
            className="group flex h-10 w-32 shrink-0 items-center justify-center sm:w-36"
            aria-hidden={i >= clientes.length}
          >
            <ClientLogo cliente={cliente} tamanho="md" nomeVisivel={i < clientes.length} />
          </div>
        ))}
      </div>
    </div>
  )
}
