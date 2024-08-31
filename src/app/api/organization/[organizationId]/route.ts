import { db } from "@/server/db";
import { Organization } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const organizationId = req.nextUrl.pathname.split('/').slice(-1)[0];
  

  if (!organizationId) {
    return NextResponse.json(
      {
        error: 'Organization ID is required',
      },
      {
        status: 400,
      }
    );
  }

  try {
    const organization = await db.query.Organization.findFirst({
      where: eq(Organization.organizationId, organizationId),
    });

    return NextResponse.json(
      {
        organization,
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
  const organizationId = req.nextUrl.pathname.split('/').slice(-1)[0];
  const { name } = await request.json() as { name: string }

  console.log('organizationId', organizationId);

  if (!organizationId) {
    return NextResponse.json(
      {
        error: 'Organization ID is required',
      },
      {
        status: 400,
      }
    )
  }

  try {
    const [organization] = await db.update(Organization)
      .set({ name })
      .where(eq(Organization.organizationId, organizationId))
      .returning()

    return NextResponse.json(
      {
        organization,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const organizationId = req.nextUrl.pathname.split('/').slice(-1)[0];

  if (!organizationId) {
    return NextResponse.json(
      {
        error: 'Organization ID is required',
      },
      {
        status: 400,
      }
    )
  }

  try {
    await db.delete(Organization)
      .where(eq(Organization.organizationId, organizationId))
      .returning()

    return NextResponse.json(
      {
        message: `Organization ${organizationId} deleted`,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      }
    )
  }
}

