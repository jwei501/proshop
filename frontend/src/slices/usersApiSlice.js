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

        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
            keepUnusedDataFor: 5, //keep the data for 5 seconds
        }),

        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
            }),
            providesTags: ['Users'], //provide the tags for the user list
            keepUnusedDataFor: 5, //keep the data for 5 seconds
        }),

        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'], //invalidate the cache for the user list
        }),

        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5, //keep the data for 5 seconds
        }),

        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Users'], //invalidate the cache for the user list

        }),

    })
});

// Export the auto-generated React hook for the 'getProducts' endpoint,
// so it can be used in components to fetch product data
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } = usersApiSlice;