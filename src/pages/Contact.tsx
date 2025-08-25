import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter,
  Send,
  MessageCircle,
  Star
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiry: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiry: 'general'
      });
    }, 1000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Boutique",
      details: ["123 Luxury Lane", "Beverly Hills, CA 90210", "United States"],
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 79772 33704","", "WhatsApp Available"],
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["zosheperfume@gmail.com"],
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 8:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: 12:00 PM - 5:00 PM"],
      action: "View Calendar"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'custom', label: 'Custom Orders' },
    { value: 'corporate', label: 'Corporate Services' },
    { value: 'support', label: 'Customer Support' },
    { value: 'press', label: 'Press & Media' }
  ];

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', handle: '@zoshe.perfume'}
    // { icon: Facebook, name: 'Facebook', handle: 'ZosheLuxury'},
    // { icon: Twitter, name: 'Twitter', handle: '@zoshefragrance'}
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-cream particle-bg">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get In <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              We'd love to hear from you. Let's create something beautiful together.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              <span className="text-lg">Rated 4.9/5 by 1,000+ customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="fade-in-up">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-3xl text-primary mb-2">
                    Send us a message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="glass-card mt-1"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="glass-card mt-1"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="glass-card mt-1"
                          placeholder="+91 79772 33704"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiry">Inquiry Type</Label>
                        <select
                          id="inquiry"
                          name="inquiry"
                          value={formData.inquiry}
                          onChange={handleInputChange}
                          className="w-full mt-1 px-3 py-2 bg-[var(--glass-bg)] backdrop-blur-[16px] border border-[var(--glass-border)] rounded-md text-foreground"
                        >
                          {inquiryTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="glass-card mt-1"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="glass-card mt-1"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="luxury-button w-full text-lg py-3"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 slide-in-left">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className="glass-card hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1 mb-4">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="glass-card">
                          {info.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Find Our Boutique
            </h2>
            <p className="text-lg text-muted-foreground">
              Visit us in the heart of Beverly Hills for a personalized fragrance experience
            </p>
          </div>

          <Card className="glass-card overflow-hidden">
            <div className="aspect-video bg-gradient-primary flex items-center justify-center">
              <div className="text-center text-cream">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-60" />
                <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
                <p className="text-lg opacity-90">
                  123 Luxury Lane, Beverly Hills, CA 90210
                </p>
                <Button className="luxury-button mt-4">
                  View on Google Maps
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
            Follow Our Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Stay connected with us on social media for the latest updates, behind-the-scenes content, and exclusive offers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <Card 
                key={index} 
                className="glass-card hover:scale-105 transition-all duration-300 group cursor-pointer fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <social.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {social.name}
                  </h3>
                  <p className="text-muted-foreground mb-2">{social.handle}</p>
                  {/* <Badge variant="outline">{social.followers} followers</Badge> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Quick <span className="text-accent">Answers?</span>
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Check out our frequently asked questions or start a live chat with our team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="luxury-button text-lg px-8 py-4">
              <MessageCircle className="mr-2 w-5 h-5" />
              Live Chat Support
            </Button>
            <Button variant="outline" className="glass-card text-cream border-cream/30 hover:bg-cream/10 text-lg px-8 py-4">
              View FAQ
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;