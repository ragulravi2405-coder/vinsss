import { Router } from 'express';
import { getAllSettings, getSettingByKey, updateSetting } from '../controllers/settingsController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllSettings);
router.get('/:key', getSettingByKey);
router.put('/:key', requireAdminAuth, updateSetting);

export default router;
