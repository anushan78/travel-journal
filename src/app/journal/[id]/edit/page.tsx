import { redirect } from "next/navigation";
import { journals } from "../../data";
import { notFound } from "next/navigation";
import EntryCard from "@/components/journal/EntryCard";

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
      <EntryCard initialData={journal} action={updateJournal} />
    </main>
  );
}
