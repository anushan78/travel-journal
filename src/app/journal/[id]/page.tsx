import { notFound } from "next/navigation";

const journals = [
  {
    id: 1,
    title: "Trip to Japan",
    date: "2023-04-15",
    content:
      "Visited Tokyo, Kyoto, and Osaka. Enjoyed sushi and cherry blossoms.",
  },
  {
    id: 2,
    title: "Exploring Italy",
    date: "2023-05-22",
    content: "Explored Rome, Florence, and Venice. Loved the art and pasta.",
  },
  {
    id: 3,
    title: "Adventures in Canada",
    date: "2023-06-10",
    content:
      "Traveled through Toronto, Vancouver, and Montreal. Beautiful nature and friendly people.",
  },
];

interface JournalPageProps {
  params: Promise<{ id: string }>;
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
    </main>
  );
}
