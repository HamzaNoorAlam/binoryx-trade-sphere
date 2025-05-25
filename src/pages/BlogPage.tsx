
import { Link } from 'react-router-dom';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BlogPage = () => {
  const articles = [
    {
      id: '1',
      title: 'Complete Guide to Binary Options Trading for Beginners',
      excerpt: 'Learn the fundamentals of binary options trading, including basic strategies, risk management, and how to get started with your first trade.',
      category: 'Education',
      author: 'Trading Team',
      date: '2024-01-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
    },
    {
      id: '2',
      title: 'Top 5 Risk Management Strategies for Binary Options',
      excerpt: 'Discover proven risk management techniques that professional traders use to protect their capital and maximize long-term profits.',
      category: 'Strategy',
      author: 'Sarah Johnson',
      date: '2024-01-12',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
    },
    {
      id: '3',
      title: 'Understanding Market Analysis: Technical vs Fundamental',
      excerpt: 'Learn the difference between technical and fundamental analysis and how to use both approaches to make better trading decisions.',
      category: 'Analysis',
      author: 'Mike Chen',
      date: '2024-01-10',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop'
    },
    {
      id: '4',
      title: 'Cryptocurrency Trading: Bitcoin and Ethereum Opportunities',
      excerpt: 'Explore the exciting world of cryptocurrency trading and learn how to identify profitable opportunities in Bitcoin, Ethereum, and other digital assets.',
      category: 'Crypto',
      author: 'Emma Rodriguez',
      date: '2024-01-08',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop'
    },
    {
      id: '5',
      title: 'Psychology of Trading: Mastering Your Emotions',
      excerpt: 'Understand the psychological aspects of trading and learn how to control emotions like fear and greed to become a more successful trader.',
      category: 'Psychology',
      author: 'Trading Team',
      date: '2024-01-05',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop'
    },
    {
      id: '6',
      title: 'Economic Calendar: How News Events Affect Markets',
      excerpt: 'Learn how to use economic calendars and news events to predict market movements and time your trades for maximum profitability.',
      category: 'News',
      author: 'David Wilson',
      date: '2024-01-03',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'
    }
  ];

  const categories = ['All', 'Education', 'Strategy', 'Analysis', 'Crypto', 'Psychology', 'News'];

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Trading Blog</h1>
            <p className="text-xl text-muted-foreground">
              Expert insights, strategies, and educational content to help you succeed in trading
            </p>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === 'All' ? 'default' : 'secondary'}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <Link to={`/blog/${article.id}`}>
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-20 text-center p-8 bg-primary rounded-lg">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">
              Stay Updated with Market Insights
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Subscribe to our newsletter for the latest trading tips, market analysis, and platform updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border-0 text-foreground"
              />
              <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
};

export default BlogPage;
