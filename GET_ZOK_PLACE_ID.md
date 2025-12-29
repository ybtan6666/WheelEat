# How to Get Place ID for Zok Noodle House

## Method 1: From Google Maps URL (Easiest)

1. Open this URL in your browser:
   ```
   https://maps.app.goo.gl/gdejSbdHpXJHJe5X9
   ```

2. The URL will redirect to the full Google Maps page

3. Look at the address bar - the place_id should be in the URL in one of these formats:
   - `!1sChIJ...` (27 characters starting with ChIJ)
   - Or in the URL as `place_id=ChIJ...`

4. Copy the place_id (it will look like: `ChIJ...` - 27 characters)

## Method 2: Using Places API Text Search

If you have the API key set up, you can test this query:

```
https://maps.googleapis.com/maps/api/place/textsearch/json?query=Zok+Noodle+House+Sunway+Square+Mall&key=YOUR_API_KEY
```

This should return the place_id in the response.

## Method 3: From Browser Developer Tools

1. Open the Google Maps URL in your browser
2. Press F12 to open Developer Tools
3. Go to the Network tab
4. Refresh the page
5. Look for API calls - the place_id might be in the response
6. Or check the Console tab and look for `ChIJ...` in any logged data

## Once You Have the Place ID

Update `functions/api/lib/restaurant-places.js`:

Change this line:
```javascript
"Zok Noodle House": null,
```

To:
```javascript
"Zok Noodle House": "ChIJ...",  // Replace with actual place_id
```

## Quick Test

After adding the place_id, test the leaderboard:
```
https://wheeleat-xp5.pages.dev/api/leaderboard?mall_id=sunway_square
```

Look for "Zok Noodle House" - it should now have a rating and reviews!

