import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5, //keep the data for 5 seconds

        }),

        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
            keepUnusedDataFor: 5, //keep the data for 5 seconds
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
 
    }),
});

// Export the auto-generated React hook for the 'getProducts' endpoint,
// so it can be used in components to fetch product data
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;