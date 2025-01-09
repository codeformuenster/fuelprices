import express from 'express';

const router = express.Router();

import { healthCheck } from '../controllers/healthCheckController.js';

router.route('/health-check')
  .get(healthCheck);

export default router;