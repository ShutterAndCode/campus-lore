import request from "supertest";
import app from "../app.js";

describe("GET /health", () => {
  it("should return 200 and a healthy status", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});