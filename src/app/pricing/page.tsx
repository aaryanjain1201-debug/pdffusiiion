'use client';

import { useState, useEffect } from 'react';
import { Check, X, Sparkles, Shield, Zap, RefreshCw } from 'lucide-react';
import UpgradeModal from '@/components/UpgradeModal';

export default function Pricing() {
  const [isPro, setIsPro] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAction = () => {
    if (isPro) {
      // Downgrade mock for testing convenience
      localStorage.setItem('pdffusion_pro', 'false');
      window.dispatchEvent(new Event('pdffusion_pro_status_change'));
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Start for free, upgrade to Pro when you need to handle heavier documents. No hidden setup fees or backend lockouts.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
        {/* FREE CARD */}
        <div className="flex flex-col justify-between p-8 rounded-3xl border border-border bg-card shadow-lg glass relative overflow-hidden">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Free Plan</h3>
            <p className="mt-2 text-sm text-muted-foreground">For simple, one-off document conversions.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground">₹0</span>
              <span className="text-sm text-muted-foreground">/ forever</span>
            </div>
            <ul className="mt-8 space-y-4 text-sm text-foreground">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Max 5 files per conversion</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Max 10MB file size limit</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>100% private, client-side processing</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground/60">
                <X className="h-5 w-5 text-red-500 shrink-0" />
                <span>Ad-free workspace</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground/60">
                <X className="h-5 w-5 text-red-500 shrink-0" />
                <span>Priority high-res rendering</span>
              </li>
            </ul>
          </div>
          <button
            disabled={!isPro}
            className="mt-8 w-full rounded-xl border border-border py-3 font-semibold text-center hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPro ? 'Switch to Free' : 'Current Plan'}
          </button>
        </div>

        {/* PRO CARD */}
        <div className="flex flex-col justify-between p-8 rounded-3xl border border-primary/30 bg-card shadow-2xl glass relative overflow-hidden">
          <div className="absolute right-4 top-4 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Most Popular
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">Pro Plan</h3>
            <p className="mt-2 text-sm text-muted-foreground">For power users, designers, and office desks.</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-foreground">₹99</span>
              <span className="text-sm text-muted-foreground">/ month</span>
            </div>
            <ul className="mt-8 space-y-4 text-sm text-foreground">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Unlimited files (Batch conversions)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Bypassed file limits (up to 250MB)</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Ad-Free clean interface workspace</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Fastest local compiler priority</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                <span>Priority email support</span>
              </li>
            </ul>
          </div>
          <button
            onClick={handleAction}
            className={`mt-8 w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-primary-foreground active:scale-[0.98] transition-all shadow-md shadow-primary/10 ${
              isPro ? 'bg-red-500/20 border border-red-500/30 text-red-500 hover:bg-red-500/30' : 'bg-primary hover:opacity-90'
            }`}
          >
            {isPro ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin-slow" />
                Simulate Downgrade
              </>
            ) : (
              'Upgrade to Pro'
            )}
          </button>
        </div>
      </div>

      {/* Security Assurance */}
      <div className="rounded-2xl border border-border bg-secondary/15 p-6 max-w-3xl mx-auto flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 border border-emerald-500/20">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-bold text-sm">Security Policy</h4>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            All files are processed in your browser memory and never touch our servers. No matter which plan you choose, your documents remain 100% confidential and safe from cloud data breaches.
          </p>
        </div>
      </div>

      <UpgradeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
