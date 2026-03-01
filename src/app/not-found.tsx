import Link from "next/link";
import { Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
          404
        </div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>
          Page not found
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary text-sm">
            <Home size={16} />
            Home
          </Link>
          <Link href="/docs/getting-started/" className="btn-outline text-sm">
            <BookOpen size={16} />
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
