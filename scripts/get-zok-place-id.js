/**
 * Get place_id for Zok Noodle House by searching Places API
 * This uses text search to find the restaurant and extract its place_id
 */

// You need to set GOOGLE_PLACES_API_KEY environment variable
const apiKey = process.env.GOOGLE_PLACES_API_KEY;

if (!apiKey) {
  console.log('❌ GOOGLE_PLACES_API_KEY not set');
  console.log('Set it with: $env:GOOGLE_PLACES_API_KEY="your-key"');
  console.log('\nOr test directly in browser:');
  console.log('https://maps.googleapis.com/maps/api/place/textsearch/json?query=Zok+Noodle+House+Sunway+Square+Mall&key=YOUR_API_KEY');
  process.exit(1);
}

async function getPlaceId() {
  const query = 'Zok Noodle House Sunway Square Mall';
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const place = data.results[0];
      console.log('✅ Found restaurant:');
      console.log('Name:', place.name);
      console.log('Place ID:', place.place_id);
      console.log('Rating:', place.rating || 'N/A');
      console.log('Reviews:', place.user_ratings_total || 'N/A');
      console.log('\n📝 Add this to restaurant-places.js:');
      console.log(`"Zok Noodle House": "${place.place_id}",`);
      return place.place_id;
    } else {
      console.log('❌ Restaurant not found');
      console.log('Status:', data.status);
      if (data.error_message) {
        console.log('Error:', data.error_message);
      }
      return null;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return null;
  }
}

getPlaceId();

