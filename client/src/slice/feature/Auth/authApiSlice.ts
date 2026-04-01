import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApiSlice = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_API_URL,
    }),
    endpoints: (build) => ({
        register: build.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: "POST",
                body: body
            }),
        }),
        login: build.mutation({
            query: (body) => ({ url: "/auth/login", method: "POST", body: body })
        }),
        
    })
});
export const {
    useRegisterMutation,
    useLoginMutation,
   
} = authApiSlice
export default authApiSlice;