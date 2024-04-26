const sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./var/db/myapp.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQLite database.");
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT,
  profile_pic_url TEXT
)`);

module.exports = db;
