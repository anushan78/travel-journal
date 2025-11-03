import { redirect } from "next/navigation";
import { JournalEntry, journals } from "../data";
import EntryCard from "@/components/journal/EntryCard";

async function createJournalEntry(formData: FormData) {
  "use server"; //Required for server actions

  const entry = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    date: new Date().toISOString(),
  };

  await fetch("http://localhost:3000/api/journals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });

  redirect("/journal");
}

export default function NewJournalPage() {
  return (
    <main className="p-6 bg-white rounded shadow">
      <h1>Add New Journal Entry</h1>
      <EntryCard action={createJournalEntry} />
    </main>
  );
}
