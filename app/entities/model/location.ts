import { Location, Checkpoint, CheckpointPhoto } from "@/app/generated/prisma"

export type CheckpointWithPhotos = Checkpoint & {
  photos: CheckpointPhoto[]
}

export type CheckpointWithAll = Checkpoint & {
  photos: CheckpointPhoto[]
  user?: {
    id: string
    name: string
  }
  vehicle?: {
    id: string
    plate: string
    model: string
  }
}
export type LocationWithCheckpoints = Location & {
  checkpoints: CheckpointWithAll[]
}
export type CheckpointsTableProps = {
  checkpoints: CheckpointWithAll[]
}