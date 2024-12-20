import express from 'express';
import stationRoutes from './stationRoutes.js';
import refreshServerRoutes from './refreshServerRoutes.js';
import cityRoutes from './cityRoutes.js';

const router = express.Router();

// router.use(your router);
router.use(stationRoutes);
router.use(refreshServerRoutes);
router.use(cityRoutes);

export default router;