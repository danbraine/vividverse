import express from 'express';
import {
  submitScript,
  getScript,
  getPendingScripts,
  getAllScripts,
  getTopScript,
} from '../controllers/scriptController.js';
import { upload } from '../services/fileUpload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, upload.single('file'), submitScript);
router.get('/pending', authenticate, getPendingScripts);
router.get('/all', getAllScripts);
router.get('/top', getTopScript);
router.get('/:id', getScript);

export default router;
