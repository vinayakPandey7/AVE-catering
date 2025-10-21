'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryNav from '@/components/layout/CategoryNav';
import ProductSection from '@/components/home/ProductSection';
import { Toaster } from 'sonner';
import { Product } from '@/lib/store/slices/productsSlice';

// Mock top-selling products (you can replace this with real data)
const topSellingProducts: Product[] = [
  {
    id: 'top-1',
    name: 'Coca Cola, Mexican',
    category: 'Beverages',
    price: 1.50,
    pricePerCase: 35.99,
    unit: 'ea',
    packSize: '16.9 oz (24 Pack)',
    image: 'https://placehold.co/400x400/1C75BC/white?text=Coca+Cola',
    description: 'Authentic Mexican Coca Cola made with real cane sugar',
    inStock: true,
    isFeatured: true,
    isOnOffer: true,
    brand: 'Coca Cola',
  },
  {
    id: 'top-2',
    name: 'Takis Fuego',
    category: 'Snacks',
    price: 2.50,
    pricePerCase: 29.99,
    unit: 'ea',
    packSize: '9.9 oz (12 Pack)',
    image: 'https://placehold.co/400x400/E31937/white?text=Takis+Fuego',
    description: 'Spicy rolled corn tortilla chips with intense heat',
    inStock: true,
    isFeatured: true,
    isOnOffer: false,
    brand: 'Takis',
  },
  {
    id: 'top-3',
    name: 'Gain Liquid Laundry Detergent',
    category: 'Cleaning & Laundry',
    price: 1.17,
    pricePerCase: 13.99,
    unit: 'ea',
    packSize: '10 oz (12 Pack)',
    image: 'https://placehold.co/400x400/FF8200/white?text=Gain+Detergent',
    description: 'Powerful cleaning with amazing scent',
    inStock: true,
    isFeatured: true,
    isOnOffer: true,
    brand: 'Gain',
  },
  {
    id: 'top-4',
    name: 'Clorox Liquid Disinfectant',
    category: 'Cleaning & Laundry',
    price: 1.29,
    pricePerCase: 35.99,
    unit: 'ea',
    packSize: '11 oz (28 Pack)',
    image: 'https://placehold.co/400x400/059669/white?text=Clorox',
    description: 'Kills 99.9% of bacteria and viruses',
    inStock: true,
    isFeatured: true,
    isOnOffer: false,
    brand: 'Clorox',
  },
  {
    id: 'top-5',
    name: 'Häagen-Dazs Ice Cream',
    category: 'Ice Cream',
    price: 4.99,
    pricePerCase: 59.99,
    unit: 'ea',
    packSize: '14 oz (12 Pack)',
    image: 'https://placehold.co/400x400/92400E/white?text=Häagen-Dazs',
    description: 'Premium ice cream with rich, creamy texture',
    inStock: true,
    isFeatured: true,
    isOnOffer: true,
    brand: 'Häagen-Dazs',
  },
  {
    id: 'top-6',
    name: 'AXE Body Spray',
    category: 'Health & Beauty',
    price: 3.99,
    pricePerCase: 47.99,
    unit: 'ea',
    packSize: '4 oz (12 Pack)',
    image: 'https://placehold.co/400x400/000000/white?text=AXE',
    description: 'Long-lasting fragrance for men',
    inStock: true,
    isFeatured: true,
    isOnOffer: false,
    brand: 'AXE',
  },
];

export default function TopSellingPage(): React.JSX.Element {
  return (
    <>
      <Header />
      <CategoryNav />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Top Selling Items</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular products that customers love. These top-selling items are 
            consistently in high demand and perfect for your business.
          </p>
        </div>

        {/* Top Selling Products Grid */}
        <ProductSection
          title="🔥 Best Sellers"
          subtitle="Our most popular products this month"
          products={topSellingProducts}
          columns={6}
        />

        {/* Additional Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Top Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Beverages</h3>
              <p className="text-blue-600 mb-4">Top-selling drinks and refreshments</p>
              <div className="text-sm text-blue-700">
                <p>• Coca Cola Mexican</p>
                <p>• Fanta Orange</p>
                <p>• Sprite</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-2">Snacks</h3>
              <p className="text-red-600 mb-4">Popular chips and treats</p>
              <div className="text-sm text-red-700">
                <p>• Takis Fuego</p>
                <p>• Cheetos</p>
                <p>• Doritos</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-2">Cleaning</h3>
              <p className="text-green-600 mb-4">Essential cleaning supplies</p>
              <div className="text-sm text-green-700">
                <p>• Gain Detergent</p>
                <p>• Clorox Disinfectant</p>
                <p>• Tide Pods</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-muted-foreground mb-6">
            Our top-selling items are perfect for businesses looking to stock popular products. 
            Contact us for bulk pricing and custom orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:(323) 250-3212" 
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Call (323) 250-3212
            </a>
            <a 
              href="mailto:help@mercaso.com" 
              className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}
