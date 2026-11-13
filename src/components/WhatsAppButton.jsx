import React from 'react'
import { useLocation } from 'react-router-dom'
import { whatsappComercial } from '../data/empresa.js'

/* Botão flutuante de WhatsApp — presente em todas as páginas.
   A mensagem inicial muda conforme a página, para o comercial saber
   de onde veio o contato. */
const MENSAGENS = {
  '/solucoes': 'Olá! Vi as soluções no site da Integrade e quero um orçamento.',
  '/tecnologias': 'Olá! Quero conhecer o iFlow e agendar uma demonstração.',
  '/calculadora-depreciacao': 'Olá! Usei a calculadora de depreciação e quero falar sobre o controle do meu patrimônio.',
  '/contato': 'Olá! Quero falar com um especialista da Integrade.',
}
const PADRAO = 'Olá! Vim pelo site da Integrade e gostaria de falar sobre controle patrimonial.'

export default function WhatsAppButton() {
  const { pathname } = useLocation()
  const href = whatsappComercial(MENSAGENS[pathname] || PADRAO)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Integrade pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition hover:bg-[#1ebe5b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-5"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 shrink-0">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.6 23.3l5.7-1.5a11.33 11.33 0 0 0 5.74 1.47h.01c6.26 0 11.36-5.1 11.37-11.36 0-3.04-1.18-5.89-3.33-8.04z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:inline">Fale pelo WhatsApp</span>
    </a>
  )
}
