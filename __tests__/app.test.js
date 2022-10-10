const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("1 GET categories /api/categories", () => {
    it("status 200, should return the first item from an array of categories", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
            expect(
                body.forEach((treasure) => {
                  expect(treasure).toEqual(
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String),
                    })
                  );
                })
              );
            });
        });
    });