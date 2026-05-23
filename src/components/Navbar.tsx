'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Sparkles, Menu, X, FileText, ChevronDown, Activity } from 'lucide-react';
import UpgradeModal from './UpgradeModal';

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isPro, setIsPro] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Tools list for navigation dropdown
  const tools = [
    { name: 'Merge PDF', href: '/tools/merge-pdf', desc: 'Combine multiple PDF files into one.' },
    { name: 'JPG to PDF', href: '/tools/jpg-to-pdf', desc: 'Convert JPG images to PDF document.' },
    { name: 'Compress PDF', href: '/tools/compress-pdf', desc: 'Reduce PDF file size client-side.' },
    { name: 'PDF to Image', href: '/tools/pdf-to-image', desc: 'Extract pages from PDF to JPEG.' },
    { name: 'Image to PDF', href: '/tools/image-to-pdf', desc: 'Convert any image format to PDF.' },
  ];

  // Sync theme and pro status
  useEffect(() => {
    // Theme sync
    const savedTheme = localStorage.getItem('pdffusion_theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Pro sync
    const checkProStatus = () => {
      setIsPro(localStorage.getItem('pdffusion_pro') === 'true');
    };
    checkProStatus();

    // Listen to custom billing changes
    window.addEventListener('pdffusion_pro_status_change', checkProStatus);
    return () => {
      window.removeEventListener('pdffusion_pro_status_change', checkProStatus);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('pdffusion_theme', nextTheme);
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <FileText className="h-5 w-5" />
            </span>
            <span>PDFFusion</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                Tools
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isToolsDropdownOpen && (
                <div
                  onMouseLeave={() => setIsToolsDropdownOpen(false)}
                  className="absolute left-1/2 -translate-x-1/2 top-full w-80 rounded-2xl border border-border bg-card p-4 shadow-xl glass z-50 flex flex-col gap-1"
                >
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setIsToolsDropdownOpen(false)}
                      className="group flex flex-col p-2.5 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <span className="text-sm font-semibold group-hover:text-primary transition-colors">{tool.name}</span>
                      <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{tool.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/pricing" className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/pricing' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Pricing
            </Link>
            <Link href="/blog" className={`text-sm font-medium transition-colors hover:text-foreground ${pathname?.startsWith('/blog') ? 'text-foreground' : 'text-muted-foreground'}`}>
              Blog
            </Link>
            <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === '/contact' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Contact
            </Link>
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors border border-border/50"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </button>

            {/* Premium Button */}
            {isPro ? (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 fill-emerald-500/20" />
                Pro Active
              </div>
            ) : (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 active:scale-[0.98] transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Go Pro
              </button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors border border-border/50"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors border border-border/50"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background z-40 border-t border-border flex flex-col p-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 font-semibold text-lg">
            <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-2 mb-1">Tools</div>
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="pl-2 border-l-2 border-border hover:border-primary py-1 transition-all"
              >
                {tool.name}
              </Link>
            ))}
            
            <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mt-4 mb-1">Company</div>
            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="pl-2 border-l-2 border-border hover:border-primary py-1 transition-all">
              Pricing
            </Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="pl-2 border-l-2 border-border hover:border-primary py-1 transition-all">
              Blog
            </Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="pl-2 border-l-2 border-border hover:border-primary py-1 transition-all">
              Contact
            </Link>
          </div>

          <div className="mt-auto pb-8">
            {isPro ? (
              <div className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                Pro Member Active
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsUpgradeModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade to Pro (₹99/mo)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Shared Upgrade Modal */}
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
    </>
  );
}
