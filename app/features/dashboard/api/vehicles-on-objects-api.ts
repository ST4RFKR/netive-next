import { baseApi } from "@/app/shared/store/api/base-api"


type Vehicle = {
  plate: string
  model: string
}

type VehiclesOnObject = {
  location: string
  vehicles: Vehicle[]
}

export const vehiclesOnObjectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehiclesByDate: builder.query<VehiclesOnObject[], string>({
      query: (date) => `/vehicles-on-objects?date=${date}`,
      providesTags: ['Vehicle', 'Location', 'Checkpoint'],
    }),
  }),
})

export const { useGetVehiclesByDateQuery } = vehiclesOnObjectsApi