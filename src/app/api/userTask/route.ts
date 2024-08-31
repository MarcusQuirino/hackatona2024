// src/api/user/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { UserTask } from '@/server/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const type = url.searchParams.get('type');

    try {
        if (userId && type) {
            let result;

            switch (type) {
                case 'completed':
                    result = await db
                        .select({ count: sql`COUNT(*)` })
                        .from(UserTask)
                        .where(and(eq(UserTask.userId, userId), sql`${UserTask.finishedDate} IS NOT NULL`))
                        .execute();
                    return NextResponse.json(result[0]?.count || 0);

                case 'in-progress':
                    result = await db
                        .select({ count: sql`COUNT(*)` })
                        .from(UserTask)
                        .where(and(eq(UserTask.userId, userId), sql`${UserTask.finishedDate} IS NULL`))
                        .execute();
                    return NextResponse.json(result[0]?.count || 0);

                case 'yearly':
                    const currentYear = new Date().getFullYear();
                    result = await db
                        .select({ count: sql`COUNT(*)` })
                        .from(UserTask)
                        .where(
                            and(
                                eq(UserTask.userId, userId),
                                sql`strftime('%Y', ${UserTask.finishedDate}) = ${currentYear}`
                            )
                        )
                        .execute();
                    return NextResponse.json(result[0]?.count || 0);

                case 'all-count':
                    result = await db
                        .select({ count: sql`COUNT(*)` })
                        .from(UserTask)
                        .where(eq(UserTask.userId, userId))
                        .execute();
                    return NextResponse.json(result[0]?.count || 0);

                case 'all':
                    result = await db
                        .select()
                        .from(UserTask)
                        .where(eq(UserTask.userId, userId))
                        .execute();
                    return NextResponse.json(result);

                default:
                    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
            }
        } else {
            return NextResponse.json({ error: 'userId and type are required' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user tasks' }, { status: 500 });
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
            // Confirme que `organizationId` é necessário ou ajuste conforme a lógica da sua aplicação
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