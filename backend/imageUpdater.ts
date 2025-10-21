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

  // Try different matching strategies
  const matchingStrategies = [
    (name: string, folderName: string) =>
      name.includes(folderName) || folderName.includes(name),
    (name: string, folderName: string) => {
      const nameWords = name.split(" ");
      const folderWords = folderName.split(" ");
      return nameWords.some((word) =>
        folderWords.some(
          (fWord) => word.includes(fWord) || fWord.includes(word)
        )
      );
    },
  ];

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

        // Try different matching strategies
        for (const strategy of matchingStrategies) {
          if (strategy(cleanName, cleanSubFolder)) {
            const subFolderPath = path.join(folderPath, subFolder);
            const images = fs
              .readdirSync(subFolderPath)
              .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

            if (images.length > 0) {
              return path.join(subFolderPath, images[0]); // Return first image
            }
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

// Main function to update products with images
const updateProductsWithImages = async () => {
  console.log("🖼️  Starting to update products with images...");

  try {
    // Connect to database
    await connectDB();

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

    // Get products without images (using placeholder)
    const productsWithoutImages = await Product.find({
      $or: [
        { image: { $regex: "placeholder", $options: "i" } },
        { image: "" },
        { image: { $exists: false } },
      ],
    }).limit(20); // Process 20 at a time

    console.log(
      `🔍 Found ${productsWithoutImages.length} products without images`
    );

    let updatedCount = 0;

    for (const [index, product] of productsWithoutImages.entries()) {
      console.log(
        `\n📦 Processing ${index + 1}/${productsWithoutImages.length}: ${
          product.name
        }`
      );

      // Find matching image
      const imagePath = findProductImage(product.name, productFolders);

      if (imagePath) {
        console.log(`  📷 Found image: ${imagePath}`);
        const imageData = await uploadProductImage(imagePath, product.sku);

        if (imageData) {
          // Update product with new image
          await Product.findByIdAndUpdate(product._id, {
            image: imageData.url,
            imagePublicId: imageData.publicId,
          });

          console.log(`  ✅ Updated ${product.name} with new image`);
          updatedCount++;

          // Add delay to avoid overwhelming Cloudinary
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      } else {
        console.log(`  📷 No image found for: ${product.name}`);
      }
    }

    console.log(`\n🎉 Updated ${updatedCount} products with images!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Update failed:", error);
    process.exit(1);
  }
};

// Run the update
if (process.argv[2] === "update-images") {
  updateProductsWithImages();
} else {
  console.log(`
🖼️  Product Image Updater

Usage:
  node --loader ts-node/esm imageUpdater.ts update-images

This will update existing products with images from your product folders.
  `);
}

export default updateProductsWithImages;
