import { db } from "@/server/db";
import { TaskRequisition } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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
    const taskRequisition = await db.query.TaskRequisition.findFirst({
      where: eq(TaskRequisition.requisitionId, requisitionId),
    });

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