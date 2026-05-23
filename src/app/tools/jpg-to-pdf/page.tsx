'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const JpgToPdfTool = dynamic(() => import('@/components/tools/JpgToPdfTool'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary stroke-[1.5] mb-2" />
      <p className="text-sm text-muted-foreground">Loading JPG to PDF Converter...</p>
    </div>
  ),
});

export default function JpgToPdfPage() {
  return <JpgToPdfTool />;
}
