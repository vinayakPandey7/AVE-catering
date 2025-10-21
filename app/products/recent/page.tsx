'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryNav from '@/components/layout/CategoryNav';
import ProductSection from '@/components/home/ProductSection';
import { Toaster } from 'sonner';
import { Product } from '@/lib/store/slices/productsSlice';

// Mock recent/recently purchased products (you can replace this with real user data)
const recentProducts: Product[] = [
  {
    id: 'recent-1',
    name: 'Fanta, Orange, Mexican',
    category: 'Beverages',
    price: 1.50,
    pricePerCase: 35.99,
    unit: 'ea',
    packSize: '16.9 oz (24 Pack)',
    image: 'https://placehold.co/400x400/FF6B35/white?text=Fanta+Orange',
    description: 'Refreshing orange soda with natural flavors',
    inStock: true,
    isFeatured: false,
    isOnOffer: true,
    brand: 'Fanta',
  },
  {
    id: 'recent-2',
    name: 'Cheetos Crunchy',
    category: 'Snacks',
    price: 2.25,
    pricePerCase: 26.99,
    unit: 'ea',
    packSize: '8.5 oz (12 Pack)',
    image: 'https://placehold.co/400x400/F59E0B/white?text=Cheetos',
    description: 'Classic crunchy cheese-flavored snacks',
    inStock: true,
    isFeatured: false,
    isOnOffer: false,
    brand: 'Cheetos',
  },
  {
    id: 'recent-3',
    name: 'Tide Pods',
    category: 'Cleaning & Laundry',
    price: 0.58,
    pricePerCase: 27.99,
    unit: 'ea',
    packSize: '14 oz (48 Pack)',
    image: 'https://placehold.co/400x400/059669/white?text=Tide+Pods',
    description: 'Convenient laundry detergent pods',
    inStock: true,
    isFeatured: false,
    isOnOffer: true,
    brand: 'Tide',
  },
  {
    id: 'recent-4',
    name: 'Doritos Nacho Cheese',
    category: 'Snacks',
    price: 2.75,
    pricePerCase: 32.99,
    unit: 'ea',
    packSize: '9.75 oz (12 Pack)',
    image: 'https://placehold.co/400x400/FF6B35/white?text=Doritos',
    description: 'Classic nacho cheese flavored tortilla chips',
    inStock: true,
    isFeatured: false,
    isOnOffer: false,
    brand: 'Doritos',
  },
  {
    id: 'recent-5',
    name: 'Sprite, Mexican',
    category: 'Beverages',
    price: 1.50,
    pricePerCase: 35.99,
    unit: 'ea',
    packSize: '16.9 oz (24 Pack)',
    image: 'https://placehold.co/400x400/10B981/white?text=Sprite',
    description: 'Crisp lemon-lime soda made with real cane sugar',
    inStock: true,
    isFeatured: false,
    isOnOffer: true,
    brand: 'Sprite',
  },
  {
    id: 'recent-6',
    name: 'Marlboro Red',
    category: 'Tobacco',
    price: 8.99,
    pricePerCase: 107.99,
    unit: 'ea',
    packSize: '20 cigarettes (10 Pack)',
    image: 'https://placehold.co/400x400/DC2626/white?text=Marlboro',
    description: 'Classic full-flavor cigarettes',
    inStock: true,
    isFeatured: false,
    isOnOffer: false,
    brand: 'Marlboro',
  },
];

export default function RecentProductsPage(): React.JSX.Element {
  return (
    <>
      <Header />
      <CategoryNav />
      
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Buy Again</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quickly reorder your recently purchased items. These products were part of your 
            recent orders and are ready for quick reordering.
          </p>
        </div>

        {/* Recent Products Grid */}
        <ProductSection
          title="🔄 Recently Purchased"
          subtitle="Items from your recent orders"
          products={recentProducts}
          columns={6}
        />

        {/* Quick Reorder Section */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Quick Reorder Options</h2>
            <p className="text-muted-foreground">
              Save time by quickly reordering your most frequently purchased items
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Last Order</h3>
                <p className="text-muted-foreground mb-4">Reorder everything from your most recent purchase</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Reorder All
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Favorites</h3>
                <p className="text-muted-foreground mb-4">Reorder your most frequently purchased items</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  View Favorites
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Saved Lists</h3>
                <p className="text-muted-foreground mb-4">Access your saved shopping lists</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  View Lists
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Order History</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#WM-2024-001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 15, 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12 items</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$156.99</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primary/80">Reorder</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#WM-2024-002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 8, 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 items</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$89.50</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primary/80">Reorder</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#WM-2024-003</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dec 1, 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 items</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$203.75</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primary/80">Reorder</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Toaster position="top-right" richColors />
    </>
  );
}
