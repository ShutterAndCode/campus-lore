const express = require('express');
const healthRoutes = require('./health.routes');

const router = express.Router();

// Mount feature routes here as the app grows.
// Health check is available at GET /api/health
router.use('/health', healthRoutes);

module.exports = router;
