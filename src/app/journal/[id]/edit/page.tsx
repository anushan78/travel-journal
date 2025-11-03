import { redirect, notFound } from "next/navigation";
import { JournalEntry } from "../../data";
import EntryCard from "@/components/journal/EntryCard";

interface EditJournalPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Server action to update the journal entry
async function updateJournal(formdata: FormData): Promise<void> {
  "use server";
  console.log("Form Data received in server action:", formdata);
  const id = Number(formdata.get("id"));
  const res = await fetch(`http://localhost:3000/api/journals`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return;
  }
  const data: JournalEntry[] = await res.json();
  const journal = data.find((entry) => entry.id === id) || null;
  if (!journal) {
    return;
  }

  journal.title = formdata.get("title")?.toString() || journal.title;
  journal.date = formdata.get("date")?.toString() || journal.date;
  journal.content = formdata.get("content")?.toString() || journal.content;

  await fetch(`http://localhost:3000/api/journals`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journal),
  });

  redirect(`/journal/${id}`);
}

export default async function EditJournal({ params }: EditJournalPageProps) {
  const { id } = await params;
  const journalId = parseInt(id, 10);
  const res = await fetch(`http://localhost:3000/api/journals`, {
    cache: "no-store",
  });
  if (!res.ok) {
    notFound();
  }
  const data: JournalEntry[] = await res.json();
  const journal = data.find((entry) => entry.id === journalId) || null;

  if (!journal) {
    notFound();
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Journal Entry</h1>
      <EntryCard initialData={journal} action={updateJournal} />
    </main>
  );
}
