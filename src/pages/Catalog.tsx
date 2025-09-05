import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Search, Star, Eye, Sparkles, Filter, Grid, List, MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { sanityClient } from "../lib/sanityClient";
import { openWhatsApp } from "../lib/whatsApp";

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
// NEW: Beautified Price Display Component
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
          {/* Original Price - Crossed Out */}
          <div className="relative">
            <span className={`${sizeClasses[size]} font-bold text-muted-foreground/60 line-through decoration-2 decoration-red-500 lg:text-xl `}>
              ₹{price.toLocaleString()}
            </span>
          </div>
          
          {/* Discounted Price */}
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-shimmer`}
          >
            ₹{discountedPrice.toLocaleString()}
          </motion.span>

          {/* Discount Badge */}
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
        /* Regular Price */
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// END: Price Display Component
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteItems, setFavoriteItems] = useState(new Set());
  const [quickViewPerfume, setQuickViewPerfume] = useState<Perfume | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perfumesPerPage = 7;
  const [quickViewImageIndex, setQuickViewImageIndex] = useState(0);

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "catalogue"]{
            _id, name, slug, price, description, images, scentProfile, promotion, isPremium, isActive, isOutOfStock, discountedPrice
          }`
        );
        setPerfumes(data);
      } catch (error) {
        console.error('Error fetching catalogue:', error);
      }
    };
    fetchCatalogue();
  }, []);

  useEffect(() => {
    if (quickViewPerfume) {
      setQuickViewImageIndex(0);
    }
  }, [quickViewPerfume]);

  const filteredPerfumes = perfumes.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPerfume = currentPage * perfumesPerPage;
  const indexOfFirstPerfume = indexOfLastPerfume - perfumesPerPage;
  const currentPerfumes = filteredPerfumes.slice(indexOfFirstPerfume, indexOfLastPerfume);
  const totalPages = Math.ceil(filteredPerfumes.length / perfumesPerPage);

  const toggleFavorite = (perfumeId: string) => {
    const newFavorites = new Set(favoriteItems);
    if (newFavorites.has(perfumeId)) {
      newFavorites.delete(perfumeId);
    } else {
      newFavorites.add(perfumeId);
    }
    setFavoriteItems(newFavorites);
  };

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-28 hero-gradient text-cream">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent animate-gradient-x"></div>
        <div className="absolute top-20 left-10 w-40 h-40 bg-accent/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cream/10 rounded-full blur-3xl opacity-40"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Discover Our
            <span className="block bg-gradient-to-r from-accent via-primary to-accent text-transparent bg-clip-text animate-shimmer">
              Signature Scent
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated selection of luxury fragrances, each crafted
            to tell your unique story through the art of scent.
          </motion.p>
          <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 }, }, }} className="flex flex-col sm:flex-row justify-center gap-10 mt-12">
            {[{ value: `${perfumes.length - 1}+`, label: "Premium Fragrances" }, { value: "100%", label: "Authentic Products" }, { value: "24/7", label: "Expert Support" },].map((stat, idx) => (
              <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }} className="text-center">
                <div className="text-4xl font-bold text-accent">{stat.value}</div>
                <div className="text-cream/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.2 }} className="mt-16 flex justify-center">
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 sm:py-12 bg-muted/20 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between">
            <div className="relative flex-1 w-full max-w-2xl">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
              <Input placeholder="Search your perfect fragrance..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 sm:pl-12 pr-10 py-2 sm:py-3 text-sm sm:text-lg glass-card border-0 shadow-md focus:shadow-lg transition-all duration-300" />
              {searchTerm && (<Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground hover:text-primary" onClick={() => setSearchTerm('')}> <X size={16} /> </Button>)}
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-sm text-muted-foreground font-medium"> {filteredPerfumes.length}{' '} {filteredPerfumes.length === 1 ? 'fragrance' : 'fragrances'} found </div>
              <div className="flex items-center gap-2">
                <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')} className="px-3"> <Grid className="w-4 h-4" /> </Button>
                <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')} className="px-3"> <List className="w-4 h-4" /> </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
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
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* UPDATED: Using new PriceDisplay component */}
                      <PriceDisplay 
                        price={quickViewPerfume.price} 
                        discountedPrice={quickViewPerfume.discountedPrice}
                        size="lg"
                        className="justify-start"
                      />
                      <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 hover:scale-105" onClick={() => openWhatsApp(quickViewPerfume.name)}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Enquire on WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Products Grid */}
      <section className="py-20 bg-background relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {filteredPerfumes.length > 0 ? (
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
              {currentPerfumes.map((perfume) => (
                <Card
                  key={perfume._id}
                  className={`group glass-card overflow-hidden rounded-2xl border border-border/20 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ${viewMode === 'list' ? 'flex flex-row' : ''}`}
                >
                  <ProductImageSlider
                    perfume={perfume}
                    viewMode={viewMode}
                    onQuickViewClick={() => setQuickViewPerfume(perfume)}
                  />
                  
                  {perfume.isOutOfStock && (
                    <>
                      <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                      <div
                        className={`absolute top-4 z-30 pointer-events-none transform ${viewMode === 'list' ? 'left-0 rotate-[-10deg] origin-top-left' : 'right-0 rotate-[10deg] origin-top-right'}`}
                      >
                        <div className="bg-red-600/90 text-white text-xs sm:text-sm font-bold px-4 py-1 shadow-lg rounded-tl-lg rounded-br-lg uppercase tracking-wider backdrop-blur-sm">
                          Out of Stock
                        </div>
                      </div>
                    </>
                  )}

                  <CardContent className={`p-4 sm:p-6 space-y-3 sm:space-y-4 relative ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-lg sm:text-xl font-semibold text-primary group-hover:text-primary/80 transition-colors leading-snug">
                        {perfume.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {perfume.description?.map((block) => block.children.map((child) => child.text).join("")).join(" ") || "Exquisite fragrance crafted with premium ingredients for a luxurious scent experience."}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {perfume.scentProfile?.length ? (perfume.scentProfile.map((note, idx) => (<Badge key={idx} variant="outline" className="text-[10px] sm:text-xs border-primary/20 text-primary/70"> {note} </Badge>))) : ("")}
                      </div>
                    </div>

                    {/* UPDATED: Using new PriceDisplay component with enhanced styling */}
                    <div className="flex flex-col gap-4 border-t border-border/40 pt-4">
                      <PriceDisplay 
                        price={perfume.price} 
                        discountedPrice={perfume.discountedPrice}
                        size="md"
                        className="justify-start"
                      />
                      <Button 
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl w-full group relative overflow-hidden"
                        onClick={() => openWhatsApp(perfume.name)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <MessageCircle className="w-4 h-4 mr-2 relative z-10" />
                        <span className="relative z-10">Enquire on WhatsApp</span>
                      </Button>
                    </div>
                    {perfume?.promotion && (
                      <div className="absolute top-4 right-0 bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-semibold px-4 py-1 rounded-l-full shadow-md">
                        {perfume.promotion}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="animate-bounce mb-8"> <div className="text-8xl mb-4">🔍</div> </div>
              <h3 className="text-3xl font-bold text-primary mb-4"> No fragrances found </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"> {searchTerm ? `We couldn't find any fragrances matching "${searchTerm}". Try a different search term.` : 'Our fragrance collection is currently being updated. Please check back soon!'} </p>
              {searchTerm && (<Button className="luxury-button" onClick={() => setSearchTerm('')}> <Search className="w-4 h-4 mr-2" /> Clear Search & Browse All </Button>)}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-3 flex-wrap z-10 relative">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-2 rounded-lg border border-primary/40 text-secondary font-medium hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${page === currentPage ? 'bg-primary text-white' : 'border border-primary/40 text-secondary hover:bg-primary/10'}`}
            >
              {page}
            </Button>
          ))}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-2 rounded-lg border border-primary/40 text-secondary font-medium hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
