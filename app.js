const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const {
  getReviews,
  getReviewById,
  patchReviewById,
  getReviewComments,
  postReviewComment,
} = require("./controllers/reviews.controller");
const { getUsers } = require("./controllers/users.controller");
const { deleteCommentById } = require('./controllers/comments.controller')

const {
  handlePSQLErrors,
  handleCustomErrors,
  handleInternalErrors,
} = require("./controllers/errors.controller");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/users/", getUsers);

app.get("/api/reviews/", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
app.get("/api/reviews/:review_id/comments", getReviewComments);

app.post("/api/reviews/:review_id/comments", postReviewComment);

app.patch("/api/reviews/:review_id", patchReviewById);

app.delete('/api/comments/:comment_id', deleteCommentById);

app.use(handlePSQLErrors);

app.use(handleCustomErrors);

app.use(handleInternalErrors);

module.exports = app;
