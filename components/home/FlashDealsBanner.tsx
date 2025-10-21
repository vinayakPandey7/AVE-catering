'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface DealItem {
  id: string;
  title: string;
  discount: string;
  image: string;
  originalPrice: number;
  salePrice: number;
  timeLeft?: string;
  category: string;
}

const flashDeals: DealItem[] = [
  {
    id: 'deal-1',
    title: 'Coca Cola Mexican',
    discount: '50%',
    image: 'https://placehold.co/200x200/1C75BC/white?text=Coca+Cola',
    originalPrice: 3.00,
    salePrice: 1.50,
    timeLeft: '2h 15m',
    category: 'Beverages'
  },
  {
    id: 'deal-2',
    title: 'Takis Fuego Snacks',
    discount: '40%',
    image: 'https://placehold.co/200x200/E31937/white?text=Takis',
    originalPrice: 2.50,
    salePrice: 1.50,
    timeLeft: '1h 30m',
    category: 'Snacks'
  },
  {
    id: 'deal-3',
    title: 'Tide Laundry Detergent',
    discount: '35%',
    image: 'https://placehold.co/200x200/0066CC/white?text=Tide',
    originalPrice: 8.99,
    salePrice: 5.84,
    timeLeft: '3h 45m',
    category: 'Cleaning'
  },
  {
    id: 'deal-4',
    title: 'Cheetos Crunchy',
    discount: '45%',
    image: 'https://placehold.co/200x200/FF6B35/white?text=Cheetos',
    originalPrice: 2.25,
    salePrice: 1.24,
    timeLeft: '4h 20m',
    category: 'Snacks'
  }
];

export default function FlashDealsBanner(): React.JSX.Element {
  return (
    <section className="py-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-orange-500 fill-current" />
              <h2 className="text-2xl font-bold text-gray-900">Flash Deals</h2>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              Limited Time
            </Badge>
          </div>
          <Link href="/category/deals">
            <Button variant="outline" size="sm" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashDeals.map((deal: DealItem) => (
            <Link key={deal.id} href={`/product/${deal.id}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-300">
                <div className="relative">
                  {/* Image */}
                  <div className="aspect-square relative overflow-hidden bg-white">
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white font-bold">
                        {deal.discount} OFF
                      </Badge>
                    </div>
                    
                    {/* Timer */}
                    {deal.timeLeft && (
                      <div className="absolute top-2 right-2">
                        <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{deal.timeLeft}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{deal.category}</p>
                    
                    {/* Pricing */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${deal.salePrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${deal.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.random() * 40 + 30}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600">Limited stock left!</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
