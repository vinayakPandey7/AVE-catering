'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Mail,
  Phone,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock customers data
const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(323) 250-3212',
    business: 'John\'s Convenience Store',
    accountType: 'wholesaler',
    status: 'approved',
    totalOrders: 45,
    totalSpent: 12450.50,
    averageOrder: 276.68,
    lastOrder: '2024-01-15',
    joinDate: '2023-06-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(323) 250-3213',
    business: 'Smith\'s Market',
    accountType: 'retailer',
    status: 'approved',
    totalOrders: 32,
    totalSpent: 8920.30,
    averageOrder: 278.76,
    lastOrder: '2024-01-14',
    joinDate: '2023-07-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '(323) 250-3214',
    business: 'Bob\'s Grocery',
    accountType: 'wholesaler',
    status: 'approved',
    totalOrders: 78,
    totalSpent: 28540.80,
    averageOrder: 366.16,
    lastOrder: '2024-01-13',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    phone: '(323) 250-3215',
    business: 'Alice\'s Shop',
    accountType: 'retailer',
    status: 'pending',
    totalOrders: 0,
    totalSpent: 0,
    averageOrder: 0,
    lastOrder: null,
    joinDate: '2024-01-15',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    phone: '(323) 250-3216',
    business: 'Charlie\'s Store',
    accountType: 'wholesaler',
    status: 'suspended',
    totalOrders: 15,
    totalSpent: 4230.60,
    averageOrder: 282.04,
    lastOrder: '2023-12-20',
    joinDate: '2023-09-05',
  },
  {
    id: 6,
    name: 'David Lee',
    email: 'david@example.com',
    phone: '(323) 250-3217',
    business: 'Lee\'s Mart',
    accountType: 'wholesaler',
    status: 'approved',
    totalOrders: 56,
    totalSpent: 19870.40,
    averageOrder: 354.83,
    lastOrder: '2024-01-12',
    joinDate: '2023-05-18',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'suspended':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getAccountTypeBadge = (type: string) => {
  return type === 'wholesaler' ? (
    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
      Wholesaler
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
      Retailer
    </Badge>
  );
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.business.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['all', 'approved', 'pending', 'suspended'];

  // Calculate stats
  const totalCustomers = mockCustomers.length;
  const approvedCustomers = mockCustomers.filter((c) => c.status === 'approved').length;
  const pendingCustomers = mockCustomers.filter((c) => c.status === 'pending').length;
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground mt-1">
            Manage your customer accounts and relationships
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#006e9d]/10">
                <Users className="h-5 w-5 text-[#006e9d]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
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
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{approvedCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
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
                placeholder="Search customers by name, email, or business..."
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
                    {status === 'all' ? 'All Customers' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Customers table */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gradient-to-r from-[#006e9d]/5 to-transparent">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Customer</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Contact</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Type</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Orders</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Total Spent</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Avg Order</th>
                  <th className="text-left p-4 font-semibold text-sm text-[#006e9d]">Status</th>
                  <th className="text-right p-4 font-semibold text-sm text-[#006e9d]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-8">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">No customers found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {customer.business}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Joined {formatDate(customer.joinDate)}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        {getAccountTypeBadge(customer.accountType)}
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">{customer.totalOrders}</p>
                          {customer.lastOrder && (
                            <p className="text-xs text-muted-foreground">
                              Last: {formatDate(customer.lastOrder)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-sm text-green-600">
                          ${customer.totalSpent.toFixed(2)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">
                          ${customer.averageOrder > 0 ? customer.averageOrder.toFixed(2) : '0.00'}
                        </p>
                      </td>
                      <td className="p-4">
                        <Badge
                          variant="secondary"
                          className={getStatusColor(customer.status)}
                        >
                          {customer.status}
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
                              <Link href={`/admin/customers/${customer.id}`} className="flex items-center cursor-pointer">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/orders?customer=${customer.id}`} className="flex items-center cursor-pointer">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                View Orders
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/customers/${customer.id}/edit`} className="flex items-center cursor-pointer">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            {customer.status === 'pending' && (
                              <DropdownMenuItem
                                className="text-green-600"
                                onClick={() => {
                                  if (confirm(`Approve customer account for ${customer.name}?`)) {
                                    alert('Customer account approved successfully');
                                  }
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {customer.status !== 'suspended' && (
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  const reason = prompt(`Suspend account for ${customer.name}?\nEnter reason:`);
                                  if (reason) {
                                    alert('Customer account suspended');
                                  }
                                }}
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend
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

