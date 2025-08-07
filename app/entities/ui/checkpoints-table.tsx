'use client'
import React, { useState, useMemo } from 'react'
import {
  Eye,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Car,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/shared/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/shared/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/shared/components/ui/table'
import { Badge } from '@/app/shared/components/ui/badge'
import { Button } from '@/app/shared/components/ui'
import { CheckpointModal } from './checkpoint-modal'
import { CheckpointWithAll, CheckpointWithPhotos } from '../model/location'



type CheckpointsTableProps = {
  checkpoints: CheckpointWithAll[]
}




export function CheckpointsTable({ checkpoints }: CheckpointsTableProps) {
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<CheckpointWithPhotos | null>(null)
  const [selectedDate, setSelectedDate] = useState('all')
  console.log('checkpoints', checkpoints);


  // Group checkpoints by date
  const checkpointsByDate = useMemo<Record<string, CheckpointWithPhotos[]>>(() => {
    const grouped: Record<string, CheckpointWithPhotos[]> = {}

    checkpoints.forEach((checkpoint) => {
      const date = new Date(checkpoint.timestamp).toISOString().slice(0, 10)
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(checkpoint)
    })

    return grouped
  }, [checkpoints])

  const filteredCheckpoints: CheckpointWithAll[] = useMemo(() => {
    if (selectedDate === 'all') return checkpoints
    return checkpointsByDate[selectedDate] || []
  }, [selectedDate, checkpointsByDate, checkpoints])

  const formatDate = (timestamp: string | Date): string => {
    return new Date(timestamp).toLocaleDateString('uk-UA')
  }

  const formatTime = (timestamp: string | Date): string => {
    return new Date(timestamp).toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  console.log('selectedDate:', selectedDate)
  console.log('checkpointsByDate keys:', Object.keys(checkpointsByDate))

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Фільтр по датах</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="w-full md:w-[280px]">
              <SelectValue placeholder="Оберіть дату" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всі дати</SelectItem>
              {Object.keys(checkpointsByDate).map(date => (
                <SelectItem key={date} value={date}>
                  {new Date(date).toLocaleDateString('uk-UA')} ({checkpointsByDate[date].length})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Checkpoints Table */}
      <Card>
        <CardHeader>
          <CardTitle>Таблиця чекпоінтів ({filteredCheckpoints.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата/Час</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Працівник</TableHead>
                <TableHead>Транспорт</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCheckpoints.map((checkpoint) => (
                <TableRow key={checkpoint.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {formatDate(checkpoint.timestamp)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(checkpoint.timestamp)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={checkpoint.type === 'ENTER' ? 'default' : 'destructive'}
                      className="gap-1"
                    >
                      {checkpoint.type === 'ENTER' ? (
                        <>
                          <ArrowDown className="h-3 w-3" />
                          Вхід
                        </>
                      ) : (
                        <>
                          <ArrowUp className="h-3 w-3" />
                          Вихід
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{checkpoint?.user?.name || '—'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {checkpoint.vehicleId ? (
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span>{checkpoint?.vehicle?.plate || '-'} - {checkpoint?.vehicle?.model || '-'}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={checkpoint.isVerified ? 'default' : 'secondary'}>
                      {checkpoint.isVerified ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Підтверджено
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Очікує
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCheckpoint(checkpoint)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Переглянути
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCheckpoints.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Немає чекпоінтів для відображення
            </div>
          )}
        </CardContent>
      </Card>

      <CheckpointModal
        checkpoint={selectedCheckpoint}
        onClose={() => setSelectedCheckpoint(null)}
      />
    </div>
  )
}
