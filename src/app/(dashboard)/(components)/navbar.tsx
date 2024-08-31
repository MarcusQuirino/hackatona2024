import {
  Home,
  BookOpen,
  Settings,
  ListChecks,
  PersonStanding,
  UserRound,
  CirclePlus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/getUserByClerkId";

export async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const user = await getUserByClerkId(userId);

  if (!user) {
    return;
  }

  return (
    <aside className="w-60 bg-card">
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
              Minhas Ações
            </Link>
          </li>
          <li>
            <Link
              href="/quem-somos"
              className="flex items-center rounded px-4 py-2 hover:bg-primary/10"
            >
              <UserRound className="mr-2 h-5 w-5" />
              Perfil
            </Link>
          </li>
          {user && user.role === 1 && (
            <li>
              <Link
                href="/quests/form"
                className="flex items-center rounded px-4 py-2 hover:bg-primary/10"
              >
                <CirclePlus className="mr-2 h-5 w-5" />
                Cadastrar Ação
              </Link>
            </li>
          )}
          {/* <li>
            <Link
              href="/configuracoes"
              className="flex items-center rounded px-4 py-2 hover:bg-primary/10"
            >
              <Settings className="mr-2 h-5 w-5" />
              Configurações
            </Link>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}
