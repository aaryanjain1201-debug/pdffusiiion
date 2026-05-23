'use client';

import ToolLayout from '@/components/ToolLayout';
import { mergePDFs } from '@/lib/pdf-utils';

export default function MergePdfTool() {
  const handleProcess = async (
    files: File[],
    options: any,
    onProgress: (p: number) => void
  ) => {
    const pdfBytes = await mergePDFs(files, onProgress);
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    return {
      blob,
      fileName: 'pdffusion_merged.pdf',
    };
  };

  return (
    <ToolLayout
      title="Merge PDF Documents"
      description="Combine multiple PDF files into a single document in any order you choose. Fast, secure, and completed locally."
      accept=".pdf"
      multiple={true}
      maxFilesLimitFree={5}
      maxSizeLimitMBFree={10}
      processFiles={handleProcess}
    />
  );
}
