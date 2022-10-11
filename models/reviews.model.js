const db = require("../db/connection");

exports.selectReviews = () => {
  let baseQuery = `SELECT * FROM reviews`;
  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};

exports.selectReviewById = (id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id =$1;`, [id])
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id:${id}`,
        });
      }
      return review;
    });
};
