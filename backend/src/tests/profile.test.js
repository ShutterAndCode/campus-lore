import request from "supertest";
import app from "../app.js";
import {
  createTestUser,
  generateTestToken,
} from "./helpers/testHelpers.js";

describe("Profile endpoints", () => {
  it("GET /profile/me should return the authenticated user profile", async () => {
    const user = await createTestUser();
    const token = generateTestToken(user);

    const res = await request(app)
      .get("/api/v1/profile/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(user.email);

    // Sensitive fields should not be exposed
    expect(res.body.data.refreshToken).toBeUndefined();
  });

  it("PATCH /profile/me should update profile", async () => {
    const user = await createTestUser();
    const token = generateTestToken(user);

    const res = await request(app)
      .patch("/api/v1/profile/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        bio: "Updated bio",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.bio).toBe("Updated bio");
  });

  it("PATCH /profile/me should reject unknown fields", async () => {
    const user = await createTestUser();
    const token = generateTestToken(user);

    const res = await request(app)
      .patch("/api/v1/profile/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        role: "admin",
      });

    expect(res.statusCode).toBe(400);
  });
});