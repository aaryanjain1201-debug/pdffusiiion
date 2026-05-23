'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setLoading(false);
    }
  }, [isOpen]);

  const handleUpgrade = () => {
    setLoading(true);
    // Simulate transaction delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      localStorage.setItem('pdffusion_pro', 'true');
      
      // Trigger success notification event
      window.dispatchEvent(new Event('pdffusion_pro_status_change'));
      
      // Fun celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        onClose();
      }, 2500);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-2xl glass text-foreground z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {!success ? (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold tracking-tight">Upgrade to PDFFusion Pro</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Remove all restrictions and process your documents with maximum speed.
                </p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">₹99</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>

                <ul className="mt-6 w-full space-y-3 text-left text-sm">
                  {[
                    'Unlimited conversions (Free: max 5 files)',
                    'No file size restrictions (Free: max 10MB)',
                    'Ad-free workspace and interface',
                    'High quality compression algorithms',
                    'Priority client-side processing speeds'
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 text-xs shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="mt-8 w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing checkout...
                    </>
                  ) : (
                    'Activate Pro Plan'
                  )}
                </button>
                
                <span className="mt-3 text-xs text-muted-foreground/60">
                  Simulated SaaS billing (stores pro state locally). Cancel anytime.
                </span>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white mb-4 shadow-lg shadow-emerald-500/20">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-emerald-500">Welcome to Pro!</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  Your account has been upgraded successfully. All restrictions have been lifted. Enjoy PDFFusion Pro!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
