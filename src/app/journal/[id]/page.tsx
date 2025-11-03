import { notFound } from "next/navigation";
import { JournalEntry } from "../data";
import { deleteJournal } from "@/app/actions/journals";

interface JournalPageProps {
  params: Promise<{ id: string }>;
}

export async function getJournalById(id: number): Promise<JournalEntry | null> {
  const res = await fetch(`http://localhost:3000/api/journals`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  const data: JournalEntry[] = await res.json();
  return data.find((journal) => journal.id === id) || null;
}

export default async function JournalDetail({ params }: JournalPageProps) {
  const { id } = await params;
  const journal = await getJournalById(Number(id));
  console.log(journal);

  if (!journal) {
    notFound();
  }

  return (
    <main className="p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{journal.title}</h1>
      <p className="text-gray-500 mb-6">{journal.date}</p>
      <div className="text-gray-700 whitespace-pre-line">{journal.content}</div>
      <form action={deleteJournal} className="mt-6">
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete Journal
        </button>
      </form>
      <a
        href={`/journal/${Number(id)}/edit`}
        className="inline-block mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Edit Journal
      </a>
    </main>
  );
}
