'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const ImageToPdfTool = dynamic(() => import('@/components/tools/ImageToPdfTool'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary stroke-[1.5] mb-2" />
      <p className="text-sm text-muted-foreground">Loading Image to PDF Converter...</p>
    </div>
  ),
});

export default function ImageToPdfPage() {
  return <ImageToPdfTool />;
}
