'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, X, Trash2, Upload, ImageIcon } from 'lucide-react';
import Link from 'next/link';

// Mock product data - replace with API call
const mockProducts: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Coca-Cola 24pk Cans',
    sku: 'BEV-001',
    category: 'Beverages',
    brand: 'Coca-Cola',
    price: 12.99,
    pricePerCase: 155.88,
    stock: 250,
    minStock: 50,
    packSize: '24 cans x 12oz',
    unit: 'unit',
    description: 'Classic Coca-Cola 24 pack cans',
  },
  '2': {
    id: 2,
    name: 'Lay\'s Potato Chips Box (40 bags)',
    sku: 'SNK-002',
    category: 'Snacks',
    brand: 'Lay\'s',
    price: 15.99,
    pricePerCase: 191.88,
    stock: 45,
    minStock: 30,
    packSize: '40 bags x 1oz',
    unit: 'box',
    description: 'Assorted Lay\'s potato chips',
  },
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    brand: '',
    price: '',
    pricePerCase: '',
    stock: '',
    minStock: '',
    packSize: '',
    unit: 'unit',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const categories = [
    'Beverages',
    'Snacks',
    'Cleaning',
    'Grocery',
    'Health & Beauty',
    'Tobacco',
    'Household',
    'Mexican Items',
    'Ice Cream & Frozen',
  ];

  useEffect(() => {
    // Load product data
    const product = mockProducts[productId];
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        brand: product.brand,
        price: product.price.toString(),
        pricePerCase: product.pricePerCase.toString(),
        stock: product.stock.toString(),
        minStock: product.minStock.toString(),
        packSize: product.packSize,
        unit: product.unit,
        description: product.description || '',
      });
    }
    setLoading(false);
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, image: 'Please select a valid image file' }));
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear error
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: '' }));
      }
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.pricePerCase || parseFloat(formData.pricePerCase) <= 0) {
      newErrors.pricePerCase = 'Valid case price is required';
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }
    if (!formData.minStock || parseInt(formData.minStock) < 0) {
      newErrors.minStock = 'Valid minimum stock is required';
    }
    if (!formData.packSize.trim()) newErrors.packSize = 'Pack size is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Here you would normally send data to your API with FormData for image upload
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });
    
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    console.log('Updated Product Data:', formData);
    console.log('Image File:', imageFile);
    alert('Product updated successfully!');
    router.push('/admin/products');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      console.log('Deleting product:', productId);
      alert('Product deleted successfully!');
      router.push('/admin/products');
    }
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
      router.push('/admin/products');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
            <p className="text-muted-foreground mt-1">
              Update product details and inventory
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleDelete}
          className="gap-2 text-red-600 border-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          Delete Product
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Product Image */}
          <Card>
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Update Image
                </label>
                
                {/* Image Preview */}
                <div className="flex items-start gap-4">
                  {imagePreview ? (
                    <div className="relative">
                      <div className="w-48 h-48 rounded-lg border-2 border-gray-200 overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-48 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No image uploaded</p>
                      </div>
                    </div>
                  )}

                  {/* Upload Button */}
                  <div className="flex-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium mb-1">Click to upload new image</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        PNG, JPG, JPEG or WEBP (MAX. 5MB)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button type="button" variant="outline" size="sm" asChild>
                          <span className="cursor-pointer">
                            Choose File
                          </span>
                        </Button>
                      </label>
                    </div>
                    {errors.image && (
                      <p className="text-red-500 text-sm mt-2">{errors.image}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Coca-Cola 24pk Cans"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g., BEV-001"
                    className={errors.sku ? 'border-red-500' : ''}
                  />
                  {errors.sku && (
                    <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.category ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Coca-Cola"
                    className={errors.brand ? 'border-red-500' : ''}
                  />
                  {errors.brand && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description..."
                  rows={4}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Unit Price ($) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="12.99"
                    className={errors.price ? 'border-red-500' : ''}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Case Price ($) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="pricePerCase"
                    type="number"
                    step="0.01"
                    value={formData.pricePerCase}
                    onChange={handleChange}
                    placeholder="155.88"
                    className={errors.pricePerCase ? 'border-red-500' : ''}
                  />
                  {errors.pricePerCase && (
                    <p className="text-red-500 text-sm mt-1">{errors.pricePerCase}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Unit Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="unit">Unit</option>
                    <option value="ea">Each</option>
                    <option value="box">Box</option>
                    <option value="pack">Pack</option>
                    <option value="case">Case</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Pack Size <span className="text-red-500">*</span>
                </label>
                <Input
                  name="packSize"
                  value={formData.packSize}
                  onChange={handleChange}
                  placeholder="e.g., 24 cans x 12oz"
                  className={errors.packSize ? 'border-red-500' : ''}
                />
                {errors.packSize && (
                  <p className="text-red-500 text-sm mt-1">{errors.packSize}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Current Stock <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="100"
                    className={errors.stock ? 'border-red-500' : ''}
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Number of units currently in stock
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Minimum Stock Level <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="minStock"
                    type="number"
                    value={formData.minStock}
                    onChange={handleChange}
                    placeholder="20"
                    className={errors.minStock ? 'border-red-500' : ''}
                  />
                  {errors.minStock && (
                    <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    Alert when stock falls below this number
                  </p>
                </div>
              </div>

              {/* Stock Status Preview */}
              {formData.stock && formData.minStock && (
                <div className="p-4 rounded-lg border bg-gray-50">
                  <p className="text-sm font-medium mb-2">Stock Status Preview:</p>
                  <div className="flex items-center gap-2">
                    {parseInt(formData.stock) === 0 ? (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Out of Stock
                      </Badge>
                    ) : parseInt(formData.stock) <= parseInt(formData.minStock) ? (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Low Stock
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        In Stock
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {formData.stock} units available
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" className="gap-2 bg-[#006e9d] hover:bg-[#005580] text-white shadow-md">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

