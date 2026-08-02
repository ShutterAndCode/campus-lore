import swaggerJsdoc from 'swagger-jsdoc';
import env from './env.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CampusLore API',
      version: '1.0.0',
      description: 'API documentation for CampusLore- a campus knowledge-sharing platform.',
    },
    servers: [
      {
        url: `${env.API_BASE_URL || 'http://localhost:5000'}/api/v1`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Health', description: 'Service health checks' },
      { name: 'Auth', description: 'Authentication via Google OAuth' },
      { name: 'Profile', description: 'User profile management' },
      { name: 'Mentorship', description: 'Mentorship requests and relationships' },
      { name: 'Conversations', description: 'Mentorship conversations' },
      { name: 'Messages', description: 'Messaging within conversations' },
      { name: 'Notifications', description: 'User notifications' },
      { name: 'Posts', description: 'Experience posts, reactions, and comments' },
      { name: 'Reports', description: 'Content reporting and moderation' },
    ],
  },
  apis: [
    './src/routes/health.routes.js',
    './src/routes/auth.routes.js',
    './src/routes/profile.routes.js',
    './src/routes/post.routes.js',
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);