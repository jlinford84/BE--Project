const request = require("supertest");
const app = require("../app");
const db = require("../index");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => {
  if (db.end) db.end();
});

describe("1 GET catagories /api/catagories", () => {
    it("status 200, should return the first item from an array of catagories", () => {
      return request(app)
        .get("/api/catagorieso")
        .expect(200)
        .then(({ body }) => {
          expect(body[0].toEqual('info')
          );
        });
    });
});