import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './reducers/alertSlice'
import { apiDataSlice } from './reducers/apiDataSlice'
import { apiSlice } from './reducers/apiSlice'
import { authSlice } from './reducers/authSlice'
import { cartSlice } from './reducers/cartSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        cart: cartSlice.reducer,
        alert: alertSlice.reducer,
        apiData: apiDataSlice.reducer,
        api: apiSlice.reducer
    }
})