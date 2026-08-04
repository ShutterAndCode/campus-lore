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

  it("should redirect unauthorized Google auth failures to the frontend unauthorized page", async () => {
    const res = await request(app).get("/api/v1/auth/google/failure");

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toBe("http://localhost:5173/unauthorized");
  });
});