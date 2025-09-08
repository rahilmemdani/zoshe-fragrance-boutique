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
              <a
                href="https://www.instagram.com/zoshe.perfume?igsh=MWdwd3ozdmFraG82bw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/share/1FCQw1q7s8/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 hover:text-accent cursor-pointer transition-colors" />
              </a>
            </div>
            
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">About Us</Link>
              <Link to="/catalog" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">Our Perfumes</Link>
              <Link to="/customization" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">Custom Services</Link>
              <Link to="/contact" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">Contact Us</Link>
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
                <a href="mailto:zosheperfume@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm opacity-90">zosheperfume@gmail.com</span>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <a href="tel:+917977233704" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm opacity-90">+91 79772 33704</span>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm opacity-90">Mumbai, India</span>
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