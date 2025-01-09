import express from 'express';

const router = express.Router();

import { getCityList } from '../controllers/cityController.js';

router.route('/cities')
  .get(getCityList);

export default router;