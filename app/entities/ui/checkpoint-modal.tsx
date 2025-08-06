'use client'
import React from 'react'


import {
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  User,
  Car,
  MapPin,
  MessageSquare,
  Camera,
  ExternalLink,

} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/shared/components/ui/dialog'
import { Badge } from '@/app/shared/components/ui/badge'
import { CheckpointPhoto } from '@/app/generated/prisma'
import { CheckpointWithAll } from '../model/location'
import { CheckpointPhotos } from './CheckpointPhotos'

interface CheckpointModalProps {
  checkpoint: CheckpointWithAll | null
  onClose: () => void
}

export function CheckpointModal({ checkpoint, onClose }: CheckpointModalProps) {
  if (!checkpoint) return null

  const formatDate = (timestamp: Date) => {
    return new Date(timestamp).toLocaleDateString('uk-UA')
  }

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Dialog open={!!checkpoint} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Деталі чекпоінту</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">Дата та час</span>
              </div>
              <p className="font-medium">
                {formatDate(checkpoint.timestamp)} о{" "}
                {new Date(checkpoint.timestamp).getHours().toString().padStart(2, "0")}:
                {new Date(checkpoint.timestamp).getMinutes().toString().padStart(2, "0")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Тип операції</span>
              </div>
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
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Працівник</span>
              </div>
              <p className="font-medium">{checkpoint?.user?.name || 'Не вказано'}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Car className="h-4 w-4" />
                <span className="text-sm font-medium">Транспорт</span>
              </div>
              <p className="font-medium">
                {checkpoint?.vehicle?.plate + " - " + checkpoint?.vehicle?.model || 'Не вказано'}
              </p>
            </div>
          </div>

          {/* GPS Coordinates */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">GPS координати</span>
            </div>
            <div className="flex items-center space-x-2">
              <p className="font-medium">{checkpoint.gpsCoords}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${checkpoint.gpsCoords}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-primary hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Показати на карті</span>
              </a>
            </div>
          </div>

          {/* Comment */}
          {checkpoint.comment && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Коментар</span>
              </div>
              <p className="bg-muted p-3 rounded-md">
                {checkpoint.comment}
              </p>
            </div>
          )}

          {/* Photos */}
          {checkpoint.photos && checkpoint.photos.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Camera className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Фотографії ({checkpoint.photos.length})
                </span>
              </div>

              <CheckpointPhotos photos={checkpoint.photos} />
            </div>
          )}

          {/* Status Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-muted-foreground">Статус:</span>
              <Badge variant={checkpoint.isVerified ? 'default' : 'secondary'}>
                {checkpoint.isVerified ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Підтверджено
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    Очікує підтвердження
                  </>
                )}
              </Badge>
            </div>

            <div className="text-xs text-muted-foreground">
              ID: {checkpoint.id.slice(-8)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}