import { redirect } from "next/navigation";
import { JournalEntry, journals } from "../data";

async function createJournalEntry(formData: FormData) {
  "use server"; //Required for server actions

  const title = formData.get("title")?.toString() ?? "";
  const date = formData.get("date")?.toString() ?? "";
  const content = formData.get("content")?.toString() ?? "";

  if (!title || !date || !content) return;

  const newEntry: JournalEntry = {
    id: journals.length + 1,
    title,
    date,
    content,
  };

  journals.push(newEntry);
  redirect(`/journal/${newEntry.id}`);
}

export default function NewJournalPage() {
  return (
    <main className="p-6 bg-white rounded shadow">
      <h1>Add New Journal Entry</h1>
      <form action={createJournalEntry} className="space-y-4 mt-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={5}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Entry
        </button>
      </form>
    </main>
  );
}
