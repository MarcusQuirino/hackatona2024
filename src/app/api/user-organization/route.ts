import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../server/db';
import { UserOrganization } from '@/server/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const res = (await req.json()) as {
        userId: string;
        organizationId: string;
    }
    
    try {
        await db.insert(UserOrganization).values({
            userId: res.userId,
            organizationId: res.organizationId
        });
        return NextResponse.json({message: "created"})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(error.message);
        } 
        return NextResponse.json({ error: 'Failed to create user organization' });
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    try {
        if (userId) {
            const users = await db.select().from(UserOrganization).where(eq(UserOrganization.userId, userId));
            return NextResponse.json(users);
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user organizations' });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');
        const organizationId = url.searchParams.get('organizationId')

        if (userId  && organizationId) {
            await db
            .delete(UserOrganization)
            .where(
                and(
                    eq(UserOrganization.userId, userId),
                    eq(UserOrganization.organizationId, organizationId)
                )
            )
            .execute();
            return NextResponse.json({ message: 'User organization deleted successfully' });
        } else {
            return NextResponse.json({ error: 'Invalid Id' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete user organization' }, { status: 500 });
    }
}
