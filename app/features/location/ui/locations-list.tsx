import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/components/ui/table"
import { Badge } from "../../../shared/components/ui/badge"
import { Location } from "@/app/generated/prisma"

export function LocationList({ locations }: { locations: Location[] }) {
  if (!locations) return null
  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Назва об'єкта</TableHead>
            <TableHead>Адреса</TableHead>
            <TableHead>NFC Tag ID</TableHead>
            <TableHead className="text-right">Дії</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location: Location) => (
            <TableRow key={location.id}>
              <TableCell className="font-medium">{location.name}</TableCell>
              <TableCell>{location.address || 'Не вказано'}</TableCell>
              <TableCell>
                {location.nfcTagId ? (
                  <Badge variant="secondary">{location.nfcTagId}</Badge>
                ) : (
                  <Badge variant="destructive">Відсутній</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/location/${location.id}`} className="text-blue-600 hover:underline">
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
