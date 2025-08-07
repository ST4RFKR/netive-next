import { Card } from '@/app/shared/components/ui/card'
import React from 'react'

export const VehicleDetailsPage = ({ vehicleId }: { vehicleId: string }) => {
  return (
    <div>

      <h2 className="text-3xl font-bold mb-6 mx-2 text-neutral-900 dark:text-white">
        Деталі aвтомобіля: {vehicleId || 'Не вказано'}
      </h2>
      {/* CAR DETAILS */}
      <Card className="text-neutral-900 dark:text-white p-4 mx-2" >
        <div className="text-2xl font-black">
          AA1234DX
        </div>
        <div className="text-xl font-bold">
          Ford Focus
        </div>
      </Card>
    </div>


  )
}
