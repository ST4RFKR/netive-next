import { prisma } from "@/prisma/prisma-client"
import { NextResponse } from "next/server"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {


  try {
       const { id } = await params // No need to await params here, it's directly the object

  if (!id) {
    return NextResponse.json({ error: 'Location ID is required' }, { status: 400 })
  }

const location = await prisma.location.findUnique({
  where: { id },
  include: {
    checkpoints: {
      include: {
        photos: true,
        user: {
          select: {
            id: true,
            name: true, 
          },
        },
        vehicle: {
          select: {
            id: true,
            plate: true,
            model: true, 
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    },
  },
})

    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 })
    }

    return NextResponse.json(location)
  } catch (error) {
    console.error("Error fetching location:", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}