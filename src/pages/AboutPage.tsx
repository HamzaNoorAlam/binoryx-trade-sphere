
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Award, Globe } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your funds and data are protected with bank-grade security measures.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'We prioritize our users with 24/7 support and transparent trading conditions.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Award-winning platform with innovative features and reliable execution.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving traders worldwide with localized payment methods and support.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <div className="py-20 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Binoryx</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing binary options trading with cutting-edge technology, 
              transparent practices, and unmatched customer service.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-16">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto">
                To democratize financial trading by providing accessible, secure, and profitable 
                trading opportunities for everyone. We believe that with the right tools and support, 
                anyone can succeed in the financial markets.
              </p>
            </CardContent>
          </Card>

          {/* Company Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="text-primary-foreground" size={32} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Company Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2024, Binoryx emerged from a simple vision: to make financial 
                  trading accessible to everyone, regardless of their background or experience level.
                </p>
                <p>
                  Our team of experienced traders, developers, and financial experts came together 
                  to create a platform that combines cutting-edge technology with user-friendly design.
                </p>
                <p>
                  Today, we serve thousands of traders worldwide, offering them the tools and 
                  support they need to succeed in binary options and forex trading.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
                alt="Trading technology"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Compliance Note */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Regulatory Compliance</h3>
              <p className="text-lg">
                Binoryx operates in full compliance with international financial regulations. 
                We are committed to maintaining the highest standards of transparency and security 
                in all our operations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default AboutPage;
