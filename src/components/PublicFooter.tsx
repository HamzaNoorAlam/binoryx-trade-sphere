
import { Link } from 'react-router-dom';

const PublicFooter = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Binoryx</h3>
            <p className="text-muted-foreground">
              Professional binary options and forex trading platform. Start with just $1.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-primary">About Us</Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary">FAQ</Link>
              <Link to="/blog" className="block text-muted-foreground hover:text-primary">Blog</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <Link to="/terms" className="block text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary">Privacy Policy</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: support@binoryx.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>24/7 Customer Support</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Binoryx. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
