import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Award, Users, Globe, ChevronDown, Heart, Star, Crown, Target, Zap, Shield, Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import shahreenImage from "../assets/shahreen Mohd Imran.jpeg";
import zoyaImage from "../assets/Zoya Image.jpeg";
import aboutUs from "../assets/About Us.jpeg";

const About = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Artisanal Craftsmanship",
      description: "Our products are handcrafted and tailored to our clients' needs using both traditional and modern techniques.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Award,
      title: "Premium Ingredients",
      description: "Our finest raw materials are sourced from nationally and internationally renowned companies best known for their service.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Personal Touch",
      description: "Our skilled professionals work closely with each client to create truly personalized products.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Excellence",
      description: "ZOSHE is constantly striving to be loved by many clients in India and across other continents.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  // Enhanced team members data
  const teamMembers = [
    {
      name: "Zoya Amirali Gilani",
      role: "Social Media Marketing Specialist & Co-Founder",
      quote: "Creating connections through scent, building brands through passion.",
      image: zoyaImage,
      gradient: "from-accent to-primary",
      expertise: ["Social Media Strategy", "Brand Building", "Customer Relations"],
      achievement: "10K+ Engaged Followers"
    },
    {
      name: "Shahreen Mohd Imran",
      role: "Master Perfumer & Co-Founder",
      quote: "Every fragrance tells a story. My mission is to help you discover yours.",
      image: shahreenImage,
      gradient: "from-primary to-accent",
      expertise: ["Fragrance Composition", "Scent Profiling", "Quality Control"],
      achievement: "500+ Custom Fragrances"
    }
  ];

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="pt-8">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden py-32 hero-gradient text-cream">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-10 w-40 h-40 bg-accent/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cream/10 rounded-full blur-3xl opacity-40"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Our <span className="bg-gradient-to-r from-accent via-primary to-accent text-transparent bg-clip-text">Story</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Embracing the essence of every individual through dedicated craftsmanship and passionate innovation.
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
              { icon: <Crown className="w-6 h-6" />, value: "2025", label: "Founded" },
              { icon: <Users className="w-6 h-6" />, value: "2", label: "Expert Founders" },
              { icon: <Heart className="w-6 h-6" />, value: "1000+", label: "Happy Customers" }
              // { icon: <Globe className="w-6 h-6" />, value: "Global", label: "Reach" }
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

          {/* Scroll Indicator */}
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

      {/* Enhanced Story Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Enhanced Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
                  The ZOSHE <span className="text-accent">Legacy</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8"></div>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-foreground/80"
                >
                  Founded in 2025, a master of perfumery and a social media marketing
                  specialist came together to form a brand named after them.
                  At ZOSHE, we believe your fragrance should be as unique as you are.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-foreground/80"
                >
                  Each creation is more than just a perfume—it is a signature. Using
                  the world's finest ingredients and artisanal blending techniques,
                  our perfumes are tailored to capture individuality and leave a
                  lasting impression.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-foreground/80"
                >
                  With ZOSHE, luxury meets personalization. We don't just make perfumes—
                  we create your essence, drop by drop.
                </motion.p>
              </div>

              {/* Enhanced CTA */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg transition-all duration-300 hover:scale-105 px-8">
                  Explore Our Collection
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8">
                  Learn Our Process
                </Button>
              </motion.div> */}
            </motion.div>

            {/* Enhanced Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative group">
                <div className="relative w-full max-w-md h-[550px] rounded-2xl overflow-hidden glass-card backdrop-blur-xl border border-border/20">
                  <img
                    src={aboutUs}
                    alt="About ZOSHE - Luxury Fragrance Craftsmanship"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Enhanced overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                {/* Enhanced glowing background */}
                <div className="absolute -inset-8 bg-gradient-to-br from-accent/30 to-primary/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Founders Spotlight Section */}
      <section className="py-20 bg-muted/20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-60 h-60 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Meet Our <span className="text-accent">Visionaries</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Two passionate entrepreneurs who combined their expertise to create something extraordinary in the world of luxury fragrances.
            </p>
          </motion.div>

          {/* Enhanced Team Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card p-8 rounded-2xl backdrop-blur-xl border border-border/20 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >
                {/* Enhanced background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  {/* Enhanced Profile Section */}
                  <div className="text-center mb-8">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full p-2 shadow-2xl group-hover:scale-105 transition-transform duration-500`}>
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      {/* Enhanced glowing effect */}
                      <div className={`absolute -inset-6 bg-gradient-to-br ${member.gradient} rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-accent font-semibold mb-4 text-base">
                      {member.role}
                    </p>
                  </div>

                  {/* Enhanced Content */}
                  <div className="space-y-6">
                    <blockquote className="text-muted-foreground text-lg italic leading-relaxed text-center border-l-4 border-gradient-to-b from-primary to-accent pl-4 py-2">
                      "{member.quote}"
                    </blockquote>

                    {/* Expertise Tags */}
                    <div>
                      <h4 className="text-sm font-semibold text-primary mb-3">Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 text-primary/80 px-3 py-1 rounded-full border border-primary/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    <div className={`text-center p-4 bg-gradient-to-r ${member.gradient} bg-opacity-10 rounded-xl border border-gradient-to-r from-primary/20 to-accent/20`}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-accent" />
                        <span className="text-sm font-semibold text-primary">Key Achievement</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{member.achievement}</p>
                    </div>
                  </div>

                  {/* Enhanced decorative elements */}
                  <div className="flex justify-center mt-6 space-x-2">
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

      {/* Enhanced Values Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-60 h-60 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Core <span className="text-accent">Values</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We create products guided by experience, knowledge, and flawless execution, rooted in these fundamental principles.
            </p>
          </motion.div>

          {/* Enhanced Values Grid */}
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group"
              >
                <Card className="glass-card hover:shadow-2xl transition-all duration-500 text-center h-full backdrop-blur-xl border border-border/20 overflow-hidden relative">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Enhanced Icon */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                        <value.icon className="w-10 h-10 text-white" />
                      </div>
                      {/* Icon glow */}
                      <div className={`absolute -inset-2 bg-gradient-to-br ${value.gradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`}></div>
                    </div>

                    {/* Enhanced Content */}
                    <h3 className="text-xl font-semibold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {value.description}
                    </p>

                    {/* Decorative element */}
                    <div className={`w-12 h-1 bg-gradient-to-r ${value.gradient} rounded-full mx-auto mt-6 opacity-70`}></div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Craftsmanship Section */}
      <section className="py-20 bg-muted/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              The Art of <span className="text-accent">Perfumery</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our meticulous three-step process ensures every fragrance is a masterpiece of artisanal craftsmanship.
            </p>
          </motion.div>

          {/* Enhanced Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                step: "01", 
                title: "Inspiration", 
                desc: "Our creative foundation is inspired by the vision of providing customers with a surreal experience through our customized products.", 
                icon: Sparkles,
                gradient: "from-purple-500 to-pink-500"
              },
              { 
                step: "02", 
                title: "Composition", 
                desc: "Our master professionals carefully select and blend premium ingredients with custom-tailored ideas to create the perfect harmony.", 
                icon: Target,
                gradient: "from-blue-500 to-cyan-500"
              },
              { 
                step: "03", 
                title: "Perfection", 
                desc: "We find finesse in CRUELTY FREE - LUXURIOUS OILS - AFFORDABLE WEAR - GENDER NEUTRAL - MINIMAL CHEMICALS.", 
                icon: Crown,
                gradient: "from-amber-500 to-orange-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="glass-card p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center h-full backdrop-blur-xl border border-border/20 relative overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    {/* Enhanced Step Number */}
                    <div className="relative mb-6">
                      <div className={`text-6xl md:text-7xl font-bold bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent opacity-20 absolute -top-4 left-1/2 -translate-x-1/2`}>
                        {item.step}
                      </div>
                      <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                        <item.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Enhanced Content */}
                    <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                      {item.desc}
                    </p>

                    {/* Enhanced accent bar */}
                    <div className={`w-16 h-1 bg-gradient-to-r ${item.gradient} rounded-full mx-auto opacity-70 group-hover:w-24 transition-all duration-500`}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our <span className="text-accent">Journey</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From a spiritual journey to a fragrance empire—discover how ZOSHE came to life.
            </p>
          </motion.div>

          {/* Enhanced Timeline */}
          <div className="relative flex flex-col items-center">
            {/* Enhanced Central Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center mb-12 relative z-10"
            >
              {/* Enhanced Dot */}
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full shadow-xl mb-8 relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-30 blur-sm animate-pulse"></div>
              </div>
              
              {/* Enhanced Card */}
              <div className="glass-card p-8 text-center max-w-2xl hover:shadow-2xl transition-all duration-500 rounded-2xl backdrop-blur-xl border border-border/20 group relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Crown className="w-6 h-6 text-accent" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2025</div>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                    The Beginning
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Zoya and Shahreen founded the company with a vision to create the best products for our clients' tailored necessities. A spiritual journey to the Kingdom of Saudi Arabia soon turned into friendship and led to the formation of ZOSHE, where two young individuals combined their best abilities and aspire to conquer great lengths together.
                  </p>
                  
                  {/* Decorative element */}
                  <div className="flex justify-center mt-6 space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-card border border-border/20 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-12">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full">
                    <Heart className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Ready to Create Your <span className="text-accent">Signature Scent?</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of customers who have discovered their unique essence with ZOSHE. Let us craft a fragrance that tells your story.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/catalog">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg transition-all duration-300 hover:scale-105 rounded-full px-8"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Button>
                  </Link>
                  {/* <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary text-primary hover:bg-primary/5 rounded-full px-8"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Meet Our Team
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
