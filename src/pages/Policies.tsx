import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  RotateCcw, 
  Shield, 
  FileText, 
  Clock, 
  Package,
  CreditCard,
  Globe,
  Lock,
  Eye,
  Users,
  AlertCircle
} from 'lucide-react';

const Policies = () => {
  const [activeTab, setActiveTab] = useState('shipping');

  const policyTabs = [
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'returns', label: 'Returns', icon: RotateCcw },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText }
  ];

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-cream particle-bg">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-accent">Policies</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Everything you need to know about shopping with Zoshe
            </p>
            <Badge className="bg-accent/20 text-cream text-lg px-6 py-2">
              Last updated: December 2024
            </Badge>
          </div>
        </div>
      </section>

      {/* Policies Content */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 glass-card mb-8">
              {policyTabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Shipping Policy */}
            <TabsContent value="shipping" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-3xl text-primary">
                    <Truck className="w-8 h-8" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-overlay">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Package className="w-6 h-6 text-primary" />
                          <h3 className="text-xl font-semibold text-primary">Standard Shipping</h3>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Free on orders over $75</li>
                          <li>• 5-7 business days delivery</li>
                          <li>• Tracking included</li>
                          <li>• $8.99 for orders under $75</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="glass-overlay">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Clock className="w-6 h-6 text-primary" />
                          <h3 className="text-xl font-semibold text-primary">Express Shipping</h3>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• 2-3 business days delivery</li>
                          <li>• $19.99 flat rate</li>
                          <li>• Priority handling</li>
                          <li>• Signature required</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-primary mb-4">International Shipping</h3>
                    <div className="glass-overlay p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Available Countries</h4>
                          <p className="text-muted-foreground mb-4">
                            We ship to over 50 countries worldwide. Delivery times vary by location.
                          </p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Europe: 7-14 business days</li>
                            <li>• Asia Pacific: 10-21 business days</li>
                            <li>• South America: 14-28 business days</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-2">Important Notes</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Customs duties may apply</li>
                            <li>• Some restrictions on alcohol-based perfumes</li>
                            <li>• Tracking available for all international orders</li>
                            <li>• Insurance included on orders over $100</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Processing Time</h4>
                        <p className="text-muted-foreground">
                          All orders are processed within 1-2 business days. Orders placed after 2 PM EST will be processed the following business day.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Returns Policy */}
            <TabsContent value="returns" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-3xl text-primary">
                    <RotateCcw className="w-8 h-8" />
                    Returns & Exchanges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="glass-overlay p-6">
                    <h3 className="text-2xl font-semibold text-primary mb-4">30-Day Return Policy</h3>
                    <p className="text-muted-foreground mb-6">
                      We want you to love your Zoshe fragrance. If you're not completely satisfied, you can return or exchange your purchase within 30 days of delivery.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-primary mb-3">Returnable Items</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>✓ Unopened perfumes in original packaging</li>
                          <li>✓ Damaged or defective items</li>
                          <li>✓ Wrong item received</li>
                          <li>✓ Gift sets and hampers (if unopened)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-3">Non-Returnable Items</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>✗ Opened perfume bottles</li>
                          <li>✗ Custom or personalized items</li>
                          <li>✗ Items returned after 30 days</li>
                          <li>✗ Sample vials and discovery sets</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-primary mb-4">Return Process</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { step: "1", title: "Contact Us", desc: "Email us at returns@zoshe.com with your order number" },
                        { step: "2", title: "Get Return Label", desc: "We'll send you a prepaid return shipping label" },
                        { step: "3", title: "Ship & Refund", desc: "Send the item back and receive your refund in 3-5 days" }
                      ].map((item, index) => (
                        <Card key={index} className="glass-overlay text-center">
                          <CardContent className="p-4">
                            <div className="text-2xl font-bold text-primary mb-2">{item.step}</div>
                            <h4 className="font-semibold text-primary mb-2">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                    <h4 className="font-semibold text-primary mb-2">Satisfaction Guarantee</h4>
                    <p className="text-muted-foreground">
                      If you receive a damaged or defective product, we'll provide a full refund or replacement at no cost to you. Your satisfaction is our priority.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Policy */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-3xl text-primary">
                    <Shield className="w-8 h-8" />
                    Privacy Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="glass-overlay p-6">
                    <h3 className="text-2xl font-semibold text-primary mb-4">Information We Collect</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-primary">Personal Information</h4>
                        </div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Name and contact details</li>
                          <li>• Billing and shipping addresses</li>
                          <li>• Payment information</li>
                          <li>• Order history and preferences</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <Eye className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-primary">Usage Information</h4>
                        </div>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Website browsing patterns</li>
                          <li>• Device and browser information</li>
                          <li>• IP address and location data</li>
                          <li>• Marketing interaction data</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="glass-overlay p-6">
                    <h3 className="text-2xl font-semibold text-primary mb-4">How We Use Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• Process and fulfill your orders</li>
                        <li>• Provide customer support</li>
                        <li>• Send order updates and confirmations</li>
                        <li>• Improve our products and services</li>
                      </ul>
                      <ul className="space-y-3 text-muted-foreground">
                        <li>• Personalize your shopping experience</li>
                        <li>• Send marketing communications (with consent)</li>
                        <li>• Prevent fraud and ensure security</li>
                        <li>• Comply with legal obligations</li>
                      </ul>
                    </div>
                  </div>

                  <div className="glass-overlay p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-semibold text-primary">Data Security</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      We use industry-standard security measures to protect your personal information, including SSL encryption, secure servers, and regular security audits.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• All payment data is encrypted and processed securely</li>
                      <li>• We never store complete credit card information</li>
                      <li>• Access to personal data is strictly limited</li>
                      <li>• Regular security updates and monitoring</li>
                    </ul>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                    <h4 className="font-semibold text-primary mb-2">Your Rights</h4>
                    <p className="text-muted-foreground">
                      You have the right to access, update, or delete your personal information. You can also opt out of marketing communications at any time. Contact us at privacy@zoshe.com for any privacy-related requests.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Terms of Service */}
            <TabsContent value="terms" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-3xl text-primary">
                    <FileText className="w-8 h-8" />
                    Terms of Service
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="glass-overlay p-6">
                    <h3 className="text-2xl font-semibold text-primary mb-4">Use of Our Website</h3>
                    <p className="text-muted-foreground mb-4">
                      By accessing and using the Zoshe website, you agree to comply with these terms and conditions. These terms apply to all users of the site.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• You must be at least 18 years old to make purchases</li>
                      <li>• Provide accurate and complete information when ordering</li>
                      <li>• Use the website only for lawful purposes</li>
                      <li>• Respect intellectual property rights</li>
                    </ul>
                  </div>

                  <div className="glass-overlay p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCard className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-semibold text-primary">Orders and Payment</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Order Terms</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• All orders subject to acceptance</li>
                          <li>• Prices subject to change without notice</li>
                          <li>• We reserve the right to cancel orders</li>
                          <li>• Quantity limits may apply</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Payment Terms</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Payment due at time of order</li>
                          <li>• We accept major credit cards</li>
                          <li>• All prices include applicable taxes</li>
                          <li>• Refunds processed within 5-7 business days</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="glass-overlay p-6">
                    <h3 className="text-2xl font-semibold text-primary mb-4">Intellectual Property</h3>
                    <p className="text-muted-foreground mb-4">
                      All content on this website, including text, images, logos, and product names, is protected by copyright and trademark laws.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Content may not be reproduced without permission</li>
                      <li>• Zoshe and our logo are registered trademarks</li>
                      <li>• Product images are for illustration purposes</li>
                      <li>• User-generated content may be used for marketing</li>
                    </ul>
                  </div>

                  <div className="glass-overlay p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-semibold text-primary">Limitation of Liability</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Zoshe shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or website. Our liability is limited to the purchase price of the product.
                    </p>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                    <h4 className="font-semibold text-primary mb-2">Contact Information</h4>
                    <p className="text-muted-foreground">
                      If you have any questions about these terms, please contact us at legal@zoshe.com or call us at +1 (555) 123-4567.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions About Our <span className="text-accent">Policies?</span>
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Our customer service team is here to help you understand our policies and assist with any concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="luxury-button text-lg px-8 py-4">
              Contact Support
            </button>
            <button className="glass-card text-cream border-cream/30 hover:bg-cream/10 text-lg px-8 py-4 rounded-full font-medium transition-all duration-300">
              Live Chat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Policies;