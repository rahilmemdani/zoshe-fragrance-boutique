import { useEffect, useState } from "react";
import { createClient } from '@sanity/client';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Star } from "lucide-react";

const Customization = () => {
  const [services, setServices] = useState<any[]>([]);

  const client = createClient({
    projectId: 'xclbx4yr',
    dataset: 'production',
    apiVersion: '2025-08-26',
    useCdn: false,
    token: 'sk8v5swnwPbVyEaXFvXtOFEClS9BA6uQCefWh7kdnKLOS8dcGgz47SzknlsuNeMotAbBZQDU8FBBNDP73CAMVo1dtwHA0gNSL1Fcx6KJ2tJKlmKcEcozaBQPl6IYLRw4rH5nsUgtt7wIVOXTi7LsXHsSOkIjR6aNJwCUX0Zo5lCXwhK72FQn'
  });

  const WHATSAPP_NUMBER = "917977233704";

  const openWhatsApp = (title: string) => {
    const message = `Hi! I'm interested in the service: ${title}. Could you share more details?`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    client.fetch(`
      *[_type == "customization"] | order(_createdAt desc) {
        _id,
        title,
        subtitle,
        description,
        features,
        price,
        popular,
        exclusive,
        "imageUrl": image.asset->url
      }
    `).then(setServices);
  }, []);

  return (
    <div className="pt-8">
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Premium Services
          </h2>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service) => (
              <Card
                key={service._id}
                className="glass-card overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-64 object-cover md:h-80"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {service.popular && (
                      <Badge className="bg-accent text-accent-foreground flex items-center gap-1">
                        <Star className="w-3 h-3" /> Popular
                      </Badge>
                    )}
                    {service.exclusive && (
                      <Badge className="bg-primary text-primary-foreground">Exclusive</Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-2xl font-bold text-primary">
                      {service.title}
                    </CardTitle>
                  </div>

                  <p className="text-muted-foreground mb-4">{service.description}</p>

                  {service.features && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {service.features.map((f: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Price + Button */}
                  <div className="mt-auto space-y-4">
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                      ₹{service.price}
                    </span>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 w-full rounded-xl"
                      onClick={() => openWhatsApp(service.title)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Enquire on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customization;
