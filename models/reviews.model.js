const db = require("../db/connection");

exports.selectReviews = (sort_by = "created_at", order = "DESC", category) => {
  const validSearch = [
    "created_at",
    "title",
    "designer",
    "owner",
    "review_img_url",
    "review_body",
    "category",
    "votes",
  ];
  if (!validSearch.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "invalid value" });
  }

  let baseQuery = `
  SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count
FROM reviews
LEFT JOIN comments ON comments.review_id = reviews.review_id`;
  let query = [];
  if (category !== undefined) {
    query.push(category);
    baseQuery += ` WHERE category = $1`;
  }
  baseQuery += `
  GROUP BY reviews.review_id
  ORDER BY ${sort_by} ${order};`;
  return db.query(baseQuery, query).then(({ rows }) => {
    const review = rows[0];
    if (!review) {
      return Promise.reject({
        status: 404,
        msg: `No review found for review_id:${id}`,
      });
    }
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
        GROUP BY reviews.review_id;`,
      [id]
    )
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
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id =$2 RETURNING *;`,
      [newVotes.inc_votes, id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id:${id}`,
        });
      }
      return rows;
    });
};

exports.selectReviewComments = (id) => {
  return db
    .query(`SELECT * FROM comments WHERE comments.review_id = $1;`, [id])
    .then(({ rows }) => {
      const comments = rows;
      return comments;
    });
};

exports.insertReviewComment = (newComment, id) => {
  const { username, body } = newComment;
  return db
    .query(
      `INSERT INTO comments (author, body, review_id) 
    VALUES ($1, $2, $3) RETURNING *;`,
      [username, body, id]
    )
    .then(({ rows }) => {
      const comment = rows[0];
      return comment;
    });
};

