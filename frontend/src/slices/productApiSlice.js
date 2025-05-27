import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({pageNumber, keyword}) => ({
                url: PRODUCTS_URL,
                params: {
                    pageNumber, //pass the page number to the query
                    keyword, //pass the keyword to the query
                }
            }),

            providesTags: ['Products'], //provide the tags for the product list
            keepUnusedDataFor: 5, //keep the data for 5 seconds
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`
            }),
            keepUnusedDataFor: 5, //keep the data for 5 seconds
        }),   
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Products'], //invalidate the cache for the product list
        }), 

        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'], //invalidate the cache for the product list
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'], //invalidate the cache for the product list
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'], //invalidate the cache for the product list
        }),

        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Products'], //invalidate the cache for the product list
        }),

        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5, //keep the data for 5 seconds
            providesTags: ['Products'], //provide the tags for the product list
        })
    }),
});

// Export the auto-generated React hook for the 'getProducts' endpoint,
// so it can be used in components to fetch product data
export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation, useGetTopProductsQuery } = productApiSlice;