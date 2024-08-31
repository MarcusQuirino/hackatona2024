// src/api/user/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { UserTask } from '@/server/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const users = await db.select().from(UserTask).all();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user tasks' });
    }
}

export async function POST(req: NextRequest) {
    const res = (await req.json()) as {
        userId: string;
        organizationId: string;
        taskId: string;
    }
    try {
        await db.insert(UserTask).values({
            userId: res.userId,
            organizationId: res.organizationId,
            taskId: res.taskId,
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        } 
        return NextResponse.json({ error: 'Failed to create user task' });
    }
}

export async function PUT(req: NextRequest) {
    const res = (await req.json()) as {
        userId: string;
        organizationId: string;
        taskId: string;
        status: number;
        finishedDate: Date;
    };

    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const organizationId = url.searchParams.get('organizationId');
        const taskId = url.searchParams.get('taskId');

        if (userId && organizationId && taskId) {
            await db.update(UserTask)
                .set({
                    status: res.status,
                    finishedDate: res.finishedDate
                })
                .where(
                    and(
                        eq(UserTask.userId, userId),
                        eq(UserTask.organizationId, organizationId),
                        eq(UserTask.taskId, taskId)
                    )
                );

            return NextResponse.json({ data: 'updated' });
        } else {
            return NextResponse.json({ error: 'Id is required' });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user task' });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const organizationId = url.searchParams.get('organizationId');
        const taskId = url.searchParams.get('taskId');

        if (userId && organizationId && taskId) {
            await db.delete(UserTask).where(
                and(
                    eq(UserTask.userId, userId),
                    eq(UserTask.organizationId, organizationId),
                    eq(UserTask.taskId, taskId)
                )
            ).execute();
            return NextResponse.json({ message: 'User task deleted successfully' });
        } else {
            return NextResponse.json({ error: 'Invalid Id' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user task' }, { status: 500 });
    }
}
