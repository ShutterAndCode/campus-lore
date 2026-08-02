// External packages
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import { globalLimiter } from "./middlewares/rateLimit.middleware.js";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import { morganMiddleware } from './middlewares/morgan.middleware.js';

// Internal configuration
import env from "./config/env.js";
import passport from "./config/passport.js";

// Routes
import routes from "./routes/index.js";

// Middleware
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

//trsuted proxy
app.set("trust proxy", 1);

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);

// Response compression
app.use(compression());
//http parameter pollution
app.use(hpp());

// Passport
app.use(passport.initialize());

// Request logging
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  }),
);

app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));// swagger

app.use(morganMiddleware);//morgan for logging

// API routes
app.use("/api/v1", globalLimiter, routes);

// 404 handler
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

export default app;
