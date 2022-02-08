import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const exchangesApiHeaders = {
//   "x-rapidapi-host": "coinpaprika1.p.rapidapi.com",
//   "x-rapidapi-key": "375584d48emshaa7c6eca481ec22p11844bjsn6e0409acb0f1",
// };

const BASE_URL = "https://api.coingecko.com/api/v3";

// const createRequest = (url) => ({ url, headers: exchangesApiHeaders });

export const exchangesApi = createApi({
  reducerPath: "exchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      query: () => `/exchanges?per_page=250`,
    }),
  }),
});

export const { useGetExchangesQuery } = exchangesApi;
