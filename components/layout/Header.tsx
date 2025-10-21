'use client';

import { lazy, Suspense } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, Phone, List, Lightbulb, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/store/hooks';
import { Badge } from '@/components/ui/badge';
import CategoriesDropdown from './CategoriesDropdown';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '@/lib/hooks/useTranslation';

const CartSheet = lazy(() => import('@/components/features/cart/CartSheet'));
const UserMenu = lazy(() => import('@/components/features/auth/UserMenu'));

export default function Header(): React.JSX.Element {
  const cartItems = useAppSelector((state) => state.cart.totalItems);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">{t('freeDelivery')}</span>
            </div>
            <span className="font-medium">{t('welcome')}</span>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-medium">{t('callText')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Categories */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                W
              </div>
              <span className="hidden text-xl font-bold text-primary md:inline">
                {t('wholesaleMarket')}
              </span>
            </Link>
            
            <CategoriesDropdown />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('searchPlaceholder')}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/orders">
                <Button variant="outline" size="sm" className="gap-2 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100">
                  <List className="h-4 w-4" />
                  {t('myOrders')}
                </Button>
              </Link>
              <Link href="/products/top-selling">
                <Button variant="outline" size="sm" className="gap-2 bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100">
                  <Lightbulb className="h-4 w-4" />
                  {t('topItems')}
                </Button>
              </Link>
              <Link href="/products/recent">
                <Button variant="outline" size="sm" className="gap-2 bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100">
                  <RotateCcw className="h-4 w-4" />
                  {t('buyAgain')}
                </Button>
              </Link>
            </div>

            <Suspense fallback={<Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>}>
              {isAuthenticated ? <UserMenu /> : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </Suspense>

            <Suspense fallback={
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            }>
              <CartSheet>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                    >
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </CartSheet>
            </Suspense>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="container mx-auto px-4 pb-4 md:hidden">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('searchPlaceholder')}
            className="pl-10 pr-4"
          />
        </div>
      </div>
    </header>
  );
}
