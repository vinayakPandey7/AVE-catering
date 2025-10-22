#!/usr/bin/env node

// Simple script to seed the database with sample data
const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

// Sample categories data
const sampleCategories = [
  {
    name: 'Beverages',
    slug: 'beverages',
    description: 'Soft drinks, juices, and other beverages',
    displayOrder: 1,
    isActive: true
  },
  {
    name: 'Snacks',
    slug: 'snacks', 
    description: 'Chips, crackers, and snack foods',
    displayOrder: 2,
    isActive: true
  },
  {
    name: 'Cleaning',
    slug: 'cleaning',
    description: 'Cleaning supplies and detergents',
    displayOrder: 3,
    isActive: true
  },
  {
    name: 'Grocery',
    slug: 'grocery',
    description: 'Food items and groceries',
    displayOrder: 4,
    isActive: true
  },
  {
    name: 'Health & Beauty',
    slug: 'health-beauty',
    description: 'Personal care and beauty products',
    displayOrder: 5,
    isActive: true
  }
];

// Sample products data
const sampleProducts = [
  {
    name: 'Coca-Cola 24pk Cans',
    sku: 'BEV-001',
    category: 'Beverages',
    brand: 'Coca-Cola',
    price: 12.99,
    pricePerCase: 155.88,
    packSize: '24 cans',
    unit: 'case',
    description: 'Classic Coca-Cola in 12oz cans, 24 pack case',
    stockQuantity: 250,
    minStock: 50,
    isFeatured: true,
    isOnOffer: false
  },
  {
    name: 'Lay\'s Potato Chips Box (40 bags)',
    sku: 'SNK-002',
    category: 'Snacks',
    brand: 'Lay\'s',
    price: 15.99,
    pricePerCase: 191.88,
    packSize: '40 bags',
    unit: 'box',
    description: 'Classic Lay\'s potato chips in individual bags',
    stockQuantity: 45,
    minStock: 30,
    isFeatured: true,
    isOnOffer: true
  },
  {
    name: 'Tide Laundry Detergent 150oz',
    sku: 'CLN-003',
    category: 'Cleaning',
    brand: 'Tide',
    price: 18.99,
    pricePerCase: 227.88,
    packSize: '150oz',
    unit: 'bottle',
    description: 'Tide Original liquid laundry detergent',
    stockQuantity: 12,
    minStock: 20,
    isFeatured: false,
    isOnOffer: false
  },
  {
    name: 'Rice 50lb Bag',
    sku: 'GRC-004',
    category: 'Grocery',
    brand: 'Generic',
    price: 45.99,
    pricePerCase: 551.88,
    packSize: '50lb',
    unit: 'bag',
    description: 'Long grain white rice, 50 pound bag',
    stockQuantity: 5,
    minStock: 15,
    isFeatured: false,
    isOnOffer: true
  },
  {
    name: 'Water Bottles 24pk',
    sku: 'BEV-005',
    category: 'Beverages',
    brand: 'Aquafina',
    price: 5.99,
    pricePerCase: 71.88,
    packSize: '24 bottles',
    unit: 'case',
    description: 'Purified water bottles, 16.9oz each',
    stockQuantity: 0,
    minStock: 100,
    isFeatured: false,
    isOnOffer: false
  },
  {
    name: 'Paper Towels 12pk',
    sku: 'HH-006',
    category: 'Household',
    brand: 'Bounty',
    price: 22.99,
    pricePerCase: 275.88,
    packSize: '12 rolls',
    unit: 'pack',
    description: 'Bounty paper towels, 2-ply',
    stockQuantity: 180,
    minStock: 50,
    isFeatured: true,
    isOnOffer: false
  }
];

async function seedData() {
  console.log('🌱 Starting data seeding...\n');

  try {
    // Test API connection
    console.log('1. Testing API connection...');
    const healthResponse = await axios.get(`${API_BASE.replace('/api', '')}/health`);
    console.log('✅ API is running on port', healthResponse.data.environment);
    console.log('');

    // Add categories
    console.log('2. Adding categories...');
    for (const category of sampleCategories) {
      try {
        const response = await axios.post(`${API_BASE}/categories/admin/create`, category);
        console.log(`✅ Added category: ${category.name}`);
      } catch (error) {
        if (error.response?.status === 400 && error.response.data?.message?.includes('already exists')) {
          console.log(`⚠️  Category already exists: ${category.name}`);
        } else {
          console.log(`❌ Failed to add category ${category.name}:`, error.response?.data?.message || error.message);
        }
      }
    }
    console.log('');

    // Add products
    console.log('3. Adding products...');
    for (const product of sampleProducts) {
      try {
        const response = await axios.post(`${API_BASE}/products`, product);
        console.log(`✅ Added product: ${product.name}`);
      } catch (error) {
        if (error.response?.status === 400 && error.response.data?.message?.includes('already exists')) {
          console.log(`⚠️  Product already exists: ${product.name}`);
        } else {
          console.log(`❌ Failed to add product ${product.name}:`, error.response?.data?.message || error.message);
        }
      }
    }
    console.log('');

    // Verify data
    console.log('4. Verifying data...');
    const productsResponse = await axios.get(`${API_BASE}/products`);
    const categoriesResponse = await axios.get(`${API_BASE}/categories`);
    
    console.log(`✅ Products in database: ${productsResponse.data.products.length}`);
    console.log(`✅ Categories in database: ${categoriesResponse.data.length}`);
    console.log('');

    console.log('🎉 Data seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   - Categories: ${categoriesResponse.data.length}`);
    console.log(`   - Products: ${productsResponse.data.products.length}`);
    console.log(`   - API Base URL: ${API_BASE}`);
    console.log('\n🚀 You can now view the data in your client application!');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    process.exit(1);
  }
}

// Run the seeding
seedData();
