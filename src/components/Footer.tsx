import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-serif">Zoshe</h3>
            <p className="text-sm opacity-90">
              Luxury fragrances crafted with the finest ingredients for the most discerning connoisseurs.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">About Us</Link>
              <Link to="/catalog" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">Our Perfumes</Link>
              <Link to="/customization" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">Custom Services</Link>
              <Link to="/reviews" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">Reviews</Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <div className="space-y-2">
              <p className="text-sm opacity-90">Custom Hampers</p>
              <p className="text-sm opacity-90">Festive Collections</p>
              <p className="text-sm opacity-90">Corporate Solutions</p>
              <p className="text-sm opacity-90">Scent Laboratory</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm opacity-90">hello@zoshe.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm opacity-90">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm opacity-90">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-75">
            © 2024 Zoshe Perfumes. All rights reserved. | 
            <Link to="/policies" className="ml-1 hover:opacity-100 transition-opacity">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;