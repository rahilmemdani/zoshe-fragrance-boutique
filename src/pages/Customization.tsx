import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageCircle, Sparkles, Star, Award, Users, Eye, Gift, Heart, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { sanityClient } from "../lib/sanityClient";
import { openWhatsApp } from "../lib/whatsApp";

const Customization = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "customization"] | order(_createdAt desc) {
            _id,
            title,
            subtitle,
            description,
            features,
            price,
            popular,
            exclusive,
            "imageUrl": image.asset->url,
            discountedPrice
          }`
        );
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);

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

  return (
    <div className="pt-8">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-32 hero-gradient text-cream">
        {/* Background Animated Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent animate-gradient-x"></div>

        {/* Floating Glow Orbs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-accent/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cream/10 rounded-full blur-3xl opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Curate Your
            <span className="block bg-gradient-to-r from-accent via-primary to-accent text-transparent bg-clip-text">
              Perfect Hamper
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Tailored luxury hampers, designed to make every occasion truly unforgettable with personalized touches and premium selections.
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
              { icon: <Gift className="w-6 h-6" />, value: `${services.length || 10}+`, label: "Custom Hampers" },
              { icon: <Crown className="w-6 h-6" />, value: "100%", label: "Premium Quality" },
              { icon: <Users className="w-6 h-6" />, value: "5K+", label: "Happy Customers" },
              { icon: <MessageCircle className="w-6 h-6" />, value: "24/7", label: "Personalized Support" }
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

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
            className="mt-16 flex justify-center"
          >
            <ChevronDown className="w-8 h-8 text-cream/70" />
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Floating background accents */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 bg-accent blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-primary blur-3xl rounded-full animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our <span className="text-accent">Luxury</span> Collections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from our expertly crafted hamper collections, each designed to create memorable experiences for your loved ones.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="overflow-hidden rounded-2xl border border-border/20">
                    <div className="h-64 md:h-80 bg-muted"></div>
                    <CardContent className="p-6">
                      <div className="h-6 bg-muted rounded mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            /* Enhanced Services Grid - Responsive */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Card className="glass-card overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 flex flex-col border border-border/20 backdrop-blur-xl group">
                    {/* Enhanced Image Section */}
                    <div className="relative overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-64 md:h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      {/* Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Enhanced Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {service.popular && (
                          <Badge className="bg-gradient-to-r from-accent to-primary text-white shadow-lg backdrop-blur-sm flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" /> 
                            Most Popular
                          </Badge>
                        )}
                        {service.exclusive && (
                          <Badge className="bg-gradient-to-r from-primary to-accent text-white shadow-lg backdrop-blur-sm flex items-center gap-1">
                            <Crown className="w-3 h-3" />
                            Exclusive
                          </Badge>
                        )}
                        {service.discountedPrice && (
                          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg backdrop-blur-sm animate-pulse">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Sale
                          </Badge>
                        )}
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Button
                          size="sm"
                          className="bg-white/90 text-primary hover:bg-white shadow-lg backdrop-blur-sm rounded-full px-4"
                          onClick={() => openWhatsApp(`I'd like to know more about ${service.title} hamper customization options.`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Quick Info
                        </Button>
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex-1">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                          {service.title}
                        </CardTitle>
                        
                        {service.subtitle && (
                          <p className="text-sm text-muted-foreground/80 mb-3 font-medium">
                            {service.subtitle}
                          </p>
                        )}
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
                          {service.description}
                        </p>

                        {/* Enhanced Features List */}
                        {service.features && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-primary mb-3 text-sm">What's Included:</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {service.features.slice(0, 6).map((feature: string, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-sm text-foreground/80"
                                >
                                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary flex-shrink-0" />
                                  <span className="truncate">{feature}</span>
                                </div>
                              ))}
                              {service.features.length > 6 && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
                                  <div className="w-2 h-2 rounded-full bg-muted flex-shrink-0" />
                                  <span>+{service.features.length - 6} more items</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Price + Button Section */}
                      <div className="border-t border-border/40 pt-4 mt-auto">
                        <div className="flex flex-col gap-4">
                          <PriceDisplay 
                            price={service.price} 
                            discountedPrice={service.discountedPrice}
                            size="md"
                            className="justify-start"
                          />
                          
                          {/* Enhanced Button Group */}
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button 
                              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden" 
                              onClick={() => openWhatsApp(`I'm interested in the ${service.title} hamper. Can you help me customize it according to my preferences?`)}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                              <MessageCircle className="w-4 h-4 mr-2 relative z-10" />
                              <span className="relative z-10">Customize Now</span>
                            </Button>
                            
                            <Button 
                              variant="outline"
                              className="sm:w-auto hover:bg-primary/5 transition-colors"
                              onClick={() => openWhatsApp(`Can I get more details about the ${service.title} hamper, including available customization options and pricing?`)}
                            >
                              <Gift className="w-4 h-4 mr-2" />
                              Get Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16 p-8 rounded-2xl glass-card border border-border/20"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Need Something <span className="text-accent">Completely Custom?</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find exactly what you're looking for? Let our experts create a completely bespoke hamper tailored to your specific requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => openWhatsApp("I'd like to create a completely custom hamper. Can you help me design something unique?")}
              >
                <Heart className="w-5 h-5 mr-2" />
                Create Custom Hamper
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={() => openWhatsApp("I need consultation on choosing the right hamper for my occasion. Can you guide me?")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Expert Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Customization;
