import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ✅ Setup Sanity client
const client = createClient({
  projectId: 'xclbx4yr', // <-- your Sanity Project ID
  dataset: 'production',
  apiVersion: '2025-08-26',
  useCdn: false, // must be false when using token (bypasses CDN cache)
  token: 'sk8v5swnwPbVyEaXFvXtOFEClS9BA6uQCefWh7kdnKLOS8dcGgz47SzknlsuNeMotAbBZQDU8FBBNDP73CAMVo1dtwHA0gNSL1Fcx6KJ2tJKlmKcEcozaBQPl6IYLRw4rH5nsUgtt7wIVOXTi7LsXHsSOkIjR6aNJwCUX0Zo5lCXwhK72FQn' // 👈 your read-only token
});


const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface Perfume {
  _id: string;
  name: string;
  price: number;
  description: { _type: string; children: { text: string }[] }[];
  images: { asset: any }[];
  slug: { current: string };
}

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const data = await client.fetch(
          `*[_type=="catalogue"]{
            _id,
            name,
            slug,
            price,
            description,
            images[]{asset->{_id,url}}
          }`
        );
        console.log("Fetched perfumes:", data);
        setPerfumes(data);
      } catch (error) {
        console.error('Error fetching catalogue:', error);
      }
    };
    fetchCatalogue();
  }, []);

  const filteredPerfumes = perfumes.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Collection</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Discover your signature scent from our carefully curated selection
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search fragrances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPerfumes.map((perfume) => (
              <Card
                key={perfume._id}
                className="glass-card hover:scale-105 transition-all duration-300 group overflow-hidden"
              >
                <div className="relative">
                  {perfume.images?.[0] && (
                    <img
                      src={urlFor(perfume.images[0].asset).width(600).url()}
                      alt={perfume.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  )}
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-cream/20 backdrop-blur-sm hover:bg-cream/30 transition-colors">
                    <Heart className="w-5 h-5 text-cream" />
                  </button>
                </div>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {perfume.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {perfume.description
                      ?.map((block) =>
                        block.children.map((child) => child.text).join('')
                      )
                      .join(' ')}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-primary">
                      ${perfume.price}
                    </span>
                    <Button className="luxury-button">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredPerfumes.length === 0 && (
              <div className="text-center py-16 col-span-full">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-primary mb-2">
                  No fragrances found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;
