export interface JournalEntry {
  id: number;
  title: string;
  date: string;
  content: string;
}

export const journals: JournalEntry[] = [
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
