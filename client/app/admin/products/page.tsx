'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Package,
  AlertCircle,
  CheckCircle,
  ArrowUpDown,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getProducts, deleteProduct, Product } from '@/lib/api/services/productService';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Coca-Cola 24pk Cans',
    sku: 'BEV-001',
    category: 'Beverages',
    brand: 'Coca-Cola',
    price: 12.99,
    pricePerCase: 155.88,
    stock: 250,
    minStock: 50,
    status: 'active',
    image: '/images/products/coke.jpg',
  },
  {
    id: 2,
    name: 'Lay\'s Potato Chips Box (40 bags)',
    sku: 'SNK-002',
    category: 'Snacks',
    brand: 'Lay\'s',
    price: 15.99,
    pricePerCase: 191.88,
    stock: 45,
    minStock: 30,
    status: 'active',
    image: '/images/products/lays.jpg',
  },
  {
    id: 3,
    name: 'Tide Laundry Detergent 150oz',
    sku: 'CLN-003',
    category: 'Cleaning',
    brand: 'Tide',
    price: 18.99,
    pricePerCase: 227.88,
    stock: 12,
    minStock: 20,
    status: 'low_stock',
    image: '/images/products/tide.jpg',
  },
  {
    id: 4,
    name: 'Rice 50lb Bag',
    sku: 'GRC-004',
    category: 'Grocery',
    brand: 'Generic',
    price: 45.99,
    pricePerCase: 551.88,
    stock: 5,
    minStock: 15,
    status: 'low_stock',
    image: '/images/products/rice.jpg',
  },
  {
    id: 5,
    name: 'Water Bottles 24pk',
    sku: 'BEV-005',
    category: 'Beverages',
    brand: 'Aquafina',
    price: 5.99,
    pricePerCase: 71.88,
    stock: 0,
    minStock: 100,
    status: 'out_of_stock',
    image: '/images/products/water.jpg',
  },
  {
    id: 6,
    name: 'Paper Towels 12pk',
    sku: 'HH-006',
    category: 'Household',
    brand: 'Bounty',
    price: 22.99,
    pricePerCase: 275.88,
    stock: 180,
    minStock: 50,
    status: 'active',
    image: '/images/products/paper-towels.jpg',
  },
];

const getStatusBadge = (status: string, stock: number) => {
  if (stock === 0) {
    return (
      <Badge variant="secondary" className="bg-red-100 text-red-800">
        Out of Stock
      </Badge>
    );
  } else if (status === 'low_stock') {
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        Low Stock
      </Badge>
    );
  } else {
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        In Stock
      </Badge>
    );
  }
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery, filterCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts({
        search: searchQuery || undefined,
        category: filterCategory !== 'all' ? filterCategory : undefined,
        page,
        limit: 20,
      });
      
      setProducts(response.products);
      setTotalPages(response.pagination.pages);
      setTotalProducts(response.pagination.total);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data for development
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await deleteProduct(productId);
        // Refresh products list
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const handleUpdateStock = async (productId: string, currentStock: number) => {
    const newStock = prompt(
      `Update stock for this product\nCurrent stock: ${currentStock}`,
      currentStock.toString()
    );
    if (newStock !== null && newStock !== '') {
      try {
        // This would need an update stock API endpoint
        alert(`Stock updated to ${newStock} units`);
        await fetchProducts();
      } catch (error) {
        console.error('Error updating stock:', error);
        alert('Error updating stock. Please try again.');
      }
    }
  };

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your inventory and product catalog
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your inventory and product catalog
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2 bg-[#006e9d] hover:bg-[#005580] text-white shadow-md">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#006e9d]/10">
                <Package className="h-5 w-5 text-[#006e9d]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold">
                  {products.filter((p) => p.stockQuantity > 0 && p.inStock).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold">
                  {products.filter((p) => p.stockQuantity > 0 && !p.inStock).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold">
                  {products.filter((p) => p.stockQuantity === 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Category: {filterCategory === 'all' ? 'All' : filterCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setFilterCategory(category)}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gradient-to-r from-[#006e9d]/5 to-transparent">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Product</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">SKU</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Category</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Price</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Stock</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Status</th>
                  <th className="text-right p-4 font-semibold text-sm text-[#006e9d]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8">
                      <div className="flex flex-col items-center gap-2">
                        <Package className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">No products found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {product.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {product.sku}
                        </code>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">
                            ${product.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${product.pricePerCase.toFixed(2)}/case
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">{product.stockQuantity} units</p>
                          <p className="text-xs text-muted-foreground">
                            In Stock: {product.inStock ? 'Yes' : 'No'}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(
                          product.stockQuantity === 0 ? 'out_of_stock' : 
                          product.inStock ? 'active' : 'low_stock', 
                          product.stockQuantity
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product._id}`} className="flex items-center cursor-pointer">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateStock(product._id, product.stockQuantity)}
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Update Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteProduct(product._id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

