import { db } from "@/server/db";
import { TaskRequisition } from "@/server/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: Request) {
  const { organizationId, taskId, quantity } = await request.json() as 
  {
    organizationId: string,
    taskId: string,
    quantity: number,
  };
  
  try {
    const [taskRequisition] = await db.insert(TaskRequisition).values({
      organizationId,
      taskId,
      requisitionId: randomUUID(),
      quantity,
    }).returning();
    
    return NextResponse.json(
      {
        taskRequisition,
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

export async function PUT(request: Request, req: NextRequest) {
  const requisitionId = req.nextUrl.pathname.split('/').slice(-1)[0];
  const { organizationId, taskId, quantity } = await request.json() as 
  {
    organizationId: string,
    taskId: string,
    quantity: number,
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
    const [taskRequisition] = await db.update(TaskRequisition).set({
      organizationId,
      taskId,
      quantity,
    }).where(eq(TaskRequisition.requisitionId, requisitionId)).returning();
    
    return NextResponse.json(
      {
        taskRequisition,
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
  const requisitionId = req.nextUrl.pathname.split('/').slice(-1)[0];
  
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
    await db.delete(TaskRequisition).where(eq(TaskRequisition.requisitionId, requisitionId)).execute();
    
    return NextResponse.json(
      {
        message: `Task requisition ${requisitionId} deleted`,
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