const {
  selectReviews,
  selectReviewById,
  updateReviewById,
  selectReviewComments,
  insertReviewComment,
} = require("../models/reviews.model");
const endpoints = require('../endpoints.json');

exports.getAPI = (req, res, next) => {
  res.status(200).send(endpoints)
}

exports.getReviews = (req, res, next) => {
  const sort_by = req.query.sort_by;
  const order = req.query.order;
  const category = req.query.category;
  selectReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const id = req.params.review_id;
  selectReviewById(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewById = (req, res, next) => {
  const id = req.params.review_id;
  const newVotes = req.body;
  updateReviewById(newVotes, id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewComments = (req, res, next) => {
  const id = req.params.review_id;
  selectReviewById(id).then;
  selectReviewComments(id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postReviewComment = (req, res, next) => {
  const id = req.params.review_id;
  selectReviewById(id)
    .then((result) => {
      return insertReviewComment(req.body, id);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  const id = req.params.review_id;
  selectReviewById(id)
    .then((result) => {
      return removeCommentById(id)
    })  
    .then((comment) => {
      res.status(204).send({ comment })
    })
    .catch((err) => {
      next(err);
    });
};