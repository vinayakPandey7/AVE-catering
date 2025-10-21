import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Category from "../models/categoryModel.js";
import dotenv from "dotenv";

dotenv.config();

const categories = [
  {
    name: "Beverages",
    description: "All types of beverages including sodas, juices, water, and energy drinks",
    displayOrder: 1,
    subcategories: [
      { name: "Soda", description: "Carbonated soft drinks", displayOrder: 1 },
      { name: "Juice", description: "Fruit juices and concentrates", displayOrder: 2 },
      { name: "Water", description: "Still and sparkling water", displayOrder: 3 },
      { name: "Energy Drinks", description: "Energy and sports drinks", displayOrder: 4 }
    ]
  },
  {
    name: "Candy & Snacks",
    description: "Sweet treats and savory snacks",
    displayOrder: 2,
    subcategories: [
      { name: "Candy", description: "Chocolates, gummies, and hard candies", displayOrder: 1 },
      { name: "Chips", description: "Potato chips and corn snacks", displayOrder: 2 },
      { name: "Nuts", description: "Mixed nuts and seeds", displayOrder: 3 }
    ]
  },
  {
    name: "Cleaning & Laundry",
    description: "Household cleaning supplies and laundry products",
    displayOrder: 3,
    subcategories: [
      { name: "Detergent", description: "Laundry detergents and fabric softeners", displayOrder: 1 },
      { name: "Cleaning Supplies", description: "All-purpose cleaners and disinfectants", displayOrder: 2 },
      { name: "Paper Products", description: "Paper towels and tissues", displayOrder: 3 }
    ]
  },
  {
    name: "Health & Beauty",
    description: "Personal care and health products",
    displayOrder: 4,
    subcategories: [
      { name: "Personal Care", description: "Shampoo, soap, toothpaste", displayOrder: 1 },
      { name: "Skincare", description: "Lotions and skincare products", displayOrder: 2 },
      { name: "Health Products", description: "Vitamins and first aid", displayOrder: 3 }
    ]
  },
  {
    name: "Grocery",
    description: "Pantry staples and everyday grocery items",
    displayOrder: 5,
    subcategories: [
      { name: "Canned Goods", description: "Canned vegetables, fruits, and soups", displayOrder: 1 },
      { name: "Pasta & Rice", description: "Pasta, rice, and grains", displayOrder: 2 },
      { name: "Condiments", description: "Sauces, dressings, and seasonings", displayOrder: 3 }
    ]
  },
  {
    name: "Ice Cream",
    description: "Frozen desserts and ice cream products",
    displayOrder: 6,
    subcategories: [
      { name: "Premium Ice Cream", description: "High-quality ice cream brands", displayOrder: 1 },
      { name: "Frozen Treats", description: "Popsicles and frozen bars", displayOrder: 2 },
      { name: "Sherbet & Sorbet", description: "Fruit-based frozen desserts", displayOrder: 3 }
    ]
  },
  {
    name: "Frozen Food",
    description: "Frozen meals and ingredients",
    displayOrder: 7,
    subcategories: [
      { name: "Frozen Meals", description: "Ready-to-eat frozen dinners", displayOrder: 1 },
      { name: "Frozen Vegetables", description: "Frozen vegetable mixes", displayOrder: 2 },
      { name: "Frozen Meat", description: "Frozen poultry, beef, and seafood", displayOrder: 3 }
    ]
  },
  {
    name: "Restaurant Essentials",
    description: "Bulk supplies for restaurants and food service",
    displayOrder: 8,
    subcategories: [
      { name: "Bulk Ingredients", description: "Large quantity ingredients", displayOrder: 1 },
      { name: "Disposables", description: "Plates, cups, and utensils", displayOrder: 2 },
      { name: "Kitchen Supplies", description: "Professional kitchen tools", displayOrder: 3 }
    ]
  },
  {
    name: "Hecho en Mexico",
    description: "Authentic Mexican products and ingredients",
    displayOrder: 9,
    subcategories: [
      { name: "Mexican Beverages", description: "Traditional Mexican drinks", displayOrder: 1 },
      { name: "Mexican Snacks", description: "Authentic Mexican snack foods", displayOrder: 2 },
      { name: "Mexican Ingredients", description: "Cooking ingredients from Mexico", displayOrder: 3 }
    ]
  },
  {
    name: "Household & Kitchen",
    description: "Kitchen tools and household items",
    displayOrder: 10,
    subcategories: [
      { name: "Kitchen Tools", description: "Cooking utensils and gadgets", displayOrder: 1 },
      { name: "Storage", description: "Food storage containers", displayOrder: 2 },
      { name: "Small Appliances", description: "Kitchen appliances", displayOrder: 3 }
    ]
  },
  {
    name: "Tobacco",
    description: "Tobacco products (age-restricted)",
    displayOrder: 11,
    subcategories: [
      { name: "Cigarettes", description: "Various cigarette brands", displayOrder: 1 },
      { name: "Cigars", description: "Premium and standard cigars", displayOrder: 2 },
      { name: "Accessories", description: "Lighters and ashtrays", displayOrder: 3 }
    ]
  },
  {
    name: "Pet",
    description: "Pet food and supplies",
    displayOrder: 12,
    subcategories: [
      { name: "Dog Food", description: "Dry and wet dog food", displayOrder: 1 },
      { name: "Cat Food", description: "Dry and wet cat food", displayOrder: 2 },
      { name: "Pet Treats", description: "Treats and snacks for pets", displayOrder: 3 }
    ]
  },
  {
    name: "Other",
    description: "Miscellaneous items",
    displayOrder: 13,
    subcategories: [
      { name: "Electronics", description: "Small electronics and batteries", displayOrder: 1 },
      { name: "Seasonal", description: "Holiday and seasonal items", displayOrder: 2 },
      { name: "Gift Cards", description: "Various gift cards", displayOrder: 3 }
    ]
  }
];

const seedCategories = async () => {
  try {
    await connectDB();
    
    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Create main categories first
    const createdMainCategories = [];
    
    for (const categoryData of categories) {
      const { subcategories, ...mainCategoryData } = categoryData;
      
      const mainCategory = new Category(mainCategoryData);
      const savedMainCategory = await mainCategory.save();
      createdMainCategories.push({ ...savedMainCategory.toObject(), originalSubcategories: subcategories });
      
      console.log(`Created main category: ${savedMainCategory.name}`);
    }

    // Create subcategories and link them to main categories
    for (const mainCategory of createdMainCategories) {
      const subcategoryIds = [];
      
      for (const subCategoryData of mainCategory.originalSubcategories) {
        const subCategory = new Category({
          ...subCategoryData,
          parentCategory: mainCategory._id
        });
        
        const savedSubCategory = await subCategory.save();
        subcategoryIds.push(savedSubCategory._id);
        
        console.log(`Created subcategory: ${savedSubCategory.name} under ${mainCategory.name}`);
      }

      // Update main category with subcategory references
      await Category.findByIdAndUpdate(
        mainCategory._id,
        { subcategories: subcategoryIds }
      );
    }

    console.log('Category seeding completed successfully!');
    console.log(`Created ${categories.length} main categories with their subcategories`);
    
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Only run seeder if this file is executed directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedCategories();
}

export default seedCategories;
