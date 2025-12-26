# Google AdSense Setup

## 1. Add to index.html (in <head>):

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
     crossorigin="anonymous"></script>
```

Replace `YOUR_PUBLISHER_ID` with your AdSense Publisher ID.

## 2. Add to .env file:

```env
REACT_APP_ADSENSE_CLIENT_ID=ca-pub-YOUR_PUBLISHER_ID
REACT_APP_ADSENSE_HEADER_SLOT=YOUR_HEADER_AD_SLOT_ID
REACT_APP_ADSENSE_SIDEBAR_SLOT=YOUR_SIDEBAR_AD_SLOT_ID
REACT_APP_ADSENSE_CONTENT_SLOT=YOUR_CONTENT_AD_SLOT_ID
```

## 3. Ad Locations:

- **Header**: Top of page (horizontal banner)
- **Sidebar**: In selection panel (vertical)
- **Content**: Between wheel panel content (horizontal)

## 4. Get Your Ad Slot IDs:

1. Go to Google AdSense
2. Create ad units for each location
3. Copy the ad slot IDs
4. Add to .env file

