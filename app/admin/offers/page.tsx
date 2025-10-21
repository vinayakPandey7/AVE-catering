'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Tag,
  TrendingUp,
  DollarSign,
  Users,
  Percent,
  Calendar,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock offers/coupons data
const mockOffers = [
  {
    id: 1,
    code: 'WELCOME20',
    name: 'Welcome Discount',
    description: '20% off first order',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 100,
    maxDiscount: 50,
    usageLimit: 100,
    usedCount: 45,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
    applicableTo: 'all',
    totalRevenue: 2450.50,
  },
  {
    id: 2,
    code: 'BULK50',
    name: 'Bulk Order Discount',
    description: '$50 off orders over $500',
    discountType: 'fixed',
    discountValue: 50,
    minPurchase: 500,
    maxDiscount: null,
    usageLimit: null,
    usedCount: 123,
    validFrom: '2024-01-01',
    validTo: '2024-06-30',
    status: 'active',
    applicableTo: 'all',
    totalRevenue: 6150.00,
  },
  {
    id: 3,
    code: 'NEWCUST10',
    name: 'New Customer Offer',
    description: '10% off for new customers',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 50,
    maxDiscount: 25,
    usageLimit: 200,
    usedCount: 87,
    validFrom: '2024-01-15',
    validTo: '2024-03-31',
    status: 'active',
    applicableTo: 'new_customers',
    totalRevenue: 1875.30,
  },
  {
    id: 4,
    code: 'SUMMER2023',
    name: 'Summer Sale',
    description: '15% off all products',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 0,
    maxDiscount: 100,
    usageLimit: 500,
    usedCount: 500,
    validFrom: '2023-06-01',
    validTo: '2023-08-31',
    status: 'expired',
    applicableTo: 'all',
    totalRevenue: 12450.75,
  },
  {
    id: 5,
    code: 'FREESHIP',
    name: 'Free Shipping',
    description: 'Free shipping on orders over $200',
    discountType: 'shipping',
    discountValue: 0,
    minPurchase: 200,
    maxDiscount: null,
    usageLimit: null,
    usedCount: 234,
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    status: 'active',
    applicableTo: 'all',
    totalRevenue: 0,
  },
  {
    id: 6,
    code: 'LOYAL25',
    name: 'Loyalty Reward',
    description: '25% off for VIP customers',
    discountType: 'percentage',
    discountValue: 25,
    minPurchase: 150,
    maxDiscount: 75,
    usageLimit: 50,
    usedCount: 12,
    validFrom: '2024-02-01',
    validTo: '2024-02-29',
    status: 'scheduled',
    applicableTo: 'vip_customers',
    totalRevenue: 0,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'expired':
      return 'bg-gray-100 text-gray-800';
    case 'disabled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDiscountDisplay = (offer: typeof mockOffers[0]) => {
  if (offer.discountType === 'percentage') {
    return `${offer.discountValue}% off`;
  } else if (offer.discountType === 'fixed') {
    return `$${offer.discountValue} off`;
  } else if (offer.discountType === 'shipping') {
    return 'Free Shipping';
  }
  return 'N/A';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export default function OffersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOffers = mockOffers.filter((offer) =>
    offer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const activeOffers = mockOffers.filter((o) => o.status === 'active').length;
  const totalUsage = mockOffers.reduce((sum, o) => sum + o.usedCount, 0);
  const totalRevenue = mockOffers.reduce((sum, o) => sum + o.totalRevenue, 0);
  const scheduledOffers = mockOffers.filter((o) => o.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Offers & Coupons</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage promotional offers and discount codes
          </p>
        </div>
        <Link href="/admin/offers/new">
          <Button className="gap-2 bg-[#006e9d] hover:bg-[#005580] text-white shadow-md">
            <Plus className="h-4 w-4" />
            Create Offer
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Tag className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Offers</p>
                <p className="text-2xl font-bold">{activeOffers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#006e9d]/10">
                <Users className="h-5 w-5 text-[#006e9d]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold">{totalUsage}</p>
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
                <p className="text-sm text-muted-foreground">Revenue Impact</p>
                <p className="text-2xl font-bold">${totalRevenue.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{scheduledOffers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search offers by code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Offers grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredOffers.map((offer) => (
          <Card key={offer.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-[#006e9d]/10">
                      {offer.discountType === 'percentage' ? (
                        <Percent className="h-4 w-4 text-[#006e9d]" />
                      ) : offer.discountType === 'shipping' ? (
                        <TrendingUp className="h-4 w-4 text-[#006e9d]" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-[#006e9d]" />
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(offer.status)}
                    >
                      {offer.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg">{offer.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {offer.description}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/offers/${offer.id}`} className="flex items-center cursor-pointer">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        if (confirm(`Duplicate offer "${offer.name}"?`)) {
                          alert('Offer duplicated successfully');
                        }
                      }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    {offer.status === 'active' && (
                      <DropdownMenuItem
                        onClick={() => {
                          if (confirm(`Disable offer "${offer.code}"?`)) {
                            alert('Offer disabled successfully');
                          }
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Disable
                      </DropdownMenuItem>
                    )}
                    {offer.status === 'disabled' && (
                      <DropdownMenuItem
                        onClick={() => {
                          if (confirm(`Enable offer "${offer.code}"?`)) {
                            alert('Offer enabled successfully');
                          }
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Enable
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => {
                        if (confirm(`Delete offer "${offer.code}"? This action cannot be undone.`)) {
                          alert('Offer deleted successfully');
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Coupon Code */}
              <div className="mb-4 p-3 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300">
                <div className="flex items-center justify-between">
                  <code className="text-lg font-bold text-primary">
                    {offer.code}
                  </code>
                  <Button variant="ghost" size="sm">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="font-medium">{getDiscountDisplay(offer)}</span>
                </div>
                {offer.minPurchase > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Min Purchase:</span>
                    <span className="font-medium">${offer.minPurchase}</span>
                  </div>
                )}
                {offer.maxDiscount && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Max Discount:</span>
                    <span className="font-medium">${offer.maxDiscount}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Usage:</span>
                  <span className="font-medium">
                    {offer.usedCount}
                    {offer.usageLimit ? ` / ${offer.usageLimit}` : ' uses'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Valid Period:</span>
                  <span className="font-medium text-xs">
                    {formatDate(offer.validFrom)} - {formatDate(offer.validTo)}
                  </span>
                </div>
                {offer.totalRevenue > 0 && (
                  <div className="flex items-center justify-between text-sm pt-3 border-t">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-semibold text-green-600">
                      ${offer.totalRevenue.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              {/* Usage Progress */}
              {offer.usageLimit && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Usage Progress</span>
                    <span className="font-medium">
                      {Math.round((offer.usedCount / offer.usageLimit) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#006e9d] to-[#004d6f] rounded-full transition-all"
                      style={{
                        width: `${Math.min((offer.usedCount / offer.usageLimit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

