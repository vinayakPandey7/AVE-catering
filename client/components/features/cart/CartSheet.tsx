'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { removeFromCart, updateQuantity } from '@/lib/store/slices/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface CartSheetProps {
  children: ReactNode;
}

export default function CartSheet({ children }: CartSheetProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { items, totalAmount } = useAppSelector((state) => state.cart);
  const { t } = useTranslation();

  const handleUpdateQuantity = (id: string, newQuantity: number): void => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t('cart')}</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10">
            <p className="text-muted-foreground mb-4">{t('emptyCart')}</p>
            <Link href="/products">
              <Button>{t('startShopping')}</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 py-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized={item.image.includes('placehold.co')}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.packSize}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}/ea</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>{t('total')}</span>
                <span className="text-primary">${totalAmount.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  {t('proceedToCheckout')}
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full" size="lg">
                  {t('continueShopping')}
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
