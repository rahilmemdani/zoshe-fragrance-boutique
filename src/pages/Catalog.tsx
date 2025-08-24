import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, ShoppingCart, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const perfumes = [
    {
      id: 1,
      name: "Ethereal Rose",
      price: 145,
      category: "floral",
      rating: 4.9,
      reviews: 127,
      description: "A romantic blend of Bulgarian rose petals and warm vanilla.",
      notes: {
        top: ["Rose Petals", "Pink Pepper"],
        heart: ["Bulgarian Rose", "Peony"],
        base: ["Vanilla", "Sandalwood", "White Musk"]
      },
      image: "/placeholder.svg",
      bestseller: true
    },
    {
      id: 2,
      name: "Midnight Oud",
      price: 180,
      category: "oriental",
      rating: 4.8,
      reviews: 89,
      description: "Rich and mysterious oud with bergamot brightness.",
      notes: {
        top: ["Bergamot", "Saffron"],
        heart: ["Agarwood", "Rose"],
        base: ["Amber", "Patchouli", "Vanilla"]
      },
      image: "/placeholder.svg",
      exclusive: true
    },
    {
      id: 3,
      name: "Ocean Breeze",
      price: 120,
      category: "fresh",
      rating: 4.7,
      reviews: 156,
      description: "Fresh aquatic notes with jasmine and cedar warmth.",
      notes: {
        top: ["Sea Salt", "Lemon", "Mint"],
        heart: ["Jasmine", "Lily of the Valley"],
        base: ["Cedar", "Driftwood", "Ambergris"]
      },
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Golden Amber",
      price: 165,
      category: "oriental",
      rating: 4.9,
      reviews: 203,
      description: "Warm amber with spicy notes and rich vanilla base.",
      notes: {
        top: ["Orange Blossom", "Cinnamon"],
        heart: ["Amber", "Honey", "Iris"],
        base: ["Vanilla", "Benzoin", "Tonka Bean"]
      },
      image: "/placeholder.svg",
      bestseller: true
    },
    {
      id: 5,
      name: "Lavender Dreams",
      price: 110,
      category: "aromatic",
      rating: 4.6,
      reviews: 92,
      description: "Calming lavender with herbal complexity and woody finish.",
      notes: {
        top: ["French Lavender", "Bergamot"],
        heart: ["Lavender", "Rosemary", "Sage"],
        base: ["Cedarwood", "Vetiver", "White Musk"]
      },
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Citrus Noir",
      price: 135,
      category: "citrus",
      rating: 4.8,
      reviews: 78,
      description: "Dark citrus with smoky undertones and leather accents.",
      notes: {
        top: ["Black Lemon", "Grapefruit", "Pink Pepper"],
        heart: ["Geranium", "Incense"],
        base: ["Leather", "Vetiver", "Dark Woods"]
      },
      image: "/placeholder.svg",
      exclusive: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Fragrances' },
    { id: 'floral', name: 'Floral' },
    { id: 'oriental', name: 'Oriental' },
    { id: 'fresh', name: 'Fresh' },
    { id: 'aromatic', name: 'Aromatic' },
    { id: 'citrus', name: 'Citrus' }
  ];

  const filteredPerfumes = perfumes.filter(perfume => {
    const matchesSearch = perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         perfume.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || perfume.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="text-accent">Collection</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Discover your signature scent from our carefully curated selection of luxury fragrances
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search fragrances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "luxury-button" : "glass-card"}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPerfumes.map((perfume) => (
              <Card key={perfume.id} className="glass-card hover:scale-105 transition-all duration-300 group overflow-hidden">
                <div className="relative">
                  <div className="aspect-square bg-gradient-primary flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl text-cream opacity-40 group-hover:scale-110 transition-transform">
                      💎
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {perfume.bestseller && (
                        <Badge className="bg-accent text-accent-foreground">Bestseller</Badge>
                      )}
                      {perfume.exclusive && (
                        <Badge className="bg-primary text-primary-foreground">Exclusive</Badge>
                      )}
                    </div>
                    
                    {/* Heart Icon */}
                    <button className="absolute top-4 right-4 p-2 rounded-full bg-cream/20 backdrop-blur-sm hover:bg-cream/30 transition-colors">
                      <Heart className="w-5 h-5 text-cream" />
                    </button>
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{perfume.name}</h3>
                    <p className="text-sm text-muted-foreground">{perfume.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-sm font-medium ml-1">{perfume.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({perfume.reviews} reviews)</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Top:</span> {perfume.notes.top.join(', ')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Heart:</span> {perfume.notes.heart.join(', ')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Base:</span> {perfume.notes.base.join(', ')}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-2xl font-bold text-primary">${perfume.price}</span>
                    <Button className="luxury-button">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPerfumes.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-primary mb-2">No fragrances found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with <span className="text-accent">New Releases</span>
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Be the first to discover our latest fragrances and exclusive collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="glass-card text-cream placeholder:text-cream/60"
            />
            <Button className="luxury-button whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;