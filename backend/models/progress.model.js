const { getDb } = require('./db');

async function initProgressTable() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic TEXT NOT NULL,
      module_title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      UNIQUE(topic, module_title)
    );
  `);
}

async function upsertProgress(topic, moduleTitle, completed) {
  const db = await getDb();
  const now = new Date().toISOString();

  await db.run(
    `INSERT INTO progress (topic, module_title, completed, updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(topic, module_title)
     DO UPDATE SET completed = excluded.completed, updated_at = excluded.updated_at`,
    [topic, moduleTitle, completed ? 1 : 0, now]
  );
}

async function getTopicProgress(topic) {
  const db = await getDb();
  return db.all(
    `SELECT topic, module_title as moduleTitle, completed, updated_at as updatedAt
     FROM progress
     WHERE topic = ?
     ORDER BY module_title ASC`,
    [topic]
  );
}

async function getProgressSummary() {
  const db = await getDb();
  return db.all(`
    SELECT topic,
           COUNT(*) as moduleCount,
           SUM(completed) as completedCount
    FROM progress
    GROUP BY topic
    ORDER BY topic ASC
  `);
}

module.exports = {
  initProgressTable,
  upsertProgress,
  getTopicProgress,
  getProgressSummary
};
