import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowRight, Sparkles, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroPerfume from '@/assets/hero-perfume.jpeg';
import perfumeCollection from '@/assets/perfume-collection.jpg';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Ethereal Rose",
      price: "$145",
      notes: "Rose Petals, Vanilla, Sandalwood",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Midnight Oud",
      price: "$180",
      notes: "Oud, Bergamot, Amber",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Ocean Breeze",
      price: "$120",
      notes: "Sea Salt, Jasmine, Cedar",
      image: "/placeholder.svg"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "Absolutely divine! The quality and longevity of Zoshe perfumes is unmatched."
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Custom scent service exceeded all expectations. Perfect for our wedding!"
    },
    {
      name: "Emma Davis",
      rating: 5,
      text: "Luxury redefined. Each bottle is a masterpiece of craftsmanship."
    }
  ];

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPerfume})` }}
        ></div> */}
        <div 
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${heroPerfume})`,
    backgroundBlendMode: "lighten",
    backgroundColor: "rgba(255,255,255,0.10)" // adjust transparency
  }}
></div>

        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-cream mb-6">
              Luxury <span className="text-accent">Redefined</span>
            </h1>
            <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto" style={{"color": "black"}}>
              Discover the art of perfumery with Zoshe's exclusive collection of handcrafted fragrances
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button className="luxury-button text-lg px-8 py-4">
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/customization">
                <Button variant="outline" className="glass-card text-cream border-cream/30 hover:bg-cream/10 text-lg px-8 py-4">
                  Custom Scents
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
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

      {/* Brand Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-primary">
                Crafted with <span className="text-accent">Passion</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Born from a vision to revolutionize luxury fragrances, Zoshe combines traditional 
                perfumery techniques with modern innovation. Each bottle tells a story of elegance, 
                sophistication, and timeless beauty.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Years of Expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Unique Fragrances</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
              <Link to="/about">
                <Button variant="outline" className="glass-card">
                  Learn Our Story
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src={perfumeCollection} 
                alt="Zoshe Perfume Collection" 
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Featured <span className="text-accent">Fragrances</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most beloved scents, each carefully crafted to evoke emotion and create lasting memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="glass-card hover:scale-105 transition-transform duration-300 group">
                <div className="aspect-square bg-gradient-primary rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-cream opacity-60 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.notes}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <Button size="sm" className="luxury-button">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button className="luxury-button text-lg px-8 py-3">
                View All Perfumes
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              What Our <span className="text-accent">Clients Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the luxury through the words of our satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-shadow duration-300">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-cream mb-6">
            Ready to Find Your <span className="text-accent">Signature Scent?</span>
          </h2>
          <p className="text-xl text-cream/90 mb-8 max-w-2xl mx-auto">
            Experience the art of luxury perfumery with our exclusive collection and custom fragrance services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/customization">
              <Button className="luxury-button text-lg px-8 py-4">
                Start Custom Journey
                <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="glass-card text-cream border-cream/30 hover:bg-cream/10 text-lg px-8 py-4">
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;