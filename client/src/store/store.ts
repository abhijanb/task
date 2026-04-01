import { configureStore } from "@reduxjs/toolkit";
import authApiSlice from "../slice/feature/Auth/authApiSlice";
import apiSlice from "../slice/feature/apiSlice";

const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (middleware) => middleware().concat(authApiSlice.middleware, apiSlice.middleware)
})
export default store;