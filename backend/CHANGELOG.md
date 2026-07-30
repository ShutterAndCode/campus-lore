# Changelog

All notable changes to **CampusLore** will be documented in this file.

The project follows milestone-based development. Each milestone represents a complete, tested, and committed unit of work.

---

## B1.1 - Authentication Foundation

**Status:** ✅ Completed

### Added

* Created the `User` model with fields required for Google OAuth authentication.
* Added JWT utility functions for generating access and refresh tokens.
* Configured `cookie-parser` middleware.
* Extended environment configuration with JWT secrets and expiry variables.
* Added authentication-related configuration for future milestones.

### Architecture Decisions

* Adopted Google OAuth as the only authentication method.
* Password-based authentication will not be supported.
* User accounts are uniquely identified by Google ID and institutional email.
* JWT generation is isolated into reusable utility functions.
* Refresh tokens will be stored securely using HTTP-only cookies.

### Verified

* User model validates correctly.
* JWT access and refresh tokens are generated successfully.
* Environment variables load correctly.
* Cookie parser is configured successfully.

### Commit

`feat(auth): add user model and JWT utilities`

---

## B0 - Project Foundation

**Status:** ✅ Completed

### Added

* Initialized Express.js backend.
* Connected MongoDB using Mongoose.
* Configured environment variables with dotenv.
* Added centralized environment configuration.
* Configured CORS, Helmet, Compression, and Morgan middleware.
* Implemented centralized error handling.
* Added global 404 handler.
* Created reusable `ApiError`, `ApiResponse`, and `asyncHandler` utilities.
* Added API versioning structure.
* Implemented health check endpoint.
* Established scalable backend folder structure.
* Added development and production scripts.
* Configured Git ignore rules and environment template.

### Architecture Decisions

* Adopted layered architecture:

  ```
  Route
      ↓
  Validator
      ↓
  Controller
      ↓
  Service
      ↓
  Model
      ↓
  MongoDB
  ```

* Standardized feature structure using controllers, services, validators, models, and routes.

* Business logic resides in services.

* Controllers remain responsible only for request handling and responses.

* Validators are dedicated to request validation.

### Verified

* Server starts successfully.
* MongoDB connection established.
* Health endpoint responds successfully.
* Global error handling works correctly.
* Unknown routes return standardized 404 responses.

### Commit

`feat(init): setup backend foundation`
