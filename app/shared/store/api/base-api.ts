import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';


export const baseApi = createApi({
  reducerPath: 'todolistApi',
  tagTypes: ['User', 'Location', 'Vehicle', 'Checkpoint'],
  
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    credentials: 'include',
      prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  endpoints: () => ({}),
});