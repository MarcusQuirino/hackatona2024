import { Home, BookOpen, Settings, ListChecks } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <aside className="w-60 bg-secondary">
      <div className="p-4">
        <Image
          src="/savepoint-logo.png"
          alt="Savepoint Logo"
          width={200}
          height={50}
          className="mb-4"
        />
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center rounded px-4 py-2 hover:bg-primary/10"
            >
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/quests"
              className="flex items-center rounded px-4 py-2 hover:bg-primary/10"
            >
              <ListChecks className="mr-2 h-5 w-5" />
              Quests
            </Link>
          </li>
          <li>
            <Link
              href="/quem-somos"
              className="flex items-center rounded px-4 py-2 hover:bg-primary/10"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Quem Somos
            </Link>
          </li>
          <li>
            <Link
              href="/configuracoes"
              className="flex items-center rounded px-4 py-2 hover:bg-primary/10"
            >
              <Settings className="mr-2 h-5 w-5" />
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
