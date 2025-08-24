import express from 'express';
const router = express.Router();
import metrics from '../routes/metrics.js';

router.use('/metrics', metrics);

export default router;