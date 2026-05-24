import { PDFDocument } from 'pdf-lib';
import * as pdfjs from 'pdfjs-dist';

// Configure the pdfjs worker to serve locally from the public folder.
// This guarantees offline support and completely bypasses CDN fetching and CORS issues.
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

/**
 * Converts a file to an ArrayBuffer.
 */
export function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Helper to convert any image File (JPG, PNG, WebP) to a JPEG ArrayBuffer using canvas.
 * This guarantees support for all browser-supported image formats.
 */
export async function imageToJpgBuffer(file: File, quality = 0.9): Promise<{ buffer: ArrayBuffer; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        // Fill white background for transparent images (e.g., PNGs)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to compress image to blob'));
            return;
          }
          const blobReader = new FileReader();
          blobReader.onload = () => {
            resolve({
              buffer: blobReader.result as ArrayBuffer,
              width: img.width,
              height: img.height,
            });
          };
          blobReader.onerror = () => reject(new Error('Failed to read image blob'));
          blobReader.readAsArrayBuffer(blob);
        }, 'image/jpeg', quality);
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Merges multiple PDF files into a single PDF document.
 */
export async function mergePDFs(files: File[], onProgress?: (percent: number) => void): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error('No files provided for merging');
  }

  const mergedPdf = await PDFDocument.create();
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (onProgress) {
      onProgress(Math.round((i / files.length) * 50)); // up to 50% for loading
    }
    const fileBuffer = await fileToArrayBuffer(file);
    const pdf = await PDFDocument.load(fileBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  if (onProgress) {
    onProgress(75);
  }
  
  const result = await mergedPdf.save();
  if (onProgress) {
    onProgress(100);
  }
  return result;
}

/**
 * Converts a list of image files into a single PDF document.
 * Each image becomes a separate page in the PDF.
 */
export async function imagesToPDF(files: File[], onProgress?: (percent: number) => void): Promise<Uint8Array> {
  if (files.length === 0) {
    throw new Error('No images selected');
  }

  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (onProgress) {
      onProgress(Math.round((i / files.length) * 80));
    }
    
    // Convert to JPG to support WebP/PNG and resize
    const { buffer, width, height } = await imageToJpgBuffer(file, 0.95);
    const image = await pdfDoc.embedJpg(buffer);
    
    // Add page and scale image to page size
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
  }

  if (onProgress) {
    onProgress(90);
  }
  const result = await pdfDoc.save();
  if (onProgress) {
    onProgress(100);
  }
  return result;
}

/**
 * Interface representing a rendered PDF page
 */
export interface RenderedPage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Converts a PDF file into an array of image data URLs (JPEG).
 */
export async function pdfToImages(
  file: File,
  onProgress?: (percent: number) => void
): Promise<RenderedPage[]> {
  const fileBuffer = await fileToArrayBuffer(file);
  const loadingTask = pdfjs.getDocument({ data: fileBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const renderedPages: RenderedPage[] = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    if (onProgress) {
      onProgress(Math.round(((pageNum - 1) / numPages) * 90));
    }
    const page = await pdf.getPage(pageNum);
    
    // Render at 2x scale for high resolution
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get canvas context');
    }
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    } as any).promise;
    
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    renderedPages.push({
      pageNumber: pageNum,
      dataUrl,
      width: viewport.width,
      height: viewport.height,
    });
  }

  if (onProgress) {
    onProgress(100);
  }
  return renderedPages;
}

/**
 * Compresses a PDF file client-side.
 * Re-renders the PDF pages onto a lower-DPI canvas, compresses them to JPEGs, and constructs a new PDF.
 */
export async function compressPDF(
  file: File,
  compressionLevel: 'low' | 'medium' | 'high' | 'extreme', // High compression = smaller output size / lower quality
  onProgress?: (percent: number) => void
): Promise<Uint8Array> {
  const fileBuffer = await fileToArrayBuffer(file);
  const loadingTask = pdfjs.getDocument({ data: fileBuffer });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  
  const pdfDoc = await PDFDocument.create();

  // Set rendering scales & JPEG qualities based on compression target
  let scale = 1.5;
  let quality = 0.8;
  
  if (compressionLevel === 'medium') {
    scale = 1.1;
    quality = 0.65;
  } else if (compressionLevel === 'high') {
    scale = 0.85;
    quality = 0.45;
  } else if (compressionLevel === 'extreme') {
    scale = 0.6;
    quality = 0.25;
  }

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    if (onProgress) {
      onProgress(Math.round(((pageNum - 1) / numPages) * 90));
    }
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas render context failed');
    }
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    // Draw white background
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    } as any).promise;
    
    // Compress page to Blob
    const pageBlob: Blob = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Page compression blob failed'));
      }, 'image/jpeg', quality);
    });
    
    // Read blob as ArrayBuffer
    const pageBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(pageBlob);
    });
    
    // Embed compressed page as JPG
    const embeddedImage = await pdfDoc.embedJpg(pageBuffer);
    const newPage = pdfDoc.addPage([viewport.width, viewport.height]);
    newPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: viewport.width,
      height: viewport.height,
    });
  }

  if (onProgress) {
    onProgress(95);
  }
  const result = await pdfDoc.save();
  if (onProgress) {
    onProgress(100);
  }
  return result;
}
