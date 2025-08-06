import { Location } from "@/app/generated/prisma";
import { baseApi } from "@/app/shared/store/api/base-api";


export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<Location[], void>({
      query: () => '/location',
       providesTags: ["Location"],
    }),
  }),
  overrideExisting: false,

})

export const { useGetLocationsQuery } = locationApi;