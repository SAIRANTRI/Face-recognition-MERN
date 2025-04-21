import express from 'express';
import { getUserProfile, getUserUploadHistory } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Protected routes
router.get('/profile', protect, getUserProfile);
router.get('/history', protect, getUserUploadHistory); 

export default router;
