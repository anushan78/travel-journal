import { redirect } from "next/navigation";
import { journals, JournalEntry } from "../../data";
import { notFound } from "next/navigation";

interface EditJournalPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Server action to update the journal entry
async function updateJournal(formdata: FormData) {
  "use server";

  const id = Number(formdata.get("id"));
  const journal = journals.find((j) => j.id === id);
  if (!journal) {
    return;
  }

  journal.title = formdata.get("title")?.toString() || journal.title;
  journal.date = formdata.get("date")?.toString() || journal.date;
  journal.content = formdata.get("content")?.toString() || journal.content;

  redirect(`/journal/${id}`);
}

export default async function EditJournal({ params }: EditJournalPageProps) {
  const { id } = await params;
  const journalId = parseInt(id, 10);
  const journal = journals.find((j) => j.id === journalId);

  if (!journal) {
    notFound();
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Journal Entry</h1>
      <form action={updateJournal} className="space-y-4">
        <div>
          <input type="hidden" name="id" value={journalId} />
          <label className="block mb-1 font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={journal.title}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            name="date"
            defaultValue={journal.date}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="content">
            Content
          </label>
          <textarea
            name="content"
            rows={6}
            defaultValue={journal.content}
            className="w-full border p-2 rounded h-40"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
