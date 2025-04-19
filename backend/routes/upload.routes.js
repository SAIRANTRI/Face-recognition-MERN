import express from 'express';
import { uploadReferenceImage, uploadPoolImages } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js'; 

const router = express.Router();

// Route to upload the reference image
router.post('/reference', protect, uploadReferenceImage);

// Route to upload pool images
router.post('/pool', protect, uploadPoolImages);

export default router;
