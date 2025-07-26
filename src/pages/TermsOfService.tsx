import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          
          <p className="text-moon-glow/80 font-inter mb-8">
            <strong>Effective Date:</strong> July 26, 2025<br />
            <strong>Last Updated:</strong> July 26, 2025
          </p>

          <div className="space-y-8 text-midnight-foundation">
            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">1. Acceptance of Terms</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>By accessing or using Recovery Compass services, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
                <p>If you do not agree to these terms, please do not use our services.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">2. Description of Service</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>Recovery Compass provides compliance management tools, organizational assessments, and strategic guidance for healthcare and behavioral health organizations.</p>
                <p>Our services include Environmental Response Design™ assessments, compliance tracking, and organizational development resources.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">3. User Responsibilities</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p><strong>Accurate Information:</strong> You agree to provide accurate and current information when using our services.</p>
                <p><strong>Appropriate Use:</strong> You will use our services only for lawful purposes and in accordance with these terms.</p>
                <p><strong>Confidentiality:</strong> You are responsible for maintaining the confidentiality of any login credentials and for all activities under your account.</p>
                <p><strong>Prohibited Activities:</strong> You may not use our services to transmit harmful, illegal, or inappropriate content.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">4. Intellectual Property</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p><strong>Our Content:</strong> All content, trademarks, and intellectual property on Recovery Compass are owned by us or our licensors.</p>
                <p><strong>Environmental Response Design™:</strong> ERD™ is a proprietary methodology and trademark of Recovery Compass.</p>
                <p><strong>User Content:</strong> You retain ownership of content you submit but grant us a license to use it for service provision and improvement.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">5. Healthcare and Professional Disclaimers</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p><strong>Not Medical Advice:</strong> Recovery Compass provides organizational and compliance tools, not medical advice, diagnosis, or treatment.</p>
                <p><strong>Professional Consultation:</strong> Our assessments and recommendations should complement, not replace, professional consultation with qualified healthcare, legal, and compliance experts.</p>
                <p><strong>Regulatory Compliance:</strong> Users are responsible for ensuring compliance with all applicable laws and regulations in their jurisdiction.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">6. Payment Terms</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p><strong>Fees:</strong> Certain services require payment as indicated on our platform.</p>
                <p><strong>Refunds:</strong> Refund policies are specified for each service and may vary based on the nature of the service provided.</p>
                <p><strong>Third-Party Processing:</strong> Payments are processed through secure third-party providers subject to their own terms and policies.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">7. Limitation of Liability</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>Recovery Compass provides services "as is" without warranties of any kind, express or implied.</p>
                <p>We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>
                <p>Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">8. Termination</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>Either party may terminate this agreement at any time with or without notice.</p>
                <p>We reserve the right to suspend or terminate access for violations of these terms or for any reason at our discretion.</p>
                <p>Upon termination, your right to access our services ceases immediately.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">9. Governing Law</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>These terms are governed by the laws of [Your State/Country] without regard to conflict of law principles.</p>
                <p>Any disputes shall be resolved in the courts of [Your Jurisdiction].</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">10. Changes to Terms</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>We may modify these terms at any time by posting updated terms on our website.</p>
                <p>Continued use of our services after changes constitutes acceptance of the modified terms.</p>
              </div>
            </section>

            <section>
              <h2 className="text-[2.25rem] font-inter font-semibold text-deep-ocean mb-4">11. Contact Information</h2>
              <div className="space-y-4 text-moon-glow/90">
                <p>For questions about these Terms of Service, please contact us:</p>
                <p>
                  <strong>Recovery Compass</strong><br />
                  Email: legal@recoverycompass.com<br />
                  Address: [Your Business Address]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}