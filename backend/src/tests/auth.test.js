import request from "supertest";
import app from "../app.js";

describe("Authentication middleware", () => {
  it("should reject requests without a token", async () => {
    const res = await request(app).get("/api/v1/profile/me");

    expect(res.statusCode).toBe(401);
  });

  it("should reject requests with an invalid token", async () => {
    const res = await request(app)
      .get("/api/v1/profile/me")
      .set("Authorization", "Bearer invalid-token");

    expect(res.statusCode).toBe(401);
  });
});