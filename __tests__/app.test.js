const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("3 GET categories /api/categories", () => {
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

describe("4 GET reviews by id /api/reviews/:review_id", () => {
  it("status 200, should return a review object, which should have the required properties", () => {
    const review_id = 1;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then(({ body }) => {
        expect([body].length).toBe(1);
        expect(body.review.review_id).toBe(1)
        expect(body.review).toEqual(
          expect.objectContaining({
            category: expect.any(String),
            comment_count: expect.any(Number),
            created_at: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_id: expect.any(Number),
            review_img_url: expect.any(String),
            title: expect.any(String),
            votes: expect.any(Number),
          })
        );
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
        expect(body).toEqual({ msg: "invalid type" });
      });
  });
});
describe("5 GET users /api/users", () => {
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
    return request(app).get("/api/apple").expect(404);
  });
});

describe("6 PATCH /api/reviews/:review_id", () => {
  it("status 200, should add a number of votes to the selected review", () => {
    return request(app)
      .patch("/api/reviews/1")
      .expect(200)
      .send({ inc_votes: 3 })
      .then(({ body }) => {
        expect(body.review[0]).toEqual({
          review_id: 1,
          title: "Agricola",
          category: "euro game",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_body: "Farmyard fun!",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: 4,
        });
      });
  });
  it("status 404, should return an error", () => {
    const review_id = 999;
    return request(app)
      .patch(`/api/reviews/${review_id}`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "No review found for review_id:999" });
      });
  });

  it("status 400, should return an error", () => {
    return request(app)
      .patch(`/api/reviews/1`)
      .send({inc_votes: 'banana'})
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "invalid type" });
      });
  });
});

describe("7. GET /api/reviews/review_id/comments", () => {
  it("status 200, should return the comment count for a selected review", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.review.comment_count).toEqual(3);
      });
  });

  it("status 404, should return an error", () => {
    return request(app).patch(`/api/reviews/1/condiments`).expect(404);
  });
});

describe("8. GET /api/reviews", () => {
  it("status 200, should confirm a return of reviews containing all categories", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toEqual(13);
        expect(
          body.forEach((review) => {
            expect(review).toEqual(
              expect.objectContaining({
                category: expect.any(String),
                comment_count: expect.any(Number),
                created_at: expect.any(String),
                designer: expect.any(String),
                owner: expect.any(String),
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
  it('should accept a category query', () => {
    return request(app)
      .get("/api/reviews?category=owner")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toEqual(13);
        expect(body[0].owner).toBe('mallionaire')
          })
  });
  it("status 404, should return an error", () => {
    return request(app).patch(`/api/renews`).expect(404);
  });
});

describe("9. GET /api/reviews/:review_id/comments", () => {
  it('should return all comments with the corresponding reviews containing all appropriate data', () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comment.length).toEqual(3);
        expect(
          body.comment.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                body: expect.any(String),
                comment_id: expect.any(Number),
                created_at: expect.any(String),
                review_id: expect.any(Number),
                votes: expect.any(Number),
              })
            );
          })
        );
      });
  });
  it("status 404, should return an error when an inappropriate search term is used", () => {
    return request(app)
      .get(`/api/reviews/1/1`)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  it("status 400, should return an error when an inappropriate search term is used", () => {
    return request(app)
      .get(`/api/reviews/1/figs`)
      .expect(404)
  });
});
 
describe('11. GET /api/reviews (queries)', () => {
  it.only('should accept a query to sort by title and return items in order ', () => {
    return request(app)
      .get("/api/reviews?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toEqual(13);
        console.log(body[0])
        expect(body[0].owner).toBe('x')
          })
  });
});