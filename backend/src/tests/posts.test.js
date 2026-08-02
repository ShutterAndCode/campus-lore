import request from "supertest";
import app from "../app.js";
import { createTestUser, generateTestToken } from "./helpers/testHelpers.js";

describe("Posts endpoints", () => {
  it("POST /posts should create a post", async () => {
    const user = await createTestUser();
    const token = generateTestToken(user);

    const res = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Post",
        content: "This is a test post",
        academicYear: "3rd",
        department: "Electrical Engineering",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Test Post");
  });

  it("GET /posts should return the public feed", async () => {
    const res = await request(app).get("/api/v1/posts");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("POST /posts should require authentication", async () => {
    const res = await request(app).post("/api/v1/posts").send({
      title: "Unauthorized",
      content: "Should fail",
    });

    expect(res.statusCode).toBe(401);
  });
});
