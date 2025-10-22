'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react';

//Mock data for reports
const salesData = [
  { month: 'Jan', revenue: 42500, orders: 145, customers: 89 },
  { month: 'Feb', revenue: 38900, orders: 132, customers: 76 },
  { month: 'Mar', revenue: 51200, orders: 178, customers: 102 },
  { month: 'Apr', revenue: 47800, orders: 156, customers: 94 },
  { month: 'May', revenue: 55600, orders: 189, customers: 115 },
  { month: 'Jun', revenue: 62400, orders: 213, customers: 128 },
];

const topProducts = [
  { name: 'Coca-Cola 24pk', sales: 1245, revenue: 16185, growth: 12.5 },
  { name: 'Lay\'s Chips Box', sales: 987, revenue: 15778, growth: 8.3 },
  { name: 'Water Bottles 24pk', sales: 1567, revenue: 9393, growth: 15.7 },
  { name: 'Paper Towels 12pk', sales: 743, revenue: 17083, growth: -3.2 },
  { name: 'Tide Detergent', sales: 589, revenue: 11185, growth: 5.6 },
];

const topCategories = [
  { name: 'Beverages', sales: 28456, percentage: 35, color: 'bg-blue-500' },
  { name: 'Snacks', sales: 19234, percentage: 24, color: 'bg-yellow-500' },
  { name: 'Cleaning', sales: 15678, percentage: 19, color: 'bg-green-500' },
  { name: 'Grocery', sales: 11234, percentage: 14, color: 'bg-purple-500' },
  { name: 'Others', sales: 6598, percentage: 8, color: 'bg-gray-500' },
];

const topCustomers = [
  { name: 'Bob Johnson', business: 'Bob\'s Grocery', orders: 78, spent: 28540.80 },
  { name: 'David Lee', business: 'Lee\'s Mart', orders: 56, spent: 19870.40 },
  { name: 'John Doe', business: 'John\'s Store', orders: 45, spent: 12450.50 },
  { name: 'Jane Smith', business: 'Smith\'s Market', orders: 32, spent: 8920.30 },
  { name: 'Charlie Wilson', business: 'Charlie\'s Store', orders: 15, spent: 4230.60 },
];

const revenueMetrics = {
  totalRevenue: 298400,
  previousRevenue: 265800,
  growth: 12.3,
  avgOrderValue: 342.50,
  avgOrderGrowth: 5.2,
  totalOrders: 871,
  orderGrowth: 8.7,
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last-6-months');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your business performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {dateRange === 'last-6-months' ? 'Last 6 Months' : dateRange}
          </Button>
          <Button className="gap-2 bg-[#006e9d] hover:bg-[#005580] text-white shadow-md">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold mt-2 text-gray-900">
                  ${revenueMetrics.totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +{revenueMetrics.growth}%
                  </span>
                  <span className="text-sm text-gray-600">vs last period</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-green-500 shadow-lg">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Order Value
                </p>
                <p className="text-3xl font-bold mt-2 text-gray-900">
                  ${revenueMetrics.avgOrderValue}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +{revenueMetrics.avgOrderGrowth}%
                  </span>
                  <span className="text-sm text-gray-600">vs last period</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#006e9d] shadow-lg">
                <Activity className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-3xl font-bold mt-2 text-gray-900">
                  {revenueMetrics.totalOrders}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    +{revenueMetrics.orderGrowth}%
                  </span>
                  <span className="text-sm text-gray-600">vs last period</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-purple-500 shadow-lg">
                <ShoppingCart className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#006e9d]/5 to-transparent">
          <CardTitle className="flex items-center gap-2 text-[#006e9d]">
            <BarChart3 className="h-5 w-5" />
            Sales Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">
                      {data.orders} orders
                    </span>
                    <span className="font-semibold text-green-600">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#006e9d] to-[#004d6f] rounded-full transition-all shadow-sm"
                    style={{
                      width: `${(data.revenue / 70000) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#006e9d]/5 to-transparent">
            <CardTitle className="flex items-center gap-2 text-[#006e9d]">
              <Package className="h-5 w-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-[#006e9d]/5 hover:border-[#006e9d]/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-[#006e9d] to-[#004d6f] text-white font-bold text-sm shadow-md">
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
                      ${product.revenue.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      {product.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          product.growth > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {product.growth > 0 ? '+' : ''}
                        {product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#006e9d]/5 to-transparent">
            <CardTitle className="flex items-center gap-2 text-[#006e9d]">
              <PieChart className="h-5 w-5" />
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        ${category.sales.toLocaleString()}
                      </span>
                      <Badge variant="secondary" className="bg-[#006e9d]/10 text-[#006e9d]">
                        {category.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${category.color} rounded-full transition-all shadow-sm`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-[#006e9d]/5 to-transparent">
          <CardTitle className="flex items-center gap-2 text-[#006e9d]">
            <Users className="h-5 w-5" />
            Top Customers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gradient-to-r from-[#006e9d]/5 to-transparent">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">
                    Rank
                  </th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">
                    Customer
                  </th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">
                    Orders
                  </th>
                  <th className="text-right p-4 font-semibold text-sm text-[#006e9d]">
                    Total Spent
                  </th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer, index) => (
                  <tr key={customer.name} className="border-b hover:bg-[#006e9d]/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-[#006e9d] to-[#004d6f] text-white font-bold text-sm shadow-md">
                        #{index + 1}
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {customer.business}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-[#006e9d]/5 text-[#006e9d] border-[#006e9d]/20">
                        {customer.orders} orders
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <p className="font-semibold text-sm text-green-600">
                        ${customer.spent.toLocaleString()}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

