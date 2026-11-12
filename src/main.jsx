import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { installAssetUrlGuard } from './lib/assetUrl.js';

/**
 * Ponto de entrada. Nenhum Router aqui de propósito: o roteador vive em
 * App.jsx (HashRouter). Dois routers aninhados derrubam a árvore inteira e
 * produzem tela branca — que foi exatamente o sintoma relatado.
 */

const mount =
  document.getElementById('root') ||
  document.getElementById('app') ||
  document.getElementById('main');

let container = mount;

if (!container) {
  container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
}

// Reescreve caminhos absolutos de assets para funcionar sob subcaminho.
installAssetUrlGuard();

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
