'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  badge: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Coca Cola Deal',
    image: '/images/products/coca-cola.jpg',
    badge: 'Best Seller',
  },
  {
    id: 2,
    title: 'Snacks Bundle',
    image: '/images/products/chips-bundle.jpg',
    badge: 'Popular',
  },
  {
    id: 3,
    title: 'Cleaning Supplies',
    image: '/images/products/cleaning.jpg',
    badge: 'New Deal',
  },
];

export default function HeroCarousel(): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setCurrentIndex((prev: number) => (prev + 1) % carouselItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Card className="overflow-hidden shadow-2xl">
        <div className="aspect-square relative bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
                {carouselItems[currentIndex].badge}
              </div>
              <h3 className="text-3xl font-bold text-gray-800">
                {carouselItems[currentIndex].title}
              </h3>
              <p className="text-muted-foreground mt-2">
                Up to 50% OFF
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {carouselItems.map((_, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
