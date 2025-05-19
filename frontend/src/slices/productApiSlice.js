import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({url: PRODUCTS_URL}),
            keepUnusedDataFor: 5, //keep the data for 5 seconds
        }),
        getProductDetails: builder.query({
            query: (id) => ({url: `${PRODUCTS_URL}/${id}`}),
            keepUnusedDataFor: 5, //keep the data for 5 seconds
        }),    
    }),
});

// Export the auto-generated React hook for the 'getProducts' endpoint,
// so it can be used in components to fetch product data
export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice;