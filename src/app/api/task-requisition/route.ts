import { db } from "@/server/db";
import { TaskRequisition } from "@/server/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: Request) {
  const res = (await request.json()) as 
  {
    organizationId: string,
    taskId: string,
    quantity: number,
    requisitionId: string,
    joined: number,
  };
  
  try {
    await db.insert(TaskRequisition).values({
      organizationId: res.organizationId,
      taskId: res.taskId,
      requisitionId: res.requisitionId,
      quantity: res.quantity,
      joined: res.joined,
    })
    
    return NextResponse.json(
      {
        requisitionId: res.requisitionId,
      },
      {
        status: 201,
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

export async function GET() {
  try {
    const taskRequisitions = await db.query.TaskRequisition.findMany();
    
    return NextResponse.json(
      {
        taskRequisitions,
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

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const requisitionId = url.searchParams.get('requisitionId');
  const res = (await req.json()) as 
  {
    organizationId: string,
    taskId: string,
    quantity: number,
    joined: number,
  };
  
  if (!requisitionId) {
    return NextResponse.json(
      {
        error: 'Requisition ID is required',
      },
      {
        status: 400,
      }
    );
  }
  
  try {
    await db.update(TaskRequisition).set({
      organizationId: res.organizationId,
      taskId: res.taskId,
      quantity: res.quantity,
      joined: res.joined,
    }).where(eq(TaskRequisition.requisitionId, requisitionId)).returning();
    
    return NextResponse.json(
      {
        requisitionId,
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

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const requisitionId = url.searchParams.get('requisitionId');

    if (requisitionId) {
        await db.delete(TaskRequisition).where(eq(TaskRequisition.requisitionId, requisitionId)).execute();
        return NextResponse.json({ message: 'Task Requisition deleted successfully' });
    } else {
        return NextResponse.json({ error: 'Invalid requisitionId' }, { status: 400 });
    }
} catch (error) {
  if (error instanceof Error) {
    return NextResponse.json(error.message);
  }
    return NextResponse.json({ error: 'Failed to delete task requisition' }, { status: 500 });
}
}