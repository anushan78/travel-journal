import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Travel Journal",
  description: "Document your travel experiences and memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-grey-50 text-grey-900">
        <Header />
        <main className="flex-1 container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
