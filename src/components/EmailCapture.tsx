'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Check } from 'lucide-react';

export default function EmailCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed or dismissed
    const status = localStorage.getItem('pdffusion_newsletter');
    if (!status) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000); // Trigger after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      localStorage.setItem('pdffusion_newsletter', 'subscribed');
      
      // Auto close after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }, 1000);
  };

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('pdffusion_newsletter', 'dismissed');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="fixed bottom-4 right-4 z-40 w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-2xl glass text-foreground"
        >
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary">
                <Mail className="h-5 w-5" />
                <h4 className="font-bold tracking-tight text-sm uppercase">Get 20% off Pro</h4>
              </div>
              <div>
                <p className="text-sm font-semibold">Join the PDFFusion Newsletter</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Get PDF productivity tips, tool updates, and a 20% coupon for our Pro subscription.
                </p>
              </div>

              <div className="flex gap-2 mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 rounded-lg border border-input bg-background/50 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Subscribe
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center py-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                <Check className="h-5 w-5" />
              </div>
              <h4 className="text-sm font-bold text-emerald-500">Thank you!</h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Check your inbox for your code: <strong className="text-foreground">FUSION20</strong>
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
