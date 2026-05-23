import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailCapture from '@/components/EmailCapture';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Free PDF Tools Online - PDFFusion | Merge, Compress, Convert',
  description: 'Use PDFFusion for 100% free online PDF tools. Merge PDF, compress PDF size, and convert images to PDF or PDF to images client-side. Fast, secure, and fully private.',
  keywords: 'free pdf tools, online pdf merger, compress pdf online free, jpg to pdf converter, pdf converter online, easy pdf tools, pdf to image, pdf extractor, pdffusion, arihant jain',
  authors: [{ name: 'Arihant Jain' }],
  creator: 'Arihant Jain',
  publisher: 'Arihant Jain',
  robots: 'index, follow',
  metadataBase: new URL('https://pdffusiiion.vercel.app'),
  verification: {
    google: 'kfUPyfTcr4h6BYYEjbt-D8pT70_9meUM9wr3YyGag8s',
  },
  openGraph: {
    title: 'Free PDF Tools Online - PDFFusion | Merge, Compress, Convert',
    description: '100% free online PDF tools (Merge, Compress, JPG to PDF, PDF to Image) that process files locally inside your browser for total privacy.',
    url: 'https://pdffusiiion.vercel.app',
    siteName: 'PDFFusion',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Tools Online - PDFFusion | Merge, Compress, Convert',
    description: '100% free online PDF tools that process files locally inside your browser for total privacy.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground bg-grid-pattern antialiased">
        <Navbar />
        <main className="flex-1 w-full flex flex-col justify-start relative">
          {/* Ambient light glow */}
          <div className="absolute top-[-10%] left-[10%] w-[80%] h-[500px] pointer-events-none radial-glow -z-10" />
          {children}
        </main>
        <Footer />
        <EmailCapture />
      </body>
    </html>
  );
}
