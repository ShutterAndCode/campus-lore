const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');

let server;

const startServer = async () => {
  await connectDB();

  server = app.listen(env.PORT, () => {
    console.log(`[server] Running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
};

startServer();

// Graceful shutdown and safety nets
process.on('unhandledRejection', (reason) => {
  console.error('[server] Unhandled Rejection:', reason);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  console.log('[server] SIGTERM received, shutting down gracefully');
  if (server) server.close(() => process.exit(0));
});
