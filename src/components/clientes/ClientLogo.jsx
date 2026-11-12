import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Monta a cadeia de fontes de logotipo, em ordem de prioridade:
 *   1. arquivo oficial no projeto (/public/images/clientes/...)
 *   2. Clearbit (logotipo da marca, PNG transparente)
 *   3. favicon do Google em 128px
 *   4. favicon via DuckDuckGo
 */
function montarFontes(cliente) {
  const fontes = [];

  if (cliente.logo) fontes.push(cliente.logo);

  if (cliente.dominio) {
    fontes.push(`https://logo.clearbit.com/${cliente.dominio}`);
    fontes.push(`https://www.google.com/s2/favicons?sz=128&domain=${cliente.dominio}`);
    fontes.push(`https://icons.duckduckgo.com/ip3/${cliente.dominio}.ico`);
  }

  return fontes;
}

/**
 * Renderiza o logotipo do cliente. Se todas as fontes falharem, avisa o pai
 * através de `onFalha(id)` para que a marca saia da grade e passe a aparecer
 * apenas como nome na lista — nunca como caixa vazia.
 */
export default function ClientLogo({ cliente, onFalha }) {
  const fontes = useMemo(() => montarFontes(cliente), [cliente]);
  const [indice, setIndice] = useState(0);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setIndice(0);
    setCarregado(false);
  }, [cliente.id]);

  const avancar = useCallback(() => {
    const proximo = indice + 1;

    if (proximo >= fontes.length) {
      onFalha?.(cliente.id);
      return;
    }

    setIndice(proximo);
  }, [indice, fontes.length, onFalha, cliente.id]);

  if (fontes.length === 0) return null;

  return (
    <img
      key={fontes[indice]}
      src={fontes[indice]}
      alt={`Logotipo de ${cliente.nome}`}
      loading="lazy"
      decoding="async"
      onError={avancar}
      onLoad={(evento) => {
        const imagem = evento.currentTarget;

        // Alguns provedores devolvem um ícone genérico minúsculo: trata como falha.
        if (imagem.naturalWidth < 40 && indice < fontes.length - 1) {
          avancar();
          return;
        }

        setCarregado(true);
      }}
      className={`max-h-16 w-auto max-w-[160px] object-contain transition-opacity duration-300 ${
        carregado ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
