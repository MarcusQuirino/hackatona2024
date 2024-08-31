"use client";

import { usePathname } from "next/navigation";

export function ShowRoute() {
  const pathname = usePathname();
  const firstPathPart = pathname.split("/")[1] ?? "Home";
  const displayText =
    firstPathPart.charAt(0).toUpperCase() + firstPathPart.slice(1);

  return <div className="text-xl font-semibold">{displayText}</div>;
}
