'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/lib/store/hooks';

export default function CategoryNav(): React.JSX.Element {
  const { categories, isLoading } = useAppSelector((state) => state.categories);

  // Mock categories for when API returns empty data
  const mockCategories = [
    { _id: '1', name: 'Beverages', slug: 'beverages', image: 'https://placehold.co/80x80/DC2626/white?text=Coca-Cola&fontsize=10' },
    { _id: '2', name: 'Snacks', slug: 'snacks', image: 'https://placehold.co/80x80/F59E0B/white?text=Cheetos&fontsize=10' },
    { _id: '3', name: 'Cleaning', slug: 'cleaning', image: 'https://placehold.co/80x80/F97316/white?text=Tide&fontsize=12' },
    { _id: '4', name: 'Grocery', slug: 'grocery', image: 'https://placehold.co/80x80/059669/white?text=Tortillas&fontsize=10' },
    { _id: '5', name: 'Health & Beauty', slug: 'health-beauty', image: 'https://placehold.co/80x80/000000/white?text=AXE&fontsize=14' },
    { _id: '6', name: 'Tobacco', slug: 'tobacco', image: 'https://placehold.co/80x80/DC2626/white?text=Marlboro&fontsize=10' },
    { _id: '7', name: 'Household', slug: 'household', image: 'https://placehold.co/80x80/6B7280/white?text=Virtue&fontsize=12' },
    { _id: '8', name: 'Frozen', slug: 'frozen', image: 'https://placehold.co/80x80/92400E/white?text=Häagen-Dazs&fontsize=8' },
  ];

  // Use real categories if available, otherwise use mock data
  const displayCategories = categories.length > 0 ? categories : mockCategories;

  // Show loading state
  if (isLoading) {
    return (
      <nav className="border-b bg-gray-50 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="border-b bg-gray-50 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide scroll-smooth">
          {displayCategories.slice(0, 8).map((category) => (
            <Link key={category._id} href={`/category/${category.slug}`} className="flex-shrink-0 group">
              <div className="flex flex-col items-center gap-2">
                {/* Circular Image Container */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <Image
                    src={category.image || `https://placehold.co/80x80/8B5CF6/white?text=${encodeURIComponent(category.name)}&fontsize=10`}
                    alt={category.name}
                    fill
                    className="object-cover"
                    unoptimized={category.image?.includes('placehold.co') || !category.image}
                  />
                </div>
                {/* Category Label */}
                <span className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-primary transition-colors duration-200">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
