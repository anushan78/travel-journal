"use client";

import { useState } from "react";

interface DeleteJournalButtonProps {
  onDelete: () => Promise<void>;
}

export default function DeleteJournalButton({
  onDelete,
}: DeleteJournalButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = () => {
    if (confirm("Are you sure you want to delete this journal entry?")) {
      setIsDeleting(true);
      onDelete().finally(() => setIsDeleting(false));
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting....." : "Delete Journal"}
    </button>
  );
}
