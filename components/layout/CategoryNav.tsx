'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Category {
  name: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  { 
    name: "New & Exciting", 
    image: "https://placehold.co/80x80/8B5CF6/white?text=NEW&fontsize=12", 
    href: "/category/new-exciting" 
  },
  { 
    name: "Wow! Deals", 
    image: "https://placehold.co/80x80/8B5CF6/white?text=WOW!&fontsize=12", 
    href: "/category/deals" 
  },
  { 
    name: "Beverages", 
    image: "https://placehold.co/80x80/DC2626/white?text=Coca-Cola&fontsize=10", 
    href: "/category/beverages" 
  },
  { 
    name: "Candy & Snacks", 
    image: "https://placehold.co/80x80/F59E0B/white?text=Cheetos&fontsize=10", 
    href: "/category/snacks" 
  },
  { 
    name: "Cleaning & Laundry", 
    image: "https://placehold.co/80x80/F97316/white?text=Tide&fontsize=12", 
    href: "/category/cleaning" 
  },
  { 
    name: "Grocery", 
    image: "https://placehold.co/80x80/059669/white?text=Tortillas&fontsize=10", 
    href: "/category/grocery" 
  },
  { 
    name: "Health & Beauty", 
    image: "https://placehold.co/80x80/000000/white?text=AXE&fontsize=14", 
    href: "/category/health-beauty" 
  },
  { 
    name: "Tobacco", 
    image: "https://placehold.co/80x80/DC2626/white?text=Marlboro&fontsize=10", 
    href: "/category/tobacco" 
  },
  { 
    name: "Household & Kitchen", 
    image: "https://placehold.co/80x80/6B7280/white?text=Virtue&fontsize=12", 
    href: "/category/household" 
  },
  { 
    name: "Mexican Items", 
    image: "https://placehold.co/80x80/DC2626/white?text=Coca-Cola&fontsize=10", 
    href: "/category/mexican" 
  },
  { 
    name: "Ice Cream & Frozen", 
    image: "https://placehold.co/80x80/92400E/white?text=Häagen-Dazs&fontsize=8", 
    href: "/category/frozen" 
  },
];

export default function CategoryNav(): React.JSX.Element {
  return (
    <nav className="border-b bg-gray-50   z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide scroll-smooth">
          {categories.map((category: Category) => (
            <Link key={category.name} href={category.href} className="flex-shrink-0 group">
              <div className="flex flex-col items-center gap-2">
                {/* Circular Image Container */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
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
