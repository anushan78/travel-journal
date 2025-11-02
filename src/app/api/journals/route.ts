import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const journals = db
    .prepare("SELECT * FROM journals ORDER BY date DESC")
    .all();
  db.close();
  return NextResponse.json(journals);
}

export async function POST(request: NextRequest) {
  const db = getDb();
  const data = await request.json();
  const { title, date, content } = data;

  const stmt = db.prepare(
    "INSERT INTO journals (title, date, content) VALUES (?, ?, ?)"
  );
  const info = stmt.run(title, date, content);
  db.close();

  return NextResponse.json({ id: info.lastInsertRowid, title, date, content });
}

export async function DELETE(request: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const stmt = db.prepare("DELETE FROM journals WHERE id = ?");
  stmt.run(id);
  db.close();
  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const db = getDb();
  const data = await request.json();
  const { id, title, date, content } = data;

  const stmt = db.prepare(
    "UPDATE journals SET title = ?, date = ?, content = ? WHERE id = ?"
  );
  stmt.run(title, date, content, id);
  db.close();

  return NextResponse.json({ id, title, date, content });
}
