import { baseApi } from "@/app/shared/store/api/base-api";

interface GetCheckpointsParams {
  page: number;
  limit: number;
  locationId?: string;
}

export const checkpointApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCheckpoints: builder.query<any[], GetCheckpointsParams>({
      query: ({ page, limit, locationId }) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          page: page.toString(),
        });
        
        if (locationId) {
          params.append('locationId', locationId);
        }
        
        return `/checkpoint?${params.toString()}`;
      },
      providesTags: ["Checkpoint"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCheckpointsQuery } = checkpointApi;