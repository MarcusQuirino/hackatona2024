import { db } from "@/server/db";
import { Task } from "@/server/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: Request) {
  const res = (await request.json()) as {
    organizationId: string;
    name: string;
    description: string;
    qualities: number[];
    urgency: number;
    status: number;
  };

  const taskId = randomUUID();

  try {
    await db.insert(Task).values({
      taskId: taskId,
      organizationId: res.organizationId,
      name: res.name,
      description: res.description,
      qualities: JSON.stringify(res.qualities),
      urgency: res.urgency,
      status: res.status,
    });

    return NextResponse.json(
      {
        taskId,
      },
      {
        status: 201,
      }
    )   
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json({ error: "Failed to create task" });
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
  const res = (await req.json()) as {
    organizationId: string;
    name: string;
    description: string;
    qualities: string;
    urgency: number;
    status: number;
  };

  try {
    const url = new URL(req.url);
    const taskId = url.searchParams.get("taskId");

    if (taskId) {
      await db
        .update(Task)
        .set({
          organizationId: res.organizationId,
          name: res.name,
          description: res.description,
          qualities: res.qualities,
          urgency: res.urgency,
          status: res.status,
        })
        .where(eq(Task.taskId, taskId));

      return NextResponse.json({ data: "updated" });
    } else {
      return NextResponse.json({ error: "taskId is required" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" });
  }
}

export async function DELETE(req: NextRequest) {
  try {
      const url = new URL(req.url);
      const taskId = url.searchParams.get('taskId');

      if (taskId) {
          await db.delete(Task).where(eq(Task.taskId, taskId)).execute();
          return NextResponse.json({ message: 'Task deleted successfully' });
      } else {
          return NextResponse.json({ error: 'Invalid taskId' }, { status: 400 });
      }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message);
    }
      return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}
