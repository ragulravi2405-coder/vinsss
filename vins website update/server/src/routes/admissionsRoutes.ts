import { Router } from 'express';
import {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication
} from '../controllers/admissionsController.js';

const router = Router();

router.post('/', submitApplication);
router.get('/', getAllApplications);
router.put('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

export default router;
