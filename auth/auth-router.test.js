const request = require("supertest");
const db = require("../data/dbConfig.js");
const auth = require("../api/server");

describe("auth-router", function() {
  describe("POST /register", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });
    it("should create/register a new user", function() {
      return request(auth)
        .post("/api/auth/register")
        .send({ username: "test", password: "test", department: "test" })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it("should have username of test", function() {
      return request(auth)
        .post("/api/auth/register")
        .send({ username: "test2", password: "test2", department: "test2" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
});
