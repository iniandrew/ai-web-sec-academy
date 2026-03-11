const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

let dbPromise;

async function getDb() {
  if (!dbPromise) {
    dbPromise = open({
      filename: path.join(__dirname, '..', 'academy.db'),
      driver: sqlite3.Database
    });
  }

  return dbPromise;
}

module.exports = { getDb };
