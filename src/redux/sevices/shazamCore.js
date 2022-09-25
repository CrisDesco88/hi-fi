import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

  export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '4d10fcabc7mshe6b28c2381b61dap19262bjsnd952bc549420');
            
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world' }),
    }),
  });

  export const {
    useGetTopChartsQuery,
  } = shazamCoreApi;