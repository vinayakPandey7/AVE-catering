'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Download,
  Printer,
  Clock,
  DollarSign,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      business: 'John\'s Convenience Store',
    },
    items: 15,
    total: 1234.50,
    status: 'pending',
    paymentStatus: 'paid',
    shippingMethod: 'Standard',
    orderDate: '2024-01-15T10:30:00',
    estimatedDelivery: '2024-01-20',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      business: 'Smith\'s Market',
    },
    items: 8,
    total: 567.80,
    status: 'processing',
    paymentStatus: 'paid',
    shippingMethod: 'Express',
    orderDate: '2024-01-15T09:15:00',
    estimatedDelivery: '2024-01-18',
  },
  {
    id: 'ORD-003',
    customer: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      business: 'Bob\'s Grocery',
    },
    items: 23,
    total: 2890.25,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingMethod: 'Standard',
    orderDate: '2024-01-14T14:20:00',
    estimatedDelivery: '2024-01-19',
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-004',
    customer: {
      name: 'Alice Brown',
      email: 'alice@example.com',
      business: 'Alice\'s Shop',
    },
    items: 5,
    total: 345.00,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingMethod: 'Express',
    orderDate: '2024-01-13T11:45:00',
    estimatedDelivery: '2024-01-17',
    deliveredDate: '2024-01-16',
  },
  {
    id: 'ORD-005',
    customer: {
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      business: 'Charlie\'s Store',
    },
    items: 12,
    total: 890.60,
    status: 'cancelled',
    paymentStatus: 'refunded',
    shippingMethod: 'Standard',
    orderDate: '2024-01-12T16:30:00',
    cancelledDate: '2024-01-13',
    cancelReason: 'Customer requested cancellation',
  },
  {
    id: 'ORD-006',
    customer: {
      name: 'David Lee',
      email: 'david@example.com',
      business: 'Lee\'s Mart',
    },
    items: 18,
    total: 1567.90,
    status: 'pending',
    paymentStatus: 'pending',
    shippingMethod: 'Standard',
    orderDate: '2024-01-15T13:00:00',
    estimatedDelivery: '2024-01-22',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'processing':
      return <AlertCircle className="h-4 w-4" />;
    case 'shipped':
      return <Truck className="h-4 w-4" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'refunded':
      return 'bg-gray-100 text-gray-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  // Calculate stats
  const totalRevenue = mockOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = mockOrders.filter((o) => o.status === 'pending').length;
  const processingOrders = mockOrders.filter((o) => o.status === 'processing').length;
  const shippedOrders = mockOrders.filter((o) => o.status === 'shipped').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground mt-1">
            Manage and process customer orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#006e9d]/10">
                <ShoppingCart className="h-5 w-5 text-[#006e9d]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">{processingOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Truck className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shipped</p>
                <p className="text-2xl font-bold">{shippedOrders}</p>
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
                placeholder="Search orders by ID, customer name, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Status: {filterStatus === 'all' ? 'All' : filterStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statuses.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setFilterStatus(status)}
                  >
                    {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Orders table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gradient-to-r from-[#006e9d]/5 to-transparent">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Order ID</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Customer</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Date</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Items</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Total</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Payment</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Status</th>
                  <th className="text-right p-4 font-semibold text-sm text-[#006e9d]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-8">
                      <div className="flex flex-col items-center gap-2">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">No orders found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <code className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                          {order.id}
                        </code>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">{order.customer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.customer.business}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{formatDate(order.orderDate)}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{order.items} items</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-sm">
                          ${order.total.toFixed(2)}
                        </p>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="secondary"
                          className={getPaymentStatusColor(order.paymentStatus)}
                        >
                          {order.paymentStatus}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(order.status)} flex items-center gap-1 w-fit`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
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
                              <Link href={`/admin/orders/${order.id}`} className="flex items-center cursor-pointer">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                alert('Invoice printing functionality will be implemented');
                              }}
                            >
                              <Printer className="h-4 w-4 mr-2" />
                              Print Invoice
                            </DropdownMenuItem>
                            {order.status === 'pending' && (
                              <DropdownMenuItem
                                onClick={() => {
                                  if (confirm(`Process order ${order.id}?`)) {
                                    alert('Order status updated to Processing');
                                  }
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Process Order
                              </DropdownMenuItem>
                            )}
                            {order.status === 'processing' && (
                              <DropdownMenuItem
                                onClick={() => {
                                  const tracking = prompt('Enter tracking number:');
                                  if (tracking) {
                                    alert(`Order marked as shipped with tracking: ${tracking}`);
                                  }
                                }}
                              >
                                <Truck className="h-4 w-4 mr-2" />
                                Mark as Shipped
                              </DropdownMenuItem>
                            )}
                            {['pending', 'processing'].includes(order.status) && (
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  const reason = prompt(`Cancel order ${order.id}?\nEnter reason:`);
                                  if (reason) {
                                    alert('Order cancelled successfully');
                                  }
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Order
                              </DropdownMenuItem>
                            )}
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

