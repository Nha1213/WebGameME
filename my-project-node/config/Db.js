const Db = require("mysql2/promise");

const db = Db.createPool({
  host: "localhost",
  user: "root",
  password: "Nha1213",
  database: "webgame",
});

module.exports = db;
