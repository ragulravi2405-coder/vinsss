import { Router } from 'express';
import { getAllDocuments, createDocument, updateDocument, deleteDocument } from '../controllers/documentsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllDocuments);
router.post('/', requireAdminAuth, createDocument);
router.put('/:id', requireAdminAuth, updateDocument);
router.delete('/:id', requireAdminAuth, deleteDocument);

export default router;
