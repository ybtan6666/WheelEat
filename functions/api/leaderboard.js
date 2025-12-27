// GET /api/leaderboard?mall_id=<mall_id>
// Returns a leaderboard-ready list of restaurants for a mall, enriched with Google Places rating + review count.
//
// Notes:
// - Uses your static restaurant list (category/unit/floor/logo) as the source of truth.
// - Enriches with Google Places "Text Search" results for "restaurants in <mall>".
// - Caches results for a short time to reduce repeated API calls.

import { createCORSResponse, jsonResponse } from './lib/cors.js';
import { getMallInfo, getRestaurantsByMall, getLogoPath } from './lib/restaurants.js';

const CACHE_TTL_SECONDS = 300; // 5 minutes

function normalizeName(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function pickBestMatch(targetName, places) {
  const target = normalizeName(targetName);
  if (!target) return null;

  // Exact normalized match first
  for (const p of places) {
    if (normalizeName(p?.name) === target) return p;
  }

  // Contains match (either direction)
  for (const p of places) {
    const pn = normalizeName(p?.name);
    if (!pn) continue;
    if (pn.includes(target) || target.includes(pn)) return p;
  }

  return null;
}

async function fetchPlacesForMall(mallDisplayName, apiKey) {
  // Google Places Text Search (legacy) endpoint.
  // We fetch up to 3 pages (max ~60 results). next_page_token requires a short delay before use.
  const query = `restaurants in ${mallDisplayName}`;
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

  const allResults = [];
  let pageToken = null;

  for (let page = 0; page < 3; page++) {
    const url = new URL(baseUrl);
    url.searchParams.set('query', query);
    url.searchParams.set('key', apiKey);
    // Keep payload small; only request what we need.
    // (Text Search returns many fields; this endpoint doesn't support field masks.)
    if (pageToken) url.searchParams.set('pagetoken', pageToken);

    // next_page_token can be INVALID_REQUEST if used immediately.
    if (pageToken) {
      await new Promise((r) => setTimeout(r, 2000));
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Google Places Text Search failed: HTTP ${res.status}`);
    }

    const data = await res.json();
    const results = Array.isArray(data?.results) ? data.results : [];
    for (const r of results) allResults.push(r);

    pageToken = data?.next_page_token;
    if (!pageToken) break;
  }

  return allResults;
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') return createCORSResponse();
  if (request.method !== 'GET') return jsonResponse({ error: 'Method not allowed' }, 405);

  try {
    const url = new URL(request.url);
    const mallId = url.searchParams.get('mall_id') || 'sunway_square';

    // Cache first (edge cache)
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), { method: 'GET' });
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const mallInfo = getMallInfo(mallId);
    const restaurants = getRestaurantsByMall(mallId);

    const apiKey = env.GOOGLE_PLACES_API_KEY || env.GOOGLE_API_KEY;
    if (!apiKey) {
      // Still return the base list (graceful degradation) so UI can render.
      const fallback = {
        mall: { id: mallId, name: mallInfo?.name, display_name: mallInfo?.display_name },
        source: 'static_only',
        cached_ttl_seconds: CACHE_TTL_SECONDS,
        restaurants: restaurants.map((r) => ({
          name: r.name,
          unit: r.unit || null,
          floor: r.floor || null,
          category: r.category || 'Unknown',
          logo: r.logo || getLogoPath(r.name, mallId),
          rating: null,
          reviews: null,
          google: null,
        })),
      };

      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('Cache-Control', `public, max-age=${CACHE_TTL_SECONDS}`);
      return new Response(JSON.stringify(fallback), { status: 200, headers });
    }

    const places = await fetchPlacesForMall(mallInfo?.display_name || mallInfo?.name || mallId, apiKey);

    const enriched = restaurants.map((r) => {
      const match = pickBestMatch(r.name, places);
      return {
        name: r.name,
        unit: r.unit || null,
        floor: r.floor || null,
        category: r.category || 'Unknown',
        logo: r.logo || getLogoPath(r.name, mallId),
        rating: typeof match?.rating === 'number' ? match.rating : null,
        reviews: typeof match?.user_ratings_total === 'number' ? match.user_ratings_total : null,
        google: match
          ? {
              place_id: match.place_id || null,
              name: match.name || null,
            }
          : null,
      };
    });

    const body = {
      mall: { id: mallId, name: mallInfo?.name, display_name: mallInfo?.display_name },
      source: 'google_places_textsearch',
      cached_ttl_seconds: CACHE_TTL_SECONDS,
      restaurants: enriched,
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', `public, max-age=${CACHE_TTL_SECONDS}`);
    headers.set('Vary', 'Accept-Encoding');

    // Ensure CORS headers are present (jsonResponse helper would do it, but we need a cacheable Response instance).
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    headers.set('Access-Control-Max-Age', '86400');

    const response = new Response(JSON.stringify(body), { status: 200, headers });
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (error) {
    console.error('Error in leaderboard endpoint:', error);
    return jsonResponse(
      {
        error: 'Internal server error',
        message: error.message,
      },
      500
    );
  }
}


