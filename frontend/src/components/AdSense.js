import React, { useEffect, useRef } from 'react';
import './AdSense.css';

const AD_CLIENT_ID = process.env.REACT_APP_ADSENSE_CLIENT_ID || 'ca-pub-YOUR_PUBLISHER_ID';
const SHOW_PLACEHOLDER = process.env.REACT_APP_ADSENSE_SHOW_PLACEHOLDER !== 'false'; // Show placeholder by default

function AdSense({ slotId, style = {}, format = 'auto', className = '', label = 'Ad' }) {
  const adRef = useRef(null);
  const isConfigured = slotId && 
                      slotId !== 'YOUR_HEADER_AD_SLOT_ID' && 
                      slotId !== 'YOUR_SIDEBAR_AD_SLOT_ID' && 
                      slotId !== 'YOUR_CONTENT_AD_SLOT_ID' &&
                      AD_CLIENT_ID !== 'ca-pub-YOUR_PUBLISHER_ID';

  useEffect(() => {
    if (isConfigured) {
      try {
        if (adRef.current && !adRef.current.dataset.adsbygoogleStatus && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [slotId, isConfigured]);

  // Show placeholder if not configured and SHOW_PLACEHOLDER is true
  if (!isConfigured && SHOW_PLACEHOLDER) {
    return (
      <div className={`ad-container ad-placeholder ${className}`} style={{ ...style }}>
        <div className="ad-placeholder-content">
          <div className="ad-placeholder-label">{label}</div>
          <div className="ad-placeholder-text">
            {format === 'vertical' ? '300×250' : format === 'horizontal' ? '728×90' : 'Responsive'}
          </div>
          <div className="ad-placeholder-note">AdSense will appear here</div>
        </div>
      </div>
    );
  }

  // Hide if not configured and placeholders disabled
  if (!isConfigured) {
    return null;
  }

  // Show actual AdSense ad
  return (
    <div className={`ad-container ${className}`} style={{ textAlign: 'center', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default AdSense;

