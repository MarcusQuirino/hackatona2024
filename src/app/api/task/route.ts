import { db } from "@/server/db";
import { Task } from "@/server/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { organizationId, name, description, qualities, urgency, status } =
    (await request.json()) as {
      organizationId: string;
      name: string;
      description: string;
      qualities: string;
      urgency: number;
      status: number;
    };

  try {
    const [task] = await db
      .insert(Task)
      .values({
        taskId: randomUUID(),
        organizationId,
        name,
        description,
        qualities,
        urgency,
        status,
      })
      .returning();

    return NextResponse.json(
      {
        task,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}

export async function GET() {
  try {
    const tasks = await db.query.Task.findMany();

    return NextResponse.json(
      {
        tasks,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const taskId = url.searchParams.get('taskId');
  const { organizationId, name, description, qualities, urgency, status } =
    (await req.json()) as {
      organizationId: string;
      name: string;
      description: string;
      qualities: string;
      urgency: number;
      status: number;
    };

  if (!taskId) {
    return NextResponse.json(
      {
        error: "Task ID is required",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const [task] = await db
      .update(Task)
      .set({
        organizationId,
        name,
        description,
        qualities,
        urgency,
        status,
      })
      .where(eq(Task.taskId, taskId))
      .returning();

    return NextResponse.json(
      {
        task,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const taskId = url.searchParams.get('taskId');

  if (!taskId) {
    return NextResponse.json(
      {
        error: "Task ID is required",
      },
      {
        status: 400,
      },
    );
  }

  try {
    await db.delete(Task).where(eq(Task.taskId, taskId));

    return NextResponse.json(
      {
        message: `Task ${taskId} deleted`,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}
