'use client'

import { useState } from 'react'
import { Button } from '@/app/shared/components/ui'
import { PlusCircle } from 'lucide-react'
import { LocationList } from './locations-list'
import { useGetLocationsQuery } from '../api/location-api'


export const LocationPage = () => {
  const [open, setOpen] = useState(false)

  const { data: locations } = useGetLocationsQuery()

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Управління об'єктами</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Додати об'єкт
        </Button>
      </div>
      <LocationList locations={locations || []} />

    </div>
  )
}
