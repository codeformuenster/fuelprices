import express from 'express';
import { getPrices, getAveragePrices } from '../controllers/priceController.js';

const router = express.Router();

router.route('/prices/average-price')
  .get(getAveragePrices);
router.route('/prices/:id')
  .get(getPrices);

export default router;