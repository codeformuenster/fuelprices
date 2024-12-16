import express from 'express';

const router = express.Router();

import { refreshServer } from '../controllers/downTimeResolverController.js';

router.route('/refresh')
  .get(refreshServer);

export default router;