'use client'
import React, { useState, useEffect } from 'react'
import { Clock, Car, Inbox, User, Factory, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../shared/components/ui/avatar'
import { Button } from '../shared/components/ui/button' // Исправлен импорт
import { useGetCheckpointsQuery } from '../features/dashboard/api/checkpoint-api'
import { useGetVehiclesByDateQuery } from '../features/dashboard/api/vehicles-on-objects-api'

interface User {
  id: string
  name: string
  avatar?: string
}

interface Vehicle {
  id: string
  plate: string
  model: string
}

interface Location {
  id: string
  name: string
}

interface Checkpoint {
  id: string
  type: 'ENTER' | 'EXIT'
  userId?: string
  vehicleId?: string
  locationId: string
  timestamp: string
  comment?: string
  user?: User
  vehicle?: Vehicle
  location: Location
}

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Используем RTK Query для получения данных
  const { data: checkpointsData, isLoading, error } = useGetCheckpointsQuery({
    page: currentPage,
    limit: itemsPerPage
  })
  const date = new Date().toISOString().slice(0, 10)
  const { data: vehiclesOnObjectsData, isLoading: isLoadingVehicles } = useGetVehiclesByDateQuery(date)
  const totalVehicles = vehiclesOnObjectsData?.reduce((total, vehicles) => total + vehicles.vehicles.length, 0)


  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));

    if (diffMinutes < 1) return 'щойно';
    if (diffMinutes < 60) return `${diffMinutes} хв тому`;
    if (diffHours < 24) return `${diffHours} год тому`;
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (checkpointsData && checkpointsData.length === itemsPerPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Проверяем, есть ли данные для отображения
  const checkpoints = checkpointsData || []
  const hasMore = checkpointsData && checkpointsData.length === itemsPerPage
  const hasPrev = currentPage > 1

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900">
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">Панель управління</h2>

        {/* General Graphs/Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активні співробітники</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">
                +2 за останній день
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активні транспортні засоби</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVehicles}</div>
              <p className="text-xs text-muted-foreground">
                +1 за останній тиждень
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Latest Events with Pagination */}
          <Card>
            <CardHeader>
              <CardTitle>Останні події</CardTitle>
              <CardDescription>Останні в'їзди та виїзди персоналу та транспорту.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 min-h-[300px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-red-500">Помилка при завантаженні даних</p>
                  </div>
                ) : checkpoints.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground">Немає подій для відображення</p>
                  </div>
                ) : (
                  checkpoints.map((event: Checkpoint) => (
                    <div key={event.id} className="flex items-center gap-4">
                      {event.type === 'ENTER' ? (
                        <ArrowRight className="h-5 w-5 text-green-500" />
                      ) : (
                        <ArrowLeft className="h-5 w-5 text-red-500" />
                      )}
                      {event.user ? (
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={event.user.avatar || "/placeholder-user.jpg"} alt={`@${event.user.name}`} />
                          <AvatarFallback>{event.user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Car className="h-9 w-9 text-muted-foreground" />
                      )}
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {event.user ? event.user.name : event.vehicle?.plate}
                          {' '}
                          <span className="text-muted-foreground">
                            {event.type === 'ENTER' ? 'увійшов до' : 'виїхав з'}
                          </span>
                          {' '}
                          {event.location.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTimeAgo(event.timestamp)}
                          {event.comment && ` - ${event.comment}`}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination Controls */}
              {!isLoading && !error && (
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    Сторінка {currentPage}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevPage}
                      disabled={!hasPrev || isLoading}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Попередня
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={!hasMore || isLoading}
                    >
                      Наступна
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehicles on Objects */}
          <Card>
            <CardHeader>
              <CardTitle>Техніка на об'єктах</CardTitle>
              <CardDescription>Поточне розташування транспортних засобів.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehiclesOnObjectsData?.map((obj) => (
                  <div key={obj.location}>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Factory className="h-4 w-4 text-muted-foreground" />
                      {obj.location}
                    </h4>
                    {obj.vehicles.length > 0 ? (
                      <ul className="list-disc pl-6 text-sm text-muted-foreground">
                        {obj.vehicles.map((vehicle) => (
                          <li key={vehicle.plate}>
                            {vehicle.plate} ({vehicle.model})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground pl-6">
                        Немає техніки на цьому об'єкті.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}