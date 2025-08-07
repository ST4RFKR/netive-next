import { CheckpointPhoto } from '@/app/generated/prisma'
import React, { useState } from 'react'

export function CheckpointPhotos({ photos }: { photos: CheckpointPhoto[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<CheckpointPhoto | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="relative cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
            <img
              src={photo.url}
              alt="Checkpoint photo"
              className="w-full h-60 object-cover rounded-md border"
              onError={(e: any) => {
                e.target.src = '/assets/images/not-found.png'
              }}
            />
          </div>
        ))}
      </div>

      {/* Модальне вікно */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <img
            src={selectedPhoto.url}
            alt="Selected checkpoint photo"
            className="max-w-full max-h-full rounded-md"
            onClick={e => e.stopPropagation()} // щоб клік по фото не закривав модалку
          />
        </div>
      )}
    </>
  )
}
