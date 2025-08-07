import { Vehicle } from "@/app/generated/prisma";
import { baseApi } from "@/app/shared/store/api/base-api";

export const vehicleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], void>({
      query: () => '/vehicle',
      providesTags: ['Vehicle'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetVehiclesQuery } = vehicleApi;
