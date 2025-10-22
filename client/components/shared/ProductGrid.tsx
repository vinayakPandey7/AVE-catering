'use client';

import { lazy, Suspense } from 'react';
import { Product } from '@/lib/store/slices/productsSlice';
import { Skeleton } from '@/components/ui/skeleton';

const ProductCard = lazy(() => import('./ProductCard'));

interface ProductGridProps {
  products: Product[];
  columns?: number;
}

function ProductCardSkeleton(): React.JSX.Element {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-square rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default function ProductGrid({ products, columns = 6 }: ProductGridProps): React.JSX.Element {
  const gridCols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };
  
  const gridClass: string = gridCols[columns] || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {products.map((product: Product) => (
        <Suspense key={product._id} fallback={<ProductCardSkeleton />}>
          <ProductCard product={product} />
        </Suspense>
      ))}
    </div>
  );
}
