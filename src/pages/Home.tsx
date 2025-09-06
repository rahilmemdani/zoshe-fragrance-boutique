import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowRight, Sparkles, Heart, Users, MessageCircle, Eye, ChevronLeft, ChevronRight, Phone, Mail, Clock, Shield, Truck, Award, Gift, Percent, X, Bell, Headphones, CheckCircle, Search, ChevronDown, HelpCircle, Zap, ArrowDown, MessageCircleQuestion, BookOpenText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import heroPerfume from '@/assets/hero-perfume.jpeg';
import perfumeCollection from '@/assets/perfume-collection.jpg';
import { useEffect, useRef, useState } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from "../lib/sanityClient";
import { openWhatsApp } from "../lib/whatsApp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  return builder.image(source);
}

interface Perfume {
  _id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  description: { _type: string; children: { text: string }[] }[];
  images: { asset: any }[];
  scentProfile?: string[];
  promotion?: string;
  isPremium?: string;
  isActive?: string;
  isOutOfStock?: string;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 🚀 BUSINESS BOOSTING COMPONENTS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// 1. WhatsApp Floating Widget (Global - place in App.tsx or layout)
const WhatsAppFloatingWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); // Simulated unread messages

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl p-4 w-80 border border-green-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">ZOSHE Support</h4>
                <p className="text-sm text-green-600">●  Online now</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="ml-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <div className="bg-gray-100 rounded-lg p-3">
                <p>👋 Hi! Welcome to ZOSHE!</p>
                <p className="mt-1">How can I help you find your perfect fragrance today?</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white text-xs"
                onClick={() => openWhatsApp("I need help choosing a perfume")}
              >
                💐 Choose Perfume
              </Button>
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white text-xs"
                onClick={() => openWhatsApp("I want to create a custom hamper")}
              >
                🎁 Custom Hamper
              </Button>
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white text-xs"
                onClick={() => openWhatsApp("What's the price for")}
              >
                💰 Check Price
              </Button>
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white text-xs"
                onClick={() => openWhatsApp("I have a question about")}
              >
                ❓ Ask Question
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-colors"
      >
        <MessageCircle className="w-8 h-8" />

        {/* Unread badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
          >
            {unreadCount}
          </motion.div>
        )}

        {/* Pulse animation */}
        {/* <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div> */}
      </motion.button>
    </div>
  );
};



const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);

  // Hardcoded icons map (based on index order)
  const icons = [
    <Clock className="w-5 h-5" />,
    <Gift className="w-5 h-5" />,
    <Shield className="w-5 h-5" />,
    <Truck className="w-5 h-5" />,
  ];

  useEffect(() => {
    const fetchFaqs = async () => {
      const data = await sanityClient.fetch(`*[_type == "faq"] | order(order asc){
        question,
        answer
      }`);
      setFaqs(data);
    };
    fetchFaqs();
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions about our luxury fragrances, shipping, and services.
          </p>

          <Button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg px-8 py-3 rounded-full font-semibold group relative overflow-hidden"
            onClick={() => openWhatsApp("I have a question that's not in your FAQ")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <MessageCircle className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Ask Your Question</span>
          </Button>
        </motion.div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <motion.div
                  className="cursor-pointer"
                  onClick={() => toggleExpanded(index)}
                  whileHover={{ scale: 1.01 }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <div className="text-white">
                            {/* {icons[index % icons.length]} */}
                            <BookOpenText className="h-5 w-5 text-muted-foreground text-white" />
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">
                          {faq.question}
                        </h3>
                      </div>

                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          expandedIndex === index
                            ? "bg-accent/10 text-accent"
                            : "bg-muted/50 text-muted-foreground hover:bg-accent/10 hover:text-accent"
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 border-t border-border/40 mt-6">
                            <motion.p
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -10, opacity: 0 }}
                              transition={{ delay: 0.1, duration: 0.2 }}
                              className="text-muted-foreground leading-relaxed mb-6"
                            >
                              {faq.answer}
                            </motion.p>

                            <motion.div
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: 10, opacity: 0 }}
                              transition={{ delay: 0.2, duration: 0.2 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openWhatsApp(`I want to know more about: ${faq.question}`);
                                }}
                                className="text-green-600 hover:bg-green-50 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 group/btn"
                              >
                                <MessageCircle className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                                Chat for More Details
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


interface Banner {
  title: string;
  subtitle: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  endDate?: string;
}

const OfferBanner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Fetch banners from Sanity
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "banner" && isActive == true && now() >= startDate && now() <= endDate]{
            title,
            subtitle,
            "imageUrl": image.asset->url,
            ctaText,
            ctaLink,
            endDate
          }
        `);
        if (data.length > 0) {
          setBanners(data);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanners();
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [banners.length]);

  // Countdown timer
  useEffect(() => {
    if (!banners.length) return;
    const activeBanner = banners[currentIndex];
    if (!activeBanner?.endDate) return;

    const updateCountdown = () => {
      const end = new Date(activeBanner.endDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, end - now);

      if (diff <= 0) {
        setIsVisible(false);
        return;
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, banners]);

  if (!isVisible || banners.length === 0) return null;

  const activeBanner = banners[currentIndex];
  const hasImage = activeBanner.imageUrl;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative shadow-lg  overflow-hidden"
    >
      {/* Background - Conditional Image or Gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {hasImage ? (
            <>
              {/* Background Image */}
              <img
                src={activeBanner.imageUrl}
                alt={activeBanner.title}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </>
          ) : (
            <>
              {/* Gradient Background when no image */}
              <div className="w-full h-full bg-gradient-to-r from-primary to-accent" />
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer"></div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-3 text-white">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          {/* Top Row - Title and Close */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                <Gift className="w-5 h-5 flex-shrink-0 mt-0.5" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-tight">{activeBanner.title}</h3>
                {activeBanner.subtitle && (
                  <p className="text-xs text-white/90 mt-1 line-clamp-2 leading-tight">
                    {activeBanner.subtitle}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 p-1.5 flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Bottom Row - Countdown and CTA */}
          <div className="flex items-center justify-between gap-3">
            {/* Mobile Countdown */}
            {activeBanner.endDate && (
              <div className="flex items-center gap-2 text-xs font-mono bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Ends in:</span>
                <div className="flex items-center gap-1">
                  <span className="bg-white/25 px-1.5 py-0.5 rounded text-xs font-bold min-w-[1.25rem] text-center">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-white/60">:</span>
                  <span className="bg-white/25 px-1.5 py-0.5 rounded text-xs font-bold min-w-[1.25rem] text-center">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-white/60">:</span>
                  <span className="bg-white/25 px-1.5 py-0.5 rounded text-xs font-bold min-w-[1.25rem] text-center">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
            )}

            {/* Mobile CTA */}
            {(activeBanner.ctaLink || activeBanner.ctaText) && (
              <div className="flex-shrink-0">
                {activeBanner.ctaLink ? (
                  <a
                    href={activeBanner.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-primary font-bold text-xs px-4 py-2 rounded-full hover:bg-white/90 transition-colors shadow-lg"
                  >
                    {activeBanner.ctaText || "Shop Now"}
                  </a>
                ) : (
                  <Button
                    onClick={() => openWhatsApp(activeBanner.ctaText || "I'm interested in your current offer")}
                    size="sm"
                    className="bg-white text-primary font-bold text-xs px-4 py-2 rounded-full hover:bg-white/90 shadow-lg"
                  >
                    {activeBanner.ctaText || "Shop Now"}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Mobile Banner Dots */}
          {banners.length > 1 && (
            <div className="flex justify-center gap-2 mt-3 pt-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between gap-6 py-2">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                <Gift className="w-6 h-6 flex-shrink-0" />
              </motion.div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{activeBanner.title}</h3>
                {activeBanner.subtitle && (
                  <p className="text-sm text-white/90 mt-0.5">
                    {activeBanner.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Countdown */}
          {activeBanner.endDate && (
            <div className="flex items-center gap-3 text-sm font-mono bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap">Ends in:</span>
              <div className="flex items-center gap-1">
                <motion.span
                  key={timeLeft.hours}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white/25 px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center"
                >
                  {String(timeLeft.hours).padStart(2, '0')}
                </motion.span>
                <span className="text-white/60">:</span>
                <motion.span
                  key={timeLeft.minutes}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white/25 px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center"
                >
                  {String(timeLeft.minutes).padStart(2, '0')}
                </motion.span>
                <span className="text-white/60">:</span>
                <motion.span
                  key={timeLeft.seconds}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white/25 px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center"
                >
                  {String(timeLeft.seconds).padStart(2, '0')}
                </motion.span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {/* Desktop Banner Navigation */}
            {banners.length > 1 && (
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-full"
                  aria-label="Previous banner"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex gap-1.5">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                        }`}
                      aria-label={`Go to banner ${index + 1}`}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentIndex(prev => (prev + 1) % banners.length)}
                  className="text-white hover:bg-white/20 p-1.5 rounded-full"
                  aria-label="Next banner"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Desktop CTA */}
            {(activeBanner.ctaLink || activeBanner.ctaText) && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeBanner.ctaLink ? (
                  <a
                    href={activeBanner.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-primary font-bold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors shadow-lg backdrop-blur-sm"
                  >
                    {activeBanner.ctaText || "Shop Now"}
                  </a>
                ) : (
                  <Button
                    onClick={() => openWhatsApp(activeBanner.ctaText || "I'm interested in your current offer")}
                    className="bg-white text-primary font-bold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 shadow-lg backdrop-blur-sm"
                  >
                    {activeBanner.ctaText || "Shop Now"}
                  </Button>
                )}
              </motion.div>
            )}

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 p-2 rounded-full"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OfferBannerHero = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Fetch banners from Sanity
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "banner" && isActive == true && now() >= startDate && now() <= endDate]{
            title,
            subtitle,
            "imageUrl": image.asset->url,
            ctaText,
            ctaLink,
            endDate
          }
        `);
        if (data.length > 0) {
          setBanners(data);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanners();
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [banners.length]);

  // Countdown timer
  useEffect(() => {
    if (!banners.length) return;
    const activeBanner = banners[currentIndex];
    if (!activeBanner?.endDate) return;

    const updateCountdown = () => {
      const end = new Date(activeBanner.endDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, end - now);

      if (diff <= 0) {
        setIsVisible(false);
        return;
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [currentIndex, banners]);

  if (!isVisible || banners.length === 0) return null;

  const activeBanner = banners[currentIndex];
  const hasImage = activeBanner.imageUrl;

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <motion.div
        initial={{ y: -30, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -30, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut", type: "spring", bounce: 0.2 }}
        className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 group"
      >
        {/* Enhanced Background with Beautiful Overlays */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {hasImage ? (
              <>
                <img
                  src={activeBanner.imageUrl}
                  alt={activeBanner.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Enhanced overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
              </>
            ) : (
              <>
                <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-primary" />
                {/* Premium pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer" />
                </div>
                {/* Floating decorative elements */}
                <div className="absolute top-4 right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-4 left-8 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Premium Content Container */}
        <div className="relative z-10 text-white">

          {/* Mobile Layout - Enhanced */}
          <div className="block lg:hidden p-6">
            <div className="space-y-4">
              {/* Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2"
                  >
                    <Gift className="w-6 h-6 text-accent" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      key={activeBanner.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-bold text-lg leading-tight bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent"
                    >
                      {activeBanner.title}
                    </motion.h3>
                    {activeBanner.subtitle && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm text-white/90 mt-1 line-clamp-2 leading-relaxed"
                      >
                        {activeBanner.subtitle}
                      </motion.p>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
                  aria-label="Close banner"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Mobile Countdown */}
                {activeBanner.endDate && (
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 w-full sm:w-auto">
                    <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-xs font-medium text-white/90">Ends in:</span>
                    <div className="flex items-center gap-1">
                      {[
                        { value: timeLeft.hours, label: 'H' },
                        { value: timeLeft.minutes, label: 'M' },
                        { value: timeLeft.seconds, label: 'S' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          {index > 0 && <span className="text-white/60 mx-1">:</span>}
                          <motion.div
                            key={item.value}
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white/25 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold min-w-[1.75rem] text-center border border-white/20"
                          >
                            {String(item.value).padStart(2, '0')}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile CTA */}
                {(activeBanner.ctaLink || activeBanner.ctaText) && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-shrink-0 w-full sm:w-auto"
                  >
                    {activeBanner.ctaLink ? (
                      <a
                        href={activeBanner.ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-white to-white/95 text-primary font-bold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-white/25 transition-all duration-300 group"
                      >
                        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        {activeBanner.ctaText || "Shop Now"}
                      </a>
                    ) : (
                      <Button
                        onClick={() => openWhatsApp(activeBanner.ctaText || "I'm interested in your current offer")}
                        className="w-full sm:w-auto bg-gradient-to-r from-white to-white/95 text-primary font-bold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-white/25 transition-all duration-300 group"
                      >
                        <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                        {activeBanner.ctaText || "Shop Now"}
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>


              {/* Mobile Banner Dots */}
              {banners.length > 1 && (
                <div className="flex justify-center items-center gap-3 pt-2">
                  {banners.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                          ? 'bg-accent shadow-lg shadow-accent/50 scale-125'
                          : 'bg-white/40 hover:bg-white/60'
                        }`}
                      aria-label={`Go to banner ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout - Premium */}
          <div className="hidden lg:flex items-center justify-between gap-8 p-8">

            {/* Left Content */}
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
              >
                <Gift className="w-8 h-8 text-accent" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.h3
                  key={activeBanner.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-bold text-2xl xl:text-3xl leading-tight bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent mb-2"
                >
                  {activeBanner.title}
                </motion.h3>
                {activeBanner.subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/90 text-lg max-w-2xl leading-relaxed"
                  >
                    {activeBanner.subtitle}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Center - Premium Countdown */}
            {activeBanner.endDate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 bg-black/30 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-accent" />
                  <span className="text-white/90 font-medium">Ends in:</span>
                </div>

                <div className="flex items-center gap-2">
                  {[
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Minutes' },
                    { value: timeLeft.seconds, label: 'Seconds' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      {index > 0 && <span className="text-white/60 mx-2 text-xl">:</span>}
                      <div className="text-center">
                        <motion.div
                          key={item.value}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="bg-gradient-to-b from-white/30 to-white/20 backdrop-blur-sm px-3 py-2 rounded-xl text-xl font-bold min-w-[3rem] text-center border border-white/20 shadow-lg"
                        >
                          {String(item.value).padStart(2, '0')}
                        </motion.div>
                        <div className="text-xs text-white/60 mt-1 font-medium">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Right - Actions */}
            <div className="flex items-center gap-4">

              {/* Banner Navigation */}
              {banners.length > 1 && (
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300"
                    aria-label="Previous banner"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <div className="flex gap-2">
                    {banners.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                            ? 'bg-accent shadow-lg shadow-accent/50'
                            : 'bg-white/40 hover:bg-white/60'
                          }`}
                        aria-label={`Go to banner ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentIndex(prev => (prev + 1) % banners.length)}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300"
                    aria-label="Next banner"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              )}

              {/* Premium CTA */}
              {(activeBanner.ctaLink || activeBanner.ctaText) && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  {activeBanner.ctaLink ? (
                    <a
                      href={activeBanner.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gradient-to-r from-white via-white to-white/95 text-primary font-bold text-lg px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-white/25 transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Zap className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform relative z-10" />
                      <span className="relative z-10">{activeBanner.ctaText || "Shop Now"}</span>
                    </a>
                  ) : (
                    <Button
                      onClick={() => openWhatsApp(activeBanner.ctaText || "I'm interested in your current offer")}
                      className="bg-gradient-to-r from-white via-white to-white/95 text-primary font-bold text-lg px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-white/25 transition-all duration-500 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Zap className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform relative z-10" />
                      <span className="relative z-10">{activeBanner.ctaText || "Shop Now"}</span>
                    </Button>
                  )}
                </motion.div>
              )}

              {/* Enhanced Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                aria-label="Close banner"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Premium Hover Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />
      </motion.div>
    </div>
  );
};


const LiveSocialProof = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const notifications = [
    { name: "Priya M.", location: "Mumbai", product: "Rose Oud Premium", action: "just ordered", time: "2 min ago", verified: true },
    { name: "Rahul S.", location: "Delhi", product: "Sandalwood Collection", action: "purchased", time: "5 min ago", verified: true },
    { name: "Anita K.", location: "Bangalore", product: "Custom Hamper", action: "ordered", time: "8 min ago", verified: true },
    { name: "Vikash P.", location: "Pune", product: "Jasmine Luxury", action: "just bought", time: "12 min ago", verified: true }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const current = notifications[currentNotification];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -350, opacity: 0 }}
          className="fixed bottom-24 left-6 z-40 max-w-sm"
        >
          <Card className="bg-white/95 backdrop-blur-md border border-green-200 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-800">{current.name}</p>
                    <p className="text-xs text-gray-500">from {current.location}</p>
                    {current.verified && <CheckCircle className="w-3 h-3 text-green-500" />}
                  </div>
                  <p className="text-xs text-gray-600">{current.action} <span className="font-semibold text-primary">{current.product}</span></p>
                  <p className="text-xs text-gray-400">{current.time}</p>
                </div>
                <div className="text-green-600">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 4. Newsletter Signup with WhatsApp Integration
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email || phone) {
      setIsSubmitted(true);
      // Send to WhatsApp
      const message = `New Newsletter Signup:%0A${email ? `Email: ${email}` : ''}%0A${phone ? `Phone: ${phone}` : ''}%0APlease send me fragrance updates and exclusive offers!`;
      setTimeout(() => {
        openWhatsApp(message);
        setIsSubmitted(false);
        setEmail('');
        setPhone('');
      }, 1500);
    }
  };

  // return (
  //   <section className="py-16 bg-gradient-to-r from-primary via-accent to-primary relative overflow-hidden">
  //     <div className="absolute inset-0 opacity-20">
  //       <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
  //       <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
  //     </div>

  //     <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         viewport={{ once: true }}
  //         className="space-y-6"
  //       >
  //         <div className="flex items-center justify-center gap-3 mb-4">
  //           <div className="bg-white/20 p-3 rounded-full">
  //             <Gift className="w-8 h-8 text-white" />
  //           </div>
  //           <h3 className="text-3xl md:text-4xl font-bold text-white">
  //             Get Exclusive Offers & Updates
  //           </h3>
  //         </div>

  //         <p className="text-xl text-white/90 max-w-2xl mx-auto">
  //           Join 5,000+ fragrance lovers and get first access to new collections, special discounts, and personalized fragrance tips directly on WhatsApp!
  //         </p>

  //         {!isSubmitted ? (
  //           <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
  //             <Input
  //               type="email"
  //               placeholder="Your email address"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               className="w-full px-4 py-3 rounded-full bg-white/90 border-0 focus:bg-white"
  //             />
  //             <Input
  //               type="tel"
  //               placeholder="WhatsApp number (optional)"
  //               value={phone}
  //               onChange={(e) => setPhone(e.target.value)}
  //               className="w-full px-4 py-3 rounded-full bg-white/90 border-0 focus:bg-white"
  //             />
  //             <Button 
  //               type="submit"
  //               className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold text-lg"
  //               disabled={!email && !phone}
  //             >
  //               <MessageCircle className="w-5 h-5 mr-2" />
  //               Join WhatsApp Updates
  //             </Button>
  //             <p className="text-white/70 text-sm">
  //               Get instant notifications about new arrivals and exclusive deals!
  //             </p>
  //           </form>
  //         ) : (
  //           <motion.div
  //             initial={{ scale: 0 }}
  //             animate={{ scale: 1 }}
  //             className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto"
  //           >
  //             <div className="text-white text-center">
  //               <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
  //                 <CheckCircle className="w-8 h-8 text-white" />
  //               </div>
  //               <h4 className="text-xl font-bold mb-2">Welcome to ZOSHE Family!</h4>
  //               <p className="text-sm">Redirecting you to WhatsApp for instant updates...</p>
  //             </div>
  //           </motion.div>
  //         )}
  //       </motion.div>
  //     </div>
  //   </section>
  // );
};

// 5. Enhanced Trust Badges
const TrustBadgesSection = () => {
  const badges = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Authentic",
      description: "Genuine luxury fragrances",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "On orders above ₹2,999",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "24/7 WhatsApp Support",
      description: "Instant customer service",
      color: "from-green-600 to-green-700"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Handcrafted excellence",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-12 bg-muted/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group cursor-pointer"
              onClick={() => openWhatsApp(`Tell me more about ${badge.title}`)}
            >
              <div className={`bg-gradient-to-r ${badge.color} p-4 rounded-2xl mb-3 group-hover:scale-110 transition-all duration-300 mx-auto w-fit shadow-lg group-hover:shadow-xl`}>
                <div className="text-white">
                  {badge.icon}
                </div>
              </div>
              <h4 className="font-bold text-sm mb-1 text-primary">{badge.title}</h4>
              <p className="text-xs text-muted-foreground">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. WhatsApp Quick Actions Bar
const QuickActionsBar = () => {
  const actions = [
    { icon: "💐", text: "Find My Scent", message: "Help me find the perfect fragrance for my personality" },
    { icon: "🎁", text: "Custom Gift", message: "I want to create a custom fragrance hamper" },
    { icon: "💰", text: "Best Deals", message: "What are your current offers and discounts?" },
    { icon: "📞", text: "Call Back", message: "Please call me to discuss fragrance options" }
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-green-50 to-green-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-primary mb-2">Quick Help via WhatsApp</h3>
          <p className="text-muted-foreground">Get instant assistance with any of these options</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openWhatsApp(action.message)}
              className="bg-white hover:bg-green-50 border border-green-200 hover:border-green-300 rounded-xl p-4 text-center transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {action.icon}
              </div>
              <p className="text-sm font-semibold text-primary">{action.text}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// EXISTING COMPONENTS (keeping your PriceDisplay and ProductImageSlider)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

interface PriceDisplayProps {
  price: number;
  discountedPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  className?: string;
}

const PriceDisplay = ({ price, discountedPrice, size = 'md', showBadge = true, className = '' }: PriceDisplayProps) => {
  const getDiscountPercent = (originalPrice: number, discountPrice?: number) => {
    if (!discountPrice || discountPrice >= originalPrice) return null;
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl'
  };

  const hasDiscount = discountedPrice && discountedPrice < price;
  const discountPercent = getDiscountPercent(price, discountedPrice);

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      {hasDiscount ? (
        <>
          <div className="relative">
            <span className={`${sizeClasses[size]} font-bold text-muted-foreground/60 line-through decoration-2 decoration-red-500 lg:text-xl `}>
              ₹{price.toLocaleString()}
            </span>
          </div>

          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-shimmer`}
          >
            ₹{discountedPrice.toLocaleString()}
          </motion.span>

          {showBadge && discountPercent && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
            >
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full shadow-lg border-0 font-semibold">
                <Sparkles className="w-3 h-3 mr-1" />
                {discountPercent}% OFF
              </Badge>
            </motion.div>
          )}
        </>
      ) : (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer`}
        >
          ₹{price.toLocaleString()}
        </motion.span>
      )}
    </div>
  );
};

const ProductImageSlider = ({ perfume, viewMode, onQuickViewClick }: { perfume: Perfume; viewMode: string; onQuickViewClick: () => void; }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const images = perfume.images || [];

  useEffect(() => {
    if (images.length > 1 && !isHovered) {
      intervalRef.current = window.setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [images.length, isHovered]);

  const goToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearInterval(intervalRef.current!);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearInterval(intervalRef.current!);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}
    >
      {images.length > 0 ? (
        <img
          src={urlFor(images[currentImageIndex].asset).width(600).url()}
          alt={`${perfume.name} - Image ${currentImageIndex + 1}`}
          loading="lazy"
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${viewMode === 'list' ? 'h-48' : 'h-64 sm:h-72'}`}
        />
      ) : (
        <div className={`bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${viewMode === 'list' ? 'h-48' : 'h-64 sm:h-72'}`}>
          <div className="text-6xl opacity-50">🌸</div>
        </div>
      )}

      {images.length > 1 && (
        <>
          <div className={`absolute top-1/2 left-2 right-2 flex justify-between -translate-y-1/2 transition-opacity duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button size="icon" variant="ghost" onClick={goToPrevImage} className="bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"><ChevronLeft size={20} /></Button>
            <Button size="icon" variant="ghost" onClick={goToNextImage} className="bg-black/40 hover:bg-black/60 text-white rounded-full h-8 w-8"><ChevronRight size={20} /></Button>
          </div>
          <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 transition-opacity duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {images.map((_, index) => (
              <div key={index} className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <Button
            size="sm"
            className="bg-cream/90 text-primary hover:bg-cream shadow-lg backdrop-blur-sm"
            onClick={onQuickViewClick}
          >
            <Eye className="w-4 h-4 mr-1" />
            Quick View
          </Button>
        </div>
      </div>

      {perfume?.isPremium && (
        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground shadow-lg backdrop-blur-sm z-20">
          Premium
        </Badge>
      )}
    </div>
  );
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// MAIN HOME COMPONENT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const Home = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewPerfume, setQuickViewPerfume] = useState<Perfume | null>(null);
  const [quickViewImageIndex, setQuickViewImageIndex] = useState(0);

  useEffect(() => {
    setQuickViewImageIndex(0);
  }, [quickViewPerfume]);

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "catalogue"]{
            _id,
            name,
            slug,
            price,
            description,
            images,
            scentProfile,
            promotion,
            isPremium,
            isActive,
            isOutOfStock,
            discountedPrice
          }`
        );
        setPerfumes(data);
      } catch (error) {
        console.error('Error fetching catalogue:', error);
      }
    };
    fetchCatalogue();
  }, []);

  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "customization"]{
            _id,
            title,
            description,
            price,
            popular,
            "imageUrl": image.asset->url,
            discountedPrice
          }
        `);
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const testimonials = [
    {
      name: "Ruchita Panjwani",
      rating: 5,
      text: "Amazing fragrances with long-lasting scent. ZOSHE is a product worth buying.",
      verified: true
    },
    {
      name: "Aliza Shaikh",
      rating: 5,
      text: "There's a soothing effect to ZOSHE products... I bought a few and absolutely fell in love with them.",
      verified: true
    },
    {
      name: "Nikita Singh",
      rating: 5,
      text: "Beautiful perfume that is now my everyday favorite. Thank you so much!!!",
      verified: true
    }
  ];

  return (
    <div className="scroll-smooth">
      {/* 🚀 NEW: Business Boosting Components */}
      <OfferBanner />
      {/* <LiveSocialProof /> */}
      <WhatsAppFloatingWidget />


      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroPerfume})`,
            backgroundBlendMode: "lighten",
            backgroundColor: "rgba(255,255,255,0.10)"
          }}
        ></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-cream mb-6">
              Luxury <span className="text-accent">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto" style={{ "color": "black" }}>
              Discover the art of perfumery with ZOSHE's exclusive collection of handcrafted fragrances
            </p>

            {/* Enhanced CTA buttons with WhatsApp integration */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button className="luxury-button text-lg px-8 py-4">
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="glass-card text-cream border-cream/30 hover:bg-cream/10 text-lg px-8 py-4"
                onClick={() => openWhatsApp("I'm interested in custom hampers. Please tell me more about your options.")}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat for Custom Hampers
              </Button>
            </div>

            {/* Quick stats with WhatsApp CTA */}
            {/* <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 bg-black/20 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto"
            >
              <div className="grid grid-cols-3 gap-4 text-center text-white">
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm opacity-90">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm opacity-90">Unique Fragrances</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">WhatsApp Support</div>
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 perfume-float opacity-30">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <div className="absolute bottom-32 right-16 perfume-float opacity-40" style={{ animationDelay: '2s' }}>
          <Heart className="w-6 h-6 text-lavender" />
        </div>
      </section>

      <OfferBannerHero />


      {/* 🚀 NEW: Trust Badges */}
      {/* <TrustBadgesSection /> */}

      {/* 🚀 NEW: Quick Actions Bar */}
      {/* <QuickActionsBar /> */}

      {/* Brand Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Crafted with <span className="text-accent">Passion</span>
              </h2>
              <p className="text-lg sm:text-md text-muted-foreground leading-relaxed">
                ZOSHE crafts its finest products with artistry and emotion, combining high-quality materials in a unique way.
                Each creation carries its own personality, offering a personal choice for everyone.
              </p>
              <div className="grid grid-cols-3 gap-6" style={{ marginBottom: "20px" }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Years of Expertise</div>
                </div>
                {/* <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Unique Fragrances</div>
                </div> */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>

              {/* Enhanced CTA with WhatsApp */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 py-3 border-transparent text-white bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-in-out group hover:border-transparent hover:text-white hover:bg-white hover:shadow-lg hover:shadow-accent/30"
                  >
                    Learn Our Story
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-3 border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                  onClick={() => openWhatsApp("Tell me more about ZOSHE's story and craftsmanship")}
                >
                  <MessageCircle className="mr-2 w-4 h-4" />
                  Chat with Expert
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={perfumeCollection}
                alt="ZOSHE Perfume Collection"
                className="rounded-2xl shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20"></div>

              {/* Floating WhatsApp CTA on image */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute top-4 right-4"
              >
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                  onClick={() => openWhatsApp("I'd like to know more about your fragrance collection")}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Ask About Collection
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products (Enhanced with WhatsApp integration) */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Featured <span className="text-accent">Fragrances</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Discover our most beloved scents, each carefully crafted to evoke emotion and create lasting memories.
            </p>

            {/* WhatsApp help button */}
            <Button
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => openWhatsApp("Help me choose the perfect fragrance from your featured collection")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Need Help Choosing? Chat Now
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perfumes.filter((product) =>
              product.isPremium && product.isActive)
              .slice(0, 3)
              .map((product) => (
                <Card
                  key={product._id}
                  className="relative glass-card rounded-2xl overflow-hidden group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
                >
                  <ProductImageSlider
                    perfume={product}
                    viewMode={viewMode}
                    onQuickViewClick={() => setQuickViewPerfume(product)}
                  />

                  {product.isOutOfStock && (
                    <><div className="absolute inset-0 bg-black/40 rounded-2xl"></div><div className="absolute top-4 right-0 transform rotate-[10deg] origin-top-right z-30 pointer-events-none">
                      <div className="bg-red-600/90 text-white text-xs sm:text-sm font-bold px-4 py-1 shadow-lg rounded-tl-lg rounded-br-lg uppercase tracking-wider backdrop-blur-sm">
                        Out of Stock
                      </div>
                    </div></>
                  )}

                  <CardContent className="p-6 flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {product.description
                        ?.map((block) => block.children.map((child) => child.text).join(""))
                        .join(" ") ||
                        "Exquisite fragrance crafted with premium ingredients for a luxurious scent experience."}
                    </p>

                    {product.scentProfile?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.scentProfile.map((note, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs px-3 py-1 rounded-full border-primary/20 text-primary/70 hover:border-accent/40 transition cursor-pointer"
                            onClick={() => openWhatsApp(`Tell me more about fragrances with ${note} notes`)}
                          >
                            {note}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 border-t border-border/40 pt-4">
                      <PriceDisplay
                        price={product.price}
                        discountedPrice={product.discountedPrice}
                        size="md"
                        className="justify-start"
                      />

                      {/* Enhanced buttons with more options */}
                      <div className="flex gap-2">
                        <Button
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex-1 group relative overflow-hidden"
                          onClick={() => openWhatsApp(`I'm interested in ${product.name}. Can you tell me more about it?`)}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          <MessageCircle className="w-4 h-4 mr-2 relative z-10" />
                          <span className="relative z-10">Enquire Now</span>
                        </Button>

                        {/* <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-600 hover:bg-green-50 px-3"
                          onClick={() => openWhatsApp(`What's the best price you can offer for ${product.name}?`)}
                        >
                          💰 Best Price?
                        </Button> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Enhanced Quick View Modal */}
          <Dialog open={!!quickViewPerfume} onOpenChange={() => setQuickViewPerfume(null)}>
            <DialogContent className="max-w-4xl w-full p-4 sm:p-6 rounded-2xl overflow-y-auto max-h-[90vh]">
              {quickViewPerfume && (
                <>
                  <DialogHeader className="mb-6 border-b border-border/40 pb-4">
                    <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-wide text-primary leading-tight">
                      {quickViewPerfume.name}
                    </DialogTitle>
                    {quickViewPerfume.isPremium && (
                      <Badge className="mt-2 bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full shadow-md">
                        Premium Selection
                      </Badge>
                    )}
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative flex items-center justify-center">
                      {quickViewPerfume.images && quickViewPerfume.images.length > 0 ? (
                        <>
                          <img
                            src={urlFor(quickViewPerfume.images[quickViewImageIndex].asset).width(600).url()}
                            alt={`${quickViewPerfume.name} - Image ${quickViewImageIndex + 1}`}
                            className="w-full h-72 sm:h-80 object-cover rounded-xl shadow-md"
                            loading="lazy"
                          />
                          {quickViewPerfume.images.length > 1 && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-9 w-9"
                                onClick={() => setQuickViewImageIndex(prev => prev === 0 ? quickViewPerfume.images.length - 1 : prev - 1)}
                              >
                                <ChevronLeft size={22} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full h-9 w-9"
                                onClick={() => setQuickViewImageIndex(prev => (prev + 1) % quickViewPerfume.images.length)}
                              >
                                <ChevronRight size={22} />
                              </Button>
                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {quickViewPerfume.images.map((_, index) => (
                                  <div key={index} className={`w-2 h-2 rounded-full cursor-pointer ${quickViewImageIndex === index ? 'bg-white' : 'bg-white/50'}`} onClick={() => setQuickViewImageIndex(index)} />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="bg-muted h-72 sm:h-80 w-full rounded-xl flex items-center justify-center text-4xl">
                          🌸
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between space-y-4">
                      <div>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                          {quickViewPerfume.description?.map((block) => block.children.map((child) => child.text).join("")).join(" ")}
                        </p>
                        {quickViewPerfume.scentProfile?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {quickViewPerfume.scentProfile.map((note, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs sm:text-sm px-2 py-1 border-primary/30 text-primary/80 rounded-full">
                                {note}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-border/40 pt-4">
                        <div className="flex flex-col gap-4">
                          <PriceDisplay
                            price={quickViewPerfume.price}
                            discountedPrice={quickViewPerfume.discountedPrice}
                            size="lg"
                            className="justify-start"
                          />

                          {/* Enhanced action buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:bg-green-600 text-white shadow-lg transition-all duration-300 hover:scale-105"
                              onClick={() => openWhatsApp(`I want to order ${quickViewPerfume.name}. Please provide me with ordering details.`)}
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Order via WhatsApp
                            </Button>
                            <Button
                              variant="outline"
                              className="border-green-500 text-green-600 hover:bg-green-50"
                              onClick={() => openWhatsApp(`Can I get a sample of ${quickViewPerfume.name} before purchasing?`)}
                            >
                              🧪 Request Sample
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            className="text-primary hover:bg-primary/5"
                            onClick={() => openWhatsApp(`I need help choosing between ${quickViewPerfume.name} and other similar fragrances`)}
                          >
                            💡 Need Help Deciding? Chat with Expert
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button
                variant="outline"
                className="rounded-full text-lg px-8 py-3 text-white border-transparent bg-primary transition-all duration-300 ease-in-out group hover:border-transparent hover:text-primary hover:bg-white hover:shadow-lg hover:shadow-accent/30"
              >
                View All Perfumes
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 🚀 NEW: Newsletter Section */}
      {/* <NewsletterSection /> */}

      {/* Customization Services (Enhanced) */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Popular <span className="text-accent">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Explore our premium customization services, crafted to make your fragrance truly unique.
            </p>

            <Button
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => openWhatsApp("I want to create a custom fragrance service. Please guide me through the options.")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Get Custom Service Consultation
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.filter((s) =>
              s.popular)
              .slice(0, 3)
              .map((service) => (
                <Card
                  key={service._id}
                  className="glass-card hover:scale-105 transition-transform duration-300 group relative"
                >
                  <div className="aspect-video rounded-lg mb-4 overflow-hidden relative">
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-primary/50" />
                      </div>
                    )}

                    {/* Quick chat overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => openWhatsApp(`Tell me more about ${service.title} service`)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Quick Chat
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col gap-3">
                    <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {service.description}
                    </p>

                    <PriceDisplay
                      price={service.price}
                      discountedPrice={service.discountedPrice}
                      size="md"
                      className="justify-start"
                    />

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 hover:bg-green-600 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transition-all duration-300 hover:scale-105"
                        onClick={() => openWhatsApp(`I'm interested in ${service.title}. Please provide me with more details and booking information.`)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                      {/* <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-600 hover:bg-green-50 px-3"
                        onClick={() => openWhatsApp(`What's included in the ${service.title} package?`)}
                      >
                        ℹ️
                      </Button> */}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/customization">
              <Button
                variant="outline"
                className="rounded-full text-lg px-8 py-3 text-white border-transparent bg-primary transition-all duration-300 ease-in-out group hover:border-transparent hover:text-primary hover:bg-white hover:shadow-lg hover:shadow-accent/30"
              >
                View All Services
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              What Our <span className="text-accent">Clients Say</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Experience the luxury through the words of our satisfied customers.
            </p>

            <Button
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => openWhatsApp("I'd like to read more customer reviews and testimonials")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Share Your Experience
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">{testimonial.name}</span>
                    {testimonial.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>

                  {/* Hidden quick action for similar recommendations */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-green-600 hover:bg-green-50"
                    onClick={() => openWhatsApp(`I saw ${testimonial.name}'s review. Can you recommend something similar for me?`)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Get Similar Recommendation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Enhanced CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-6">
            Ready to Find Your <span className="text-accent">Signature Scent?</span>
          </h2>
          <p className="text-xl text-cream/90 mb-8 max-w-2xl mx-auto">
            Experience the art of luxury perfumery with our exclusive collection and custom fragrance services.
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              className="luxury-button text-lg px-8 py-4"
              onClick={() => openWhatsApp("I'm ready to start my custom fragrance journey. Please guide me through the process.")}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Start Custom Journey
            </Button>
            <Button
              variant="outline"
              className="glass-card text-cream border-cream/30 hover:bg-cream/10 text-lg px-8 py-4"
            // onClick={() => openWhatsApp("I have questions about ZOSHE fragrances and services. Can we chat?")}
            >
              <Phone className="mr-2 w-5 h-5" />
              {/* Get Personal Consultation */}
              <a href="tel:+917977233704"> Get Personal Consultation</a>
            </Button>
          </div>

          {/* Contact info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <MessageCircle className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-sm text-cream/90">WhatsApp</div>
                <div className="text-xs text-cream/70">Available 24/7</div>
              </div>
              <div>
                <Mail className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-sm text-cream/90">Email</div>
                <div className="text-xs text-cream/70">Quick Response</div>
              </div>
              <div>
                <Award className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-sm text-cream/90">Expert Advice</div>
                <div className="text-xs text-cream/70">Personalized Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
    </div>
  );
};

export default Home;
