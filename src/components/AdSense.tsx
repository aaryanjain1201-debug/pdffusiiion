'use client';

import { useEffect, useState } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: 'true' | 'false';
  style?: React.CSSProperties;
}

export default function AdSense({ slot, format = 'auto', responsive = 'true', style }: AdSenseProps) {
  const [isClient, setIsClient] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    setIsClient(true);
    if (clientId && typeof window !== 'undefined') {
      try {
        // Push ad to window.adsbygoogle
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('Error initializing AdSense slot', err);
      }
    }
  }, [clientId]);

  if (!isClient) return null;

  // If client ID is not provided, show a premium styled placeholder
  if (!clientId) {
    return (
      <div 
        className="my-6 mx-auto w-full max-w-4xl p-4 flex flex-col items-center justify-center border border-dashed rounded-xl glass text-center min-h-[90px] md:min-h-[120px]"
        style={style}
      >
        <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Sponsored Ad Spot</span>
        <div className="text-xs text-muted-foreground/60 max-w-md">
          This premium space is ready for Google AdSense. Provide <code>NEXT_PUBLIC_ADSENSE_CLIENT_ID</code> to enable ads.
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 mx-auto w-full overflow-hidden flex justify-center" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: '90px', ...style }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
