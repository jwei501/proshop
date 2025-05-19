import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

// use apiSlice to automacally control the state of the api
// and the data fetching, we dont need to use useEffect and axios
// and we dont need to use the useState hook and set the state after we
// get the data from the api, we can just use the useGetProductsQuery
// the apislice will automatically set the state after fetching the data
export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Product', 'User', 'Order'],
    endpoints: (builder) => ({}) 
})