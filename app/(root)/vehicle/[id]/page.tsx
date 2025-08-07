import { VehicleDetailsPage } from "@/app/entities/vehicle/vehicle-details-page"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return (
    <VehicleDetailsPage vehicleId={id} />
  )
}