'use client';

import { lazy, Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryNav from '@/components/layout/CategoryNav';
import { mockProducts, featuredCategories } from '@/lib/data/mockProducts';
import { Toaster } from 'sonner';

const ProductSection = lazy(() => import('@/components/home/ProductSection'));
const CategoryBanner = lazy(() => import('@/components/home/CategoryBanner'));
const TopCarousel = lazy(() => import('@/components/home/TopCarousel'));
const FlashDealsBanner = lazy(() => import('@/components/home/FlashDealsBanner'));

export default function HomePage(): React.JSX.Element {
  const dealsProducts = mockProducts.filter(p => p.isOnOffer).slice(0, 6);
  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 6);
  const newProducts = mockProducts.slice(0, 6);
  const topSelling = mockProducts.slice(6, 12);

  return (
            <>
              <Header />
              <CategoryNav />
              
              <main className="min-h-screen">
                <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
                  <TopCarousel />
                </Suspense>
                
                <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100" />}>
                  <FlashDealsBanner />
                </Suspense>
                

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
          <ProductSection
            title="Wow! Deals"
            subtitle="Limited time offers on popular products"
            products={dealsProducts}
            viewAllLink="/category/deals"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
          <CategoryBanner categories={featuredCategories} />
        </Suspense>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
          <ProductSection
            title="Featured Products"
            subtitle="Handpicked items for your business"
            products={featuredProducts}
            viewAllLink="/products/featured"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
          <ProductSection
            title="New & Exciting"
            subtitle="Discover our latest arrivals"
            products={newProducts}
            viewAllLink="/category/new-exciting"
          />
        </Suspense>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
          <ProductSection
            title="Top Selling"
            subtitle="Most popular items this month"
            products={topSelling}
            viewAllLink="/products/top-selling"
          />
        </Suspense>
      </main>

      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}
