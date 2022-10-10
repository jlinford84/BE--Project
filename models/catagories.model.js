const db = require("../index");

exports.selectCatagories = () => {
  
  let baseQuery = `SELECT * FROM catagories`;

  console.log(baseQuery)
  return db.query(baseQuery).then(({ rows }) => {
    return rows;
  });
};
