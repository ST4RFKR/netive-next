import { Location } from "@/app/generated/prisma";
import { baseApi } from "@/app/shared/store/api/base-api";
import { LocationWithCheckpoints } from "../model/location";


export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query<LocationWithCheckpoints, {id: string}>({
      query: ({id}) => '/location/' + id,
       providesTags: ["Location"],
    }),
  }),
  overrideExisting: false,

})

export const { useGetLocationQuery } = locationApi;