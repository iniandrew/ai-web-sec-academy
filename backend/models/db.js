const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let dbPromise;

async function getDb() {
  if (!dbPromise) {
    const dbPath = process.env.SQLITE_PATH
      ? path.resolve(process.env.SQLITE_PATH)
      : path.join(__dirname, '..', 'academy.db');

    dbPromise = open({
      filename: dbPath,
      driver: sqlite3.Database
    });
  }

  return dbPromise;
}

module.exports = { getDb };
