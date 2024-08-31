import { db } from "@/server/db";
import { TaskRequisition } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const url = new URL(request.url);
    const organizationId = url.searchParams.get('organizationId');
    const taskId = url.searchParams.get('taskId');
    const requisitionId = url.searchParams.get('requisitionId');

    if (!organizationId || !taskId || !requisitionId) {
        return NextResponse.json(
            {
                error: 'Missing required query parameters',
            },
            {
                status: 400,
            }
        );
    }

    try {
        const existingRequisition = await db.query.TaskRequisition.findFirst({
            where: and(
                eq(TaskRequisition.organizationId, organizationId),
                eq(TaskRequisition.taskId, taskId),
                eq(TaskRequisition.requisitionId, requisitionId)
            ),
        });

        if (!existingRequisition) {
            return NextResponse.json(
                {
                    error: 'Requisition not found',
                },
                {
                    status: 404,
                }
            );
        }

        if (existingRequisition.joined + 1 > existingRequisition.quantity) {
            return NextResponse.json(
                {
                    error: 'Cannot increment joined: exceeds quantity limit',
                },
                {
                    status: 400,
                }
            );
        }

        const updatedJoined = existingRequisition.joined + 1;

        await db.update(TaskRequisition).set({
            joined: updatedJoined,
        }).where(
            and(
                eq(TaskRequisition.organizationId, organizationId),
                eq(TaskRequisition.taskId, taskId),
                eq(TaskRequisition.requisitionId, requisitionId)
            )
        ).execute();

        return NextResponse.json(
            {
                requisitionId: requisitionId,
                joined: updatedJoined,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to update task requisition',
            },
            {
                status: 500,
            }
        );
    }
}
