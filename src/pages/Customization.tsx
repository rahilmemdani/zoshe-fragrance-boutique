import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageCircle, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { sanityClient } from "../lib/sanityClient";
import { openWhatsApp } from "../lib/whatsApp";


const Customization = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "customization"] | order(_createdAt desc) {
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
      }
    `
      )
      .then(setServices);
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
            className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer lg:text-2xl`}
          >
            ₹{price.toLocaleString()}
          </motion.span>
        )}
      </div>
    );
  };

  return (
    <div className="pt-8">
      <section className="relative overflow-hidden py-28 hero-gradient text-cream">
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
            <span className="block bg-gradient-to-r from-accent via-primary to-accent text-transparent bg-clip-text animate-shimmer">
            Perfect Hamper
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Tailored luxury hampers, designed to make every occasion truly unforgettable.
          </motion.p>

          {/* Stats with Stagger Animation */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="flex flex-col sm:flex-row justify-center gap-10 mt-12"
          >
            {[
              { value: `${services.length - 1}+`, label: "Premium Hampers" },
              { value: "100%", label: "Authentic Products" },
              { value: "24/7", label: "Expert Support" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-accent">{stat.value}</div>
                <div className="text-cream/80">{stat.label}</div>
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

        {/* Floating background accents */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-accent blur-3xl rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-primary blur-3xl rounded-full animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Heading */}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, i) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="glass-card overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col border border-white/10 backdrop-blur-xl">
                  {/* Image */}
                  <div className="relative group">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-64 md:h-80 object-cover rounded-t-2xl transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      {service.popular && (
                        <Badge className="bg-gradient-to-r from-accent to-primary text-white shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3" /> Popular
                        </Badge>
                      )}
                      {service.exclusive && (
                        <Badge className="bg-gradient-to-r from-primary to-accent text-white shadow-md">
                          Exclusive
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <CardTitle className="text-2xl font-bold text-primary mb-2">
                      {service.title}
                    </CardTitle>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {service.features && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                        {service.features.map((f: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-foreground/80"
                          >
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Price + Button */}
                  <div className="border-t border-border/40 pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* UPDATED: Using new PriceDisplay component */}
                      <PriceDisplay 
                        price={service.price} 
                        discountedPrice={service.discountedPrice}
                        size="md"
                        className="justify-start"
                      />
                      <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 hover:scale-105" onClick={() => openWhatsApp(service.name)}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Enquire on WhatsApp
                      </Button>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customization;
