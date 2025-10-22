import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getOrders } from '../controllers/orderController.ts';
import { protect, admin } from '../middleware/authMiddleware.ts';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/:id').get(protect, getOrderById);

export default router;
