import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";
import http from "http";
import { initializeSocket } from "./socket/socket.js";

let server;

const startServer = async () => {
  await connectDB();

  const httpServer = http.createServer(app);

  initializeSocket(httpServer);

  server = httpServer.listen(env.PORT, () => {
    console.log(`[server] Running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });
};
//Socket.IO must attach to the actual http.Server, not directly to the Express app.

startServer();

// Graceful shutdown and safety nets
process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled Rejection:", reason);

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  console.log("[server] SIGTERM received, shutting down gracefully");

  if (server) {
    server.close(() => process.exit(0));
  }
});
