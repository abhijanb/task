import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_API_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (build) => ({
        dashboard: build.query({
            query: () => '/user/dashboard'
        }),
        getUserFavorate: build.query({
            query: () => '/user/favorites'
        }),
        addToFavorate: build.mutation({
            query: (id) => ({
                url: `/user/favorites/${id}`,
                method: 'POST'
            })
        }),
        removeFromFavorate: build.mutation({
            query: (id) => ({
                url: `/user/favorites/${id}`,
                method: 'DELETE'
            })
        })
    })
});
export const {
    useDashboardQuery,
    useAddToFavorateMutation,
    useRemoveFromFavorateMutation } = apiSlice
export default apiSlice;