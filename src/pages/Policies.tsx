import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Truck,
  RotateCcw,
  Shield,
  FileText,
  ChevronDown,
  Clock,
  CheckCircle,
  Users,
  Star,
  Award,
  Sparkles
} from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../lib/sanityClient";
import { Helmet } from "react-helmet";

const icons: Record<string, any> = {
  shipping: Truck,
  returns: RotateCcw,
  privacy: Shield,
  terms: FileText,
};

const options = { day: "2-digit", month: "short", year: "numeric" };

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  return builder.image(source);
}

const Policies = () => {
  const [policies, setPolicies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("terms");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "policy"] | order(order asc){
            category,
            title,
            sections[]{
              heading,
              content
            },
            lastUpdated
          }
        `);
        setPolicies(data);
        if (data.length > 0) {
          setActiveTab(data[0].category);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Enhanced PortableText components
  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => <p className="mb-4 leading-relaxed text-foreground/80">{children}</p>,
      h1: ({ children }: any) => <h1 className="text-3xl font-bold mb-4 text-primary">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-semibold mb-3 text-primary">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-medium mb-2 text-primary">{children}</h3>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-4 ml-4">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="text-foreground/80 leading-relaxed">{children}</li>,
      number: ({ children }: any) => <li className="text-foreground/80 leading-relaxed">{children}</li>,
    }
  };

  return (
    <>
      <Helmet>
        <title>Zoshe - Policies</title>
        <meta name="description" content="Read Zoshe's transparent and customer-focused policies. Learn about shipping, returns, privacy, and terms." />
        <meta name="robots" content="index, follow" />
      </Helmet>
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
              Our <span className="bg-gradient-to-r from-accent via-primary to-accent text-transparent bg-clip-text">Policies</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl md:text-2xl opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Everything you need to know about shopping with Zoshe. Transparent, fair, and customer-focused policies.
            </motion.p>

            {/* Enhanced Stats */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
              }}
              className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-12"
            >
              {[
                { icon: <Shield className="w-6 h-6" />, value: "100%", label: "Secure Shopping" },
                { icon: <Truck className="w-6 h-6" />, value: "Free", label: "Shipping Available" },
                { icon: <RotateCcw className="w-6 h-6" />, value: "Easy", label: "Returns Policy" },
                // { icon: <Award className="w-6 h-6" />, value: "24/7", label: "Customer Support" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                  className="flex flex-col items-center min-w-[90px] sm:min-w-[120px] group"
                >
                  <div className="flex justify-center mb-2 text-accent group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-cream/80 text-xs sm:text-sm text-center">{stat.label}</div>
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

        {/* Enhanced Policies Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-60 h-60 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Transparent <span className="text-accent">Policies</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We believe in complete transparency. Read through our comprehensive policies to understand how we protect and serve you.
              </p>
            </motion.div>

            {isLoading ? (
              /* Loading State */
              <div className="space-y-8">
                <div className="glass-card p-4 animate-pulse">
                  <div className="flex space-x-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-12 bg-muted rounded-lg flex-1"></div>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-8 animate-pulse">
                  <div className="h-8 bg-muted rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ) : (
              /* Enhanced Tabs */
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* Enhanced Tab Navigation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="glass-card p-2 mb-8 rounded-2xl backdrop-blur-xl border border-border/20"
                >
                  <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full h-auto bg-transparent p-0">
                    {policies.map((policy, index) => {
                      const Icon = icons[policy.category];
                      return (
                        <TabsTrigger
                          key={policy.category}
                          value={policy.category}
                          className="flex flex-col sm:flex-row items-center justify-center gap-2 rounded-xl p-4 h-auto data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105 group border border-transparent data-[state=active]:border-white/20"
                        >
                          {Icon && (
                            <Icon className="w-5 h-5 group-data-[state=active]:scale-110 transition-transform" />
                          )}
                          <span className="font-medium text-sm sm:text-base">{policy.title}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </motion.div>

                {/* Enhanced Tab Content */}
                {policies.map((policy, policyIndex) => {
                  const Icon = icons[policy.category];
                  return (
                    <TabsContent key={policy.category} value={policy.category} className="mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        <Card className="glass-card shadow-2xl rounded-2xl border border-border/20 backdrop-blur-xl overflow-hidden">
                          <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5 border-b border-border/40 pb-6">
                            <CardTitle className="flex items-center gap-4 text-3xl md:text-4xl text-primary">
                              {Icon && (
                                <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                                  <Icon className="w-8 h-8" />
                                </div>
                              )}
                              <div>
                                <div className="text-3xl md:text-4xl font-bold">{policy.title}</div>
                                <div className="text-sm text-muted-foreground font-normal mt-1">
                                  Last updated: {policy?.lastUpdated !== null
                                    ? new Date(policy.lastUpdated)
                                      .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                                      .replace(/ /g, "-")
                                    : ""}

                                </div>
                              </div>
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="p-8">
                            {policy.sections && policy.sections.length > 0 ? (
                              <div className="space-y-8">
                                {policy.sections.map((section: any, sectionIndex: number) => (
                                  <motion.div
                                    key={sectionIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                                    className="glass-card p-6 rounded-xl backdrop-blur-sm border border-border/10 hover:shadow-lg transition-all duration-300 group"
                                  >
                                    <div className="flex items-start gap-4">
                                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <div className="w-2 h-2 bg-gradient-to-br from-primary to-accent rounded-full"></div>
                                      </div>
                                      <div className="flex-1">
                                        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                                          {section.heading}
                                        </h3>
                                        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                                          <PortableText
                                            value={section.content}
                                            components={portableTextComponents}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-12">
                                <div className="text-6xl mb-4 opacity-50">📄</div>
                                <h3 className="text-xl font-semibold text-primary mb-2">Content Coming Soon</h3>
                                <p className="text-muted-foreground">
                                  We're working on updating this policy. Please check back soon.
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            )}

            {/* Enhanced Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <Card className="glass-card border border-border/20 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full">
                      <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    Questions About Our Policies?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                    Our customer service team is here to help clarify any questions you might have about our policies.
                    We're committed to transparency and excellent service.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href="https://wa.me/917977233704?text=Hi! I have questions about your policies."
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      <div className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-300 hover:shadow-xl">
                        💬 Ask on WhatsApp
                      </div>
                    </motion.a>
                    <motion.a
                      href="mailto:zosheperfume@gmail.com?subject=Policy Questions"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block"
                    >
                      <div className="border border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-full font-medium transition-all duration-300">
                        ✉️ Send Email
                      </div>
                    </motion.a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Policies;
