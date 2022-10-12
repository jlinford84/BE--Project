const { selectReviews, selectReviewById, updateReviewById,} = require("../models/reviews.model");

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
