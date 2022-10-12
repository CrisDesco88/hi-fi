import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: headers => {
      headers.set(
        'X-RapidAPI-Key',
        '4d10fcabc7mshe6b28c2381b61dap19262bjsnd952bc549420'
      )

      return headers
    }
  }),
  endpoints: builder => ({
    getTopCharts: builder.query({ query: () => '/charts/world' }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/tracks/related?track_id=${songid}`
    }),
    getArtistDetails: builder.query({
      query: artistId => `/artists/details?artist_id=${artistId}`
    }),
    getSongsByCountry: builder.query({
      query: countryCode => `/charts/country?country_code=${countryCode}`
    })
  })
})

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery
} = shazamCoreApi
