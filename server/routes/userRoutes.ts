import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile, getUsers } from '../controllers/userController.ts';
import { protect, admin } from '../middleware/authMiddleware.ts';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
