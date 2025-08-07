
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/components/ui/table"
import { Badge } from "../../../shared/components/ui/badge"
import { Vehicle } from "@/app/generated/prisma"

export function VehicleList({ vehicles }: { vehicles: Vehicle[] }) {
  if (!vehicles) return null
  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Номерний знак</TableHead>
            <TableHead>Модель</TableHead>

            <TableHead className="text-right">Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">{vehicle.plate}</TableCell>
              <TableCell>{vehicle.model || 'Не вказано'}</TableCell>


              <TableCell className="text-right">
                <Link href={`/vehicle/${vehicle.id}`} className="text-blue-600 hover:underline">
                  Деталі
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
