import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  Instagram,
  Send,
  MessageCircle,
  MapPin,
  Clock,
  Heart,
  Sparkles,
  ChevronDown,
  Star,
  Award,
  Users,
  Shield,
  Facebook,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const WHATSAPP_NUMBER = "917977233704";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendWhatsApp = () => {
    if (!formData.name || !formData.message) {
      toast({
        title: "Missing details",
        description: "Please fill in your Name and Message before contacting us on WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    const message = `Hi, I'm ${formData.name}.\n\n${formData.message}\n\nYou can reach me at ${formData.email}${formData.phone ? ` or ${formData.phone}` : ""}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");

    toast({
      title: "Redirecting to WhatsApp",
      description: "Opening WhatsApp with your message...",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.message || !formData.subject) {
      toast({
        title: "Missing details",
        description: "Please fill in all required fields before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message sent successfully! ✨",
        description: "We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
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
            Get In <span className="bg-gradient-to-r from-accent via-primary to-accent text-transparent bg-clip-text">Touch</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Let's create something unforgettable together. We're here to help you find your perfect fragrance experience.
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
              { icon: <MessageCircle className="w-6 h-6" />, value: "24/7", label: "Customer Support" },
              { icon: <Star className="w-6 h-6" />, value: "5K+", label: "Happy Customers" },
              { icon: <Shield className="w-6 h-6" />, value: "100%", label: "Secure & Private" }
              // { icon: <Heart className="w-6 h-6" />, value: "<1hr", label: "Response Time" }
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

      {/* Enhanced Contact Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 relative z-10">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-card shadow-2xl rounded-2xl border border-border/20 backdrop-blur-xl overflow-hidden">
              <CardHeader className="text-center pb-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardTitle className="text-3xl font-bold text-primary mb-2">
                  Send us a message
                </CardTitle>
                <p className="text-muted-foreground leading-relaxed">
                  We'd love to hear from you! Fill out the form and we'll get back to you within 24 hours.
                </p>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Input
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="glass-card h-12 rounded-xl border-0 bg-white/50 backdrop-blur-sm placeholder:text-muted-foreground/70 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="glass-card h-12 rounded-xl border-0 bg-white/50 backdrop-blur-sm placeholder:text-muted-foreground/70 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="glass-card h-12 rounded-xl border-0 bg-white/50 backdrop-blur-sm placeholder:text-muted-foreground/70 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <Input
                      name="subject"
                      placeholder="Subject *"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="glass-card h-12 rounded-xl border-0 bg-white/50 backdrop-blur-sm placeholder:text-muted-foreground/70 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Textarea
                      name="message"
                      rows={5}
                      placeholder="Your message... *"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="glass-card rounded-xl border-0 bg-white/50 backdrop-blur-sm placeholder:text-muted-foreground/70 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Enhanced Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white flex-1 h-12 rounded-xl text-lg font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      {isSubmitting ? (
                        <div className="flex items-center relative z-10">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center relative z-10">
                          Send Email <Send className="ml-2 w-5 h-5" />
                        </div>
                      )}
                    </Button>

                    <Button
                      type="button"
                      onClick={sendWhatsApp}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex-1 h-12 rounded-xl text-lg font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="flex items-center relative z-10">
                        <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp
                      </div>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Let's Connect
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Choose your preferred way to reach us. We're always here to help with your fragrance journey.
              </p>
            </div>

            {/* Phone Card */}
            <Card className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-500 border border-border/20 backdrop-blur-sm group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">Call / WhatsApp</h3>
                    <p className="text-muted-foreground mb-3">+91 79772 33704</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button asChild variant="outline" size="sm" className="rounded-full hover:bg-primary/5 transition-colors">
                        <a href="tel:+917977233704">📞 Call Now</a>
                      </Button>
                      <Button asChild size="sm" className="bg-green-500 hover:bg-green-600 text-white rounded-full">
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank">💬 WhatsApp</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-500 border border-border/20 backdrop-blur-sm group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">Email Us</h3>
                    <p className="text-muted-foreground mb-3">zosheperfume@gmail.com</p>
                    <Button asChild variant="outline" size="sm" className="rounded-full hover:bg-primary/5 transition-colors">
                      <a href="mailto:zosheperfume@gmail.com">✉️ Send Email</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instagram Card */}
            <Card className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-500 border border-border/20 backdrop-blur-sm group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">Instagram</h3>
                    <p className="text-muted-foreground mb-3">@zoshe.perfume</p>
                    <Button asChild variant="outline" size="sm" className="rounded-full hover:bg-primary/5 transition-colors">
                      <a
                        href="https://www.instagram.com/zoshe.perfume?igsh=MWdwd3ozdmFraG82bw%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📸 Follow & DM
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-500 border border-border/20 backdrop-blur-sm group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Facebook className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">Facebook</h3>
                    <p className="text-muted-foreground mb-3">@zoshe.perfume</p>
                    <Button asChild variant="outline" size="sm" className="rounded-full hover:bg-primary/5 transition-colors">
                      <a
                        href="https://www.facebook.com/share/1FCQw1q7s8/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📸 Follow & DM
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours Card */}
            {/* <Card className="glass-card hover:scale-105 hover:shadow-xl transition-all duration-500 border border-border/20 backdrop-blur-sm group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">Business Hours</h3>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                      <p>Sunday: 10:00 AM - 6:00 PM</p>
                      <p className="text-xs text-primary mt-2">📱 WhatsApp available 24/7</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </motion.div>
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mt-20 px-6"
        >
          <Card className="glass-card border border-border/20 backdrop-blur-xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Need Immediate Assistance?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Our fragrance experts are standing by to help you find your perfect scent. Get personalized recommendations and instant support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-all duration-300 hover:scale-105 rounded-full px-8"
                  onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I need immediate assistance with fragrance selection.`, "_blank")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat Now on WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/5 rounded-full px-8"
                  onClick={() => window.open("tel:+917977233704")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Directly
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;
