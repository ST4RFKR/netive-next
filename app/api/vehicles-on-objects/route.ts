import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Дата є обовʼязковою" }, { status: 400 });
    }

    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    // 1. Отримуємо всі ENTER чекпоінти за дату
    const enterCheckpoints = await prisma.checkpoint.findMany({
      where: {
        type: "ENTER",
        timestamp: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { timestamp: "desc" },
      include: {
        vehicle: true,
        location: true,
      },
    });

    // 2. Групуємо по vehicleId і беремо тільки останній ENTER на дату
    const latestEnterByVehicle = new Map<string, typeof enterCheckpoints[0]>();

    for (const cp of enterCheckpoints) {
      if (!cp.vehicleId) continue;
      if (!latestEnterByVehicle.has(cp.vehicleId)) {
        latestEnterByVehicle.set(cp.vehicleId, cp);
      }
    }

    const filteredVehicles: { location: string; vehicle: typeof enterCheckpoints[0]["vehicle"] }[] = [];

    // 3. Для кожного ENTER перевіряємо, чи немає EXIT після нього
    for (const [vehicleId, cp] of latestEnterByVehicle.entries()) {
      const hasExit = await prisma.checkpoint.findFirst({
        where: {
          vehicleId,
          type: "EXIT",
          timestamp: {
            gt: cp.timestamp, // пізніше ніж ENTER
          },
        },
      });

      if (!hasExit) {
        filteredVehicles.push({
          location: cp.location?.name || "Невідомо",
          vehicle: cp.vehicle,
        });
      }
    }

    // 4. Групуємо по локаціях
    const grouped: Record<string, typeof filteredVehicles[0]["vehicle"][]> = {};

    for (const { location, vehicle } of filteredVehicles) {
      if (!grouped[location]) grouped[location] = [];
      grouped[location].push(vehicle);
    }

    const vehiclesOnObjects = Object.entries(grouped).map(([location, vehicles]) => ({
      location,
      vehicles,
    }));

    return NextResponse.json(vehiclesOnObjects);
  } catch (error) {
    console.error("Помилка при завантаженні техніки на обʼєктах:", error);
    return NextResponse.json(
      { error: "Помилка при завантаженні техніки на обʼєктах" },
      { status: 500 }
    );
  }
}
