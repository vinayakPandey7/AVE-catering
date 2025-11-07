'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector } from '@/lib/store/hooks';
import { motion } from 'framer-motion';

export default function CategoryNav(): React.JSX.Element {
  const { categories, isLoading } = useAppSelector((state) => state.categories);

  // Show loading state
  if (isLoading) {
    return (
      <nav className="border-b bg-gradient-to-r from-gray-50 to-gray-100 z-40">
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
    <nav className="border-b bg-gradient-to-r from-white via-gray-50 to-white shadow-sm z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 overflow-x-auto py-4 scrollbar-hide scroll-smooth">
          {categories.slice(0, 8).map((category) => (
            <Link key={category._id} href={`/category/${category.slug}`} className="flex-shrink-0 group">
              <motion.div 
              whileHover={{y: -3, scale: 1.05}}
              transition={{duration: 0.25}}
              className="flex flex-col items-center gap-2">
                {/* Circular Image Container */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/10  shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-shadow duration-200">
                  <Image
                    src={category.image || `https://placehold.co/80x80/8B5CF6/white?text=${encodeURIComponent(category.name)}&fontsize=10`}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized={category.image?.includes('placehold.co') || !category.image}
                  />
                </div>
                {/* Category Label */}
                <span className="text-sm font-semibold text-gray-700 text-center leading-tight group-hover:text-primary transition-colors duration-200 tracking-tight">
                  {category.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
