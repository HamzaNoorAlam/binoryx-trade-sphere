
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { TrendingUp, Shield, Clock, DollarSign } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: DollarSign,
      title: 'Start with $1',
      description: 'Begin your trading journey with the lowest minimum deposit in the industry.'
    },
    {
      icon: TrendingUp,
      title: 'High Returns',
      description: 'Earn up to 95% profit on successful trades with our competitive payout rates.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your funds and personal data are protected with advanced security measures.'
    },
    {
      icon: Clock,
      title: '24/7 Trading',
      description: 'Trade anytime with our round-the-clock market access and support.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Binoryx has transformed my trading experience. The platform is intuitive and profitable.',
      profit: '+$2,450'
    },
    {
      name: 'Mike Chen',
      text: 'Starting with just $1, I was able to grow my account steadily. Highly recommended!',
      profit: '+$1,890'
    },
    {
      name: 'Emma Rodriguez',
      text: 'The best trading platform I have used. Fast execution and great customer support.',
      profit: '+$3,120'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Start with <span className="text-primary">$1</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join millions of traders on the world's leading binary options platform. 
            Trade with confidence and earn up to 95% profit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-4 trading-up">
                Start Trading Now
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Try Demo Account
              </Button>
            </Link>
          </div>

          {/* Live Chart Preview */}
          <div className="max-w-4xl mx-auto">
            <Card className="trading-chart border-trading-border">
              <CardContent className="p-6">
                <iframe
                  src="https://s.tradingview.com/widgetembed/?symbol=BINANCE:BTCUSDT&interval=1&theme=dark&style=1&locale=en&toolbar_bg=%23f1f3f6&enable_publishing=false&allow_symbol_change=true&referral_id=38514"
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowFullScreen
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Binoryx?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-primary-foreground" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Traders Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-primary font-bold">{testimonial.profit}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of successful traders today
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default HomePage;
