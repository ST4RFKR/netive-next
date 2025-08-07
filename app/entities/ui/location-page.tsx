'use client'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/app/shared/components/ui/card'
import { MapPin, Tag, Globe, Loader2 } from 'lucide-react'
import { useGetLocationQuery } from '../api/location-api'
import { CheckpointsTable } from './checkpoints-table'

interface LocationPageClientProps {
  locationId: string
}

export default function LocationPageClient({ locationId }: LocationPageClientProps) {
  const { data: location, isLoading, error } = useGetLocationQuery({ id: locationId })

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Завантаження...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Помилка завантаження</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Не вдалося завантажити дані об'єкта</p>
        </div>
      </div>
    )
  }



  if (!location) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Об'єкт не знайдено</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Об'єкт з ID "{locationId}" не існує</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">
        Деталі об'єкта: {location.name}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Назва об'єкта</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{location.name}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Адреса</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{location.address || 'Не вказано'}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NFC Tag ID</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{location.nfcTagId || 'Відсутній'}</div>
          </CardContent>
        </Card>



        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Останні події на об'єкті</CardTitle>
            <CardDescription>Список останніх входів/виходів, пов'язаних з цим об'єктом.</CardDescription>
          </CardHeader>
          <CardContent>
            <CheckpointsTable checkpoints={location.checkpoints} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Координати</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{location.coordinates || 'Не вказано'}</div>
            {location.coordinates && (
              <p className="text-xs text-muted-foreground mt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Переглянути на карті
                </a>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}