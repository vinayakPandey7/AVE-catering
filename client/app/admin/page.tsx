'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// Mock data - will be replaced with real data from API
const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
    iconBg: 'bg-green-500',
  },
  {
    name: 'Orders',
    value: '2,350',
    change: '+180 today',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-[#006e9d]',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    iconBg: 'bg-[#006e9d]',
  },
  {
    name: 'Products',
    value: '1,234',
    change: '21 low stock',
    trend: 'warning',
    icon: Package,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    iconBg: 'bg-purple-500',
  },
  {
    name: 'Customers',
    value: '573',
    change: '+48 this week',
    trend: 'up',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
    iconBg: 'bg-orange-500',
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    total: 234.50,
    status: 'pending',
    date: '2 mins ago',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    total: 567.80,
    status: 'processing',
    date: '15 mins ago',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    total: 123.00,
    status: 'shipped',
    date: '1 hour ago',
  },
  {
    id: 'ORD-004',
    customer: 'Alice Brown',
    email: 'alice@example.com',
    total: 890.25,
    status: 'delivered',
    date: '3 hours ago',
  },
  {
    id: 'ORD-005',
    customer: 'Charlie Wilson',
    email: 'charlie@example.com',
    total: 456.90,
    status: 'cancelled',
    date: '5 hours ago',
  },
];

const lowStockProducts = [
  { id: 1, name: 'Coca-Cola 24pk', stock: 12, minStock: 50, category: 'Beverages' },
  { id: 2, name: 'Lay\'s Chips Box', stock: 8, minStock: 30, category: 'Snacks' },
  { id: 3, name: 'Tide Detergent', stock: 5, minStock: 20, category: 'Cleaning' },
  { id: 4, name: 'Rice 50lb Bag', stock: 3, minStock: 15, category: 'Grocery' },
];

const topProducts = [
  { name: 'Coca-Cola 24pk', sales: 245, revenue: 2450 },
  { name: 'Water Bottles 24pk', sales: 198, revenue: 1980 },
  { name: 'Lay\'s Chips Box', sales: 156, revenue: 1560 },
  { name: 'Paper Towels 12pk', sales: 134, revenue: 1340 },
  { name: 'Tide Detergent', sales: 112, revenue: 1120 },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'processing':
      return <AlertCircle className="h-4 w-4 text-blue-600" />;
    case 'shipped':
      return <TrendingUp className="h-4 w-4 text-purple-600" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'shipped':
      return 'bg-purple-100 text-purple-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className={`${stat.bgColor} border-0 shadow-md hover:shadow-xl transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : stat.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 
                      'text-yellow-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-2xl ${stat.iconBg} shadow-lg`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <Card className="lg:col-span-1 border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-[#006e9d]/5 to-transparent">
            <div>
              <CardTitle className="text-[#006e9d]">Recent Orders</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Latest orders from your customers
              </p>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-[#006e9d] hover:bg-[#006e9d]/10">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center">
                      {getStatusIcon(order.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{order.id}</p>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {order.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low stock alert */}
        <Card className="lg:col-span-1 border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-yellow-50 to-transparent">
            <div>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                Low Stock Alert
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Products that need restocking
              </p>
            </div>
            <Link href="/admin/products?filter=low-stock">
              <Button variant="ghost" size="sm" className="gap-1 text-yellow-700 hover:bg-yellow-50">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-yellow-200 bg-yellow-50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.category}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[100px]">
                        <div
                          className="h-full bg-yellow-500"
                          style={{
                            width: `${(product.stock / product.minStock) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-yellow-700">
                        {product.stock} left
                      </span>
                    </div>
                  </div>
                  <Link href={`/admin/products/${product.id}`}>
                    <Button size="sm" variant="outline">
                      Restock
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top products */}
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#006e9d]/5 to-transparent">
          <CardTitle className="text-[#006e9d]">Top Selling Products</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Best performing products this month
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-[#006e9d]/5 hover:border-[#006e9d]/20 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-[#006e9d] to-[#004d6f] text-white font-semibold text-sm shadow-md">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sales} units sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-green-600">
                    ${product.revenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

