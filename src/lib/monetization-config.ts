/**
 * PDFFusion Monetization and Earning Configuration Control Panel
 * 
 * Update these values to configure your payment details, Google AdSense, 
 * affiliate links, and donations to start earning money!
 */

export const MONETIZATION_CONFIG = {
  // 1. Stripe Checkout / Subscription Payment Link
  // Create a payment link in your Stripe Dashboard (e.g. subscription for ₹99/month).
  // Configure the redirect URL on success in Stripe to point to:
  // https://pdffusiiion.vercel.app/?payment=success
  stripePaymentLink: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || 'https://buy.stripe.com/mock_payment_link',

  // 2. Buy Me a Coffee / UPI / PayPal link for direct support/tips from free users
  donationLink: process.env.NEXT_PUBLIC_DONATION_LINK || 'https://www.buymeacoffee.com/arihantjain',

  // 3. Google AdSense Publisher Client ID
  // Format: ca-pub-XXXXXXXXXXXXXXXX
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',

  // 3b. Free Contact Formspree Endpoint to receive emails directly in your inbox
  // Sign up for free on Formspree (https://formspree.io), create a form, and paste the URL here.
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || '',

  // 4. Curated Affiliate Programs (Passive Commission Revenue)
  // Replace these URLs with your personal affiliate referral links.
  affiliates: [
    {
      name: 'NordVPN Privacy Shield',
      desc: 'Secure your internet connection and protect your files while browsing. Get up to 60% off.',
      url: process.env.NEXT_PUBLIC_AFFILIATE_NORDVPN || 'https://nordvpn.com',
      badge: 'Highly Recommended',
    },
    {
      name: 'Canva Design Studio',
      desc: 'Create beautiful presentations, graphics, and images, and import them directly to PDF.',
      url: process.env.NEXT_PUBLIC_AFFILIATE_CANVA || 'https://canva.com',
      badge: 'Free Trial',
    },
    {
      name: 'Adobe Acrobat Pro',
      desc: 'Unlock industry-grade desktop PDF edit and signature workflows. Perfect for large teams.',
      url: process.env.NEXT_PUBLIC_AFFILIATE_ADOBE || 'https://adobe.com',
      badge: 'Best Desktop Tool',
    },
  ],
};
