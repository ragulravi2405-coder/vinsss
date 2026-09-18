import { Router } from 'express';
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification
} from '../controllers/notificationsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllNotifications);
router.get('/:id', getNotificationById);
router.post('/', requireAdminAuth, createNotification);
router.put('/:id', requireAdminAuth, updateNotification);
router.delete('/:id', requireAdminAuth, deleteNotification);

export default router;
