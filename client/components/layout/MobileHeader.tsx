'use client';

import { lazy, Suspense, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, Phone, List, Lightbulb, RotateCcw, X, ChevronDown, Star, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/store/hooks';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/lib/hooks/useTranslation';

const CartSheet = lazy(() => import('@/components/features/cart/CartSheet'));
const UserMenu = lazy(() => import('@/components/features/auth/UserMenu'));

export default function MobileHeader(): React.JSX.Element {
  const cartItems = useAppSelector((state) => state.cart.totalItems);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <header className="lg:hidden sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Main Mobile Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-semibold text-lg shadow-sm group-hover:shadow-md transition-all duration-200">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                AVE Catering
              </span>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4 text-slate-600" />
            </Button>

            {/* User Button */}
            <Suspense fallback={
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg">
                <User className="h-4 w-4 text-slate-600" />
              </Button>
            }>
              {isAuthenticated ? <UserMenu /> : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-slate-100 transition-colors">
                    <User className="h-4 w-4 text-slate-600" />
                  </Button>
                </Link>
              )}
            </Suspense>

            {/* Cart Button */}
            <Suspense fallback={
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-slate-600" />
              </Button>
            }>
              <CartSheet>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-lg hover:bg-slate-100 transition-colors">
                  <ShoppingCart className="h-4 w-4 text-slate-600" />
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

            {/* Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4 text-slate-600" />
              ) : (
                <Menu className="h-4 w-4 text-slate-600" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="px-6 pb-4 border-t border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              className="pl-10 pr-4 h-11 rounded-lg border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 bg-slate-50"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white">
          <div className="px-6 py-6">
            {/* Categories Section */}
            <div className="mb-8">
              <Button
                variant="ghost"
                className="w-full justify-between p-3 h-auto hover:bg-slate-50 rounded-lg"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              >
                <span className="text-base font-medium text-slate-900">Categories</span>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isCategoriesOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isCategoriesOpen && (
                <div className="mt-4 space-y-1">
                  <Link href="/category/beverages" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">Beverages</span>
                  </Link>
                  <Link href="/category/snacks" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">Candy & Snacks</span>
                  </Link>
                  <Link href="/category/cleaning" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">Cleaning & Laundry</span>
                  </Link>
                  <Link href="/category/health-beauty" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">Health & Beauty</span>
                  </Link>
                  <Link href="/category/grocery" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">Grocery</span>
                  </Link>
                  <Link href="/category/frozen" className="block p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="text-slate-700 font-medium">Frozen Food</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100">
                    <List className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-slate-900 font-medium">{t('myOrders')}</span>
                </Button>
              </Link>
              
              <Link href="/products/top-selling" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100">
                    <Star className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-slate-900 font-medium">{t('topItems')}</span>
                </Button>
              </Link>
              
              <Link href="/products/recent" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100">
                    <RotateCcw className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-slate-900 font-medium">{t('buyAgain')}</span>
                </Button>
              </Link>
            </div>

            {/* Language Selector */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <Button
                variant="ghost"
                className="w-full justify-between p-3 h-auto hover:bg-slate-50 rounded-lg"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-slate-600" />
                  <span className="text-base font-medium text-slate-900">Language</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isLanguageOpen && (
                <div className="mt-3 space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 px-3 py-2 rounded-lg ${selectedLanguage === 'en' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                    onClick={() => {
                      setSelectedLanguage('en');
                      setIsLanguageOpen(false);
                    }}
                  >
                    <div className="w-6 h-4 bg-slate-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-medium">US</span>
                    </div>
                    <span className="text-slate-700 font-medium">English</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 px-3 py-2 rounded-lg ${selectedLanguage === 'es' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                    onClick={() => {
                      setSelectedLanguage('es');
                      setIsLanguageOpen(false);
                    }}
                  >
                    <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-medium">ES</span>
                    </div>
                    <span className="text-slate-700 font-medium">Español</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 px-3 py-2 rounded-lg ${selectedLanguage === 'fr' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                    onClick={() => {
                      setSelectedLanguage('fr');
                      setIsLanguageOpen(false);
                    }}
                  >
                    <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-medium">FR</span>
                    </div>
                    <span className="text-slate-700 font-medium">Français</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
