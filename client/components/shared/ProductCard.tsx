'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/store/hooks';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { Product } from '@/lib/store/slices/productsSlice';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      pricePerCase: product.pricePerCase,
      quantity: 1,
      image: product.image,
      unit: product.unit,
      packSize: product.packSize,
    }));
    toast.success(t('addToCart'));
  };

  return (
    <Link href={`/product/${product._id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
        <CardContent className="p-4">
          {/* Image Container */}
          <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized={product.image.includes('placehold.co')}
            />
            {product.isOnOffer && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                {t('deals')}
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary">{t('outOfStock')}</Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>
            
            <p className="text-xs text-muted-foreground">
              {product.packSize}
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-2">
              <span className="text-primary font-semibold">
                ${product.price.toFixed(2)}/{product.unit}
              </span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              ${product.pricePerCase.toFixed(2)}/case
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full mt-3 bg-primary hover:bg-primary/90"
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t('addToCart')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
