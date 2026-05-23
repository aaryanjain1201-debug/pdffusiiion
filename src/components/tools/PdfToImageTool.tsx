'use client';

import ToolLayout from '@/components/ToolLayout';
import { pdfToImages } from '@/lib/pdf-utils';

export default function PdfToImageTool() {
  const dataURLtoBlob = async (dataurl: string): Promise<Blob> => {
    const res = await fetch(dataurl);
    return await res.blob();
  };

  const handleProcess = async (
    files: File[],
    options: any,
    onProgress: (p: number) => void
  ) => {
    if (files.length === 0) throw new Error('No files provided');
    const pages = await pdfToImages(files[0], onProgress);
    const processedFiles = await Promise.all(
      pages.map(async (page) => {
        const blob = await dataURLtoBlob(page.dataUrl);
        return {
          blob,
          fileName: `pdffusion_page_${page.pageNumber}.jpg`,
        };
      })
    );
    return processedFiles;
  };

  return (
    <ToolLayout
      title="PDF to Image Extractor"
      description="Extract pages of your PDF file into high-quality JPEG images. Fully secure and rendered entirely inside your browser."
      accept=".pdf"
      multiple={false}
      maxFilesLimitFree={1}
      maxSizeLimitMBFree={10}
      processFiles={handleProcess}
    />
  );
}
