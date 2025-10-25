import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getAvailableCategories,
} from "../controllers/productController.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";
import { protect, admin } from '../middleware/authMiddleware.js'; // Uncomment when auth is needed

router.route("/").get(getProducts).post(uploadSingle, protect, admin, createProduct); // Admin only - create product

router.route("/categories").get(getCategories);
router.route("/categories/available").get(getAvailableCategories);

router
  .route("/:id")
  .get(getProductById)
  .put(uploadSingle, protect, admin, updateProduct) // Admin only - update product
  .delete(protect, admin, deleteProduct); // Admin only - delete product

export default router;
