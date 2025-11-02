import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "journals.db");

export function getDb(): Database.Database {
  return new Database(dbPath);
}
