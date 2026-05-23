import Link from 'next/link';
import { FileText, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card/30 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo and Intro */}
          <div className="space-y-4 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                <FileText className="h-5 w-5" />
              </span>
              <span>PDFFusion</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Fast, simple, and 100% private client-side PDF utility tools. Your documents never leave your device.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-lg w-fit">
              <Shield className="h-4 w-4" />
              End-to-End Local Processing
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="mt-8 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0 sm:grid-cols-3">
            {/* Tools Column */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Tools</h3>
              <ul className="mt-4 space-y-2">
                {[
                  { name: 'Merge PDF', href: '/tools/merge-pdf' },
                  { name: 'JPG to PDF', href: '/tools/jpg-to-pdf' },
                  { name: 'Compress PDF', href: '/tools/compress-pdf' },
                  { name: 'PDF to Image', href: '/tools/pdf-to-image' },
                  { name: 'Image to PDF', href: '/tools/image-to-pdf' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                {[
                  { name: 'Pricing', href: '/pricing' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact Us', href: '/contact' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                {[
                  { name: 'Privacy Policy', href: '/privacy' },
                  { name: 'Terms of Service', href: '/terms' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span>&copy; {currentYear} PDFFusion. All rights reserved.</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary shadow-sm">
              Founder: Arihant Jain
            </span>
          </div>
          <div className="flex items-center gap-1 font-medium hover:text-foreground transition-colors cursor-pointer">
            Crafted with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for web privacy.
          </div>
        </div>
      </div>
    </footer>
  );
}
