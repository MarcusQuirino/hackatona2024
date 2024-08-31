// src/api/user/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { User } from '@/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const users = await db.select().from(User).all();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' });
    }
}

export async function POST(req: NextRequest) {
    const res = (await req.json()) as {
        userId: string;
        name: string;
        qualities: number;
        email: string;
        role: number
    }
    try {
        await db.insert(User).values({
            userId: res.userId,
            name: res.name,
            qualities: res.qualities,
            email: res.email,
            role: res.role,
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        } 
        return NextResponse.json({ error: 'Failed to create user' });
    }
}

export async function PUT(req: NextRequest) {
    const res = (await req.json()) as {
        userId: string;
        name: string;
        qualities: number;
        email: string;
        role: number
      };
    try {
        await db.update(User)
        .set({
            name: res.name,
            qualities: res.qualities,
            email: res.email,
            role: res.role
        })
        .where(eq(User.userId, res.userId));
        return NextResponse.json({data: "updated"});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user' });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');

        if (userId) {
            await db.delete(User).where(eq(User.userId, userId)).execute();
            return NextResponse.json({ message: 'User deleted successfully' });
        } else {
            return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}

