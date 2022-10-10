const { selectReviews, selectReviewById } = require("../models/reviews.model");

exports.getReviews = (req, res) => {
  selectReviews()
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getReviewById = (req, res) => {
  const id = req.params.review_id;
  selectReviewById(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      console.log(err);
    });
};
