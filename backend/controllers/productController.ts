import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Request } from "express";
import Product from "../models/productModel.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// @desc    Fetch all products with optional category filtering
// @route   GET /api/products?category=categoryName
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 20 } = req.query;

  // Build query object
  const query: any = {};

  // Add category filter if provided
  if (category) {
    query.category = { $regex: category, $options: "i" }; // Case-insensitive search
  }

  // Add search filter if provided
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }

  // Calculate pagination
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const skip = (pageNum - 1) * limitNum;

  // Get total count for pagination
  const total = await Product.countDocuments(query);

  // Fetch products with filters and pagination
  const products = await Product.find(query)
    .limit(limitNum)
    .skip(skip)
    .sort({ createdAt: -1 });

  res.json({
    products,
    pagination: {
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      hasNext: pageNum < Math.ceil(total / limitNum),
      hasPrev: pageNum > 1,
      total,
    },
  });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(404);
    throw new Error("Product not found");
  }
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req: MulterRequest, res) => {
  const {
    name,
    sku,
    category,
    brand,
    price,
    pricePerCase,
    packSize,
    unit,
    description,
    stockQuantity,
    minStock,
  } = req.body;

  // Check if product with this SKU already exists
  const existingProduct = await Product.findOne({ sku });
  if (existingProduct) {
    res.status(400);
    throw new Error("Product with this SKU already exists");
  }

  let imageUrl = "";
  let imagePublicId = "";

  // Handle image upload to Cloudinary
  if (req.file && req.file.buffer && req.file.buffer.length > 0) {
    try {
      const uploadResult = await uploadToCloudinary(req.file.buffer, {
        folder: "ave-catering/products",
        public_id: `product_${sku}_${Date.now()}`,
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    } catch (error) {
      res.status(400);
      throw new Error("Image upload failed");
    }
  } else {
    res.status(400);
    throw new Error("Product image is required");
  }

  const product = new Product({
    name,
    sku,
    category,
    brand,
    price: parseFloat(price),
    pricePerCase: parseFloat(pricePerCase),
    packSize,
    unit,
    description,
    image: imageUrl,
    imagePublicId,
    stockQuantity: parseInt(stockQuantity) || 0,
    inStock: parseInt(stockQuantity) > 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req: MulterRequest, res) => {
  const {
    name,
    sku,
    category,
    brand,
    price,
    pricePerCase,
    packSize,
    unit,
    description,
    stockQuantity,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Handle new image upload
  let imageUrl = product.image;
  let imagePublicId = product.imagePublicId;

  if (req.file) {
    try {
      // Delete old image from Cloudinary if it exists
      if (product.imagePublicId) {
        await deleteFromCloudinary(product.imagePublicId);
      }

      // Upload new image
      const uploadResult = await uploadToCloudinary(req.file.buffer, {
        folder: "ave-catering/products",
        public_id: `product_${sku || product.sku}_${Date.now()}`,
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    } catch (error) {
      res.status(400);
      throw new Error("Image upload failed");
    }
  }

  product.name = name || product.name;
  product.sku = sku || product.sku;
  product.category = category || product.category;
  product.brand = brand || product.brand;
  product.price = price ? parseFloat(price) : product.price;
  product.pricePerCase = pricePerCase
    ? parseFloat(pricePerCase)
    : product.pricePerCase;
  product.packSize = packSize || product.packSize;
  product.unit = unit || product.unit;
  product.description = description || product.description;
  product.image = imageUrl;
  product.imagePublicId = imagePublicId;
  product.stockQuantity =
    stockQuantity !== undefined
      ? parseInt(stockQuantity)
      : product.stockQuantity;
  product.inStock = product.stockQuantity > 0;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Delete image from Cloudinary
  if (product.imagePublicId) {
    try {
      await deleteFromCloudinary(product.imagePublicId);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      // Continue with product deletion even if image deletion fails
    }
  }

  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
});

// @desc    Get all unique product categories (for backward compatibility)
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const count = await Product.countDocuments({ category });
      return { name: category, count };
    })
  );

  res.json(categoriesWithCount);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
