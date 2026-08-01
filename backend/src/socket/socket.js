import { Server } from 'socket.io';
import { verifyAccessToken } from '../utils/jwt.js';
import User from '../models/user.model.js';
import { verifyParticipant } from '../services/conversation.service.js';

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL, // Replace with centralized env config if available
      credentials: true,
    },
  });

  // Authenticate every socket connection
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;

      if (!token) {
        return next(new Error('Authentication required'));
      }

      const payload = verifyAccessToken(token);

      const user = await User.findById(payload.id);

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.data.user = user;

      next();
    } catch (error) {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('conversation:join', async (conversationId) => {
      try {
        await verifyParticipant(conversationId, socket.data.user._id);

        socket.join(`conversation:${conversationId}`);

        socket.emit('conversation:joined', {
          conversationId,
        });
      } catch (error) {
        socket.emit('socket:error', {
          message: error.message,
        });
      }
    });

    socket.on('conversation:leave', (conversationId) => {
      socket.leave(`conversation:${conversationId}`);

      socket.emit('conversation:left', {
        conversationId,
      });
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }

  return io;
};