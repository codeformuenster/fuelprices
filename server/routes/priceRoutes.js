import express from 'express';
import { getPrices } from '../controllers/priceController.js';

const router = express.Router();

router.route('/prices/:id')
  .get(getPrices);

export default router;