import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ArrowRight, Sparkles, Heart, Users, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import heroPerfume from '@/assets/hero-perfume.jpeg';
import perfumeCollection from '@/assets/perfume-collection.jpg';
import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from "../lib/sanityClient";
import { openWhatsApp } from "../lib/whatsApp";

const Home = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
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
            isPremium
          }`
        );
        setPerfumes(data);
      } catch (error) {
        console.error('Error fetching catalogue:', error);
      }
    };
    fetchCatalogue();
  }, []);

  const builder = imageUrlBuilder(sanityClient);
  function urlFor(source: any) {
    return builder.image(source);
  }

  interface Perfume {
    // isPremium: any;
    _id: string;
    name: string;
    price: number;
    description: { _type: string; children: { text: string }[] }[];
    images: { asset: any }[];
    // slug: { current: string };
    scentProfile?: string[]; // ✅ new
    promotion?: string;
    isPremium?: string;
  }

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
            "imageUrl": image.asset->url
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
      text: "Amazing fragrances with long-lasting scent. ZOSHE is a product worth buying."
    },
    {
      name: "Aliza Shaikh",
      rating: 5,
      text: "There's a soothing effect to ZOSHE products... I bought a few and absolutely fell in love with them."
    },
    {
      name: "Nikita Singh",
      rating: 5,
      text: "Beautiful perfume that is now my everyday favorite. Thank you so much!!!"
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
            <p className="text-xl md:text-2xl text-cream/90 mb-8 max-w-2xl mx-auto" style={{ "color": "black" }}>
              Discover the art of perfumery with ZOSHE's exclusive collection of handcrafted fragrances
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
                  Custom Hampers
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
              <p className="text-lg sm:text-md text-muted-foreground leading-relaxed">
              ZOSHE crafts its finest products with artistry and emotion, combining high-quality materials in a unique way. 
              Each creation carries its own personality, offering a personal choice for everyone.
              </p>
              <div className="grid grid-cols-3 gap-6" style={{marginBottom:"20px"}}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">Years of Expertise</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Unique Fragrances</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
              </div>
              <Link to="/about">
              <Button
  variant="outline"
  className="
    rounded-full px-6 py-3
    border-primary text-primary
    bg-transparent
    transition-all duration-300 ease-in-out
    group
    hover:border-transparent
    hover:text-white
    hover:bg-gradient-to-r from-primary to-accent
    hover:shadow-lg hover:shadow-accent/30
  "
>
  Learn Our Story
  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
</Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src={perfumeCollection}
                alt="ZOSHE Perfume Collection"
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
            {perfumes.filter((product) => 
            product.isPremium)
             .slice(0, 3)
              .map((product) => (
                <Card
                  key={product._id}
                  className="relative glass-card rounded-2xl overflow-hidden group hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
                >
                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={urlFor(product.images[0].asset).width(600).url()}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <span className="text-6xl opacity-50">🌸</span>
                      </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-60"></div>

                    {/* Promotion badge */}
                    {product?.promotion && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
                        {product.promotion}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
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

                    {/* Scent Profile Tags */}
                    {product.scentProfile?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.scentProfile.map((note, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs px-3 py-1 rounded-full border-primary/20 text-primary/70 hover:border-accent/40 transition"
                          >
                            {note}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Price + Action */}
                    <div className="flex flex-col gap-3 border-t border-border/40 pt-3">
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ₹{product.price?.toLocaleString()}
                      </span>

                      <Button
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => openWhatsApp(product.name)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" /> Enquire on WhatsApp
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

      {/* Customization Services */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Popular <span className="text-accent">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our premium customization services, crafted to make your fragrance truly unique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.filter((s) => 
            s.popular)
            .slice(0, 3)
            .map((service) => (
              <Card
                key={service._id}
                className="glass-card hover:scale-105 transition-transform duration-300 group"
              >
                <div className="aspect-video rounded-lg mb-4 overflow-hidden relative">
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-primary/50" />
                    </div>
                  )}
                </div>

                <CardContent className="p-6 flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {service.description}
                  </p>

                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ₹{service.price}
                  </span>

                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-300 hover:scale-105 w-full"
                    onClick={() => openWhatsApp(service.title)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enquire on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/customization">
              <Button className="luxury-button text-lg px-8 py-3">
                View All Services
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