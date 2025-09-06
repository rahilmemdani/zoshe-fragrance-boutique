import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@sanity/client';
import { Sparkles, Award, Users, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import shahreenImage from "../assets/shahreen Mohd Imran.jpeg"
import zoyaImage from "../assets/Zoya Image.jpeg"
import aboutUs from "../assets/About Us.jpeg";

const About = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Artisanal Craftsmanship",
      description: "Our products are handcrafted and tailored to our clients' needs using both traditional and modern techniques."
    },
    {
      icon: Award,
      title: "Premium Ingredients",
      description: "Our finest raw materials are sourced from nationally and internationally renowned companies best known for their service."
    },
    {
      icon: Users,
      title: "Personal Touch",
      description: "Our skilled professionals work closely with each client to create truly personalized products."
    },
    {
      icon: Globe,
      title: "Global Excellence",
      description: "ZOSHE is constantly striving to be loved by many clients in India and across other continents."
    }
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Zoya Amirali Gilani",
      role: "Social Media Marketing Specialist & Co-Founder",
      quote: "Creating connections through scent, building brands through passion.",
      image: zoyaImage,
      gradient: "from-accent to-primary"
    },
    {
      name: "Shahreen Mohd Imran",
      role: "Master Perfumer & Co-Founder",
      quote: "Every fragrance tells a story. My mission is to help you discover yours.",
      image: shahreenImage,
      gradient: "from-primary to-accent"
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
            Embracing the essence of every individual through dedicated craftsmanship.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h2 className="sm:text-4xl lg:text-6xl font-bold text-primary">
                The ZOSHE <span className="text-accent">Legacy</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2025, a master of perfumery and a social media marketing
                  specialist came together to form a brand named after them.
                  At ZOSHE, we believe your fragrance should be as unique as you are.
                  We are a customized perfume house, dedicated to crafting scents
                  that reflect your personality, style, and essence.
                </p>
                <p>
                  Each creation is more than just a perfume—it is a signature. Using
                  the world's finest ingredients and artisanal blending techniques,
                  our perfumes are tailored to capture individuality and leave a
                  lasting impression.
                </p>
                <p>
                  With ZOSHE, luxury meets personalization. Whether you desire a
                  fragrance that tells your story, complements your lifestyle, or
                  defines your presence, we bring your vision to life—drop by drop.
                  Because at ZOSHE, we don't just make perfumes. We create your
                  essence.
                </p>
              </div>
            </div>

            {/* Right: Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-[550px] rounded-2xl overflow-hidden  flex items-center justify-center">
                <img
                  src={aboutUs}
                  alt="About ZOSHE"
                  className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle glowing background */}
                <div className="absolute -inset-6 bg-gradient-to-br from-accent/30 to-primary/20 rounded-2xl blur-2xl opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Founders Spotlight Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Meet Our <span className="text-accent">Founders</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Two visionary entrepreneurs who combined their expertise to create something extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 }}
                className="glass-card p-8 text-center hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  {/* Large Profile Image */}
                  <div className="relative w-56 h-56 mx-auto mb-12">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full p-1.5 shadow-xl group-hover:scale-105 transition-transform duration-300`}>
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    {/* Glowing effect */}
                    <div className={`absolute -inset-4 bg-gradient-to-br ${member.gradient} rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>

                  {/* Member Details */}
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-accent font-semibold mb-6 text-base">
                    {member.role}
                  </p>
                  <blockquote className="text-muted-foreground text-lg italic leading-relaxed max-w-sm mx-auto">
                    "{member.quote}"
                  </blockquote>

                  {/* Decorative elements */}
                  <div className="flex justify-center mt-8 space-x-2">
                    <div className={`w-2 h-2 bg-gradient-to-r ${member.gradient} rounded-full animate-pulse`}></div>
                    <div className={`w-3 h-3 bg-gradient-to-r ${member.gradient} rounded-full animate-pulse delay-100`}></div>
                    <div className={`w-2 h-2 bg-gradient-to-r ${member.gradient} rounded-full animate-pulse delay-200`}></div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              We create products that are guided by experience, knowledge, and execution.
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
              { step: "1", title: "Inspiration", desc: "Our creative foundation is inspired by the vision of providing customers with a surreal experience through our customized products.", icon: Sparkles },
              { step: "2", title: "Composition", desc: "Our master professionals carefully select and blend premium ingredients with custom-tailored ideas to create the perfect harmony in the product.", icon: Award },
              { step: "3", title: "Perfection", desc: "We find finesse in CRUELTY FREE - LUXURIOUS OILS - AFFORDABLE WEAR - GENDER NEUTRAL - MINIMAL CHEMICALS.", icon: Users }
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
              { year: "2025", title: "The Beginning", desc: "Zoya and Shahreen founded the company with a vision to create the best products for our clients' tailored necessities. A trip together to the Kingdom of Saudi Arabia as a spiritual journey soon turned into friendship and led to the formation of ZOSHE, where two young individuals combined their best abilities and aspire to conquer great lengths together." }
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
