import { hypixelGet as baseGet } from "./api";
const memCache = new Map();

export async function hypixelFast(path, query = {}, { ttlMs = 300_000, onUpdate } = {}) {
  const key = path + "?" + new URLSearchParams(query).toString();
  const now = Date.now();

  const hit = memCache.get(key);
  if (hit && now - hit.t < ttlMs) {
    refreshAsync(path, query, key, onUpdate);
    return hit.v;
  }

  try {
    const raw = localStorage.getItem("fast:" + key);
    if (raw) {
      const { t, v } = JSON.parse(raw);
      if (now - t < ttlMs) {
        memCache.set(key, { t, v });
        refreshAsync(path, query, key, onUpdate);
        return v;
      }
    }
  } catch {}

  const fresh = await baseGet(path, query, { ttlMs: ttlMs / 10 });
  const entry = { t: now, v: fresh };
  memCache.set(key, entry);
  try { localStorage.setItem("fast:" + key, JSON.stringify(entry)); } catch {}
  return fresh;
}

async function refreshAsync(path, query, key, onUpdate) {
  try {
    const fresh = await baseGet(path, query, { ttlMs: 30_000 });
    const entry = { t: Date.now(), v: fresh };
    memCache.set(key, entry);
    try { localStorage.setItem("fast:" + key, JSON.stringify(entry)); } catch {}
    if (onUpdate) onUpdate(fresh);
  } catch {}
}
