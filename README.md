# Wholesale Grocery E-Commerce Platform

A modern, full-featured wholesale e-commerce platform built with Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, and Redux Toolkit. Inspired by [Mercaso](https://shop.mercaso.com/), this platform is designed for B2B wholesale grocery and household products.

## 🚀 Features

### Core Functionality
- **Modern UI/UX**: Clean, responsive design with white theme and brand color (#1C75BC)
- **Product Catalog**: Comprehensive product browsing with categories and search
- **Shopping Cart**: Real-time cart management with Redux state
- **User Authentication**: Login and registration system for wholesalers
- **User Dashboard**: Account management and order history
- **Checkout System**: Complete checkout flow with payment options
- **Lazy Loading**: React.lazy() implementation for optimal performance
- **Reusable Components**: Well-structured component architecture

### Technical Features
- **Next.js 15 App Router**: Latest Next.js with server and client components
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: State management for cart, auth, and products
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible UI components
- **Responsive Design**: Mobile-first approach
- **Toast Notifications**: User feedback with Sonner
- **SEO Optimized**: Proper metadata and structure

## 📁 Project Structure

```
wholesale-grocery-ecommerce/
├── app/                          # Next.js 15 App Directory
│   ├── auth/                     # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── checkout/                 # Checkout page
│   ├── dashboard/                # User dashboard
│   ├── product/[id]/             # Product detail page
│   ├── products/                 # Products listing page
│   ├── globals.css               # Global styles with custom theme
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Homepage
├── components/
│   ├── features/                 # Feature-specific components
│   │   ├── auth/
│   │   │   └── UserMenu.tsx
│   │   └── cart/
│   │       └── CartSheet.tsx
│   ├── home/                     # Homepage sections
│   │   ├── CategoryBanner.tsx
│   │   ├── HeroCarousel.tsx
│   │   ├── HeroSection.tsx
│   │   └── ProductSection.tsx
│   ├── layout/                   # Layout components
│   │   ├── CategoryNav.tsx
│   │   ├── Footer.tsx
│   │   └── Header.tsx
│   ├── shared/                   # Reusable components
│   │   ├── ProductCard.tsx
│   │   └── ProductGrid.tsx
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── data/
│   │   └── mockProducts.ts       # Mock product data
│   ├── providers/
│   │   └── redux-provider.tsx    # Redux provider
│   ├── store/                    # Redux store setup
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── cartSlice.ts
│   │   │   └── productsSlice.ts
│   │   ├── hooks.ts
│   │   └── store.ts
│   └── utils.ts
└── public/
    └── images/                   # Product and category images
```

## 🎨 Theme & Design

- **Primary Color**: #1C75BC (Blue)
- **Background**: White
- **Typography**: Inter font family
- **Design System**: Based on shadcn/ui with custom theme
- **UI Components**: Button, Card, Input, Badge, Dialog, Sheet, Dropdown, Skeleton

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd "/Users/amit/Downloads/Demo projects/AVE Catering/wholesale-grocery-ecommerce"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Redux Toolkit
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Forms**: React Hook Form (ready to integrate)

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, categories, and featured products |
| `/products` | All products listing with filters |
| `/product/[id]` | Product detail page |
| `/auth/login` | User login page |
| `/auth/register` | User registration page |
| `/dashboard` | User dashboard |
| `/checkout` | Checkout page |

## 🎯 Key Features Explanation

### State Management (Redux)

The application uses Redux Toolkit for state management with three main slices:

- **Cart Slice**: Manages shopping cart items, quantities, and totals
- **Auth Slice**: Handles user authentication state
- **Products Slice**: Manages product catalog and filters

### Lazy Loading

React.lazy() is used extensively for code splitting:
- Product sections
- Cart sheet
- Category banners
- User menu

This ensures optimal initial page load performance.

### Reusable Components

The project follows a modular component architecture:
- **Shared Components**: ProductCard, ProductGrid
- **Layout Components**: Header, Footer, CategoryNav
- **Feature Components**: CartSheet, UserMenu
- **UI Components**: All shadcn/ui components

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Fully responsive navigation and layout
- Touch-optimized for mobile devices

## 🔐 Authentication Flow

1. User registers via `/auth/register`
2. Account pending approval (B2B workflow)
3. User logs in via `/auth/login`
4. Redux stores user state
5. Protected routes check authentication
6. User can access dashboard and checkout

## 🛒 Shopping Flow

1. Browse products on homepage or products page
2. Add items to cart (stored in Redux)
3. View cart via cart sheet (slide-over)
4. Proceed to checkout
5. Fill shipping and payment information
6. Place order

## 📝 Mock Data

The project includes comprehensive mock data in `lib/data/mockProducts.ts`:
- 18 sample products across categories
- Featured categories
- Realistic pricing and product information

## 🎨 Customization

### Theme Colors

Edit `app/globals.css` to customize theme colors:
```css
--primary: oklch(0.509 0.112 236.8); /* #1C75BC */
```

### Add New Components

```bash
npx shadcn@latest add [component-name]
```

### Modify Products

Edit `lib/data/mockProducts.ts` to add or modify products.

## 🚀 Production Deployment

### Build for production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Environment Variables
Create `.env.local` for production:
```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
```

## 📊 Performance Optimizations

- ✅ React.lazy() for code splitting
- ✅ Next.js Image optimization
- ✅ Tailwind CSS purging
- ✅ Component-level suspense boundaries
- ✅ Efficient Redux state management
- ✅ Minimal dependencies

## 🔜 Future Enhancements

- [ ] Backend API integration (MongoDB as per preference)
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Real-time order tracking
- [ ] Advanced filtering and sorting
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Inventory management system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Multi-language support

## 📞 Support & Contact

For support and inquiries:
- Email: help@wholesalemarket.com
- Phone: (323) 250-3212
- Hours: Monday-Saturday (7am-7pm PT)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Mercaso](https://shop.mercaso.com/)
- Built with [Next.js](https://nextjs.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Note**: This is a demonstration project. Images are placeholders. Replace with actual product images for production use.
