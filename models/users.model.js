const db = require("../db/connection");

exports.selectUsers = () => {
  let baseQuery = `SELECT * FROM users`;
  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};
