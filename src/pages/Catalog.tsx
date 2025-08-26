import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Search, Star, Eye, Sparkles, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ✅ Setup Sanity client
const client = createClient({
  projectId: 'xclbx4yr', 
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
  const [viewMode, setViewMode] = useState('grid');
  const [favoriteItems, setFavoriteItems] = useState(new Set());
  const [quickViewPerfume, setQuickViewPerfume] = useState<Perfume | null>(null);

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

  const toggleFavorite = (perfumeId: string) => {
    const newFavorites = new Set(favoriteItems);
    if (newFavorites.has(perfumeId)) {
      newFavorites.delete(perfumeId);
    } else {
      newFavorites.add(perfumeId);
    }
    setFavoriteItems(newFavorites);
  };

  return (
    <div className="pt-8">
      {/* Enhanced Hero Section */}
      <section className="py-20 hero-gradient text-cream relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cream/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
          <div className="animate-fade-in-up">
            <Badge className="mb-6 bg-cream/20 text-cream px-6 py-3 text-lg backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-2" />
              Premium Fragrance Collection
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Discover Your
              <span className="block text-accent drop-shadow-lg">Signature Scent</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Explore our carefully curated selection of luxury fragrances, each crafted to tell your unique story through the art of scent
            </p>
            
            {/* Stats */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">{perfumes.length}+</div>
                <div className="text-cream/80">Premium Fragrances</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">100%</div>
                <div className="text-cream/80">Authentic Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-cream/80">Expert Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search & Filter Section */}
      <section className="py-12 bg-muted/20 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search your perfect fragrance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 glass-card text-lg border-0 shadow-lg focus:shadow-xl transition-all duration-300"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </Button>
              )}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground font-medium">
                {filteredPerfumes.length} {filteredPerfumes.length === 1 ? 'fragrance' : 'fragrances'} found
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Products Grid */}
      <section className="py-20 bg-background relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {filteredPerfumes.length > 0 ? (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {filteredPerfumes.map((perfume, index) => (
                <Card
                  key={perfume._id}
                  className={`group glass-card hover:scale-105 transition-all duration-500 overflow-hidden border-0 shadow-xl hover:shadow-2xl hover:shadow-primary/10 ${
                    viewMode === 'list' ? 'flex flex-row' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image Section */}
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
                  }`}>
                    {perfume.images?.[0] ? (
                      <img
                        src={urlFor(perfume.images[0].asset).width(600).url()}
                        alt={perfume.name}
                        className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                          viewMode === 'list' ? 'h-48' : 'h-64 sm:h-72'
                        }`}
                      />
                    ) : (
                      <div className={`bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${
                        viewMode === 'list' ? 'h-48' : 'h-64 sm:h-72'
                      }`}>
                        <div className="text-6xl opacity-50">🌸</div>
                      </div>
                    )}
                    
                    {/* Overlay with Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <Button 
                          size="sm" 
                          className="bg-cream/90 text-primary hover:bg-cream shadow-lg backdrop-blur-sm"
                          onClick={() => setQuickViewPerfume(perfume)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Quick View
                        </Button>
                      </div>
                    </div>

                    {/* Favorite Button */}
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        favoriteItems.has(perfume._id)
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-cream/20 text-cream hover:bg-cream/30'
                      }`}
                      onClick={() => toggleFavorite(perfume._id)}
                    >
                      <Heart className={`w-5 h-5 ${
                        favoriteItems.has(perfume._id) ? 'fill-current' : ''
                      }`} />
                    </Button> */}

                    {/* Premium Badge */}
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground shadow-lg backdrop-blur-sm">
                      Premium
                    </Badge>
                  </div>

                  {/* Content Section */}
                  <CardContent className={`p-6 space-y-4 relative ${
                    viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''
                  }`}>
                    {/* Product Info */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                        {perfume.name}
                      </h3>
                      
                      {/* Rating */}
                      {/* <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">(4.8)</span>
                      </div> */}

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {perfume.description
                          ?.map((block) =>
                            block.children.map((child) => child.text).join('')
                          )
                          .join(' ') || 'Exquisite fragrance crafted with premium ingredients for a luxurious scent experience.'}
                      </p>

                      {/* Scent Profile */}
                      <div className="flex flex-wrap gap-2">
                        {['Floral', 'Fresh', 'Woody'].map((note, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-primary/20 text-primary/70">
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="space-y-1">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          ₹{perfume.price?.toLocaleString() || 'N/A'}
                        </span>
                        <div className="text-xs text-muted-foreground">Free shipping</div>
                      </div>
                      <div className="flex gap-2">
                        {/* <Button className="luxury-button shadow-lg hover:shadow-xl transition-all duration-300">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button> */}
                      </div>
                    </div>

                    {/* Exclusive Offer */}
                    <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-3 text-center border border-primary/20">
                      <p className="text-xs font-medium text-primary">
                        ✨ Buy 2 Get 10% Off | Free Gift Wrapping
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Enhanced Empty State */
            <div className="text-center py-24">
              <div className="animate-bounce mb-8">
                <div className="text-8xl mb-4">🔍</div>
              </div>
              <h3 className="text-3xl font-bold text-primary mb-4">
                No fragrances found
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? `We couldn't find any fragrances matching "${searchTerm}". Try a different search term.`
                  : 'Our fragrance collection is currently being updated. Please check back soon!'
                }
              </p>
              {searchTerm && (
                <Button 
                  className="luxury-button"
                  onClick={() => setSearchTerm('')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Clear Search & Browse All
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Stay Updated with New Arrivals
          </h2>
          <p className="text-muted-foreground mb-8">
            Be the first to discover our latest fragrances and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
              className="glass-card flex-1"
            />
            <Button className="luxury-button px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;