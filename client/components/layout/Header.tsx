'use client';

import { lazy, Suspense, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, Phone, List, Lightbulb, RotateCcw, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/store/hooks';
import { Badge } from '@/components/ui/badge';
import CategoriesDropdown from './CategoriesDropdown';
import LanguageSelector from './LanguageSelector';
import MobileHeader from './MobileHeader';
import { useTranslation } from '@/lib/hooks/useTranslation';

const CartSheet = lazy(() => import('@/components/features/cart/CartSheet'));
const UserMenu = lazy(() => import('@/components/features/auth/UserMenu'));

export default function Header(): React.JSX.Element {
  const cartItems = useAppSelector((state) => state.cart.totalItems);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Desktop Header */}
      <header className="hidden lg:block sticky top-0 z-50 w-full border-b bg-white shadow-lg backdrop-blur-sm">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {t('freeDelivery')}
                </span>
              </div>
              <span className="font-medium hidden md:inline">{t('welcome')}</span>
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
          <div className="flex items-center gap-4 lg:gap-6">
            <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
              <div className="flex h-12 w-12 lg:h-12 lg:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 text-white font-bold text-xl lg:text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                A
              </div>
              <span className="hidden text-xl lg:text-2xl font-bold text-primary sm:inline group-hover:text-primary/80 transition-colors">
                AVE Catering
              </span>
            </Link>
            
            <div className="hidden lg:block">
              <CategoriesDropdown />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder={t('searchPlaceholder')}
                className="pl-12 pr-4 h-12 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/orders">
                <Button variant="outline" size="sm" className="group gap-3 px-4 py-2.5 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 border-2 border-purple-200 text-purple-800 hover:from-purple-100 hover:via-purple-200 hover:to-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 hover:-translate-y-0.5 transition-all duration-300 rounded-xl font-medium">
                  <List className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  {t('myOrders')}
                </Button>
              </Link>
              <Link href="/products/top-selling">
                <Button variant="outline" size="sm" className="group gap-3 px-4 py-2.5 bg-gradient-to-r from-amber-50 via-yellow-100 to-amber-50 border-2 border-amber-200 text-amber-800 hover:from-amber-100 hover:via-yellow-200 hover:to-amber-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-200/50 hover:-translate-y-0.5 transition-all duration-300 rounded-xl font-medium">
                  <Lightbulb className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  {t('topItems')}
                </Button>
              </Link>
              <Link href="/products/recent">
                <Button variant="outline" size="sm" className="group gap-3 px-4 py-2.5 bg-gradient-to-r from-rose-50 via-pink-100 to-rose-50 border-2 border-rose-200 text-rose-800 hover:from-rose-100 hover:via-pink-200 hover:to-rose-100 hover:border-rose-300 hover:shadow-lg hover:shadow-rose-200/50 hover:-translate-y-0.5 transition-all duration-300 rounded-xl font-medium">
                  <RotateCcw className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  {t('buyAgain')}
                </Button>
              </Link>
            </div>

            <Suspense fallback={
              <Button variant="ghost" size="icon" className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/10 hover:to-primary/20 border-2 border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5">
                <User className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            }>
              {isAuthenticated ? <UserMenu /> : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="icon" className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/10 hover:to-primary/20 border-2 border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 group">
                    <User className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform duration-300" />
                  </Button>
                </Link>
              )}
            </Suspense>

            <Suspense fallback={
              <Button variant="ghost" size="icon" className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/10 hover:to-primary/20 border-2 border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5">
                <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>
            }>
              <CartSheet>
                <Button variant="ghost" size="icon" className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary/10 hover:to-primary/20 border-2 border-gray-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 group">
                  <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform duration-300" />
                  {cartItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -right-1 -top-1 h-5 w-5 lg:h-7 lg:w-7 rounded-full p-0 text-xs flex items-center justify-center animate-bounce shadow-xl border-2 border-white font-bold"
                    >
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </CartSheet>
            </Suspense>

          </div>
        </div>
      </div>

    </header>
    </>
  );
}
