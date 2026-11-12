/**
 * Resolução de assets de `public/` segura sob subcaminho.
 *
 * O preview do Hub serve o build em `/demonstracao/<uuid>/` (subcaminho).
 * Um caminho absoluto como `/images/logo.png` resolve para a RAIZ do domínio
 * (`https://hub.integrade.com.br/images/logo.png`) e retorna 404.
 *
 * Com `base: './'` no Vite, `import.meta.env.BASE_URL` vale `'./'`, então
 * `asset('images/x.png')` devolve `./images/x.png`, que resolve relativo ao
 * documento atual -> `/demonstracao/<uuid>/images/x.png`. Correto.
 */

export function basePath() {
  try {
    const raw = (import.meta && import.meta.env && import.meta.env.BASE_URL) || './';
    return raw.endsWith('/') ? raw : raw + '/';
  } catch (e) {
    return './';
  }
}

/** Devolve o caminho principal para um asset de `public/`. */
export function asset(path) {
  const clean = String(path || '').replace(/^\/+/, '');
  return basePath() + clean;
}

/**
 * Devolve variações do caminho, da mais provável para a menos provável.
 * Serve para o `onError` de <img> tentar a próxima antes de desistir.
 */
export function assetCandidates(path) {
  const clean = String(path || '').replace(/^\/+/, '');
  const out = [];
  const push = (u) => {
    if (u && !out.includes(u)) out.push(u);
  };
  push(basePath() + clean);
  push('./' + clean);
  push('/' + clean);
  return out;
}

/**
 * Defesa adicional: reescreve `src`/`href` absolutos (`/algo`) para a forma
 * relativa, para que imagens de páginas que eu não escrevi continuem
 * carregando sob subcaminho. Não toca em `http(s)://` nem em `//`.
 */
export function installAssetUrlGuard() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const base = basePath();
  if (base === '/') return; // nada a converter

  const rewrite = (el) => {
    ['src', 'href'].forEach((attr) => {
      const value = el.getAttribute && el.getAttribute(attr);
      if (value && value.charAt(0) === '/' && value.charAt(1) !== '/') {
        el.setAttribute(attr, base + value.replace(/^\/+/, ''));
      }
    });
  };

  const sweep = (root) => {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll('img[src], source[src], link[href]').forEach(rewrite);
  };

  sweep(document);

  if (typeof MutationObserver === 'undefined') return;
  try {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!node || node.nodeType !== 1) return;
          rewrite(node);
          sweep(node);
        });
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {
    /* silencioso: é defesa extra, não requisito */
  }
}

export default asset;
