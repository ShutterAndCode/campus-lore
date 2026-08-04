import { Router } from "express";
import passport from "../config/passport.js";
import env from "../config/env.js";
import { googleCallback } from "../controllers/auth.controller.js";
import { authenticate } from '../middlewares/auth.middleware.js';
import { getMe, refresh, logout } from '../controllers/auth.controller.js';


const router = Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags: [Auth]
 *     summary: Initiate Google OAuth login
 *     security: []
 *     responses:
 *       302:
 *         description: Redirects to Google's OAuth consent screen
 */

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

router.get("/google/failure", (req, res) => {
  const frontendUrl = new URL(env.FRONTEND_OAUTH_SUCCESS_URL);
  frontendUrl.pathname = "/unauthorized";
  frontendUrl.hash = "";

  return res.redirect(frontendUrl.toString());
});


router.get('/me', authenticate, getMe);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;