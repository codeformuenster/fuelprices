import express from 'express';

const router = express.Router();

import { createBulk, getStationsList } from '../controllers/stationController.js';

router.route('/station')
  .post(createBulk)
  .get(getStationsList)

export default router;