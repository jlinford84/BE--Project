const db = require("../db/connection");

exports.selectReviews = () => {
  let baseQuery = `SELECT * FROM reviews`;
  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};

exports.selectReviewById = (id) => {
  return db
    .query(
      `  
      SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count
        FROM reviews
        LEFT JOIN comments ON comments.review_id = reviews.review_id
        WHERE reviews.review_id = $1
        GROUP BY reviews.review_id;`, [id])
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

exports.updateReviewById = (newVotes, id) => {
  // newVotes?
  return db
  .query(`UPDATE reviews SET votes = votes + $1 WHERE review_id =$2 RETURNING *;`, 
  [newVotes.inc_votes, id])
  .then(({ rows }) => {
    return rows
  })
}