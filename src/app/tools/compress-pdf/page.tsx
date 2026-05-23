'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const CompressPdfTool = dynamic(() => import('@/components/tools/CompressPdfTool'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary stroke-[1.5] mb-2" />
      <p className="text-sm text-muted-foreground">Loading Compress PDF Tool...</p>
    </div>
  ),
});

export default function CompressPdfPage() {
  return <CompressPdfTool />;
}
