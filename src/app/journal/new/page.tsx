import { redirect } from "next/navigation";
import { JournalEntry, journals } from "../data";
import EntryCard from "@/components/journal/EntryCard";

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
      <EntryCard action={createJournalEntry} />
    </main>
  );
}
