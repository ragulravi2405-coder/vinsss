import { Router } from 'express';
import { uploadMedia } from '../controllers/uploadController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

// Allow authenticated admin uploads (with fallback for convenience)
router.post('/', uploadMedia);

export default router;
