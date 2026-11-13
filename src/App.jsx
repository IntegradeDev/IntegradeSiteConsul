import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';

import BrandLogo from './components/BrandLogo.jsx';
import SafeBoundary from './components/SafeBoundary.jsx';
import { pickPage } from './lib/pickPage.js';
import { EMPRESA } from './data/empresa.js';
import WhatsAppButton from './components/WhatsAppButton.jsx';

/* Páginas resolvidas de forma tolerante: aceita `export default` ou
   `export function Nome()`. Se uma página não resolver, a rota mostra um
   aviso visível em vez de derrubar o aplicativo. */
import * as HomeModule from './pages/Home.jsx';
import * as SobreModule from './pages/Sobre.jsx';
import * as SolucoesModule from './pages/Solucoes.jsx';
import * as ClientesModule from './pages/Clientes.jsx';
import * as TecnologiasModule from './pages/Tecnologias.jsx';
import * as ContatoModule from './pages/Contato.jsx';
import * as PrivacidadeModule from './pages/Privacidade.jsx';
import * as CalculadoraModule from './pages/Calculadora.jsx';

const Home = pickPage(HomeModule, 'Home');
const Sobre = pickPage(SobreModule, 'Sobre');
const Solucoes = pickPage(SolucoesModule, 'Solucoes');
const Clientes = pickPage(ClientesModule, 'Clientes');
const Tecnologias = pickPage(TecnologiasModule, 'Tecnologias');
const Contato = pickPage(ContatoModule, 'Contato');
const Privacidade = pickPage(PrivacidadeModule, 'Privacidade');
const Calculadora = pickPage(CalculadoraModule, 'Calculadora');

const NAV = [
  { to: '/solucoes', label: 'Soluções' },
  { to: '/tecnologias', label: 'iFlow' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

const TITLES = {
  '/': 'Controle Patrimonial e Avaliações | Integrade Consulting',
  '/sobre': 'Sobre a Integrade Consulting | Controle Patrimonial',
  '/solucoes': 'Controle Patrimonial e Avaliações | Integrade Consulting',
  '/clientes': 'Clientes | Integrade Consulting',
  '/tecnologias': 'iFlow — Gestão de Ativos Empresariais | Integrade Consulting',
  '/contato': 'Fale com um especialista | Integrade Consulting',
  '/privacidade': 'Política de Privacidade | Integrade Consulting',
  '/calculadora-depreciacao': 'Calculadora de depreciação grátis | Integrade Consulting',
};

const linkBase =
  'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-4"
          aria-label="Integrade Consulting — página inicial"
        >
          {/* Logo oficial: public/images/Logo_integrade_Consulting-Horizontal.png */}
          <BrandLogo className="h-9 w-auto max-w-[200px] sm:h-10 sm:max-w-[220px]" />
          <span className="hidden border-l border-slate-200 pl-4 text-[10px] font-medium uppercase leading-tight tracking-[0.18em] text-slate-400 xl:inline">
            uma empresa do
            <br />
            ecossistema Integrade
          </span>
        </NavLink>

        <nav aria-label="Navegação principal" className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${linkBase} ${
                  isActive
                    ? 'bg-slate-100 text-[#0B4F8F]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/contato"
            className="hidden rounded-md bg-[#0B4F8F] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#093f72] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] focus-visible:ring-offset-2 sm:inline-flex"
          >
            Fale com um especialista
          </NavLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F8F] lg:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-slate-200 bg-white lg:hidden">
          <nav aria-label="Navegação principal (mobile)" className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-base font-medium ${
                    isActive ? 'bg-slate-100 text-[#0B4F8F]' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/contato"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-[#0B4F8F] px-3 py-3 text-center text-base font-semibold text-white"
            >
              Fale com um especialista
            </NavLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Footer() {
  const link =
    'text-slate-400 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white';

  return (
    <footer className="mt-24 border-t border-slate-800 bg-[#0B1F33] text-slate-300">
      {/* Faixa de conversão — presente em todas as páginas */}
      <div className="border-b border-slate-800 bg-[#0B3B66]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-lg font-bold text-white">Patrimônio sob controle, da plaqueta ao sistema.</p>
            <p className="mt-1 text-sm text-slate-300">
              Plaquetas, equipamentos, inventário, avaliações, iFlow e outsourcing com um único fornecedor.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <NavLink
              to="/contato"
              className="inline-flex whitespace-nowrap items-center justify-center rounded-lg bg-[#B08968] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a7556] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Solicitar proposta
            </NavLink>
            <a
              href={EMPRESA.telefoneHref}
              className="inline-flex whitespace-nowrap items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Ligar {EMPRESA.telefone}
            </a>
            <a
              href={EMPRESA.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex whitespace-nowrap items-center justify-center rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe5b] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          {/* Versão branca do logo sobre fundo escuro */}
          <BrandLogo variant="white" className="h-9 w-auto max-w-[220px]" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
            Controle patrimonial, avaliações de bens móveis e imóveis e tecnologia para gestão de ativos.
            Uma empresa do ecossistema Integrade.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#D9BFA3]">
            Desde {EMPRESA.fundacao} · Atendemos licitações
          </p>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={link}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Institucional</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <NavLink to="/calculadora-depreciacao" className={link}>Calculadora de depreciação</NavLink>
            </li>
            <li>
              <NavLink to="/privacidade" className={link}>Política de privacidade</NavLink>
            </li>
            <li>
              <NavLink to="/contato" className={link}>Fale com um especialista</NavLink>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Contato</h2>
          <address className="mt-4 space-y-3 text-sm not-italic">
            <p><a href={EMPRESA.telefoneHref} className={link}>Tel. {EMPRESA.telefone}</a></p>
            <p><a href={EMPRESA.whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp {EMPRESA.whatsapp}</a></p>
            <p><a href={`mailto:${EMPRESA.email}`} className={link}>{EMPRESA.email}</a></p>
            <p>
              <a href={EMPRESA.mapaHref} target="_blank" rel="noopener noreferrer" className={link}>
                {EMPRESA.endereco.linha1}
                <br />
                {EMPRESA.endereco.linha2}
                <br />
                CEP {EMPRESA.endereco.cep}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-24 pt-6 text-xs md:pb-6 text-slate-500 sm:px-6 md:flex-row md:justify-between md:pr-56 lg:px-8 lg:pr-56">
          <span>© {new Date().getFullYear()} Integrade Consulting. Todos os direitos reservados.</span>
          <span>{EMPRESA.razaoSocial} · CNPJ {EMPRESA.cnpj}</span>
        </div>
      </div>
    </footer>
  );
}

function ScrollAndTitle() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const title = TITLES[location.pathname] || TITLES['/'];
    if (typeof document !== 'undefined') document.title = title;
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-white text-slate-900">
        <ScrollAndTitle />
        <Header />

        <main id="conteudo" className="flex-1">
          <SafeBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/solucoes" element={<Solucoes />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/tecnologias" element={<Tecnologias />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/calculadora-depreciacao" element={<Calculadora />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </SafeBoundary>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </HashRouter>
  );
}
