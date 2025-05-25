
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: January 15, 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p>
                We collect several types of information to provide and improve our services:
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, phone number</li>
                <li>Date of birth and address</li>
                <li>Government-issued identification documents</li>
                <li>Financial information and transaction history</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser information</li>
                <li>Device information and operating system</li>
                <li>Website usage patterns and preferences</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and maintaining our trading services</li>
                <li>Processing transactions and managing your account</li>
                <li>Complying with legal and regulatory requirements</li>
                <li>Preventing fraud and ensuring platform security</li>
                <li>Sending important updates and notifications</li>
                <li>Improving our services and user experience</li>
                <li>Providing customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties, 
                except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To prevent fraud or security threats</li>
                <li>With trusted service providers who assist in our operations</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <p>
                We implement comprehensive security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>256-bit SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training</li>
                <li>Multi-factor authentication options</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar technologies to enhance your experience:
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Types of Cookies</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for basic platform functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              
              <p className="mt-4">
                You can control cookie settings through your browser preferences, but disabling certain 
                cookies may affect platform functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights and Choices</h2>
              <p>
                You have several rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to certain data processing activities</li>
                <li><strong>Restriction:</strong> Request limitation of data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide our services to you</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Prevent fraud and abuse</li>
              </ul>
              <p className="mt-4">
                Generally, we retain account information for 7 years after account closure, 
                as required by financial regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your 
                own. We ensure appropriate safeguards are in place, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adequacy decisions by relevant authorities</li>
                <li>Standard contractual clauses</li>
                <li>Binding corporate rules</li>
                <li>Certification schemes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <ul className="list-none space-y-2 mt-4">
                <li><strong>Data Protection Officer:</strong> privacy@binoryx.com</li>
                <li><strong>General Inquiries:</strong> support@bin
                oryx.com</li>
                <li><strong>Phone:</strong> +1 (555) 123-4567</li>
                <li><strong>Address:</strong> 123 Trading Street, Financial District, New York, NY 10001</li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default PrivacyPage;
