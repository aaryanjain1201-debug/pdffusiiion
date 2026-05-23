'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

function PaymentSuccessDetector() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      // 1. Save pro status to local storage
      localStorage.setItem('pdffusion_pro', 'true');

      // 2. Dispatch custom event to notify components (e.g. Navbar, Tool pages)
      window.dispatchEvent(new Event('pdffusion_pro_status_change'));

      // 3. Trigger confetti celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      // 4. Remove '?payment=success' query param from browser URL to prevent re-runs
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    }
  }, [searchParams, router]);

  return null;
}

export default function PaymentSuccessHandler() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessDetector />
    </Suspense>
  );
}
