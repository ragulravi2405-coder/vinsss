import { Router } from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', requireAdminAuth, createEvent);
router.put('/:id', requireAdminAuth, updateEvent);
router.delete('/:id', requireAdminAuth, deleteEvent);

export default router;
