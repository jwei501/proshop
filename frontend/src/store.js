import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSlice from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        // equal to: api : apiSlice.reducer
        [apiSlice.reducerPath]: apiSlice.reducer,//apiSlice.reducer is the reducer function that will handle the state of the api
        cart: cartSlice.reducer, //cartSliceReducer is the reducer function that will handle the state of the cart
        auth: authSliceReducer, //authSliceReducer is the reducer function that will handle the state of the auth

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store