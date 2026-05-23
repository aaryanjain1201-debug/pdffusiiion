export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: May 2026</p>

      <div className="mt-8 space-y-6 text-sm text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>PDFFusion</strong>, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
          <p>
            PDFFusion provides browser-based, client-side PDF utility functions (including merging, converting, and compressing documents). Since all operations execute inside your browser memory, you do not transfer file ownership to us, and we do not maintain physical storage of your files.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Usage Limitations & Plans</h2>
          <p>
            We offer:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Free Tier</strong>: Limits you to a maximum of 5 files per operation and a 10MB total upload size limit. You agree not to bypass these limit walls using automation.</li>
            <li><strong>Pro Tier</strong>: For ₹99/month, lifts limits up to 250MB size capacity. Access tokens are stored in your local browser and are tied to your device environment.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">4. Intellectual Property</h2>
          <p>
            The software, UI layout design, logos, graphics, and compilation libraries used in PDFFusion are the property of PDFFusion and its open-source library vendors. You are granted a limited, personal, non-transferable license to use the app for individual or business document purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">5. Disclaimer of Warranties</h2>
          <p>
            PDFFusion is provided &ldquo;as is&rdquo; without warranties of any kind. Since calculations run locally on your device, we are not liable for files that fail to convert due to device processor crash, memory limits, or browser extensions interfering with JS execution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">6. Limitation of Liability</h2>
          <p>
            In no event shall PDFFusion, its authors, or vendors be liable for any damages (including loss of data, document corruption, or business interruption) arising out of the use or inability to use our tools, even if notified of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">7. Modifications to Service</h2>
          <p>
            We reserve the right to modify these terms, adjust tool restrictions, or introduce premium options. Continued usage constitutes your acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
