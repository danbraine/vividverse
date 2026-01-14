import express from 'express';
import {
  startMovieGeneration,
  getMovie,
  updateMovieProgress,
  getAggregatedScore,
} from '../controllers/movieController.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate/:scriptId', authenticate, startMovieGeneration);
router.get('/:scriptId', getMovie);
router.put('/:movieId/progress', authenticate, requireAdmin, updateMovieProgress);
router.get('/:scriptId/score', getAggregatedScore);

export default router;
