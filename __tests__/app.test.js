const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("1 GET categories /api/categories", () => {
  it("status 200, should confirm a return of categories containing a description and a slug", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toEqual(4);
        expect(
          body.forEach((category) => {
            expect(category).toEqual(
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

describe("2 GET reviews by id /api/reviews/:review_id", () => {
  it("status 200, should confirm a return of reviews containing all categories", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toEqual(13);
        expect(
          body.forEach((category) => {
            expect(category).toEqual(
              expect.objectContaining({
                category: expect.any(String),
                created_at: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
                review_body: expect.any(String),
                review_id: expect.any(Number),
                review_img_url: expect.any(String),
                title: expect.any(String),
                votes: expect.any(Number),
              })
            );
          })
        );
      });
  });
  it("status 200, should return a review object, which should have the required properties", () => {
    const review_id = 1;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then(({ body }) => {
        expect([body].length).toEqual(1);
        expect(body).toEqual({
          review: {
            category: "euro game",
            created_at: "2021-01-18T10:00:20.514Z",
            designer: "Uwe Rosenberg",
            owner: "mallionaire",
            review_body: "Farmyard fun!",
            review_id: 1,
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            title: "Agricola",
            votes: 1,
          },
        });
      });
  });
  it("status 404, should return an error", () => {
    const review_id = 1000;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "No review found for review_id:1000" });
      });
  });
  it("status 400, should return an error", () => {
    const review_id = "banana";
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "invalid id type" });
      });
  });
});
describe("3 GET users /api/users", () => {
  it("status 200, should confirm a return of categories containing a description and a slug", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toEqual(4);
        expect(
          body.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                avatar_url: expect.any(String),
                name: expect.any(String),
                username: expect.any(String),
              })
            );
          })
        );
      });
  });
  it("status 404, should ", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
});
