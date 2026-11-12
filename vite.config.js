import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * `base: './'` é OBRIGATÓRIO neste projeto.
 *
 * O preview do Hub publica o build em `/demonstracao/<uuid>/` (subcaminho),
 * não na raiz do domínio. Com o base padrão (`/`), o Vite gera no index.html
 * referências absolutas do tipo `src="/assets/index-xxxx.js"`, que resolvem
 * para `https://hub.integrade.com.br/assets/...` -> 404 -> nenhum JavaScript
 * carrega -> TELA BRANCA (sintoma já relatado pelo cliente).
 *
 * Com `base: './'`, os caminhos saem relativos (`./assets/index-xxxx.js`) e
 * funcionam tanto sob o subcaminho do preview quanto na raiz na Vercel.
 */
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
