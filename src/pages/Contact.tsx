import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Phone,
  Mail,
  Instagram,
  Send,
  MessageCircle,
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
    // Validation
    if (!formData.name || !formData.message) {
      toast({
        title: "Missing details",
        description: "Please fill in your Name and Message before contacting us on WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    const message = `Hi, I’m ${formData.name}.\n\n${formData.message}\n\nYou can reach me at ${formData.email}${formData.phone ? ` or ${formData.phone}` : ""}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.message || !formData.subject) {
      toast({
        title: "Missing details",
        description: "Please fill in all required fields before sending an email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1000);
  };


  return (
    <div className="pt-8">
      {/* Hero */}
      <section className="py-20 hero-gradient text-cream particle-bg text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Get In <span className="text-accent">Touch</span>
        </h1>
        <p className="text-xl md:text-2xl opacity-90 mb-8">
          Let’s create something unforgettable together.
        </p>
        {/* <Button
        onClick={sendWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 shadow-xl hover:scale-105 transition"
      >
        <MessageCircle className="w-5 h-5 mr-2" /> Enquire on WhatsApp
      </Button> */}
      </section>
      {/* Contact Form + Info */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">
          {/* Form */}
          <Card className="glass-card shadow-xl rounded-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-semibold text-primary">
                Send us a message
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-2">
                We’d love to hear from you! Fill out the form and we’ll get back to you shortly.
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <Input
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="glass-card h-12 rounded-xl"
                />

                {/* Email */}
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="glass-card h-12 rounded-xl"
                />

                {/* Phone */}
                <Input
                  name="phone"
                  type="number"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="glass-card h-12 rounded-xl"
                  pattern="[0-9+ ]*"
                />


                {/* Subject */}
                <Input
                  name="subject"
                  placeholder="Subject *"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="glass-card h-12 rounded-xl"
                />

                {/* Message */}
                <Textarea
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="glass-card rounded-xl resize-none"
                />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="luxury-button flex-1 h-12 rounded-xl text-lg font-medium"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Email <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={sendWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white flex-1 h-12 rounded-xl text-lg font-medium"
                  >
                    <MessageCircle className="mr-2 w-5 h-5" /> WhatsApp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>


          {/* Info */}
          <div className="space-y-6">
            <Card className="glass-card hover:scale-105 transition">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Call / WhatsApp</h3>
                    <p className="text-muted-foreground mb-2">+91 79772 33704</p>
                    <Button asChild variant="outline" size="sm">
                      <a href="tel:+917977233704">Call Now</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:scale-105 transition">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Email Us</h3>
                    <p className="text-muted-foreground mb-2">zosheperfume@gmail.com</p>
                    <Button asChild variant="outline" size="sm">
                      <a href="mailto:zosheperfume@gmail.com">Send Email</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover:scale-105 transition">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Instagram className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Instagram</h3>
                    <p className="text-muted-foreground mb-2">@zoshe.perfume</p>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href="https://www.instagram.com/zoshe.perfume?igsh=MWdwd3ozdmFraG82bw%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        DM us
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
