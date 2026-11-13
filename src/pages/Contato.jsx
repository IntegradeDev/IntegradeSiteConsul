import React, { useState } from 'react'
import { EMPRESA, mailtoComercial, whatsappComercial } from '../data/empresa.js'

/* Contato — mesmo padrão visual claro da Home e de Soluções.
   O formulário qualifica o lead (interesses + porte do parque) para o
   comercial já receber o pedido classificado. */

const AZUL = '#0B3B66'
const BRONZE = '#B08968'

const INTERESSES = [
  'Licitação / setor público',
  'Plaquetas e etiquetas',
  'Equipamentos',
  'Inventário',
  'Avaliação e laudos',
  'iFlow (sistema)',
  'Outsourcing',
]

const PORTES = [
  'Até 1.000 bens',
  'De 1.000 a 10.000 bens',
  'De 10.000 a 100.000 bens',
  'Mais de 100.000 bens',
  'Não sei informar',
]

const ICONS = {
  mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  phone:
    'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  pin: 'M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z',
  clock:
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.6 3.2 1.9-.8 1.3L11.5 13.5V7h1.5z',
  check: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
  chat: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',
}

function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d={ICONS[name]} />
    </svg>
  )
}

const focus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2'

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#0B3B66] focus:ring-2 focus:ring-[#0B3B66]/20'

const labelClass = 'mb-2 block text-sm font-medium text-slate-700'

function Canal({ icon, titulo, children }) {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B3B66]/[0.07] text-[#0B3B66]">
        <Icon name={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">{titulo}</p>
        <div className="mt-0.5 text-sm text-slate-600">{children}</div>
      </div>
    </div>
  )
}

export default function Contato() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    porte: '',
    mensagem: '',
  })
  const [interesses, setInteresses] = useState([])
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const toggleInteresse = (item) =>
    setInteresses((atual) =>
      atual.includes(item) ? atual.filter((i) => i !== item) : [...atual, item],
    )

  /* Sem backend de formulário ainda: abre o cliente de e-mail do visitante
     com a mensagem preenchida para comercial@. Trocar por um endpoint real
     (ex.: função serverless / CRM) quando disponível. */
  const handleSubmit = (e) => {
    e.preventDefault()
    const corpo = [
      `Nome: ${form.nome}`,
      `Empresa: ${form.empresa}`,
      `E-mail: ${form.email}`,
      `Telefone: ${form.telefone}`,
      `Interesses: ${interesses.join(', ') || '—'}`,
      `Porte do parque: ${form.porte || '—'}`,
      '',
      form.mensagem,
    ].join('\n')
    const foco = interesses.length ? ` [${interesses.join(' + ')}]` : ''
    const assunto = `Contato pelo site — ${form.empresa || form.nome}${foco}`
    window.location.href = `${mailtoComercial(assunto)}&body=${encodeURIComponent(corpo)}`
    setSent(true)
  }

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
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BRONZE }}>
            Fale com um especialista
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Vamos falar sobre o seu patrimônio
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
            Conte o seu cenário e receba uma proposta com o escopo certo — de um lote de etiquetas a
            uma operação completa de controle patrimonial com o iFlow.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={EMPRESA.telefoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#B08968] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a7556] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Icon name="phone" className="h-4 w-4" />
              Ligar {EMPRESA.telefone}
            </a>
            <a
              href={whatsappComercial('Olá! Quero falar com um especialista da Integrade.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe5b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Icon name="chat" className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={mailtoComercial('Contato pelo site')}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Icon name="mail" className="h-4 w-4" />
              {EMPRESA.email}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* CANAIS */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold" style={{ color: AZUL }}>
              Informações de contato
            </h2>
            <div className="mt-8 space-y-6">
              <Canal icon="phone" titulo="Telefone">
                <a href={EMPRESA.telefoneHref} className={`rounded hover:text-[#0B3B66] hover:underline ${focus}`}>
                  {EMPRESA.telefone}
                </a>
              </Canal>
              <Canal icon="chat" titulo="WhatsApp">
                <a
                  href={whatsappComercial('Olá! Quero falar com um especialista da Integrade.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded hover:text-[#0B3B66] hover:underline ${focus}`}
                >
                  {EMPRESA.whatsapp}
                </a>
              </Canal>
              <Canal icon="mail" titulo="E-mail comercial">
                <a href={`mailto:${EMPRESA.email}`} className={`break-all rounded hover:text-[#0B3B66] hover:underline ${focus}`}>
                  {EMPRESA.email}
                </a>
              </Canal>
              <Canal icon="pin" titulo="Endereço">
                <a
                  href={EMPRESA.mapaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded hover:text-[#0B3B66] hover:underline ${focus}`}
                >
                  {EMPRESA.endereco.linha1}
                  <br />
                  {EMPRESA.endereco.linha2}
                  <br />
                  CEP {EMPRESA.endereco.cep}
                </a>
                <p className="mt-1 text-xs text-slate-500">
                  Atendimento em todo o território nacional · desde {EMPRESA.fundacao} · participamos de licitações
                </p>
              </Canal>
              <Canal icon="clock" titulo="Horário">
                Segunda a sexta, das 8h às 18h
              </Canal>
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900">O que acontece depois</p>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                {[
                  'Um especialista entende o seu cenário e o seu parque de bens.',
                  'Montamos o escopo: produtos, serviços e software só no que faz sentido.',
                  'Você recebe a proposta comercial detalhada.',
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="font-bold" style={{ color: BRONZE }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* FORMULÁRIO */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              {sent ? (
                <div className="py-12 text-center" role="status">
                  <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon name="check" className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">Sua mensagem está pronta</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                    Abrimos o seu aplicativo de e-mail com a mensagem preenchida para{' '}
                    <strong>{EMPRESA.email}</strong>. É só clicar em enviar. Se ele não abriu, escreva
                    para esse endereço ou ligue para{' '}
                    <a href={EMPRESA.telefoneHref} className="font-semibold text-[#0B3B66] underline">
                      {EMPRESA.telefone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className={`mt-6 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 ${focus}`}
                  >
                    Voltar ao formulário
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold" style={{ color: AZUL }}>
                    Solicite uma proposta
                  </h2>

                  <fieldset>
                    <legend className={labelClass}>Tenho interesse em</legend>
                    <div className="flex flex-wrap gap-2">
                      {INTERESSES.map((item) => {
                        const ativo = interesses.includes(item)
                        return (
                          <button
                            key={item}
                            type="button"
                            aria-pressed={ativo}
                            onClick={() => toggleInteresse(item)}
                            className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${focus} ${
                              ativo
                                ? 'bg-[#0B3B66] text-white'
                                : 'border border-slate-300 bg-white text-slate-700 hover:border-[#0B3B66] hover:text-[#0B3B66]'
                            }`}
                          >
                            {item}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="c-nome" className={labelClass}>Nome*</label>
                      <input id="c-nome" type="text" name="nome" required autoComplete="name" value={form.nome} onChange={handleChange} placeholder="Seu nome" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="c-empresa" className={labelClass}>Empresa / órgão</label>
                      <input id="c-empresa" type="text" name="empresa" autoComplete="organization" value={form.empresa} onChange={handleChange} placeholder="Nome da empresa ou instituição" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="c-email" className={labelClass}>E-mail*</label>
                      <input id="c-email" type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="c-telefone" className={labelClass}>Telefone</label>
                      <input id="c-telefone" type="tel" name="telefone" autoComplete="tel" value={form.telefone} onChange={handleChange} placeholder="(00) 00000-0000" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-porte" className={labelClass}>Quantidade aproximada de bens</label>
                    <select id="c-porte" name="porte" value={form.porte} onChange={handleChange} className={inputClass}>
                      <option value="">Selecione</option>
                      {PORTES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="c-mensagem" className={labelClass}>Mensagem*</label>
                    <textarea
                      id="c-mensagem"
                      name="mensagem"
                      required
                      rows="5"
                      value={form.mensagem}
                      onChange={handleChange}
                      placeholder="Descreva sua necessidade: prazo, locais, tipo de bens, sistema atual…"
                      className={inputClass}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`w-full rounded-lg bg-[#0B3B66] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#093054] ${focus}`}
                  >
                    Enviar solicitação
                  </button>
                  <p className="text-xs text-slate-500">
                    Usamos seus dados apenas para responder a esta solicitação. Veja a{' '}
                    <a href="#/privacidade" className="underline hover:text-slate-700">política de privacidade</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
