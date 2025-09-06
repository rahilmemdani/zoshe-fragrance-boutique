import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Eye, Sparkles, Filter, Grid, List, MessageCircle, ChevronLeft, ChevronRight, X, SlidersHorizontal, ArrowUpDown, Clock, Award, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { sanityClient } from "../lib/sanityClient";
import { openWhatsApp } from "../lib/whatsApp";
import imageUrlBuilder from '@sanity/image-url';

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
  rating?: number;
  reviewCount?: number;
  popularity?: number;
}

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

// Enhanced Product Image Slider with Responsive Fixes
const ProductImageSlider = ({ perfume, viewMode, onQuickViewClick }: { perfume: Perfume; viewMode: string; onQuickViewClick: () => void; }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      className={`relative overflow-hidden group ${
        viewMode === 'list' ? 'w-full md:w-48 flex-shrink-0' : ''
      }`}
    >
      {/* Enhanced Image with Loading State */}
      <div className={`relative ${
        viewMode === 'list' 
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

        {/* Enhanced Navigation Controls */}
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

        {/* Enhanced Overlay with More Actions */}
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

        {/* Enhanced Badges */}
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

        {/* Out of Stock Overlay */}
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
  scentProfiles
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
  scentProfiles: string[];
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
          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Price Range</h4>
            <div className="px-3">
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={(value) => onFiltersChange({ ...filters, minPrice: value[0], maxPrice: value[1] })}
                max={10000}
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

          {/* Scent Profiles */}
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

          {/* Product Type */}
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
            maxPrice: 10000,
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

  // Advanced filters state
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    selectedScents: [] as string[],
    showPremiumOnly: false,
    inStockOnly: false,
    onSaleOnly: false
  });

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "catalogue"]{
            _id, name, slug, price, description, images, scentProfile, promotion, isPremium, isActive, isOutOfStock, discountedPrice, rating, reviewCount, popularity
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
      // Add to recently viewed
      setRecentlyViewed(prev => {
        const filtered = prev.filter(p => p._id !== quickViewPerfume._id);
        return [quickViewPerfume, ...filtered].slice(0, 4);
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
      switch (sortBy) {
        case 'price-low':
          return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
        case 'price-high':
          return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
        case 'popularity':
          return (b.popularity || 0) - (a.popularity || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
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

  return (
    <>
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
        {/* Enhanced Hero Section */}
        <section className="relative overflow-hidden py-32 hero-gradient text-cream">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
          <div className="absolute top-20 left-10 w-40 h-40 bg-accent/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/30 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              Discover Our
              <span className="block bg-gradient-to-r from-accent via-primary to-accent text-transparent bg-clip-text">
                Signature Collection
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Explore our carefully curated selection of luxury fragrances, each crafted to tell your unique story through the art of scent.
            </motion.p>

            {/* Enhanced Stats */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
              }}
              className="flex flex-col sm:flex-row justify-center gap-12 mt-12"
            >
              {[
                { icon: <Sparkles className="w-6 h-6" />, value: `${perfumes.length}+`, label: "Premium Fragrances" },
                { icon: <Award className="w-6 h-6" />, value: "100%", label: "Authentic Products" },
                { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Happy Customers" },
                { icon: <MessageCircle className="w-6 h-6" />, value: "24/7", label: "WhatsApp Support" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-2 text-accent group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-cream/80 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
              className="mt-16 flex justify-center"
            >
              <ChevronDown className="w-8 h-8 opacity-70" />
            </motion.div>
          </div>
        </section>

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
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                  onClick={() => setShowFilters(true)}
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
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="price-low">Price (Low to High)</SelectItem>
                    <SelectItem value="price-high">Price (High to Low)</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
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
                    onClick={() => setViewMode('grid')}
                    className="px-3"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
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

        {/* Fixed Recently Viewed Section with Horizontal Scroll */}
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

        {/* Enhanced Products Grid - Fully Responsive List & Grid Layout */}
        <section className="py-20 bg-background relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full blur-2xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {filteredPerfumes.length > 0 ? (
              <div className={`grid gap-4 sm:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
                {currentPerfumes.map((perfume) => (
                  <motion.div
                    key={perfume._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      className={`group glass-card overflow-hidden rounded-2xl border border-border/20 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 relative ${
                        viewMode === 'list' 
                          ? 'flex flex-col md:flex-row' // ✅ RESPONSIVE: vertical on mobile, horizontal on desktop
                          : 'flex flex-col'
                      }`}
                    >
                      <ProductImageSlider
                        perfume={perfume}
                        viewMode={viewMode}
                        onQuickViewClick={() => setQuickViewPerfume(perfume)}
                      />

                      <CardContent className={`p-4 sm:p-6 space-y-3 sm:space-y-4 relative ${
                        viewMode === "list" 
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

                          {/* ✅ FULLY RESPONSIVE Button Container */}
                          <div className={`flex gap-2 items-center ${
                            viewMode === 'grid' 
                              ? 'flex-col' 
                              : 'flex-col sm:flex-row' // ✅ Stack on mobile, row on larger screens for list view
                          }`}>
                            {/* Enquire Button - Responsive Width and Height */}
                            <Button
                              className={`bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden ${
                                viewMode === 'grid'
                                  ? 'w-full h-10 text-xs'
                                  : 'w-full sm:flex-1 h-10 text-sm' // ✅ Full width on mobile, flex-1 on larger screens
                              }`}
                              onClick={() => openWhatsApp(`I'm interested in ${perfume.name}. Can you tell me more about it?`)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                              <MessageCircle className="w-4 h-4 mr-2 relative z-10" />
                              <span className="relative z-10">
                                {perfume.isOutOfStock ? 'Out of Stock' : 'Enquire Now'}
                              </span>
                            </Button>

                            {/* Eye Button - Responsive Width and Height */}
                            <Button
                              variant="outline"
                              onClick={() => setQuickViewPerfume(perfume)}
                              className={`hover:bg-primary/10 transition-colors flex items-center justify-center ${
                                viewMode === 'grid'
                                  ? 'w-full h-10'
                                  : 'w-full sm:w-auto sm:px-4 h-10' // ✅ Full width on mobile, auto width on larger screens
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
                          maxPrice: 10000,
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
                      onClick={() => openWhatsApp("I'm looking for a specific fragrance but can't find it on your website. Can you help me?")}
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
                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                  quickViewImageIndex === index ? 'border-primary' : 'border-border'
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
                            onClick={() => openWhatsApp(`I want to order ${quickViewPerfume.name}. Please provide me with ordering details and availability.`)}
                          >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            {quickViewPerfume.isOutOfStock ? 'Out of Stock' : 'Order via WhatsApp'}
                          </Button>

                          {/* <Button
                            variant="outline"
                            onClick={() => openWhatsApp(`Can I get a sample of ${quickViewPerfume.name} before purchasing? Please let me know about sample availability and pricing.`)}
                            className="px-6 py-3"
                          >
                            Request Sample
                          </Button> */}
                        </div>

                        <Button
                          variant="ghost"
                          className="text-primary hover:bg-primary/5"
                          onClick={() => openWhatsApp(`I need help choosing between ${quickViewPerfume.name} and other similar fragrances. Can you provide recommendations based on my preferences?`)}
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
        />
      </div>
    </>
  );
};

export default Catalog;
