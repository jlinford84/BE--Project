const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const { getReviews, getReviewById } = require("./controllers/reviews.controller");
const { handlePSQLErrors, handleCustomErrors, handleInternalErrors } = require('./controllers/errors.controller')

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/", getReviews);
app.get("/api/reviews/:review_id", getReviewById);
// app.get("/api/users/", getUsers)

app.use(handlePSQLErrors)

app.use(handleCustomErrors);

app.use(handleInternalErrors);

module.exports = app;
