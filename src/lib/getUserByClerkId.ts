import "server-only";

import { db } from "@/server/db";
import { User } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByClerkId(clerkId: string) {
  const user = await db.query.User.findFirst({
    where: eq(User.clerkId, clerkId),
  });
  return user;
}
