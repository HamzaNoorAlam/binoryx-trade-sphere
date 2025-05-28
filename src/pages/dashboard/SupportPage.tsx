
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Phone, Mail, Clock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

const SupportPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('contact');
  
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    message: ''
  });

  const [tickets] = useState([
    {
      id: 'T001',
      subject: 'Withdrawal Request Delay',
      category: 'Withdrawal',
      status: 'open',
      priority: 'high',
      created: '2024-01-15 10:30',
      lastUpdate: '2024-01-15 14:20',
      messages: 3
    },
    {
      id: 'T002',
      subject: 'KYC Document Upload Issue',
      category: 'Account',
      status: 'resolved',
      priority: 'medium',
      created: '2024-01-12 09:15',
      lastUpdate: '2024-01-13 16:45',
      messages: 5
    },
    {
      id: 'T003',
      subject: 'Trading Platform Technical Issue',
      category: 'Technical',
      status: 'pending',
      priority: 'low',
      created: '2024-01-10 15:20',
      lastUpdate: '2024-01-11 11:30',
      messages: 2
    }
  ]);

  const faqs = [
    {
      question: 'How long does it take to process withdrawals?',
      answer: 'Withdrawal processing typically takes 1-3 business days for bank transfers and up to 24 hours for cryptocurrency withdrawals.',
      category: 'Withdrawal'
    },
    {
      question: 'What documents are required for KYC verification?',
      answer: 'You need to provide a government-issued ID (passport, driver\'s license, or national ID), proof of address (utility bill or bank statement), and a selfie with your ID.',
      category: 'Account'
    },
    {
      question: 'What is the minimum deposit amount?',
      answer: 'The minimum deposit amount is $10 for most payment methods. However, some payment providers may have higher minimums.',
      category: 'Deposit'
    },
    {
      question: 'Can I cancel a trade after placing it?',
      answer: 'Yes, you can cancel trades before expiry. The refund percentage decreases as the expiry time approaches.',
      category: 'Trading'
    },
    {
      question: 'How do I switch between real and demo accounts?',
      answer: 'You can switch between accounts using the dropdown menu in the trading room or dashboard header.',
      category: 'Account'
    }
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ticketForm.subject || !ticketForm.category || !ticketForm.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Support Ticket Created",
      description: "Your ticket has been submitted. We'll respond within 24 hours.",
    });

    setTicketForm({
      subject: '',
      category: '',
      priority: 'medium',
      message: ''
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className="bg-green-600">Open</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'resolved':
        return <Badge className="bg-blue-600">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">Get help with your trading account and platform</p>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-muted-foreground mb-4">Chat with our support team in real-time</p>
            <Button className="w-full">Start Chat</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-4">Send us an email and we'll respond within 24 hours</p>
            <Button variant="outline" className="w-full">support@binoryx.com</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-muted-foreground mb-4">Call us during business hours</p>
            <Button variant="outline" className="w-full">+1 (555) 123-4567</Button>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        {[
          { id: 'contact', label: 'New Ticket' },
          { id: 'tickets', label: 'My Tickets' },
          { id: 'faq', label: 'FAQ' }
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="rounded-md"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Contact Form */}
      {activeTab === 'contact' && (
        <Card>
          <CardHeader>
            <CardTitle>Create Support Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Subject *</label>
                  <Input
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Category *</label>
                  <Select value={ticketForm.category} onValueChange={(value) => setTicketForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="trading">Trading Questions</SelectItem>
                      <SelectItem value="deposit">Deposit Issues</SelectItem>
                      <SelectItem value="withdrawal">Withdrawal Issues</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="kyc">KYC Verification</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <Select value={ticketForm.priority} onValueChange={(value) => setTicketForm(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Message *</label>
                <Textarea
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Please describe your issue in detail..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full lg:w-auto">
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* My Tickets */}
      {activeTab === 'tickets' && (
        <Card>
          <CardHeader>
            <CardTitle>My Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">Ticket #{ticket.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(ticket.status)}
                      {getPriorityBadge(ticket.priority)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <div>{ticket.category}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <div>{ticket.created}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Update:</span>
                      <div>{ticket.lastUpdate}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Messages:</span>
                      <div>{ticket.messages}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* FAQ */}
      {activeTab === 'faq' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{faq.question}</h3>
                      <Badge variant="outline">{faq.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mt-2">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Support Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Support Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold">Live Chat</h4>
              <p className="text-muted-foreground">24/7 Available</p>
            </div>
            <div>
              <h4 className="font-semibold">Email Support</h4>
              <p className="text-muted-foreground">24/7 - Response within 24 hours</p>
            </div>
            <div>
              <h4 className="font-semibold">Phone Support</h4>
              <p className="text-muted-foreground">Mon-Fri, 9:00 AM - 6:00 PM (UTC)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPage;
