import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Sparkles, Building2, Heart, ArrowRight, Star } from 'lucide-react';

const Customization = () => {
  const services = [
    {
      id: 1,
      title: "Custom Hampers",
      subtitle: "Personalized Gift Sets",
      description: "Create bespoke perfume collections tailored to your loved ones. Choose from our signature fragrances and elegant packaging options.",
      features: ["Personalized fragrance selection", "Custom packaging design", "Handwritten notes", "Luxury gift wrapping"],
      icon: Gift,
      price: "Starting from $120",
      popular: true,
      image: "🎁"
    },
    {
      id: 2,
      title: "Festive Hampers",
      subtitle: "Seasonal Collections",
      description: "Limited edition seasonal collections featuring exclusive holiday scents and premium packaging for special occasions.",
      features: ["Seasonal exclusive fragrances", "Holiday-themed packaging", "Limited edition bottles", "Collectible items"],
      icon: Sparkles,
      price: "Starting from $150",
      image: "🎄"
    },
    {
      id: 3,
      title: "Corporate Hampers",
      subtitle: "Bulk Business Orders",
      description: "Elegant corporate gifts that leave a lasting impression. Perfect for client appreciation, employee rewards, and business events.",
      features: ["Bulk order discounts", "Custom branding options", "Professional packaging", "Dedicated account manager"],
      icon: Building2,
      price: "Starting from $80/unit",
      image: "🏢"
    },
    {
      id: 4,
      title: "Scent Booth & Perfume Lab",
      subtitle: "Event Services",
      description: "Interactive perfume creation experiences for weddings, corporate events, and special occasions. Let guests create their signature scent.",
      features: ["On-site perfume creation", "Expert perfumer guidance", "Custom bottle labeling", "Take-home fragrances"],
      icon: Heart,
      price: "Starting from $500/event",
      exclusive: true,
      image: "🧪"
    }
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-cream particle-bg">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Customization <span className="text-accent">Services</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Create unforgettable experiences with our bespoke perfume services
            </p>
            <Button className="luxury-button text-lg px-10 py-4">
              Explore Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Premium Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From personalized gift sets to interactive event experiences, discover how we bring luxury fragrance to life
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className={`glass-card hover:scale-105 transition-all duration-500 group overflow-hidden relative ${
                  index % 2 === 0 ? 'slide-in-left' : 'fade-in-up'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="text-9xl absolute top-4 right-4 group-hover:scale-110 transition-transform duration-500">
                    {service.image}
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-6 left-6 flex gap-2 z-10">
                  {service.popular && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  {service.exclusive && (
                    <Badge className="bg-primary text-primary-foreground">
                      Exclusive
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-primary group-hover:text-primary/80 transition-colors">
                        {service.title}
                      </CardTitle>
                      <p className="text-sm text-accent font-medium">{service.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div>
                        <span className="text-lg font-bold text-primary">{service.price}</span>
                      </div>
                      <Button className="luxury-button group">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Discuss your vision and requirements with our experts" },
              { step: "02", title: "Customization", desc: "We craft your personalized experience or product" },
              { step: "03", title: "Delivery", desc: "Receive your luxury creation, perfectly packaged" }
            ].map((item, index) => (
              <div key={index} className="glass-overlay fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl font-bold text-accent mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Something <span className="text-accent">Extraordinary?</span>
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Contact our team to discuss your custom perfume needs and bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="luxury-button text-lg px-8 py-4">
              Schedule Consultation
            </Button>
            <Button variant="outline" className="glass-card text-cream border-cream/30 hover:bg-cream/10 text-lg px-8 py-4">
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customization;