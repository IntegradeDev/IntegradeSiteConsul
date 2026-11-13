/* Dados institucionais — fonte única para rodapé, Soluções e Contato.
   Endereço conforme cadastro do CNPJ 12.886.951/0001-99 (Receita Federal). */

export const EMPRESA = {
  razaoSocial:
    'Integrade Soluções de Informática, Controle Patrimonial e Avaliações Ltda.',
  cnpj: '12.886.951/0001-99',
  telefone: '(11) 5081-5001',
  telefoneHref: 'tel:+551150815001',
  email: 'comercial@integrade.com.br',
  fundacao: 2010,
  whatsapp: '(11) 5081-5001',
  whatsappHref: `https://wa.me/551150815001?text=${encodeURIComponent(
    'Olá! Vim pelo site da Integrade e gostaria de falar sobre controle patrimonial.',
  )}`,
  endereco: {
    linha1: 'Av. Dr. Chucri Zaidan, 1649 — Conj. 242',
    linha2: 'Vila São Francisco — São Paulo/SP',
    cep: '04711-130',
  },
  mapaHref:
    'https://www.google.com/maps/search/?api=1&query=Av.+Dr.+Chucri+Zaidan,+1649,+S%C3%A3o+Paulo,+SP,+04711-130',
}

/* Link de WhatsApp com mensagem pré-preenchida por contexto (ex.: página). */
export function whatsappComercial(mensagem) {
  return `https://wa.me/551150815001?text=${encodeURIComponent(mensagem)}`
}

/* mailto com assunto pré-preenchido — cada CTA chega ao comercial já
   classificado (ex.: "Orçamento — Plaquetas"), facilitando a triagem. */
export function mailtoComercial(assunto) {
  return `mailto:${EMPRESA.email}?subject=${encodeURIComponent(assunto)}`
}
