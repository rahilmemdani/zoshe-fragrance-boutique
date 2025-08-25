import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Sparkles, Building2, Heart, ArrowRight, Star } from 'lucide-react';
import makeyourown from '../assets/makeyourown.png';
import festive from '../assets/festive.png';
import corporate from "../assets/lab.png"
// '../assets/corporate.png';
import lab from "../assets/lab.png"
// '../assets/lab.png';

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
      image: makeyourown
    },
    {
      id: 2,
      title: "Festive Hampers",
      subtitle: "Seasonal Collections",
      description: "Limited edition seasonal collections featuring exclusive holiday scents and premium packaging for special occasions.",
      features: ["Seasonal exclusive fragrances", "Holiday-themed packaging", "Limited edition bottles", "Collectible items"],
      icon: Sparkles,
      price: "Starting from $150",
      image: festive
    },
    {
      id: 3,
      title: "Corporate Hampers",
      subtitle: "Bulk Business Orders",
      description: "Elegant corporate gifts that leave a lasting impression. Perfect for client appreciation, employee rewards, and business events.",
      features: ["Bulk order discounts", "Custom branding options", "Professional packaging", "Dedicated account manager"],
      icon: Building2,
      price: "Starting from $80/unit",
      image: corporate
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
      image: lab
    }
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-24 hero-gradient text-cream particle-bg">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Customization <span className="text-accent">Services</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Create unforgettable experiences with our bespoke perfume services
          </p>
          {/* <Button className="luxury-button text-lg px-10 py-4 inline-flex items-center gap-2">
            Explore Services
            <ArrowRight className="w-5 h-5" />
          </Button> */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service) => (
              <Card key={service.id} className="glass-card overflow-hidden rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500">
                {/* Image */}
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-64 object-cover md:h-80"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {service.popular && (
                      <Badge className="bg-accent text-accent-foreground flex items-center gap-1">
                        <Star className="w-3 h-3" /> Most Popular
                      </Badge>
                    )}
                    {service.exclusive && (
                      <Badge className="bg-primary text-primary-foreground">Exclusive</Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-primary">{service.title}</CardTitle>
                      <p className="text-sm text-accent font-medium">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{service.description}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{service.price}</span>
                    {/* <Button className="luxury-button flex items-center gap-1">
                      Contact us <ArrowRight className="w-4 h-4" />
                    </Button> */}
 <a href="mailto:sales@zoshe.com?subject=Custom%20Hamper%20Inquiry">
  <Button className="luxury-button flex items-center gap-1">
    Contact Us <ArrowRight className="w-4 h-4" />
  </Button>
</a>

                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/10">
  <div className="max-w-5xl mx-auto text-center px-6">
    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
      How It Works
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { step: "01", title: "Consultation", desc: "Discuss your vision and requirements with our experts", icon: Gift },
        { step: "02", title: "Customization", desc: "We craft your personalized experience or product", icon: Sparkles },
        { step: "03", title: "Delivery", desc: "Receive your luxury creation, perfectly packaged", icon: Building2 }
      ].map((item, index) => (
        <div
          key={index}
          className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center fade-in-up"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {/* Icon Circle */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <item.icon className="w-10 h-10 text-primary" />
          </div>

          {/* Step Number */}
          <div className="text-3xl md:text-4xl font-bold text-accent mb-3">{item.step}</div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-semibold text-primary mb-2">{item.title}</h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{item.desc}</p>

          {/* Accent Gradient Bar */}
          <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full mt-6"></div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      {/* <section className="py-24 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Create Something <span className="text-accent">Extraordinary?</span>
          </h2>
          <p className="text-lg opacity-90 mb-10">
            Contact our team to discuss your custom perfume needs and bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="luxury-button text-lg px-8 py-4">
              Schedule Consultation
            </Button>
            <Button variant="outline" className="glass-card text-cream border-cream/30 hover:bg-cream/10 text-lg px-8 py-4">
              View Portfolio
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Customization;