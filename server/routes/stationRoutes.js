import express from 'express';

const router = express.Router();

import { createBulk } from '../controllers/stationController.js';

router.route('/station')
  .post(createBulk);

export default router;