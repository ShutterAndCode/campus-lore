// src/config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { findOrCreateGoogleUser } from "../services/auth.service.js";
import env from "./env.js";

const allowedDomains = env.ALLOWED_EMAIL_DOMAINS.split(",").map((d) =>
  d.trim(),
);
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const isVerified = profile.emails?.[0]?.verified;

        console.log("Verified:", isVerified);
        console.log("Allowed Domains:", allowedDomains);

        if (!email || !isVerified) {
          console.log("FAILED: Email missing or not verified");
          return done(null, false, { message: "Google email not verified" });
        }

        const domain = email.split("@")[1];
        console.log("Detected Domain:", domain);

        if (!allowedDomains.includes(domain)) {
          console.log("FAILED: Domain not permitted");
          return done(null, false, { message: "Email domain not permitted" });
        }

        console.log("Creating/Finding user...");

        const user = await findOrCreateGoogleUser(profile);

        console.log("SUCCESS:", user.email);

        return done(null, user);
      } catch (err) {
        console.error("[passport]", err);

        return done(err);
      }
    },
  ),
);

export default passport;
