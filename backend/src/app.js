// External packages
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Internal configuration
import env from "./config/env.js";
import passport from "./config/passport.js";

// Routes
import routes from "./routes/index.js";

// Middleware
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// Passport
app.use(passport.initialize());

// Response compression
app.use(compression());

// Request logging
app.use(
  morgan(env.NODE_ENV === "production" ? "combined" : "dev")
);

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(cookieParser());

// API routes
app.use("/api/v1", routes);


// 404 handler
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

export default app;