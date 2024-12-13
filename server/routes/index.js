import express from 'express';
import stationRoutes from './stationRoutes.js';

const router = express.Router();

// router.use(your router);
router.use(stationRoutes);

export default router;