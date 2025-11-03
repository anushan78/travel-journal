"use client";

import { FormEvent, useTransition } from "react";

interface EntryCardProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    title: string;
    date: string;
    content: string;
  };
}

export default function EntryCard({ action, initialData }: EntryCardProps) {
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialData?.title || ""}
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
          defaultValue={initialData?.date || ""}
          className="w-full border border-gray-300 p-2 rounded"
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
          defaultValue={initialData?.content || ""}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Entry"}
      </button>
    </form>
  );
}
