import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Mail, Phone } from 'lucide-react';
import Zoshe_Logo from "../assets/Zoshe_Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Customization', path: '/customization' },
    // { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
    { name: 'Policies', path: '/policies' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={Zoshe_Logo} alt="Zoshe Logo" className="h-12 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-200 hover:text-purple-600 hover:scale-105 ${isActive(item.path)
                      ? 'text-purple-600 border-b-2 border-purple-600 pb-1'
                      : 'text-gray-700'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 p-3 rounded-lg bg-purple-100/50 hover:bg-purple-200/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-6 h-0.5 bg-purple-800 transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-6 h-0.5 bg-purple-800 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-purple-800 transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Side Menu */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-white via-purple-50/90 to-blue-50/90 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-purple-200/50">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img src={Zoshe_Logo} alt="Zoshe Logo" className="h-10 w-auto object-contain" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-purple-100/50 hover:bg-purple-200/50 text-purple-800 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 px-6 py-8 overflow-y-auto">
              <div className="space-y-6">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-medium transition-all duration-300 hover:text-purple-600 hover:translate-x-2 hover:scale-105 ${isActive(item.path)
                        ? 'text-purple-600 font-semibold border-l-4 border-purple-600 pl-4'
                        : 'text-gray-700'
                      }`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: isOpen ? 'slideInRight 0.5s ease-out forwards' : ''
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div className="px-6 py-6 border-t border-purple-200/50 bg-gradient-to-r from-purple-50/50 to-blue-50/50">
              <div className="flex flex-col gap-3">

                {/* Contact Info */}
                <a href="mailto:zosheperfume@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm opacity-90">zosheperfume@gmail.com</span>
                </a>

                <a href="tel:+917977233704" className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm opacity-90">+91 79772 33704</span>
                </a>

                {/* Instagram Icon aligned with email & phone */}
                <a
                  href="https://www.instagram.com/zoshe.perfume?igsh=MWdwd3ozdmFraG82bw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-all"
                >
                  <Instagram className="w-5 h-5 text-gray-600 hover:text-purple-600" />
                  <span className="text-sm opacity-90">@zoshe.perfume</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CSS animation */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
