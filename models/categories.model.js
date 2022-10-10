const db = require("../db/connection");

exports.selectCategories = () => {
  
  let baseQuery = `SELECT * FROM categories`;

//   console.log(baseQuery)
  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};
