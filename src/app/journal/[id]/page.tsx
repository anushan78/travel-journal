import { notFound, redirect } from "next/navigation";
import { journals } from "../data";

interface JournalPageProps {
  params: Promise<{ id: string }>;
}

async function deleteJournal(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  console.log("Deleting journal with id:", id);
  const index = journals.findIndex((j) => j.id === id);
  if (index !== -1) {
    journals.splice(index, 1);
    redirect("/journal");
  }
  // Placeholder for delete logic
  console.log(`Journal with id ${id} deleted.`);
}

export default async function JournalDetail({ params }: JournalPageProps) {
  const { id } = await params;
  const journal = journals.find((j) => j.id === Number(id));

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
