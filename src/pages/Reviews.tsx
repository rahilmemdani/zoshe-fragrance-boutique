import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote, ThumbsUp, Verified, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const Reviews = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedRating, setSelectedRating] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      avatar: "SM",
      rating: 5,
      verified: true,
      date: "2 weeks ago",
      product: "Ethereal Rose",
      review: "Absolutely divine! The scent is sophisticated and long-lasting. I've received countless compliments and it's become my signature fragrance. The packaging is also incredibly luxurious.",
      helpful: 23,
      image: "🌹"
    },
    {
      id: 2,
      name: "James Wilson",
      avatar: "JW",
      rating: 5,
      verified: true,
      date: "1 month ago",
      product: "Midnight Oud",
      review: "This fragrance is a masterpiece. The complexity of the oud blend is remarkable - it evolves beautifully throughout the day. Perfect for evening events and special occasions.",
      helpful: 31,
      image: "🌙"
    },
    {
      id: 3,
      name: "Emma Thompson",
      avatar: "ET",
      rating: 4,
      verified: true,
      date: "3 weeks ago",
      product: "Ocean Breeze",
      review: "Fresh and invigorating! Perfect for summer days. The aquatic notes are balanced beautifully with the floral heart. Great longevity and projection.",
      helpful: 18,
      image: "🌊"
    }
  ];

  const allReviews = [
    {
      id: 1,
      name: "Alexandra Chen",
      avatar: "AC",
      rating: 5,
      verified: true,
      date: "1 week ago",
      product: "Golden Amber",
      review: "Luxurious and warm. The amber notes are rich without being overwhelming. Perfect for fall and winter.",
      helpful: 15
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      avatar: "MR",
      rating: 5,
      verified: true,
      date: "2 weeks ago",
      product: "Lavender Dreams",
      review: "Calming and sophisticated. The lavender is not too floral - perfect balance with the woody base notes.",
      helpful: 12
    },
    {
      id: 3,
      name: "Sophie Martin",
      avatar: "SM",
      rating: 4,
      verified: true,
      date: "1 month ago",
      product: "Citrus Noir",
      review: "Unique and bold. The dark citrus concept is executed brilliantly. Great for those who want something different.",
      helpful: 20
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "DK",
      rating: 5,
      verified: true,
      date: "3 weeks ago",
      product: "Ethereal Rose",
      review: "Bought this for my wife and she absolutely loves it. The rose is elegant and not overpowering.",
      helpful: 8
    },
    {
      id: 5,
      name: "Lisa Anderson",
      avatar: "LA",
      rating: 4,
      verified: true,
      date: "2 months ago",
      product: "Ocean Breeze",
      review: "Fresh and clean. Great for everyday wear. The longevity could be slightly better but overall excellent.",
      helpful: 14
    },
    {
      id: 6,
      name: "Robert Taylor",
      avatar: "RT",
      rating: 5,
      verified: true,
      date: "1 month ago",
      product: "Midnight Oud",
      review: "Exceptional quality. The oud is authentic and well-balanced. Worth every penny.",
      helpful: 27
    }
  ];

  const ratingFilters = [
    { id: 'all', name: 'All Reviews', count: allReviews.length },
    { id: '5', name: '5 Stars', count: allReviews.filter(r => r.rating === 5).length },
    { id: '4', name: '4 Stars', count: allReviews.filter(r => r.rating === 4).length }
  ];

  const filteredReviews = selectedRating === 'all' 
    ? allReviews 
    : allReviews.filter(review => review.rating === parseInt(selectedRating));

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const averageRating = 4.8;
  const totalReviews = 127;

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-cream particle-bg">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Customer <span className="text-accent">Reviews</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Discover what our customers say about their Zoshe experience
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-accent fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold">{averageRating}</span>
              <span className="text-lg opacity-75">({totalReviews} reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials Carousel */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Featured Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from our valued customers about their favorite fragrances
            </p>
          </div>

          <div className="relative">
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <Quote className="w-12 h-12 text-accent opacity-60" />
                    <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground font-medium">
                      "{testimonials[currentTestimonial].review}"
                    </blockquote>
                    
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {testimonials[currentTestimonial].avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg text-primary">
                            {testimonials[currentTestimonial].name}
                          </h4>
                          {testimonials[currentTestimonial].verified && (
                            <Verified className="w-5 h-5 text-accent" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-accent fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {testimonials[currentTestimonial].date}
                          </span>
                        </div>
                        <Badge variant="outline" className="mt-2">
                          {testimonials[currentTestimonial].product}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-9xl opacity-20 perfume-float">
                      {testimonials[currentTestimonial].image}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="glass-card w-12 h-12"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="glass-card w-12 h-12"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Reviews Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-0">
              All Reviews
            </h2>
            
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex gap-2">
                {ratingFilters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedRating === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRating(filter.id)}
                    className={selectedRating === filter.id ? "luxury-button" : "glass-card"}
                  >
                    {filter.name} ({filter.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((review, index) => (
              <Card 
                key={review.id} 
                className="glass-card hover:scale-105 transition-all duration-300 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {review.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-primary">{review.name}</h4>
                          {review.verified && (
                            <Verified className="w-4 h-4 text-accent" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-accent fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Badge variant="outline" className="mb-3">
                    {review.product}
                  </Badge>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {review.review}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-20 hero-gradient text-cream">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Share Your <span className="text-accent">Experience</span>
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Help others discover their perfect fragrance by sharing your Zoshe story
          </p>
          <Button className="luxury-button text-lg px-8 py-4">
            Write a Review
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Reviews;