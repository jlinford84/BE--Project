const { selectReviews, selectReviewById, updateReviewById, selectReviewComments, insertReviewComment, } = require("../models/reviews.model");

exports.getReviews = (req, res, next) => {
  selectReviews()
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((err) => {
      console.log(err);
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
  const newVotes = req.body
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
  selectReviewById(id).then
  selectReviewComments(id)
  .then((comment) => {
    res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
  })
}

exports.postReviewComment = (req, res, next) => {
  const id = req.params.review_id;
  selectReviewById(id).then((result) => {
    return insertReviewComment(req.body, id)})
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err)
    })
};