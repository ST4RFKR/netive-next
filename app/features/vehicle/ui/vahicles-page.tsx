'use client'

import { useState } from 'react'
import { Button } from '@/app/shared/components/ui'
import { PlusCircle } from 'lucide-react'
import { useGetVehiclesQuery } from '../api/vehicle-api'
import { VehicleList } from './vehicle-list'



export const VehiclePage = () => {
  const [open, setOpen] = useState(false)

  const { data: locations } = useGetVehiclesQuery()

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Управління автомобілями</h2>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Додати автомобіль
        </Button>
      </div>
      < VehicleList vehicles={locations || []} />

    </div>
  )
}
