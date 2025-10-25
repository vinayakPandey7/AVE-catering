import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../controllers/productController.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";
import { protect, admin } from '../middleware/authMiddleware.js'; // Uncomment when auth is needed

router.route("/").get(getProducts).post(uploadSingle, createProduct); // Add auth middleware when ready: protect, admin, uploadSingle, createProduct

router.route("/categories").get(getCategories);

router
  .route("/:id")
  .get(getProductById)
  .put(uploadSingle,protect, updateProduct) // Add auth middleware when ready: protect, admin, uploadSingle, updateProduct
  .delete(deleteProduct); // Add auth middleware when ready: protect, admin, deleteProduct

export default router;
