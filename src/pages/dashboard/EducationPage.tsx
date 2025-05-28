
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Clock, Star, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EducationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Binary Options Trading Basics',
      description: 'Learn the fundamentals of binary options trading, risk management, and market analysis.',
      duration: '2h 30m',
      level: 'Beginner',
      rating: 4.8,
      lessons: 12,
      category: 'basics',
      thumbnail: '/api/placeholder/300/200',
      isVideo: true
    },
    {
      id: 2,
      title: 'Technical Analysis Mastery',
      description: 'Master chart patterns, indicators, and technical analysis tools for better trading decisions.',
      duration: '4h 15m',
      level: 'Intermediate',
      rating: 4.9,
      lessons: 18,
      category: 'technical',
      thumbnail: '/api/placeholder/300/200',
      isVideo: true
    },
    {
      id: 3,
      title: 'Risk Management Strategies',
      description: 'Protect your capital with proven risk management techniques and position sizing.',
      duration: '1h 45m',
      level: 'Advanced',
      rating: 4.7,
      lessons: 8,
      category: 'risk',
      thumbnail: '/api/placeholder/300/200',
      isVideo: false
    },
    {
      id: 4,
      title: 'Forex Market Psychology',
      description: 'Understand market psychology and how emotions affect trading decisions.',
      duration: '3h 20m',
      level: 'Intermediate',
      rating: 4.6,
      lessons: 15,
      category: 'psychology',
      thumbnail: '/api/placeholder/300/200',
      isVideo: true
    }
  ];

  const articles = [
    {
      id: 1,
      title: '10 Common Trading Mistakes to Avoid',
      excerpt: 'Learn about the most common mistakes that new traders make and how to avoid them.',
      readTime: '5 min read',
      category: 'basics',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Understanding Market Volatility',
      excerpt: 'How to trade during high volatility periods and protect your portfolio.',
      readTime: '8 min read',
      category: 'technical',
      date: '2024-01-12'
    },
    {
      id: 3,
      title: 'The Psychology of Successful Trading',
      excerpt: 'Mental strategies used by professional traders to maintain discipline.',
      readTime: '12 min read',
      category: 'psychology',
      date: '2024-01-10'
    }
  ];

  const webinars = [
    {
      id: 1,
      title: 'Live Market Analysis Session',
      date: '2024-01-20',
      time: '15:00 UTC',
      instructor: 'John Smith',
      isLive: true
    },
    {
      id: 2,
      title: 'Advanced Trading Strategies Workshop',
      date: '2024-01-22',
      time: '14:00 UTC',
      instructor: 'Sarah Johnson',
      isLive: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Trading Education</h1>
        <p className="text-muted-foreground">Enhance your trading skills with our comprehensive learning resources</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search courses, articles, and resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="basics">Trading Basics</SelectItem>
            <SelectItem value="technical">Technical Analysis</SelectItem>
            <SelectItem value="risk">Risk Management</SelectItem>
            <SelectItem value="psychology">Psychology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Video Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Video Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                  <Play className="w-12 h-12 text-muted-foreground" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    {course.isVideo && <Badge variant="outline">Video</Badge>}
                  </div>
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                  <Button className="w-full">Start Course</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Trading Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{article.readTime}</span>
                      <span>{article.date}</span>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Read</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Webinars */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Webinars</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {webinars.map((webinar) => (
              <div key={webinar.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{webinar.title}</h3>
                    <p className="text-muted-foreground">by {webinar.instructor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm">{webinar.date} at {webinar.time}</span>
                      {webinar.isLive && <Badge className="bg-red-600">Live</Badge>}
                    </div>
                  </div>
                  <Button variant={webinar.isLive ? "default" : "outline"}>
                    {webinar.isLive ? "Join Now" : "Register"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationPage;
