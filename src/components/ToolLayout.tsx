'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Upload, File as FileIcon, X, Sparkles, Loader2, Download, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdSense from './AdSense';
import UpgradeModal from './UpgradeModal';
import confetti from 'canvas-confetti';

interface ProcessedFile {
  blob: Blob;
  fileName: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  accept: string; // e.g. ".pdf" or ".jpg,.jpeg,.png,.webp"
  multiple?: boolean;
  maxFilesLimitFree?: number;
  maxSizeLimitMBFree?: number;
  processFiles: (
    files: File[],
    options: any,
    onProgress: (p: number) => void
  ) => Promise<ProcessedFile | ProcessedFile[]>;
  optionsPanel?: (options: any, setOptions: React.Dispatch<React.SetStateAction<any>>) => React.ReactNode;
  initialOptions?: any;
}

export default function ToolLayout({
  title,
  description,
  accept,
  multiple = true,
  maxFilesLimitFree = 50,
  maxSizeLimitMBFree = 100,
  processFiles,
  optionsPanel,
  initialOptions = {},
}: ToolLayoutProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState(initialOptions);
  const [isDragActive, setIsDragActive] = useState(false);
  
  // Status states
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessedFile | ProcessedFile[] | null>(null);
  
  // Upgrades
  const [isPro, setIsPro] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync pro status
  useEffect(() => {
    const checkProStatus = () => {
      setIsPro(localStorage.getItem('pdffusion_pro') === 'true');
    };
    checkProStatus();
    window.addEventListener('pdffusion_pro_status_change', checkProStatus);
    return () => {
      window.removeEventListener('pdffusion_pro_status_change', checkProStatus);
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const validateFiles = (incomingFiles: File[]): boolean => {
    setError(null);
    const maxCount = isPro ? 100 : maxFilesLimitFree;
    const maxSize = isPro ? 250 : maxSizeLimitMBFree; // 250MB for Pro, 10MB for Free

    if (!multiple && incomingFiles.length > 1) {
      setError('Only single file upload is allowed for this tool.');
      return false;
    }

    if (files.length + incomingFiles.length > maxCount) {
      setError(`Limit exceeded. Free plan supports up to ${maxFilesLimitFree} files. Upgrade to Pro for unlimited.`);
      return false;
    }

    for (const file of incomingFiles) {
      if (file.size / 1024 / 1024 > maxSize) {
        setError(`File ${file.name} is too large. Max allowed size is ${maxSize}MB. Upgrade to Pro for heavy files.`);
        return false;
      }
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (validateFiles(droppedFiles)) {
        setFiles((prev) => [...prev, ...droppedFiles]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);
      if (validateFiles(selectedFiles)) {
        setFiles((prev) => [...prev, ...selectedFiles]);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  const clearAll = () => {
    setFiles([]);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setError(null);
    setProcessing(true);
    setProgress(0);

    try {
      const output = await processFiles(files, options, (p) => {
        setProgress(p);
      });
      
      setResult(output);
      
      // Success celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'An error occurred during file processing.');
    } finally {
      setProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;

    const download = (item: ProcessedFile) => {
      const url = URL.createObjectURL(item.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    if (Array.isArray(result)) {
      result.forEach(download);
    } else {
      download(result);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title block */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {title}
        </h1>
        <p className="mt-2 text-md text-muted-foreground max-w-xl mx-auto">
          {description}
        </p>
      </div>

      {/* Ad space top */}
      <AdSense slot="adsense_top_banner" />

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 flex items-start gap-3 text-sm"
        >
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold">Processing Restriction / Error</h4>
            <p className="mt-0.5 opacity-90">{error}</p>
            {error.includes('Limit exceeded') || error.includes('too large') ? (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="mt-2 flex items-center gap-1 text-xs font-bold text-primary hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Upgrade to Pro to bypass limits &rarr;
              </button>
            ) : null}
          </div>
        </motion.div>
      )}

      {/* Workspace Area */}
      <div className="border border-border rounded-3xl bg-card p-6 shadow-xl glass">
        <AnimatePresence mode="wait">
          {/* STATE 1: UPLOAD STATE */}
          {files.length === 0 && !result && (
            <motion.div
              key="uploader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-12 px-4 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? 'border-primary bg-primary/5 scale-[1.01]'
                  : 'border-border hover:border-primary/50 hover:bg-secondary/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary mb-4 text-muted-foreground group-hover:text-primary transition-colors">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold tracking-tight">
                Drag and drop your files here
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                or click to browse from your device. Supported format(s): <strong>{accept.toUpperCase()}</strong>.
              </p>
              
              {!isPro && (
                <div className="mt-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-indigo-500" />
                  Free Limit: Up to {maxFilesLimitFree} files / {maxSizeLimitMBFree}MB total
                </div>
              )}
            </motion.div>
          )}

          {/* STATE 2: PRE-PROCESS STATE (Files are uploaded, waiting to click Process) */}
          {files.length > 0 && !result && !processing && (
            <motion.div
              key="file-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* File cards list */}
              <div className="max-h-60 overflow-y-auto pr-2 space-y-2.5">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-secondary/35 text-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <FileIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate text-foreground">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(idx)}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Options Panel (Specific to each tool) */}
              {optionsPanel && (
                <div className="p-4 rounded-2xl bg-secondary/20 border border-border">
                  <h4 className="font-semibold text-sm mb-3">Tool Configurations</h4>
                  {optionsPanel(options, setOptions)}
                </div>
              )}

              {/* Action row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={clearAll}
                  className="flex-1 rounded-xl border border-border py-3 font-semibold text-center hover:bg-secondary active:scale-[0.98] transition-all"
                >
                  Clear All
                </button>
                <button
                  onClick={handleProcess}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Process Document(s)
                </button>
              </div>
            </motion.div>
          )}

          {/* STATE 3: PROCESSING STATE (Loader) */}
          {processing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="relative mb-6">
                <Loader2 className="h-16 w-16 animate-spin text-primary stroke-[1.5]" />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">
                  {progress}%
                </div>
              </div>
              <h3 className="text-xl font-bold tracking-tight">Processing your file(s)</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Doing math in the browser. 100% private, your document never leaves your machine.
              </p>
              
              {/* Progress bar container */}
              <div className="w-full max-w-sm h-1.5 bg-secondary rounded-full overflow-hidden mt-6">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          )}

          {/* STATE 4: COMPLETED STATE (Success / Download) */}
          {result && !processing && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center py-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Processing Completed!
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-md">
                Your file has been processed successfully client-side. You can download the output file below.
              </p>

              {/* Output Info */}
              <div className="my-6 p-4 rounded-xl border border-border bg-secondary/25 flex items-center gap-3 max-w-md w-full justify-start text-left text-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                  <FileIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">
                    {Array.isArray(result) 
                      ? `${result.length} files generated`
                      : result.fileName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {Array.isArray(result)
                      ? `${(result.reduce((sum, item) => sum + item.blob.size, 0) / 1024 / 1024).toFixed(2)} MB total`
                      : `${(result.blob.size / 1024 / 1024).toFixed(2)} MB`}
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <button
                  onClick={clearAll}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border py-3 font-semibold hover:bg-secondary active:scale-[0.98] transition-all"
                >
                  <RefreshCw className="h-4.5 w-4.5" />
                  Process New Files
                </button>
                <button
                  onClick={downloadResult}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-white py-3 font-semibold hover:opacity-95 active:scale-[0.98] transition-all shadow-md shadow-emerald-500/10"
                >
                  <Download className="h-4.5 w-4.5" />
                  Download File
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ad space bottom */}
      <AdSense slot="adsense_bottom_banner" />

      {/* Upgrade modal link trigger */}
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
    </div>
  );
}
