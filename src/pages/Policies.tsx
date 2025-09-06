import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, RotateCcw, Shield, FileText } from "lucide-react";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../lib/sanityClient";

const icons: Record<string, any> = {
  shipping: Truck,
  returns: RotateCcw,
  privacy: Shield,
  terms: FileText,
};

const builder = imageUrlBuilder(sanityClient);
function urlFor(source: any) {
  return builder.image(source);
}

const Policies = () => {
  const [policies, setPolicies] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("shipping");

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
            }
          }
        `);
        setPolicies(data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    }

    fetchData(); 
  }, []);

  return (
    <div className="pt-8">
      {/* Hero */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Policies</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Everything you need to know about shopping with Zoshe
          </p>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Buttons */}
            <div className="glass-card p-2 mb-8">
            <TabsList
                    className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full h-full auto-rows-fr"
                  >
                {policies.map((policy) => {
                  const Icon = icons[policy.category];
                  return (
                    <TabsTrigger
                      key={policy.category}
                      value={policy.category}
                    className="flex items-center justify-center gap-2 rounded-lg p-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground w-full h-full"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                    <span className=" sm:inline">{policy.title}</span>
                    </TabsTrigger>
                  )})}
              </TabsList>
            </div>

            {/* Tab Content */}
            {policies.map((policy) => {
              const Icon = icons[policy.category];
              return (
                <TabsContent key={policy.category} value={policy.category}>
                  <Card className="glass-card shadow-lg">
                    <CardHeader className="border-b border-accent/20 pb-4">
                      <CardTitle className="flex items-center gap-3 text-3xl text-primary">
                        {Icon && <Icon className="w-8 h-8" />}
                        {policy.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-8">
                      {policy.sections?.map((section: any, i: number) => (
                        <div key={i} className="glass-overlay p-6 rounded-lg shadow-inner">
                          <h3 className="text-2xl font-semibold text-primary mb-3">
                            {section.heading}
                          </h3>
                          <div className="text-muted-foreground">
                            <PortableText value={section.content} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Policies;