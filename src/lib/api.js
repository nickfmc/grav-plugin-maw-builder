// Thin client for the Grav API using the globals Admin2 injects into custom-field scripts.

function base() {
  const server = (window.__GRAV_API_SERVER_URL || '').replace(/\/$/, '');
  const prefix = window.__GRAV_API_PREFIX || '/api/v1';
  return server + prefix;
}

function headers(extra = {}) {
  const h = { Accept: 'application/json', ...extra };
  if (window.__GRAV_API_TOKEN) h['X-API-Token'] = window.__GRAV_API_TOKEN;
  if (window.__GRAV_ENVIRONMENT) h['X-Grav-Environment'] = window.__GRAV_ENVIRONMENT;
  return h;
}

async function request(method, path, body) {
  const init = { method, headers: headers(), credentials: 'same-origin' };
  if (body instanceof FormData) {
    init.body = body;
  } else if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }
  const res = await fetch(base() + path, init);
  if (res.status === 204) return null;
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || json?.message || json?.detail || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return json && typeof json === 'object' && 'data' in json ? json.data : json;
}

/** Route segment for /pages/{route}: "about/team" (no leading slash, each segment encoded). */
export function routeSegment(route) {
  return String(route || '').replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/');
}

function ownMediaPath(ctx) {
  return ctx.kind === 'flex'
    ? `/flex-objects/${encodeURIComponent(ctx.type)}/${encodeURIComponent(ctx.key)}/media`
    : `/pages/${routeSegment(ctx.route)}/media`;
}

export const api = {
  blocks: () => request('GET', '/maw-builder/blocks'),
  patterns: () => request('GET', '/maw-builder/patterns'),
  savePattern: (pattern) => request('POST', '/maw-builder/patterns', pattern),
  deletePattern: (id) => request('DELETE', '/maw-builder/patterns/' + encodeURIComponent(id)),
  /** ctx: {kind:'page', route} | {kind:'flex', type, key} */
  preview: (ctx, blocks, field) => request('POST', '/maw-builder/preview',
    ctx.kind === 'flex' ? { context: 'flex', type: ctx.type, key: ctx.key, blocks, field } : { route: ctx.route, blocks, field }),
  /** Media stored with the page or Flex object being edited. */
  ownMedia: (ctx) => request('GET', ownMediaPath(ctx)),
  uploadOwnMedia: (ctx, files) => {
    const fd = new FormData();
    [...files].forEach((f) => fd.append('files[]', f));
    return request('POST', ownMediaPath(ctx), fd);
  },
  siteMedia: (path = '', search = '') => {
    const q = new URLSearchParams({ per_page: '200' });
    if (path) q.set('path', path);
    if (search) q.set('search', search);
    return request('GET', `/media?${q}`);
  },
  uploadSiteMedia: (files, path = '') => {
    const fd = new FormData();
    [...files].forEach((f) => fd.append('files[]', f));
    return request('POST', `/media${path ? '?path=' + encodeURIComponent(path) : ''}`, fd);
  },
};
