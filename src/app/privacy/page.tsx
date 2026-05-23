export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>
      
      <div className="mt-8 space-y-6 text-sm text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Privacy by Design</h2>
          <p>
            At <strong>PDFFusion</strong>, we believe that your documents should remain private. Unlike traditional PDF converters that require you to upload files to their servers, PDFFusion runs entirely client-side. All processing (merging, compression, and conversion) is executed using JavaScript inside your web browser. Your files never touch a remote host or database.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Data We Collect</h2>
          <p>
            Because all processing happens in-browser, we do not store, scan, or transfer any document files or contents. We do not collect personal data except for:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Email address</strong>: Only if you explicitly subscribe to our newsletter popup.</li>
            <li><strong>Preferences</strong>: We store theme choices (light/dark) and payment status locally in your browser`s <code>localStorage</code>.</li>
            <li><strong>Anonymized Usage Analytics</strong>: We may collect basic tracking data (such as page views or tool clicks) to refine user layout design. No file names or binary structures are ever recorded.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Local Storage Usage</h2>
          <p>
            We use browser <code>localStorage</code> to store:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Your theme configuration (so your UI preferences remain consistent).</li>
            <li>Your Pro status activation token (simulated SaaS purchase).</li>
            <li>Your newsletter signup status.</li>
          </ul>
          <p className="mt-2">
            You can clear this storage at any time by resetting your browser cookies and site data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">4. Security Assurance</h2>
          <p>
            Because we do not store documents on a cloud host, there is zero risk of database leak or unauthorized server access to your sensitive files (e.g. tax documents, resumes, certificates). This is the highest level of security possible in online file tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">5. Third-Party Links & Ads</h2>
          <p>
            Our website uses Google AdSense to serve ads. Google may use cookies to serve ads based on your visits. You can opt out of personalized advertising by visiting Google Ad Settings. We also display links to affiliate productivity tools. We are not responsible for the privacy structures of external websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">6. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or how client-side compilation works, reach out to us at: <a href="mailto:support@pdffusion.mock" className="text-primary hover:underline">support@pdffusion.mock</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
