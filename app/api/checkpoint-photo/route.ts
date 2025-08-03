import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
        if (!data.url || !data.checkpointId) {
      return NextResponse.json(
        { error: 'Відсутні обов’язкові поля: url або checkpointId' },
        { status: 400 }
      );
    }
    const checkpoint = await prisma.checkpointPhoto.create({ data });
    return NextResponse.json(checkpoint, { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании чекпоинта:', error);
    return NextResponse.json(
      { error: 'Ошибка при создании чекпоинта' },
      { status: 400 }
    );
  }
}