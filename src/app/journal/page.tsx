import Link from "next/link";
import { JournalEntry } from "./data";

async function fetchJournals(): Promise<JournalEntry[]> {
  const response = await fetch("http://localhost:3000/api/journals", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch journals");
  }
  return response.json();
}

export default async function JournalPage() {
  const journals = await fetchJournals();

  return (
    <main className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">My Trips</h1>
      <Link
        href="/journal/new"
        className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add New Journal
      </Link>
      <ul className="space-y-3">
        {journals.map((journal) => (
          <li key={journal.id} className="border-b pb-2">
            <Link
              href={`/journal/${journal.id}`}
              className="text-blue-600 hover:underline"
            >
              {journal.title} -{" "}
              <span className="text-sm text-gray-500">{journal.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
