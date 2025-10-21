'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/store/hooks';
import { ShoppingBag, FileText, Package, User, Calendar, ChevronRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { OrderStatus } from '@/lib/store/slices/ordersSlice';

interface Stat {
  title: string;
  value: string;
  icon: typeof ShoppingBag;
  description: string;
  color: string;
  bgColor: string;
}

export default function DashboardPage(): React.JSX.Element {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.orders);
  const { items: cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <></>;
  }

  // Calculate order stats
  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) => o.status === 'pending' || o.status === 'processing' || o.status === 'shipped'
  ).length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: OrderStatus): string => {
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

  const stats: Stat[] = [
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: ShoppingBag,
      description: 'All time',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Orders',
      value: activeOrders.toString(),
      icon: Package,
      description: 'In progress',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toFixed(0)}`,
      icon: TrendingUp,
      description: 'All time',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Account Status',
      value: user?.isApproved ? 'Approved' : 'Pending',
      icon: User,
      description: user?.accountType || 'N/A',
      color: user?.isApproved ? 'text-green-600' : 'text-orange-600',
      bgColor: user?.isApproved ? 'bg-green-100' : 'bg-orange-100',
    },
  ];

  // Get recent orders (last 3)
  const recentOrders = orders.slice(0, 3);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground">
              {user?.businessName && `${user.businessName} • `}
              Manage your wholesale account
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                    <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/products">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Browse Products
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    View Orders
                  </Button>
                </Link>
                <Link href="/checkout">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled={cartItems.length === 0}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {cartItems.length > 0 ? `Checkout (${cartItems.length} items)` : 'Cart is Empty'}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your business details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-sm">{user?.email}</p>
                </div>
                {user?.businessName && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Business</p>
                    <p className="text-sm">{user.businessName}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                  <p className="text-sm capitalize">{user?.accountType}</p>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Your latest transactions
                </CardDescription>
              </div>
              {recentOrders.length > 0 && (
                <Link href="/orders">
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders yet</p>
                  <Link href="/products">
                    <Button variant="outline" className="mt-4">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => router.push(`/orders/${order.id}`)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="font-semibold">#{order.orderNumber}</div>
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded border ${getStatusColor(order.status)} capitalize`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">${order.total.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(order.createdAt)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Order Items Preview */}
                      <div className="flex gap-2 mb-3">
                        {order.items.slice(0, 3).map((item) => (
                          <div 
                            key={item.id} 
                            className="relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="h-12 w-12 flex-shrink-0 rounded-md bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-muted-foreground">
                              +{order.items.length - 3}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 flex items-center">
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        Track Order
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
