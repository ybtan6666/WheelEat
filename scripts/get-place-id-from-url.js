/**
 * Helper script to extract place_id from Google Maps URL
 * Usage: node scripts/get-place-id-from-url.js <google-maps-url>
 * 
 * This script will:
 * 1. Resolve shortened URLs
 * 2. Extract place_id from the final URL
 * 3. Or search for the restaurant using Places API to get place_id
 */

const url = process.argv[2];

if (!url) {
  console.error('Usage: node scripts/get-place-id-from-url.js <google-maps-url>');
  process.exit(1);
}

async function extractPlaceId(url) {
  try {
    // Resolve shortened URL
    const response = await fetch(url, { 
      method: 'HEAD',
      redirect: 'follow'
    });
    
    const finalUrl = response.url;
    console.log('Final URL:', finalUrl);
    
    // Try to extract place_id from URL
    // Format 1: /place/.../data=!4m...!1sChIJ...
    const placeIdMatch1 = finalUrl.match(/!1s([A-Za-z0-9_-]{27})/);
    if (placeIdMatch1) {
      console.log('Found place_id:', placeIdMatch1[1]);
      return placeIdMatch1[1];
    }
    
    // Format 2: ?place_id=ChIJ...
    const placeIdMatch2 = finalUrl.match(/[?&]place_id=([A-Za-z0-9_-]+)/);
    if (placeIdMatch2) {
      console.log('Found place_id:', placeIdMatch2[1]);
      return placeIdMatch2[1];
    }
    
    // Format 3: Extract from data parameter
    const dataMatch = finalUrl.match(/data=([^&]+)/);
    if (dataMatch) {
      const decoded = decodeURIComponent(dataMatch[1]);
      const placeIdInData = decoded.match(/ChIJ[A-Za-z0-9_-]{24}/);
      if (placeIdInData) {
        console.log('Found place_id in data:', placeIdInData[0]);
        return placeIdInData[0];
      }
    }
    
    console.log('Could not extract place_id from URL. You may need to:');
    console.log('1. Open the URL in a browser');
    console.log('2. Look for "ChIJ..." in the address bar or page source');
    console.log('3. Or search for the restaurant using Places API text search');
    
    return null;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

extractPlaceId(url).then(placeId => {
  if (placeId) {
    console.log('\n✅ Place ID:', placeId);
    console.log('\nAdd this to restaurant-places.js:');
    console.log(`"Zok Noodle House": "${placeId}",`);
  }
});

