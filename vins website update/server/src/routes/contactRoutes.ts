import { Router } from 'express';
import {
  submitContactInquiry,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/contactController.js';

const router = Router();

router.post('/', submitContactInquiry);
router.get('/', getAllInquiries);
router.put('/:id/status', updateInquiryStatus);
router.delete('/:id', deleteInquiry);

export default router;
