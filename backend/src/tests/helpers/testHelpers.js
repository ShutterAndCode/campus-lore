import User from "../../models/user.model.js";
import { generateAccessToken } from "../../utils/jwt.js";

export const createTestUser = async (overrides = {}) => {
  const user = await User.create({
    googleId: `google-${Date.now()}`,
    email: `test${Date.now()}@mnit.ac.in`,
    organization: "mnit.ac.in",
    name: "Test User",
    ...overrides,
  });

  return user;
};

export const generateTestToken = (user) => {
  return generateAccessToken(user);
};