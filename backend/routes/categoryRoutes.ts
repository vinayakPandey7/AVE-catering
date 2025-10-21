import express from "express";
const router = express.Router();
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTree,
} from "../controllers/categoryController.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";
// import { protect, admin } from '../middleware/authMiddleware.js'; // Uncomment when auth is needed

// Public routes
router.route("/").get(getCategories);
router.route("/tree").get(getCategoryTree);
router.route("/:slug").get(getCategoryBySlug);

// Admin routes (protected)
router.route("/admin/create").post(uploadSingle, createCategory); // Add auth: protect, admin, 
router.route("/admin/:id")
  .put(uploadSingle, updateCategory) // Add auth: protect, admin,
  .delete(deleteCategory); // Add auth: protect, admin,

export default router;
