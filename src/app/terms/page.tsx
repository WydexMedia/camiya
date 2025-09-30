export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
        <p className="text-gray-600 mb-6">Last updated: September 30, 2025</p>

        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Introduction</h2>
            <p className="text-gray-700">These Terms and Conditions govern your use of the Camiya Diamonds website and services. By accessing or using our site, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Orders and Payments</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Prices are displayed in INR and include applicable taxes unless stated otherwise.</li>
              <li>Orders are confirmed only after successful payment authorization.</li>
              <li>We reserve the right to cancel any order in case of pricing or stock errors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Shipping and Delivery</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Estimated delivery timelines are shown at checkout and may vary by location.</li>
              <li>All shipments are insured until delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Returns and Exchanges</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Returns are accepted within 30 days in original condition and packaging.</li>
              <li>Customized or resized items may not be eligible for return.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Warranty</h2>
            <p className="text-gray-700">All products come with a lifetime warranty covering manufacturing defects. Normal wear and tear is not covered.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Privacy</h2>
            <p className="text-gray-700">Your personal data is handled per our Privacy Policy. By using the site, you consent to such processing.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">7. Contact</h2>
            <p className="text-gray-700">For any questions regarding these Terms, contact us at camiya@gmail.com or Toll Free: 1800 257 8600.</p>
          </section>
        </div>
      </div>
    </div>
  );
}


