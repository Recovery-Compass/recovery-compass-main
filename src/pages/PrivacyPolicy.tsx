import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-midnight-foundation">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-compass-gold hover:text-tree-copper transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-deep-ocean/20 p-8 rounded-[12px] border border-compass-gold/20">
          <h1 className="text-[3.5rem] font-inter font-bold text-deep-ocean mb-4 leading-[1.1]">
            Privacy Policy
          </h1>
          
          <p className="text-moon-glow/80 font-inter mb-8">
            <strong>Effective Date:</strong> July 26, 2025<br />
            <strong>Last Updated:</strong> July 26, 2025
          </p>

          <div className="space-y-8 text-midnight-foundation">
            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p><strong>Analytics Data:</strong> We collect usage analytics to improve our services, including page views, user interactions, and navigation patterns.</p>
                <p><strong>Form Submissions:</strong> When you participate in assessments or contact us, we collect the information you provide voluntarily.</p>
                <p><strong>Technical Information:</strong> We automatically collect IP addresses, browser type, device information, and referral sources.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p><strong>Service Improvement:</strong> We analyze usage data to enhance our platform and user experience.</p>
                <p><strong>Customer Support:</strong> We use contact information to respond to inquiries and provide assistance.</p>
                <p><strong>Research:</strong> Aggregated, anonymized data helps us understand compliance challenges in healthcare organizations.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">3. Information Sharing</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p><strong>Third-Party Services:</strong> We use Google Analytics, Stripe for payments, and other service providers who maintain their own privacy policies.</p>
                <p><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety.</p>
                <p><strong>No Sale of Data:</strong> We do not sell, rent, or trade your personal information to third parties.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">4. Data Security</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>We implement industry-standard security measures to protect your information, including encryption, secure hosting, and access controls.</p>
                <p>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">5. Your Rights</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p><strong>Access:</strong> You may request access to personal information we hold about you.</p>
                <p><strong>Correction:</strong> You may request correction of inaccurate information.</p>
                <p><strong>Deletion:</strong> You may request deletion of your personal information, subject to legal requirements.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">6. Healthcare Disclaimer</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>Recovery Compass provides compliance and organizational tools. We are not a healthcare provider and do not provide medical advice, diagnosis, or treatment.</p>
                <p>Any health-related information shared through our platform should not replace professional medical consultation.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">7. Updates to This Policy</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>We may update this Privacy Policy periodically. We will notify users of significant changes by posting the updated policy on our website.</p>
                <p>Continued use of our services after changes constitutes acceptance of the updated policy.</p>
              </div>
            </section>

              <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">8. Contact Us</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>If you have questions about this Privacy Policy or your personal information, please contact us:</p>
                <p>
                  <strong>Recovery Compass</strong><br />
                  Email: eric@recovery-compass.org<br />
                  Address: 5634 Noel Drive, Temple City, CA 91780 United States
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}