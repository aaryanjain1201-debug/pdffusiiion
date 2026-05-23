'use client';

import ToolLayout from '@/components/ToolLayout';
import { compressPDF } from '@/lib/pdf-utils';

export default function CompressPdfTool() {
  const handleProcess = async (
    files: File[],
    options: any,
    onProgress: (p: number) => void
  ) => {
    if (files.length === 0) throw new Error('No files provided');
    const pdfBytes = await compressPDF(files[0], options.level, onProgress);
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    return {
      blob,
      fileName: `pdffusion_compressed_${files[0].name}`,
    };
  };

  const renderOptions = (options: any, setOptions: any) => {
    const levels = [
      { id: 'low', label: 'Low Compression', desc: 'High resolution, minimal size reduction' },
      { id: 'medium', label: 'Medium Compression', desc: 'Balanced resolution and size (Recommended)' },
      { id: 'high', label: 'High Compression', desc: 'Lower resolution, maximum size reduction' },
      { id: 'extreme', label: 'Extreme Compression', desc: 'Lowest resolution, maximum possible size reduction' },
    ];

    return (
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Compression Level
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {levels.map((level) => {
            const isSelected = options.level === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => setOptions({ level: level.id })}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-transparent hover:bg-secondary/40'
                }`}
              >
                <div className="text-sm font-bold text-foreground">{level.label}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-normal">{level.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <ToolLayout
      title="Compress PDF File"
      description="Reduce the file size of your PDF while optimizing internal graphics. All processing executes local in your browser."
      accept=".pdf"
      multiple={false}
      maxFilesLimitFree={1}
      maxSizeLimitMBFree={150}
      processFiles={handleProcess}
      optionsPanel={renderOptions}
      initialOptions={{ level: 'medium' }}
    />
  );
}
