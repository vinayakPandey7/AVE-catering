'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/shared/ProductGrid';
import { mockProducts } from '@/lib/data/mockProducts';
import { Package, Filter, X, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

// Map URL slugs to category names
const categoryMap: Record<string, string> = {
  'beverages': 'Beverages',
  'snacks': 'Candy & Snacks',
  'candy-snacks': 'Candy & Snacks',
  'cleaning': 'Cleaning & Laundry',
  'grocery': 'Grocery',
  'health-beauty': 'Health & Beauty',
  'tobacco': 'Tobacco',
  'household': 'Household & Kitchen',
  'mexican': 'Mexican Items',
  'frozen': 'Ice Cream & Frozen',
  'new-exciting': 'New & Exciting',
  'deals': 'Deals',
};

export default function CategoryPage(): React.JSX.Element {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useTranslation();
  
  // Get the category name from the slug
  const categoryName = categoryMap[slug] || slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  // State for filters
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string>('all');

  // Filter products by category
  const categoryProducts = useMemo(() => {
    // For special categories
    if (slug === 'new-exciting') {
      // Return latest products (could use a date field if available)
      return mockProducts.filter(p => p.isFeatured).slice(0, 12);
    }
    
    if (slug === 'deals') {
      // Return products on offer
      return mockProducts.filter(p => p.isOnOffer);
    }

    // For regular categories, filter by category name
    // Convert category to slug format for comparison
    const normalizeSlug = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
    
    return mockProducts.filter(product => {
      const productCategorySlug = normalizeSlug(product.category);
      const searchSlug = slug.toLowerCase();
      
      return (
        // Exact match
        product.category.toLowerCase() === categoryName.toLowerCase() ||
        // Category contains slug
        product.category.toLowerCase().includes(searchSlug) ||
        // Slug contains category
        searchSlug.includes(product.category.toLowerCase().replace(/\s+/g, '-')) ||
        // Normalized slug match
        productCategorySlug.includes(searchSlug) ||
        searchSlug.includes(productCategorySlug)
      );
    });
  }, [slug, categoryName]);

  // Get unique brands from category products
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    categoryProducts.forEach(product => {
      if (product.brand) {
        brandSet.add(product.brand);
      }
    });
    return Array.from(brandSet).sort();
  }, [categoryProducts]);

  // Get subcategories (for now, we'll simulate based on product names/types)
  const subcategories = useMemo(() => {
    const subcatSet = new Set<string>();
    categoryProducts.forEach(product => {
      // Extract potential subcategory from product name or description
      // This is a simple implementation - can be enhanced with actual subcategory data
      if (product.name.includes('Chips')) subcatSet.add('Chips');
      if (product.name.includes('Candy')) subcatSet.add('Candy');
      if (product.name.includes('Chocolate')) subcatSet.add('Chocolate');
      if (product.name.includes('Gum')) subcatSet.add('Gum');
      if (product.name.includes('Cookies')) subcatSet.add('Cookies');
      if (product.name.includes('Crackers')) subcatSet.add('Crackers');
      if (product.name.includes('Nuts')) subcatSet.add('Nuts');
    });
    return Array.from(subcatSet).sort();
  }, [categoryProducts]);

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Filter by subcategory
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(product => 
        product.name.includes(selectedSubcategory)
      );
    }

    return filtered;
  }, [categoryProducts, selectedBrands, selectedSubcategory]);

  // Toggle brand filter
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedSubcategory('all');
  };

  // Get category description
  const getCategoryDescription = (slug: string): string => {
    const descriptions: Record<string, string> = {
      'beverages': 'Refresh your inventory with our wide selection of beverages including sodas, juices, water, and energy drinks.',
      'snacks': 'Stock up on popular candy and snack items that your customers love.',
      'cleaning': 'Professional cleaning and laundry supplies for all your needs.',
      'grocery': 'Essential grocery items and pantry staples.',
      'health-beauty': 'Health and beauty products from trusted brands.',
      'tobacco': 'Premium tobacco products for wholesale.',
      'household': 'Household and kitchen essentials for everyday use.',
      'mexican': 'Authentic Mexican products and specialty items.',
      'frozen': 'Ice cream and frozen food selection.',
      'new-exciting': 'Discover our newest and most exciting products.',
      'deals': 'Amazing deals and special offers on popular items.',
    };
    return descriptions[slug] || `Browse our ${categoryName} selection.`;
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li className="flex items-center gap-2">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <span className="text-muted-foreground">/</span>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Products
                </Link>
                <span className="text-muted-foreground">/</span>
              </li>
              <li>
                <span className="font-medium text-foreground">{categoryName}</span>
              </li>
            </ol>
          </nav>

          {/* Category Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">{categoryName}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {getCategoryDescription(slug)}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
              </span>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedBrands.length > 0 || selectedSubcategory !== 'all') && (
            <Card className="mb-6">
              <CardContent className="py-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">Active Filters:</span>
                    {selectedBrands.map(brand => (
                      <Badge key={brand} variant="secondary" className="gap-1">
                        {brand}
                        <button onClick={() => toggleBrand(brand)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {selectedSubcategory !== 'all' && (
                      <Badge variant="secondary" className="gap-1">
                        {selectedSubcategory}
                        <button onClick={() => setSelectedSubcategory('all')} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content with Sidebar */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1 space-y-4">
              {/* Shop By Category */}
              {subcategories.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('shopByCategory')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedSubcategory('all')}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group ${
                          selectedSubcategory === 'all'
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>All {categoryName}</span>
                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                      {subcategories.map(subcat => (
                        <button
                          key={subcat}
                          onClick={() => setSelectedSubcategory(subcat)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group ${
                            selectedSubcategory === subcat
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <span>{subcat}</span>
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Shop By Brands */}
              {brands.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t('shopByBrands')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <label
                          key={brand}
                          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                          />
                          <span className="text-sm flex-1">{brand}</span>
                          <span className="text-xs text-muted-foreground">
                            ({categoryProducts.filter(p => p.brand === brand).length})
                          </span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Price Range (Placeholder for future) */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('priceRange')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <label className="flex items-center gap-2 cursor-pointer hover:text-foreground">
                      <input type="checkbox" className="h-4 w-4 rounded" />
                      <span>Under $5</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-foreground">
                      <input type="checkbox" className="h-4 w-4 rounded" />
                      <span>$5 - $10</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-foreground">
                      <input type="checkbox" className="h-4 w-4 rounded" />
                      <span>$10 - $20</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer hover:text-foreground">
                      <input type="checkbox" className="h-4 w-4 rounded" />
                      <span>$20+</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort and View Options */}
              <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <Button variant="outline" size="sm">
                    Featured
                  </Button>
                  <Button variant="outline" size="sm">
                    Price: Low to High
                  </Button>
                  <Button variant="outline" size="sm">
                    Best Sellers
                  </Button>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <Card>
                  <CardContent className="py-16 text-center">
                    <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h2 className="text-2xl font-bold mb-2">No Products Found</h2>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or browse other products.
                    </p>
                    <Button onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

