# Banner System Implementation

This document outlines the complete implementation of the dynamic banner/carousel system for the AVE-Catering application.

## Overview

The banner system replaces the static carousel data with a fully dynamic CRUD system that allows administrators to manage homepage banners through the admin panel.

## Features Implemented

### 1. Backend (Server-side)

#### Database Model (`server/models/bannerModel.ts`)
- **Banner Schema** with the following fields:
  - `title` (required): Main banner title
  - `subtitle`: Optional subtitle text
  - `description`: Optional description text
  - `image` (required): Banner image URL
  - `badge`: Optional badge text (e.g., "Best Seller", "New Deal")
  - `link`: Optional link URL for click-through
  - `buttonText`: Optional CTA button text
  - `order`: Display order (lower numbers appear first)
  - `isActive`: Boolean flag to control visibility
  - `startDate`: Optional start date for scheduled banners
  - `endDate`: Optional end date for scheduled banners
  - Timestamps: `createdAt`, `updatedAt`

- **Features**:
  - Indexed fields for efficient queries (order, isActive, dates)
  - Virtual field `isValid` to check if banner should be displayed
  - Pre-save middleware for automatic ordering

#### API Controller (`server/controllers/bannerController.ts`)
- **Public Endpoints**:
  - `GET /api/banners/public` - Fetch all active banners for display

- **Admin Endpoints**:
  - `GET /api/banners` - Get all banners with filters and pagination
  - `GET /api/banners/:id` - Get single banner by ID
  - `POST /api/banners` - Create new banner
  - `PUT /api/banners/:id` - Update existing banner
  - `DELETE /api/banners/:id` - Delete banner
  - `PUT /api/banners/reorder` - Reorder banners
  - `GET /api/banners/stats` - Get banner statistics

- **Features**:
  - Search functionality (by title, subtitle, description, badge)
  - Status filtering (active/inactive)
  - Pagination support
  - Date validation
  - Smart filtering for public endpoint (only shows active banners within valid date range)

#### API Routes (`server/routes/bannerRoutes.ts`)
- Public routes (no authentication required)
- Admin routes (protected by auth middleware)
- Registered in `server/server.ts` at `/api/banners`

### 2. Frontend (Client-side)

#### Banner Service (`client/lib/api/services/bannerService.ts`)
- TypeScript interfaces for type safety:
  - `Banner`
  - `CreateBannerRequest`
  - `UpdateBannerRequest`
  - `BannerFilters`
  - `BannersResponse`
  - `BannerStats`

- API Methods:
  - `getPublicBanners()` - Fetch active banners for homepage
  - `getBanners()` - Admin: Get all banners with filters
  - `getBannerById()` - Get single banner
  - `createBanner()` - Create new banner
  - `updateBanner()` - Update existing banner
  - `deleteBanner()` - Delete banner
  - `reorderBanners()` - Reorder banners
  - `getBannerStats()` - Get statistics

#### Admin Interface

##### Banner List Page (`client/app/admin/banners/`)
- **Main Features**:
  - Statistics dashboard showing:
    - Total banners
    - Active banners
    - Inactive banners
    - Scheduled banners
    - Expired banners
  - Search functionality
  - Banner cards with image preview
  - Quick actions (Edit, Activate/Deactivate, Delete)
  - Empty state with call-to-action
  - Loading states

##### Create Banner Page (`client/app/admin/banners/new/`)
- **Form Sections**:
  1. **Basic Information**:
     - Title (required)
     - Subtitle (optional)
     - Description (optional)
     - Badge text (optional)
  
  2. **Image & Link**:
     - Image URL (required)
     - Link URL (optional)
     - Button text (optional)
  
  3. **Display Settings**:
     - Display order
     - Active status checkbox
     - Start date (optional)
     - End date (optional)

- **Features**:
  - Form validation
  - Error handling
  - Loading states
  - Cancel confirmation

##### Edit Banner Page (`client/app/admin/banners/[id]/`)
- Same form as create page
- Pre-populated with existing banner data
- Loading state while fetching data

#### Homepage Carousel (`client/components/home/HeroCarousel.tsx`)
- **Updated Features**:
  - Fetches banners from API instead of using static data
  - Loading state with skeleton UI
  - Empty state handling
  - Displays dynamic content:
    - Badge (if available)
    - Title (required)
    - Subtitle (if available)
    - Description (if available)
  - Auto-rotation (4 seconds)
  - Dot indicators for navigation
  - Manual navigation by clicking dots

#### Admin Navigation
- Added "Banners" menu item in admin sidebar (`client/app/admin/layout.tsx`)
- Icon: Image icon from lucide-react
- Located between "Customers" and "Offers & Coupons"

## Database Schema

```typescript
{
  title: String (required),
  subtitle: String,
  description: String,
  image: String (required),
  badge: String,
  link: String,
  buttonText: String,
  order: Number (default: 0),
  isActive: Boolean (default: true),
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Public
- `GET /api/banners/public` - Get active banners for homepage

### Admin (Protected)
- `GET /api/banners` - List all banners with pagination
- `GET /api/banners/stats` - Get banner statistics
- `GET /api/banners/:id` - Get single banner
- `POST /api/banners` - Create new banner
- `PUT /api/banners/:id` - Update banner
- `PUT /api/banners/reorder` - Reorder banners
- `DELETE /api/banners/:id` - Delete banner

## How to Use

### Admin Panel

1. **Navigate to Banners**:
   - Log in to admin panel
   - Click "Banners" in the sidebar

2. **Create New Banner**:
   - Click "Create Banner" button
   - Fill in the form:
     - Title (required)
     - Image URL (required)
     - Optional: subtitle, description, badge, link, button text
     - Set display order
     - Set active status
     - Optionally schedule with start/end dates
   - Click "Create Banner"

3. **Edit Banner**:
   - Click on a banner card
   - Click "Edit" from the dropdown menu
   - Update desired fields
   - Click "Save Changes"

4. **Activate/Deactivate**:
   - Click dropdown menu on banner card
   - Select "Activate" or "Deactivate"

5. **Delete Banner**:
   - Click dropdown menu on banner card
   - Select "Delete"
   - Confirm deletion

### Homepage Display

- Active banners are automatically displayed on the homepage
- Banners rotate every 4 seconds
- Only banners that are:
  - Active (`isActive: true`)
  - Within date range (if dates are set)
  - Are displayed

## Files Created/Modified

### Created Files

**Server:**
- `server/models/bannerModel.ts`
- `server/controllers/bannerController.ts`
- `server/routes/bannerRoutes.ts`

**Client:**
- `client/lib/api/services/bannerService.ts`
- `client/app/admin/banners/page.tsx`
- `client/app/admin/banners/BannersClient.tsx`
- `client/app/admin/banners/new/page.tsx`
- `client/app/admin/banners/[id]/page.tsx`

### Modified Files

**Server:**
- `server/server.ts` - Added banner routes registration

**Client:**
- `client/components/home/HeroCarousel.tsx` - Updated to use dynamic data
- `client/app/admin/layout.tsx` - Added Banners navigation item

## Technical Notes

1. **Image Handling**: The system expects image URLs (can be full URLs or relative paths). For production, consider integrating with the existing Cloudinary setup for image uploads.

2. **Date Handling**: The system supports optional scheduling with start and end dates. Banners are only shown if:
   - They are active
   - Current date is after or equal to startDate (if set)
   - Current date is before or equal to endDate (if set)

3. **Ordering**: Banners are displayed based on the `order` field (ascending). Lower numbers appear first.

4. **Error Handling**: All API calls include proper error handling with user-friendly messages.

5. **Loading States**: UI includes loading states for better user experience.

## Future Enhancements

Potential improvements that could be added:

1. **Image Upload**: Direct image upload instead of URL input
2. **Drag & Drop Reordering**: Visual reordering of banners
3. **Banner Analytics**: Track clicks and impressions
4. **A/B Testing**: Test different banner variations
5. **Template Selection**: Pre-designed banner templates
6. **Multi-language Support**: Localized banner content
7. **Click Tracking**: Track which banners get the most clicks
8. **Responsive Images**: Different images for mobile/desktop

## Testing

To test the implementation:

1. **Start the server**: Ensure MongoDB is running and start the Node.js server
2. **Start the client**: Run the Next.js development server
3. **Create test banners**: Use the admin panel to create 2-3 test banners
4. **Verify homepage**: Check that banners appear on the homepage and rotate
5. **Test CRUD operations**: Create, edit, activate/deactivate, and delete banners

## Notes

- All linter errors have been resolved
- TypeScript types are properly defined throughout
- The system follows the existing codebase patterns and conventions
- Authentication middleware is already in place for admin routes

