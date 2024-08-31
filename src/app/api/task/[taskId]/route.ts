import { db } from "@/server/db";
import { Task } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.pathname.split('/').slice(-1)[0];

  if (!taskId) {
    return NextResponse.json(
      {
        error: 'Task ID is required',
      },
      {
        status: 400,
      }
    );
  }

  try {
    const task = await db.query.Task.findFirst({
      where: eq(Task.taskId, taskId),
    });

    return NextResponse.json(
      {
        task,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    );
  }
}