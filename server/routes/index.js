import express from 'express';
import stationRoutes from './stationRoutes.js';
import refreshServerRoutes from './refreshServerRoutes.js';
import cityRoutes from './cityRoutes.js';
import healthCheckRoutes from './healthCheckRoutes.js';

const router = express.Router();

// router.use(your router);
router.use(healthCheckRoutes);
router.use(refreshServerRoutes);
router.use(cityRoutes);
router.use(stationRoutes);

export default router;