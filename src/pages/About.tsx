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
                  Founded in 2009 by master perfumer Isabella Zoshe, our brand emerged from a simple yet profound 
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
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              The Art of <span className="text-accent">Perfumery</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From concept to creation, every Zoshe fragrance undergoes a meticulous process that honors 
              both tradition and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center text-cream font-bold text-2xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-primary">Inspiration</h3>
              <p className="text-muted-foreground">
                Every fragrance begins with a story, emotion, or memory that serves as our creative foundation.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center text-cream font-bold text-2xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-primary">Composition</h3>
              <p className="text-muted-foreground">
                Our master perfumers carefully select and blend premium ingredients to create the perfect harmony.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center text-cream font-bold text-2xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-primary">Perfection</h3>
              <p className="text-muted-foreground">
                Months of refinement ensure each fragrance meets our exacting standards before reaching you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our <span className="text-accent">Journey</span>
            </h2>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="glass-card p-6 flex-1">
                <div className="text-accent font-bold text-lg mb-2">2009</div>
                <h3 className="text-xl font-semibold text-primary mb-2">The Beginning</h3>
                <p className="text-muted-foreground">
                  Isabella Zoshe founded the company with a vision to create luxury fragrances that tell stories.
                </p>
              </div>
              <div className="w-4 h-4 rounded-full bg-accent shrink-0"></div>
              <div className="flex-1"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1"></div>
              <div className="w-4 h-4 rounded-full bg-accent shrink-0"></div>
              <div className="glass-card p-6 flex-1">
                <div className="text-accent font-bold text-lg mb-2">2015</div>
                <h3 className="text-xl font-semibold text-primary mb-2">International Recognition</h3>
                <p className="text-muted-foreground">
                  Zoshe perfumes gained international acclaim, winning prestigious industry awards.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="glass-card p-6 flex-1">
                <div className="text-accent font-bold text-lg mb-2">2020</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Innovation Era</h3>
                <p className="text-muted-foreground">
                  Launched our custom fragrance services and state-of-the-art scent laboratory.
                </p>
              </div>
              <div className="w-4 h-4 rounded-full bg-accent shrink-0"></div>
              <div className="flex-1"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1"></div>
              <div className="w-4 h-4 rounded-full bg-accent shrink-0"></div>
              <div className="glass-card p-6 flex-1">
                <div className="text-accent font-bold text-lg mb-2">2024</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Global Expansion</h3>
                <p className="text-muted-foreground">
                  Today, Zoshe serves discerning clients across the globe with unparalleled luxury fragrances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;