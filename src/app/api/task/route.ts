/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/server/db";
import { Task } from "@/server/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: Request) {
  const res = (await request.json()) as {
    organizationId: string;
    name: string;
    description: string;
    qualities: number[];
    urgency: number;
    status: number;
    city: string;
    state: string;
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
      city: res.city,
      state: res.state,
    });

    return NextResponse.json(
      {
        taskId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json({ error: "Failed to create task" });
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    
    const name = query.get("name")
    const city = query.get("city")
    const state = query.get("state")
    const qualities = query.get("qualities")?.split(",").map(Number)

    console.log(qualities)

    const tasks = await db.select().from(Task).where(
      and(
        name ? eq(Task.name, name) : undefined,
        city ? eq(Task.city, city) : undefined,
        state ? eq(Task.state, state) : undefined,
        qualities ? eq(Task.qualities, JSON.stringify(qualities)) : undefined 
      )
    )

    return NextResponse.json(
      {
        tasks,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
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
    state: string;
    city: string;
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
          state: res.state,
          city: res.city
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
    const taskId = url.searchParams.get("taskId");

    if (taskId) {
      await db.delete(Task).where(eq(Task.taskId, taskId)).execute();
      return NextResponse.json({ message: "Task deleted successfully" });
    } else {
      return NextResponse.json({ error: "Invalid taskId" }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error.message);
    }
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
