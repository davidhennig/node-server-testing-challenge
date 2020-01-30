const request = require("supertest");

const user = require("../api/server");

describe("user-router", function() {
  describe("DELETE /:id", function() {
    it("should DELETE a user", function() {
      return request(user)
        .delete("/api/users/1")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it("should be true", function() {
      return request(user)
        .delete("/api/users/1")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
