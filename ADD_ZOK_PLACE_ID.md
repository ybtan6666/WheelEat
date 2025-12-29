# Add Place ID for Zok Noodle House

## Important: Your URL Uses Old Format

The URL you provided uses an **old reference format**, not the modern place_id:
- ❌ Reference ID: `0x31cc4d001178493d:0xc315768facfd6b26` (old format)
- ✅ Modern place_id: `ChIJ...` (27 characters starting with ChIJ)

**The place_id is NOT directly in your URL.** We need to search for it.

## Quick Solution

The easiest way to get the place_id is:

### Option 1: Check Leaderboard Response (Easiest)

1. Visit your leaderboard endpoint:
   ```
   https://wheeleat-xp5.pages.dev/api/leaderboard?mall_id=sunway_square
   ```

2. Search for "Zok Noodle House" in the response

3. If it was found via text search, it will have a `place_id` in the `google` object:
   ```json
   {
     "name": "Zok Noodle House",
     "google": {
       "place_id": "ChIJ...",
       "name": "..."
     }
   }
   ```

4. Copy that `place_id` and update `functions/api/lib/restaurant-places.js`

### Option 2: Manual Extraction from Google Maps

1. Open: https://maps.app.goo.gl/gdejSbdHpXJHJe5X9
2. Once the page loads, look at the browser's address bar
3. The place_id should appear as `ChIJ...` (27 characters)
4. Or press F12 → Console tab → Search for "ChIJ" in the page

### Option 3: Use Places API Text Search

Test this query (replace YOUR_API_KEY):
```
https://maps.googleapis.com/maps/api/place/textsearch/json?query=Zok+Noodle+House+Sunway+Square+Mall&key=YOUR_API_KEY
```

The response will contain the `place_id` in the results.

## Update the Mapping File

Once you have the place_id, update `functions/api/lib/restaurant-places.js`:

Change:
```javascript
"Zok Noodle House": null,
```

To:
```javascript
"Zok Noodle House": "ChIJ...",  // Replace with actual place_id
```

## Test

After updating, test the leaderboard again - Zok Noodle House should now have ratings!

