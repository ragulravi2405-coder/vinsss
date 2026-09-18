import { Router } from 'express';
import {
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} from '../controllers/galleryController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllGalleryImages);
router.post('/', requireAdminAuth, createGalleryImage);
router.put('/:id', requireAdminAuth, updateGalleryImage);
router.delete('/:id', requireAdminAuth, deleteGalleryImage);

export default router;
