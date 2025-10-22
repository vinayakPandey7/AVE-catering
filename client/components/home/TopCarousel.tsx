'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Truck, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

interface TopCarouselItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  discount?: string;
  ctaText: string;
  ctaLink: string;
  features?: string[];
}

const topCarouselItems: TopCarouselItem[] = [
  {
    id: 1,
    title: 'Mega Sale',
    subtitle: 'Up to 70% OFF',
    image: 'https://placehold.co/1200x400/1C75BC/white?text=MEGA+SALE&fontsize=48',
    badge: 'Limited Time',
    discount: '70%',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    features: ['Free Delivery', 'Cash on Delivery', 'Easy Returns']
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh Stock Daily',
    image: 'https://placehold.co/1200x400/FF6B35/white?text=NEW+ARRIVALS&fontsize=48',
    badge: 'Just In',
    discount: '30%',
    ctaText: 'Explore',
    ctaLink: '/category/new-exciting',
    features: ['Same Day Delivery', 'Quality Guaranteed', 'Bulk Discounts']
  },
  {
    id: 3,
    title: 'Wholesale Deals',
    subtitle: 'Best Prices Guaranteed',
    image: 'https://placehold.co/1200x400/059669/white?text=WHOLESALE+DEALS&fontsize=48',
    badge: 'Exclusive',
    discount: '50%',
    ctaText: 'View Deals',
    ctaLink: '/category/deals',
    features: ['Volume Discounts', 'Priority Support', 'Fast Shipping']
  },
  {
    id: 4,
    title: 'Business Essentials',
    subtitle: 'Everything You Need',
    image: 'https://placehold.co/1200x400/8B5CF6/white?text=BUSINESS+ESSENTIALS&fontsize=48',
    badge: 'Popular',
    discount: '40%',
    ctaText: 'Browse',
    ctaLink: '/products',
    features: ['Bulk Orders', 'Custom Pricing', 'Dedicated Support']
  }
];

export default function TopCarousel(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % topCarouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = (): void => {
    setCurrentIndex((prev: number) => (prev - 1 + topCarouselItems.length) % topCarouselItems.length);
  };

  const goToNext = (): void => {
    setCurrentIndex((prev: number) => (prev + 1) % topCarouselItems.length);
  };

  const currentItem: TopCarouselItem = topCarouselItems[currentIndex];

  return (
    <section className="relative bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          {/* Main Carousel */}
          <div className="relative h-64 md:h-80 lg:h-96">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {topCarouselItems.map((item: TopCarouselItem) => (
                <div key={item.id} className="w-full flex-shrink-0 relative">
                  <div 
                    className="w-full h-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="container mx-auto px-8">
                        <div className="max-w-2xl">
                          {/* Badge */}
                          <div className="inline-block mb-4">
                            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                              {item.badge}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                            {item.title}
                          </h2>
                          
                          {/* Subtitle */}
                          <p className="text-xl md:text-2xl text-white/90 mb-6">
                            {item.subtitle}
                          </p>
                          
                          {/* Features */}
                          {item.features && (
                            <div className="flex flex-wrap gap-4 mb-6">
                              {item.features.map((feature: string, index: number) => (
                                <div key={index} className="flex items-center gap-2 text-white/80">
                                  <Star className="h-4 w-4 fill-current" />
                                  <span className="text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* CTA Button */}
                          <Link href={item.ctaLink}>
                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                              {item.ctaText}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {topCarouselItems.map((_, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
