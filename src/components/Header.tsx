import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-semibold">
          Travel Journal
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/journal" className="hover:underline">
            Journal
          </Link>
        </div>
      </nav>
    </header>
  );
}
