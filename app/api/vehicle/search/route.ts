import { Vehicle } from './../../../generated/prisma/index.d';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('query') || '';

  const vehicles = await prisma.vehicle.findMany({
    where: {
      plate: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 5,
  });

  return NextResponse.json(vehicles);
}