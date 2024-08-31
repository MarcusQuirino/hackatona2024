"use client";

import { usePathname } from "next/navigation";

export function ShowRoute() {
  const pathname = usePathname();
  const firstPathPart = pathname.split("/")[1] ?? "Home";
  const pathName = 'quests' ? 'Ações' : firstPathPart;
  const displayText =
  pathName.charAt(0).toUpperCase() + pathName.slice(1);

  return <div className="text-xl font-semibold text-primary">{displayText}</div>;
}
