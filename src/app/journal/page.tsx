import Link from "next/link";

const journals = [
  { id: 1, title: "Trip to Japan", date: "2023-04-15" },
  { id: 2, title: "Exploring Italy", date: "2023-05-22" },
  { id: 3, title: "Adventures in Canada", date: "2023-06-10" },
];

export default function JournalPage() {
  return (
    <main className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">My Trips</h1>
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
