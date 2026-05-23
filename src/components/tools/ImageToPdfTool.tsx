'use client';

import ToolLayout from '@/components/ToolLayout';
import { imagesToPDF } from '@/lib/pdf-utils';

export default function ImageToPdfTool() {
  const handleProcess = async (
    files: File[],
    options: any,
    onProgress: (p: number) => void
  ) => {
    const pdfBytes = await imagesToPDF(files, onProgress);
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    return {
      blob,
      fileName: 'pdffusion_images.pdf',
    };
  };

  return (
    <ToolLayout
      title="Image to PDF Converter"
      description="Convert PNG, JPG, and WebP images into a single, clean PDF file. Your uploaded images remain private and secure."
      accept=".png,.jpg,.jpeg,.webp"
      multiple={true}
      maxFilesLimitFree={5}
      maxSizeLimitMBFree={10}
      processFiles={handleProcess}
    />
  );
}
