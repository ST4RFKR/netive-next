import { PrismaClient, Role, CardType, CheckpointType } from "../app/generated/prisma"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Начинаем заполнение базы данных...")

  // Очищаем существующие данные
  await prisma.checkpointPhoto.deleteMany()
  await prisma.checkpoint.deleteMany()
  await prisma.nFCCard.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.location.deleteMany()
  await prisma.user.deleteMany()

  // Создаем пользователей
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Иван Петров",
        email: "ivan.petrov@company.com",
        phone: "+380501234567",
        role: Role.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        name: "Мария Сидорова",
        email: "maria.sidorova@company.com",
        phone: "+380502345678",
        role: Role.DISPATCHER,
      },
    }),
    prisma.user.create({
      data: {
        name: "Александр Иванов",
        email: "alex.ivanov@company.com",
        phone: "+380503456789",
        role: Role.DRIVER,
      },
    }),
    prisma.user.create({
      data: {
        name: "Елена Козлова",
        email: "elena.kozlova@company.com",
        phone: "+380504567890",
        role: Role.EMPLOYEE,
      },
    }),
    prisma.user.create({
      data: {
        name: "Сергей Морозов",
        email: "sergey.morozov@company.com",
        phone: "+380505678901",
        role: Role.GUARD,
      },
    }),
  ])

  console.log(`✅ Создано ${users.length} пользователей`)

  // Создаем транспортные средства
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        plate: "AA1234BB",
        model: "Mercedes Sprinter",
        driverId: users[2].id, // Александр Иванов
      },
    }),
    prisma.vehicle.create({
      data: {
        plate: "CC5678DD",
        model: "Ford Transit",
        driverId: users[2].id,
      },
    }),
    prisma.vehicle.create({
      data: {
        plate: "EE9012FF",
        model: "Volkswagen Crafter",
      },
    }),
  ])

  console.log(`✅ Создано ${vehicles.length} транспортных средств`)

  // Создаем локации
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        name: "Главный офис",
        address: "ул. Центральная, 1, Киев",
        nfcTagId: "NFC_OFFICE_001",
        coordinates: "50.4501,30.5234",
      },
    }),
    prisma.location.create({
      data: {
        name: "Склад №1",
        address: "ул. Промышленная, 15, Киев",
        nfcTagId: "NFC_WAREHOUSE_001",
        coordinates: "50.4601,30.5134",
      },
    }),
    prisma.location.create({
      data: {
        name: "Склад №2",
        address: "ул. Логистическая, 8, Киев",
        nfcTagId: "NFC_WAREHOUSE_002",
        coordinates: "50.4401,30.5334",
      },
    }),
    prisma.location.create({
      data: {
        name: "Пункт выдачи",
        address: "ул. Торговая, 22, Киев",
        nfcTagId: "NFC_PICKUP_001",
        coordinates: "50.4301,30.5434",
      },
    }),
  ])

  console.log(`✅ Создано ${locations.length} локаций`)

  // Создаем NFC карты для сотрудников
  const employeeCards = await Promise.all([
    prisma.nFCCard.create({
      data: {
        cardId: "EMP_001",
        type: CardType.EMPLOYEE,
        userId: users[0].id, // Иван Петров
      },
    }),
    prisma.nFCCard.create({
      data: {
        cardId: "EMP_002",
        type: CardType.EMPLOYEE,
        userId: users[1].id, // Мария Сидорова
      },
    }),
    prisma.nFCCard.create({
      data: {
        cardId: "EMP_003",
        type: CardType.EMPLOYEE,
        userId: users[2].id, // Александр Иванов
      },
    }),
    prisma.nFCCard.create({
      data: {
        cardId: "EMP_004",
        type: CardType.EMPLOYEE,
        userId: users[3].id, // Елена Козлова
      },
    }),
  ])

  // Создаем NFC карты для транспорта
  const vehicleCards = await Promise.all([
    prisma.nFCCard.create({
      data: {
        cardId: "VEH_001",
        type: CardType.VEHICLE,
        vehicleId: vehicles[0].id,
      },
    }),
    prisma.nFCCard.create({
      data: {
        cardId: "VEH_002",
        type: CardType.VEHICLE,
        vehicleId: vehicles[1].id,
      },
    }),
    prisma.nFCCard.create({
      data: {
        cardId: "VEH_003",
        type: CardType.VEHICLE,
        vehicleId: vehicles[2].id,
      },
    }),
  ])

  console.log(`✅ Создано ${employeeCards.length + vehicleCards.length} NFC карт`)

  // Создаем контрольные точки
  const checkpoints = []

  // Создаем записи за последние 7 дней
  for (let day = 6; day >= 0; day--) {
    const date = new Date()
    date.setDate(date.getDate() - day)

    // Утренние въезды
    for (let i = 0; i < 3; i++) {
      const morningTime = new Date(date)
      morningTime.setHours(8 + i, Math.floor(Math.random() * 60))

      const checkpoint = await prisma.checkpoint.create({
        data: {
          type: CheckpointType.ENTER,
          userId: users[Math.floor(Math.random() * users.length)].id,
          vehicleId: Math.random() > 0.3 ? vehicles[Math.floor(Math.random() * vehicles.length)].id : null,
          locationId: locations[Math.floor(Math.random() * locations.length)].id,
          timestamp: morningTime,
          comment: `Утренний въезд ${morningTime.toLocaleDateString()}`,
          isVerified: Math.random() > 0.2,
          gpsCoords: `50.${4400 + Math.floor(Math.random() * 200)},30.${5200 + Math.floor(Math.random() * 300)}`,
        },
      })
      checkpoints.push(checkpoint)
    }

    // Вечерние выезды
    for (let i = 0; i < 3; i++) {
      const eveningTime = new Date(date)
      eveningTime.setHours(17 + i, Math.floor(Math.random() * 60))

      const checkpoint = await prisma.checkpoint.create({
        data: {
          type: CheckpointType.EXIT,
          userId: users[Math.floor(Math.random() * users.length)].id,
          vehicleId: Math.random() > 0.3 ? vehicles[Math.floor(Math.random() * vehicles.length)].id : null,
          locationId: locations[Math.floor(Math.random() * locations.length)].id,
          timestamp: eveningTime,
          comment: `Вечерний выезд ${eveningTime.toLocaleDateString()}`,
          isVerified: Math.random() > 0.1,
          gpsCoords: `50.${4400 + Math.floor(Math.random() * 200)},30.${5200 + Math.floor(Math.random() * 300)}`,
        },
      })
      checkpoints.push(checkpoint)
    }
  }

  console.log(`✅ Создано ${checkpoints.length} контрольных точек`)

  // Создаем фотографии для некоторых контрольных точек
  const photos = []
  for (let i = 0; i < Math.min(10, checkpoints.length); i++) {
    const photo = await prisma.checkpointPhoto.create({
      data: {
        url: `https://example.com/photos/checkpoint_${checkpoints[i].id}.jpg`,
        checkpointId: checkpoints[i].id,
      },
    })
    photos.push(photo)
  }

  console.log(`✅ Создано ${photos.length} фотографий`)

  console.log("🎉 Заполнение базы данных завершено!")
  console.log(`
📊 Статистика:
- Пользователи: ${users.length}
- Транспорт: ${vehicles.length}
- Локации: ${locations.length}
- NFC карты: ${employeeCards.length + vehicleCards.length}
- Контрольные точки: ${checkpoints.length}
- Фотографии: ${photos.length}
  `)
}

main()
  .catch((e) => {
    console.error("❌ Ошибка при заполнении базы данных:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
