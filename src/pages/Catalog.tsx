import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Eye, Sparkles, Filter, Grid, List, MessageCircle, ChevronLeft, ChevronRight, X, SlidersHorizontal, ArrowUpDown, Clock, Award, Users, Heart, Gift, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { sanityClient } from "../lib/sanityClient";
import { openWhatsApp } from "../lib/whatsApp";
import { useToast } from '@/hooks/use-toast';
import imageUrlBuilder from '@sanity/image-url';
import { Helmet } from "react-helmet";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  return builder.image(source);
}

// TypeScript declarations for GTM
declare global {
  interface Window {
    dataLayer: any[];
  }
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
  rating?: number;
  reviewCount?: number;
  popularity?: number;
}

// Enhanced GTM Tracking Function
const trackEvent = (eventName: string, eventData: any = {}) => {
  // GTM DataLayer (primary method)
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      event_category: 'ecommerce',
      event_label: eventData.label || '',
      value: eventData.value || 0,
      currency: 'INR',
      timestamp: new Date().toISOString(),
      ...eventData
    });
  }

  // Development logging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 GTM Event:', eventName, eventData);
  }
};

// Enhanced Price Display Component
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
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl md:text-3xl'
  };

  const hasDiscount = discountedPrice && discountedPrice < price;
  const discountPercent = getDiscountPercent(price, discountedPrice);

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 ${className}`}>
      {hasDiscount ? (
        <>
          <div className="relative">
            <span className={`${sizeClasses[size]} font-bold text-muted-foreground/60 line-through decoration-2 decoration-red-500`}>
              ₹{price.toLocaleString()}
            </span>
          </div>
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent`}
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
          className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent`}
        >
          ₹{price.toLocaleString()}
        </motion.span>
      )}
    </div>
  );
};

// Lead Capture Popup Component
// const LeadCapturePopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     interests: [] as string[]
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email) {
//       toast({
//         title: "Please fill required fields",
//         description: "Name and email are required to continue.",
//         variant: "destructive"
//       });
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Track lead capture event via GTM
//       trackEvent('lead_captured', {
//         method: 'popup',
//         user_name: formData.name,
//         user_email: formData.email,
//         has_phone: !!formData.phone,
//         interests_count: formData.interests.length,
//         lead_source: 'catalog_popup'
//       });

//       // Save to Sanity (this will trigger the WhatsApp function automatically)
//       const leadDoc = await sanityClient.create({
//         _type: 'lead',
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone || '',
//         interests: formData.interests,
//         source: 'catalog_popup',
//         timestamp: new Date().toISOString()
//       });

//       console.log('✅ Lead created:', leadDoc._id);

//       toast({
//         title: "Welcome to ZOSHE! ✨",
//         description: "You'll receive a personalized WhatsApp message shortly!",
//       });

//       onClose();
//       setFormData({ name: '', email: '', phone: '', interests: [] });

//     } catch (error) {
//       console.error('❌ Error creating lead:', error);
//       toast({
//         title: "Something went wrong",
//         description: "Please try again or contact us directly on WhatsApp.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   const interestOptions = [
//     'Floral Fragrances',
//     'Woody Scents',
//     'Fresh & Citrus',
//     'Oriental & Spicy',
//     'Unisex Perfumes',
//     'Premium Collections'
//   ];

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-md border-0 shadow-2xl">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//           className="text-center p-6 glass-card backdrop-blur-xl"
//         >
//           <div className="mb-6">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center"
//             >
//               <Sparkles className="w-8 h-8 text-white" />
//             </motion.div>

//             <h3 className="text-2xl font-bold text-primary mb-2">
//               Discover Your Signature Scent
//             </h3>
//             <p className="text-muted-foreground leading-relaxed">
//               Join 10,000+ fragrance lovers and get personalized recommendations, exclusive offers, and early access to new collections.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               placeholder="Your Name *"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="glass-card border-0 bg-white/50 backdrop-blur-sm"
//               required
//             />

//             <Input
//               type="email"
//               placeholder="Email Address *"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="glass-card border-0 bg-white/50 backdrop-blur-sm"
//               required
//             />

//             <Input
//               type="tel"
//               placeholder="WhatsApp Number (Optional)"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               className="glass-card border-0 bg-white/50 backdrop-blur-sm"
//             />

//             <div className="text-left">
//               <label className="text-sm font-medium text-primary mb-2 block">
//                 Your Fragrance Interests (Optional)
//               </label>
//               <div className="grid grid-cols-2 gap-2">
//                 {interestOptions.map((interest) => (
//                   <div key={interest} className="flex items-center space-x-2">
//                     <Checkbox
//                       id={interest}
//                       checked={formData.interests.includes(interest)}
//                       onCheckedChange={(checked) => {
//                         if (checked) {
//                           setFormData({ 
//                             ...formData, 
//                             interests: [...formData.interests, interest] 
//                           });
//                         } else {
//                           setFormData({ 
//                             ...formData, 
//                             interests: formData.interests.filter(i => i !== interest) 
//                           });
//                         }
//                       }}
//                     />
//                     <label htmlFor={interest} className="text-xs">{interest}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Button 
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg transition-all duration-300 hover:scale-105 py-3"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                   Joining...
//                 </div>
//               ) : (
//                 <>
//                   <Gift className="w-4 h-4 mr-2" />
//                   Get My Recommendations
//                 </>
//               )}
//             </Button>
//           </form>

//           <div className="mt-4 space-y-2">
//             <p className="text-xs text-muted-foreground">
//               🔒 We respect your privacy. Unsubscribe anytime.
//             </p>
//             <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
//               <span className="flex items-center gap-1">
//                 <Mail className="w-3 h-3" />
//                 No Spam
//               </span>
//               <span className="flex items-center gap-1">
//                 <Heart className="w-3 h-3" />
//                 Exclusive Offers
//               </span>
//               <span className="flex items-center gap-1">
//                 <Award className="w-3 h-3" />
//                 Expert Tips
//               </span>
//             </div>
//           </div>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// Wishlist Component
const WishlistButton = ({ perfume, isInWishlist, onToggle }: { perfume: Perfume; isInWishlist: boolean; onToggle: () => void }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white/90 rounded-full w-8 h-8"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
        trackEvent('wishlist_toggle', {
          product_id: perfume._id,
          product_name: perfume.name,
          product_price: perfume.discountedPrice || perfume.price,
          action: isInWishlist ? 'remove' : 'add'
        });
      }}
    >
      <Heart className={`w-4 h-4 transition-colors ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
    </Button>
  );
};

// Enhanced Product Image Slider
const ProductImageSlider = ({
  perfume,
  viewMode,
  onQuickViewClick,
  wishlist,
  onWishlistToggle
}: {
  perfume: Perfume;
  viewMode: string;
  onQuickViewClick: () => void;
  wishlist: string[];
  onWishlistToggle: (perfumeId: string) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const images = perfume.images || [];
  const isInWishlist = wishlist.includes(perfume._id);

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
      className={`relative overflow-hidden group ${viewMode === 'list' ? 'w-full md:w-48 flex-shrink-0' : ''
        }`}
    >
      <div className={`relative ${viewMode === 'list'
        ? 'h-48 md:h-48'
        : 'h-64 sm:h-80'
        }`}>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center animate-pulse">
            <div className="text-4xl opacity-50">🌸</div>
          </div>
        )}

        {images.length > 0 ? (
          <img
            src={urlFor(images[currentImageIndex].asset).width(800).url()}
            alt={`${perfume.name} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <div className="text-6xl opacity-50">🌸</div>
          </div>
        )}

        <WishlistButton
          perfume={perfume}
          isInWishlist={isInWishlist}
          onToggle={() => onWishlistToggle(perfume._id)}
        />

        {images.length > 1 && (
          <>
            <div className={`absolute top-1/2 left-2 right-2 flex justify-between -translate-y-1/2 transition-opacity duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Button size="icon" variant="ghost" onClick={goToPrevImage} className="bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10 backdrop-blur-sm">
                <ChevronLeft size={20} />
              </Button>
              <Button size="icon" variant="ghost" onClick={goToNextImage} className="bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10 backdrop-blur-sm">
                <ChevronRight size={20} />
              </Button>
            </div>

            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <Button
              size="sm"
              className="bg-white/90 text-primary hover:bg-white shadow-lg backdrop-blur-sm rounded-full px-4"
              onClick={onQuickViewClick}
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
          </div>
        </div>

        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {perfume?.isPremium && (
            <Badge className="bg-gradient-to-r from-primary to-accent text-white shadow-lg backdrop-blur-sm">
              <Award className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
          {perfume.discountedPrice && (
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg backdrop-blur-sm animate-pulse">
              <Sparkles className="w-3 h-3 mr-1" />
              Sale
            </Badge>
          )}
        </div>

        {perfume.isOutOfStock && (
          <>
            <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>
            <div className="absolute top-4 right-0 transform rotate-[10deg] origin-top-right z-30 pointer-events-none">
              <div className="bg-red-600/90 text-white text-xs sm:text-sm font-bold px-4 py-1 shadow-lg rounded-tl-lg rounded-br-lg uppercase tracking-wider backdrop-blur-sm">
                Out of Stock
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Advanced Filters Component
const AdvancedFilters = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  scentProfiles,
  maxPerfumePrice,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
  scentProfiles: string[];
  maxPerfumePrice: number
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Advanced Filters
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Price Range</h4>
            <div className="px-3">
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={(value) => onFiltersChange({ ...filters, minPrice: value[0], maxPrice: value[1] })}
                max={maxPerfumePrice}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>₹{filters.minPrice.toLocaleString()}</span>
                <span>₹{filters.maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Scent Profiles</h4>
            <div className="grid grid-cols-2 gap-2">
              {scentProfiles.map((scent) => (
                <div key={scent} className="flex items-center space-x-2">
                  <Checkbox
                    id={scent}
                    checked={filters.selectedScents.includes(scent)}
                    onCheckedChange={(checked) => {
                      const newScents = checked
                        ? [...filters.selectedScents, scent]
                        : filters.selectedScents.filter((s: string) => s !== scent);
                      onFiltersChange({ ...filters, selectedScents: newScents });
                    }}
                  />
                  <label htmlFor={scent} className="text-sm font-medium">{scent}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Product Type</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="premium"
                  checked={filters.showPremiumOnly}
                  onCheckedChange={(checked) => onFiltersChange({ ...filters, showPremiumOnly: checked })}
                />
                <label htmlFor="premium" className="text-sm font-medium">Premium Only</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStockOnly}
                  onCheckedChange={(checked) => onFiltersChange({ ...filters, inStockOnly: checked })}
                />
                <label htmlFor="inStock" className="text-sm font-medium">In Stock Only</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onSale"
                  checked={filters.onSaleOnly}
                  onCheckedChange={(checked) => onFiltersChange({ ...filters, onSaleOnly: checked })}
                />
                <label htmlFor="onSale" className="text-sm font-medium">On Sale Only</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onFiltersChange({
            minPrice: 0,
            maxPrice: maxPerfumePrice,
            selectedScents: [],
            showPremiumOnly: false,
            inStockOnly: false,
            onSaleOnly: false
          })}>
            Clear All
          </Button>
          <Button onClick={onClose} className="flex-1">Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Catalog Component
const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewPerfume, setQuickViewPerfume] = useState<Perfume | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perfumesPerPage = 12;
  const [quickViewImageIndex, setQuickViewImageIndex] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Perfume[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Lead Capture Popup State
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [pageLoadTime] = useState(Date.now());
  const [scrollProgress, setScrollProgress] = useState(0);

  const maxPerfumePrice = perfumes.length > 0 ? Math.max(...perfumes.map(p => p.price)) : 0;

  // Advanced filters state
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: maxPerfumePrice,
    selectedScents: [] as string[],
    showPremiumOnly: false,
    inStockOnly: false,
    onSaleOnly: false
  });

// Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Initialize wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('fragrance_wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    // Check if user has seen popup before
    const hasSeenPopup = localStorage.getItem('zoshe_popup_shown');
    setHasShownPopup(!!hasSeenPopup);
  }, []);

  // Scroll tracking for popup trigger
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lead popup trigger logic
  useEffect(() => {
    if (hasShownPopup || showLeadPopup) return;

    const timeOnSite = Date.now() - pageLoadTime;

    // Show popup after 45 seconds OR when user scrolls 60% down the page
    const shouldShowPopup = (timeOnSite > 45000) || (scrollProgress > 60);

    if (shouldShowPopup) {
      setShowLeadPopup(true);
      setHasShownPopup(true);
      localStorage.setItem('zoshe_popup_shown', 'true');

      // Track popup shown event
      trackEvent('popup_shown', {
        trigger: timeOnSite > 45000 ? 'time' : 'scroll',
        time_on_site: Math.round(timeOnSite / 1000),
        scroll_progress: Math.round(scrollProgress)
      });
    }
  }, [pageLoadTime, scrollProgress, hasShownPopup, showLeadPopup]);

  // Wishlist management
  const toggleWishlist = (perfumeId: string) => {
    const newWishlist = wishlist.includes(perfumeId)
      ? wishlist.filter(id => id !== perfumeId)
      : [...wishlist, perfumeId];

    setWishlist(newWishlist);
    localStorage.setItem('fragrance_wishlist', JSON.stringify(newWishlist));
  };

  useEffect(() => {
    if (perfumes.length > 0) {
      setFilters(f => ({ ...f, maxPrice: maxPerfumePrice }));
    }
  }, [perfumes, maxPerfumePrice]);

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "catalogue"]{
            _id, name, slug, price, description, images, scentProfile, promotion, isPremium, isActive, isOutOfStock, discountedPrice, rating, reviewCount, popularity
          }`
        );
        setPerfumes(data);

        // Track catalog loaded event via GTM
        trackEvent('catalog_loaded', {
          product_count: data.length,
          load_time: Date.now() - pageLoadTime,
          page_title: 'Catalog Page'
        });

      } catch (error) {
        console.error('Error fetching catalogue:', error);
      }
    };
    fetchCatalogue();
  }, [pageLoadTime]);

  useEffect(() => {
    if (quickViewPerfume) {
      setQuickViewImageIndex(0);
      // Add to recently viewed
      setRecentlyViewed(prev => {
        const filtered = prev.filter(p => p._id !== quickViewPerfume._id);
        return [quickViewPerfume, ...filtered].slice(0, 4);
      });

      // Track quick view event via GTM
      trackEvent('product_quick_view', {
        product_id: quickViewPerfume._id,
        product_name: quickViewPerfume.name,
        product_price: quickViewPerfume.discountedPrice || quickViewPerfume.price,
        product_category: 'fragrance'
      });
    }
  }, [quickViewPerfume]);

  // Enhanced filtering logic
  const filteredPerfumes = perfumes
    .filter((perfume) => {
      // Search filter
      if (searchTerm && !perfume.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Price filter
      const price = perfume.discountedPrice || perfume.price;
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }

      // Scent profile filter
      if (filters.selectedScents.length > 0) {
        const hasMatchingScent = perfume.scentProfile?.some(scent =>
          filters.selectedScents.includes(scent)
        );
        if (!hasMatchingScent) return false;
      }

      // Premium filter
      if (filters.showPremiumOnly && !perfume.isPremium) {
        return false;
      }

      // Stock filter
      if (filters.inStockOnly && perfume.isOutOfStock) {
        return false;
      }

      // Sale filter
      if (filters.onSaleOnly && !perfume.discountedPrice) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // First priority: Stock availability (in-stock items first)
      if (a.isOutOfStock && !b.isOutOfStock) return 1; // a is out of stock, b is in stock => a after b
      if (!a.isOutOfStock && b.isOutOfStock) return -1; // a is in stock, b is out of stock => a before b

      switch (sortBy) {
        case 'price-low':
          return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
        case 'price-high':
          return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Get all unique scent profiles for filter
  const allScentProfiles = [...new Set(perfumes.flatMap(p => p.scentProfile || []))];

  const indexOfLastPerfume = currentPage * perfumesPerPage;
  const indexOfFirstPerfume = indexOfLastPerfume - perfumesPerPage;
  const currentPerfumes = filteredPerfumes.slice(indexOfFirstPerfume, indexOfLastPerfume);
  const totalPages = Math.ceil(filteredPerfumes.length / perfumesPerPage);

  const activeFiltersCount = filters.selectedScents.length +
    (filters.showPremiumOnly ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    ((filters.minPrice > 0 || filters.maxPrice < 10000) ? 1 : 0);

  // Enhanced WhatsApp function with GTM tracking
  const handleWhatsAppClick = (message: string, perfume?: Perfume) => {
    trackEvent('whatsapp_click', {
      product_id: perfume?._id,
      product_name: perfume?.name,
      product_price: perfume ? (perfume.discountedPrice || perfume.price) : null,
      message_type: perfume ? 'product_inquiry' : 'general_inquiry',
      contact_method: 'whatsapp'
    });
    openWhatsApp(message);
  };

  return (
    <>
    {/* SEO for Catalog Page */}
    <Helmet>
        <title>Catalog | Zoshe Luxury Perfumes & Custom Scents</title>
        <meta
          name="description"
          content="Explore Zoshe's exclusive perfume catalog. Browse our premium fragrances, custom scents, and luxury perfume collections."
        />
        <link rel="canonical" href="https://www.zoshe.in/catalog" />
        {/* Open Graph */}
        <meta property="og:title" content="Catalog | Zoshe Luxury Perfumes & Custom Scents" />
        <meta property="og:description" content="Explore Zoshe's premium fragrances and custom scent collections." />
        <meta property="og:url" content="https://www.zoshe.in/catalog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.zoshe.in/assets/zoshe-catalog-og.jpg" />
      </Helmet>
      {/* Add custom CSS for horizontal scrolling */}
      <style>{`
        .scroll-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="pt-8">
        {/* Lead Capture Popup */}
        {/* <LeadCapturePopup 
          isOpen={showLeadPopup} 
          onClose={() => setShowLeadPopup(false)} 
        /> */}

        {/* Enhanced Hero Section */}



        {/* Enhanced Search & Filter Section */}
        <section className="py-8 sm:py-12 bg-muted/20 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Main Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between mb-6">
              <div className="relative flex-1 w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search your perfect fragrance..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value) {
                      trackEvent('search', {
                        search_term: e.target.value,
                        results_count: filteredPerfumes.length
                      });
                    }
                  }}
                  className="pl-12 pr-12 py-3 text-lg glass-card border-0 shadow-md focus:shadow-lg transition-all duration-300 rounded-full"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-muted-foreground hover:text-primary rounded-full"
                    onClick={() => setSearchTerm('')}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            </div>

            {/* Enhanced Filter & Sort Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Advanced Filters Button */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowFilters(true);
                    trackEvent('filters_opened');
                  }}
                  className="relative"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value) => {
                  setSortBy(value);
                  trackEvent('sort_changed', { sort_type: value });
                }}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground font-medium">
                  {filteredPerfumes.length} {filteredPerfumes.length === 1 ? 'fragrance' : 'fragrances'} found
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setViewMode('grid');
                      trackEvent('view_mode_changed', { view_mode: 'grid' });
                    }}
                    className="px-3"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setViewMode('list');
                      trackEvent('view_mode_changed', { view_mode: 'list' });
                    }}
                    className="px-3"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {filters.selectedScents.map(scent => (
                  <Badge key={scent} variant="secondary" className="px-3 py-1">
                    {scent}
                    <button
                      onClick={() => setFilters({
                        ...filters,
                        selectedScents: filters.selectedScents.filter(s => s !== scent)
                      })}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Wishlist Section */}
        {wishlist.length > 0 && (
          <section className="py-8 bg-muted/10">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Your Wishlist ({wishlist.length})
              </h3>
              <div className="scroll-container flex gap-4 pb-4">
                {perfumes.filter(p => wishlist.includes(p._id)).map(perfume => (
                  <Card
                    key={perfume._id}
                    className="flex-shrink-0 w-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setQuickViewPerfume(perfume)}
                  >
                    <div className="relative h-32 overflow-hidden rounded-t-lg">
                      <img
                        src={urlFor(perfume.images[0].asset).width(200).url()}
                        alt={perfume.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-semibold text-sm truncate">{perfume.name}</h4>
                      <PriceDisplay price={perfume.price} discountedPrice={perfume.discountedPrice} size="sm" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recently Viewed Section */}
        {recentlyViewed.length > 0 && (
          <section className="py-8 bg-muted/10">
            <div className="max-w-7xl mx-auto px-6">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recently Viewed
              </h3>
              <div className="scroll-container flex gap-4 pb-4">
                {recentlyViewed.map(perfume => (
                  <Card
                    key={perfume._id}
                    className="flex-shrink-0 w-48 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setQuickViewPerfume(perfume)}
                  >
                    <div className="relative h-32 overflow-hidden rounded-t-lg">
                      <img
                        src={urlFor(perfume.images[0].asset).width(200).url()}
                        alt={perfume.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-semibold text-sm truncate">{perfume.name}</h4>
                      <PriceDisplay price={perfume.price} discountedPrice={perfume.discountedPrice} size="sm" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Products Grid */}
        <section className="py-20 bg-background relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full blur-2xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {filteredPerfumes.length > 0 ? (
              <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid'
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 max-w-4xl mx-auto'
                }`}>
                {currentPerfumes?.filter(perfume => perfume?.isActive).map((perfume) => (
                  <motion.div
                    key={perfume._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      className={`group glass-card overflow-hidden rounded-2xl border border-border/20 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 relative ${viewMode === 'list'
                        ? 'flex flex-col md:flex-row'
                        : 'flex flex-col'
                        }`}
                    >
                      <ProductImageSlider
                        perfume={perfume}
                        viewMode={viewMode}
                        onQuickViewClick={() => setQuickViewPerfume(perfume)}
                        wishlist={wishlist}
                        onWishlistToggle={toggleWishlist}
                      />

                      <CardContent className={`p-4 sm:p-6 space-y-3 sm:space-y-4 relative ${viewMode === "list"
                        ? "flex-1 flex flex-col justify-between min-w-0"
                        : "flex-1 flex flex-col"
                        }`}>
                        <div className="flex-1 space-y-2 sm:space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="text-base sm:text-lg font-semibold text-primary group-hover:text-primary/80 transition-colors leading-snug">
                              {perfume.name}
                            </h3>
                            {perfume.rating && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{perfume.rating.toFixed(1)}</span>
                                {perfume.reviewCount && (
                                  <span className="text-xs">({perfume.reviewCount})</span>
                                )}
                              </div>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {perfume.description?.map((block) => block.children.map((child) => child.text).join("")).join(" ") || "Exquisite fragrance crafted with premium ingredients for a luxurious scent experience."}
                          </p>

                          {perfume.scentProfile?.length > 0 && (
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {perfume.scentProfile.slice(0, viewMode === 'grid' ? 2 : 3).map((note, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs border-primary/20 text-primary/70 hover:border-primary/40 transition-colors">
                                  {note}
                                </Badge>
                              ))}
                              {perfume.scentProfile.length > (viewMode === 'grid' ? 2 : 3) && (
                                <Badge variant="outline" className="text-xs border-primary/20 text-primary/70">
                                  +{perfume.scentProfile.length - (viewMode === 'grid' ? 2 : 3)}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Fully Responsive Button Section */}
                        <div className="flex flex-col gap-3 sm:gap-4 border-t border-border/40 pt-3 sm:pt-4 mt-auto">
                          <PriceDisplay
                            price={perfume.price}
                            discountedPrice={perfume.discountedPrice}
                            size={viewMode === 'grid' ? 'sm' : 'md'}
                            className="justify-start"
                          />

                          <div className={`flex gap-2 items-center ${viewMode === 'grid'
                            ? 'flex-col'
                            : 'flex-col sm:flex-row'
                            }`}>
                            <Button
                              className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden ${viewMode === 'grid'
                                ? 'w-full h-10 text-xs'
                                : 'w-full sm:flex-1 h-10 text-sm'
                                }`}
                              onClick={() => handleWhatsAppClick(`I'm interested in ${perfume.name}. Can you tell me more about it?`, perfume)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                              <MessageCircle className="w-4 h-4 mr-2 relative z-10" />
                              <span className="relative z-10">
                                {perfume.isOutOfStock ? 'Out of Stock' : 'Enquire Now'}
                              </span>
                            </Button>

                            <Button
                              variant="outline"
                              onClick={() => setQuickViewPerfume(perfume)}
                              className={`hover:bg-primary/10 transition-colors flex items-center justify-center ${viewMode === 'grid'
                                ? 'w-full h-10'
                                : 'w-full sm:w-auto sm:px-4 h-10'
                                }`}
                            >
                              <Eye className="w-4 h-4" />
                              <span className="ml-2 text-xs sm:text-sm">Quick View</span>
                            </Button>
                          </div>
                        </div>

                        {perfume?.promotion && (
                          <div className="absolute top-4 right-0 bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold px-4 py-1 rounded-l-full shadow-md z-10">
                            {perfume.promotion}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="animate-bounce mb-8">
                  <div className="text-8xl mb-4">🔍</div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">No fragrances found</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                  {searchTerm || activeFiltersCount > 0
                    ? `We couldn't find any fragrances matching your criteria. Try adjusting your filters.`
                    : 'Our fragrance collection is currently being updated. Please check back soon!'
                  }
                </p>
                {(searchTerm || activeFiltersCount > 0) && (
                  <div className="space-y-2">
                    <Button
                      className="mr-2"
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({
                          minPrice: 0,
                          maxPrice: maxPerfumePrice,
                          selectedScents: [],
                          showPremiumOnly: false,
                          inStockOnly: false,
                          onSaleOnly: false
                        });
                      }}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Clear All Filters
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleWhatsAppClick("I'm looking for a specific fragrance but can't find it on your website. Can you help me?")}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Get Help Finding Products
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2 flex-wrap relative z-10">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                variant="outline"
                className="px-3 py-2"
              >
                First
              </Button>
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                variant="outline"
                className="px-3 py-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    className="px-4 py-2"
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                variant="outline"
                className="px-3 py-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                variant="outline"
                className="px-3 py-2"
              >
                Last
              </Button>
            </div>
          )}
        </section>

        {/* Enhanced Quick View Modal */}
        <Dialog open={!!quickViewPerfume} onOpenChange={() => setQuickViewPerfume(null)}>
          <DialogContent className="max-w-5xl w-full p-6 rounded-2xl overflow-y-auto max-h-[90vh]">
            {quickViewPerfume && (
              <>
                <DialogHeader className="mb-6 border-b border-border/40 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-3xl font-extrabold tracking-wide text-primary leading-tight mb-2">
                        {quickViewPerfume.name}
                      </DialogTitle>
                      <div className="flex items-center gap-4">
                        {quickViewPerfume.isPremium && (
                          <Badge className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full shadow-md">
                            <Award className="w-4 h-4 mr-1" />
                            Premium Selection
                          </Badge>
                        )}
                        {quickViewPerfume.rating && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${star <= (quickViewPerfume.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {quickViewPerfume.rating.toFixed(1)} ({quickViewPerfume.reviewCount || 0} reviews)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    {quickViewPerfume.images && quickViewPerfume.images.length > 0 ? (
                      <>
                        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
                          <img
                            src={urlFor(quickViewPerfume.images[quickViewImageIndex].asset).width(800).url()}
                            alt={`${quickViewPerfume.name} - Image ${quickViewImageIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {quickViewPerfume.images.length > 1 && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                                onClick={() => setQuickViewImageIndex(prev => prev === 0 ? quickViewPerfume.images.length - 1 : prev - 1)}
                              >
                                <ChevronLeft size={20} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                                onClick={() => setQuickViewImageIndex(prev => (prev + 1) % quickViewPerfume.images.length)}
                              >
                                <ChevronRight size={20} />
                              </Button>
                            </>
                          )}
                        </div>

                        {quickViewPerfume.images.length > 1 && (
                          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                            {quickViewPerfume.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setQuickViewImageIndex(index)}
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${quickViewImageIndex === index ? 'border-primary' : 'border-border'
                                  }`}
                              >
                                <img
                                  src={urlFor(quickViewPerfume.images[index].asset).width(100).url()}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="bg-muted h-96 w-full rounded-xl flex items-center justify-center text-6xl">
                        🌸
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {quickViewPerfume.description?.map((block) => block.children.map((child) => child.text).join("")).join(" ") || "A luxurious fragrance crafted with the finest ingredients to create an unforgettable scent experience."}
                      </p>

                      {quickViewPerfume.scentProfile?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-primary mb-3">Scent Profile</h4>
                          <div className="flex flex-wrap gap-2">
                            {quickViewPerfume.scentProfile.map((note, idx) => (
                              <Badge key={idx} variant="outline" className="text-sm px-3 py-1 border-primary/30 text-primary/80 rounded-full">
                                {note}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {quickViewPerfume.promotion && (
                        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-primary font-semibold">
                            <Sparkles className="w-5 h-5" />
                            Special Offer
                          </div>
                          <p className="text-sm mt-1">{quickViewPerfume.promotion}</p>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-border/40 pt-6">
                      <div className="flex flex-col gap-6">
                        <PriceDisplay
                          price={quickViewPerfume.price}
                          discountedPrice={quickViewPerfume.discountedPrice}
                          size="lg"
                          className="justify-start"
                        />

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-300 hover:scale-105 py-3"
                            onClick={() => handleWhatsAppClick(`I want to order ${quickViewPerfume.name}. Please provide me with ordering details and availability.`, quickViewPerfume)}
                          >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            {quickViewPerfume.isOutOfStock ? 'Out of Stock' : 'Order via WhatsApp'}
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          className="text-primary hover:bg-primary/5"
                          onClick={() => handleWhatsAppClick(`I need help choosing between ${quickViewPerfume.name} and other similar fragrances. Can you provide recommendations based on my preferences?`, quickViewPerfume)}
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

        {/* Advanced Filters Modal */}
        <AdvancedFilters
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFiltersChange={setFilters}
          scentProfiles={allScentProfiles}
          maxPerfumePrice={maxPerfumePrice}
        />
      </div>
    </>
  );
};

export default Catalog;
