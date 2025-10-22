'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SubCategory {
  id: string;
  name: string;
  href: string;
  subcategories?: SubCategory[];
}

interface CategoryItem {
  id: string;
  name: string;
  href: string;
  subcategories?: SubCategory[];
}

interface CategoryGroup {
  title: string;
  items: CategoryItem[];
}

const categoryData: CategoryGroup[] = [
  {
    title: "Wow! Deals",
    items: [
      { 
        id: "beverages", 
        name: "Beverages", 
        href: "/category/beverages", 
        subcategories: [
          { 
            id: "soda", 
            name: "Soda", 
            href: "/category/beverages/soda",
            subcategories: [
              { id: "cola", name: "Cola", href: "/category/beverages/soda/cola" },
              { id: "lemon-lime", name: "Lemon Lime", href: "/category/beverages/soda/lemon-lime" },
              { id: "orange", name: "Orange", href: "/category/beverages/soda/orange" },
              { id: "root-beer", name: "Root Beer", href: "/category/beverages/soda/root-beer" },
            ]
          },
          { 
            id: "juice", 
            name: "Juice", 
            href: "/category/beverages/juice",
            subcategories: [
              { id: "apple-juice", name: "Apple Juice", href: "/category/beverages/juice/apple" },
              { id: "orange-juice", name: "Orange Juice", href: "/category/beverages/juice/orange" },
              { id: "grape-juice", name: "Grape Juice", href: "/category/beverages/juice/grape" },
            ]
          },
          { id: "water", name: "Water", href: "/category/beverages/water" },
          { id: "energy-drinks", name: "Energy Drinks", href: "/category/beverages/energy-drinks" },
        ]
      },
      { 
        id: "candy-snacks", 
        name: "Candy & Snacks", 
        href: "/category/candy-snacks", 
        subcategories: [
          { 
            id: "chocolate", 
            name: "Chocolate", 
            href: "/category/candy-snacks/chocolate",
            subcategories: [
              { id: "milk-chocolate", name: "Milk Chocolate", href: "/category/candy-snacks/chocolate/milk" },
              { id: "dark-chocolate", name: "Dark Chocolate", href: "/category/candy-snacks/chocolate/dark" },
              { id: "white-chocolate", name: "White Chocolate", href: "/category/candy-snacks/chocolate/white" },
            ]
          },
          { 
            id: "gummy", 
            name: "Gummy Candy", 
            href: "/category/candy-snacks/gummy",
            subcategories: [
              { id: "gummy-bears", name: "Gummy Bears", href: "/category/candy-snacks/gummy/bears" },
              { id: "gummy-worms", name: "Gummy Worms", href: "/category/candy-snacks/gummy/worms" },
              { id: "gummy-fruits", name: "Gummy Fruits", href: "/category/candy-snacks/gummy/fruits" },
            ]
          },
          { id: "chips", name: "Chips", href: "/category/candy-snacks/chips" },
          { id: "nuts", name: "Nuts", href: "/category/candy-snacks/nuts" },
        ]
      },
      { 
        id: "cleaning", 
        name: "Cleaning & Laundry", 
        href: "/category/cleaning", 
        subcategories: [
          { id: "detergents", name: "Detergents", href: "/category/cleaning/detergents" },
          { id: "disinfectants", name: "Disinfectants", href: "/category/cleaning/disinfectants" },
          { id: "paper-products", name: "Paper Products", href: "/category/cleaning/paper-products" },
        ]
      },
      { 
        id: "health-beauty", 
        name: "Health & Beauty", 
        href: "/category/health-beauty", 
        subcategories: [
          { id: "personal-care", name: "Personal Care", href: "/category/health-beauty/personal-care" },
          { id: "cosmetics", name: "Cosmetics", href: "/category/health-beauty/cosmetics" },
          { id: "vitamins", name: "Vitamins", href: "/category/health-beauty/vitamins" },
        ]
      },
      { 
        id: "grocery", 
        name: "Grocery", 
        href: "/category/grocery", 
        subcategories: [
          { id: "canned-foods", name: "Canned Foods", href: "/category/grocery/canned-foods" },
          { id: "pasta", name: "Pasta", href: "/category/grocery/pasta" },
          { id: "rice", name: "Rice", href: "/category/grocery/rice" },
          { id: "cereals", name: "Cereals", href: "/category/grocery/cereals" },
        ]
      },
      { 
        id: "ice-cream", 
        name: "Ice Cream", 
        href: "/category/ice-cream", 
        subcategories: [
          { id: "premium", name: "Premium", href: "/category/ice-cream/premium" },
          { id: "novelties", name: "Novelties", href: "/category/ice-cream/novelties" },
          { id: "sherbet", name: "Sherbet", href: "/category/ice-cream/sherbet" },
        ]
      },
      { 
        id: "frozen", 
        name: "Frozen Food", 
        href: "/category/frozen", 
        subcategories: [
          { id: "vegetables", name: "Frozen Vegetables", href: "/category/frozen/vegetables" },
          { id: "meals", name: "Frozen Meals", href: "/category/frozen/meals" },
          { id: "desserts", name: "Frozen Desserts", href: "/category/frozen/desserts" },
        ]
      },
      { 
        id: "restaurant", 
        name: "Restaurant Essentials", 
        href: "/category/restaurant", 
        subcategories: [
          { id: "cooking-oils", name: "Cooking Oils", href: "/category/restaurant/cooking-oils" },
          { id: "spices", name: "Spices", href: "/category/restaurant/spices" },
          { id: "condiments", name: "Condiments", href: "/category/restaurant/condiments" },
        ]
      },
      { 
        id: "mexican", 
        name: "Hecho en Mexico", 
        href: "/category/mexican", 
        subcategories: [
          { id: "mexican-snacks", name: "Mexican Snacks", href: "/category/mexican/snacks" },
          { id: "mexican-beverages", name: "Mexican Beverages", href: "/category/mexican/beverages" },
          { id: "mexican-candy", name: "Mexican Candy", href: "/category/mexican/candy" },
        ]
      },
      { 
        id: "household", 
        name: "Household & Kitchen", 
        href: "/category/household", 
        subcategories: [
          { id: "kitchen-tools", name: "Kitchen Tools", href: "/category/household/kitchen-tools" },
          { id: "storage", name: "Storage", href: "/category/household/storage" },
          { id: "cleaning-supplies", name: "Cleaning Supplies", href: "/category/household/cleaning-supplies" },
        ]
      },
      { 
        id: "tobacco", 
        name: "Tobacco", 
        href: "/category/tobacco", 
        subcategories: [
          { id: "cigarettes", name: "Cigarettes", href: "/category/tobacco/cigarettes" },
          { id: "cigars", name: "Cigars", href: "/category/tobacco/cigars" },
          { id: "smokeless", name: "Smokeless", href: "/category/tobacco/smokeless" },
        ]
      },
      { 
        id: "pet", 
        name: "Pet", 
        href: "/category/pet", 
        subcategories: [
          { id: "dog-food", name: "Dog Food", href: "/category/pet/dog-food" },
          { id: "cat-food", name: "Cat Food", href: "/category/pet/cat-food" },
          { id: "pet-treats", name: "Pet Treats", href: "/category/pet/treats" },
        ]
      },
      { 
        id: "other", 
        name: "Other", 
        href: "/category/other", 
        subcategories: [
          { id: "office-supplies", name: "Office Supplies", href: "/category/other/office-supplies" },
          { id: "seasonal", name: "Seasonal", href: "/category/other/seasonal" },
        ]
      },
      { 
        id: "auto-electronics", 
        name: "Auto & Electronics", 
        href: "/category/auto-electronics", 
        subcategories: [
          { id: "car-care", name: "Car Care", href: "/category/auto-electronics/car-care" },
          { id: "electronics", name: "Electronics", href: "/category/auto-electronics/electronics" },
        ]
      },
    ]
  },
  {
    title: "Shop",
    items: [
      { 
        id: "candy", 
        name: "Candy", 
        href: "/category/candy", 
        subcategories: [
          { id: "gummy-chewy", name: "Gummy & Chewy Candy", href: "/category/candy/gummy-chewy" },
          { id: "gum-mints", name: "Gum & Mints", href: "/category/candy/gum-mints" },
          { id: "hard-candy", name: "Hard Candy & Lollipops", href: "/category/candy/hard-candy" },
          { id: "kids-novelty", name: "Kids Novelty Candy", href: "/category/candy/kids-novelty" },
          { id: "mexican-candy", name: "Mexican Candy", href: "/category/candy/mexican-candy" },
        ]
      },
      { 
        id: "chocolate", 
        name: "Chocolate", 
        href: "/category/chocolate", 
        subcategories: [
          { id: "milk-chocolate", name: "Milk Chocolate", href: "/category/chocolate/milk" },
          { id: "dark-chocolate", name: "Dark Chocolate", href: "/category/chocolate/dark" },
          { id: "white-chocolate", name: "White Chocolate", href: "/category/chocolate/white" },
          { id: "chocolate-bars", name: "Chocolate Bars", href: "/category/chocolate/bars" },
        ]
      },
      { 
        id: "snacks", 
        name: "Snacks", 
        href: "/category/snacks", 
        subcategories: [
          { id: "chips", name: "Chips", href: "/category/snacks/chips" },
          { id: "crackers", name: "Crackers", href: "/category/snacks/crackers" },
          { id: "nuts", name: "Nuts", href: "/category/snacks/nuts" },
          { id: "trail-mix", name: "Trail Mix", href: "/category/snacks/trail-mix" },
        ]
      },
      { 
        id: "chips", 
        name: "Chips", 
        href: "/category/chips", 
        subcategories: [
          { id: "potato-chips", name: "Potato Chips", href: "/category/chips/potato" },
          { id: "corn-chips", name: "Corn Chips", href: "/category/chips/corn" },
          { id: "tortilla-chips", name: "Tortilla Chips", href: "/category/chips/tortilla" },
          { id: "pita-chips", name: "Pita Chips", href: "/category/chips/pita" },
        ]
      },
      { 
        id: "cookies", 
        name: "Cookies", 
        href: "/category/cookies", 
        subcategories: [
          { id: "chocolate-chip", name: "Chocolate Chip", href: "/category/cookies/chocolate-chip" },
          { id: "oatmeal", name: "Oatmeal", href: "/category/cookies/oatmeal" },
          { id: "sugar-cookies", name: "Sugar Cookies", href: "/category/cookies/sugar" },
          { id: "sandwich-cookies", name: "Sandwich Cookies", href: "/category/cookies/sandwich" },
        ]
      },
    ]
  },
  {
    title: "All Candy",
    items: [
      { id: "gummy-chewy", name: "Gummy & Chewy Candy", href: "/category/gummy-chewy" },
      { id: "gum-mints", name: "Gum & Mints", href: "/category/gum-mints" },
      { id: "hard-candy", name: "Hard Candy & Lollipops", href: "/category/hard-candy" },
      { id: "kids-novelty", name: "Kids Novelty Candy", href: "/category/kids-novelty" },
      { id: "mexican-candy", name: "Mexican Candy", href: "/category/mexican-candy" },
    ]
  }
];

export default function CategoriesDropdown(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [activeSubcategories, setActiveSubcategories] = useState<SubCategory[]>([]);
  const [activeSubSubcategories, setActiveSubSubcategories] = useState<SubCategory[]>([]);

  const handleCategoryHover = (category: CategoryItem): void => {
    setHoveredCategory(category.id);
    if (category.subcategories) {
      setActiveSubcategories(category.subcategories);
    } else {
      setActiveSubcategories([]);
    }
    setHoveredSubcategory(null);
    setActiveSubSubcategories([]);
  };

  const handleSubcategoryHover = (subcategory: SubCategory): void => {
    setHoveredSubcategory(subcategory.id);
    if (subcategory.subcategories) {
      setActiveSubSubcategories(subcategory.subcategories);
    } else {
      setActiveSubSubcategories([]);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="gap-2 text-gray-700 hover:text-primary hover:bg-primary/10"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        Categories
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-200"
          style={{
            width: activeSubcategories.length > 0 
              ? activeSubSubcategories.length > 0 
                ? '600px' 
                : '400px'
              : '300px'
          }}
          onMouseLeave={() => {
            setIsOpen(false);
            setHoveredCategory(null);
            setHoveredSubcategory(null);
            setActiveSubcategories([]);
            setActiveSubSubcategories([]);
          }}
        >
          <Card className="p-6">
            <div className="flex gap-6">
              {/* Column 1: Main Categories (Wow! Deals) */}
              <div className="space-y-4" style={{ width: activeSubcategories.length > 0 ? '200px' : '300px' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    NEW EXCITING
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Wow! Deals</h3>
                </div>
                <div className="space-y-2">
                  {categoryData[0].items.map((item: CategoryItem) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-2 rounded-md hover:bg-primary/10 transition-colors cursor-pointer ${
                        hoveredCategory === item.id ? 'bg-primary/10 text-primary' : 'text-gray-700'
                      }`}
                      onMouseEnter={() => handleCategoryHover(item)}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.subcategories && (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Dynamic Subcategories - Only show when hovering */}
              {activeSubcategories.length > 0 && (
                <div className="space-y-4 border-l border-gray-200 pl-6" style={{ width: '200px' }}>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {categoryData.find(group => 
                      group.items.some(item => item.id === hoveredCategory)
                    )?.items.find(item => item.id === hoveredCategory)?.name || 'Subcategories'}
                  </h3>
                  <div className="space-y-2">
                    {activeSubcategories.map((subcategory: SubCategory) => (
                      <div
                        key={subcategory.id}
                        className={`flex items-center justify-between p-2 rounded-md hover:bg-primary/10 transition-colors cursor-pointer ${
                          hoveredSubcategory === subcategory.id ? 'bg-primary/10 text-primary' : 'text-gray-700'
                        }`}
                        onMouseEnter={() => handleSubcategoryHover(subcategory)}
                      >
                        <span className="text-sm font-medium">{subcategory.name}</span>
                        {subcategory.subcategories && (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Column 3: Dynamic Sub-Subcategories - Only show when hovering over subcategory */}
              {activeSubSubcategories.length > 0 && (
                <div className="space-y-4 border-l border-gray-200 pl-6" style={{ width: '200px' }}>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {activeSubcategories.find(sub => sub.id === hoveredSubcategory)?.name || 'Subcategories'}
                  </h3>
                  <div className="space-y-2">
                    {activeSubSubcategories.map((subSubcategory: SubCategory) => (
                      <Link
                        key={subSubcategory.id}
                        href={subSubcategory.href}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-primary/10 transition-colors text-gray-700"
                      >
                        <span className="text-sm font-medium">{subSubcategory.name}</span>
                        {subSubcategory.subcategories && (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </Card>
        </div>
      )}
    </div>
  );
}