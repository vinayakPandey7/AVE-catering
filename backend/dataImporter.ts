import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/productModel.js";
import { uploadToCloudinary } from "./config/cloudinary.js";

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

interface ExcelProductRow {
  [key: string]: any;
}

// Function to read Excel file
const readExcelFile = (filePath: string): ExcelProductRow[] => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    return data as ExcelProductRow[];
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return [];
  }
};

// Function to extract products from Excel row based on the specific format
const extractProductsFromRow = (row: ExcelProductRow): any[] => {
  const products = [];

  // Extract first product (columns: POWDER, ARIEL, __EMPTY)
  if (row["POWDER "] && row["ARIEL "]) {
    products.push({
      sku: String(row["POWDER "]),
      name: String(row["ARIEL "]),
      price: parseFloat(row["__EMPTY"]) || 0,
      brand: "ARIEL",
      category: "Cleaning",
    });
  }

  // Extract second product (columns: POWDER, TIDE, __EMPTY_2)
  if (row["POWDER"] && row["TIDE "]) {
    products.push({
      sku: String(row["POWDER"]),
      name: String(row["TIDE "]),
      price: parseFloat(row["__EMPTY_2"]) || 0,
      brand: "TIDE",
      category: "Cleaning",
    });
  }

  return products;
};

// Function to find matching image file for a product
const findProductImage = (
  productName: string,
  productFolders: string[]
): string | null => {
  // Clean product name for matching
  const cleanName = productName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim();

  // Search through product folders
  for (const folder of productFolders) {
    const folderPath = `./data/${folder}`;
    if (!fs.existsSync(folderPath)) continue;

    try {
      const subFolders = fs
        .readdirSync(folderPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      // Look for matching subfolder
      for (const subFolder of subFolders) {
        const cleanSubFolder = subFolder
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .trim();

        // Check if product name matches folder name
        if (
          cleanName.includes(cleanSubFolder) ||
          cleanSubFolder.includes(cleanName)
        ) {
          const subFolderPath = path.join(folderPath, subFolder);
          const images = fs
            .readdirSync(subFolderPath)
            .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

          if (images.length > 0) {
            return path.join(subFolderPath, images[0]); // Return first image
          }
        }
      }
    } catch (error) {
      console.warn(
        `⚠️  Error reading folder ${folderPath}:`,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }

  return null;
};

// Function to upload image to Cloudinary
const uploadProductImage = async (
  imagePath: string,
  sku: string
): Promise<{ url: string; publicId: string } | null> => {
  try {
    if (!fs.existsSync(imagePath)) {
      console.warn(`⚠️  Image file not found: ${imagePath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const uploadResult = await uploadToCloudinary(imageBuffer, {
      folder: "ave-catering/products",
      public_id: `product_${sku}_${Date.now()}`,
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });

    console.log(`  📸 Uploaded image for SKU ${sku}`);
    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    console.error(
      `❌ Failed to upload image for SKU ${sku}:`,
      error instanceof Error ? error.message : "Unknown error"
    );
    return null;
  }
};

// Function to normalize Excel data to match our Product model
const normalizeProductData = (
  product: any,
  imageData?: { url: string; publicId: string } | null
) => {
  return {
    name: product.name || "Unknown Product",
    sku: product.sku || `SKU-${Date.now()}-${Math.random()}`,
    category: product.category || "General",
    brand: product.brand || "Unknown Brand",
    price: parseFloat(product.price) || 0,
    pricePerCase: (parseFloat(product.price) || 0) * 12, // Estimate case price
    packSize: "1 unit", // Default pack size
    unit: "unit",
    description: product.name || "No description available",
    image:
      imageData?.url || "https://via.placeholder.com/400x400?text=No+Image",
    imagePublicId: imageData?.publicId || "",
    stockQuantity: 0, // Default stock
    inStock: false,
    isFeatured: false,
    isOnOffer: false,
    rating: 0,
    numReviews: 0,
  };
};

// Main import function
const importProductData = async () => {
  console.log("🚀 Starting product data import...");

  try {
    // Connect to database
    await connectDB();

    // Define your data paths
    const excelFilePath = "./data/JUNE_PRICE_LIST_2025.xlsx";

    // Read Excel data
    console.log("📊 Reading Excel file...");
    let excelData: ExcelProductRow[] = [];

    if (fs.existsSync(excelFilePath)) {
      excelData = readExcelFile(excelFilePath);
      console.log(`✓ Found ${excelData.length} rows in Excel file`);
    } else {
      console.log("⚠️  Excel file not found, skipping...");
      process.exit(1);
    }

    // Get available product folders
    const dataPath = "./data";
    const productFolders = fs
      .readdirSync(dataPath, { withFileTypes: true })
      .filter(
        (dirent) => dirent.isDirectory() && dirent.name.startsWith("PRODUCT")
      )
      .map((dirent) => dirent.name);

    console.log(
      `📁 Found ${productFolders.length} product image folders:`,
      productFolders
    );

    // Process products
    const productsToImport = [];

    // Process first 50 rows with images for testing
    const limitedData = excelData.slice(0, 50);
    console.log(
      `📦 Processing first ${limitedData.length} rows with image upload...`
    );

    for (const [index, row] of limitedData.entries()) {
      console.log(`\n📦 Processing row ${index + 1}/${limitedData.length}...`);

      // Extract products from this row
      const extractedProducts = extractProductsFromRow(row);

      for (const product of extractedProducts) {
        // Check if product with this SKU already exists
        const existingProduct = await Product.findOne({ sku: product.sku });
        if (existingProduct) {
          console.log(`  ⚠️  SKU ${product.sku} already exists, skipping...`);
          continue;
        }

        console.log(`  🔍 Looking for image for: ${product.name}`);

        // Find matching image
        const imagePath = findProductImage(product.name, productFolders);
        let imageData = null;

        if (imagePath) {
          console.log(`  📷 Found image: ${imagePath}`);
          imageData = await uploadProductImage(imagePath, product.sku);
        } else {
          console.log(`  📷 No image found for: ${product.name}`);
        }

        const productData = normalizeProductData(product, imageData);
        productsToImport.push(productData);

        console.log(
          `  ✅ Added: ${productData.name} (${productData.sku})${
            imageData ? " with image" : ""
          }`
        );

        // Add a small delay to avoid overwhelming Cloudinary
        if (imageData) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    // Bulk insert products
    if (productsToImport.length > 0) {
      console.log(
        `💾 Importing ${productsToImport.length} products to database...`
      );
      await Product.insertMany(productsToImport);
      console.log("✅ Products imported successfully!");

      // Show sample of imported products
      console.log("\n📋 Sample of imported products:");
      productsToImport.slice(0, 5).forEach((p) => {
        console.log(`  - ${p.name} | $${p.price} | ${p.sku}`);
      });
    } else {
      console.log("ℹ️  No new products to import");
    }

    console.log("🎉 Import completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  }
};

// Run the import
if (process.argv[2] === "import") {
  importProductData();
} else {
  console.log(`
📥 Product Data Importer

Usage:
  pnpm run import:products

This will import your Excel data into the database.
  `);
}

export default importProductData;
