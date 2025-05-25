
import { useState } from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message sent successfully!',
        description: 'We will get back to you within 24 hours.'
      });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      info: 'support@binoryx.com',
      description: '24/7 email support'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      info: '+1 (555) 123-4567',
      description: 'Available 24/7'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      info: '123 Trading Street, Financial District',
      description: 'New York, NY 10001'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      info: '24/7 Operations',
      description: 'Round-the-clock support'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our support team. We're here to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="Your first name" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Your last name" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" required />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Phone (Optional)</label>
                    <Input placeholder="Your phone number" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="What is this regarding?" required />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea 
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      required 
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <Icon className="text-primary-foreground" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{info.title}</h3>
                            <p className="text-primary font-medium">{info.info}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Find Us</h3>
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive Map Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default ContactPage;
