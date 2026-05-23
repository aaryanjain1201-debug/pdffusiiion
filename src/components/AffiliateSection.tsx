import { Shield, PenTool, Layout } from 'lucide-react';
import { MONETIZATION_CONFIG } from '@/lib/monetization-config';

export default function AffiliateSection() {
  const getIcon = (name: string) => {
    if (name.includes('NordVPN')) return <Shield className="h-6 w-6 text-indigo-500" />;
    if (name.includes('Canva')) return <Layout className="h-6 w-6 text-pink-500" />;
    return <PenTool className="h-6 w-6 text-red-500" />;
  };

  const products = MONETIZATION_CONFIG.affiliates;

  return (
    <section className="my-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Recommended Productivity Tools
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Explore top-tier tools curated to boost your document design, signature, and privacy management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((prod) => (
          <a
            key={prod.name}
            href={prod.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group block relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/30 active:scale-[0.99] glass"
          >
            <div className="absolute right-4 top-4 rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
              {prod.badge}
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary mb-4 group-hover:scale-110 transition-transform duration-300">
              {getIcon(prod.name)}
            </div>

            <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {prod.name}
            </h3>
            
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {prod.desc}
            </p>

            <div className="mt-5 text-sm font-semibold text-primary flex items-center gap-1">
              Check it out
              <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
                &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
