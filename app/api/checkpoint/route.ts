
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const locationId = searchParams.get('locationId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');

    const where = locationId ? { locationId } : undefined;

    const checkpoints = await prisma.checkpoint.findMany({
      where,
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: { user: true, vehicle: true, location: true },
      skip: (page - 1) * limit
    });

    return NextResponse.json(checkpoints);
  } catch (error) {
    console.error('Помилка при завантаженні чекпоінтів:', error);
    return NextResponse.json(
      { error: 'Помилка при завантаженні чекпоінтів' },
      { status: 500 },
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const checkpoint = await prisma.checkpoint.create({ data });
    return NextResponse.json(checkpoint, { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании чекпоинта:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании чекпоинта' },
      { status: 400 }
    );
  }
}