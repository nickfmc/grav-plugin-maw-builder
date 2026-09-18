// The theme's real section colours, measured from its CSS (so builder swatches match the site, including dark mode).
export function palette() {
  const keys = ['none', 'alt', 'soft', 'accent', 'dark'];
  const host = document.querySelector('main') || document.body;
  const out = {};
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  for (const key of keys) {
    const probe = document.createElement('section');
    probe.className = 'section section--bg-' + key;
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = 'position:absolute;left:-9999px;top:0;width:10px;height:10px;padding:0;visibility:hidden;';
    host.appendChild(probe);
    const cs = getComputedStyle(probe);
    let bg = cs.backgroundColor;
    if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') bg = bodyBg;
    out[key] = { bg, fg: cs.color };
    probe.remove();
  }
  const rootCs = getComputedStyle(document.documentElement);
  out._accent = (rootCs.getPropertyValue('--maw-accent') || '').trim();
  out._mode = document.documentElement.getAttribute('data-theme') || 'light';
  return out;
}
