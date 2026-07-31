import { Router } from "express";
import passport from "../config/passport.js";
import { googleCallback } from "../controllers/auth.controller.js";
import ApiError from "../utils/ApiError.js";
import { authenticate } from '../middlewares/auth.middleware.js';
import { getMe, refresh, logout } from '../controllers/auth.controller.js';


const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/v1/auth/google/failure",
  }),
  googleCallback
);

router.get("/google/failure", (req, res, next) => {
  return next(
    new ApiError(401, "Google authentication failed or domain not permitted")
  );
});


router.get('/me', authenticate, getMe);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;