'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/lib/hooks/useTranslation';

export default function Footer(): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('about')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              At AVE Catering, you can score wholesale savings on big name brands and have them delivered directly to your door.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t('categories')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition">
                  {t('products')}
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-muted-foreground hover:text-primary transition">
                  {t('deals')}
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition">
                  {t('categories')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get first dibs on exclusive promotions and discounts.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">We accept</p>
              <div className="flex gap-2">
                <div className="h-8 px-3 border rounded flex items-center text-xs font-medium">
                  VISA
                </div>
                <div className="h-8 px-3 border rounded flex items-center text-xs font-medium">
                  Mastercard
                </div>
                <div className="h-8 px-3 border rounded flex items-center text-xs font-medium">
                  Amex
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AVE Catering. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <p className="text-center mt-4 text-xs text-muted-foreground">
            You can reach us at <a href="mailto:help@avecatering.com" className="text-primary">help@avecatering.com</a> or <a href="tel:3232503212" className="text-primary">(323) 250-3212</a> Monday-Saturday (7am-7pm PT)
          </p>
        </div>
      </div>
    </footer>
  );
}
