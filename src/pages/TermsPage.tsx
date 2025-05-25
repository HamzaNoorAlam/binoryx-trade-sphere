
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: January 15, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using Binoryx trading platform, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Trading Services</h2>
              <p>
                Binoryx provides online binary options and forex trading services. Our platform allows users to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Trade binary options on various financial instruments</li>
                <li>Access real-time market data and charts</li>
                <li>Manage trading accounts and funds</li>
                <li>Utilize educational resources and support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Account Registration</h2>
              <p>
                To use our services, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Provide accurate and complete registration information</li>
                <li>Complete identity verification (KYC) procedures</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Risk Disclosure</h2>
              <p>
                Trading binary options involves substantial risk and may not be suitable for all investors. 
                Key risks include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Loss of entire investment amount</li>
                <li>Market volatility and unpredictability</li>
                <li>Technology and connectivity risks</li>
                <li>Regulatory and legal risks</li>
              </ul>
              <p className="font-semibold text-foreground">
                You should only trade with money you can afford to lose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Deposits and Withdrawals</h2>
              <p>
                All financial transactions are subject to our policies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Minimum deposit amount is $1</li>
                <li>Withdrawals may take up to 24 hours to process</li>
                <li>Identity verification required for withdrawals</li>
                <li>Processing fees may apply to certain payment methods</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Prohibited Activities</h2>
              <p>
                Users are prohibited from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using automated trading systems without permission</li>
                <li>Manipulating prices or market conditions</li>
                <li>Creating multiple accounts</li>
                <li>Money laundering or other illegal activities</li>
                <li>Sharing account credentials with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p>
                Binoryx shall not be liable for any direct, indirect, incidental, special, 
                or consequential damages resulting from the use or inability to use our services, 
                including but not limited to damages for loss of profits, goodwill, use, data, 
                or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Privacy and Data Protection</h2>
              <p>
                We are committed to protecting your privacy and personal data in accordance with 
                applicable data protection laws. Please refer to our Privacy Policy for detailed 
                information about how we collect, use, and protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Modifications to Terms</h2>
              <p>
                Binoryx reserves the right to modify these terms at any time. Users will be 
                notified of significant changes via email or platform notification. Continued 
                use of our services after modifications constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li>Email: legal@binoryx.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Trading Street, Financial District, New York, NY 10001</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default TermsPage;
