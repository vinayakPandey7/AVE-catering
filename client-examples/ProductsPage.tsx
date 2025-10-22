// Example React component demonstrating API integration
import React, { useEffect, useState } from 'react';
import { 
  getProducts, 
  getCategories, 
  getProductCategories,
  Product,
  Category 
} from '../lib/api/services';

interface ProductsPageProps {
  // Add any props you need
}

export const ProductsPage: React.FC<ProductsPageProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCategories, setProductCategories] = useState<Array<{name: string; count: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    page: 1,
    limit: 20
  });

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [productsData, categoriesData, productCategoriesData] = await Promise.all([
        getProducts({ limit: 20 }),
        getCategories(),
        getProductCategories()
      ]);

      setProducts(productsData.products);
      setCategories(categoriesData);
      setProductCategories(productCategoriesData);

    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts(filters);
      setProducts(productsData.products);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({ ...prev, category, page: 1 }));
  };

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchAllData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AVE Catering Products</h1>
      
      {/* Filters */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        
        {/* Category Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {productCategories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name} ({cat.count})
              </option>
            ))}
          </select>
        </div>

        {/* Search Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {products.length} products
          {filters.category && ` in "${filters.category}"`}
          {filters.search && ` matching "${filters.search}"`}
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Found</h3>
          <p className="text-gray-500">
            {filters.category || filters.search 
              ? 'Try adjusting your filters' 
              : 'No products available at the moment'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                <p className="text-gray-500 text-sm mb-3">{product.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.packSize} {product.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="text-sm text-gray-500">
                    SKU: {product.sku}
                  </span>
                </div>

                <button className="w-full mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {filters.page}
            </span>
            <button
              onClick={() => handlePageChange(filters.page + 1)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Debug Information</h3>
        <div className="text-sm text-gray-600">
          <p>Categories: {categories.length}</p>
          <p>Product Categories: {productCategories.length}</p>
          <p>Current Filters: {JSON.stringify(filters)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
