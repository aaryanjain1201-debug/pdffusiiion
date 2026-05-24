'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MONETIZATION_CONFIG } from '@/lib/monetization-config';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);

    const endpoint = MONETIZATION_CONFIG.contactFormEndpoint;
    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          setSuccess(true);
          setForm({ name: '', email: '', subject: '', message: '' });
          confetti({
            particleCount: 50,
            spread: 40,
            origin: { y: 0.8 }
          });
        } else {
          alert('Failed to send message. Please try again or email directly.');
        }
      } catch (err) {
        console.error(err);
        alert('Network error occurred. Please check your connection.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Simulate API request fallback
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.8 }
      });
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Have feedback, a feature request, or need help with a custom PDF template? Send us a message!
        </p>
      </div>

      <div className="border border-border rounded-3xl bg-card p-6 shadow-xl glass">
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="john@example.com"
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Subject (Optional)
              </label>
              <input
                type="text"
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Feature Request / Support"
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                placeholder="Describe your issue or request here..."
                className="w-full rounded-xl border border-input bg-background/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? (
                'Sending Message...'
              ) : (
                <>
                  <Send className="h-4.5 w-4.5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/20">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Message Received!</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Thanks for reaching out! We have received your inquiry. We typically reply within 24 hours to support your workflow.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 rounded-xl border border-border px-6 py-2 text-xs font-semibold hover:bg-secondary transition-all"
            >
              Send Another Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
