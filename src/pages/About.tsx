import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Award, Users, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Artisanal Craftsmanship",
      description: "Every perfume is handcrafted using traditional techniques passed down through generations."
    },
    {
      icon: Award,
      title: "Premium Ingredients",
      description: "We source only the finest raw materials from renowned perfume capitals around the world."
    },
    {
      icon: Users,
      title: "Personal Touch",
      description: "Our master perfumers work closely with each client to create truly personalized fragrances."
    },
    {
      icon: Globe,
      title: "Global Excellence",
      description: "Zoshe perfumes are loved by connoisseurs across five continents."
    }
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Story</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Born from passion, crafted with precision, and dedicated to creating unforgettable olfactory experiences
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-primary">
                The Zoshe <span className="text-accent">Legacy</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2024 by master perfumer Isabella Zoshe, our brand emerged from a simple yet profound
                  belief: that fragrance has the power to transport, transform, and create lasting memories.
                </p>
                <p>
                  With over two decades of experience in the world's most prestigious perfume houses, Isabella
                  brought together ancient artisanal techniques with modern innovation to create something truly
                  extraordinary.
                </p>
                <p>
                  Today, Zoshe stands as a testament to the art of perfumery, where each bottle represents not
                  just a fragrance, but a carefully composed symphony of the finest ingredients sourced from
                  around the globe.
                </p>
              </div>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-cream" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Isabella Zoshe</h3>
              <p className="text-accent font-semibold mb-2">Master Perfumer & Founder</p>
              <p className="text-muted-foreground">
                "Every fragrance tells a story. My mission is to help you discover yours."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our <span className="text-accent">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide us in creating exceptional fragrances and extraordinary experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-cream" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-20 bg-muted/10">
  <div className="max-w-5xl mx-auto text-center px-6">
    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
      The Art of <span className="text-accent">Perfumery</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        { step: "1", title: "Inspiration", desc: "Every fragrance begins with a story, emotion, or memory that serves as our creative foundation.", icon: Sparkles },
        { step: "2", title: "Composition", desc: "Our master perfumers carefully select and blend premium ingredients to create the perfect harmony.", icon: Award },
        { step: "3", title: "Perfection", desc: "Months of refinement ensure each fragrance meets our exacting standards before reaching you.", icon: Users }
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

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our <span className="text-accent">Journey</span>
            </h2>
          </div>

          <div className="relative flex flex-col items-center">
            {/* Central Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-accent/20"></div>

            {[
              { year: "2024", title: "The Beginning", desc: "Isabella Zoshe founded the company with a vision to create luxury fragrances that tell stories." },
              { year: "2025", title: "International Recognition", desc: "Zoshe perfumes gained international acclaim, winning prestigious industry awards." },
              // { year: "2020", title: "Innovation Era", desc: "Launched our custom fragrance services and state-of-the-art scent laboratory." },
              // { year: "2025", title: "Global Expansion", desc: "Today, Zoshe serves discerning clients across the globe with unparalleled luxury fragrances." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center mb-12 relative z-10">
                {/* Dot */}
                <div className="w-5 h-5 bg-accent rounded-full shadow-lg mb-6"></div>

                {/* Card */}
                <div className="glass-card p-6 text-center max-w-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-accent font-bold text-lg mb-2">{item.year}</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;