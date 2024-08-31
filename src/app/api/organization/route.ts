import { db } from "@/server/db";
import { Organization } from "@/server/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: Request) {
  const { name } = (await request.json()) as { name: string };

  try {
    const [organization] = await db
      .insert(Organization)
      .values({
        organizationId: randomUUID(),
        name,
      })
      .returning();

    return NextResponse.json(
      {
        organization,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}

export async function GET() {
  try {
    const organizations = await db.query.Organization.findMany();
    return NextResponse.json(
      {
        organizations,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const organizationId = url.searchParams.get("organizationId");

  const res = (await req.json()) as { name: string };

  console.log("organizationId");

  if (!organizationId) {
    return NextResponse.json(
      {
        error: "Organization ID is required",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const [organization] = await db
      .update(Organization)
      .set({ name: res.name })
      .where(eq(Organization.organizationId, organizationId))
      .returning();

    return NextResponse.json(
      {
        organization,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const organizationId = url.searchParams.get("organizationId");

  if (!organizationId) {
    return NextResponse.json(
      {
        error: "Organization ID is required",
      },
      {
        status: 400,
      },
    );
  }

  try {
    await db
      .delete(Organization)
      .where(eq(Organization.organizationId, organizationId))
      .returning();

    return NextResponse.json(
      {
        message: `Organization ${organizationId} deleted`,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 400,
      },
    );
  }
}
