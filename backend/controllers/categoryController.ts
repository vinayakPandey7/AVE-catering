import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Request } from "express";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// @desc    Get all categories with hierarchical structure
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  try {
    // Get all main categories (no parent)
    const mainCategories = await Category.find({ 
      parentCategory: null,
      isActive: true 
    })
    .sort({ displayOrder: 1, name: 1 })
    .populate({
      path: 'subcategories',
      match: { isActive: true },
      options: { sort: { displayOrder: 1, name: 1 } }
    });

    // Update product count for each category
    const categoriesWithCount = await Promise.all(
      mainCategories.map(async (category) => {
        const productCount = await Product.countDocuments({ 
          category: { $regex: category.name, $options: 'i' } 
        });
        
        // Also get subcategories with product counts
        const subcategoriesWithCount = await Promise.all(
          category.subcategories.map(async (subcat: any) => {
            const subProductCount = await Product.countDocuments({ 
              category: { $regex: subcat.name, $options: 'i' } 
            });
            return {
              ...subcat.toObject(),
              productCount: subProductCount
            };
          })
        );

        return {
          ...category.toObject(),
          productCount,
          subcategories: subcategoriesWithCount
        };
      })
    );

    res.json(categoriesWithCount);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching categories');
  }
});

// @desc    Get category by slug
// @route   GET /api/categories/:slug
// @access  Public
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ 
    slug: req.params.slug,
    isActive: true 
  }).populate({
    path: 'subcategories',
    match: { isActive: true },
    options: { sort: { displayOrder: 1, name: 1 } }
  });

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  // Get product count for this category
  const productCount = await Product.countDocuments({ 
    category: { $regex: category.name, $options: 'i' } 
  });

  res.json({
    ...category.toObject(),
    productCount
  });
});

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req: MulterRequest, res) => {
  const {
    name,
    description,
    parentCategoryId,
    displayOrder
  } = req.body;

  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    res.status(400);
    throw new Error('Category with this name already exists');
  }

  let imageUrl = "";
  let imagePublicId = "";

  // Handle image upload to Cloudinary
  if (req.file && req.file.buffer && req.file.buffer.length > 0) {
    try {
      const uploadResult = await uploadToCloudinary(req.file.buffer, {
        folder: "ave-catering/categories",
        public_id: `category_${name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
        transformation: [
          { width: 400, height: 300, crop: "limit" },
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

  const categoryData: any = {
    name,
    description,
    displayOrder: displayOrder ? parseInt(displayOrder) : 0,
    image: imageUrl,
    imagePublicId
  };

  // If parent category is specified, set it
  if (parentCategoryId) {
    if (!mongoose.Types.ObjectId.isValid(parentCategoryId)) {
      res.status(400);
      throw new Error('Invalid parent category ID');
    }
    
    const parentCategory = await Category.findById(parentCategoryId);
    if (!parentCategory) {
      res.status(404);
      throw new Error('Parent category not found');
    }
    
    categoryData.parentCategory = parentCategoryId;
  }

  const category = new Category(categoryData);
  const createdCategory = await category.save();

  // If this is a subcategory, add it to parent's subcategories array
  if (parentCategoryId) {
    await Category.findByIdAndUpdate(
      parentCategoryId,
      { $addToSet: { subcategories: createdCategory._id } }
    );
  }

  res.status(201).json(createdCategory);
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req: MulterRequest, res) => {
  const {
    name,
    description,
    displayOrder,
    isActive
  } = req.body;

  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  // Handle new image upload
  let imageUrl = category.image;
  let imagePublicId = category.imagePublicId;

  if (req.file) {
    try {
      // Delete old image from Cloudinary if it exists
      if (category.imagePublicId) {
        await deleteFromCloudinary(category.imagePublicId);
      }

      // Upload new image
      const uploadResult = await uploadToCloudinary(req.file.buffer, {
        folder: "ave-catering/categories",
        public_id: `category_${(name || category.name).toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
        transformation: [
          { width: 400, height: 300, crop: "limit" },
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

  category.name = name || category.name;
  category.description = description || category.description;
  category.displayOrder = displayOrder !== undefined ? parseInt(displayOrder) : category.displayOrder;
  category.isActive = isActive !== undefined ? isActive : category.isActive;
  category.image = imageUrl;
  category.imagePublicId = imagePublicId;

  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  // Check if category has products
  const productCount = await Product.countDocuments({ 
    category: { $regex: category.name, $options: 'i' } 
  });

  if (productCount > 0) {
    res.status(400);
    throw new Error("Cannot delete category with existing products");
  }

  // Check if category has subcategories
  if (category.subcategories && category.subcategories.length > 0) {
    res.status(400);
    throw new Error("Cannot delete category with subcategories");
  }

  // Delete image from Cloudinary
  if (category.imagePublicId) {
    try {
      await deleteFromCloudinary(category.imagePublicId);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  }

  // Remove from parent category's subcategories array if it's a subcategory
  if (category.parentCategory) {
    await Category.findByIdAndUpdate(
      category.parentCategory,
      { $pull: { subcategories: category._id } }
    );
  }

  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted successfully" });
});

// @desc    Get category tree structure
// @route   GET /api/categories/tree
// @access  Public
const getCategoryTree = asyncHandler(async (req, res) => {
  try {
    // Get all categories
    const allCategories = await Category.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 });

    // Build tree structure
    const categoryMap = new Map();
    const rootCategories: any[] = [];

    // First pass: create map of all categories
    allCategories.forEach(category => {
      categoryMap.set(category._id.toString(), {
        ...category.toObject(),
        subcategories: []
      });
    });

    // Second pass: build tree structure
    allCategories.forEach(category => {
      const categoryObj = categoryMap.get(category._id.toString());
      
      if (category.parentCategory) {
        const parent = categoryMap.get(category.parentCategory.toString());
        if (parent) {
          parent.subcategories.push(categoryObj);
        }
      } else {
        rootCategories.push(categoryObj);
      }
    });

    res.json(rootCategories);
  } catch (error) {
    res.status(500);
    throw new Error('Error building category tree');
  }
});

export {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree,
};
