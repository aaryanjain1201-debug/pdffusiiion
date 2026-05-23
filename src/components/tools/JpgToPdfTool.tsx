'use client';

import ToolLayout from '@/components/ToolLayout';
import { imagesToPDF } from '@/lib/pdf-utils';

export default function JpgToPdfTool() {
  const handleProcess = async (
    files: File[],
    options: any,
    onProgress: (p: number) => void
  ) => {
    const pdfBytes = await imagesToPDF(files, onProgress);
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    return {
      blob,
      fileName: 'pdffusion_converted.pdf',
    };
  };

  return (
    <ToolLayout
      title="JPG to PDF Converter"
      description="Convert JPG images to a clean PDF document in seconds. 100% private - your images never leave your browser."
      accept=".jpg,.jpeg"
      multiple={true}
      maxFilesLimitFree={5}
      maxSizeLimitMBFree={10}
      processFiles={handleProcess}
    />
  );
}
