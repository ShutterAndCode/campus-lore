const mongoose = require('mongoose');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const DB_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

/**
 * GET /api/health
 * Reports basic service liveness and current DB connection state.
 */
const getHealth = asyncHandler(async (req, res) => {
  const payload = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: DB_STATES[mongoose.connection.readyState] || 'unknown',
  };

  res.status(200).json(new ApiResponse(200, payload, 'Service is healthy'));
});

module.exports = { getHealth };
