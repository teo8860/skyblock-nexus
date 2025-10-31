const HYPIXEL_KEY = "cee98391-49a5-4769-8948-1310e9b14e85";
const TTL_MS = 60_000; // cache 60s
const memCache = new Map();

function withTimeout(ms, controller) {
  const t = setTimeout(() => controller.abort(), ms);
  return () => clearTimeout(t);
}
async function tryJson(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text().catch(()=>res.statusText)}`);
  return res.json();
}
function cacheKey(path, query) {
  const qs = new URLSearchParams(query || {});
  return `${path}?${qs.toString()}`;
}

export async function hypixelGet(path, query = {}, { ttlMs = TTL_MS } = {}) {
  // usa ?key= (no header custom → meno CORS)
  const q = {key: HYPIXEL_KEY , ...query};
  const key = cacheKey(path, q);
  const now = Date.now();

  // 1) memoria
  const hit = memCache.get(key);
  if (hit && (now - hit.t) < ttlMs) return hit.v;

  // 2) localStorage
  try {
    const raw = localStorage.getItem(`cache:${key}`);
    if (raw) {
      const { t, v } = JSON.parse(raw);
      if ((now - t) < ttlMs) {
        memCache.set(key, { t, v });
        return v;
      }
    }
  } catch {}

  const qs = new URLSearchParams(q);
  const clean = path.replace(/^\/+/, "");

  // race: proxy vs diretto, timeout 4s
  const c1 = new AbortController();
  const c2 = new AbortController();
  const cancel1 = withTimeout(4000, c1);
  const cancel2 = withTimeout(4000, c2);

  const proxyUrl  = `/api/hypixel/${clean}?${qs.toString()}`;
  const directUrl = `https://api.hypixel.net/${clean}?${qs.toString()}`;

  try {
    const winner = await Promise.any([
      tryJson(proxyUrl,  { signal: c1.signal }),
      tryJson(directUrl, { signal: c2.signal }),
    ]);
    cancel1(); cancel2();
    const entry = { t: now, v: winner };
    memCache.set(key, entry);
    try { localStorage.setItem(`cache:${key}`, JSON.stringify(entry)); } catch {}
    return winner;
  } catch (e) {
    cancel1(); cancel2();
    throw new Error(`API error on ${clean}: ${e.message || e}`);
  }
}
