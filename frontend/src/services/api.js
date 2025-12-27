// Centralized API service (single source of truth for frontend fetch logic)
//
// Goals:
// - Keep API calls in one place so swapping backend is easy later.
// - Provide small in-memory caching to reduce repeated calls.
// - Make it easy to reuse for future features (leaderboard, trending, top picks, etc).

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

function buildUrl(path, params) {
  const base = API_BASE_URL || '';
  const url = new URL(`${base}${path}`, window.location.origin);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null || v === '') continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

async function fetchJson(url, init) {
  const res = await fetch(url, init);
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    // Try to extract a meaningful JSON error if possible.
    if (contentType.includes('application/json')) {
      const errBody = await res.json().catch(() => null);
      const msg = errBody?.detail || errBody?.message || errBody?.error || `${res.status} ${res.statusText}`;
      throw new Error(msg);
    }
    const text = await res.text().catch(() => '');
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  return await res.json();
}

// Simple in-memory TTL cache by key
const _cache = new Map();
function getCached(key) {
  const entry = _cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    _cache.delete(key);
    return null;
  }
  return entry.value;
}
function setCached(key, value, ttlMs) {
  _cache.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export async function fetchMalls() {
  const url = buildUrl('/api/malls');
  return await fetchJson(url);
}

export async function fetchCategories(mallId) {
  const url = buildUrl('/api/categories', { mall_id: mallId });
  return await fetchJson(url);
}

export async function fetchRestaurants({ categories, mallId, dietaryNeed }) {
  const categoriesParam = Array.isArray(categories) ? categories.join(',') : categories;
  const url = buildUrl('/api/restaurants', {
    categories: categoriesParam,
    mall_id: mallId,
    dietary_need: dietaryNeed,
  });
  return await fetchJson(url);
}

export async function spinWheel({ selectedCategories, mallId, dietaryNeed }) {
  const url = buildUrl('/api/spin');
  return await fetchJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      selected_categories: selectedCategories,
      mall_id: mallId,
      dietary_need: dietaryNeed,
    }),
  });
}

export async function upsertUser({ id, name, email }) {
  const url = buildUrl('/api/users');
  return await fetchJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, email }),
  });
}

// Leaderboard
const LEADERBOARD_TTL_MS = 2 * 60 * 1000; // 2 minutes (frontend-side)

export async function fetchLeaderboard(mallId) {
  const cacheKey = `leaderboard:${mallId || 'sunway_square'}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const url = buildUrl('/api/leaderboard', { mall_id: mallId });
  const data = await fetchJson(url);

  setCached(cacheKey, data, LEADERBOARD_TTL_MS);
  return data;
}


