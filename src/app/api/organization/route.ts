import { db } from "@/server/db"
import { Organization } from "@/server/db/schema"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { name } = await request.json() as { name: string }

  try {
    const [ organization ] = await db.insert(Organization).values({
      organizationId: randomUUID(),
      name,
    }).returning()

    return NextResponse.json(
      {
        organization,
      },
      {
        status: 201,
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

export async function GET() {
  try {
    const organizations = await db.query.Organization.findMany()
    return NextResponse.json(
      {
        organizations,
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