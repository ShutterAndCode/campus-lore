# CampusLore Backend

Backend foundation for CampusLore, built with Node.js, Express, and MongoDB (Mongoose).

## Stack

- Express.js
- MongoDB via Mongoose
- dotenv for configuration
- helmet, cors, compression, morgan for security/perf/logging

## Folder Structure

```
src/
├── config/        # env loading, DB connection
├── controllers/    # request handlers
├── routes/         # route definitions
├── middlewares/    # error handling, 404, etc.
├── utils/          # ApiError, ApiResponse, asyncHandler
├── app.js          # Express app (middleware + routes)
└── server.js        # Entry point (DB connect + listen)
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in values:
   ```
   cp .env.example .env
   ```
3. Run in development (auto-restart via nodemon):
   ```
   npm run dev
   ```
4. Run in production:
   ```
   npm start
   ```

## Health Check

`GET /api/health` — returns service uptime and MongoDB connection status.

## Error Handling

- Throw `ApiError(statusCode, message, errors)` from anywhere inside an `asyncHandler`-wrapped controller.
- All errors are normalized and returned as JSON by the centralized `errorHandler` middleware.
- Unmatched routes return a standardized 404 via the `notFound` middleware.
