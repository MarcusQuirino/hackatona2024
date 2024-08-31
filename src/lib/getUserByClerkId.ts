// import "server-only";

// import { db } from "@/server/db";
// import { users } from "@/server/db/schema";
// import { eq } from "drizzle-orm";

// export async function getUserByClerkId(clerkId: string) {
//   const user = await db.query.users.findFirst({
//     where: eq(users.clerkId, clerkId),
//   });
//   return user;
// }
