const db = require("../db/connection");

exports.removeCommentById = (id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [id])
    .then(({ rows }) => {
      if (rows.length > 0) {
        const comment = rows[0];
        return comment, "Has been removed";
      }
      return Promise.reject({
        status: 404,
        msg: `No comment found for comment_id:${id}`,
      });
    });
};
