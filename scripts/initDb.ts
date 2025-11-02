import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "journals.db");
const db = new Database(dbPath);

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS journals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `);
  console.log("Database initialized.");
}

initDb();
