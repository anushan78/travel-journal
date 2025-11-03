"use server";

import { redirect } from "next/navigation";

export async function deleteJournal(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) {
    throw new Error("Journal ID is required for deletion.");
  }
  await fetch(`http://localhost:3000/api/journals?id=${id}`, {
    method: "DELETE",
  });
  redirect("/journal");
}

export async function updateJournal(id: number, formData: FormData) {
  const data = {
    id,
    title: formData.get("title")?.toString() ?? "",
    date: formData.get("date")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
  };

  await fetch(`http://localhost:3000/api/journals`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  redirect(`/journal/${id}`);
}
