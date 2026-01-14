import express from 'express';
import {
  registerValidator,
  isValidator,
  submitValidation,
  getValidations,
} from '../controllers/validationController.js';
import { authenticate, requireValidator } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authenticate, registerValidator);
router.get('/status', authenticate, isValidator);
router.post('/:scriptId', authenticate, requireValidator, submitValidation);
router.get('/:scriptId', getValidations);

export default router;
