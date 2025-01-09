import express from 'express';
import stationRoutes from './stationRoutes.js';
import refreshServerRoutes from './refreshServerRoutes.js';
import cityRoutes from './cityRoutes.js';
import healthCheckRoutes from './healthCheckRoutes.js';
import priceRoutes from './priceRoutes.js';

const router = express.Router();

// router.use(your router);
router.use(healthCheckRoutes);
router.use(refreshServerRoutes);
router.use(cityRoutes);
router.use(stationRoutes);
router.use(priceRoutes);

export default router;