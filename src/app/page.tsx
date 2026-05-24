'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, ShieldCheck, Zap, HardDrive, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import AffiliateSection from '@/components/AffiliateSection';
import AdSense from '@/components/AdSense';

interface Tool {
  name: string;
  description: string;
  href: string;
  icon: string;
  badge?: string;
  popular?: boolean;
}

interface FAQItem {
  q: string;
  a: string;
}

export default function Home() {
  const tools: Tool[] = [
    {
      name: 'Merge PDF',
      description: 'Combine multiple PDF files into one single PDF document in seconds.',
      href: '/tools/merge-pdf',
      icon: 'Merge',
      badge: 'Popular',
      popular: true,
    },
    {
      name: 'JPG to PDF',
      description: 'Convert JPG images to PDF. Adjust resolution and crop parameters instantly.',
      href: '/tools/jpg-to-pdf',
      icon: 'Image',
    },
    {
      name: 'Compress PDF',
      description: 'Reduce PDF file size client-side using adjustable optimization levels.',
      href: '/tools/compress-pdf',
      icon: 'Minimize2',
      badge: 'Optimized',
    },
    {
      name: 'PDF to Image',
      description: 'Extract all pages in a PDF file into high-quality JPEG images.',
      href: '/tools/pdf-to-image',
      icon: 'FileImage',
    },
    {
      name: 'Image to PDF',
      description: 'Convert PNG, JPG, WebP, or BMP files into a single, clean PDF page grid.',
      href: '/tools/image-to-pdf',
      icon: 'Files',
      badge: 'New',
    },
  ];

  const faqs: FAQItem[] = [
    {
      q: 'Are my PDF documents secure on PDFFusion?',
      a: 'Absolutely. PDFFusion operates 100% client-side. When you drop files onto our site, all merging, conversion, and compression happens locally inside your browser using JavaScript. No files are uploaded to any server. Your data stays entirely in your control.',
    },
    {
      q: 'How does client-side compression work?',
      a: 'We use JavaScript libraries to render pages onto virtual HTML canvases, re-encoding them at scaled resolutions and custom JPEG quality configurations. This reduces image streams inside the PDF binary without uploading files to remote servers.',
    },
    {
      q: 'Is there a file upload or size limit?',
      a: 'Free plan users can upload up to 50 files or 100MB total (previously 5 files / 10MB). If you need to process extremely large scanned books or massive collections of files, our Pro Plan (₹99/month) lifts size limits up to 250MB and allows batch conversions.',
    },
    {
      q: 'Do I need an internet connection to run this?',
      a: 'PDFFusion is built as a lightweight web app. Once the page is loaded, the PDF processing itself can run completely offline because it uses your local CPU/GPU cycles.',
    },
  ];

  // Accordion state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // JSON-LD Schema for FAQs
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a,
      },
    })),
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 pt-20 pb-16 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider mb-6"
        >
          <Sparkles className="h-3.5 w-3.5" />
          100% Client-Side & Private
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-4xl leading-tight"
        >
          Fuse, Compress & Convert PDFs{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Without Server Uploads
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          PDFFusion is a modern web application that lets you manage your PDF tools directly inside your browser. No registration required, completely private.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#tools-grid"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/25"
          >
            Explore Free Tools
            <ArrowRight className="h-4.5 w-4.5" />
          </a>
          <Link
            href="/pricing"
            className="flex items-center justify-center rounded-xl border border-border bg-card/50 px-6 py-3.5 font-bold hover:bg-secondary active:scale-[0.98] transition-all glass"
          >
            Go Pro (₹99/mo)
          </Link>
        </motion.div>
      </section>

      {/* Ad space */}
      <AdSense slot="adsense_home_hero" />

      {/* 2. TOOL CARDS GRID */}
      <section id="tools-grid" className="w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Choose a PDF Utility
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Fast, zero-latency workflows executing locally. No subscriptions, logins, or cookies required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Link
                href={tool.href}
                className={`group relative flex flex-col h-full rounded-2xl border bg-card p-6 shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 glass ${
                  tool.popular ? 'border-primary/30' : 'border-border'
                }`}
              >
                {tool.badge && (
                  <div className="absolute right-4 top-4 rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                    {tool.badge}
                  </div>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary mb-4 group-hover:scale-110 transition-transform duration-300 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {tool.description}
                </p>
                <div className="mt-5 text-sm font-semibold text-primary flex items-center gap-1">
                  Launch Tool
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. VALUE PROPOSITION SECTION */}
      <section className="w-full bg-secondary/20 py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">100% Private & Secure</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Your documents never touch a cloud database. File streams are parsed using local JavaScript memory and exported safely.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 mb-4 border border-indigo-500/20">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Lag-Free Processing</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Forget waiting in server cues. Browser compilers process pages instantly using your device hardware.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 mb-4 border border-pink-500/20">
                <HardDrive className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">Works Fully Offline</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Since all PDF compiling code runs locally, you can continue merging or compressing docs even with zero cellular signal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AFFILIATE tools grid */}
      <AffiliateSection />

      {/* 5. FAQ ACCORDION SECTION */}
      <section className="w-full max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3 text-muted-foreground">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Have questions about how browser-side document processing works? Find your answers here.
          </p>
        </div>

        <div className="border border-border rounded-2xl bg-card overflow-hidden shadow-lg glass divide-y divide-border">
          {faqs.map((faq, idx) => {
            const isOpen = openFAQIndex === idx;
            return (
              <div key={idx} className="transition-all duration-200">
                <button
                  onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-foreground hover:bg-secondary/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-48 border-t border-border/50 bg-secondary/10' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CTA / PRICING TEASER */}
      <section className="w-full max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-indigo-950/20 to-purple-950/20 p-8 md:p-12 shadow-2xl glass text-center overflow-hidden flex flex-col items-center">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] pointer-events-none radial-glow opacity-30 -z-10 animate-pulse" />
          
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to Unlock Unlimited PDF Operations?
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            Upgrade to PDFFusion Pro to lift all file sizes (up to 250MB) and batch size limitations. Process heavy PDFs with ease.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-primary/10"
            >
              View Pricing Details
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-muted-foreground">Starting at only ₹99/month</span>
          </div>
        </div>
      </section>
    </div>
  );
}
